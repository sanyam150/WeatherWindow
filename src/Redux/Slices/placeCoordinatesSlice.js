import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  latitude: null,
  longitude: null,
};

const placeCoordinatesSlice = createSlice({
  name: 'placeCoordinates',
  initialState,
  reducers: {
    setPlaceCoordinates: (state, action) => {
      state.latitude = action.payload.latitude;
      state.longitude = action.payload.longitude;
    },
    resetPlaceCoordinates: (state) => {
      state.latitude = null;
      state.longitude = null;
    },
  },
});

export const { setPlaceCoordinates, resetPlaceCoordinates } =
  placeCoordinatesSlice.actions;

export default placeCoordinatesSlice.reducer;
