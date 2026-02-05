import { array, boolean, Decoder, number, object, string, either, hardcoded } from 'decoders';
import { Profile, profileDecoder } from './profile';

export interface Article {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  createdAt: string;
  updatedAt: string;
  favorited: boolean;
  favoritesCount: number;
  author: Profile;
  coAuthors: UserRef[];
}

export const articleDecoder: Decoder<Article> = object({
  slug: string,
  title: string,
  description: string,
  body: string,
  tagList: array(string),
  createdAt: string,
  updatedAt: string,
  favorited: boolean,
  favoritesCount: number,
  author: profileDecoder,
  coAuthors: either(array(object({ id: number, username: string })), hardcoded([])),
});

export interface MultipleArticles {
  articles: Article[];
  articlesCount: number;
}

export const multipleArticlesDecoder: Decoder<MultipleArticles> = object({
  articles: array(articleDecoder),
  articlesCount: number,
});

export interface ArticleForEditor {
  title: string;
  description: string;
  body: string;
  tagList: string[];
  // New optional fields to support co-authors
  coAuthorIds?: number[];
  coAuthorEmailsCsv?: string;
}

export interface ArticlesFilters {
  tag?: string;
  author?: string;
  favorited?: string;
  limit?: number;
  offset?: number;
}

export interface FeedFilters {
  limit?: number;
  offset?: number;
}

// Minimal user reference for co-authors/multi-select
export interface UserRef {
  id: number;
  username: string;
}
