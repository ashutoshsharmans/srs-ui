import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromShipmentBill from '@otc/features/manage/shipment-bill/store/reducers/shipment-bill.reducer';
import { IShipmentBillState, IUserState } from '@otc/shared/models/state.interface';
import { selectQueryParam } from '@otc/shared/store/selectors/router.selectors';
import * as UserSelectors from '@otc/shared/store/selectors/user.selectors';

export const selectShipmentBillState = createFeatureSelector<IShipmentBillState>(fromShipmentBill.featureKey);

export const selectShipmentBillWithCustomerInfo = createSelector(
  UserSelectors.selectUserState,
  selectShipmentBillState,
  selectQueryParam('type'),
  selectQueryParam('webOwner'),
  (user: IUserState, bill: IShipmentBillState, billType?: string | Array<string>, webOwner?: string | Array<string>) => ({
    user,
    bill,
    billType,
    webOwner
  })
);
