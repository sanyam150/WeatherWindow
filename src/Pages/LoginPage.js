import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './css/LoginPage.css';
import {
  handleFormData,
  isFormFieldsEmpty,
  isEmailValid,
} from '../utils/pagesUtils';
import Alert from '../Components/Alert';
import { ALERT_INFO } from '../constants/constants';

const LoginPage = () => {
  const navigate = useNavigate();
  const [loginFormData, setLoginFormData] = useState({
    emailId: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState({
    isError: false,
    message: '',
  });

  const handleLogin = () => {
    const { emailId, password, confirmPassword } = loginFormData;

    const { emptyFields } = isFormFieldsEmpty(loginFormData);
    if (emptyFields) {
      let updatedEmptyFields = emptyFields.trim().split(' ').join(',');
      setError({
        isError: true,
        message: `Fields missing: ${updatedEmptyFields}`,
      });
      return;
    }

    const isEmailIdValid = isEmailValid(emailId);
    if (!isEmailIdValid) {
      setError({ isError: true, message: 'Invalid email address.' });
      return;
    }
    if (password.length < 6) {
      setError({
        isError: true,
        message: 'Password must be atleast 6 characters',
      });
      return;
    }

    if (password !== confirmPassword) {
      setError({ isError: true, message: 'Passwords do not match.' });
      return;
    }

    setError({ isError: false, message: '' });
    localStorage.setItem('isUserLoggedIn', true);
    localStorage.setItem(
      'userProfile',
      JSON.stringify({ email: emailId, password: password })
    );

    setLoginFormData({
      emailId: '',
      password: '',
      confirmPassword: '',
    });
    navigate('/HomePage');
  };

  return (
    <>
      <div className='loginPage_wrapper'>
        <div>
          <Alert
            message={error.message}
            setError={setError}
            backGroundColor={ALERT_INFO}
          />
          <h2>Login</h2>
          <div className='form-floating mb-3'>
            <input
              type='email'
              className='form-control'
              placeholder='name@example.com'
              id='login_email_input'
              name='emailId'
              value={loginFormData.emailId}
              onChange={(e) => handleFormData(e, setLoginFormData)}
            />
            <label htmlFor='login_email_input'>Email address</label>
          </div>
          <div className='form-floating mb-3'>
            <input
              type='password'
              className='form-control'
              placeholder='Password'
              id='login_password_input'
              name='password'
              value={loginFormData.password}
              onChange={(e) => handleFormData(e, setLoginFormData)}
            />
            <label htmlFor='login_password_input'>Password</label>
          </div>
          <div className='form-floating mb-3'>
            <input
              type='password'
              className='form-control'
              placeholder='Confirm Password'
              id='login_confirm_password_input'
              name='confirmPassword'
              value={loginFormData.confirmPassword}
              onChange={(e) => handleFormData(e, setLoginFormData)}
            />
            <label htmlFor='login_confirm_password_input'>
              Confirm Password
            </label>
          </div>
          <div>
            <button
              type='button'
              className='btn btn-outline-info'
              onClick={handleLogin}
            >
              Submit
            </button>
          </div>
          <p>
            <Link className='link-opacity-100-hover' to='/SignUpPage'>
              Don't have an account ? Sign up now
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
