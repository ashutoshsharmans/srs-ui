import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { of, firstValueFrom, Observable } from 'rxjs';

import { authenticationGuard, roleGuard } from '@otc/core/guards/authentication.guard';
import { ELaunchDarklyGuard, ERoleGuard } from '@otc/shared/enums/guard.enums';
import { IAuthenticationState, IUserState } from '@otc/shared/models/state.interface';
import { AuthenticationFacade } from '@otc/shared/store/facades/authentication.facade';
import { UserFacade } from '@otc/shared/store/facades/user.facade';

describe('Authentication Guard', () => {
  let authFacadeMock: {
    authState: Observable<{ authenticated: boolean }>;
    load: jest.Mock;
  };
  let userFacadeMock: {
    userInfoState: Observable<{ auth: IAuthenticationState; user: IUserState }>;
  };
  const routerMock = {
    navigate: jest.fn(() => Promise.resolve())
  };

  beforeEach(() => {
    authFacadeMock = {
      authState: of({ authenticated: false }),
      load: jest.fn()
    };
    userFacadeMock = {
      userInfoState: of({
        user: { infoLoaded: true, launchDarklyLoaded: true, permission: { adminTools: false }, darklyFlags: {} } as IUserState,
        auth: { authenticated: true } as IAuthenticationState
      })
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthenticationFacade, useValue: authFacadeMock },
        { provide: UserFacade, useValue: userFacadeMock },
        { provide: Router, useValue: routerMock }
      ]
    });
  });

  it('should allow access if authenticated', async () => {
    authFacadeMock.authState = of({ authenticated: true });

    const route = {} as ActivatedRouteSnapshot;
    const state = { url: '/some-url' } as RouterStateSnapshot;

    const canActivate = TestBed.runInInjectionContext(() => authenticationGuard(route, state));
    const result = await firstValueFrom(canActivate as Observable<boolean>);

    expect(result).toBe(true);
  });

  it('should redirect if not authenticated', async () => {
    const route = {} as ActivatedRouteSnapshot;
    const state = { url: '/some-url' } as RouterStateSnapshot;

    const canActivate = TestBed.runInInjectionContext(() => authenticationGuard(route, state));
    const result = await firstValueFrom(canActivate as Observable<boolean>);

    expect(result).toBe(false);
    expect(routerMock.navigate).toHaveBeenCalledWith(['/authenticate'], { queryParams: { returnUrl: encodeURIComponent(state.url) } });
  });

  it('should not allow access if user is authenticated but does not have the permission', async () => {
    const route = { data: { role: ERoleGuard.ADMIN_TOOLS } } as unknown as ActivatedRouteSnapshot;
    const state = { url: '/home/admin-tools/comparison-dashboard' } as RouterStateSnapshot;

    const canActivate = TestBed.runInInjectionContext(() => roleGuard(route, state));
    const result = await firstValueFrom(canActivate as Observable<boolean>);
    expect(result).toBe(false);
  });

  it('should not allow access if user is authenticated, has permission but is missing launch darkly permission', async () => {
    userFacadeMock.userInfoState = of({
      user: { infoLoaded: true, launchDarklyLoaded: true, permission: { shipmentOrders: true }, darklyFlags: { soManagement: false } } as IUserState,
      auth: { authenticated: true } as IAuthenticationState
    });
    const route = { data: { role: ERoleGuard.SHIPMENT_ORDERS, launchDarklyRole: ELaunchDarklyGuard.SO_MANAGEMENT } } as unknown as ActivatedRouteSnapshot;
    const state = { url: '/home/shipment-orders/so-management' } as RouterStateSnapshot;

    const canActivate = TestBed.runInInjectionContext(() => roleGuard(route, state));
    const result = await firstValueFrom(canActivate as Observable<boolean>);
    expect(result).toBe(false);
  });

  it('should allow access if user is authenticated, has permission and has launch darkly permission', async () => {
    userFacadeMock.userInfoState = of({
      user: { infoLoaded: true, launchDarklyLoaded: true, permission: { shipmentOrders: true } } as IUserState,
      auth: { authenticated: true } as IAuthenticationState
    });
    const route = { data: { role: ERoleGuard.SHIPMENT_ORDERS } } as unknown as ActivatedRouteSnapshot;
    const state = { url: '/home/shipment-orders/so-management' } as RouterStateSnapshot;

    const canActivate = TestBed.runInInjectionContext(() => roleGuard(route, state));
    const result = await firstValueFrom(canActivate as Observable<boolean>);
    expect(result).toBe(true);
  });

  it('should not allow access if user is not authenticated', async () => {
    userFacadeMock.userInfoState = of({
      user: { infoLoaded: true, launchDarklyLoaded: true, permission: {} } as IUserState,
      auth: { authenticated: false } as IAuthenticationState
    });
    const route = { data: { role: ERoleGuard.SHIPMENT_ORDERS } } as unknown as ActivatedRouteSnapshot;
    const state = { url: '/home/shipment-orders/so-management' } as RouterStateSnapshot;

    const canActivate = TestBed.runInInjectionContext(() => roleGuard(route, state));
    const result = await firstValueFrom(canActivate as Observable<boolean>);
    expect(result).toBe(false);
    expect(routerMock.navigate).toHaveBeenCalledWith(['/authenticate'], { queryParams: { returnUrl: encodeURIComponent(state.url) } });
  });
});
