import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { User } from '../user/user.entity';
import { Article } from './article.entity';

@Entity()
export class Comment {
  @PrimaryKey({ type: 'number' })
  id: number;

  @Property({ type: 'date', fieldName: 'created_at' })
  createdAt = new Date();

  @Property({ type: 'date', onUpdate: () => new Date(), fieldName: 'updated_at' })
  updatedAt = new Date();

  @Property({ fieldName: 'body' })
  body: string;

  @ManyToOne(() => Article, { fieldName: 'article_id' })
  article: Article;

  @ManyToOne(() => User, { fieldName: 'author_id' })
  author: User;

  constructor(author: User, article: Article, body: string) {
    this.author = author;
    this.article = article;
    this.body = body;
  }
}
