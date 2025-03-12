import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatCard, MatCardContent, MatCardFooter, MatCardHeader } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIcon } from '@angular/material/icon';
import { ColDef } from 'ag-grid-community';

import { OtcComparisonDashboard } from '@otc/configs/comparision-dashboard.constants';
import { GridComponent } from '@otc/shared/components/grid/grid.component';

@Component({
  selector: 'otc-comparison-dashboard',
  standalone: true,
  imports: [
    MatExpansionModule,
    MatCard,
    MatIcon,
    NgClass,
    GridComponent,
    MatIconButton,
    MatCardHeader,
    MatCardContent,
    MatCardFooter
  ],
  templateUrl: './comparison-dashboard.component.html',
  styleUrl: './comparison-dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComparisonDashboardComponent {
  summaries: Array<{
    footer: string;
    status: string;
    title: string;
    total: string;
  }> = [
    { title: 'Matching Records in Legacy and SRS', status: 'text-danger', footer: '97% of all requests', total: '1234' },
    { title: 'Records in Legacy', status: 'text-warning', footer: '97% of all requests', total: '1234' },
    { title: 'Records in SRS', status: 'text-success', footer: '97% of all requests', total: '1234' },
    { title: 'Variant Records in Legacy and SRS', status: 'text-success', footer: '97% of all requests', total: '1234' },
    { title: 'Variant Records in Legacy', status: 'text-success', footer: '97% of all requests', total: '1234' },
    { title: 'Variant Records in SRS', status: 'text-success', footer: '97% of all requests', total: '1234' }
  ];
  loading = false;
  colDefs: Array<ColDef> = OtcComparisonDashboard.columns;
  rowData = [{ serial: '12355' }, { serial: '4444' }];
}
