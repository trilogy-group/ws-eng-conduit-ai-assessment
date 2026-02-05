import { EntityManager, QueryOrder, wrap } from '@mikro-orm/core';
import { EntityRepository } from '@mikro-orm/mysql';
import { InjectRepository } from '@mikro-orm/nestjs';
import { HttpException, Injectable } from '@nestjs/common';

import { User } from '../user/user.entity';
import { Article } from './article.entity';
import { IArticleRO, IArticlesRO, ICommentsRO } from './article.interface';
import { Comment } from './comment.entity';
import { CreateArticleDto, CreateCommentDto } from './dto';

@Injectable()
export class ArticleService {
  constructor(
    private readonly em: EntityManager,
    @InjectRepository(Article)
    private readonly articleRepository: EntityRepository<Article>,
    @InjectRepository(Comment)
    private readonly commentRepository: EntityRepository<Comment>,
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
  ) {}

  async findAll(userId: number, query: Record<string, string>): Promise<IArticlesRO> {
    const user = userId
      ? await this.userRepository.findOne(userId, { populate: ['followers', 'favorites'] })
      : undefined;
    const qb = this.articleRepository.createQueryBuilder('a').select('a.*').leftJoin('a.author', 'u');

    if ('tag' in query) {
      qb.andWhere({ tagList: new RegExp(query.tag) });
    }

    if ('author' in query) {
      const author = await this.userRepository.findOne({ username: query.author });

      if (!author) {
        return { articles: [], articlesCount: 0 };
      }

      qb.andWhere({ author: author.id });
    }

    if ('favorited' in query) {
      const author = await this.userRepository.findOne({ username: query.favorited }, { populate: ['favorites'] });

      if (!author) {
        return { articles: [], articlesCount: 0 };
      }

      const ids = author.favorites.$.getIdentifiers();
      qb.andWhere({ author: ids });
    }

    qb.orderBy({ createdAt: QueryOrder.DESC });
    const res = await qb.clone().count('id', true).execute('get');
    const articlesCount = res.count;

    if ('limit' in query) {
      qb.limit(+query.limit);
    }

    if ('offset' in query) {
      qb.offset(+query.offset);
    }

    const ids = (await qb.getResult()).map((a) => a.id);
    const articles = await this.articleRepository.find({ id: { $in: ids } }, { populate: ['author', 'coAuthors'] });
    return { articles: articles.map((a) => a.toJSON(user!)), articlesCount };
  }

  async findFeed(userId: number, query: Record<string, string>): Promise<IArticlesRO> {
    const user = userId
      ? await this.userRepository.findOne(userId, { populate: ['followers', 'favorites'] })
      : undefined;
    const res = await this.articleRepository.findAndCount(
      { author: { followers: userId } },
      {
        populate: ['author', 'coAuthors'],
        orderBy: { createdAt: QueryOrder.DESC },
        limit: +query.limit,
        offset: +query.offset,
      },
    );

    console.log('findFeed', { articles: res[0], articlesCount: res[1] });
    return { articles: res[0].map((a) => a.toJSON(user!)), articlesCount: res[1] };
  }

  async findOne(userId: number, where: Partial<Article>): Promise<IArticleRO> {
    const user = userId
      ? await this.userRepository.findOneOrFail(userId, { populate: ['followers', 'favorites'] })
      : undefined;
    const article = await this.articleRepository.findOne(where, { populate: ['author', 'coAuthors'] });
    return { article: article && article.toJSON(user) } as IArticleRO;
  }

  async addComment(userId: number, slug: string, dto: CreateCommentDto) {
    const article = await this.articleRepository.findOneOrFail({ slug }, { populate: ['author'] });
    const author = await this.userRepository.findOneOrFail(userId);
    const comment = new Comment(author, article, dto.body);
    await this.em.persistAndFlush(comment);

    return { comment, article: article.toJSON(author) };
  }

  async deleteComment(userId: number, slug: string, id: number): Promise<IArticleRO> {
    const article = await this.articleRepository.findOneOrFail({ slug }, { populate: ['author'] });
    const user = await this.userRepository.findOneOrFail(userId);
    const comment = this.commentRepository.getReference(id);

    if (article.comments.contains(comment)) {
      article.comments.remove(comment);
      await this.em.removeAndFlush(comment);
    }

    return { article: article.toJSON(user) };
  }

  async favorite(id: number, slug: string): Promise<IArticleRO> {
    const article = await this.articleRepository.findOneOrFail({ slug }, { populate: ['author'] });
    const user = await this.userRepository.findOneOrFail(id, { populate: ['favorites', 'followers'] });

    if (!user.favorites.contains(article)) {
      user.favorites.add(article);
      article.favoritesCount++;
    }

    await this.em.flush();
    return { article: article.toJSON(user) };
  }

