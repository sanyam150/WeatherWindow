import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './Pages/LoginPage';
import ErrorPage from './Pages/ErrorPage';
import SignUpPage from './Pages/SignUpPage';
import { HomePage } from './Pages/HomePage';
import WithLoginStatus from './utils/withLoginStatus';

const AppRouter = () => {
  const homePath = '/HomePage';
  const loginPath = '/';
  const signUpPath = '/SignUpPage';

  return (
    <Router>
      <Routes>
        <Route
          path={loginPath}
          element={
            <WithLoginStatus protectedPath={loginPath} homePath={homePath}>
              <LoginPage />
            </WithLoginStatus>
          }
        />
        <Route
          path={signUpPath}
          element={
            <WithLoginStatus protectedPath={signUpPath} homePath={homePath}>
              <SignUpPage />
            </WithLoginStatus>
          }
        />
        <Route
          path={homePath}
          element={
            <WithLoginStatus protectedPath={loginPath} homePath={homePath}>
              <HomePage />
            </WithLoginStatus>
          }
        />
        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
