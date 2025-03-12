import { animate, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component, inject, output, OutputEmitterRef } from '@angular/core';
import { MatBadge } from '@angular/material/badge';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';
import { Router } from '@angular/router';

import { notificationStore } from '@otc/shared/store/notification.store';

@Component({
  selector: 'otc-banner',
  standalone: true,
  imports: [
    MatToolbar,
    MatButton,
    MatIcon,
    MatIconButton,
    MatBadge
  ],
  providers: [notificationStore],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss',
  animations: [
    trigger('easeInOutAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('1s ease-out', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('1s ease-in', style({ opacity: 0 }))
      ])
    ])
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BannerComponent {
  visible = true;
  router: Router = inject(Router);
  store = inject(notificationStore);
  closeBanner: OutputEmitterRef<void> = output<void>();

  viewNotifications(): void {
    this.visible = false;
    this.router.navigate(['/home/notifications']).then();
  }
}
