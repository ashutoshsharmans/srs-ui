import { FormArray, FormControl, FormGroup } from '@angular/forms';

import { IEquipment, IEquipmentDetail } from '@otc/features/manage/shipment-bill/models/equipment.interface';
import { EBillSection, EBillSectionLabel } from '@otc/shared/enums/bill.enums';
import { EHaz } from '@otc/shared/enums/haz.enums';
import { EOrderOption } from '@otc/shared/enums/order-setup.enums';
import { EStatus } from '@otc/shared/enums/status.enums';

/************************ MISC **************************************/
export interface ISaveBillFM {
  draftName: FormControl<string | undefined>;
}

/******************* Bill Sections **********************************/
export interface IUpdateSectionVisibility {
  add: boolean;
  additionalInfo?: IAdditionalSectionInfo;
  section: EBillSection;
}

export interface IAdditionalSectionInfo {
  radioActiveWaste: boolean;
}

export interface IBillSection {
  expanded: boolean;
  key: EBillSection;
  label: EBillSectionLabel;
  status: EStatus;
  subSections?: Array<IBillSectionChild>;
}

export interface IBillSectionChild {
  label: string;
  status: EStatus;
}

export interface IBillSectionStatus {
  commodity: EStatus;
  commodityLading: EStatus;
  customs: EStatus;
  emptyReverse: EStatus;
  generalSetup: EStatus;
  hazardous: EStatus;
  location: EStatus;
  orderSetup: EStatus;
  otmaLoadUp: EStatus;
  protectiveService: EStatus;
  rating: EStatus;
  route: EStatus;
  shipmentParties: EStatus;
  shipmentReferences: EStatus;
  vin: EStatus;
}

/******************* Form Group, Form Controls and DTO **********************************/

export interface IShipmentBillFG {
  commodity?: FormGroup<ICommodityFG>;
  commodityLading?: FormGroup<ICommodityLadingFG>;
  customs?: FormGroup<ICustomsCargoManifestFG>;
  emptyReverse?: FormGroup<IEmptyReverseFG>;
  generalSetup?: FormGroup<IGeneralSetupFG>;
  hazardous?: FormGroup<IHazardousFG>;
  location?: FormGroup<ILocationFG>;
  orderSetup?: FormGroup<IOrderSetupFG>;
  otmaLoadUp?: FormGroup<IOtmaLoadUpFG>;
  protectiveService?: FormGroup<IProtectiveServiceFG>;
  rating?: FormGroup<IRatingFG>;
  route?: FormGroup<IRouteFG>;
  shipmentParties?: FormGroup<IShipmentPartiesFG>;
  shipmentReferences?: FormGroup<IShipmentReferenceFG>;
  vin?: FormGroup<IVinFG>;
}

export interface IShipmentBill {
  commodity?: ICommodity;
  commodityLading?: ICommodityLading;
  customs?: ICustomCargoManifest;
  emptyReverse?: IEmptyReverse;
  generalSetup?: IGeneralSetup;
  hazardous?: IHazardous;
  location?: ILocation;
  orderSetup?: IOrderSetup;
  otmaLoadUp?: IOtmaLoadUp;
  protectiveService?: IProtectiveService;
  rating?: IRating;
  route?: IRoute;
  shipmentParties?: IShipmentParties;
  shipmentReferences?: IShipmentReference;
  vin?: IVin;
}

export interface IGeneralSetupFG {
  searchBy: FormControl<boolean | undefined>;
  serialNumber?: FormControl<string | undefined>;
}

export interface IGeneralSetup {
  searchBy?: boolean;
  serialNumber?: string;
}

