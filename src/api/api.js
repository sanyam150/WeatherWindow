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
