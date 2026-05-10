import { Entity, PrimaryKey, Property, ManyToOne, OneToOne } from '@mikro-orm/core';
import { User } from '../user/user.entity';
import { Article } from './article.entity';

@Entity()
export class ArticleLock {
  @PrimaryKey()
  id!: number;

  @Property({ unique: true })
  visibleId!: string;

  @OneToOne(() => Article, { unique: true })
  articleId!: Article;

  @ManyToOne(() => User)
  userId!: User;

  @Property()
  acquiredAt!: Date;

  @Property()
  lastSeenAt!: Date;
}
