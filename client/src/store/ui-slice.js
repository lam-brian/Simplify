import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoginModal: {
    show: false,
    isLogin: true,
  },
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    openLoginModal(state, action) {
      state.isLoginModal.show = true;
      state.isLoginModal.isLogin = action.payload === "login" ? true : false;
    },
    closeLoginModal(state) {
      state.isLoginModal.show = false;
    },
    changeLoginModal(state) {
      state.isLoginModal.isLogin = !state.isLoginModal.isLogin;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
