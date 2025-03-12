import { AsyncPipe, DOCUMENT, NgClass, NgOptimizedImage } from '@angular/common';
import { Component, inject, input, InputSignal, OnInit, output } from '@angular/core';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { MatSlideToggle, MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatToolbar } from '@angular/material/toolbar';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Observable, tap } from 'rxjs';

import { OtcMenuConstants } from '@otc/configs/menu.constants';
import { NotificationComponent } from '@otc/features/notification/notification.component';
import { ETheme } from '@otc/shared/enums/theme.enums';
import { ILaunchDarklyFlags } from '@otc/shared/models/launch-darkly.interface';
import { IMenu } from '@otc/shared/models/menu.interface';
import { IPermission } from '@otc/shared/models/permission.interface';
import { IAuthenticationState, IUserState } from '@otc/shared/models/state.interface';
import { UserFacade } from '@otc/shared/store/facades/user.facade';

@Component({
  selector: 'otc-navbar',
  standalone: true,
  imports: [
    MatButton,
    MatIcon,
    MatIconButton,
    MatMenu,
    MatMenuItem,
    MatSlideToggle,
    MatToolbar,
    RouterLink,
    RouterLinkActive,
    MatMenuTrigger,
    NgOptimizedImage,
    NgClass,
    AsyncPipe,
    NotificationComponent
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  mobile: InputSignal<boolean> = input.required<boolean>();
  toggleMenu = output<void>();
  state$: Observable<{ auth: IAuthenticationState; user: IUserState }> | undefined;
  menus: Array<IMenu> = [];
  userFacade: UserFacade = inject(UserFacade);
  router: Router = inject(Router);
  document: Document = inject(DOCUMENT);

  ngOnInit(): void {
    this.state$ = this.userFacade.userInfoState.pipe(
      tap((state: { auth: IAuthenticationState; user: IUserState }) => {
        this.setup(state.user.permission, state.user.darklyFlags);
        this.updateTheme(state.user.preference.darkMode);
      })
    );
  }

  setup(permission: IPermission, launchDarklyFlags: ILaunchDarklyFlags): void {
    this.menus = OtcMenuConstants.getMenus(permission, launchDarklyFlags);
    this.updateActiveParent(this.router.url);
  }

  changeTheme($event: MatSlideToggleChange): void {
    this.userFacade.updateTheme($event.checked);
  }

  updateActiveParent(url: string): void {
    this.menus.forEach((menu: IMenu) => (menu.active = url.includes(menu.url)));
  }

  updateTheme(darkMode: boolean): void {
    const classList: DOMTokenList = this.document.body.classList;
    if (darkMode) {
      const notApplied: boolean = !classList.contains(ETheme.DARK_MODE);
      if (notApplied) {
        localStorage.setItem(ETheme.DARK_MODE, 'true');
        classList.add(ETheme.DARK_MODE);
      }
    } else {
      localStorage.setItem(ETheme.DARK_MODE, '');
      classList.remove(ETheme.DARK_MODE);
    }
  }

  viewNotifications(): void {
    this.router.navigate(['/home/notifications']).then();
  }
}
