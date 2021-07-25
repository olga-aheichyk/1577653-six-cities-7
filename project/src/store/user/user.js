import { authorizationRequired, logIn, logOut } from '../action.js';
import { AuthorizationStatus } from '../../consts.js';
import {createReducer} from '@reduxjs/toolkit';

const initialState = {
  authorizationStatus: AuthorizationStatus.UNKNOWN,
  userEmail: null,
  userAvatarUrl: null,
  //serverError: false,
};

const user = createReducer(initialState, (builder) => {
  builder
    .addCase(authorizationRequired, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(logIn, (state, action) => {
      state.authorizationStatus = AuthorizationStatus.AUTH;
      state.userEmail = action.payload.email;
      state.userAvatarUrl = action.payload.avatarUrl;
    })
    .addCase(logOut, (state) => {
      state.authorizationStatus = AuthorizationStatus.NO_AUTH;
      state.userEmail = null;
      state.userAvatarUrl = null;
    });
});

export {user};
