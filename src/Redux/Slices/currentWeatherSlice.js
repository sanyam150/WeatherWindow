import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentWeatherData: null,
};

const currentWeatherSlice = createSlice({
  name: 'currentWeatherInfo',
  initialState,
  reducers: {
    setCurrentWeather: (state, action) => {
      state.currentWeatherData = action.payload;
    },
    resetCurrentWeather: (state) => {
      state.currentWeatherData = null;
    },
  },
});

export const { setCurrentWeather, resetCurrentWeather } =
  currentWeatherSlice.actions;

export default currentWeatherSlice.reducer;
