import { ENotification } from '@otc/shared/enums/notification.enums';

export interface INotification {
  message: string;
  type: ENotification;
}
