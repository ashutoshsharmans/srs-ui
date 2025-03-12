import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

import { OtcValidatorConstants } from '@otc/configs/validator.constants';
import {
  IAdditionalBillToPartySubGroup,
  ICaseNumberSubGroup,
  ICommodityFG,
  ICustomerInfoSubGroup,
  ICustomsCargoManifestFG,
  IEmptyReverseFG,
  IEquipmentSubGroup,
  IHazardousFG,
  IIdlerEquipmentSubGroup,
  IInboundSubGroup,
  IManifestSubGroup,
  IOrderSetupFG,
  IPieceOfEquipmentSubGroup,
  IProtectiveServiceFG,
  IRatingFG,
  IRouteFG,
  ISegmentSubGroup,
  IShipmentBillFG,
  IShipmentPartiesFG,
  IShipmentReferenceFG,
  IShipmentReferenceDetailSubGroup,
  ISTCCHazSubGroup,
  ISTCCSubGroup,
  IVinDetailSubGroup,
  IVinFG,
  ICommodityLadingFG,
  ICommodityLadingDetailSubGroup,
  IGeneralSetupFG,
  ILocationFG,
  IHazardousContactSubGroup,
  IHazardousWasteSubGroup,
  IHazardousRadioActiveSubGroup,
  IHazardousStccSubGroup,
  IAdditionalHazmatEntitySubGroup,
  IOtmaLoadUpFG
} from '@otc/features/manage/shipment-bill/models/shipment-bill.interface';
import { IPermission } from '@otc/shared/models/permission.interface';
import { OtcAsyncValidators } from '@otc/shared/validators/common-async.validators';

export class OtcShipmentBillFormConstants {
  static getMiscellaneousBillForm(disabled: boolean, validators: OtcAsyncValidators, permission?: IPermission) {
    return new FormGroup<IShipmentBillFG>({
      orderSetup: permission?.orderSetup ? this.getOrderSetupForm(disabled, validators) : undefined,
      commodityLading: permission?.commodityLading ? this.getCommodityLading(disabled) : undefined,
      rating: permission?.rating ? this.getRatingForm(disabled) : undefined,
      shipmentParties: permission?.shipmentParties ? this.getShipmentPartiesForm(disabled) : undefined,
      location: permission?.location ? this.getLocationForm(disabled) : undefined
    });
  }

  static getBOLForm(disabled: boolean, validators: OtcAsyncValidators, permission?: IPermission) {
    return new FormGroup<IShipmentBillFG>({
      orderSetup: permission?.orderSetup ? this.getOrderSetupForm(disabled, validators) : undefined,
      commodity: permission?.commodity ? this.getCommodityForm(disabled, validators) : undefined,
      route: permission?.routes ? this.getRouteForm(disabled) : undefined,
      rating: permission?.rating ? this.getRatingForm(disabled) : undefined,
      shipmentReferences: permission?.shipmentReferences ? this.getShipmentReferenceForm(disabled) : undefined,
      shipmentParties: permission?.shipmentParties ? this.getShipmentPartiesForm(disabled) : undefined
    });
  }

  static getWaybillForm(disabled: boolean, validators: OtcAsyncValidators, permission?: IPermission) {
    return new FormGroup<IShipmentBillFG>({
      generalSetup: permission?.general ? this.getGeneralSetupForm() : undefined,
      orderSetup: permission?.orderSetup ? this.getOrderSetupForm(disabled, validators) : undefined,
      shipmentParties: permission?.shipmentParties ? this.getShipmentPartiesForm(disabled) : undefined,
      customs: permission?.customs ? this.getCustomCargoManifestForm(disabled) : undefined,
      emptyReverse: permission?.emptyReverse ? this.getEmptyReverseForm(disabled) : undefined,
      protectiveService: permission?.protectiveService ? this.getProtectiveServiceForm(disabled) : undefined,
      rating: permission?.rating ? this.getRatingForm(disabled) : undefined,
      route: permission?.routes ? this.getRouteForm(disabled) : undefined,
      shipmentReferences: permission?.shipmentReferences ? this.getShipmentReferenceForm(disabled) : undefined,
      vin: permission?.vin ? this.getVinForm(disabled) : undefined,
      commodity: permission?.commodity ? this.getCommodityForm(disabled, validators) : undefined
    });
  }

