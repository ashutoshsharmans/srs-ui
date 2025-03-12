import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { IAuthenticationState } from '@otc/shared/models/state.interface';
import * as AuthenticationAction from '@otc/shared/store/actions/authentication.actions';
import * as AuthenticationSelectors from '@otc/shared/store/selectors/authentication.selectors';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationFacade {
  store$: Store<IAuthenticationState> = inject(Store);

  get authState(): Observable<IAuthenticationState> {
    return this.store$.select(AuthenticationSelectors.selectAuthenticationState);
  }

  load(returnUrl: string): void {
    this.store$.dispatch(AuthenticationAction.loadAuthentication({ returnUrl }));
  }

  logout(): void {
    this.store$.dispatch(AuthenticationAction.removeAuthentication());
  }
}
