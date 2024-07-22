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
  },
});

export const { setCurrentWeather } = currentWeatherSlice.actions;

export default currentWeatherSlice.reducer;