  static getOrderSetupForm(disabled: boolean, validators: OtcAsyncValidators): FormGroup<IOrderSetupFG> {
    return new FormGroup<IOrderSetupFG>({
      overwriteAllPOEs: new FormControl({ value: undefined, disabled }, { nonNullable: true }),
      caseNumbers: new FormArray<FormGroup<ICaseNumberSubGroup>>([this.getNewCaseNumberForm(disabled)]),
      deliveryDate: new FormControl({ value: undefined, disabled }, { nonNullable: true }),
      deliveryTime: new FormControl({ value: undefined, disabled }, { nonNullable: true }),
      distributedTotalWeight: new FormControl({ value: undefined, disabled }, { nonNullable: true }),
      distributedWeightType: new FormControl({ value: undefined, disabled }, { nonNullable: true }),
      idlerEquipments: new FormArray<FormGroup<IIdlerEquipmentSubGroup>>([]),
      multipleEquipments: new FormControl({ value: undefined, disabled }, { nonNullable: true }),
      orderOption: new FormControl(
        { value: undefined, disabled },
        {
          nonNullable: true,
          validators: Validators.required
        }
      ),
      piecesOfEquipment: new FormArray<FormGroup<IPieceOfEquipmentSubGroup>>([this.getNewEquipmentForm(disabled, validators)], {
        validators: [OtcValidatorConstants.duplicateEquipment()]
      }),
      sectionSeven: new FormControl({ value: undefined, disabled }, { nonNullable: true }),
      shipmentType: new FormControl({ value: undefined, disabled }, { nonNullable: true }),
      shipperBOLDate: new FormControl(
        { value: undefined, disabled },
        {
          nonNullable: true
        }
      ),
      shipperBOLNumber: new FormControl(
        { value: undefined, disabled },
        {
          nonNullable: true
        }
      ),
      shipperBOLTime: new FormControl({ value: undefined, disabled }, { nonNullable: true, validators: [Validators.required] }),
      totalNetWeight: new FormControl({ value: undefined, disabled }, { nonNullable: true }),
      waybillDate: new FormControl({ value: undefined, disabled }, { nonNullable: true }),
      waybillNumber: new FormControl({ value: undefined, disabled }, { nonNullable: true }),
      weightAgreement: new FormControl({ value: undefined, disabled }, { nonNullable: true }),
      weightQualifier: new FormControl({ value: undefined, disabled }, { nonNullable: true }),
      manifestEquipment: new FormGroup<IEquipmentSubGroup>({
        initial: new FormControl({ value: undefined, disabled }, { nonNullable: true }),
        number: new FormControl({ value: undefined, disabled }, { nonNullable: true })
      })
    });
  }

  static getShipmentPartiesForm(disabled: boolean): FormGroup<IShipmentPartiesFG> {
    return new FormGroup<IShipmentPartiesFG>({
      additionalParties: new FormArray<FormGroup<IAdditionalBillToPartySubGroup>>([]),
      billToPartyAddress: new FormControl({ value: undefined, disabled }, { nonNullable: true }),
      consignee: OtcShipmentBillFormConstants.getCustomInfoDetail(disabled),
      shipper: OtcShipmentBillFormConstants.getCustomInfoDetail(disabled)
    });
  }

  static getOtmaLoadUpForm(disabled: boolean): FormGroup<IOtmaLoadUpFG> {
    return new FormGroup<IOtmaLoadUpFG>({
      otma: new FormControl({ value: undefined, disabled }, { nonNullable: true })
    });
  }

  static getLocationForm(disabled: boolean): FormGroup<ILocationFG> {
    return new FormGroup<ILocationFG>({
      location: new FormControl({ value: undefined, disabled }, { nonNullable: true })
    });
  }

