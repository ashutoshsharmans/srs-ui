import { createAction, props } from '@ngrx/store';

import { IError } from '@otc/shared/models/error.interface';
import { ILaunchDarklyFlags } from '@otc/shared/models/launch-darkly.interface';
import { IUser } from '@otc/shared/models/user.interface';

export const loadUserInfo = createAction('[User Info] Load User Info');

export const loadUserInfoSuccess = createAction('[User Info] Load User Info Success', props<{ data: IUser }>());

export const loadUserInfoFailure = createAction('[User Info] Load User Info Failure', props<{ error: IError }>());

export const updateTheme = createAction('[User Info] Update Theme', props<{ darkMode: boolean }>());

export const loadLaunchDarkly = createAction('[User Info] Load Launch Darkly', props<{ data: IUser }>());

export const loadLaunchDarklySuccess = createAction('[User Info] Load Launch Darkly Success', props<{ data: ILaunchDarklyFlags }>());

export const loadLaunchDarklyFailure = createAction('[User Info] Load Launch Darkly Failure', props<{ error: IError }>());
