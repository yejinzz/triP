import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modalOpen: false,
  dialogOpen: false,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setOpenModal: (state) => {
      state.modalOpen = true;
    },
    setCloseModal: (state) => {
      state.modalOpen = false;
    },
    setOpenDialog: (state) => {
      state.dialogOpen = true;
    },
    setCloseDialog: (state) => {
      state.dialogOpen = false;
    },
  },
});

export const { setOpenModal, setCloseModal, setOpenDialog, setCloseDialog } =
  modalSlice.actions;

export default modalSlice.reducer;
