import { useState } from 'react';
import { format } from 'date-fns';
import React, { Fragment, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  createComment,
  deleteArticle,
  deleteComment,
  favoriteArticle,
  followUser,
  getArticle,
  getArticleComments,
  lockArticle,
  unfavoriteArticle,
  unfollowUser,
  unlockArticle,
} from '../../../services/conduit';
import { store } from '../../../state/store';
import { useStore } from '../../../state/storeHooks';
import { Article } from '../../../types/article';
import { Comment } from '../../../types/comment';
import { redirect } from '../../../types/location';
import { classObjectToClassName } from '../../../types/style';
import { User } from '../../../types/user';
import { TagList } from '../../ArticlePreview/ArticlePreview';
import {
  CommentSectionState,
  initializeArticlePage,
  loadArticle,
  loadComments,
  MetaSectionState,
  startDeletingArticle,
  startSubmittingComment,
  startSubmittingFavorite,
  startSubmittingFollow,
  updateAuthor,
  updateCommentBody,
} from './ArticlePage.slice';
//import { useParams } from 'react-router-dom';  // Make sure you import useParams

//import { lockArticle, unlockArticle } from '@/services/conduit';

const { slug } = useParams<{ slug: string }>();
export function ArticlePage() {
  
  //const { slug }: { slug: string | undefined } = useParams();
 // const { slug } = useParams<{ slug: string | undefined }>(); 

  const {
    articlePage: { article, commentSection, metaSection },
    app: { user },
  } = useStore(({ articlePage, app }) => ({
    articlePage,
    app,
  }));

  useEffect(() => {
    onLoad(slug!);
  }, [slug]);

  return article ? (
    <div className='article-page'>
      <ArticlePageBanner {...{ article, metaSection, user }} />

      <div className='container page'>
        <div className='row article-content'>
          <div className='col-md-12'>{article.body}</div>
          <TagList tagList={article.tagList} />
        </div>

        <hr />

        <div className='article-actions'>
          <ArticleMeta {...{ article, metaSection, user }} />
        </div>

        <CommentSection {...{ user, commentSection, article }} />
      </div>
    </div>
  ) : (
    <div>Loading article...</div>
  );
}

async function onLoad(slug: string) {
  store.dispatch(initializeArticlePage());

  try {
    const article = await getArticle(slug);
    store.dispatch(loadArticle(article));

    const comments = await getArticleComments(slug);
    store.dispatch(loadComments(comments));
  } catch {
    redirect('');
  }
}

function ArticlePageBanner(props: { article: Article; metaSection: MetaSectionState; user: User | null }) {
  return (
    <div className='banner'>
      <div className='container'>
        <h1>{props.article.title}</h1>

        <ArticleMeta {...props} />
      </div>
    </div>
  );
}

function ArticleMeta({
  article,
  metaSection: { submittingFavorite, submittingFollow, deletingArticle },
  user,
}: {
  article: Article;
  metaSection: MetaSectionState;
  user: User | null;
}) {
  return (
    <div className='article-meta'>
      <ArticleAuthorInfo article={article} />

      {user && user.username === article.author.username ? (
        <OwnerArticleMetaActions article={article} deletingArticle={deletingArticle} />
      ) : (
        <NonOwnerArticleMetaActions
          article={article}
          submittingFavorite={submittingFavorite}
          submittingFollow={submittingFollow}
        />
      )}
    </div>
  );
}

function ArticleAuthorInfo({
  article: {
    author: { username, image },
    createdAt,
  },
}: {
  article: Article;
}) {
  return (
    <Fragment>
      <Link to={`/profile/${username}`}>
        <img src={image || undefined} />
      </Link>
      <div className='info'>
        <Link className='author' to={`/profile/${username}`}>
          {username}
        </Link>
        <span className='date'>{format(createdAt, 'PP')}</span>
      </div>
    </Fragment>
  );
}

