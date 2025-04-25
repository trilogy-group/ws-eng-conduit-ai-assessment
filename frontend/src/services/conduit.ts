import { Err, Ok, Result } from '@hqoss/monads';
import axios, { AxiosError } from 'axios';
import { array, object, string } from 'decoders';
import settings from '../config/settings';
import {
  Article,
  articleDecoder,
  ArticleForEditor,
  ArticlesFilters,
  FeedFilters,
  MultipleArticles,
  multipleArticlesDecoder,
} from '../types/article';
import { Comment, commentDecoder } from '../types/comment';
import { GenericErrors, genericErrorsDecoder } from '../types/error';
import { objectToQueryString } from '../types/object';
import { Profile, profileDecoder } from '../types/profile';
import { User, userDecoder, UserForRegistration, UserSettings } from '../types/user';
import { array } from 'decoders';

axios.defaults.baseURL = settings.baseApiUrl;

export async function getArticles(filters: ArticlesFilters = {}): Promise<MultipleArticles> {
  const finalFilters: ArticlesFilters = {
    limit: 10,
    offset: 0,
    ...filters,
  };
  return multipleArticlesDecoder.verify((await axios.get(`articles?${objectToQueryString(finalFilters)}`)).data);
}

export async function getUsers(): Promise<User[]> {
  const { data } = await axios.get('users');
  return array(userDecoder).verify(data);
}

export async function getTags(): Promise<{ tags: string[] }> {
  return object({ tags: array(string) }).verify((await axios.get('tags')).data);
}

export async function login(email: string, password: string): Promise<Result<User, GenericErrors>> {
  try {
    const { data } = await axios.post('users/login', { user: { email, password } });
    return Ok(object({ user: userDecoder }).verify(data).user);
  } catch (error) {
    const axiosError = error as AxiosError;
    return Err(object({ errors: genericErrorsDecoder }).verify(axiosError.response?.data).errors);
  }
}

export async function getUser(): Promise<User> {
  const { data } = await axios.get('user');
  return object({ user: userDecoder }).verify(data).user;
}

export async function favoriteArticle(slug: string): Promise<Article> {
  return object({ article: articleDecoder }).verify((await axios.post(`articles/${slug}/favorite`)).data).article;
}

export async function unfavoriteArticle(slug: string): Promise<Article> {
  return object({ article: articleDecoder }).verify((await axios.delete(`articles/${slug}/favorite`)).data).article;
}

export async function updateSettings(user: UserSettings): Promise<Result<User, GenericErrors>> {
  try {
    const { data } = await axios.put('user', user);
    return Ok(object({ user: userDecoder }).verify(data).user);
  } catch (error) {
    const axiosError = error as AxiosError;
    return Err(object({ errors: genericErrorsDecoder }).verify(axiosError.response?.data).errors);
  }
}

export async function signUp(user: UserForRegistration): Promise<Result<User, GenericErrors>> {
  try {
    const { data } = await axios.post('users', { user });
    return Ok(object({ user: userDecoder }).verify(data).user);
  } catch (error) {
    const axiosError = error as AxiosError;
    return Err(object({ errors: genericErrorsDecoder }).verify(axiosError.response?.data).errors);
  }
}

export async function createArticle(article: ArticleForEditor): Promise<Result<Article, GenericErrors>> {
  try {
    const { data } = await axios.post('articles', { article });
    return Ok(object({ article: articleDecoder }).verify(data).article);
  } catch (error) {
    const axiosError = error as AxiosError;
    return Err(object({ errors: genericErrorsDecoder }).verify(axiosError.response?.data).errors);
  }
}

export async function getArticle(slug: string): Promise<Article> {
  const { data } = await axios.get(`articles/${slug}`);
  return object({ article: articleDecoder }).verify(data).article;
}

export async function updateArticle(slug: string, article: ArticleForEditor): Promise<Result<Article, GenericErrors>> {
  try {
    const { data } = await axios.put(`articles/${slug}`, { article });
    return Ok(object({ article: articleDecoder }).verify(data).article);
  } catch (error) {
    const axiosError = error as AxiosError;
    return Err(object({ errors: genericErrorsDecoder }).verify(axiosError.response?.data).errors);
  }
}

export async function getProfile(username: string): Promise<Profile> {
  const { data } = await axios.get(`profiles/${username}`);
  return object({ profile: profileDecoder }).verify(data).profile;
}

export async function followUser(username: string): Promise<Profile> {
  const { data } = await axios.post(`profiles/${username}/follow`);
  return object({ profile: profileDecoder }).verify(data).profile;
}

export async function unfollowUser(username: string): Promise<Profile> {
  const { data } = await axios.delete(`profiles/${username}/follow`);
  return object({ profile: profileDecoder }).verify(data).profile;
}

export async function getFeed(filters: FeedFilters = {}): Promise<MultipleArticles> {
  const finalFilters: ArticlesFilters = {
    limit: 10,
    offset: 0,
    ...filters,
  };
  return multipleArticlesDecoder.verify((await axios.get(`articles/feed?${objectToQueryString(finalFilters)}`)).data);
}

export async function getArticleComments(slug: string): Promise<Comment[]> {
  const { data } = await axios.get(`articles/${slug}/comments`);
  return object({ comments: array(commentDecoder) }).verify(data).comments;
}

export async function deleteComment(slug: string, commentId: number): Promise<void> {
  await axios.delete(`articles/${slug}/comments/${commentId}`);
}

export async function createComment(slug: string, body: string): Promise<Comment> {
  const { data } = await axios.post(`articles/${slug}/comments`, { comment: { body } });
  return object({ comment: commentDecoder }).verify(data).comment;
}

export async function deleteArticle(slug: string): Promise<void> {
  await axios.delete(`articles/${slug}`);
}
