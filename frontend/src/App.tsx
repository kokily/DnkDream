import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { GlobalStyle } from 'styles';
import ListPostsPage from 'pages/home/ListPostsPage';
import LoginPage from 'pages/auth/LoginPage';
import NotFoundPage from 'pages/home/NotFoundPage';
import IntroPage from 'pages/home/IntroPage';
import { IS_LOGGED_IN } from 'graphql/cache.local';
import ReadPostPage from 'pages/post/ReadPostPage';
import WritePage from 'pages/write/WritePage';

const App = () => {
  const { data } = useQuery(IS_LOGGED_IN);

  return (
    <>
      <GlobalStyle />

      {data?.auth?.isLoggedIn ? <LogInRoutes /> : <LogOutRoutes />}

      <ToastContainer position="bottom-center" draggable={false} />
    </>
  );
};

const LogInRoutes = () => (
  <Switch>
    <Route exact path="/" component={ListPostsPage} />
    <Route path="/intro" component={IntroPage} />
    <Route path="/post/:postId" component={ReadPostPage} />
    <Route path="/write" component={WritePage} />
    <Route component={NotFoundPage} />
  </Switch>
);

const LogOutRoutes = () => (
  <Switch>
    <Route exact path="/" component={ListPostsPage} />
    <Route path="/login" component={LoginPage} />
    <Route path="/intro" component={IntroPage} />
    <Route path="/post/:postId" component={ReadPostPage} />
    <Route component={NotFoundPage} />
  </Switch>
);

export default App;
