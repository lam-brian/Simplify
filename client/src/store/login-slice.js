import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  user: {
    username: "",
    email: "",
    id: "",
  },
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      state.user.id = action.payload.id;
      state.user.username = action.payload.username;
      state.user.email = action.payload.email;
    },
    logout(state) {
      state.isLoggedIn = false;
    },
  },
});

export const loginActions = loginSlice.actions;

export default loginSlice;