export interface IOrderSetupFG {
  caseNumbers: FormArray<FormGroup<ICaseNumberSubGroup>>;
  deliveryDate: FormControl<string | undefined>;
  deliveryTime: FormControl<string | undefined>;
  distributedTotalWeight: FormControl<string | undefined>;
  distributedWeightType: FormControl<string | undefined>;
  idlerEquipments: FormArray<FormGroup<IIdlerEquipmentSubGroup>>;
  manifestEquipment?: FormGroup<IEquipmentSubGroup>;
  multipleEquipments: FormControl<string | undefined>;
  orderOption: FormControl<EOrderOption | undefined>;
  overwriteAllPOEs: FormControl<boolean | undefined>;
  piecesOfEquipment: FormArray<FormGroup<IPieceOfEquipmentSubGroup>>;
  previousSerialNumber?: FormControl<string | undefined>;
  sectionSeven: FormControl<string | undefined>;
  shipmentType: FormControl<string | undefined>;
  shipperBOLDate: FormControl<string | undefined>;
  shipperBOLNumber: FormControl<string | undefined>;
  shipperBOLTime: FormControl<string | undefined>;
  totalNetWeight: FormControl<number | undefined>;
  waybillDate: FormControl<string | undefined>;
  waybillNumber: FormControl<string | undefined>;
  weightAgreement: FormControl<string | undefined>;
  weightQualifier: FormControl<string | undefined>;
}

export interface IOrderSetup {
  caseNumbers?: Array<ICaseNumber>;
  deliveryDate?: string;
  deliveryTime?: string;
  distributedTotalWeight?: string;
  distributedWeightType?: string;
  idlerEquipments?: Array<IIdlerEquipment>;
  manifestEquipment?: IEquipment;
  multipleEquipments?: string;
  orderOption?: EOrderOption;
  overwriteAllPOEs?: boolean;
  piecesOfEquipment?: Array<IPieceOfEquipment>;
  previousSerialNumber?: string;
  sectionSeven?: string;
  shipmentType?: string;
  shipperBOLDate?: string;
  shipperBOLNumber?: string;
  shipperBOLTime?: string;
  totalNetWeight?: number;
  waybillDate?: string;
  waybillNumber?: string;
  weightAgreement?: string;
  weightQualifier?: string;
}

export interface IShipmentPartiesFG {
  additionalParties: FormArray<FormGroup<IAdditionalBillToPartySubGroup>>;
  billToPartyAddress: FormControl<string | undefined>;
  consignee: FormGroup<ICustomerInfoSubGroup>;
  shipper: FormGroup<ICustomerInfoSubGroup>;
}

export interface IShipmentParties {
  additionalParties?: Array<IAdditionalBillToParty>;
  billToPartyAddress?: string;
  consignee?: ICustomerInfo;
  shipper?: ICustomerInfo;
}

export interface IRouteFG {
  destinationBeyondLocation?: FormControl<string | undefined>;
  destinationBeyondRoad?: FormControl<string | undefined>;
  destinationJunctionSettlementJunction?: FormControl<string | undefined>;
  destinationJunctionSettlementRoad?: FormControl<string | undefined>;
  destinationSwitchJunction?: FormControl<string | undefined>;
  destinationSwitchRoad?: FormControl<string | undefined>;
  origin: FormControl<string | undefined>;
  originFromRoad?: FormControl<string | undefined>;
  originFromStation?: FormControl<string | undefined>;
  originSettlementJunction?: FormControl<string | undefined>;
  originSettlementRoad?: FormControl<string | undefined>;
  originStation: FormControl<string | undefined>;
  originSwitchRoad?: FormControl<string | undefined>;
  payMethod: FormControl<string | undefined>;
  road: FormControl<string | undefined>;
  routeType: FormControl<string | undefined>;
  segments: FormArray<FormGroup<ISegmentSubGroup>>;
}

export interface IRoute {
  destinationBeyondLocation?: string;
  destinationBeyondRoad?: string;
  destinationJunctionSettlementJunction?: string;
  destinationJunctionSettlementRoad?: string;
  destinationSwitchJunction?: string;
  destinationSwitchRoad?: string;
  origin?: string;
  originFromRoad?: string;
  originFromStation?: string;
  originSettlementJunction?: string;
  originSettlementRoad?: string;
  originStation?: string;
  originSwitchRoad?: string;
  payMethod?: string;
  road?: string;
  routeType?: string;
  segments?: Array<ISegment>;
}

export interface IEmptyReverseFG {
  destinationCity: FormControl<string | undefined>;
  destinationSwitch?: FormGroup<ISegmentSubGroup>;
  emptyReverseConsignee: FormControl<string | undefined>;
  emptyReverseRoad: FormControl<string | undefined>;
  emptyReverseSegments: FormArray<FormGroup<ISegmentSubGroup>>;
}

