import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import '../css/ForecastWeatherCard.css';
import {
  weatherImage,
  setCardColorTheme,
  timeData,
} from '../../utils/pagesUtils';
import { temperatureConversion } from '../../utils/pagesUtils';

const ForecastWeatherCard = () => {
  const sliderRef = useRef(null);

  const temperatureScale = useSelector((state) => state.temperatureScale.scale);
  const forecastData = useSelector(
    (state) => state.forecastWeatherInformation.forecastWeatherData
  );

  useEffect(() => {
    const slider = sliderRef.current;
    const handleMouseEnter = () => {
      slider.style.animationPlayState = 'paused';
    };

    const handleMouseLeave = () => {
      slider.style.animationPlayState = 'running';
    };
    if (slider) {
      slider.addEventListener('mouseenter', handleMouseEnter);
      slider.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (slider) {
        slider.removeEventListener('mouseenter', handleMouseEnter);

        slider.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [forecastData]);

  const setColorThemeImage = (weatherData) => {
    const { main } = weatherData[0];
    const colorTheme = setCardColorTheme(main);
    return weatherImage(main, colorTheme);
  };

  const setTimeData = (time) => {
    let currentTime = timeData(time);
    return (
      <>
        <p style={{ margin: '0.3rem 0', textAlign: 'center' }}>
          <strong>
            {currentTime.dayOfMonth}/{currentTime.month}/{currentTime.year}
          </strong>
        </p>
        <p style={{ margin: '0.3rem 0', textAlign: 'center' }}>
          <strong>{currentTime.time}</strong>
        </p>
      </>
    );
  };

  const displayedForecastData =
    forecastData && forecastData.length && forecastData.slice(0, 5);

  return (
    displayedForecastData &&
    displayedForecastData.length > 0 && (
      <div className='forecast_weather_card_slider'>
        <div className='forecast_weather_card_slider_track' ref={sliderRef}>
          {displayedForecastData.map((element, index) => (
            <div
              className='forecast_weather_card_slides'
              key={`element${index}`}
            >
              <div className='forecast_weather_card_image_wrapper'>
                {setColorThemeImage(element.weather)}
              </div>
              <div className='card-body'>
                <h5>{setTimeData(element.dt)}</h5>
                <table className='table forecast_weather_info_table'>
                  <tbody>
                    <tr>
                      <td>
                        <strong>Description</strong>
                      </td>
                      <td>{element.weather[0].description}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Max Temp (°C)</strong>
                      </td>
                      <td>
                        {temperatureConversion(
                          temperatureScale,
                          element.main.temp_max
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Min Temp (°C)</strong>
                      </td>
                      <td>
                        {temperatureConversion(
                          temperatureScale,
                          element.main.temp_min
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Humidity (%)</strong>
                      </td>
                      <td>{element.main.humidity}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          ))}
          {displayedForecastData.map((element, index) => (
            <div
              className='forecast_weather_card_slides'
              key={`element$_${index}`}
            >
              <div className='forecast_weather_card_image_wrapper'>
                {setColorThemeImage(element.weather)}
              </div>
              <div className='card-body'>
                <h5>{setTimeData(element.dt)}</h5>
                <table className='table forecast_weather_info_table'>
                  <tbody>
                    <tr>
                      <td>
                        <strong>Description</strong>
                      </td>
                      <td>{element.weather[0].description}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Max Temp (°C)</strong>
                      </td>
                      <td>
                        {temperatureConversion(
                          temperatureScale,
                          element.main.temp_max
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Min Temp (°C)</strong>
                      </td>
                      <td>
                        {temperatureConversion(
                          temperatureScale,
                          element.main.temp_min
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Humidity (%)</strong>
                      </td>
                      <td>{element.main.humidity}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  );
};

export default ForecastWeatherCard;
