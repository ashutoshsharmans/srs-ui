import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter, withEnabledBlockingInitialNavigation } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideRouterStore } from '@ngrx/router-store';
import { provideState, provideStore } from '@ngrx/store';

import { routes } from '@otc/app.routes';
import { requestInterceptor, responseInterceptor } from '@otc/core/interceptors/http.interceptor';
import { initialState, metaReducers, reducers } from '@otc/shared/store';
import { AuthenticationEffects } from '@otc/shared/store/effects/authentication.effects';
import { UserEffects } from '@otc/shared/store/effects/user.effects';
import * as fromAuthentication from '@otc/shared/store/reducers/authentication.reducer';
import * as fromUser from '@otc/shared/store/reducers/user.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    provideAnimationsAsync(),
    provideRouter(routes, withEnabledBlockingInitialNavigation()),
    provideRouterStore({ stateKey: 'router' }),
    provideHttpClient(withInterceptors([requestInterceptor, responseInterceptor])),
    provideState({ reducer: fromAuthentication.reducer, name: fromAuthentication.featureKey }),
    provideState({ reducer: fromUser.reducer, name: fromUser.featureKey }),
    provideStore(reducers, { initialState, metaReducers }),
    provideEffects([
      AuthenticationEffects,
      UserEffects
    ])
  ]
};
