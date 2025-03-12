import { createReducer, on } from '@ngrx/store';

import * as ShipmentBillActions from '@otc/features/manage/shipment-bill/store/actions/shipment-bill.actions';
import { IShipmentBillState, IEquipmentValidationState } from '@otc/shared/models/state.interface';

export const featureKey = 'shipmentBill';

export const initialState: IShipmentBillState = {
  brimCustomerNames: [],
  brimCustomerNamesError: undefined,
  draft: undefined,
  draftError: undefined,
  error: undefined,
  loading: false,
  loadingBrimCustomerNames: false,
  loadingDraft: false,
  loadingPattern: false,
  loadingQualifier: false,
  loadingReferenceNumberQualifiers: false,
  loadingSpecialEndorsements: false,
  loadingStccs: false,
  loadingSubmittedBill: false,
  pattern: undefined,
  patternError: undefined,
  qualifiers: [],
  qualifiersErrors: undefined,
  referenceNumberQualifiers: [],
  referenceNumberQualifiersErrors: undefined,
  specialEndorsements: [],
  specialEndorsementsErrors: undefined,
  stccs: [],
  stccsError: undefined,
  submittedBill: undefined,
  submittedBillError: undefined,
  validEquipments: {},
  validEquipmentsError: undefined
};

export const reducer = createReducer(
  initialState,
  on(ShipmentBillActions.submitBill, state => ({
    ...state,
    loading: true
  })),
  on(ShipmentBillActions.submitBillSuccess, state => ({
    ...state,
    loading: false
  })),
  on(ShipmentBillActions.submitBillFailure, (state, action) => ({
    ...state,
    error: action.error,
    loading: false
  })),
  on(ShipmentBillActions.loadQualifiers, (state: IShipmentBillState) => ({
    ...state,
    qualifiers: [...initialState.qualifiers],
    loadingQualifier: true
  })),
  on(ShipmentBillActions.loadQualifiersSuccess, (state, action) => ({
    ...state,
    qualifiers: action.data,
    loadingQualifier: false
  })),
  on(ShipmentBillActions.loadQualifiersFailure, (state, action) => ({
    ...state,
    qualifiersErrors: action.error.messages,
    qualifiersErrorsLoading: false
  })),
  on(ShipmentBillActions.loadSpecialEndorsements, (state: IShipmentBillState) => ({
    ...state,
    specialEndorsements: [...initialState.specialEndorsements],
    loadingSpecialEndorsements: true
  })),
  on(ShipmentBillActions.loadSpecialEndorsementsSuccess, (state, action) => ({
    ...state,
    specialEndorsements: action.data,
    loadingSpecialEndorsements: false
  })),
  on(ShipmentBillActions.loadSpecialEndorsementsFailure, (state, action) => ({
    ...state,
    specialEndorsementsErrors: action.error.messages,
    loadingSpecialEndorsements: false
  })),
  on(ShipmentBillActions.loadBrimCustomerNames, (state: IShipmentBillState) => ({
    ...state,
    brimCustomerNames: [...initialState.brimCustomerNames],
    loadingBrimCustomerNames: true
  })),
  on(ShipmentBillActions.loadBrimCustomerNamesSuccess, (state, action) => ({
    ...state,
    brimCustomerNames: action.data,
    loadingBrimCustomerNames: false
  })),
  on(ShipmentBillActions.loadBrimCustomerNamesFailure, (state, action) => ({
    ...state,
    brimCustomerNamesError: action.error.messages,
    loadingBrimCustomerNames: false
  })),
  on(ShipmentBillActions.validateEquipment, (state: IShipmentBillState, action) => ({
    ...state,
    validEquipments: {
      ...state.validEquipments,
      [`${action.data.initial} ${action.data.number}`]: {
        initial: action.data.initial,
        number: action.data.number,
        loading: true
      } as IEquipmentValidationState
    },
    loadingValidEquipments: true
  })),
  on(ShipmentBillActions.validateEquipmentSuccess, (state, action) => ({
    ...state,
    validEquipments: {
      ...state.validEquipments,
      [`${action.data.initial} ${action.data.number}`]: { ...action.data, loading: false }
    },
    loadingValidEquipments: false
  })),
  on(ShipmentBillActions.validateEquipmentFailure, (state, action) => ({
    ...state,
    validEquipmentsError: action.error,
    loadingValidEquipments: false
  })),
  on(ShipmentBillActions.loadPattern, (state: IShipmentBillState) => ({
    ...state,
    pattern: initialState.pattern,
    loadingPattern: true
  })),
  on(ShipmentBillActions.loadPatternSuccess, (state, action) => ({
    ...state,
    pattern: action.data,
    loadingPattern: false
  })),
  on(ShipmentBillActions.loadPatternFailure, (state, action) => ({
    ...state,
    patternError: action.error,
    loadingPattern: false
  })),
  on(ShipmentBillActions.loadDraft, (state: IShipmentBillState) => ({
    ...state,
    draft: initialState.draft,
    loadingDraft: true
  })),
  on(ShipmentBillActions.loadDraftSuccess, (state, action) => ({
    ...state,
    draft: action.data,
    loadingDraft: false
  })),
  on(ShipmentBillActions.loadDraftFailure, (state, action) => ({
    ...state,
    draftError: action.error,
    loadingDraft: false
  })),
  on(ShipmentBillActions.loadStccs, (state: IShipmentBillState) => ({
    ...state,
    loadingStccs: true
  })),
  on(ShipmentBillActions.loadStccsSuccess, (state, action) => ({
    ...state,
    stccs: action.data,
    loadingStccs: false
  })),
  on(ShipmentBillActions.loadStccsFailure, (state, action) => ({
    ...state,
    stccsError: action.error,
    loadingStccs: false
  })),
  on(ShipmentBillActions.resetDraft, state => ({
    ...state,
    draft: initialState.draft
  })),
  on(ShipmentBillActions.resetPattern, state => ({
    ...state,
    pattern: initialState.draft
  })),
  on(ShipmentBillActions.resetSTCCs, state => ({
    ...state,
    stccs: initialState.stccs
  }))
);
