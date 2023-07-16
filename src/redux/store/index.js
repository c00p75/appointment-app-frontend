import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import motorReducer from '../reducers/motorcycleReducer';
import usersSlice from '../reducers/usersSlice';

const weAreNotLive = process.env.NODE_ENV !== 'production';
const store = configureStore({
  reducer: {
    motorcycles: motorReducer,
    users: usersSlice,
  },
  middleware: (getDefaultMiddleware) => {
    if (weAreNotLive) return getDefaultMiddleware().concat(logger);
    return getDefaultMiddleware();
  },
  devTools: weAreNotLive,
});

export default store;
