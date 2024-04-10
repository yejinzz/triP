import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./slice/modalSlice";
import scheduleReducer from "./slice/scheduleSlice";
import placeReducer from "./slice/placeSlice";
import mapReducer from "./slice/mapSlice";
import userReducer from "./slice/userSlice";
import editedScheduleReducer from "./slice/editedScheduleSlice";

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    schedule: scheduleReducer,
    editedSchedule: editedScheduleReducer,
    place: placeReducer,
    map: mapReducer,
    user: userReducer,
  },
});

export default store;
