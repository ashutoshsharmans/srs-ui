import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

import { BannerComponent } from '@otc/shared/components/banner/banner.component';
import { INotificationState } from '@otc/shared/models/state.interface';
import { NotificationFacade } from '@otc/shared/store/facades/notification.facade';

describe('Banner Component', () => {
  let component: BannerComponent;
  let fixture: ComponentFixture<BannerComponent>;
  const mockNotificationFacade: { load: jest.Mock; notificationState: Observable<INotificationState> } = {
    notificationState: of({ notifications: [], loading: false }) as Observable<INotificationState>,
    load: jest.fn()
  };
  const mockRouter: { navigate: jest.Mock } = {
    navigate: jest.fn().mockResolvedValue(true)
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [BannerComponent],
      providers: [
        { provide: NotificationFacade, useValue: mockNotificationFacade },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(BannerComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should navigate to view notification when View Notification Invoked', () => {
    jest.spyOn(mockRouter, 'navigate');
    component.viewNotifications();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/home/notifications']);
  });
});
