import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

import { IAuthenticationState } from '@otc/shared/models/state.interface';
import { AuthenticationFacade } from '@otc/shared/store/facades/authentication.facade';

@Component({
  selector: 'otc-authentication',
  standalone: true,
  imports: [
    AsyncPipe,
    MatProgressSpinner,
    MatCard
  ],
  templateUrl: './authentication.component.html',
  styleUrl: './authentication.component.scss'
})
export class AuthenticationComponent implements OnInit {
  authentication$: Observable<IAuthenticationState> | undefined;
  authFacade: AuthenticationFacade = inject(AuthenticationFacade);
  activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  router: Router = inject(Router);

  ngOnInit(): void {
    const returnUrl = decodeURIComponent(this.activatedRoute.snapshot.queryParams['returnUrl'] || '/home/dashboard');
    this.authentication$ = this.authFacade.authState.pipe(
      tap((value: IAuthenticationState) => {
        if (value.authenticated && !value.loading) {
          this.router.navigateByUrl(returnUrl).then();
        }
      })
    );
    this.authFacade.load(returnUrl);
  }
}
