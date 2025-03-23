import {
  ArrayType,
  Collection,
  Entity,
  EntityDTO,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  Property,
  wrap,
} from '@mikro-orm/core';
import slug from 'slug';

import { User } from '../user/user.entity';
import { Comment } from './comment.entity';

@Entity()
export class Article {
  @PrimaryKey({ type: 'number' })
  id: number;

  @Property({ fieldName: 'slug' })
  slug: string;

  @Property({ fieldName: 'title' })
  title: string;

  @Property({ fieldName: 'description' })
  description = '';

  @Property({ fieldName: 'body' })
  body = '';

  @Property({ type: 'date', fieldName: 'created_at' })
  createdAt = new Date();

  @Property({ type: 'date', onUpdate: () => new Date(), fieldName: 'updated_at' })
  updatedAt = new Date();

  @Property({ type: ArrayType, fieldName: 'tag_list' })
  tagList: string[] = [];

  @ManyToOne(() => User, { fieldName: 'author_id' })
  author: User;

  @OneToMany(() => Comment, (comment) => comment.article, { eager: true, orphanRemoval: true })
  comments = new Collection<Comment>(this);

  @Property({ type: 'number', fieldName: 'favorites_count' })
  favoritesCount = 0;

  @Property({ fieldName: 'summary' })
  summary: string;

  constructor(author: User, title: string, description: string, body: string, summary: string) {
    this.author = author;
    this.title = title;
    this.description = description;
    this.body = body;
    this.summary = summary;
    this.slug = slug(title, { lower: true }) + '-' + ((Math.random() * Math.pow(36, 6)) | 0).toString(36);
  }

  toJSON(user?: User) {
    const o = wrap<Article>(this).toObject() as ArticleDTO;
    o.favorited = user && user.favorites.isInitialized() ? user.favorites.contains(this) : false;
    o.author = this.author.toJSON(user);
    return o;
  }
}

export interface ArticleDTO extends EntityDTO<Article> {
  favorited?: boolean;
}
