import { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { Article } from '../article/article.entity';
import { Tag } from '../tag/tag.entity';
import { User } from '../user/user.entity';

export class DatabaseSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const tags = this.getTags(em);
    const authors = this.getAuthors(em);
    authors.john.followed.add(authors.bennie);
    authors.john.followed.add(authors.zolly);
    authors.bennie.followers.add(authors.john);
    authors.zolly.followers.add(authors.john);
    em.persist(Object.values(tags));
    em.persist(Object.values(authors));

    const articles = [
      em.create(Article, {
        author: authors.bennie,
        slug: 'how-to-do-something',
        title: 'How to do something',
        description: 'Lorem ipsum dolor sit amet',
        tagList: [tags.coding.tag, tags.javascript.tag],
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam id aliquam aliquam, nunc ipsum aliquet nunc, vitae aliq',
        favoritesCount: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
      em.create(Article, {
        author: authors.zolly,
        slug: 'how-to-do-something-else',
        title: 'How to do something else',
        tagList: [tags.coding.tag, tags.angular.tag],
        description: 'Sed euismod',
        body: 'Sed euismod, diam id aliquam aliquam, nunc i consectetur adipiscing elit. Sed euismod, diam id aliquam aliquam, nunc ipsum aliquet nunc, vitae aliq',
        favoritesCount: 7,
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
    ];
    em.persist(articles);
  }

  private getTags(em: EntityManager): Record<string, Tag> {
    return {
      coding: em.create(Tag, { tag: 'coding' }),
      javascript: em.create(Tag, { tag: 'javascript' }),
      angular: em.create(Tag, { tag: 'angular' }),
      react: em.create(Tag, { tag: 'react' }),
    };
  }

  private getAuthors(em: EntityManager): Record<string, User> {
    return {
      john: em.create(User, {
        email: 'jcosten0@purevolume.com',
        username: 'John Costen',
        bio: 'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae.',
        image: 'http://dummyimage.com/168x100.png/5fa2dd/ffffff',
        password: 'e56a207acd1e6714735487c199c6f095844b7cc8e5971d86c003a7b6f36ef51e', // password
      }),
      bennie: em.create(User, {
        email: 'bbebbell1@earthlink.net',
        username: 'Bennie Bebbell',
        bio: 'Suspendisse potenti.',
        image: 'http://dummyimage.com/150x100.png/ff4444/ffffff',
        password: 'e56a207acd1e6714735487c199c6f095844b7cc8e5971d86c003a7b6f36ef51e',
      }),
      zolly: em.create(User, {
        email: 'zgorey2@livejournal.com',
        username: 'Zolly Gorey',
        bio: 'In eleifend quam a odio. In hac habitasse platea dictumst.',
        image: 'http://dummyimage.com/186x100.png/5fa2dd/ffffff',
        password: 'e56a207acd1e6714735487c199c6f095844b7cc8e5971d86c003a7b6f36ef51e',
      }),
    };
  }
}