  static getCustomInfoDetail(disabled: boolean): FormGroup<ICustomerInfoSubGroup> {
    return new FormGroup<ICustomerInfoSubGroup>({
      addressOne: new FormControl({ value: undefined, disabled }, { nonNullable: true }),
      addressTwo: new FormControl({ value: undefined, disabled }, { nonNullable: true }),
      city: new FormControl({ value: undefined, disabled }, { nonNullable: true }),
      contact: new FormControl({ value: undefined, disabled }, { nonNullable: true }),
      customerId: new FormControl({ value: undefined, disabled }, { nonNullable: true }),
      entityId: new FormControl({ value: undefined, disabled }, { nonNullable: true }),
      entityIdQualifier: new FormControl({ value: undefined, disabled }, { nonNullable: true }),
      name: new FormControl({ value: undefined, disabled }, { nonNullable: true }),
      phone: new FormControl({ value: undefined, disabled }, { nonNullable: true }),
      shipperName: new FormControl({ value: undefined, disabled }, { nonNullable: true }),
      state: new FormControl({ value: undefined, disabled }, { nonNullable: true }),
      zip: new FormControl({ value: undefined, disabled }, { nonNullable: true })
    });
  }

  static getRouteForm(disabled: boolean): FormGroup<IRouteFG> {
    return new FormGroup<IRouteFG>({
      origin: new FormControl({ value: undefined, disabled }, { nonNullable: true }),
      road: new FormControl({ value: undefined, disabled }, { nonNullable: true }),
      segments: new FormArray<FormGroup<ISegmentSubGroup>>([]),
      originStation: new FormControl({ value: undefined, disabled }, { nonNullable: true }),
      payMethod: new FormControl({ value: undefined, disabled }, { nonNullable: true }),
      routeType: new FormControl({ value: undefined, disabled }, { nonNullable: true })
    });
  }

  static getShipmentReferenceForm(disabled: boolean): FormGroup<IShipmentReferenceFG> {
    return new FormGroup<IShipmentReferenceFG>({
      brimVesselDestination: new FormControl({ value: undefined, disabled }, { nonNullable: true }),
      brimCustomerName: new FormControl({ value: undefined, disabled }, { nonNullable: true }),
      mineNumber: new FormControl({ value: undefined, disabled }, { nonNullable: true }),
      permitNumber: new FormControl({ value: undefined, disabled }, { nonNullable: true }),
      specialEndorsements: new FormControl({ value: undefined, disabled }, { nonNullable: true }),
      additionalShipmentItems: new FormControl({ value: undefined, disabled }, { nonNullable: true }),
      shipmentReferences: new FormArray<FormGroup<IShipmentReferenceDetailSubGroup>>([])
    });
  }

  static getCustomCargoManifestForm(disabled: boolean): FormGroup<ICustomsCargoManifestFG> {
    return new FormGroup<ICustomsCargoManifestFG>({
      customParties: new FormArray<FormGroup<IAdditionalBillToPartySubGroup>>([]),
      inBonds: new FormArray<FormGroup<IInboundSubGroup>>([this.getInBondForm(disabled)]),
      manifests: new FormArray<FormGroup<IManifestSubGroup>>([this.getManifestForm(disabled)]),
      shipmentParties: new FormArray<FormGroup<ICustomerInfoSubGroup>>([this.getCustomInfoDetail(disabled)])
    });
  }

  static getGeneralSetupForm(): FormGroup<IGeneralSetupFG> {
    return new FormGroup<IGeneralSetupFG>({
      searchBy: new FormControl(undefined, { nonNullable: true }),
      serialNumber: new FormControl(undefined, { nonNullable: true })
    });
  }

  static getCommodityLading(disabled: boolean): FormGroup<ICommodityLadingFG> {
    return new FormGroup<ICommodityLadingFG>({
      additionalInfo: new FormControl({ value: undefined, disabled }, { nonNullable: true }),
      commodityLadingPieces: new FormArray<FormGroup<ICommodityLadingDetailSubGroup>>([this.getCommodityLadingDetailForm(disabled)])
    });
  }

  static getCommodityLadingDetailForm(disabled: boolean): FormGroup<ICommodityLadingDetailSubGroup> {
    return new FormGroup<ICommodityLadingDetailSubGroup>({
      pieces: new FormControl({ value: undefined, disabled }, { nonNullable: true }),
      accountCode: new FormControl({ value: undefined, disabled }, { nonNullable: true }),
      amount: new FormControl({ value: undefined, disabled }, { nonNullable: true }),
      rate: new FormControl({ value: undefined, disabled }, { nonNullable: true }),
      description: new FormControl({ value: undefined, disabled }, { nonNullable: true })
    });
  }

