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
  },
});

export const { loggedIn } = userLoggedInInformationSlice.actions;
export default userLoggedInInformationSlice.reducer;
