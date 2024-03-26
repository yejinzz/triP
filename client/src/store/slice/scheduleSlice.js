import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  startDate: null,
  endDate: null,
  selectedDay: "day 1",
  schedules: {},
};

export const scheduleSlice = createSlice({
  name: "schedule",
  initialState,
  reducers: {
    setStartDate: (state, action) => {
      state.startDate = action.payload;
    },
    setEndDate: (state, action) => {
      state.endDate = action.payload;
    },
    setSelectDay: (state, action) => {
      state.selectedDay = action.payload;
    },
    setSchedule: (state, action) => {
      // console.log(action.payload);
      const { day, schedule } = action.payload;
      if (!state.schedules[day]) {
        state.schedules[day] = [];
      }
      // state.schedules[day].push(schedule);
      state.schedules[day] = [...state.schedules[day], schedule];
    },
  },
});

export const { setStartDate, setEndDate, setSelectDay, setSchedule } =
  scheduleSlice.actions;

export default scheduleSlice.reducer;