export interface IEmptyReverse {
  destinationCity?: string;
  destinationSwitch?: ISegment;
  emptyReverseConsignee?: string;
  emptyReverseRoad?: string;
  emptyReverseSegments?: Array<ISegment>;
}

export interface ICommodityFG {
  hazSTCCs: FormArray<FormGroup<ISTCCHazSubGroup>>;
  hazStcc: FormControl<EHaz | undefined>;
  stcc: FormGroup<ISTCCSubGroup>;
}

export interface ICommodity {
  hazSTCCs?: Array<ISTCCHaz>;
  hazStcc?: EHaz;
  stcc?: ISTCC;
}

export interface ICommodityLadingFG {
  additionalInfo: FormControl<string | undefined>;
  commodityLadingPieces: FormArray<FormGroup<ICommodityLadingDetailSubGroup>>;
}

export interface ICommodityLading {
  additionalInfo?: string;
  commodityLadingPieces?: Array<ICommodityLadingDetail>;
}

export interface IOtmaLoadUpFG {
  otma: FormControl<string | undefined>;
}

export interface IOtmaLoadUp {
  otma?: string;
}

export interface ICommodityLadingDetailSubGroup {
  accountCode: FormControl<string | undefined>;
  amount: FormControl<string | undefined>;
  description: FormControl<string | undefined>;
  pieces: FormControl<string | undefined>;
  rate: FormControl<string | undefined>;
}

export interface ICommodityLadingDetail {
  accountCode?: string;
  amount?: string;
  description?: string;
  pieces?: string;
  rate?: string;
}

export interface IVinFG {
  multipleVINS: FormControl<string | undefined>;
  vinNumbers: FormArray<FormGroup<IVinDetailSubGroup>>;
}

export interface IVin {
  multipleVINS?: string;
  vinNumbers?: Array<IVinDetail>;
}

export interface IShipmentReferenceFG {
  additionalShipmentItems: FormControl<Array<string> | undefined>;
  brimCustomerName: FormControl<string | undefined>;
  brimVesselDestination: FormControl<string | undefined>;
  mineNumber: FormControl<string | undefined>;
  permitNumber: FormControl<string | undefined>;
  shipmentReferences: FormArray<FormGroup<IShipmentReferenceDetailSubGroup>>;
  specialEndorsements: FormControl<Array<string> | undefined>;
}

export interface IShipmentReference {
  additionalShipmentItems?: Array<string>;
  brimCustomerName?: string;
  brimVesselDestination?: string;
  mineNumber?: string;
  permitNumber?: string;
  shipmentReferences?: Array<IShipmentReferenceSub>;
  specialEndorsements?: Array<string>;
}

export interface IRatingFG {
  contractNumberOne: FormControl<string | undefined>;
  contractNumberTwo: FormControl<string | undefined>;
  formattedNumberOne: FormControl<string | undefined>;
  formattedNumberTwo: FormControl<string | undefined>;
}

export interface IRating {
  contractNumberOne?: string;
  contractNumberTwo?: string;
  formattedNumberOne?: string;
  formattedNumberTwo?: string;
}

export interface IHazardousFG {
  hazContacts?: FormArray<FormGroup<IHazardousContactSubGroup>>;
  hazRadioActive?: FormGroup<IHazardousRadioActiveSubGroup>;
  hazStccs?: FormArray<FormGroup<IHazardousStccSubGroup>>;
  hazWaste?: FormGroup<IHazardousWasteSubGroup>;
}

export interface IHazardous {
  hazContacts?: Array<IHazardousContact>;
  hazRadioActive?: IHazardousRadioActive;
  hazStccs?: Array<IHazardousStcc>;
  hazWaste?: IHazardousWaste;
}

export interface ICustomsCargoManifestFG {
  customParties: FormArray<FormGroup<IAdditionalBillToPartySubGroup>>;
  inBonds: FormArray<FormGroup<IInboundSubGroup>>;
  manifests: FormArray<FormGroup<IManifestSubGroup>>;
  shipmentParties: FormArray<FormGroup<ICustomerInfoSubGroup>>;
}

export interface ICustomCargoManifest {
  customParties?: Array<IAdditionalBillToParty>;
  inBond?: IInbound;
  manifests?: Array<IManifest>;
  shipmentParty?: Array<ICustomerInfo>;
}

