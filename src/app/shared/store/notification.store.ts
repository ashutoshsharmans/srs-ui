import { inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStore, withHooks, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';

import { IError } from '@otc/shared/models/error.interface';
import { INotificationState } from '@otc/shared/models/state.interface';
import { NotificationService } from '@otc/shared/services/notification.service';

export const initialState: INotificationState = {
  notifications: [],
  error: undefined,
  loading: false
};

export const notificationStore = signalStore(
  withState(initialState),
  withMethods((store, notificationService = inject(NotificationService)) => ({
    loadDrafts: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { loading: true })),
        switchMap(() =>
          notificationService.getNotifications().pipe(
            tapResponse({
              next: notifications => patchState(store, { notifications, loading: false }),
              error: (error: IError) => patchState(store, { loading: false, error })
            })
          )
        )
      )
    )
  })),
  withHooks({
    onInit({ loadDrafts }) {
      loadDrafts();
    }
  })
);
