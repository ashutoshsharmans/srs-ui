import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatOption } from '@angular/material/autocomplete';
import { MatCardModule } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatSelect } from '@angular/material/select';
import { MatToolbarRow } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { ColDef, GridOptions } from 'ag-grid-community';

import { OtcAdminToolsConstants } from '@otc/configs/admin-tools.constants';
import { adminToolsStore } from '@otc/features/admin-tools/store/admin-tools.store';
import { GridComponent } from '@otc/shared/components/grid/grid.component';
import { EBillType } from '@otc/shared/enums/bill.enums';

@Component({
  selector: 'otc-submitted-bill',
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
  providers: [adminToolsStore],
  templateUrl: './submitted-bill.component.html',
  styleUrl: './submitted-bill.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubmittedBillComponent implements OnInit {
  store = inject(adminToolsStore);
  router: Router = inject(Router);
  colDefs: Array<ColDef> = OtcAdminToolsConstants.columns;
  type: EBillType = EBillType.SUBMITTED_SHIPMENT_REQUESTS;
  gridOptions: GridOptions = { cellSelection: true, context: this };

  ngOnInit(): void {
    this.store.loadSubmittedShipments();
  }

  setup(): void {
    if (this.type === EBillType.UPDATED_SUBMITTED_SHIPMENT_REQUESTS) {
      this.store.loadUpdatedSubmittedWaybills();
    } else {
      this.store.loadSubmittedShipments();
    }
  }

  onLinkCellClick(): void {
    this.router.navigate(['/home/manage/shipment-request'], { queryParams: { type: 'submitted', webOwner: '00001' } }).then();
  }
}
