import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  destination: {
    coords: {
      lat: null,
      lng: null,
    },
    regionCode: null,
    regionName: null,
    regionImg: null,
  },
};

export const placeSlice = createSlice({
  name: "place",
  initialState,
  reducers: {
    setDestination: (state, action) => {
      state.destination = { ...state.destination, ...action.payload };
    },
  },
});

export const { setDestination } = placeSlice.actions;

export default placeSlice.reducer;
