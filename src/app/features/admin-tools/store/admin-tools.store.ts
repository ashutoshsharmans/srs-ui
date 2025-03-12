import { inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';

import { IError } from '@otc/shared/models/error.interface';
import { IAdminToolsState } from '@otc/shared/models/state.interface';
import { BillService } from '@otc/shared/services/bill.service';

export const initialState: IAdminToolsState = {
  loadingSubmittedShipmentRequests: false,
  loadingUpdatedSubmittedWaybills: false,
  updatedSubmittedWaybills: [],
  submittedShipmentRequests: []
};

export const adminToolsStore = signalStore(
  withState(initialState),
  withMethods((store, billService = inject(BillService)) => ({
    loadUpdatedSubmittedWaybills: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { loadingUpdatedSubmittedWaybills: true })),
        switchMap(() =>
          billService.getUpdatedWaybillsMF().pipe(
            tapResponse({
              next: updatedSubmittedWaybills => patchState(store, { updatedSubmittedWaybills, loadingUpdatedSubmittedWaybills: false }),
              error: (error: IError) => patchState(store, { loadingUpdatedSubmittedWaybills: false, errorUpdatedSubmittedWaybills: error })
            })
          )
        )
      )
    ),
    loadSubmittedShipments: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { loadingSubmittedShipmentRequests: true })),
        switchMap(() =>
          billService.getSubmittedRequestsToMF().pipe(
            tapResponse({
              next: submittedShipmentRequests => patchState(store, { submittedShipmentRequests, loadingSubmittedShipmentRequests: false }),
              error: (error: IError) => patchState(store, { loadingSubmittedShipmentRequests: false, errorSubmittedShipmentRequests: error })
            })
          )
        )
      )
    )
  }))
);
