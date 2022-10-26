import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./login-slice";
import noteSlice from "./note-slice";

const store = configureStore({
  reducer: { login: loginSlice.reducer, note: noteSlice.reducer },
});

export default store;
