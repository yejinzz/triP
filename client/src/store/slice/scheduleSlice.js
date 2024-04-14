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
  startDate: null,
  endDate: null,
  selectedDay: "day 1",
  schedules: {},
};

export const scheduleSlice = createSlice({
  name: "schedule",
  initialState,
  reducers: {
    setDestination: (state, action) => {
      state.destination = { ...state.destination, ...action.payload };
    },
    setStartDate: (state, action) => {
      state.startDate = action.payload;
    },
    setEndDate: (state, action) => {
      state.endDate = action.payload;
    },
    setSelectDay: (state, action) => {
      state.selectedDay = `day ${action.payload}`;
    },
    setInitSchedule: (state, action) => {
      const { dayDiff } = action.payload;

      for (let i = 1; i <= dayDiff; i++) {
        const dayKey = `day ${i}`;
        if (!state.schedules[dayKey]) {
          state.schedules[dayKey] = [];
        }
      }
    },
    setSchedule: (state, action) => {
      const { day, schedule } = action.payload;
      state.schedules[day] = [...state.schedules[day], schedule];
    },
    editSchedule: (state, action) => {
      state.schedules = { ...state.schedules, ...action.payload };
    },
  },
});

export const {
  setDestination,
  setStartDate,
  setEndDate,
  setSelectDay,
  setInitSchedule,
  setSchedule,
  editSchedule,
} = scheduleSlice.actions;

export default scheduleSlice.reducer;
