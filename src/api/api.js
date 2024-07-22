import axios from 'axios';
const api_key = process.env.REACT_APP_WEATHER_API_KEY;

export const fetchCityData = async (city) => {
  try {
    const response = await axios.get(
      `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${api_key}`
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const fetchCurrentWeatherData = async ({ latitude, longitude }) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${api_key}`
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const fetchForeCastWeatherData = async ({ latitude, longitude }) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${api_key}`
    );
    return response;
  } catch (error) {
    return error;
  }
};
