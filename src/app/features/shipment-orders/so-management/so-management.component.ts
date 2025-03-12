import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ColDef } from 'ag-grid-community';

import { OtcShipmentOrderManagementConstants } from '@otc/configs/shipment-order-management.constants';
import { shipmentOrdersStore } from '@otc/features/shipment-orders/store/shipment-orders.store';
import { GridComponent } from '@otc/shared/components/grid/grid.component';

@Component({
  selector: 'otc-so-management',
  standalone: true,
  imports: [
    MatCardModule,
    GridComponent
  ],
  providers: [shipmentOrdersStore],
  templateUrl: './so-management.component.html',
  styleUrl: './so-management.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SoManagementComponent {
  store = inject(shipmentOrdersStore);
  columns: Array<ColDef> = OtcShipmentOrderManagementConstants.columns;
}
