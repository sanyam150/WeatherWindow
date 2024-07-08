import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const WithLoginStatus = ({ children, protectedPath, homePath }) => {
  const isUserLoggedIn = localStorage.getItem('isUserLoggedIn') === 'true';
  const location = useLocation();
  if (
    isUserLoggedIn &&
    (location.pathname === '/' || location.pathname === '/SignUpPage')
  ) {
    return <Navigate to={homePath} state={{ from: location }} replace />;
  } else if (!isUserLoggedIn && location.pathname === homePath) {
    return <Navigate to={protectedPath} state={{ from: location }} replace />;
  }

  return children;
};

export default WithLoginStatus;
