import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  context: null,
  message: null,
  showPopup: false,
  navigateTo: null,
};

const setPopupReducer = (state, { payload }) => ({
  ...state,
  showPopup: true,
  context: payload.context,
  message: payload.message,
  navigateTo: payload.navigateTo,
});

const closePopupReducer = (state) => ({ ...state, ...initialState });

const popupSlice = createSlice({
  name: 'popup',
  initialState,
  reducers: {
    setPopup: setPopupReducer,
    closePopup: closePopupReducer,
  },
});

export const { setPopup, closePopup } = popupSlice.actions;
export default popupSlice.reducer;
