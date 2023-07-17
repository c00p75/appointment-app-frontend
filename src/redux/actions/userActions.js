import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';
import { USER_BASE_URL, BASE_URL } from '../../constants';
import axiosInstance from '../../config/axiosInstance';

const registerUser = createAsyncThunk(
  'users/registerUser',
  async (user, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await axios.post(`${USER_BASE_URL}sign_up`, user);

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue({ ...error.response.data.error });
    }
  },
);

const loginUser = createAsyncThunk(
  'users/loginUser',
  async (userData, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await axios.post(`${USER_BASE_URL}sign_in`, userData);

      Cookies.set('accessToken', data.token);
      Cookies.set('refresh_token', data.refresh_token);
      localStorage.setItem('user', JSON.stringify(data));

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue({ ...error.response.data.error });
    }
  },
);

const restrictedLink = createAsyncThunk(
  'app/restricted',
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`${BASE_URL}pages/restricted`);

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue({ ...error.response.data.error });
    }
  },
);

const restrictedLinkHome = createAsyncThunk(
  'app/home',
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`${BASE_URL}pages/home`);

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue({ ...error.response.data.error });
    }
  },
);

const resetUser = () => {
  Cookies.remove('accessToken');
  Cookies.remove('refresh_token');
  localStorage.clear();
};

const LOGOUT_USER = 'LOGOUT_USER';

// logout action creator
const logoutUser = () => {
  resetUser();

  return {
    type: LOGOUT_USER,
  };
};

export {
  registerUser,
  loginUser,
  logoutUser,
  LOGOUT_USER,
  restrictedLink,
  restrictedLinkHome,
};
