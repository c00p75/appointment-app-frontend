import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../config/axiosInstance';
import axiosMultipartInstance from '../../config/axiosMultipartInstance';
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
      // eslint-disable-next-line no-console
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

export const createMotorcycle = createAsyncThunk(
  'motorcycles/createMotorcycle',
  async (formData, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await axiosMultipartInstance.post(`${BASE_URL}motorcycles`, formData);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.statusText);
    }
  },
);

export const getUserMotorcycles = createAsyncThunk(
  'motorcycles/getUserMotorcycles',
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`${BASE_URL}motorcycles/user_motorcycles`);

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue({ ...error.response.data.error });
    }
  },
);
