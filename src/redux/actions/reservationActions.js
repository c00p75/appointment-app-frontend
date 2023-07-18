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

export const createReservation = createAsyncThunk(
  'reservations/createReservations',
  async (formData, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await axiosInstance.post(`${BASE_URL}reservations`, formData);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.statusText);
    }
  },
);
