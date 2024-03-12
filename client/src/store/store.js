import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./slice/modalSlice";
import scheduleReducer from "./slice/scheduleSlice";
import placeReducer from "./slice/placeSlice";

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    schedule: scheduleReducer,
    place: placeReducer,
  },
});

export default store;
