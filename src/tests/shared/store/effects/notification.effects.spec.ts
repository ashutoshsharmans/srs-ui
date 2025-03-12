import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { StatusCodes } from 'http-status-codes';
import { Observable, of, throwError } from 'rxjs';

import { IError } from '@otc/shared/models/error.interface';
import { INotification } from '@otc/shared/models/notification.interface';
import { NotificationService } from '@otc/shared/services/notification.service';
import * as NotificationActions from '@otc/shared/store/actions/notification.actions';
import { NotificationEffects } from '@otc/shared/store/effects/notification.effects';

describe('Notification Effects', () => {
  let actions$: Observable<Action>;
  let effects: NotificationEffects;
  const notificationServiceSpy: { getNotifications: jest.Mock } = { getNotifications: jest.fn() };
  const snackBarSpy: { open: jest.Mock } = { open: jest.fn() };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        NotificationEffects,
        provideMockActions(() => actions$),
        { provide: NotificationService, useValue: notificationServiceSpy },
        { provide: MatSnackBar, useValue: snackBarSpy }]
    });

    effects = TestBed.inject<NotificationEffects>(NotificationEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('loadNotifications$', () => {
    it('should dispatch loadNotificationsSuccess with notification information', async () => {
      const data = { data: [] as Array<INotification> };
      notificationServiceSpy.getNotifications.mockReturnValue(data.data);
      actions$ = of(NotificationActions.loadNotifications);
      effects.loadNotifications$.subscribe(action => {
        expect(action).toEqual(NotificationActions.loadNotificationsSuccess(data));
        expect(notificationServiceSpy.getNotifications).toHaveBeenCalled();
      });
    });

    it('should dispatch an error effect', async () => {
      const error: IError = { title: 'Error Title', message: 'Error Message', code: 'ABC-123', status: StatusCodes.INTERNAL_SERVER_ERROR };
      actions$ = of(NotificationActions.loadNotifications());
      notificationServiceSpy.getNotifications.mockReturnValue(throwError(() => error));

      effects.loadNotifications$.subscribe(action => {
        expect(action).toEqual(NotificationActions.loadNotificationsFailure({ error }));
        expect(notificationServiceSpy.getNotifications).toHaveBeenCalled();
      });
    });
  });

  describe('handleFailure$', () => {
    it('should open snackBar with error information', () => {
      const error = { title: 'Invalid Request' } as IError;
      jest.spyOn(snackBarSpy, 'open');
      actions$ = of(NotificationActions.loadNotificationsFailure({ error }));
      effects.handleFailure$.subscribe(action => {
        expect(action.error).toEqual(error);
        expect(snackBarSpy).toHaveBeenCalled();
      });
    });
  });
});
