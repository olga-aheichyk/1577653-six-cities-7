import { cityChange } from '../action.js';
import { createReducer } from '@reduxjs/toolkit';

const initialState = {
  activeCity: 'Paris',
};

const appChange = createReducer(initialState, (builder) => {
  builder
    .addCase(cityChange, (state, action) => {
      state.activeCity = action.payload;
    });
});

export {appChange};
