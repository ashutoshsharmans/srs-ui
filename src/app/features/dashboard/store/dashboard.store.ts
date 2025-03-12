import { inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStore, withHooks, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';

import { IError } from '@otc/shared/models/error.interface';
import { IDashboardState } from '@otc/shared/models/state.interface';
import { BillService } from '@otc/shared/services/bill.service';

export const initialState: IDashboardState = {
  drafts: [],
  submitted: [],
  loadingDrafts: false,
  loadingSubmitted: false
};

export const dashboardStore = signalStore(
  withState(initialState),
  withMethods((store, billService = inject(BillService)) => ({
    loadDrafts: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { loadingDrafts: true })),
        switchMap(() =>
          billService.getDrafts().pipe(
            tapResponse({
              next: drafts => patchState(store, { drafts, loadingDrafts: false }),
              error: (error: IError) => patchState(store, { loadingDrafts: false, error })
            })
          )
        )
      )
    ),
    loadSubmitted: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { loadingSubmitted: true })),
        switchMap(() =>
          billService.getSubmittedRequests().pipe(
            tapResponse({
              next: submitted => patchState(store, { submitted, loadingSubmitted: false }),
              error: (error: IError) => patchState(store, { loadingSubmitted: false, error })
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
    onInit({ loadDrafts, loadSubmitted }) {
      loadDrafts();
      loadSubmitted();
    }
  })
);
