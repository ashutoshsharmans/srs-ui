import { inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStore, withHooks, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';

import { IShipmentSearch } from '@otc/features/shipment-orders/models/shipment-order.interface';
import { IError } from '@otc/shared/models/error.interface';
import { IShipmentOrdersState } from '@otc/shared/models/state.interface';
import { BillService } from '@otc/shared/services/bill.service';

export const initialState: IShipmentOrdersState = {
  shipmentOrders: [],
  loading: false
};

export const shipmentOrdersStore = signalStore(
  withState(initialState),
  withMethods((store, billService = inject(BillService)) => ({
    loadShipmentOrders: rxMethod<IShipmentSearch>(
      pipe(
        tap(() => patchState(store, { loading: true })),
        switchMap((filter: IShipmentSearch) =>
          billService.getFilteredShipmentOrders(filter).pipe(
            tapResponse({
              next: shipmentOrders => patchState(store, { shipmentOrders, loading: false }),
              error: (error: IError) => patchState(store, { loading: false, error })
            })
          )
        )
      )
    ),
    resetStore() {
      patchState(store, initialState);
    }
  })),
  withHooks({
    onInit({ loadShipmentOrders }) {
      loadShipmentOrders({} as IShipmentSearch);
    },
    onDestroy(store) {
      patchState(store, initialState);
    }
  })
);
