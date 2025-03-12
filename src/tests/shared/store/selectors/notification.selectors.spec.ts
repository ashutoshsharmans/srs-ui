import { INotificationState } from '@otc/shared/models/state.interface';
import * as fromNotification from '@otc/shared/store/reducers/notification.reducer';
import * as NotificationSelectors from '@otc/shared/store/selectors/notification.selectors';

describe('Notification Selectors', () => {
  it('should select the feature state', () => {
    const result: INotificationState = NotificationSelectors.selectNotificationState({
      [fromNotification.featureKey]: fromNotification.initialState
    });
    expect(result).toEqual(fromNotification.initialState);
  });
});
