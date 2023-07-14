import { configureStore } from '@reduxjs/toolkit';
import motorReducer from '../reducers/motorcycleReducer';
import usersSlice from '../reducers/usersSlice';

const store = configureStore({
  reducer: {
    motorcycles: motorReducer,
    users: usersSlice,
  },
});

export default store;
