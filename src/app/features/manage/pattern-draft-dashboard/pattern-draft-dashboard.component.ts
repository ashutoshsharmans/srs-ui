import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatOption } from '@angular/material/autocomplete';
import { MatCardModule } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatSelect } from '@angular/material/select';
import { MatToolbarRow } from '@angular/material/toolbar';
import { NavigationExtras, Router } from '@angular/router';
import { ColDef, GridOptions } from 'ag-grid-community';

import { OtcPatternDraftDashboardConstants } from '@otc/configs/pattern-draft-dashboard.constants';
import { patternDraftDashboardStore } from '@otc/features/manage/pattern-draft-dashboard/store/pattern-draft-dashboard.store';
import { GridComponent } from '@otc/shared/components/grid/grid.component';
import { EBillType } from '@otc/shared/enums/bill.enums';

@Component({
  selector: 'otc-pattern-draft-dashboard',
  standalone: true,
  imports: [
    GridComponent,
    FormsModule,
    MatCardModule,
    MatFormField,
    MatLabel,
    MatOption,
    MatSelect,
    ReactiveFormsModule,
    MatToolbarRow
  ],
  providers: [patternDraftDashboardStore],
  templateUrl: './pattern-draft-dashboard.component.html',
  styleUrl: './pattern-draft-dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PatternDraftDashboardComponent implements OnInit {
  store = inject(patternDraftDashboardStore);
  type: EBillType = EBillType.PATTERNS;
  draftColDefs: Array<ColDef> = OtcPatternDraftDashboardConstants.draftColumns;
  patternColDefs: Array<ColDef> = OtcPatternDraftDashboardConstants.patternColumns;
  gridOptions: GridOptions = { cellSelection: true, context: this };
  router: Router = inject(Router);

  ngOnInit(): void {
    this.setup();
  }

  setup(): void {
    if (this.type === EBillType.DRAFTS) {
      this.store.loadDrafts();
    } else {
      this.store.loadPatterns();
    }
  }

  onCloneCellClick(param: string): void {
    const queryParams: NavigationExtras = {
      queryParams: { webOwner: param }
    };
    this.router.navigate(['/home/manage/shipment-request'], queryParams).then();
  }

  onDeleteCellClick(param: string): void {
    if (this.type === EBillType.DRAFTS) {
      this.store.deleteDraft(param);
    } else {
      this.store.deletePattern(param);
    }
  }

  onEditCellClick(param: string): void {
    const queryParams: NavigationExtras = {
      queryParams: { webOwner: param, type: this.type === EBillType.DRAFTS ? 'bol-with-draft' : 'bol-with-pattern' }
    };
    this.router.navigate(['/home/manage/shipment-request'], queryParams).then();
  }

  onAddCellClick(): void {
    const queryParams: NavigationExtras = {
      queryParams: { type: this.type === EBillType.DRAFTS ? 'bol-with-draft' : 'bol-with-pattern', webOwner: '00001' }
    };
    this.router.navigate(['/home/manage/shipment-request'], queryParams).then();
  }
}
