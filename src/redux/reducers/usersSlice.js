import { createSlice } from '@reduxjs/toolkit';
import { registerUser, loginUser, LOGOUT_USER } from '../actions/userActions';

const initialState = {
  user: [],
  loading: false,
  error: null,
  isLoggedIn: false,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => ({ ...state, loading: true }))
      .addCase(registerUser.fulfilled, (state) => ({
        ...state,
        loading: false,
        error: null,
      }))
      .addCase(registerUser.rejected, (state, { payload }) => ({
        ...state,
        loading: false,
        error: payload,
      }))
      .addCase(loginUser.pending, (state) => ({ ...state, loading: true }))
      .addCase(loginUser.fulfilled, (state, { payload }) => ({
        ...state,
        loading: false,
        user: payload,
        isLoggedIn: true,
        error: null,
      }))
      .addCase(loginUser.rejected, (state, { payload }) => ({
        ...state,
        loading: false,
        error: payload,
      }))
      .addCase(LOGOUT_USER, (state) => ({
        ...state,
        user: [],
        loading: false,
        error: null,
        isLoggedIn: false,
      }));
  },
});

export default usersSlice.reducer;
