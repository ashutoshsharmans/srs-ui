import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

import { ENotification } from '@otc/shared/enums/notification.enums';
import { INotification } from '@otc/shared/models/notification.interface';

@Component({
  selector: 'otc-notification',
  standalone: true,
  imports: [
    MatIcon,
    MatIconButton
  ],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationComponent {
  notifications: Array<INotification> = [
    { message: 'It is raining today', type: ENotification.WARNING },
    { message: 'Changes to create pattern. what should we do?', type: ENotification.INFO }
  ];
}