function NonOwnerArticleMetaActions({
  article: {
    slug,
    favoritesCount,
    favorited,
    author: { username, following },
  },
  submittingFavorite,
  submittingFollow,
}: {
  article: Article;
  submittingFavorite: boolean;
  submittingFollow: boolean;
}) {
  return (
    <Fragment>
      <button
        className={classObjectToClassName({
          btn: true,
          'btn-sm': true,
          'btn-outline-secondary': !following,
          'btn-secondary': following,
        })}
        disabled={submittingFollow}
        onClick={() => onFollow(username, following)}
      >
        <i className='ion-plus-round'></i>
        &nbsp; {(following ? 'Unfollow ' : 'Follow ') + username}
      </button>
      &nbsp;
      <button
        className={classObjectToClassName({
          btn: true,
          'btn-sm': true,
          'btn-outline-primary': !favorited,
          'btn-primary': favorited,
        })}
        disabled={submittingFavorite}
        onClick={() => onFavorite(slug, favorited)}
      >
        <i className='ion-heart'></i>
        &nbsp; {(favorited ? 'Unfavorite ' : 'Favorite ') + 'Article'}
        <span className='counter'>({favoritesCount})</span>
      </button>
    </Fragment>
  );
}

async function onFollow(username: string, following: boolean) {
  if (!store.getState().app.user) {
    redirect('register');
    return;
  }

  store.dispatch(startSubmittingFollow());

  const author = await (following ? unfollowUser : followUser)(username);
  store.dispatch(updateAuthor(author));
}

async function onFavorite(slug: string, favorited: boolean) {
  if (!store.getState().app.user) {
    redirect('register');
    return;
  }

  store.dispatch(startSubmittingFavorite());

  const article = await (favorited ? unfavoriteArticle : favoriteArticle)(slug);
  store.dispatch(loadArticle(article));
}

function OwnerArticleMetaActions({
  article: { slug },
  deletingArticle,
}: {
  article: Article;
  deletingArticle: boolean;
}) {
  return (
    <Fragment>
      <button className='btn btn-outline-secondary btn-sm' onClick={() => redirect(`editor/${slug}`)}>
        <i className='ion-plus-round'></i>
        &nbsp; Edit Article
      </button>
      &nbsp;
      <button
        className='btn btn-outline-danger btn-sm'
        disabled={deletingArticle}
        onClick={() => onDeleteArticle(slug)}
      >
        <i className='ion-heart'></i>
        &nbsp; Delete Article
      </button>
      <button
  className='btn btn-outline-warning btn-sm'
  onClick={() => onLockArticle(slug)}
>
  <i className='ion-lock'></i>
  &nbsp; Lock Article
</button>
&nbsp;
<button
  className='btn btn-outline-success btn-sm'
  onClick={() => onUnlockArticle(slug)}
>
  <i className='ion-unlocked'></i>
  &nbsp; Unlock Article
</button>
    </Fragment>
  );
}
async function onLockArticle(slug: string) {
  try {
    await lockArticle(slug);
    alert('Article locked successfully');
  } catch (error) {
    alert('Failed to lock article');
  }
}

async function onUnlockArticle(slug: string) {
  try {
    await unlockArticle(slug);
    alert('Article unlocked successfully');
  } catch (error) {
    alert('Failed to unlock article');
  }
}
async function onDeleteArticle(slug: string) {
  store.dispatch(startDeletingArticle());
  await deleteArticle(slug);
  redirect('');
}

function CommentSection({
  user,
  article,
  commentSection: { submittingComment, commentBody, comments },
}: {
  user: User | null;
  article: Article;
  commentSection: CommentSectionState;
}) {
  return (
    <div className='row'>
      <div className='col-xs-12 col-md-8 offset-md-2'>
        {user ? (
          <CommentForm
            user={user}
            slug={article.slug}
            submittingComment={submittingComment}
            commentBody={commentBody}
          />
        ) : (
          <p>
            <Link to='/login'>Sign in</Link> or <Link to='/register'>sign up</Link> to add comments on this article.
          </p>
        )}
      </div>
      <div className='col-xs-12 col-md-8 offset-md-2'>
        {comments.length === 0 ? (
          <div>No comments yet...</div>
        ) : (
          <Fragment>
            {comments.map((comment, index) => (
              <ArticleComment key={comment.id} comment={comment} slug={article.slug} user={user} index={index} />
            ))}
          </Fragment>
        )}
      </div>
    </div>
  );
}

