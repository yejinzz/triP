import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: {
    userId: "",
    userName: "",
    thumbNail: "/profiles/profile_1.png",
    email: "",
    createdAt: null,
  },
};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = { ...state.userInfo, ...action.payload };
    },
  },
});

export const { setUserInfo } = userSlice.actions;

export default userSlice.reducer;
