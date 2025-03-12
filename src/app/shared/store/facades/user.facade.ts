import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { IAuthenticationState, IUserState } from '@otc/shared/models/state.interface';
import * as UserAction from '@otc/shared/store/actions/user.actions';
import * as UserSelectors from '@otc/shared/store/selectors/user.selectors';

@Injectable({
  providedIn: 'root'
})
export class UserFacade {
  store$: Store<{ auth: IAuthenticationState; user: IUserState }> = inject(Store);

  get userInfoState(): Observable<{ auth: IAuthenticationState; user: IUserState }> {
    return this.store$.select(UserSelectors.selectUserWithAuthenticationState);
  }

  updateTheme(darkMode: boolean): void {
    this.store$.dispatch(UserAction.updateTheme({ darkMode: darkMode }));
  }
}
