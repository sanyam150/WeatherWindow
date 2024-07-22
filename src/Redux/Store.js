import { configureStore } from '@reduxjs/toolkit';
import userLoggedInInformationSlice from '../Redux/Slices/userLoginSlice';
import temperatureScaleReducer from './Slices/temperatureScaleSlice';
import placeCoordinatesSlice from './Slices/placeCoordinatesSlice';
import currentWeatherSlice from './Slices/currentWeatherSlice';

export const Store = configureStore({
  reducer: {
    userInfo: userLoggedInInformationSlice,
    temperatureScale: temperatureScaleReducer,
    placeCoordinates: placeCoordinatesSlice,
    currentWeatherInformation: currentWeatherSlice,
  },
});