  static getInBondForm(disabled: boolean): FormGroup<IInboundSubGroup> {
    return new FormGroup<IInboundSubGroup>({
      bondReference: new FormControl({ value: undefined, disabled }, { nonNullable: true }),
      customsShipmentValue: new FormControl({ value: undefined, disabled }, { nonNullable: true }),
      destinationLocationId: new FormControl({ value: undefined, disabled }, { nonNullable: true }),
      entryNumber: new FormControl({ value: undefined, disabled }, { nonNullable: true }),
      exportOfTermLocationId: new FormControl({ value: undefined, disabled }, { nonNullable: true }),
      inBondControlNumber: new FormControl({ value: undefined, disabled }, { nonNullable: true }),
      inBondType: new FormControl({ value: undefined, disabled }, { nonNullable: true }),
      irsScaccRR: new FormControl({ value: undefined, disabled }, { nonNullable: true }),
      usCustomsAndBorderProtectionBOL: new FormControl({ value: undefined, disabled }, { nonNullable: true })
    });
  }

  static getManifestForm(disabled: boolean): FormGroup<IManifestSubGroup> {
    return new FormGroup<IManifestSubGroup>({
      bookingNumber: new FormControl({ value: undefined, disabled }, { nonNullable: true }),
      country: new FormControl({ value: undefined, disabled }, { nonNullable: true }),
      currentCarrier: new FormControl({ value: undefined, disabled }, { nonNullable: true }),
      dockSailDate: new FormControl({ value: undefined, disabled }, { nonNullable: true }),
      manifestDate: new FormControl({ value: undefined, disabled }, { nonNullable: true }),
      portFunction: new FormControl({ value: undefined, disabled }, { nonNullable: true }),
      portName: new FormControl({ value: undefined, disabled }, { nonNullable: true }),
      previousCarrier: new FormControl({ value: undefined, disabled }, { nonNullable: true }),
      state: new FormControl({ value: undefined, disabled }, { nonNullable: true }),
      vessel: new FormControl({ value: undefined, disabled }, { nonNullable: true }),
      voyageNumber: new FormControl({ value: undefined, disabled }, { nonNullable: true })
    });
  }

  static getNewCaseNumberForm(disabled: boolean): FormGroup<ICaseNumberSubGroup> {
    return new FormGroup<ICaseNumberSubGroup>({
      caseNumber: new FormControl(
        { value: undefined, disabled },
        {
          nonNullable: true
        }
      )
    });
  }

  static getNewEquipmentForm(disabled: boolean, validators: OtcAsyncValidators): FormGroup<IPieceOfEquipmentSubGroup> {
    return new FormGroup<IPieceOfEquipmentSubGroup>({
      equipmentId: new FormGroup<IEquipmentSubGroup>(
        {
          initial: new FormControl({ value: undefined, disabled }, { validators: Validators.required, nonNullable: true }),
          number: new FormControl({ value: undefined, disabled }, { validators: Validators.required, nonNullable: true }),
          overwrite: new FormControl({ value: undefined, disabled }, { nonNullable: true })
        },
        {
          asyncValidators: validators.validEquipment()
        }
      ),
      sealNumber: new FormControl({ value: undefined, disabled }, { nonNullable: true }),
      grossWeight: new FormControl({ value: undefined, disabled }, { nonNullable: true }),
      netWeight: new FormControl({ value: undefined, disabled }, { nonNullable: true }),
      tareWeight: new FormControl({ value: undefined, disabled }, { nonNullable: true })
    });
  }

  static getIdlerEquipmentForm(disabled: boolean): FormGroup<IIdlerEquipmentSubGroup> {
    return new FormGroup<IIdlerEquipmentSubGroup>({
      idlerInitial: new FormControl(
        { value: undefined, disabled },
        {
          nonNullable: true,
          validators: Validators.required
        }
      ),
      idlerNumber: new FormControl(
        { value: undefined, disabled },
        {
          nonNullable: true,
          validators: Validators.required
        }
      )
    });
  }

  static getEmptyReverseForm(disabled: boolean): FormGroup<IEmptyReverseFG> {
    return new FormGroup<IEmptyReverseFG>({
      emptyReverseConsignee: new FormControl({ value: undefined, disabled }, { nonNullable: true }),
      destinationCity: new FormControl({ value: undefined, disabled }, { nonNullable: true }),
      emptyReverseRoad: new FormControl({ value: undefined, disabled }, { nonNullable: true }),
      emptyReverseSegments: new FormArray<FormGroup<ISegmentSubGroup>>([])
    });
  }