export interface IProtectiveServiceFG {
  preCooled: FormControl<boolean | undefined>;
  protectiveServiceCode: FormControl<string | undefined>;
  protectiveServiceRoad: FormControl<string | undefined>;
  protectiveServiceRule: FormControl<string | undefined>;
  station: FormControl<string | undefined>;
  temperature: FormControl<string | undefined>;
  temperatureUnit: FormControl<string | undefined>;
}

export interface IProtectiveService {
  preCooled?: boolean;
  protectiveServiceCode?: string;
  protectiveServiceRoad?: string;
  protectiveServiceRule?: string;
  station?: string;
  temperature?: string;
  temperatureUnit?: string;
}

export interface ILocationFG {
  location: FormControl<string | undefined>;
}

export interface ILocation {
  location?: string;
}

/********************** Sub Groups ****************************/

export interface ICaseNumberSubGroup {
  caseNumber: FormControl<string | undefined>;
}

export interface ICaseNumber {
  caseNumber?: string;
}

export interface IPieceOfEquipmentSubGroup {
  equipmentId: FormGroup<IEquipmentSubGroup>;
  grossWeight: FormControl<string | undefined>;
  netWeight: FormControl<number | undefined>;
  sealNumber: FormControl<string | undefined>;
  tareWeight: FormControl<string | undefined>;
}

export interface IPieceOfEquipment {
  equipmentId?: IEquipmentDetail;
  grossWeight?: string;
  netWeight?: number;
  sealNumber?: string;
  tareWeight?: string;
}

export interface IIdlerEquipmentSubGroup {
  idlerInitial: FormControl<string | undefined>;
  idlerNumber: FormControl<string | undefined>;
}

export interface IIdlerEquipment {
  idlerInitial?: string;
  idlerNumber?: string;
}

export interface ICustomerInfoSubGroup {
  addressOne: FormControl<string | undefined>;
  addressTwo: FormControl<string | undefined>;
  city: FormControl<string | undefined>;
  contact: FormControl<string | undefined>;
  customerId: FormControl<string | undefined>;
  entityId: FormControl<string | undefined>;
  entityIdQualifier: FormControl<string | undefined>;
  name: FormControl<string | undefined>;
  phone: FormControl<string | undefined>;
  shipperName: FormControl<string | undefined>;
  state: FormControl<string | undefined>;
  zip: FormControl<string | undefined>;
}

export interface ICustomerInfo {
  addressOne?: string;
  addressTwo?: string;
  city?: string;
  contact?: string;
  customerId?: string;
  entityId?: string;
  entityIdQualifier?: string;
  name?: string;
  phone?: string;
  shipperName?: string;
  state?: string;
  zip?: string;
}

export interface IAdditionalBillToPartySubGroup extends ICustomerInfoSubGroup {
  typeOfShipmentParty: FormControl<string | undefined>;
}

export interface IAdditionalBillToParty extends ICustomerInfo {
  typeOfShipmentParty?: string;
}

export interface IVinDetailSubGroup {
  dealerCode: FormControl<string | undefined>;
  position: FormControl<string | undefined>;
  type: FormControl<string | undefined>;
  vin: FormControl<string | undefined>;
}

export interface IVinDetail {
  dealerCode?: string;
  position?: string;
  type?: string;
  vin?: string;
}

export interface IManifestSubGroup {
  bookingNumber: FormControl<string | undefined>;
  country: FormControl<string | undefined>;
  currentCarrier: FormControl<string | undefined>;
  dockSailDate: FormControl<string | undefined>;
  manifestDate: FormControl<string | undefined>;
  portFunction: FormControl<string | undefined>;
  portName: FormControl<string | undefined>;
  previousCarrier: FormControl<string | undefined>;
  state: FormControl<string | undefined>;
  vessel: FormControl<string | undefined>;
  voyageNumber: FormControl<string | undefined>;
}

export interface IManifest {
  bookingNumber?: string;
  country?: string;
  currentCarrier?: string;
  dockSailDate?: string;
  manifestDate?: string;
  portFunction?: string;
  portName?: string;
  previousCarrier?: string;
  state?: string;
  vessel?: string;
  voyageNumber?: string;
}

