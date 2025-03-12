import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatBadge } from '@angular/material/badge';
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ColDef } from 'ag-grid-community';

import { OtcDashboardConstants } from '@otc/configs/dashboard.constants';
import { dashboardStore } from '@otc/features/dashboard/store/dashboard.store';
import { GridComponent } from '@otc/shared/components/grid/grid.component';

@Component({
  selector: 'otc-dashboard',
  standalone: true,
  imports: [
    MatCardModule,
    MatButton,
    MatIcon,
    MatMenu,
    MatMenuItem,
    RouterLink,
    RouterLinkActive,
    MatMenuTrigger,
    MatBadge,
    GridComponent
  ],
  providers: [dashboardStore],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {
  store = inject(dashboardStore);
  draftColDefs: Array<ColDef> = OtcDashboardConstants.draftColumns;
  submittedColDefs: Array<ColDef> = OtcDashboardConstants.submittedColumns;
}
