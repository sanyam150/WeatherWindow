import React, { useEffect, useRef } from 'react';
import '../css/ForecastWeatherCard.css';
import {
  weatherImage,
  setCardColorTheme,
  timeData,
} from '../../utils/pagesUtils';

const ForecastWeatherCard = (props) => {
  const { forecastData } = props;
  const sliderRef = useRef(null);

  useEffect(() => {
    const slider = sliderRef.current;
    const handleMouseEnter = () => {
      slider.style.animationPlayState = 'paused';
    };

    const handleMouseLeave = () => {
      slider.style.animationPlayState = 'running';
    };

    slider.addEventListener('mouseenter', handleMouseEnter);
    slider.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      slider.removeEventListener('mouseenter', handleMouseEnter);
      slider.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

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

  return (
    <div className='forecast_weather_card_slider'>
      <div className='forecast_weather_card_slider_track' ref={sliderRef}>
        {forecastData.length > 0 &&
          forecastData.map((element, index) => (
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
                      <td>{(element.main.temp_max - 273).toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Min Temp (°C)</strong>
                      </td>
                      <td>{(element.main.temp_min - 273).toFixed(2)}</td>
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
        {forecastData.length > 0 &&
          forecastData.map((element, index) => (
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
                      <td>{(element.main.temp_max - 273).toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Min Temp (°C)</strong>
                      </td>
                      <td>{(element.main.temp_min - 273).toFixed(2)}</td>
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
  );
};

export default ForecastWeatherCard;
