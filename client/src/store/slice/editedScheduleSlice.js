import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isEdit: false,
  editedSchedules: {},
};

export const editedScheduleSlice = createSlice({
  name: "editedSchedule",
  initialState,
  reducers: {
    setEditMode: (state, action) => {
      state.isEdit = action.payload;
    },
    setEditedSchedule: (state, action) => {
      state.editedSchedules = action.payload;
    },
  },
});

export const { setEditMode, setEditedSchedule } = editedScheduleSlice.actions;

export default editedScheduleSlice.reducer;
