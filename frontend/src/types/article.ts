import { array, boolean, Decoder, number, object, optional, string } from 'decoders';
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
  coAuthorEmails?: string[];
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
  coAuthorEmails: optional(array(string)),
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
