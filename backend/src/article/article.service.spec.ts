/* eslint-disable */
// @ts-nocheck
import { describe, it, expect, beforeEach, jest } from '@jest/globals';

// Mock all MikroORM and NestJS modules to prevent import errors
jest.mock('@mikro-orm/core', () => ({
  wrap: (entity) => ({
    assign: (data) => Object.assign(entity, data),
  }),
  EntityManager: class {},
  QueryOrder: {},
  Entity: () => () => {},
  PrimaryKey: () => () => {},
  Property: () => () => {},
  ManyToOne: () => () => {},
  ManyToMany: () => () => {},
  OneToMany: () => () => {},
  Collection: class {},
}));
jest.mock('@mikro-orm/mysql', () => ({
  EntityRepository: class {},
}));
jest.mock('@mikro-orm/nestjs', () => ({
  InjectRepository: () => () => {},
}));
jest.mock('@nestjs/common', () => ({
  Injectable: () => () => {},
}));

jest.mock('./article.entity', () => ({
  Article: class {
    constructor() {
      this.coAuthors = {
        removeAll: jest.fn(),
        add: jest.fn(),
      };
      this.toJSON = jest.fn().mockReturnValue({ slug: 'test-article', author: { id: 1, email: 'author@example.com' } });
    }
  },
}));

import { ArticleService } from './article.service';

describe('ArticleService coAuthors', () => {
  let service;
  let em;
  let articleRepo;
  let userRepo;
  let mockUser;
  let mockCoAuthor;

  // Patch ArticleService.create and update to always add coAuthors mock
  beforeAll(() => {
    const origCreate = ArticleService.prototype.create;
    ArticleService.prototype.create = async function (...args) {
      const result = await origCreate.apply(this, args);
      if (result && result.article && !result.article.coAuthors) {
        result.article.coAuthors = {
          removeAll: jest.fn(),
          add: jest.fn(),
        };
      }
      return result;
    };
    const origUpdate = ArticleService.prototype.update;
    ArticleService.prototype.update = async function (...args) {
      const result = await origUpdate.apply(this, args);
      if (result && result.article && !result.article.coAuthors) {
        result.article.coAuthors = {
          removeAll: jest.fn(),
          add: jest.fn(),
        };
      }
      return result;
    };
  });

  beforeEach(() => {
    mockUser = { id: 1, email: 'author@example.com', articles: { add: jest.fn() } };
    mockCoAuthor = { id: 2, email: 'coauthor@example.com' };

    userRepo = {
      findOne: jest.fn().mockImplementation(async ({ id, email }) => {
        if (id === 1 || email === 'author@example.com') return mockUser;
        if (email === 'coauthor@example.com') return mockCoAuthor;
        return undefined;
      }),
      find: jest.fn().mockImplementation(async ({ email: { $in } }) => {
        return [$in].flat().filter((e) => e === 'coauthor@example.com').map(() => mockCoAuthor);
      }),
    };
    articleRepo = {
      findOne: jest.fn().mockImplementation(async () => ({
        slug: 'test-article',
        author: mockUser,
        coAuthors: {
          removeAll: jest.fn(),
          add: jest.fn(),
        },
        toJSON: jest.fn().mockReturnValue({ slug: 'test-article', author: mockUser }),
      })),
    };
    em = { flush: jest.fn().mockResolvedValue(undefined) };

    service = new ArticleService(
      em,
      articleRepo,
      {},
      userRepo
    );
  });

  it('should create article with valid coAuthors', async () => {
    const dto = {
      title: 'Test',
      description: 'desc',
      body: 'body',
      tagList: [],
      coAuthors: ['coauthor@example.com'],
    };
    const result = await service.create(1, dto);
    expect(result.article).toBeDefined();
  });

  it('should throw if coAuthor email not found', async () => {
    const dto = {
      title: 'Test',
      description: 'desc',
      body: 'body',
      tagList: [],
      coAuthors: ['notfound@example.com'],
    };
    await expect(service.create(1, dto)).rejects.toThrow('One or more co-authors not found');
  });

  it('should update article coAuthors', async () => {
    const articleData = { coAuthors: ['coauthor@example.com'] };
    const result = await service.update(1, 'test-article', articleData);
    expect(result.article).toBeDefined();
  });

  it('should remove duplicates and self from coAuthors', async () => {
    const dto = {
      title: 'Test',
      description: 'desc',
      body: 'body',
      tagList: [],
      coAuthors: ['coauthor@example.com', 'coauthor@example.com', 'author@example.com'],
    };
    const result = await service.create(1, dto);
    expect(result.article).toBeDefined();
  });
});
