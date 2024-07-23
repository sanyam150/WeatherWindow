import React, { useEffect } from 'react';
import Navbar from '../Components/Navbar/Navbar';
import { useDispatch } from 'react-redux';
import { loggedIn } from '../Redux/Slices/userLoginSlice';
import WeatherCard from '../Components/WeatherCard/WeatherCard';
import ForecastWeatherCard from '../Components/WeatherCard/ForecastWeatherCard';
import './css/HomePage.css';

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
    <>
      <Navbar />
      <div className='homePage_wrapper'>
        <div className='homePage_wrapper_container'>
          <div className='current_weather_wrapper'>
            <div className='current_weather_heading_wrapper'>
              Current Weather
            </div>
            <WeatherCard />
          </div>
          <div className='forecast_weather_wrapper'>
            <div className='forecast_weather_heading_wrapper'>
              ForeCast Weather
            </div>
            <ForecastWeatherCard />
          </div>
        </div>
      </div>
    </>
  );
};
