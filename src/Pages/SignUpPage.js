import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './css/FormPage.css';
import {
  handleFormData,
  isFormFieldsEmpty,
  isEmailValid,
} from '../utils/pagesUtils';
import Alert from '../Components/Alert';
import { ALERT_DANGER } from '../constants/constants';
import { sleep } from '../utils/pagesUtils';
import { resetFields } from '../utils/pagesUtils';

const SignUpPage = () => {
  const navigate = useNavigate();
  const [signUpFormData, setSignUpFormData] = useState({
    emailId: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState({
    isError: false,
    message: '',
  });

  const handleSignUp = async () => {
    const { emailId, password, confirmPassword } = signUpFormData;
    const { emptyFields } = isFormFieldsEmpty(signUpFormData);
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

    const newUser = { emailId, password };
    let registeredUsers =
      JSON.parse(localStorage.getItem('registeredUsers')) || [];

    const emailExists = registeredUsers.some(
      (user) => user.emailId === emailId
    );

    if (emailExists) {
      setError({ isError: true, message: 'Email address already registered.' });
      return;
    }

    registeredUsers.push(newUser);
    localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
    setError({ isError: true, message: 'Email registered successfully.' });
    resetFields(setSignUpFormData, ['emailId', 'password', 'confirmPassword']);
    await sleep(2);
    navigate('/');
  };

  return (
    <>
      <div className='formContainer_wrapper signUpForm_wrapper'>
        <div>
          <Alert
            message={error.message}
            setError={setError}
            backGroundColor={ALERT_DANGER}
          />
          <h1>SignUp</h1>
          <div className='form-floating mb-3'>
            <input
              type='email'
              className='form-control'
              placeholder='name@example.com'
              id='signUp_email_input'
              name='emailId'
              value={signUpFormData.emailId}
              onChange={(e) => handleFormData(e, setSignUpFormData)}
            />
            <label htmlFor='signUp_email_input'>Email address</label>
          </div>
          <div className='form-floating mb-3'>
            <input
              type='password'
              className='form-control'
              placeholder='Password'
              id='signUp_password_input'
              name='password'
              value={signUpFormData.password}
              onChange={(e) => handleFormData(e, setSignUpFormData)}
            />
            <label htmlFor='signUp_password_input'>Password</label>
          </div>
          <div className='form-floating mb-3'>
            <input
              type='password'
              className='form-control'
              placeholder='Confirm Password'
              id='signUp_confirm_password_input'
              name='confirmPassword'
              value={signUpFormData.confirmPassword}
              onChange={(e) => handleFormData(e, setSignUpFormData)}
            />
            <label htmlFor='signUp_confirm_password_input'>
              Confirm Password
            </label>
          </div>

          <div>
            <button
              type='button'
              className='btn btn-danger'
              onClick={handleSignUp}
            >
              Submit
            </button>
          </div>
          <p>
            <Link className='link-opacity-100-hover' to='/'>
              Already have an account? Please log in.
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;