function CommentForm({
  user: { image },
  commentBody,
  slug,
  submittingComment,
}: {
  user: User;
  commentBody: string;
  slug: string;
  submittingComment: boolean;
}) {
  return (
    <form className='card comment-form' onSubmit={onPostComment(slug, commentBody)}>
      <div className='card-block'>
        <textarea
          className='form-control'
          placeholder='Write a comment...'
          rows={3}
          onChange={onCommentChange}
          value={commentBody}
        ></textarea>
      </div>
      <div className='card-footer'>
        <img src={image || undefined} className='comment-author-img' />
        <button className='btn btn-sm btn-primary' disabled={submittingComment}>
          Post Comment
        </button>
      </div>
    </form>
  );
}

function onCommentChange(ev: React.ChangeEvent<HTMLTextAreaElement>) {
  store.dispatch(updateCommentBody(ev.target.value));
}

function onPostComment(slug: string, body: string): (ev: React.FormEvent) => void {
  return async (ev) => {
    ev.preventDefault();

    store.dispatch(startSubmittingComment());
    await createComment(slug, body);

    store.dispatch(loadComments(await getArticleComments(slug)));
  };
}

function ArticleComment({
  comment: {
    id,
    body,
    createdAt,
    author: { username, image },
  },
  slug,
  index,
  user,
}: {
  comment: Comment;
  slug: string;
  index: number;
  user: User | null;
}) {
  return (
    <div className='card'>
      <div className='card-block'>
        <p className='card-text'>{body}</p>
      </div>
      <div className='card-footer'>
        <Link className='comment-author' to={`/profile/${username}`}>
          <img src={image || undefined} className='comment-author-img' />
        </Link>
        &nbsp;
        <Link className='comment-author' to={`/profile/${username}`}>
          {username}
        </Link>
        <span className='date-posted'>{format(createdAt, 'PP')}</span>
        {user && user.username === username && (
          <span className='mod-options'>
            <i
              className='ion-trash-a'
              aria-label={`Delete comment ${index + 1}`}
              onClick={() => onDeleteComment(slug, id)}
            ></i>
          </span>
        )}
      </div>
    </div>
  );
}

async function onDeleteComment(slug: string, id: number) {
  await deleteComment(slug, id);
  store.dispatch(loadComments(await getArticleComments(slug)));
}

const [isLocked, setIsLocked] = useState(false);

// useEffect(() => {
//   const checkLockStatus = async () => {
//     const response = await fetch(`/api/articles/locked/${slug}`);
//     const data = await response.json();
//     setIsLocked(data.isLocked);
//   };

//   checkLockStatus();
// }, [slug]);

// // Handle locking/unlocking the article
// const toggleLock = async () => {
//   if (isLocked) {
//     await fetch(`/api/articles/unlock/${slug}`, { method: 'POST' });
//     setIsLocked(false);
//   } else {
//     await fetch(`/api/articles/lock/${slug}`, { method: 'POST' });
//     setIsLocked(true);
//   }
useEffect(() => {
  if (!slug) {
    console.error("Slug is undefined");
    return;
  }

  const checkLockStatus = async () => {
    try {
      const response = await fetch(`/api/articles/locked/${slug}`);
      const data = await response.json();
      setIsLocked(data.isLocked);
    } catch (error) {
      console.error("Error checking lock status:", error);
    }
  };

  checkLockStatus();
}, [slug]);

const toggleLock = async () => {
  if (!slug) {
    console.error("Slug is undefined");
    return;
  }

  try {
    const endpoint = isLocked ? 'unlock' : 'lock';
    await fetch(`/api/articles/${endpoint}/${slug}`, { method: 'POST' });
    setIsLocked(!isLocked);
  } catch (error) {
    console.error("Error toggling lock:", error);
  }
};

