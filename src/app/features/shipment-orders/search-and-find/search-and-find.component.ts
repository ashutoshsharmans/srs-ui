import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatOption } from '@angular/material/autocomplete';
import { MatButton } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';
import { ColDef } from 'ag-grid-community';
import { Observable } from 'rxjs';

import { OtcSearchAndFineConstants } from '@otc/configs/search-and-find.constants';
import { IShipmentOrderDateGroup, IShipmentOrderGroup, IShipmentSearch } from '@otc/features/shipment-orders/models/shipment-order.interface';
import { shipmentOrdersStore } from '@otc/features/shipment-orders/store/shipment-orders.store';
import { GridComponent } from '@otc/shared/components/grid/grid.component';
import { IShipmentOrdersState } from '@otc/shared/models/state.interface';

@Component({
  selector: 'otc-search-and-find',
  standalone: true,
  providers: [shipmentOrdersStore, provideNativeDateAdapter()],
  imports: [
    MatExpansionModule,
    MatIcon,
    MatFormFieldModule,
    MatInput,
    GridComponent,
    MatOption,
    MatSelect,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatButton
  ],
  templateUrl: './search-and-find.component.html',
  styleUrl: './search-and-find.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchAndFindComponent {
  store$: Observable<IShipmentOrdersState> | undefined;
  store = inject(shipmentOrdersStore);
  today: Date = new Date();
  advancedSearch = false;
  colDefs: Array<ColDef> = OtcSearchAndFineConstants.columns;
  searchForm: FormGroup<IShipmentOrderGroup> = new FormGroup<IShipmentOrderGroup>({
    equipmentId: new FormControl(),
    waybillSerial: new FormControl(),
    orderType: new FormControl(),
    stcc: new FormControl(),
    shipper: new FormControl(),
    consignee: new FormControl(),
    billToParty: new FormControl(),
    originCityState: new FormControl(),
    destinationCityState: new FormControl(),
    date: new FormGroup<IShipmentOrderDateGroup>({
      fromDate: new FormControl(new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate() - 30)),
      toDate: new FormControl(new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate()))
    })
  });

  search(): void {
    if (this.searchForm.valid) {
      const value: IShipmentSearch = this.searchForm.getRawValue();
      this.store.loadShipmentOrders(value);
    }
  }

  clear(): void {
    this.searchForm.reset();
    this.searchForm.controls.date.controls.fromDate.setValue(new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate() - 30));
    this.searchForm.controls.date.controls.toDate.setValue(new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate()));
  }

  toggleAdvancedSearch(): void {
    this.advancedSearch = !this.advancedSearch;
    if (!this.advancedSearch) {
      this.searchForm.controls.shipper.reset();
      this.searchForm.controls.consignee.reset();
      this.searchForm.controls.billToParty.reset();
      this.searchForm.controls.originCityState.reset();
      this.searchForm.controls.destinationCityState.reset();
    }
  }
}
