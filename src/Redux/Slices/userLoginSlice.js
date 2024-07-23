import { createSlice } from '@reduxjs/toolkit';

const userLoggedInInformationSlice = createSlice({
  name: 'loginInformation',
  initialState: {
    isUserLoggedIn: false,
    userInformation: {},
    isLoading: false,
  },
  reducers: {
    loggedIn: (state, action) => {
      const { isUserLoggedIn, userInformation, isLoading } = action.payload;
      state.isUserLoggedIn = isUserLoggedIn;
      state.userInformation = userInformation;
      state.isLoading = isLoading;
    },
    resetLoggedIn: (state) => {
      state.isUserLoggedIn = false;
      state.userInformation = {};
      state.isLoading = false;
    },
  },
});

export const { loggedIn, resetLoggedIn } = userLoggedInInformationSlice.actions;
export default userLoggedInInformationSlice.reducer;