  static getDefaultHazardousForm(disabled: boolean): FormGroup<IHazardousFG> {
    return new FormGroup<IHazardousFG>({
      hazStccs: new FormArray<FormGroup<IHazardousStccSubGroup>>([
        OtcShipmentBillFormConstants.getHazardousStcc(disabled),
        OtcShipmentBillFormConstants.getHazardousStcc(disabled)
      ])
    });
  }

  static getRadioActiveWasteHazardousForm(disabled: boolean): FormGroup<IHazardousFG> {
    return new FormGroup<IHazardousFG>({
      hazWaste: OtcShipmentBillFormConstants.getHazardousWaste(disabled),
      hazRadioActive: OtcShipmentBillFormConstants.getHazardousRadioactive(disabled),
      hazContacts: new FormArray<FormGroup<IHazardousContactSubGroup>>([
        OtcShipmentBillFormConstants.getHazardousContact(disabled),
        OtcShipmentBillFormConstants.getHazardousContact(disabled)
      ])
    });
  }

  static getHazardousStcc(disabled: boolean): FormGroup<IHazardousStccSubGroup> {
    return new FormGroup<IHazardousStccSubGroup>({
      additionalHazmatEntities: new FormArray<FormGroup<IAdditionalHazmatEntitySubGroup>>([]),
      additionalHazmat: new FormControl({ value: undefined, disabled }, { nonNullable: true }),
      amount: new FormControl({ value: undefined, disabled }, { nonNullable: true }),
      amountQualifier: new FormControl({ value: undefined, disabled }, { nonNullable: true }),
      chemtrec: new FormControl({ value: undefined, disabled }, { nonNullable: true }),
      competentAuthorizationNumber: new FormControl({ value: undefined, disabled }, { nonNullable: true }),
      description: new FormControl({ value: undefined, disabled }, { nonNullable: true }),
      dotHazardousNumber: new FormControl({ value: undefined, disabled }, { nonNullable: true }),
      flashPointTemperature: new FormControl({ value: undefined, disabled }, { nonNullable: true }),
      flumigation: new FormControl({ value: undefined, disabled }, { nonNullable: true }),
      fumigationBeginDate: new FormControl({ value: undefined, disabled }, { nonNullable: true }),
      hazContacts: new FormArray<FormGroup<IHazardousContactSubGroup>>([]),
      hazardZone: new FormControl({ value: undefined, disabled }, { nonNullable: true }),
      hazardousClassPrimary: new FormControl({ value: undefined, disabled }, { nonNullable: true }),
      hazardousClassSecondaryOne: new FormControl({ value: undefined, disabled }, { nonNullable: true }),
      hazardousClassSecondaryThree: new FormControl({ value: undefined, disabled }, { nonNullable: true }),
      hazardousClassSecondaryTwo: new FormControl({ value: undefined, disabled }, { nonNullable: true }),
      hazardousExemptionNumber: new FormControl({ value: undefined, disabled }, { nonNullable: true }),
      hazmatOptions: new FormControl({ value: undefined, disabled }, { nonNullable: true }),
      marinePollutant: new FormControl({ value: undefined, disabled }, { nonNullable: true }),
      maximumSpeed: new FormControl({ value: undefined, disabled }, { nonNullable: true }),
      netExplosiveQualifier: new FormControl({ value: undefined, disabled }, { nonNullable: true }),
      netExplosiveQuality: new FormControl({ value: undefined, disabled }, { nonNullable: true }),
      packageQualifier: new FormControl({ value: undefined, disabled }, { nonNullable: true }),
      packagingGroup: new FormControl({ value: undefined, disabled }, { nonNullable: true }),
      pieces: new FormControl({ value: undefined, disabled }, { nonNullable: true }),
      properShipperName: new FormControl({ value: undefined, disabled }, { nonNullable: true }),
      reportableQuantity: new FormControl({ value: undefined, disabled }, { nonNullable: true }),
      shipperNameQualifier: new FormControl({ value: undefined, disabled }, { nonNullable: true }),
      specialApproval: new FormControl({ value: undefined, disabled }, { nonNullable: true }),
      stcc: new FormControl({ value: undefined, disabled }, { nonNullable: true }),
      technicalName: new FormControl({ value: undefined, disabled }, { nonNullable: true }),
      temperatureUnit: new FormControl({ value: undefined, disabled }, { nonNullable: true }),
      tradeName: new FormControl({ value: undefined, disabled }, { nonNullable: true }),
      unNA: new FormControl({ value: undefined, disabled }, { nonNullable: true })
    });
  }

