import { createSlice } from '@reduxjs/toolkit'; ''

const initialState = {
  isLoggedIn: (typeof window !== "undefined" && localStorage.getItem("ClientToken") === "true"),
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.user || null;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
    },
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
  },
});

export const { login, logout, updateUser } = authSlice.actions;
export default authSlice.reducer;