  async unFavorite(id: number, slug: string): Promise<IArticleRO> {
    const article = await this.articleRepository.findOneOrFail({ slug }, { populate: ['author'] });
    const user = await this.userRepository.findOneOrFail(id, { populate: ['followers', 'favorites'] });

    if (user.favorites.contains(article)) {
      user.favorites.remove(article);
      article.favoritesCount--;
    }

    await this.em.flush();
    return { article: article.toJSON(user) };
  }

  async findComments(slug: string): Promise<ICommentsRO> {
    const article = await this.articleRepository.findOne({ slug }, { populate: ['comments'] });
    return { comments: article!.comments.getItems() };
  }

  async create(userId: number, dto: CreateArticleDto) {
    const user = await this.userRepository.findOne(
      { id: userId },
      { populate: ['followers', 'favorites', 'articles'] },
    );
    const article = new Article(user!, dto.title, dto.description, dto.body);
    article.tagList.push(...dto.tagList);
    // resolve co-authors by ids first, then emails (basic mode)
    if (dto.coAuthorIds?.length) {
      const users = await this.userRepository.find({ id: { $in: dto.coAuthorIds } });
      article.coAuthors.add(users);
    } else if (dto.coAuthorEmails?.length) {
      const users = await this.userRepository.find({ email: { $in: dto.coAuthorEmails } });
      article.coAuthors.add(users);
    }
    user?.articles.add(article);
    await this.em.flush();

    // ensure coAuthors are initialized for serialization
    await this.em.populate(article, ['author', 'coAuthors']);
    return { article: article.toJSON(user!) };
  }

  async update(userId: number, slug: string, articleData: Partial<Article>): Promise<IArticleRO> {
    const user = await this.userRepository.findOne(
      { id: userId },
      { populate: ['followers', 'favorites', 'articles'] },
    );
    const article = await this.articleRepository.findOne({ slug }, { populate: ['author', 'coAuthors'] });
    // lock enforcement: if active lock is held by other user -> 423
    if (this.isLockActive(article!) && article!.lockedBy!.id !== userId) {
      throw new HttpException({ error: 'Article is currently locked by another user' }, 423);
    }

    // if DTO contains co-author fields, resolve and assign
    type CoAuthorFields = { coAuthorIds?: number[]; coAuthorEmails?: string[] };
    const { coAuthorIds, coAuthorEmails, ...rest } = articleData as Partial<Article> & CoAuthorFields;
    if (coAuthorIds && Array.isArray(coAuthorIds)) {
      const users = await this.userRepository.find({ id: { $in: coAuthorIds } });
      article!.coAuthors.removeAll();
      article!.coAuthors.add(users);
    } else if (coAuthorEmails && Array.isArray(coAuthorEmails)) {
      const users = await this.userRepository.find({ email: { $in: coAuthorEmails } });
      article!.coAuthors.removeAll();
      article!.coAuthors.add(users);
    }
    wrap(article).assign(rest);
    await this.em.flush();

    await this.em.populate(article!, ['author', 'coAuthors']);
    return { article: article!.toJSON(user!) };
  }

  async delete(slug: string) {
    return this.articleRepository.nativeDelete({ slug });
  }

  // ========== Locking (ADVANCED) ==========
  private isLockActive(article: Article | null | undefined): boolean {
    if (!article || !article.lockedBy || !article.lockExpiresAt) return false;
    return article.lockExpiresAt.getTime() > Date.now();
  }

  async lock(userId: number, slug: string) {
    const article = await this.articleRepository.findOneOrFail({ slug }, { populate: ['lockedBy'] });
    if (this.isLockActive(article) && article.lockedBy!.id !== userId) {
      throw new HttpException({ error: 'Article is currently locked by another user' }, 423);
    }
    const user = await this.userRepository.findOneOrFail(userId);
    article.lockedBy = user;
    article.lockExpiresAt = new Date(Date.now() + 5 * 60 * 1000);
    await this.em.flush();
    return { ok: true, lockExpiresAt: article.lockExpiresAt } as const;
  }

  async heartbeat(userId: number, slug: string) {
    const article = await this.articleRepository.findOneOrFail({ slug }, { populate: ['lockedBy'] });
    if (!this.isLockActive(article) || article.lockedBy!.id !== userId) {
      throw new HttpException({ error: 'Lock not held or expired' }, 423);
    }
    article.lockExpiresAt = new Date(Date.now() + 5 * 60 * 1000);
    await this.em.flush();
    return { ok: true, lockExpiresAt: article.lockExpiresAt } as const;
  }

  async unlock(userId: number, slug: string) {
    const article = await this.articleRepository.findOneOrFail({ slug }, { populate: ['lockedBy'] });
    if (article.lockedBy?.id === userId) {
      article.lockedBy = undefined;
      article.lockExpiresAt = undefined;
      await this.em.flush();
    }
    return { ok: true } as const;
  }
}
