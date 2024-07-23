import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  forecastWeatherData: null,
};

const forecastWeatherSlice = createSlice({
  name: 'forecastWeatherInfo',
  initialState,
  reducers: {
    setForecastWeather: (state, action) => {
      state.forecastWeatherData = action.payload;
    },
  },
});

export const { setForecastWeather } = forecastWeatherSlice.actions;

export default forecastWeatherSlice.reducer;
