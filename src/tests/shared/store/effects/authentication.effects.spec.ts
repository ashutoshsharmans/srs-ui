import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ROOT_EFFECTS_INIT } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { StatusCodes } from 'http-status-codes';
import { Observable, of, throwError } from 'rxjs';

import { IAuthentication } from '@otc/shared/models/authentication.interface';
import { IError } from '@otc/shared/models/error.interface';
import { AuthenticationService } from '@otc/shared/services/authentication.service';
import { TokenService } from '@otc/shared/services/token.service';
import * as AuthenticationActions from '@otc/shared/store/actions/authentication.actions';
import { AuthenticationEffects } from '@otc/shared/store/effects/authentication.effects';

describe('AuthenticationEffects', () => {
  let actions$: Observable<Action>;
  let effects: AuthenticationEffects;
  const authServiceSpy: { authenticate: jest.Mock } = { authenticate: jest.fn() };
  const tokenServiceSpy: { getToken: jest.Mock; removeToken: jest.Mock; setTokenFromPingId: jest.Mock } = { setTokenFromPingId: jest.fn(), getToken: jest.fn(), removeToken: jest.fn() };
  const routerSpy: { navigate: jest.Mock } = { navigate: jest.fn() };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthenticationEffects,
        provideMockActions(() => actions$),
        { provide: AuthenticationService, useValue: authServiceSpy },
        { provide: TokenService, useValue: tokenServiceSpy },
        { provide: Router, useValue: routerSpy }]
    });

    effects = TestBed.inject<AuthenticationEffects>(AuthenticationEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('checkAuthentication$', () => {
    it('should dispatch loadAuthenticationSuccess with token information', async () => {
      tokenServiceSpy.getToken.mockReturnValue('testToken');
      actions$ = of({ type: ROOT_EFFECTS_INIT });
      effects.checkAuthentication$.subscribe(action => {
        expect(action).toEqual(AuthenticationActions.loadAuthenticationSuccess({ data: { authenticated: true, token: 'testToken' } as IAuthentication }));
      });
    });
  });

  describe('loadAuthentication$', () => {
    it('should dispatch a success effect', async () => {
      const returnUrl = '/home';
      const data: IAuthentication = { authenticated: true, token: 'xyz' } as IAuthentication;
      actions$ = of(AuthenticationActions.loadAuthentication({ returnUrl }));
      authServiceSpy.authenticate.mockReturnValue(of(data));

      effects.loadAuthentication$.subscribe(action => {
        expect(action).toEqual(AuthenticationActions.loadAuthenticationSuccess({ data }));
        expect(authServiceSpy.authenticate).toHaveBeenCalledWith(returnUrl);
      });
    });

    it('should dispatch an error effect', async () => {
      const returnUrl = '/home';
      const error: IError = { title: 'Error Title', message: 'Error Message', code: 'ABC-123', status: StatusCodes.INTERNAL_SERVER_ERROR };
      actions$ = of(AuthenticationActions.loadAuthentication({ returnUrl }));
      authServiceSpy.authenticate.mockReturnValue(throwError(() => error));

      effects.loadAuthentication$.subscribe(action => {
        expect(action).toEqual(AuthenticationActions.loadAuthenticationFailure({ error }));
        expect(authServiceSpy.authenticate).toHaveBeenCalledWith(returnUrl);
      });
    });
  });

  describe('removeAuthentication$', () => {
    it('should dispatch a success effect', async () => {
      const data: IAuthentication = { authenticated: false, token: undefined } as IAuthentication;
      actions$ = of(AuthenticationActions.removeAuthentication());
      tokenServiceSpy.removeToken.mockReturnValue(of());

      effects.removeAuthentication$.subscribe(action => {
        expect(action).toEqual(AuthenticationActions.loadAuthenticationSuccess({ data }));
        expect(routerSpy.navigate).toHaveBeenCalledWith(['/authenticate']);
      });
    });
  });
});
