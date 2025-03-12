import { createAction, props } from '@ngrx/store';

import { IEquipment } from '@otc/features/manage/shipment-bill/models/equipment.interface';
import { IShipmentBill } from '@otc/features/manage/shipment-bill/models/shipment-bill.interface';
import { IError } from '@otc/shared/models/error.interface';
import { ISpecialEndorsement } from '@otc/shared/models/special-endorsement.interface';
import { ISTCCDetail, IEquipmentValidationState } from '@otc/shared/models/state.interface';
import { IStccQualifier } from '@otc/shared/models/stcc.interface';

export const submitBill = createAction('[Shipment Bill] Submit Bill', props<{ bill: object }>());

export const submitBillSuccess = createAction('[Shipment Bill] Submit Bill Success', props<{ data: object }>());

export const submitBillFailure = createAction('[Shipment Bill] Submit Bill Failure', props<{ error: IError }>());

export const deleteBill = createAction('[Shipment Bill] Delete Bill', props<{ bill: object }>());

export const deleteBillSuccess = createAction('[Shipment Bill] Delete Bill Success', props<{ data: object }>());

export const deleteBillFailure = createAction('[Shipment Bill] Delete Bill Failure', props<{ error: IError }>());

export const loadBillInformation = createAction('[Shipment Bill] Load Shipment Data', props<{ user: object }>());

export const loadQualifiers = createAction('[Shipment Bill] Load Qualifiers');

export const loadQualifiersSuccess = createAction('[Shipment Bill] Load Qualifiers Success', props<{ data: Array<IStccQualifier> }>());

export const loadQualifiersFailure = createAction('[Shipment Bill] Load Qualifiers Failure', props<{ error: IError }>());

export const loadBrimCustomerNames = createAction('[Shipment Bill] Load Brim Customer Names', props<{ user: object }>());

export const loadBrimCustomerNamesSuccess = createAction('[Shipment Bill] Load Brim Customer Names Success', props<{ data: Array<string> }>());

export const loadBrimCustomerNamesFailure = createAction('[Shipment Bill] Load Brim Customer Names Failure', props<{ error: IError }>());

export const loadSpecialEndorsements = createAction('[Shipment Bill] Load Special Endorsements');

export const loadSpecialEndorsementsSuccess = createAction('[Shipment Bill] Load Special Endorsements Success', props<{ data: Array<ISpecialEndorsement> }>());

export const loadSpecialEndorsementsFailure = createAction('[Shipment Bill] Load Brim Special Endorsements Failure', props<{ error: IError }>());

export const validateEquipment = createAction('[Shipment Bill] Validate Equipment', props<{ data: IEquipment }>());

export const validateEquipmentSuccess = createAction('[Shipment Bill] Validate Equipment Success', props<{ data: IEquipmentValidationState }>());

export const validateEquipmentFailure = createAction('[Shipment Bill] Validate Equipment Failure', props<{ error: IError }>());

export const loadPattern = createAction('[Shipment Bill] Load Pattern', props<{ id: string; webOwner: string }>());

export const loadPatternSuccess = createAction('[Shipment Bill] Load Pattern Success', props<{ data: IShipmentBill }>());

export const loadPatternFailure = createAction('[Shipment Bill] Load Pattern Failure', props<{ error: IError }>());

export const loadDraft = createAction('[Shipment Bill] Load Draft', props<{ id: string; webOwner: string }>());

export const loadDraftSuccess = createAction('[Shipment Bill] Load Draft Success', props<{ data: IShipmentBill }>());

export const loadDraftFailure = createAction('[Shipment Bill] Load Draft Failure', props<{ error: IError }>());

export const loadStccs = createAction('[Shipment Bill] Load Stccs', props<{ data?: string }>());

export const loadStccsSuccess = createAction('[Shipment Bill] Load Stccs Success', props<{ data: Array<ISTCCDetail> }>());

export const loadStccsFailure = createAction('[Shipment Bill] Load Stccs Failure', props<{ error: IError }>());

export const resetDraft = createAction('[Shipment Bill] Reset Draft');

export const resetSTCCs = createAction('[Shipment Bill] Reset STCCs');

export const resetPattern = createAction('[Shipment Bill] Reset Pattern');
