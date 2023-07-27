import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import usersSlice from '../reducers/usersSlice';
import motorcyclesSlice from '../reducers/motorcyclesSlice';
import popupSlice from '../reducers/popupSlice';
import reservations from '../reducers/reservationSlice';

const weAreNotLive = process.env.NODE_ENV !== 'production';
const store = configureStore({
  reducer: {
    reservations,
    motorcycles: motorcyclesSlice,
    users: usersSlice,
    popup: popupSlice,
  },
  middleware: (getDefaultMiddleware) => {
    if (weAreNotLive) return getDefaultMiddleware().concat(logger);
    return getDefaultMiddleware();
  },
  devTools: weAreNotLive,
});

export default store;
