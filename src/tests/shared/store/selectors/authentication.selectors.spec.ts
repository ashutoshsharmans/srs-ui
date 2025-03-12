import { IAuthenticationState } from '@otc/shared/models/state.interface';
import * as fromAuthentication from '@otc/shared/store/reducers/authentication.reducer';
import * as AuthenticationSelectors from '@otc/shared/store/selectors/authentication.selectors';

describe('Authentication Selectors', () => {
  it('should select the feature state', () => {
    const result: IAuthenticationState = AuthenticationSelectors.selectAuthenticationState({
      [fromAuthentication.featureKey]: fromAuthentication.initialState
    });
    expect(result).toEqual(fromAuthentication.initialState);
  });
});
