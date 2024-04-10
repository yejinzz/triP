import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedPlace: null,
  searchResult: [],
};

export const placeSlice = createSlice({
  name: "place",
  initialState,
  reducers: {
    setSelectedPlace: (state, action) => {
      state.selectedPlace = action.payload;
    },
    setSearchPlace: (state, action) => {
      state.searchResult = action.payload;
    },
  },
});

export const { setSelectedPlace, setSearchPlace } = placeSlice.actions;

export default placeSlice.reducer;
