import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';

import { IError } from '@otc/shared/models/error.interface';
import { IPatternDraftsDashboardState } from '@otc/shared/models/state.interface';
import { BillService } from '@otc/shared/services/bill.service';

export const initialState: IPatternDraftsDashboardState = {
  drafts: [],
  patterns: [],
  loadingDrafts: false,
  loadingPatterns: false,
  deletingDraft: false,
  deletingPattern: false
};

export const patternDraftDashboardStore = signalStore(
  withState(initialState),
  withMethods((store, billService = inject(BillService), snackBar = inject(MatSnackBar)) => ({
    loadDrafts: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { loadingDrafts: true })),
        switchMap(() =>
          billService.getDrafts().pipe(
            tapResponse({
              next: drafts => patchState(store, { drafts, loadingDrafts: false }),
              error: (error: IError) => patchState(store, { loadingDrafts: false, draftsError: error })
            })
          )
        )
      )
    ),

    deleteDraft: rxMethod<string>(
      pipe(
        tap(() => patchState(store, { deletingDraft: true })),
        switchMap(() =>
          billService.deleteDraft().pipe(
            tapResponse({
              next: message => {
                patchState(store, { deletingDraft: false });
                snackBar.open(message);
              },
              error: (error: IError) => patchState(store, { deletingDraft: false, deletingDraftError: error })
            })
          )
        )
      )
    ),
    loadPatterns: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { loadingPatterns: true })),
        switchMap(() =>
          billService.getSubmittedRequests().pipe(
            tapResponse({
              next: patterns => patchState(store, { patterns, loadingPatterns: false }),
              error: (error: IError) => patchState(store, { loadingPatterns: false, patternsError: error })
            })
          )
        )
      )
    ),
    deletePattern: rxMethod<string>(
      pipe(
        tap(() => patchState(store, { deletingPattern: true })),
        switchMap(() =>
          billService.deletePattern().pipe(
            tapResponse({
              next: message => {
                patchState(store, { deletingPattern: false });
                snackBar.open(message);
              },
              error: (error: IError) => patchState(store, { deletingPattern: false, deletingPatternError: error })
            })
          )
        )
      )
    )
  }))
);
