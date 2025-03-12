import { createFeatureSelector, createSelector } from '@ngrx/store';

import { IAuthenticationState, IUserState } from '@otc/shared/models/state.interface';
import { featureKey } from '@otc/shared/store/reducers/user.reducer';
import * as AuthenticationSelectors from '@otc/shared/store/selectors/authentication.selectors';

export const selectUserState = createFeatureSelector<IUserState>(featureKey);

export const selectUserWithAuthenticationState = createSelector(selectUserState, AuthenticationSelectors.selectAuthenticationState, (user, auth: IAuthenticationState) => ({
  user,
  auth
}));
