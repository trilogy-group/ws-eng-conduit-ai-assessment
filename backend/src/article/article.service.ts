import {
  EntityManager,
  QueryOrder,
  wrap,
} from '@mikro-orm/core';
import { EntityRepository } from '@mikro-orm/mysql';
import { InjectRepository } from '@mikro-orm/nestjs';
import {
  Injectable,
  ForbiddenException,
  ConflictException,
} from '@nestjs/common';

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


  async create(userId: number, dto: CreateArticleDto) {
    const user = await this.userRepository.findOneOrFail(
      { id: userId },
      { populate: ['followers', 'favorites', 'articles'] },
    );

    const article = new Article(user, dto.title, dto.description, dto.body);
    article.tagList.push(...dto.tagList);
    user.articles.add(article);

    if (dto.coAuthorEmails) {
      const emails = dto.coAuthorEmails
        .split(',')
        .map((e) => e.trim())
        .filter(Boolean);

      const users = await this.userRepository.find({
        email: { $in: emails },
      });

      users.forEach((u) => {
        articl
