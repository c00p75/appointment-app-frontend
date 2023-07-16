import { configureStore } from '@reduxjs/toolkit';
// import motorReducer from '../reducers/motorcycleReducer';
import usersSlice from '../reducers/usersSlice';
import motorcyclesSlice from '../reducers/motorcyclesSlice';

const store = configureStore({
  reducer: {
    motorcycles: motorcyclesSlice,
    users: usersSlice,
  },
});

export default store;
