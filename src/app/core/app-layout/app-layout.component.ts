import { ConfigurableFocusTrapFactory, FocusTrapFactory } from '@angular/cdk/a11y';
import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterOutlet } from '@angular/router';

import { MobileNavbarComponent } from '@otc/core/mobile-navbar/mobile-navbar.component';
import { NavbarComponent } from '@otc/core/navbar/navbar.component';
import { BannerComponent } from '@otc/shared/components/banner/banner.component';

@Component({
  selector: 'otc-app-layout',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    RouterOutlet,
    NavbarComponent,
    MobileNavbarComponent,
    BannerComponent
  ],
  providers: [{ provide: FocusTrapFactory, useClass: ConfigurableFocusTrapFactory }],
  templateUrl: './app-layout.component.html',
  styleUrl: './app-layout.component.scss'
})
export class AppLayoutComponent implements OnInit, OnDestroy {
  media: MediaMatcher = inject(MediaMatcher);
  changeDetectorRef: ChangeDetectorRef = inject(ChangeDetectorRef);
  mobileQuery!: MediaQueryList;
  banner = true;

  ngOnInit(): void {
    this.mobileQuery = this.media.matchMedia('(max-width: 850px)');
    this.mobileQueryListener = () => this.changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this.mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this.mobileQueryListener);
  }

  mobileQueryListener(): void {}
}