export interface IInboundSubGroup {
  bondReference: FormControl<string | undefined>;
  customsShipmentValue: FormControl<string | undefined>;
  destinationLocationId: FormControl<string | undefined>;
  entryNumber: FormControl<string | undefined>;
  exportOfTermLocationId: FormControl<string | undefined>;
  inBondControlNumber: FormControl<string | undefined>;
  inBondType: FormControl<string | undefined>;
  irsScaccRR: FormControl<string | undefined>;
  usCustomsAndBorderProtectionBOL: FormControl<string | undefined>;
}

export interface IInbound {
  bondReference?: string;
  customsShipmentValue?: string;
  destinationLocationId?: string;
  entryNumber?: string;
  exportOfTermLocationId?: string;
  inBondControlNumber?: string;
  inBondType?: string;
  irsScaccRR?: string;
  usCustomsAndBorderProtectionBOL?: string;
}

export interface ISegmentSubGroup {
  junction: FormControl<string | undefined>;
  road: FormControl<string | undefined>;
}

export interface ISegment {
  junction?: string;
  road?: string;
}

export interface ISTCCHazSubGroup extends ISTCCSubGroup {
  amount: FormControl<string | undefined>;
  amountQualifier: FormControl<string | undefined>;
  compartment: FormControl<string | undefined>;
}

export interface ISTCCHaz extends ISTCC {
  amount?: string;
  amountQualifier?: string;
  compartment?: string;
}

export interface ISTCCSubGroup {
  description: FormControl<string | undefined>;
  packageQualifier: FormControl<string | undefined>;
  pieces: FormControl<string | undefined>;
  stcc: FormControl<string | undefined>;
}

export interface ISTCC {
  description?: string;
  packageQualifier?: string;
  pieces?: string;
  stcc?: string;
}

export interface IEquipmentSubGroup {
  initial: FormControl<string | undefined>;
  number: FormControl<string | undefined>;
  overwrite?: FormControl<boolean | undefined>;
}

export interface IShipmentReferenceDetailSubGroup {
  referenceDate: FormControl<string | undefined>;
  referenceFreeformDescription: FormControl<string | undefined>;
  referenceNumber: FormControl<string | undefined>;
  referenceQualifier: FormControl<string | undefined>;
}

export interface IShipmentReferenceSub {
  referenceDate?: string;
  referenceFreeformDescription?: string;
  referenceNumber?: string;
  referenceQualifier?: string;
}

export interface IHazardousStccSubGroup {
  additionalHazmat: FormControl<string | undefined>;
  additionalHazmatEntities: FormArray<FormGroup<IAdditionalHazmatEntitySubGroup>>;
  amount: FormControl<string | undefined>;
  amountQualifier: FormControl<string | undefined>;
  chemtrec: FormControl<string | undefined>;
  competentAuthorizationNumber: FormControl<string | undefined>;
  description: FormControl<string | undefined>;
  dotHazardousNumber: FormControl<string | undefined>;
  flashPointTemperature: FormControl<string | undefined>;
  flumigation: FormControl<string | undefined>;
  fumigationBeginDate: FormControl<string | undefined>;
  hazContacts: FormArray<FormGroup<IHazardousContactSubGroup>>;
  hazardZone: FormControl<string | undefined>;
  hazardousClassPrimary: FormControl<string | undefined>;
  hazardousClassSecondaryOne: FormControl<string | undefined>;
  hazardousClassSecondaryThree: FormControl<string | undefined>;
  hazardousClassSecondaryTwo: FormControl<string | undefined>;
  hazardousExemptionNumber: FormControl<string | undefined>;
  hazmatOptions: FormControl<string | undefined>;
  marinePollutant: FormControl<string | undefined>;
  maximumSpeed: FormControl<string | undefined>;
  netExplosiveQualifier: FormControl<string | undefined>;
  netExplosiveQuality: FormControl<string | undefined>;
  packageQualifier: FormControl<string | undefined>;
  packagingGroup: FormControl<string | undefined>;
  pieces: FormControl<string | undefined>;
  properShipperName: FormControl<string | undefined>;
  reportableQuantity: FormControl<string | undefined>;
  shipperNameQualifier: FormControl<string | undefined>;
  specialApproval: FormControl<string | undefined>;
  stcc: FormControl<string | undefined>;
  technicalName: FormControl<string | undefined>;
  temperatureUnit: FormControl<string | undefined>;
  tradeName: FormControl<string | undefined>;
  unNA: FormControl<string | undefined>;
}

