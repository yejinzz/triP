import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setOpenModal: (state) => {
      // const { modalType } = actions.payload;
      state.isOpen = true;
    },
    setCloseModal: (state) => {
      state.isOpen = false;
    },
  },
});

export const { setOpenModal, setCloseModal } = modalSlice.actions;

export default modalSlice.reducer;
