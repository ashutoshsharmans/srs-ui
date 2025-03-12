import { HttpClient } from '@angular/common/http';
import { provideHttpClient, withInterceptors } from '@angular/common/http'; // Import for provideHttpClient
import { HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing'; // Import for provideHttpClientTesting
import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';

import { requestInterceptor, responseInterceptor } from '@otc/core/interceptors/http.interceptor';
import { TokenService } from '@otc/shared/services/token.service';
import { AuthenticationFacade } from '@otc/shared/store/facades/authentication.facade';

describe('Request Interceptor', () => {
  let httpController: HttpTestingController;
  let httpClient: HttpClient;
  let tokenService: TokenService;

  beforeEach(() => {
    const tokenServiceMock = {
      getToken: jest.fn(() => 'test-token')
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: TokenService, useValue: tokenServiceMock },
        provideHttpClient(withInterceptors([requestInterceptor])),
        provideHttpClientTesting()
      ]
    });

    httpController = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
    tokenService = TestBed.inject(TokenService);
  });

  it('should add authorization header when it has token and is not oauth-landing api', () => {
    const testUrl = '/api/test';
    jest.spyOn(tokenService, 'getToken');
    httpClient.get(testUrl).subscribe();

    const req: TestRequest = httpController.expectOne(testUrl);
    expect(req.request.headers.get('Authorization')).toBe('Bearer test-token');
    expect(tokenService.getToken).toHaveBeenCalled();
    req.flush({});
  });

  it('should add authorization header when it has token and is not oauth-landing api', () => {
    const testUrl = 'oauth-landing';
    jest.spyOn(tokenService, 'getToken');
    httpClient.get(testUrl).subscribe();

    const req: TestRequest = httpController.expectOne(testUrl);
    expect(req.request.headers.get('Authorization')).not.toBe('Bearer test-token');
    req.flush({});
  });
});

describe('ResponseInterceptor', () => {
  let httpController: HttpTestingController;
  let authFacade: AuthenticationFacade;
  let httpClient: HttpClient;

  beforeEach(() => {
    const authFacadeMock = {
      logout: jest.fn()
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthenticationFacade, useValue: authFacadeMock },
        provideHttpClient(withInterceptors([responseInterceptor])),
        provideHttpClientTesting()
      ]
    });

    httpController = TestBed.inject(HttpTestingController);
    authFacade = TestBed.inject(AuthenticationFacade);
    httpClient = TestBed.inject(HttpClient);
  });

  it('should logout if the request is unauthorized', () => {
    const testUrl = '/api/test';
    jest.spyOn(authFacade, 'logout');
    firstValueFrom(httpClient.get(testUrl))
      .then(() => {})
      .catch(error => {
        expect(error).toBeTruthy();
        expect(authFacade.logout).toHaveBeenCalled();
      });
    const req: TestRequest = httpController.expectOne(testUrl);
    req.error(new ProgressEvent('Unauthorized'), { status: 401, statusText: 'Unauthorized' });
  });

  it('should go to default if the request has status error that has not been identified', () => {
    const testUrl = '/api/test';
    firstValueFrom(httpClient.get(testUrl))
      .then(() => {})
      .catch(error => {
        expect(error).toBeTruthy();
      });
    const req: TestRequest = httpController.expectOne(testUrl);
    req.error(new ProgressEvent('Server Error'), { status: 500, statusText: 'Test Error Message' });
  });
});
