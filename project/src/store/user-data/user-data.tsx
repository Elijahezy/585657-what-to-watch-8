import {createReducer} from '@reduxjs/toolkit';
import {UserData} from '../../types/state';
import {requireAuthorization, requireLogout, loadUser} from '../action';
import { AuthorizationStatus } from '../../const';

const initialState: UserData = {
  user: {
    id: 0,
    email: '',
    name: '',
    avatarUrl: '',
    token: '',
  },
  authorizationStatus: AuthorizationStatus.Unknown,
  isDataLoaded: false,
};

const userData = createReducer(initialState, (builder) => {
  builder
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
      state.isDataLoaded = true;
    })
    .addCase(requireLogout, (state) => {
      state.authorizationStatus = AuthorizationStatus.NoAuth;
    })
    .addCase(loadUser, (state, action) => {
      const {user} = action.payload;
      state.user = user;
    });
});

export {userData};
