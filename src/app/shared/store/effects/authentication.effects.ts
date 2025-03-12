import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType, ROOT_EFFECTS_INIT } from '@ngrx/effects';
import { exhaustMap, of, tap } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { IAuthentication } from '@otc/shared/models/authentication.interface';
import { IError } from '@otc/shared/models/error.interface';
import { AuthenticationService } from '@otc/shared/services/authentication.service';
import { TokenService } from '@otc/shared/services/token.service';
import * as AuthenticationActions from '@otc/shared/store/actions/authentication.actions';

@Injectable()
export class AuthenticationEffects {
  actions$: Actions = inject(Actions);
  authService: AuthenticationService = inject(AuthenticationService);
  tokenService: TokenService = inject(TokenService);
  router: Router = inject(Router);
  /**
   * Check Authentication on the application start
   */
  checkAuthentication$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ROOT_EFFECTS_INIT),
      map(() => {
        this.tokenService.setTokenFromPingId();
        const token = this.tokenService.getToken();
        return AuthenticationActions.loadAuthenticationSuccess({ data: { authenticated: !!token, token: token } });
      })
    )
  );

  loadAuthentication$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthenticationActions.loadAuthentication),
      exhaustMap(action =>
        this.authService.authenticate(action.returnUrl).pipe(
          map((data: IAuthentication) => AuthenticationActions.loadAuthenticationSuccess({ data })),
          catchError((error: IError) => of(AuthenticationActions.loadAuthenticationFailure({ error })))
        )
      )
    )
  );

  removeAuthentication$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthenticationActions.removeAuthentication),
      tap(() => {
        this.tokenService.removeToken();
        AuthenticationActions.loadAuthenticationSuccess({ data: { authenticated: false, token: undefined } });
        this.router.navigate(['/authenticate']).then();
      })
    )
  );
}
