import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  scale: 'degree_Celcius',
};

const temperatureScaleSlice = createSlice({
  name: 'temperatureScale',
  initialState,
  reducers: {
    setTemperatureScale: (state, action) => {
      state.scale = action.payload;
    },
  },
});

export const { setTemperatureScale } = temperatureScaleSlice.actions;

export default temperatureScaleSlice.reducer;
