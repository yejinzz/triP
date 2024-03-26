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
  selectedPlace: null,
  // const [selectedPlace, setSelectedPlace] = useState(null);
};

export const placeSlice = createSlice({
  name: "place",
  initialState,
  reducers: {
    setDestination: (state, action) => {
      state.destination = { ...state.destination, ...action.payload };
    },
    setSelectedPlace: (state, action) => {
      state.selectedPlace = action.payload;
    },
  },
});

export const { setDestination, setSelectedPlace } = placeSlice.actions;

export default placeSlice.reducer;
