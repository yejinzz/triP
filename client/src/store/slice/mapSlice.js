import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mapCenter: {
    lat: 37.5666612,
    lng: 126.9783785,
  },
  mapLevel: 8,
};

const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    setMapCenter(state, action) {
      state.mapCenter = { ...state.mapCenter, ...action.payload };
    },
    setMapLevel(state, action) {
      state.mapLevel = action.payload;
    },
  },
});

export const { setMapCenter, setMapLevel } = mapSlice.actions;

export default mapSlice.reducer;