  static getHazardousRadioactive(disabled: boolean): FormGroup<IHazardousRadioActiveSubGroup> {
    return new FormGroup<IHazardousRadioActiveSubGroup>({
      activityQuantity: new FormControl({ value: undefined, disabled }, { nonNullable: true }),
      activityUnit: new FormControl({ value: undefined, disabled }, { nonNullable: true }),
      chemicalForm: new FormControl({ value: undefined, disabled }, { nonNullable: true }),
      csi: new FormControl({ value: undefined, disabled }, { nonNullable: true }),
      exclusiveUse: new FormControl({ value: undefined, disabled }, { nonNullable: true }),
      exclusiveUseInstructions: new FormControl({ value: undefined, disabled }, { nonNullable: true }),
      fissile: new FormControl({ value: undefined, disabled }, { nonNullable: true }),
      label: new FormControl({ value: undefined, disabled }, { nonNullable: true }),
      physicalForm: new FormControl({ value: undefined, disabled }, { nonNullable: true }),
      radioActive: new FormControl({ value: undefined, disabled }, { nonNullable: true }),
      radioactiveMiscInfo: new FormControl({ value: undefined, disabled }, { nonNullable: true }),
      radionuclides: new FormControl({ value: undefined, disabled }, { nonNullable: true }),
      transportIndex: new FormControl({ value: undefined, disabled }, { nonNullable: true })
    });
  }

  static getHazardousWaste(disabled: boolean): FormGroup<IHazardousWasteSubGroup> {
    return new FormGroup<IHazardousWasteSubGroup>({
      epaWasteStreamOne: new FormControl({ value: undefined, disabled }, { nonNullable: true }),
      epaWasteStreamTwo: new FormControl({ value: undefined, disabled }, { nonNullable: true }),
      epaWasteStreamThree: new FormControl({ value: undefined, disabled }, { nonNullable: true }),
      manifestDocumentNumber: new FormControl({ value: undefined, disabled }, { nonNullable: true }),
      specialInstructions: new FormControl({ value: undefined, disabled }, { nonNullable: true })
    });
  }

  static getHazardousContact(disabled: boolean): FormGroup<IHazardousContactSubGroup> {
    return new FormGroup<IHazardousContactSubGroup>({
      areaCode: new FormControl({ value: undefined, disabled }, { nonNullable: true }),
      number: new FormControl({ value: undefined, disabled }, { nonNullable: true }),
      type: new FormControl({ value: undefined, disabled }, { nonNullable: true }),
      nameOrContract: new FormControl({ value: undefined, disabled }, { nonNullable: true })
    });
  }

  static getProtectiveServiceForm(disabled: boolean): FormGroup<IProtectiveServiceFG> {
    return new FormGroup<IProtectiveServiceFG>({
      preCooled: new FormControl({ value: undefined, disabled }, { nonNullable: true }),
      protectiveServiceCode: new FormControl({ value: undefined, disabled }, { nonNullable: true }),
      protectiveServiceRoad: new FormControl({ value: undefined, disabled }, { nonNullable: true }),
      protectiveServiceRule: new FormControl({ value: undefined, disabled }, { nonNullable: true }),
      station: new FormControl({ value: undefined, disabled }, { nonNullable: true }),
      temperature: new FormControl({ value: undefined, disabled }, { nonNullable: true }),
      temperatureUnit: new FormControl({ value: undefined, disabled }, { nonNullable: true })
    });
  }

  static getRatingForm(disabled: boolean): FormGroup<IRatingFG> {
    return new FormGroup<IRatingFG>({
      contractNumberOne: new FormControl({ value: undefined, disabled }, { nonNullable: true }),
      contractNumberTwo: new FormControl({ value: undefined, disabled }, { nonNullable: true }),
      formattedNumberOne: new FormControl({ value: undefined, disabled: true }, { nonNullable: true }),
      formattedNumberTwo: new FormControl({ value: undefined, disabled: true }, { nonNullable: true })
    });
  }

