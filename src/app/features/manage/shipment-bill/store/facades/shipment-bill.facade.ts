import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { IEquipment } from '@otc/features/manage/shipment-bill/models/equipment.interface';
import { IShipmentBill } from '@otc/features/manage/shipment-bill/models/shipment-bill.interface';
import * as ShipmentBillAction from '@otc/features/manage/shipment-bill/store/actions/shipment-bill.actions';
import * as ShipmentBillSelectors from '@otc/features/manage/shipment-bill/store/selectors/shipment-bill.selectors';
import { IShipmentBillState, IUserState } from '@otc/shared/models/state.interface';

@Injectable({
  providedIn: 'root'
})
export class ShipmentBillFacade {
  store$: Store<{
    bill: IShipmentBillState;
    billType?: string | Array<string>;
    user: IUserState;
    webOwner?: string | Array<string>;
  }> = inject(Store);

  get shipmentBillWithUserInfo(): Observable<{
    bill: IShipmentBillState;
    billType?: string | Array<string>;
    user: IUserState;
    webOwner?: string | Array<string>;
  }> {
    return this.store$.select(ShipmentBillSelectors.selectShipmentBillWithCustomerInfo);
  }

  get shipmentBill(): Observable<IShipmentBillState> {
    return this.store$.select(ShipmentBillSelectors.selectShipmentBillState);
  }

  getShipmentBillState(): IShipmentBillState {
    return this.store$.selectSignal(ShipmentBillSelectors.selectShipmentBillState)();
  }

  validateEquipment(equipment: IEquipment): void {
    this.store$.dispatch(ShipmentBillAction.validateEquipment({ data: equipment }));
  }

  loadStccs(value?: string): void {
    this.store$.dispatch(ShipmentBillAction.loadStccs({ data: value }));
  }

  loadPattern(): void {
    this.store$.dispatch(ShipmentBillAction.loadPattern({ id: '', webOwner: '' }));
  }

  loadDraftBill(): void {
    this.store$.dispatch(ShipmentBillAction.loadDraft({ id: '', webOwner: '' }));
  }

  loadShipmentRequestData(user: object): void {
    this.store$.dispatch(ShipmentBillAction.loadBillInformation({ user }));
  }

  submitRequest(bill: IShipmentBill): void {
    this.store$.dispatch(ShipmentBillAction.submitBill({ bill }));
  }

  deleteBill(bill: object): void {
    this.store$.dispatch(ShipmentBillAction.deleteBill({ bill }));
  }

  resetPattern(): void {
    this.store$.dispatch(ShipmentBillAction.resetPattern());
  }

  resetDraft(): void {
    this.store$.dispatch(ShipmentBillAction.resetDraft());
  }

  resetStccs(): void {
    this.store$.dispatch(ShipmentBillAction.resetSTCCs());
  }
}
