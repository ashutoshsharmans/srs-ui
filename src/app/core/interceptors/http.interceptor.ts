import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { StatusCodes } from 'http-status-codes';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { TokenService } from '@otc/shared/services/token.service';
import { AuthenticationFacade } from '@otc/shared/store/facades/authentication.facade';

export const requestInterceptor: HttpInterceptorFn = (req, next) => {
  const authToken = inject(TokenService).getToken();
  const notLoginUrl = !req.url.match(/oauth-landing/);
  const httpRequest =
    notLoginUrl && authToken
      ? req.clone({
          setHeaders: {
            Authorization: `Bearer ${authToken}`
          }
        })
      : req;
  return next(httpRequest);
};

export const responseInterceptor: HttpInterceptorFn = (req, next) => {
  const auth: AuthenticationFacade = inject(AuthenticationFacade);
  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      switch (err.status) {
        case StatusCodes.UNAUTHORIZED:
          auth.logout();
          break;
        default:
        /* Unidentified Error */
      }
      return throwError(() => err);
    })
  );
};
