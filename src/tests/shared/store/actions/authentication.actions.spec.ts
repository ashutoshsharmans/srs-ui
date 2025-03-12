import { StatusCodes } from 'http-status-codes';

import { IAuthentication } from '@otc/shared/models/authentication.interface';
import { IError } from '@otc/shared/models/error.interface';
import * as AuthenticationActions from '@otc/shared/store/actions/authentication.actions';

describe('Authentication Actions', () => {
  it('should create a "loadAuthentication" action', () => {
    const returnUrl = '/dashboard';
    const action = AuthenticationActions.loadAuthentication({ returnUrl });

    expect(action.type).toBe('[Authentication] Load Authentication');
    expect(action.returnUrl).toBe(returnUrl);
  });

  it('should create a "loadAuthenticationSuccess" action', () => {
    const data: IAuthentication = {
      authenticated: true,
      token: 'someToken'
    };
    const action = AuthenticationActions.loadAuthenticationSuccess({ data });

    expect(action.type).toBe('[Authentication] Load Authentication Success');
    expect(action.data).toEqual(data);
  });

  it('should create a "loadAuthenticationFailure" action', () => {
    const error: IError = {
      message: 'Authentication failed',
      code: 'ABC-123',
      status: StatusCodes.UNAUTHORIZED,
      title: 'Authorized'
    };
    const action = AuthenticationActions.loadAuthenticationFailure({ error });

    expect(action.type).toBe('[Authentication] Load Authentication Failure');
    expect(action.error).toEqual(error);
  });

  it('should create a "removeAuthentication" action', () => {
    const action = AuthenticationActions.removeAuthentication();

    expect(action.type).toBe('[Authentication] Remove Authentication');
  });
});
