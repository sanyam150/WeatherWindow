import React, { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { loggedIn } from '../Redux/Slices/userLoginSlice';
import WeatherCard from '../Components/WeatherCard/WeatherCard';
import ForecastWeatherCard from '../Components/WeatherCard/ForecastWeatherCard';
import { setHomePageBackground } from '../utils/pagesUtils';
import './css/HomePage.css';

export const HomePage = () => {
  const dispatch = useDispatch();
  const [backgroundImageUrl, setBackgroundImageUrl] = useState('');
  const currentWeatherInformation = useSelector(
    (state) => state.currentWeatherInformation?.currentWeatherData?.weather[0]
  );

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

  useEffect(() => {
    const updateBackgroundImage = async () => {
      if (currentWeatherInformation) {
        const homePageURL = setHomePageBackground(currentWeatherInformation);
        setBackgroundImageUrl(homePageURL);
      }
    };

    updateBackgroundImage();
  }, [currentWeatherInformation]);

  const homePageStyle = {
    backgroundImage: `url(${backgroundImageUrl})`,
  };
  return (
    <>
      <Navbar />
      {currentWeatherInformation && (
        <div className='homePage_wrapper' style={homePageStyle}>
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
      )}
    </>
  );
};
