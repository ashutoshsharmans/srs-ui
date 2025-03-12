import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';

import { INotificationState } from '@otc/shared/models/state.interface';
import * as NotificationActions from '@otc/shared/store/actions/notification.actions';
import { NotificationFacade } from '@otc/shared/store/facades/notification.facade';

describe('Notification Facade', () => {
  let service: NotificationFacade;
  const notificationState = of({} as INotificationState);
  const mockStore = {
    select: jest.fn().mockReturnValue(notificationState),
    dispatch: jest.fn()
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: Store, useValue: mockStore },
        NotificationFacade
      ]
    });
    service = TestBed.inject(NotificationFacade);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should get notificationState', () => {
    const authState: Observable<INotificationState> = service.notificationState;
    expect(authState).toEqual(authState);
  });

  it('should load Authentication State', () => {
    jest.spyOn(mockStore, 'dispatch');
    service.load();

    expect(mockStore.dispatch).toHaveBeenCalledWith(NotificationActions.loadNotifications());
  });
});
