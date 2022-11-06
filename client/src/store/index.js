import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./login-slice";
import noteSlice from "./note-slice";
import uiSlice from "./ui-slice";

const store = configureStore({
  reducer: {
    login: loginSlice.reducer,
    note: noteSlice.reducer,
    ui: uiSlice.reducer,
  },
});

export default store;
