import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { filter, first, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ELaunchDarklyGuard, ERoleGuard } from '@otc/shared/enums/guard.enums';
import { IAuthenticationState, IUserState } from '@otc/shared/models/state.interface';
import { AuthenticationFacade } from '@otc/shared/store/facades/authentication.facade';
import { UserFacade } from '@otc/shared/store/facades/user.facade';

export const authenticationGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> => {
  const authFacade: AuthenticationFacade = inject(AuthenticationFacade);
  const router: Router = inject(Router);
  return authFacade.authState.pipe(
    map((authState: IAuthenticationState) => {
      if (authState.authenticated) {
        return true;
      } else {
        const returnUrl = encodeURIComponent(state.url);
        router.navigate(['/authenticate'], { queryParams: { returnUrl } }).then();
        return false;
      }
    })
  );
};

export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const userFacade: UserFacade = inject(UserFacade);
  const router: Router = inject(Router);
  const role: ERoleGuard = route.data['role'] as ERoleGuard;
  const launchDarklyRole = route.data['launchDarklyRole'] as ELaunchDarklyGuard;
  return userFacade.userInfoState.pipe(
    filter((state: { auth: IAuthenticationState; user: IUserState }) => state.user.infoLoaded && state.user.launchDarklyLoaded),
    map((storeState: { auth: IAuthenticationState; user: IUserState }) => {
      if (storeState.auth.authenticated) {
        if (storeState.user.permission[role]) {
          return launchDarklyRole ? !!storeState.user.darklyFlags[launchDarklyRole] : true;
        } else {
          router.navigate(['/unauthorized']).then();
          return false;
        }
      } else {
        const returnUrl = encodeURIComponent(state.url);
        router.navigate(['/authenticate'], { queryParams: { returnUrl } }).then();
        return false;
      }
    }),
    first()
  );
};
