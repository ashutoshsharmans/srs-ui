import { IAuthentication } from '@otc/shared/models/authentication.interface';
import { IError } from '@otc/shared/models/error.interface';
import { IAuthenticationState } from '@otc/shared/models/state.interface';
import * as AuthenticationActions from '@otc/shared/store/actions/authentication.actions';
import * as fromAuthentication from '@otc/shared/store/reducers/authentication.reducer';

describe('Authentication Reducer', () => {
  describe('Load Authentication Action', () => {
    it('should return loading state', () => {
      const result = fromAuthentication.reducer(fromAuthentication.initialState, AuthenticationActions.loadAuthentication({ returnUrl: '' }));
      expect(result).toEqual({ ...fromAuthentication.initialState, loading: true });
    });

    it('should return success state', () => {
      const data = { authenticated: true, token: 'token' } as IAuthentication;
      const result = fromAuthentication.reducer(fromAuthentication.initialState, AuthenticationActions.loadAuthenticationSuccess({ data }));
      expect(result).toEqual({ ...fromAuthentication.initialState, ...data, loading: false });
    });

    it('should return error state', () => {
      const error = { title: 'Error' } as IError;
      const result: IAuthenticationState = fromAuthentication.reducer(fromAuthentication.initialState, AuthenticationActions.loadAuthenticationFailure({ error }));
      expect(result).toEqual({ ...fromAuthentication.initialState, loading: false, authenticated: false, token: undefined, error: { ...error } });
    });
  });
});
