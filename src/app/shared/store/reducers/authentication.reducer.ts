import { createReducer, on } from '@ngrx/store';

import { IAuthenticationState } from '@otc/shared/models/state.interface';
import * as AuthenticationActions from '@otc/shared/store/actions/authentication.actions';

export const featureKey = 'authentication';

export const initialState: IAuthenticationState = {
  authenticated: false,
  error: undefined,
  loading: false,
  token: undefined
};

export const reducer = createReducer(
  initialState,
  on(AuthenticationActions.loadAuthentication, () => ({
    ...initialState,
    loading: true
  })),
  on(AuthenticationActions.loadAuthenticationSuccess, (state, action) => ({
    ...state,
    ...action.data,
    loading: false
  })),
  on(AuthenticationActions.loadAuthenticationFailure, (state, action) => ({
    ...state,
    error: action.error,
    loading: false,
    authenticated: false,
    token: undefined
  }))
);
