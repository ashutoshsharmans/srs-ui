import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing'; // No longer importing HttpClientTestingModule // Import provideHttpClientTesting
import { TestBed } from '@angular/core/testing';

import { OtcUrlConstants } from '@otc/configs/url.constants';
import { IUserRaw } from '@otc/shared/models/user.interface';
import { UserService } from '@otc/shared/services/user.service';

describe('User Service', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should get user info', () => {
    const mockUser: IUserRaw = { firstName: 'User', lastName: 'Last Name' } as IUserRaw;
    const expectedUrl = OtcUrlConstants.securityUserInfoUrl;

    service.getUserInfo().subscribe(user => {
      expect(user).toEqual(mockUser);
    });

    const req = httpMock.expectOne(expectedUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockUser);
  });
});
