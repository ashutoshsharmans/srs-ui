import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { OtcUrlConstants } from '@otc/configs/url.constants';
import { INotification } from '@otc/shared/models/notification.interface';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  http: HttpClient = inject(HttpClient);

  getNotifications(): Observable<Array<INotification> | never> {
    return this.http.get(OtcUrlConstants.notificationsUrl).pipe(map(response => response as Array<INotification>));
  }
}
