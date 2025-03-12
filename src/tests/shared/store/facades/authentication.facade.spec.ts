import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';

import { IAuthenticationState } from '@otc/shared/models/state.interface';
import * as AuthenticationActions from '@otc/shared/store/actions/authentication.actions';
import { AuthenticationFacade } from '@otc/shared/store/facades/authentication.facade';

describe('Authentication Facade', () => {
  let service: AuthenticationFacade;
  const authState = of({} as IAuthenticationState);
  const mockStore = {
    select: jest.fn().mockReturnValue(authState),
    dispatch: jest.fn()
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: Store, useValue: mockStore },
        AuthenticationFacade
      ]
    });
    service = TestBed.inject(AuthenticationFacade);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should get authState', () => {
    const authState: Observable<IAuthenticationState> = service.authState;
    expect(authState).toEqual(authState);
  });

  it('should load Authentication State', () => {
    const returnUrl = '/home';
    jest.spyOn(mockStore, 'dispatch');
    service.load(returnUrl);

    expect(mockStore.dispatch).toHaveBeenCalledWith(AuthenticationActions.loadAuthentication({ returnUrl }));
  });
});