  static getVinForm(disabled: boolean): FormGroup<IVinFG> {
    return new FormGroup<IVinFG>({
      multipleVINS: new FormControl({ value: undefined, disabled }, { nonNullable: true }),
      vinNumbers: new FormArray<FormGroup<IVinDetailSubGroup>>([])
    });
  }

  static getCommodityForm(disabled: boolean, validators: OtcAsyncValidators): FormGroup<ICommodityFG> {
    return new FormGroup<ICommodityFG>({
      stcc: OtcShipmentBillFormConstants.getSTCCForm(disabled, validators),
      hazStcc: new FormControl({ value: undefined, disabled }, { nonNullable: true }),
      hazSTCCs: new FormArray<FormGroup<ISTCCHazSubGroup>>([])
    });
  }

  static getSTCCForm(disabled: boolean, validators: OtcAsyncValidators): FormGroup<ISTCCSubGroup> {
    return new FormGroup<ISTCCSubGroup>({
      description: new FormControl({ value: undefined, disabled: true }, { nonNullable: true }),
      packageQualifier: new FormControl({ value: undefined, disabled }, { nonNullable: true }),
      pieces: new FormControl({ value: undefined, disabled }, { nonNullable: true }),
      stcc: new FormControl({ value: undefined, disabled }, { nonNullable: true, asyncValidators: [validators.validStcc()] })
    });
  }

  static getAdditionalPartyForm(disabled: boolean): FormGroup<IAdditionalBillToPartySubGroup> {
    return new FormGroup<IAdditionalBillToPartySubGroup>({
      addressOne: new FormControl({ value: undefined, disabled }, { nonNullable: true }),
      addressTwo: new FormControl({ value: undefined, disabled }, { nonNullable: true }),
      city: new FormControl({ value: undefined, disabled }, { nonNullable: true }),
      contact: new FormControl({ value: undefined, disabled }, { nonNullable: true }),
      customerId: new FormControl({ value: undefined, disabled }, { nonNullable: true }),
      entityId: new FormControl({ value: undefined, disabled }, { nonNullable: true }),
      entityIdQualifier: new FormControl({ value: undefined, disabled }, { nonNullable: true }),
      name: new FormControl({ value: undefined, disabled }, { nonNullable: true }),
      phone: new FormControl({ value: undefined, disabled }, { nonNullable: true }),
      shipperName: new FormControl({ value: undefined, disabled }, { nonNullable: true }),
      state: new FormControl({ value: undefined, disabled }, { nonNullable: true }),
      zip: new FormControl({ value: undefined, disabled }, { nonNullable: true }),
      typeOfShipmentParty: new FormControl({ value: undefined, disabled }, { nonNullable: true })
    });
  }

  static getNewSegmentForm(disabled: boolean): FormGroup<ISegmentSubGroup> {
    return new FormGroup<ISegmentSubGroup>({
      junction: new FormControl({ value: undefined, disabled }, { nonNullable: true }),
      road: new FormControl({ value: undefined, disabled }, { nonNullable: true })
    });
  }

  static getNewVinForm(disabled: boolean): FormGroup<IVinDetailSubGroup> {
    return new FormGroup<IVinDetailSubGroup>({
      dealerCode: new FormControl({ value: undefined, disabled }, { nonNullable: true }),
      position: new FormControl({ value: undefined, disabled }, { nonNullable: true }),
      type: new FormControl({ value: undefined, disabled }, { nonNullable: true }),
      vin: new FormControl({ value: undefined, disabled }, { nonNullable: true })
    });
  }

  static getShipmentReferenceDetailForm(disabled: boolean): FormGroup<IShipmentReferenceDetailSubGroup> {
    return new FormGroup<IShipmentReferenceDetailSubGroup>({
      referenceFreeformDescription: new FormControl({ value: undefined, disabled }, { nonNullable: true }),
      referenceNumber: new FormControl({ value: undefined, disabled }, { nonNullable: true }),
      referenceQualifier: new FormControl({ value: undefined, disabled }, { nonNullable: true }),
      referenceDate: new FormControl({ value: undefined, disabled }, { nonNullable: true })
    });
  }
}
