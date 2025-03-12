import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, mergeMap, of, switchMap, tap } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { IShipmentBill } from '@otc/features/manage/shipment-bill/models/shipment-bill.interface';
import * as ShipmentBillActions from '@otc/features/manage/shipment-bill/store/actions/shipment-bill.actions';
import { IError } from '@otc/shared/models/error.interface';
import { ISpecialEndorsement } from '@otc/shared/models/special-endorsement.interface';
import { ISTCCDetail, IEquipmentValidationState } from '@otc/shared/models/state.interface';
import { IStccQualifier } from '@otc/shared/models/stcc.interface';
import { BillService } from '@otc/shared/services/bill.service';
import { ValidatorService } from '@otc/shared/services/validator.service';

@Injectable()
export class ShipmentBillEffects {
  actions$: Actions = inject(Actions);
  billService: BillService = inject(BillService);
  validatorService: ValidatorService = inject(ValidatorService);
  snackBar: MatSnackBar = inject(MatSnackBar);

  loadBillInformation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ShipmentBillActions.loadBillInformation),
      mergeMap(user => [
        ShipmentBillActions.loadQualifiers(),
        ShipmentBillActions.loadBrimCustomerNames({ user }),
        ShipmentBillActions.loadSpecialEndorsements()
      ])
    )
  );

  loadQualifiers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ShipmentBillActions.loadQualifiers),
      exhaustMap(() =>
        this.billService.getQualifiers().pipe(
          map((data: Array<IStccQualifier>) => ShipmentBillActions.loadQualifiersSuccess({ data })),
          catchError((error: IError) => of(ShipmentBillActions.loadQualifiersFailure({ error })))
        )
      )
    )
  );

  loadBrimCustomerNames$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ShipmentBillActions.loadBrimCustomerNames),
      exhaustMap(() =>
        this.billService.getBrimCustomerNames().pipe(
          map((data: Array<string>) => ShipmentBillActions.loadBrimCustomerNamesSuccess({ data })),
          catchError((error: IError) => of(ShipmentBillActions.loadBrimCustomerNamesFailure({ error })))
        )
      )
    )
  );

  loadSpecialEndorsements$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ShipmentBillActions.loadSpecialEndorsements),
      exhaustMap(() =>
        this.billService.getSpecialEndorsements().pipe(
          map((data: Array<ISpecialEndorsement>) => ShipmentBillActions.loadSpecialEndorsementsSuccess({ data })),
          catchError((error: IError) => of(ShipmentBillActions.loadSpecialEndorsementsFailure({ error })))
        )
      )
    )
  );

  loadPattern$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ShipmentBillActions.loadPattern),
      exhaustMap(() =>
        this.billService.getPattern().pipe(
          map((data: IShipmentBill) => ShipmentBillActions.loadPatternSuccess({ data })),
          catchError((error: IError) => of(ShipmentBillActions.loadPatternFailure({ error })))
        )
      )
    )
  );

  loadDraft$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ShipmentBillActions.loadDraft),
      exhaustMap(() =>
        this.billService.getDraft().pipe(
          map((data: IShipmentBill) => ShipmentBillActions.loadDraftSuccess({ data })),
          catchError((error: IError) => of(ShipmentBillActions.loadDraftFailure({ error })))
        )
      )
    )
  );

  loadStccs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ShipmentBillActions.loadStccs),
      switchMap(value =>
        this.billService.getStccs(value.data).pipe(
          map((data: Array<ISTCCDetail>) => ShipmentBillActions.loadStccsSuccess({ data })),
          catchError((error: IError) => of(ShipmentBillActions.loadStccsFailure({ error })))
        )
      )
    )
  );

  checkValidEquipment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ShipmentBillActions.validateEquipment),
      mergeMap(value =>
        this.validatorService.checkValidEquipment(value.data).pipe(
          map((data: IEquipmentValidationState) => ShipmentBillActions.validateEquipmentSuccess({ data })),
          catchError((error: IError) => of(ShipmentBillActions.validateEquipmentFailure({ error })))
        )
      )
    )
  );

  submitBill$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ShipmentBillActions.submitBill),
      exhaustMap(action =>
        this.billService.submitShipmentRequest(action.bill, '12345').pipe(
          map((data: object) => ShipmentBillActions.submitBillSuccess({ data })),
          catchError((error: IError) => of(ShipmentBillActions.submitBillFailure({ error })))
        )
      )
    )
  );

  handleFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ShipmentBillActions.loadBrimCustomerNamesFailure, ShipmentBillActions.loadQualifiersFailure, ShipmentBillActions.validateEquipmentFailure),
        tap(action => this.snackBar.open(action.error.message))
      ),
    { dispatch: false }
  );
}
