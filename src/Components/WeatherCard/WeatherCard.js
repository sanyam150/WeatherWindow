import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import '../css/WeatherCard.css';
import {
  IoIosArrowDropdownCircle,
  IoIosArrowDropupCircle,
} from 'react-icons/io';
import {
  FaTemperatureHigh,
  FaTemperatureLow,
  FaWind,
  FaTachometerAlt,
} from 'react-icons/fa';
import { setCardColorTheme, weatherImage } from '../../utils/pagesUtils';
import ToggleButton from '../ToggleButton/ToggleButton';

import { temperatureConversion } from '../../utils/pagesUtils';

function WeatherCard() {
  const temperatureScale = useSelector((state) => state.temperatureScale.scale);
  const { currentWeatherData } = useSelector(
    (state) => state.currentWeatherInformation
  );

  const [isExpanded, setIsExpanded] = useState(false);
  const [backGroundColorTheme, setBackgroundColorTheme] = useState(
    currentWeatherData?.weather?.[0]?.main ?? ''
  );

  const handleExpandClick = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    setBackgroundColorTheme(
      setCardColorTheme(currentWeatherData?.weather?.[0]?.main ?? '')
    );
  }, [currentWeatherData]);

  return (
    <>
      {currentWeatherData && (
        <div className='card-wrapper'>
          <div className='card'>
            <div className='weather_logo_wrapper'>
              {weatherImage(
                currentWeatherData.weather[0].main,
                backGroundColorTheme
              )}
              <ToggleButton />
            </div>
            <table className='table currentWeather_info_table'>
              <tbody>
                <tr className='weather_row_info_wrapper'>
                  <td>
                    <strong>City</strong>
                  </td>
                  <td>
                    {currentWeatherData.name} ({currentWeatherData.sys.country})
                  </td>
                </tr>
                <tr className='weather_row_info_wrapper'>
                  <td>
                    <strong>Weather</strong>
                  </td>
                  <td>{currentWeatherData.weather[0].main}</td>
                </tr>
                <tr className='weather_row_info_wrapper'>
                  <td>
                    <strong>Max Temp (°C)</strong>
                    <FaTemperatureHigh />
                  </td>
                  <td>
                    {temperatureConversion(
                      temperatureScale,
                      currentWeatherData.main.temp_max
                    )}
                  </td>
                </tr>
                <tr className='weather_row_info_wrapper'>
                  <td>
                    <strong>Min Temp (°C)</strong>
                    <FaTemperatureLow />
                  </td>
                  <td>
                    {temperatureConversion(
                      temperatureScale,
                      currentWeatherData.main.temp_min
                    )}
                  </td>
                </tr>
                <tr className='weather_row_info_wrapper'>
                  <td>
                    <strong>Wind (m/s)</strong>
                    <FaWind />
                  </td>
                  <td>{currentWeatherData.wind.speed}</td>
                </tr>
                <tr className='weather_row_info_wrapper'>
                  <td>
                    <strong>Pressure (hPa)</strong>
                    <FaTachometerAlt />
                  </td>
                  <td>{currentWeatherData.main.pressure} </td>
                </tr>
              </tbody>
            </table>
            <div className='arrow_buttons_wrapper'>
              <IoIosArrowDropdownCircle
                style={{ color: backGroundColorTheme }}
                className={`arrow_button_down ${
                  isExpanded ? 'hide_button' : ''
                }`}
                onClick={handleExpandClick}
              />
              <IoIosArrowDropupCircle
                style={{ color: backGroundColorTheme }}
                className={`arrow_button_up ${isExpanded ? '' : 'hide_button'}`}
                onClick={handleExpandClick}
              />
            </div>
          </div>
          <div
            className={`hidden-content ${
              isExpanded ? 'showDescription' : 'hideDescription'
            }`}
          >
            <table className='table currentWeather_info_table'>
              <tbody>
                <tr className='weather_row_info_wrapper'>
                  <td>
                    <strong>Humidity (%)</strong>
                  </td>
                  <td>{currentWeatherData.main.humidity}</td>
                </tr>
                <tr className='weather_row_info_wrapper'>
                  <td>
                    <strong>Sea Level (hpa)</strong>
                  </td>
                  <td>{currentWeatherData.main.sea_level}</td>
                </tr>
                <tr className='weather_row_info_wrapper'>
                  <td>
                    <strong> Ground Level (hpa)</strong>
                  </td>
                  <td>{currentWeatherData.main.grnd_level}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}

export default WeatherCard;
