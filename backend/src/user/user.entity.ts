import { IsEmail } from 'class-validator';
import { createHmac } from 'crypto';
import {
  Collection,
  Entity,
  EntityDTO,
  EntityRepositoryType,
  ManyToMany,
  OneToMany,
  PrimaryKey,
  Property,
  wrap,
} from '@mikro-orm/core';
import { Article } from '../article/article.entity';
import { UserRepository } from './user.repository';

@Entity({ customRepository: () => UserRepository })
export class User {
  [EntityRepositoryType]?: UserRepository;

  @PrimaryKey({ type: 'number' })
  id: number;

  @Property({ fieldName: 'username' })
  username: string;

  @Property({ hidden: true, fieldName: 'email' })
  @IsEmail()
  email: string;

  @Property({ fieldName: 'bio' })
  bio = '';

  @Property({ fieldName: 'image' })
  image = '';

  @Property({ hidden: true, fieldName: 'password' })
  password: string;

  @ManyToMany({ entity: () => Article, hidden: true })
  favorites = new Collection<Article>(this);

  @ManyToMany({
    entity: () => User,
    inversedBy: (u) => u.followed,
    owner: true,
    pivotTable: 'user_to_follower',
    joinColumn: 'follower',
    inverseJoinColumn: 'following',
    hidden: true,
  })
  followers = new Collection<User>(this);

  @ManyToMany(() => User, (u) => u.followers, { hidden: true })
  followed = new Collection<User>(this);

  @OneToMany(() => Article, (article) => article.author, { hidden: true })
  articles = new Collection<Article>(this);

  constructor(username: string, email: string, password: string) {
    this.username = username;
    this.email = email;
    this.password = createHmac('sha256', password).digest('hex');
  }

  toJSON(user?: User) {
    const o = wrap<User>(this).toObject() as UserDTO;
    o.image = this.image || 'https://static.productionready.io/images/smiley-cyrus.jpg';
    o.following = user && user.followers?.isInitialized() ? user.followers.contains(this) : false; // TODO or followed?

    return o;
  }
}

export interface UserDTO extends EntityDTO<User> {
  following?: boolean;
}
