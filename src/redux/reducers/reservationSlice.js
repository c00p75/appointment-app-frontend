import { createSlice } from '@reduxjs/toolkit';
import { createReservation, getMyReservations } from '../actions/reservationActions';

const initialState = {
  reservations: [],
  loading: false,
  error: null,
  isLoggedIn: false,
};

const myReservationsSlice = createSlice({
  name: 'my-reservations',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getMyReservations.pending, (state) => ({
        ...state,
        loading: true,
      }))
      .addCase(getMyReservations.fulfilled, (state, { payload }) => ({
        ...state,
        reservations: payload,
        loading: false,
        error: null,
      }))
      .addCase(getMyReservations.rejected, (state, { payload }) => ({
        ...state,
        loading: false,
        error: payload,
      }))
      .addCase(createReservation.fulfilled, (state, { payload }) => ({
        ...state,
        loading: false,
        error: null,
        reservations: payload,
      }))
      .addCase(createReservation.pending, (state) => ({
        ...state,
        loading: true,
      }))
      .addCase(createReservation.rejected, (state, { payload }) => ({
        ...state,
        loading: false,
        error: payload,
        reservations: null,
      }));
  },
});

export default myReservationsSlice.reducer;
