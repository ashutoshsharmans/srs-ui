import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting, TestRequest } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { OtcUrlConstants } from '@otc/configs/url.constants';
import { ENotification } from '@otc/shared/enums/notification.enums';
import { INotification } from '@otc/shared/models/notification.interface';
import { NotificationService } from '@otc/shared/services/notification.service';

describe('Notification Service', () => {
  let service: NotificationService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      providers: [
        NotificationService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(NotificationService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should get user info', () => {
    const mockNotifications: Array<INotification> = [
      {
        type: ENotification.INFO,
        message: 'Test Notification'
      }
    ];

    service.getNotifications().subscribe(notifications => {
      expect(notifications).toEqual(mockNotifications);
    });

    const req: TestRequest = httpTestingController.expectOne(OtcUrlConstants.notificationsUrl);
    expect(req.request.method).toEqual('GET');
    req.flush(mockNotifications);
  });
});
