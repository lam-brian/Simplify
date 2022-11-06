import { createSlice } from "@reduxjs/toolkit";
import { uiActions } from "./ui-slice";

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
      state.user.username = action.payload.name;
      state.user.email = action.payload.email;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.user.id = "";
      state.user.username = "";
      state.user.email = "";
    },
  },
});

export const loginActions = loginSlice.actions;

export const logUserIn = (enteredEmail, enteredPassword) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/users/login`,
        {
          method: "POST",
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPassword,
          }),
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      const { id, name, email } = data.user;

      dispatch(loginActions.login({ id, name, email }));
      dispatch(uiActions.closeLoginModal());
    } catch (err) {
      alert(err);
    }
  };
};

export const signUserUp = (enteredName, enteredEmail, enteredPassword) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/users`,
        {
          method: "POST",
          body: JSON.stringify({
            name: enteredName,
            email: enteredEmail,
            password: enteredPassword,
          }),
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.errors[0].message);
      }

      const { id, name, email } = data;

      dispatch(loginActions.login({ id, name, email }));
      dispatch(uiActions.closeLoginModal());
    } catch (err) {
      alert(err);
    }
  };
};

export const deleteAccount = (uid) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/users/${uid}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      dispatch(loginActions.logout());
    } catch (err) {
      alert(err);
    }
  };
};

export default loginSlice;
