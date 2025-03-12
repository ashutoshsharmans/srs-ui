import { StatusCodes } from 'http-status-codes';

import { IError } from '@otc/shared/models/error.interface';
import { ILaunchDarklyFlags } from '@otc/shared/models/launch-darkly.interface';
import { IUser } from '@otc/shared/models/user.interface';
import * as UserActions from '@otc/shared/store/actions/user.actions';

describe('User Actions', () => {
  it('should create a "loadUserInfo" action', () => {
    const action = UserActions.loadUserInfo();

    expect(action.type).toBe('[User Info] Load User Info');
  });

  it('should create a "loadUserInfoSuccess" action', () => {
    const data = { data: {} as IUser };
    const action = UserActions.loadUserInfoSuccess({ data: {} as IUser });

    expect(action.type).toBe('[User Info] Load User Info Success');
    expect(action.data).toEqual(data.data);
  });

  it('should create a "loadUserInfoFailure" action', () => {
    const error: IError = {
      message: 'Authentication failed',
      code: 'ABC-123',
      status: StatusCodes.UNAUTHORIZED,
      title: 'Authorized'
    };
    const action = UserActions.loadUserInfoFailure({ error });

    expect(action.type).toBe('[User Info] Load User Info Failure');
    expect(action.error).toEqual(error);
  });

  it('should create a "loadLaunchDarkly" action', () => {
    const action = UserActions.loadLaunchDarkly({ data: {} as IUser });

    expect(action.type).toBe('[User Info] Load Launch Darkly');
  });

  it('should create a "loadLaunchDarklySuccess" action', () => {
    const data = { data: {} as ILaunchDarklyFlags };
    const action = UserActions.loadLaunchDarklySuccess(data);

    expect(action.type).toBe('[User Info] Load Launch Darkly Success');
    expect(action.data).toEqual(data.data);
  });

  it('should create a "loadLaunchDarklyFailure" action', () => {
    const error: IError = {
      message: 'Authentication failed',
      code: 'ABC-123',
      status: StatusCodes.UNAUTHORIZED,
      title: 'Authorized'
    };
    const action = UserActions.loadLaunchDarklyFailure({ error });

    expect(action.type).toBe('[User Info] Load Launch Darkly Failure');
    expect(action.error).toEqual(error);
  });

  it('should create a "updateTheme" action', () => {
    const data = { darkMode: true };
    const action = UserActions.updateTheme(data);

    expect(action.type).toBe('[User Info] Update Theme');
    expect(action.darkMode).toEqual(data.darkMode);
  });
});
