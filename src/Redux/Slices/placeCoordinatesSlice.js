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
  },
});

export const { setPlaceCoordinates } = placeCoordinatesSlice.actions;

export default placeCoordinatesSlice.reducer;
