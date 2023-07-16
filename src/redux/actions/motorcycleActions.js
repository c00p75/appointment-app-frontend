import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../config/axiosInstance';
import { BASE_URL } from '../../constants';

export const FETCH_MOTORCYCLES_SUCCESS = 'FETCH_MOTORCYCLES_SUCCESS';

export const fetchMotorcyclesSuccess = (motorcycles) => ({
  type: FETCH_MOTORCYCLES_SUCCESS,
  payload: motorcycles,
});

export const fetchMotorcycles = () => (dispatch) => {
  axiosInstance
    .get(`${BASE_URL}motorcycles/`)
    .then((response) => {
      dispatch(fetchMotorcyclesSuccess(response.data));
    })
    .catch((error) => {
      console.error('Error fetching motorcycles:', error);
    });
};

export const getMotorcycles = createAsyncThunk(
  'motorcycles/getMotorcycles',
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`${BASE_URL}motorcycles`);

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue({ ...error.response.data.error });
    }
  },
);

export const getMotorcycle = createAsyncThunk(
  'motorcycles/getMotorcycle',
  async (id, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`${BASE_URL}motorcycles/${id}`);

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue({ ...error.response.data.error });
    }
  },
);

export const deleteMotorcycle = createAsyncThunk(
  'motorcycles/deleteMotorcycle',
  async (id, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await axiosInstance.delete(
        `${BASE_URL}motorcycles/${id}`,
      );

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue({ ...error.response.data.error });
    }
  },
);
