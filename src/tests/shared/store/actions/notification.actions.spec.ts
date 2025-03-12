import { StatusCodes } from 'http-status-codes';

import { IError } from '@otc/shared/models/error.interface';
import { INotification } from '@otc/shared/models/notification.interface';
import * as NotificationActions from '@otc/shared/store/actions/notification.actions';

describe('Authentication Actions', () => {
  it('should create a "loadNotifications" action', () => {
    const action = NotificationActions.loadNotifications();

    expect(action.type).toBe('[Notification] Load Notifications');
  });

  it('should create a "loadNotificationsSuccess" action', () => {
    const data: Array<INotification> = [];
    const action = NotificationActions.loadNotificationsSuccess({ data });

    expect(action.type).toBe('[Notification] Load Notifications Success');
    expect(action.data).toEqual(data);
  });

  it('should create a "loadNotificationsFailure" action', () => {
    const error: IError = {
      message: 'Authentication failed',
      code: 'ABC-123',
      status: StatusCodes.UNAUTHORIZED,
      title: 'Authorized'
    };
    const action = NotificationActions.loadNotificationsFailure({ error });

    expect(action.type).toBe('[Notification] Load Notifications Failure');
    expect(action.error).toEqual(error);
  });
});
