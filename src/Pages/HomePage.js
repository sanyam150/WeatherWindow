import React, { useEffect } from 'react';
import Navbar from '../Components/Navbar';
import { useDispatch } from 'react-redux';
import { loggedIn } from '../Redux/Slices/userLoginSlice';

export const HomePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const isUserLoggedIn = localStorage.getItem('isUserLoggedIn') === 'true';
    const userProfileString = localStorage.getItem('userProfile');
    if (isUserLoggedIn && userProfileString) {
      const userProfile = JSON.parse(userProfileString);
      dispatch(
        loggedIn({
          isUserLoggedIn: true,
          userInformation: {
            email: userProfile.email,
            password: userProfile.password,
          },
          isLoading: false,
        })
      );
    }
  }, [dispatch]);

  return (
    <div>
      <Navbar />
    </div>
  );
};
