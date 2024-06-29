import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './Pages/LoginPage';
import ErrorPage from './Pages/ErrorPage';
import withLoginStatus from './utils/withLoginStatus';
import Navbar from './Components/Navbar';

const ProtectedLoginPage = withLoginStatus(<LoginPage />, '/Homepage');

const AppRouter = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='*' element={<ErrorPage />} />
        <Route path='/' element={<ProtectedLoginPage />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
