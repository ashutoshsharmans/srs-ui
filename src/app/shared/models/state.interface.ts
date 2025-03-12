import { IShipmentBill } from '@otc/features/manage/shipment-bill/models/shipment-bill.interface';
import { IShipmentOrder } from '@otc/features/shipment-orders/models/shipment-order.interface';
import { IAuthentication } from '@otc/shared/models/authentication.interface';
import { IError } from '@otc/shared/models/error.interface';
import { INotification } from '@otc/shared/models/notification.interface';
import { ISpecialEndorsement } from '@otc/shared/models/special-endorsement.interface';
import { IStccQualifier } from '@otc/shared/models/stcc.interface';
import { IUser } from '@otc/shared/models/user.interface';

/**
 * All NGRX Store State are created here.
 * The reason to do this is we don't have to import reducer in the component which minimizes the import size
 */

export interface IAuthenticationState extends IAuthentication {
  error?: IError;
  loading: boolean;
}

export interface IUserState extends IUser {
  error?: IError;
  infoLoaded: boolean;
  launchDarklyLoaded: boolean;
  loading: boolean;
  loadingLaunchDarkly: boolean;
}

export interface IShipmentBillState {
  brimCustomerNames: Array<string>;
  brimCustomerNamesError?: Array<string>;
  draft?: IShipmentBill;
  draftError?: IError;
  error?: IError;
  loading: boolean;
  loadingBrimCustomerNames: boolean;
  loadingDraft: boolean;
  loadingPattern: boolean;
  loadingQualifier: boolean;
  loadingReferenceNumberQualifiers: boolean;
  loadingSpecialEndorsements: boolean;
  loadingStccs: boolean;
  loadingSubmittedBill: boolean;
  pattern?: IShipmentBill;
  patternError?: IError;
  qualifiers: Array<IStccQualifier>;
  qualifiersErrors?: Array<string>;
  referenceNumberQualifiers: Array<{ description: string; referenceNumberQualifierCode: string }>;
  referenceNumberQualifiersErrors?: Array<string>;
  specialEndorsements: Array<ISpecialEndorsement>;
  specialEndorsementsErrors?: Array<string>;
  stccs: Array<ISTCCDetail>;
  stccsError?: IError;
  submittedBill?: IShipmentBill;
  submittedBillError?: IError;
  validEquipments: { [equipmentId: string]: IEquipmentValidationState };
  validEquipmentsError?: IError;
}

export interface ISTCCDetail {
  coal: boolean;
  description: string;
  effectiveDate?: string;
  expirationDate?: string;
  forbidden: boolean;
  hazardous: boolean;
  maxWeight: string;
  minWeight: string;
  stcc: string;
}

export interface IEquipmentValidationState {
  equipmentId: string;
  initial: string;
  loading: boolean;
  notInUmber: boolean;
  number: string;
  valid: boolean;
}

export interface IShipmentOrdersState {
  error?: IError;
  loading: boolean;
  shipmentOrders: Array<IShipmentOrder>;
}

export interface INotificationState {
  error?: IError;
  loading: boolean;
  notifications: Array<INotification>;
}

export interface IDashboardState {
  drafts: Array<IShipmentOrder>;
  error?: IError;
  loadingDrafts: boolean;
  loadingSubmitted: boolean;
  submitted: Array<IShipmentOrder>;
}

export interface IPatternDraftsDashboardState {
  deletingDraft: boolean;
  deletingDraftError?: IError;
  deletingPattern: boolean;
  deletingPatternError?: IError;
  drafts: Array<IShipmentOrder>;
  draftsError?: IError;
  loadingDrafts: boolean;
  loadingPatterns: boolean;
  patterns: Array<IShipmentOrder>;
  patternsError?: IError;
}

export interface IAdminToolsState {
  errorSubmittedShipmentRequests?: IError;
  errorUpdatedSubmittedWaybills?: IError;
  loadingSubmittedShipmentRequests: boolean;
  loadingUpdatedSubmittedWaybills: boolean;
  submittedShipmentRequests: Array<IShipmentOrder>;
  updatedSubmittedWaybills: Array<IShipmentOrder>;
}
