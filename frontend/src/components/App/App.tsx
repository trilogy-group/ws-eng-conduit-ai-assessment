import axios from 'axios';
import { Fragment } from 'react';
import { HashRouter, Navigate as Redirect, Route, Routes as Switch } from 'react-router-dom';
import { getUser } from '../../services/conduit';
import { store } from '../../state/store';
import { useStoreWithInitializer } from '../../state/storeHooks';
import { Footer } from '../Footer/Footer';
import { Header } from '../Header/Header';
import { ArticlePage } from '../Pages/ArticlePage/ArticlePage';
import { EditArticle } from '../Pages/EditArticle/EditArticle';
import { Home } from '../Pages/Home/Home';
import { Login } from '../Pages/Login/Login';
import { NewArticle } from '../Pages/NewArticle/NewArticle';
import { ProfilePage } from '../Pages/ProfilePage/ProfilePage';
import { Register } from '../Pages/Register/Register';
import { Settings } from '../Pages/Settings/Settings';
import { endLoad, loadUser } from './App.slice';

function createGuestOnlyRoute(path: string, element: JSX.Element, userIsLogged: boolean) {
  return <Route path={path} element={userIsLogged ? <Redirect to='/' /> : element} />;
}

function createUserOnlyRoute(path: string, element: JSX.Element, userIsLogged: boolean) {
  return <Route path={path} element={!userIsLogged ? <Redirect to='/' /> : element} />;
}

export function App() {
  const { loading, user } = useStoreWithInitializer(({ app }) => app, load);

  const userIsLogged = !!user;

  return (
    <HashRouter>
      {!loading && (
        <Fragment>
          <Header />
          <Switch>
            {createGuestOnlyRoute('/login', <Login />, userIsLogged)}
            {createGuestOnlyRoute('/register', <Register />, userIsLogged)}
            {createUserOnlyRoute('/settings', <Settings />, userIsLogged)}
            {createUserOnlyRoute('/editor', <NewArticle />, userIsLogged)}
            {createUserOnlyRoute('/editor/:slug', <EditArticle />, userIsLogged)}
            <Route path='/profile/:username' element={<ProfilePage />} />
            <Route path='/article/:slug' element={<ArticlePage />} />
            <Route path='/' element={<Home />} />
            <Route path='*' element={<Redirect to='/' />} />
            <Route path='/articles/:slug' element={<ArticlePage />} />
          </Switch>
          <Footer />
        </Fragment>
      )}
    </HashRouter>
  );
}

async function load() {
  const token = localStorage.getItem('token');
  if (!store.getState().app.loading || !token) {
    store.dispatch(endLoad());
    return;
  }
  axios.defaults.headers.Authorization = `Token ${token}`;

  try {
    store.dispatch(loadUser(await getUser()));
  } catch {
    store.dispatch(endLoad());
  }
}
