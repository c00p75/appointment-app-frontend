import { createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_URL } from '../../constants';
import axiosInstance from '../../config/axiosInstance';

export const getMyReservations = createAsyncThunk(
  'my-reservations',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`${BASE_URL}reservations`);

      return data;
    } catch (error) {
      return rejectWithValue({ ...error.response.data.error });
    }
  },
);

export default { getMyReservations };
