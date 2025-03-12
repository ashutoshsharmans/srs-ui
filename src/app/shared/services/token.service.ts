import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';

import { EToken } from '@otc/shared/enums/token.enums';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  document: Document = inject(DOCUMENT);

  getToken(): string | undefined {
    return localStorage.getItem(EToken.OTC_TOKEN) ?? undefined;
  }

  /**
   * Set Token From Ping Id
   * TODO - Remove the follow method
   */
  setTokenFromPingId(): void {
    const params = new URL(this.document.location.toString()).searchParams;
    const token = params.get(EToken.OTC_TOKEN);
    if (token) {
      this.setToken(token);
    }
  }

  setToken(token: string): void {
    localStorage.setItem(EToken.OTC_TOKEN, token);
  }

  getTokenExpiration(): number {
    return parseInt(localStorage.getItem(EToken.OTC_TOKEN_EXPIRATION) ?? '0', 10);
  }

  setTokenExpiration(expiration: string): void {
    localStorage.setItem(EToken.OTC_TOKEN_EXPIRATION, expiration);
  }

  getTokenRefresh(): string | undefined {
    return localStorage.getItem(EToken.OTC_TOKEN_REFRESH) ?? undefined;
  }

  setTokenRefresh(token: string) {
    localStorage.setItem(EToken.OTC_TOKEN_REFRESH, token);
  }

  removeToken(): void {
    localStorage.removeItem(EToken.OTC_TOKEN);
    localStorage.removeItem(EToken.OTC_TOKEN_REFRESH);
    localStorage.removeItem(EToken.OTC_TOKEN_EXPIRATION);
  }

  hasValidToken(): boolean {
    return !!(this.getToken() || this.getTokenRefresh());
  }
}