export interface IHazardousStcc {
  additionalHazmat?: string;
  additionalHazmatEntities?: Array<IAdditionalHazmatEntity>;
  amount?: string;
  amountQualifier?: string;
  chemtrec?: string;
  competentAuthorizationNumber?: string;
  description?: string;
  dotHazardousNumber?: string;
  flashPointTemperature?: string;
  flumigation?: string;
  fumigationBeginDate?: string;
  hazContacts?: Array<IHazardousContact>;
  hazardZone?: string;
  hazardousClassPrimary?: string;
  hazardousClassSecondaryOne?: string;
  hazardousClassSecondaryThree?: string;
  hazardousClassSecondaryTwo?: string;
  hazardousExemptionNumber?: string;
  hazmatOptions?: string;
  marinePollutant?: string;
  maximumSpeed?: string;
  netExplosiveQualifier?: string;
  netExplosiveQuality?: string;
  packageQualifier?: string;
  packagingGroup?: string;
  pieces?: string;
  properShipperName?: string;
  reportableQuantity?: string;
  shipperNameQualifier?: string;
  specialApproval?: string;
  stcc?: string;
  technicalName?: string;
  temperatureUnit?: string;
  tradeName?: string;
  unNA?: string;
}

export interface IHazardousContactSubGroup {
  areaCode: FormControl<string | undefined>;
  nameOrContract: FormControl<string | undefined>;
  number: FormControl<string | undefined>;
  type: FormControl<string | undefined>;
}

export interface IHazardousContact {
  areaCode?: string;
  nameOrContract?: string;
  number?: string;
  type?: string;
}

export interface IAdditionalHazmatEntitySubGroup {
  addressOne: FormControl<string | undefined>;
  addressTwo: FormControl<string | undefined>;
  city: FormControl<string | undefined>;
  contact: FormControl<string | undefined>;
  customerNumber: FormControl<string | undefined>;
  entityIdCode: FormControl<string | undefined>;
  phone: FormControl<string | undefined>;
  state: FormControl<string | undefined>;
  zip: FormControl<string | undefined>;
}

export interface IAdditionalHazmatEntity {
  addressOne?: string;
  addressTwo?: string;
  city?: string;
  contact?: string;
  customerNumber?: string;
  entityIdCode?: string;
  phone?: string;
  state?: string;
  zip?: string;
}

export interface IHazardousWasteSubGroup {
  epaWasteStreamOne: FormControl<string | undefined>;
  epaWasteStreamThree: FormControl<string | undefined>;
  epaWasteStreamTwo: FormControl<string | undefined>;
  manifestDocumentNumber: FormControl<string | undefined>;
  specialInstructions: FormControl<string | undefined>;
}

export interface IHazardousWaste {
  epaWasteStreamOne?: string;
  epaWasteStreamThree?: string;
  epaWasteStreamTwo?: string;
  manifestDocumentNumber?: string;
  specialInstructions?: string;
}

export interface IHazardousRadioActiveSubGroup {
  activityQuantity: FormControl<string | undefined>;
  activityUnit: FormControl<string | undefined>;
  chemicalForm: FormControl<string | undefined>;
  csi: FormControl<string | undefined>;
  exclusiveUse: FormControl<string | undefined>;
  exclusiveUseInstructions: FormControl<string | undefined>;
  fissile: FormControl<string | undefined>;
  label: FormControl<string | undefined>;
  physicalForm: FormControl<string | undefined>;
  radioActive: FormControl<boolean | undefined>;
  radioactiveMiscInfo: FormControl<string | undefined>;
  radionuclides: FormControl<string | undefined>;
  transportIndex: FormControl<string | undefined>;
}

export interface IHazardousRadioActive {
  activityQuantity?: string;
  activityUnit?: string;
  chemicalForm?: string;
  csi?: string;
  exclusiveUse?: string;
  exclusiveUseInstructions?: string;
  fissile?: string;
  label?: string;
  physicalForm?: string;
  radioActive?: boolean;
  radioactiveMiscInfo?: string;
  radionuclides?: string;
  transportIndex?: string;
}
