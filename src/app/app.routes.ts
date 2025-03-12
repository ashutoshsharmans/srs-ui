import { Routes } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';

import { authenticationGuard, roleGuard } from '@otc/core/guards/authentication.guard';
import { ShipmentBillEffects } from '@otc/features/manage/shipment-bill/store/effects/shipment-bill.effects';
import * as fromShipmentBill from '@otc/features/manage/shipment-bill/store/reducers/shipment-bill.reducer';
import { ERoleGuard } from '@otc/shared/enums/guard.enums';

export const routes: Routes = [
  {
    path: 'authenticate',
    loadComponent: () => import('@otc/core/authentication/authentication.component').then(m => m.AuthenticationComponent)
  },
  { path: '', redirectTo: 'authenticate', pathMatch: 'full' },
  { path: 'unauthorized', loadComponent: () => import('@otc/core/unauthorized/unauthorized.component').then(m => m.UnauthorizedComponent) },
  {
    path: 'home',
    loadComponent: () => import('@otc/core/app-layout/app-layout.component').then(m => m.AppLayoutComponent),
    canActivate: [authenticationGuard],
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('@otc/features/dashboard/dashboard.component').then(m => m.DashboardComponent),
        canActivate: [roleGuard],
        data: { role: ERoleGuard.DASHBOARD }
      },
      {
        path: 'notifications',
        loadComponent: () => import('@otc/features/notification/notification.component').then(m => m.NotificationComponent)
      },
      {
        path: 'manage/pattern-and-draft',
        canActivate: [roleGuard],
        data: { role: ERoleGuard.MANAGE },
        loadComponent: () => import('@otc/features/manage/pattern-draft-dashboard/pattern-draft-dashboard.component').then(m => m.PatternDraftDashboardComponent)
      },
      {
        path: 'manage/shipment-request',
        canActivate: [roleGuard],
        data: { role: ERoleGuard.MANAGE },
        loadComponent: () => import('@otc/features/manage/shipment-bill/shipment-bill.component').then(m => m.ShipmentBillComponent),
        providers: [
          provideState({ reducer: fromShipmentBill.reducer, name: fromShipmentBill.featureKey }),
          provideEffects([ShipmentBillEffects])
        ]
      },
      {
        path: 'manage/shipment-request/:type/:webOwner',
        canActivate: [roleGuard],
        data: { role: ERoleGuard.MANAGE },
        loadComponent: () => import('@otc/features/manage/shipment-bill/shipment-bill.component').then(m => m.ShipmentBillComponent),
        providers: [
          provideState({ reducer: fromShipmentBill.reducer, name: fromShipmentBill.featureKey }),
          provideEffects([ShipmentBillEffects])
        ]
      },
      {
        path: 'shipment-orders/search-and-find',
        loadComponent: () => import('@otc/features/shipment-orders/search-and-find/search-and-find.component').then(m => m.SearchAndFindComponent),
        data: { role: ERoleGuard.SHIPMENT_ORDERS }
      },
      {
        path: 'shipment-orders/so-management',
        loadComponent: () => import('@otc/features/shipment-orders/so-management/so-management.component').then(m => m.SoManagementComponent),
        canActivate: [roleGuard]
      },
      {
        path: 'admin-tools/comparison-dashboard',
        canActivate: [roleGuard],
        data: { role: ERoleGuard.ADMIN_TOOLS },
        loadComponent: () => import('@otc/features/admin-tools/comparison-dashboard/comparison-dashboard.component').then(m => m.ComparisonDashboardComponent)
      },
      {
        path: 'admin-tools/submitted-bill',
        canActivate: [roleGuard],
        data: { role: ERoleGuard.ADMIN_TOOLS },
        loadComponent: () => import('@otc/features/admin-tools/submitted-bill/submitted-bill.component').then(m => m.SubmittedBillComponent)
      }
    ]
  },
  { path: '**', redirectTo: 'authenticate', pathMatch: 'full' }
];
