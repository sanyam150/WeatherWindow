import { configureStore } from '@reduxjs/toolkit';
import userLoggedInInformationSlice from '../Redux/Slices/userLoginSlice';

export const Store = configureStore({
  reducer: {
    userInfo: userLoggedInInformationSlice,
  },
});
