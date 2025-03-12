import { createAction, props } from '@ngrx/store';

import { IAuthentication } from '@otc/shared/models/authentication.interface';
import { IError } from '@otc/shared/models/error.interface';

export const loadAuthentication = createAction('[Authentication] Load Authentication', props<{ returnUrl: string }>());

export const loadAuthenticationSuccess = createAction('[Authentication] Load Authentication Success', props<{ data: IAuthentication }>());

export const loadAuthenticationFailure = createAction('[Authentication] Load Authentication Failure', props<{ error: IError }>());

export const removeAuthentication = createAction('[Authentication] Remove Authentication');
