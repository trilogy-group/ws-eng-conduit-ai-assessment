// src/app/article/article.repository.ts
import { EntityRepository } from '@mikro-orm/core';
import { Article } from './article.entity';

export class ArticleRepository extends EntityRepository<Article> {}
