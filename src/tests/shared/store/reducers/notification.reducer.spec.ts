import { IError } from '@otc/shared/models/error.interface';
import { INotification } from '@otc/shared/models/notification.interface';
import { INotificationState } from '@otc/shared/models/state.interface';
import * as NotificationActions from '@otc/shared/store/actions/notification.actions';
import * as fromNotification from '@otc/shared/store/reducers/notification.reducer';

describe('Notification Reducer', () => {
  describe('Load Notification Action', () => {
    it('should return loading state', () => {
      const result = fromNotification.reducer(fromNotification.initialState, NotificationActions.loadNotifications());
      expect(result).toEqual({ ...fromNotification.initialState, loading: true });
    });

    it('should return success state', () => {
      const data = { data: [{ type: 'info', message: 'New Message' }] as Array<INotification> };
      const result: INotificationState = fromNotification.reducer(fromNotification.initialState, NotificationActions.loadNotificationsSuccess(data));
      expect(result).toEqual({ ...fromNotification.initialState, notifications: data.data, loading: false });
    });

    it('should return error state', () => {
      const error = { title: 'Error' } as IError;
      const result: INotificationState = fromNotification.reducer(fromNotification.initialState, NotificationActions.loadNotificationsFailure({ error }));
      expect(result).toEqual({ ...fromNotification.initialState, loading: false, error: { ...error } });
    });
  });
});
