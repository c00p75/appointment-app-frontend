import { createSlice } from '@reduxjs/toolkit';
import { getMyReservations } from '../actions/reservationActions';

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
      }));
  },
});

export default myReservationsSlice.reducer;
