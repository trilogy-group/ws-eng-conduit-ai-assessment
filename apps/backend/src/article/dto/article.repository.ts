// src/app/article/article.repository.ts
import { EntityRepository, Repository } from '@mikro-orm/core';
import { Article } from './article.entity';

@EntityRepository(Article)
export class ArticleRepository extends Repository<Article> {}
