import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { OtcUrlConstants } from '@otc/configs/url.constants';
import { IAuthentication } from '@otc/shared/models/authentication.interface';
import { TokenService } from '@otc/shared/services/token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  tokenService: TokenService = inject(TokenService);

  authenticate(redirectUrl: string): Observable<IAuthentication | never> {
    const token = this.tokenService.getToken();
    if (token) {
      return of({ authenticated: true, token: token });
    } else {
      this.showPingIdAuthenticator(redirectUrl);
      return of({ authenticated: false, token: undefined });
    }
  }

  showPingIdAuthenticator(redirectUri: string): void {
    const encodedOrigin = `${encodeURI(window.location.origin)}${decodeURIComponent(redirectUri)}`;
    const targetURL = OtcUrlConstants.pingOAuthUrl;
    window.location.href = `${OtcUrlConstants.pingIdUrl}?response_type=code&client_id=NSOTCSecurity&scope=openid profile email&state=${encodedOrigin}&redirect_uri=${targetURL}`;
  }
}
