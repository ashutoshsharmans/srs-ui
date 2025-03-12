import { createFeatureSelector } from '@ngrx/store';

import { IAuthenticationState } from '@otc/shared/models/state.interface';
import { featureKey } from '@otc/shared/store/reducers/authentication.reducer';

export const selectAuthenticationState = createFeatureSelector<IAuthenticationState>(featureKey);
