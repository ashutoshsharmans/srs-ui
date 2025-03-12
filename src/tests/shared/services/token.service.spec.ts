import { TestBed } from '@angular/core/testing';

import { EToken } from '@otc/shared/enums/token.enums';
import { TokenService } from '@otc/shared/services/token.service';

describe('Token Service', () => {
  let service: TokenService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      providers: [
        TokenService
      ]
    });
    service = TestBed.inject(TokenService);
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get token', () => {
    const mockToken = 'test-token';
    localStorage.setItem(EToken.OTC_TOKEN, mockToken);
    expect(service.getToken()).toBe(mockToken);
  });

  it('should return undefined if no token', () => {
    expect(service.getToken()).toBeUndefined();
  });

  it('should set token', () => {
    const mockToken = 'new-token';
    service.setToken(mockToken);
    expect(localStorage.getItem(EToken.OTC_TOKEN)).toBe(mockToken);
  });

  it('should set token from Ping ID (with token in URL)', () => {
    const mockToken = 'ping-id-token';
    const mockUrl = `https://example.com/?${EToken.OTC_TOKEN}=${mockToken}`;
    service.document = {
      location: mockUrl
    } as unknown as Document;

    service.setTokenFromPingId();
    expect(localStorage.getItem(EToken.OTC_TOKEN)).toBe(mockToken);
  });

  it('should get token expiration', () => {
    const mockExpiration = '1678886400';
    localStorage.setItem(EToken.OTC_TOKEN_EXPIRATION, mockExpiration);
    expect(service.getTokenExpiration()).toBe(parseInt(mockExpiration, 10));
  });

  it('should return 0 if no token expiration', () => {
    expect(service.getTokenExpiration()).toBe(0);
  });

  it('should set token expiration', () => {
    const mockExpiration = '1678972800';
    service.setTokenExpiration(mockExpiration);
    expect(localStorage.getItem(EToken.OTC_TOKEN_EXPIRATION)).toBe(mockExpiration);
  });

  it('should get token refresh', () => {
    const mockRefresh = 'test-refresh-token';
    localStorage.setItem(EToken.OTC_TOKEN_REFRESH, mockRefresh);
    expect(service.getTokenRefresh()).toBe(mockRefresh);
  });

  it('should return undefined if no refresh token', () => {
    expect(service.getTokenRefresh()).toBeUndefined();
  });

  it('should set token refresh', () => {
    const mockRefresh = 'new-refresh-token';
    service.setTokenRefresh(mockRefresh);
    expect(localStorage.getItem(EToken.OTC_TOKEN_REFRESH)).toBe(mockRefresh);
  });

  it('should remove token', () => {
    localStorage.setItem(EToken.OTC_TOKEN, 'test-token');
    localStorage.setItem(EToken.OTC_TOKEN_REFRESH, 'test-refresh');
    localStorage.setItem(EToken.OTC_TOKEN_EXPIRATION, '12345');

    service.removeToken();

    expect(localStorage.getItem(EToken.OTC_TOKEN)).toBeNull();
    expect(localStorage.getItem(EToken.OTC_TOKEN_REFRESH)).toBeNull();
    expect(localStorage.getItem(EToken.OTC_TOKEN_EXPIRATION)).toBeNull();
  });

  it('should have a valid token (token present)', () => {
    localStorage.setItem(EToken.OTC_TOKEN, 'test-token');
    expect(service.hasValidToken()).toBe(true);
  });

  it('should have a valid token (refresh token present)', () => {
    localStorage.setItem(EToken.OTC_TOKEN_REFRESH, 'test-refresh');
    expect(service.hasValidToken()).toBe(true);
  });

  it('should not have a valid token (neither token nor refresh token present)', () => {
    expect(service.hasValidToken()).toBe(false);
  });
});
