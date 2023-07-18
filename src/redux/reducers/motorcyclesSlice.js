import { createSlice } from '@reduxjs/toolkit';
import {
  deleteMotorcycle,
  getMotorcycle,
  getMotorcycles,
  createMotorcycle,
} from '../actions/motorcycleActions';

const initialState = {
  motorcycles: [],
  loading: false,
  error: null,
};

const selectedMotorcycleReducer = (state, { payload }) => ({
  ...state,
  selectedMotorcycle: state.motorcycles.find(
    (motorcycle) => motorcycle.id === payload,
  ),
});

const motorcyclesSlice = createSlice({
  name: 'motorcycles',
  initialState,
  reducers: {
    selectMotorcycle: selectedMotorcycleReducer,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMotorcycles.pending, (state) => ({ ...state, loading: true }))
      .addCase(getMotorcycles.fulfilled, (state, { payload }) => ({
        ...state,
        loading: false,
        error: null,
        motorcycles: payload,
      }))
      .addCase(getMotorcycles.rejected, (state, { payload }) => ({
        ...state,
        loading: false,
        error: payload,
      }))
      .addCase(deleteMotorcycle.pending, (state) => ({
        ...state,
        loading: true,
      }))
      .addCase(deleteMotorcycle.fulfilled, (state, { payload }) => ({
        ...state,
        loading: false,
        error: null,
        motorcycles: state.motorcycles.filter((item) => item.id !== payload),
        selectedMotorcycle: null,
      }))
      .addCase(deleteMotorcycle.rejected, (state, { payload }) => ({
        ...state,
        loading: false,
        error: payload,
      }))
      .addCase(getMotorcycle.pending, (state) => ({
        ...state,
        loading: true,
      }))
      .addCase(getMotorcycle.fulfilled, (state, { payload }) => ({
        ...state,
        loading: false,
        error: null,
        selectedMotorcycle: payload,
      }))
      .addCase(getMotorcycle.rejected, (state, { payload }) => ({
        ...state,
        loading: false,
        error: payload,
        selectedMotorcycle: null,
      }))
      .addCase(createMotorcycle.fulfilled, (state, { payload }) => ({
        ...state,
        loading: false,
        error: null,
        motorcycles: payload,
      }))
      .addCase(createMotorcycle.pending, (state) => ({
        ...state,
        loading: true,
      }))
      .addCase(createMotorcycle.rejected, (state, { payload }) => ({
        ...state,
        loading: false,
        error: payload,
        motorcycles: null,
      }));
  },
});

export default motorcyclesSlice.reducer;
export const { selectMotorcycle } = motorcyclesSlice.actions;
