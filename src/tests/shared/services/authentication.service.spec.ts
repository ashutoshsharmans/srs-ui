import { TestBed } from '@angular/core/testing';

import { OtcUrlConstants } from '@otc/configs/url.constants';
import { IAuthentication } from '@otc/shared/models/authentication.interface';
import { AuthenticationService } from '@otc/shared/services/authentication.service';
import { TokenService } from '@otc/shared/services/token.service';

describe('Authentication Service', () => {
  let service: AuthenticationService;
  const tokenServiceMock = {
    getToken: jest.fn(() => 'test-token')
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: TokenService, useValue: tokenServiceMock },
        AuthenticationService
      ]
    });
    service = TestBed.inject(AuthenticationService);
  });

  it('should return authenticated and token when token is present', () => {
    service.authenticate('/home/dashboard').subscribe(authentication => {
      expect(authentication).toEqual({ authenticated: true, token: 'test-token' } as IAuthentication);
    });
  });

  it('should set window.location.href correctly', () => {
    const redirectUri = '/home/dashboard';
    const mockWindowLocation = { origin: 'https://example.com', href: '' };
    Object.defineProperty(window, 'location', { value: mockWindowLocation, writable: true });

    tokenServiceMock.getToken.mockReturnValue('');
    service.authenticate(redirectUri).subscribe(authentication => {
      const expectedEncodedOrigin = encodeURI(mockWindowLocation.origin) + decodeURIComponent(redirectUri);
      const expectedHref = `${OtcUrlConstants.pingIdUrl}?
      response_type=code&client_id=NSOTCSecurity&scope=openid profile email&state=${expectedEncodedOrigin}&redirect_uri=${OtcUrlConstants.pingOAuthUrl}`;

      expect(authentication).toEqual({ authenticated: false, token: undefined } as IAuthentication);
      expect(window.location.href).toBe(expectedHref);
    });
  });
});
