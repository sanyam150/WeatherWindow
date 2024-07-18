import React, { useState, useEffect } from 'react';
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

function WeatherCard({ weather_type = 'clouds' }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [backGroundColorTheme, setBackgroundColorTheme] =
    useState(weather_type);

  const handleExpandClick = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    setBackgroundColorTheme(setCardColorTheme(weather_type));
  }, [weather_type]);

  return (
    <>
      <div className='card-wrapper'>
        <div className='card'>
          <div className='weather_logo_wrapper'>
            {weatherImage(weather_type, backGroundColorTheme)}
          </div>
          <table className='table currentWeather_info_table'>
            <tbody>
              <tr className='weather_row_info_wrapper'>
                <td>
                  <strong>City</strong>
                </td>
                <td>New York, USA</td>
              </tr>
              <tr className='weather_row_info_wrapper'>
                <td>
                  <strong>Weather</strong>
                </td>
                <td>Rainy</td>
              </tr>
              <tr className='weather_row_info_wrapper'>
                <td>
                  <strong>Max Temp (°C)</strong>
                  <FaTemperatureHigh />
                </td>
                <td>21</td>
              </tr>
              <tr className='weather_row_info_wrapper'>
                <td>
                  <strong>Min Temp (°C)</strong>
                  <FaTemperatureLow />
                </td>
                <td>10</td>
              </tr>
              <tr className='weather_row_info_wrapper'>
                <td>
                  <strong>Wind (kmph)</strong>
                  <FaWind />
                </td>
                <td>20 </td>
              </tr>
              <tr className='weather_row_info_wrapper'>
                <td>
                  <strong>Pressure (kPa)</strong>
                  <FaTachometerAlt />
                </td>
                <td>200 </td>
              </tr>
            </tbody>
          </table>
          <div className='arrow_buttons_wrapper'>
            <IoIosArrowDropdownCircle
              style={{ color: backGroundColorTheme }}
              className={`arrow_button_down ${isExpanded ? 'hide_button' : ''}`}
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
                <td>81</td>
              </tr>
              <tr className='weather_row_info_wrapper'>
                <td>
                  <strong>Sea Level (hpa)</strong>
                </td>
                <td>1000</td>
              </tr>
              <tr className='weather_row_info_wrapper'>
                <td>
                  <strong> Ground Level (hpa)</strong>
                </td>
                <td>20</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default WeatherCard;
