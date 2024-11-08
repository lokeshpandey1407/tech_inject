import { createSlice } from "@reduxjs/toolkit";

//Initial State Object
const initialState = {
  isAuthenticated: false,
  token: null,
  userName: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signin: (state, action) => {
      state.isAuthenticated = true;
      state.userName = action.payload.username;
      state.token = action.payload.token;
    },
    signout: (state) => {
      state.isAuthenticated = false;
      state.userName = null;
      state.token = null;
    },
  },
  // extraReducers: {},
});

export const authReducer = authSlice.reducer;
export const authSelector = (state) => state.authReducer;
export const { signin, signout } = authSlice.actions;
