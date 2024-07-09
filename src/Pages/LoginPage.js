import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './css/FormPage.css';
import {
  handleFormData,
  isFormFieldsEmpty,
  isEmailValid,
} from '../utils/pagesUtils';
import Alert from '../Components/Alert';
import { ALERT_INFO } from '../constants/constants';
import { resetFields } from '../utils/pagesUtils';

const LoginPage = () => {
  const navigate = useNavigate();
  const [loginFormData, setLoginFormData] = useState({
    emailId: '',
    password: '',
  });

  const [error, setError] = useState({
    isError: false,
    message: '',
  });

  const handleLogin = () => {
    const { emailId, password } = loginFormData;

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

    let registeredUsers =
      JSON.parse(localStorage.getItem('registeredUsers')) || [];

    const userCredentials = registeredUsers.filter(
      (user) => user.emailId === emailId
    );

    if (!userCredentials.length) {
      setError({
        isError: true,
        message: 'Email does not exist. First Sign up',
      });
      resetFields(setLoginFormData, ['emailId', 'password']);
      return;
    }

    if (password !== userCredentials[0].password) {
      setError({
        isError: true,
        message: 'Incorrect Email Id or Password',
      });
      return;
    }

    setError({ isError: false, message: '' });
    localStorage.setItem('isUserLoggedIn', true);
    localStorage.setItem(
      'userProfile',
      JSON.stringify({ email: emailId, password: password })
    );

    resetFields(setLoginFormData, ['emailId', 'password']);
    navigate('/HomePage');
  };

  return (
    <>
      <div className='formContainer_wrapper loginForm_wrapper'>
        <div>
          <Alert
            message={error.message}
            setError={setError}
            backGroundColor={ALERT_INFO}
          />
          <h1>Login</h1>
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

          <div>
            <button
              type='button'
              className='btn btn-info'
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
