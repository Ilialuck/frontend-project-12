/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpened: false,
  type: null,
  extra: null,
};

const modalSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    openModal(state, { payload }) {
      state.type = payload.type;
      state.isOpened = true;
      state.extra = payload.extra || null;
    },
    closeModal(state) {
      state.isOpened = false;
      state.type = null;
      state.extra = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
