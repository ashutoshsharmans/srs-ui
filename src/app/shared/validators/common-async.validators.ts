/* eslint-disable no-null/no-null */
import { inject, Injectable } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormGroup, ValidationErrors } from '@angular/forms';
import { distinctUntilChanged, filter, Observable, of, switchMap, take, tap, timer } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { IEquipmentDetail } from '@otc/features/manage/shipment-bill/models/equipment.interface';
import { IOrderSetupFG, IShipmentBill, IShipmentBillFG } from '@otc/features/manage/shipment-bill/models/shipment-bill.interface';
import { ShipmentBillFacade } from '@otc/features/manage/shipment-bill/store/facades/shipment-bill.facade';
import { EOrderOption } from '@otc/shared/enums/order-setup.enums';
import { IEquipmentValidationState, IShipmentBillState, ISTCCDetail } from '@otc/shared/models/state.interface';
import { IStccValidator } from '@otc/shared/models/validator.interface';

@Injectable({
  providedIn: 'root'
})
export class OtcAsyncValidators {
  billFacade: ShipmentBillFacade = inject(ShipmentBillFacade);

  validEquipment(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const input: IEquipmentDetail = control.value as IEquipmentDetail;
      const parentForm: FormGroup<IShipmentBillFG> = control.root as FormGroup<IShipmentBillFG>;
      const orderSetupForm: FormGroup<IOrderSetupFG> | undefined = parentForm.controls.orderSetup;
      const overwriteAll = orderSetupForm ? orderSetupForm?.controls.overwriteAllPOEs.value : false;
      const equipmentId = `${input.initial} ${input.number}`;
      const equipmentValidationState: IEquipmentValidationState | undefined = this.billFacade.getShipmentBillState().validEquipments[equipmentId];
      if (overwriteAll) {
        return of(null);
      } else if (equipmentValidationState && !equipmentValidationState.loading) {
        return of(equipmentValidationState.valid || input.overwrite ? null : equipmentValidationState);
      } else {
        return timer(300).pipe(
          switchMap(() => {
            if (!equipmentValidationState?.loading) this.billFacade.validateEquipment(input);
            return this.billFacade.shipmentBill.pipe(
              filter((validationState: IShipmentBillState) => !validationState.validEquipments[equipmentId].loading),
              take(1),
              map((state: IShipmentBillState) => {
                const newState: IEquipmentValidationState = state.validEquipments[equipmentId];
                return newState.valid ? {} : newState;
              }),
              tap(() => setTimeout(() => orderSetupForm?.updateValueAndValidity({ emitEvent: true }))),
              catchError(() => of(null))
            );
          })
        );
      }
    };
  }

  validStcc(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const input: string = control.value;
      if (!input) {
        this.billFacade.resetStccs();
        return of(null);
      } else {
        return timer(300).pipe(
          distinctUntilChanged(),
          switchMap(() => {
            this.billFacade.loadStccs(input);
            return this.billFacade.shipmentBill.pipe(
              filter((validationState: IShipmentBillState) => !validationState.loadingStccs),
              take(1),
              map((state: IShipmentBillState) => {
                const stccDetail: ISTCCDetail | undefined = state.stccs.find((stccDetail: ISTCCDetail) => stccDetail.stcc.toLowerCase() === input || stccDetail.description.toLowerCase() === input);
                const submittedBill: IShipmentBill | undefined = state.submittedBill;
                const error: IStccValidator = {};
                if (!stccDetail) {
                  return { invalidStcc: true };
                } else {
                  const parentForm: FormGroup<IShipmentBillFG> = control.root as FormGroup<IShipmentBillFG>;
                  const orderSetupForm: FormGroup<IOrderSetupFG> | undefined = parentForm.controls.orderSetup;
                  const orderOption: EOrderOption | undefined = orderSetupForm?.controls.orderOption.value;

                  const invalidOrderOption: boolean = !orderOption;
                  if (invalidOrderOption) error.invalidOrderOption = true;

                  const invalidEmptyNonRevenue: boolean =
                    orderOption === EOrderOption.EMPTY_NON_REVENUE &&
                    !(stccDetail?.stcc.startsWith('37422') || stccDetail?.stcc.startsWith('48') || stccDetail?.stcc.startsWith('49')) &&
                    !(stccDetail?.description.includes('NONREVENUE') || stccDetail?.description.includes('NON-REVENUE') || stccDetail?.description.includes('NON REVENUE'));
                  if (invalidEmptyNonRevenue) error.invalidEmptyNonRevenue = true;

                  const forbidUpdateBillHazToNonHaz = submittedBill && submittedBill.commodity?.stcc?.stcc?.startsWith('48');
                  if (forbidUpdateBillHazToNonHaz) error.forbidUpdateBillHazToNonHaz = true;

                  const forbidUpdateBillNonHazToHaz = submittedBill && submittedBill.commodity?.stcc?.stcc?.startsWith('48');
                  if (forbidUpdateBillNonHazToHaz) error.forbidUpdateBillNonHazToHaz = true;

                  return Object.keys(error).length === 0 ? null : error;
                }
              }),
              catchError(() => of(null))
            );
          })
        );
      }
    };
  }
}
