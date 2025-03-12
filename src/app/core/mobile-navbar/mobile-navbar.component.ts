import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit, output, OutputEmitterRef } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatListItem, MatNavList } from '@angular/material/list';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Observable, tap } from 'rxjs';

import { OtcMenuConstants } from '@otc/configs/menu.constants';
import { ILaunchDarklyFlags } from '@otc/shared/models/launch-darkly.interface';
import { IMenu } from '@otc/shared/models/menu.interface';
import { IPermission } from '@otc/shared/models/permission.interface';
import { IAuthenticationState, IUserState } from '@otc/shared/models/state.interface';
import { UserFacade } from '@otc/shared/store/facades/user.facade';

@Component({
  selector: 'otc-mobile-navbar',
  standalone: true,
  imports: [
    MatButton,
    MatIcon,
    MatListItem,
    MatNavList,
    RouterLink,
    RouterLinkActive,
    AsyncPipe
  ],
  templateUrl: './mobile-navbar.component.html',
  styleUrl: './mobile-navbar.component.scss'
})
export class MobileNavbarComponent implements OnInit {
  menus: Array<IMenu> = [];
  linkClick: OutputEmitterRef<void> = output<void>();
  router: Router = inject(Router);

  state$: Observable<{ auth: IAuthenticationState; user: IUserState }> | undefined;
  userFacade: UserFacade = inject(UserFacade);

  ngOnInit(): void {
    this.state$ = this.userFacade.userInfoState.pipe(
      tap((state: { auth: IAuthenticationState; user: IUserState }) => {
        this.setup(state.user.permission, state.user.darklyFlags);
      })
    );
  }

  setup(permission: IPermission, launchDarklyFlags: ILaunchDarklyFlags): void {
    this.menus = OtcMenuConstants.getMenus(permission, launchDarklyFlags);
    this.updateActiveParent(this.router.url);
  }

  updateActiveParent(url: string): void {
    this.menus.forEach((menu: IMenu) => (menu.active = url.includes(menu.url)));
  }
}
