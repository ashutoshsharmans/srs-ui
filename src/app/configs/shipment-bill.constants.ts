import { FormGroup } from '@angular/forms';

import { IAdditionalSectionInfo, IBillSection, IBillSectionStatus, IShipmentBillFG } from '@otc/features/manage/shipment-bill/models/shipment-bill.interface';
import { EBillSection, EBillSectionLabel, EBillType } from '@otc/shared/enums/bill.enums';
import { EStatus } from '@otc/shared/enums/status.enums';

export class OtcShipmentBillConstants {
  static getStatus(form?: FormGroup): EStatus {
    let status: EStatus;
    if (!form) {
      status = EStatus.INVALID;
    } else if (form.pending) {
      status = EStatus.PENDING;
    } else if (EStatus.VALID === form.status || EStatus.DISABLED === form.status) {
      status = EStatus.DONE;
    } else if (!form.dirty && !form.touched) {
      status = EStatus.REQUIRE;
    } else if (form.dirty) {
      status = EStatus.IN_PROGRESS;
    } else {
      status = EStatus.REQUIRE;
    }
    return status;
  }

  static setupBillSections(form: FormGroup<IShipmentBillFG>, expanded: boolean): Array<IBillSection> {
    const control: IShipmentBillFG = form.controls;
    const billSections: Array<IBillSection> = [];
    if (control.generalSetup) billSections.push(OtcShipmentBillConstants.billSectionValue(EBillSection.GENERAL, control.generalSetup, expanded));
    if (control.orderSetup) billSections.push(OtcShipmentBillConstants.billSectionValue(EBillSection.ORDER_SETUP, control.orderSetup, expanded));
    if (control.shipmentParties) billSections.push(OtcShipmentBillConstants.billSectionValue(EBillSection.SHIPMENT_PARTIES, control.shipmentParties, expanded));
    if (control.route) billSections.push(OtcShipmentBillConstants.billSectionValue(EBillSection.ROUTE, control.route, expanded));
    if (control.emptyReverse) billSections.push(OtcShipmentBillConstants.billSectionValue(EBillSection.EMPTY_REVERSE, control.emptyReverse, expanded));
    if (control.commodity) billSections.push(OtcShipmentBillConstants.billSectionValue(EBillSection.COMMODITY, control.commodity, expanded));
    if (control.commodityLading) billSections.push(OtcShipmentBillConstants.billSectionValue(EBillSection.COMMODITY_LADING, control.commodityLading, expanded));
    if (control.vin) billSections.push(OtcShipmentBillConstants.billSectionValue(EBillSection.VIN, control.vin, expanded));
    if (control.shipmentReferences) billSections.push(OtcShipmentBillConstants.billSectionValue(EBillSection.SHIPMENT_REFERENCES, control.shipmentReferences, expanded));
    if (control.rating) billSections.push(OtcShipmentBillConstants.billSectionValue(EBillSection.RATING, control.rating, expanded));
    if (control.customs) billSections.push(OtcShipmentBillConstants.billSectionValue(EBillSection.CUSTOMS, control.customs, expanded));
    if (control.protectiveService) billSections.push(OtcShipmentBillConstants.billSectionValue(EBillSection.PROTECTIVE_SERVICE, control.protectiveService, expanded));
    if (control.otmaLoadUp) billSections.push(OtcShipmentBillConstants.billSectionValue(EBillSection.PROTECTIVE_SERVICE, control.otmaLoadUp, expanded));
    return billSections;
  }

  static getShipmentType(billType?: string | Array<string>): EBillType {
    let type: EBillType = EBillType.INVALID;
    if ('string' === typeof billType) {
      if (billType === 'bol') {
        type = EBillType.BOL;
      } else if (billType === 'bol-with-draft') {
        type = EBillType.BOL_WITH_DRAFT;
      } else if (billType === 'bol-with-pattern') {
        type = EBillType.BOL_WITH_PATTERN;
      } else if (billType === 'misc') {
        type = EBillType.MISC;
      } else if (billType === 'misc-with-draft') {
        type = EBillType.MISC_WITH_DRAFT;
      } else if (billType === 'misc-with-pattern') {
        type = EBillType.MISC_WITH_PATTERN;
      } else if (billType === 'waybill') {
        type = EBillType.WAYBILL;
      } else if (billType === 'waybill-with-draft') {
        type = EBillType.WAYBILL_WITH_DRAFT;
      } else if (billType === 'waybill-with-pattern') {
        type = EBillType.WAYBILL_WITH_PATTERN;
      } else if (billType === 'submitted') {
        type = EBillType.SUBMITTED_SHIPMENT_REQUESTS;
      } else {
        type = EBillType.INVALID;
      }
    }
    return type;
  }

  static billSectionValue(section: EBillSection, form: FormGroup, expanded: boolean, additionalInfo?: IAdditionalSectionInfo): IBillSection {
    let sec: IBillSection;
    switch (section) {
      case EBillSection.PROTECTIVE_SERVICE:
        sec = { key: EBillSection.PROTECTIVE_SERVICE, status: OtcShipmentBillConstants.getStatus(form), label: EBillSectionLabel.PROTECTIVE_SERVICE, expanded };
        break;
      case EBillSection.OTMA_LOAD_UP:
        sec = { key: EBillSection.OTMA_LOAD_UP, status: OtcShipmentBillConstants.getStatus(form), label: EBillSectionLabel.OTMA_LOAD_UP, expanded };
        break;
      case EBillSection.CUSTOMS:
        sec = { key: EBillSection.CUSTOMS, status: OtcShipmentBillConstants.getStatus(form), label: EBillSectionLabel.CUSTOMS, expanded };
        break;
      case EBillSection.RATING:
        sec = { key: EBillSection.RATING, status: OtcShipmentBillConstants.getStatus(form), label: EBillSectionLabel.RATING, expanded };
        break;
      case EBillSection.SHIPMENT_REFERENCES:
        sec = { key: EBillSection.SHIPMENT_REFERENCES, status: OtcShipmentBillConstants.getStatus(form), label: EBillSectionLabel.SHIPMENT_REFERENCES, expanded };
        break;
      case EBillSection.VIN:
        sec = { key: EBillSection.VIN, status: OtcShipmentBillConstants.getStatus(form), label: EBillSectionLabel.VIN, expanded };
        break;
      case EBillSection.COMMODITY:
        sec = { key: EBillSection.COMMODITY, status: OtcShipmentBillConstants.getStatus(form), label: EBillSectionLabel.COMMODITY, expanded };
        break;
      case EBillSection.COMMODITY_LADING:
        sec = { key: EBillSection.COMMODITY_LADING, status: OtcShipmentBillConstants.getStatus(form), label: EBillSectionLabel.COMMODITY_LADING, expanded };
        break;
      case EBillSection.EMPTY_REVERSE:
        sec = { key: EBillSection.EMPTY_REVERSE, status: OtcShipmentBillConstants.getStatus(form), label: EBillSectionLabel.EMPTY_REVERSE, expanded };
        break;
      case EBillSection.ROUTE:
        sec = { key: EBillSection.ROUTE, status: OtcShipmentBillConstants.getStatus(form), label: EBillSectionLabel.ROUTE, expanded };
        break;
      case EBillSection.SHIPMENT_PARTIES:
        sec = { key: EBillSection.SHIPMENT_PARTIES, status: OtcShipmentBillConstants.getStatus(form), label: EBillSectionLabel.SHIPMENT_PARTIES, expanded };
        break;
      case EBillSection.ORDER_SETUP:
        sec = { key: EBillSection.ORDER_SETUP, status: OtcShipmentBillConstants.getStatus(form), label: EBillSectionLabel.ORDER_SETUP, expanded };
        break;
      case EBillSection.GENERAL:
        sec = { key: EBillSection.GENERAL, status: OtcShipmentBillConstants.getStatus(form), label: EBillSectionLabel.GENERAL, expanded: true };
        break;
      case EBillSection.HAZARDOUS:
        if (additionalInfo?.radioActiveWaste) {
          sec = {
            key: EBillSection.HAZARDOUS,
            status: OtcShipmentBillConstants.getStatus(form),
            label: EBillSectionLabel.HAZARDOUS,
            expanded,
            subSections: [
              { label: 'Hazardous Waste', status: EStatus.REQUIRE },
              { label: 'Hazardous RadioActive', status: EStatus.REQUIRE },
              { label: 'Hazardous Contacts', status: EStatus.REQUIRE }
            ]
          };
        } else {
          sec = {
            key: EBillSection.HAZARDOUS,
            status: OtcShipmentBillConstants.getStatus(form),
            label: EBillSectionLabel.HAZARDOUS,
            expanded,
            subSections: [
              { label: 'STCC 1', status: EStatus.REQUIRE },
              { label: 'STCC 2', status: EStatus.REQUIRE }
            ]
          };
        }
        break;
      default:
        sec = {} as IBillSection;
    }
    return sec;
  }

  static sectionStatus: IBillSectionStatus = {
    generalSetup: EStatus.REQUIRE,
    commodity: EStatus.REQUIRE,
    commodityLading: EStatus.REQUIRE,
    customs: EStatus.REQUIRE,
    emptyReverse: EStatus.REQUIRE,
    hazardous: EStatus.REQUIRE,
    orderSetup: EStatus.REQUIRE,
    protectiveService: EStatus.REQUIRE,
    rating: EStatus.REQUIRE,
    route: EStatus.REQUIRE,
    shipmentParties: EStatus.REQUIRE,
    shipmentReferences: EStatus.REQUIRE,
    vin: EStatus.REQUIRE,
    otmaLoadUp: EStatus.REQUIRE,
    location: EStatus.REQUIRE
  };

  static sectionOrder: Array<EBillSection> = [
    EBillSection.ORDER_SETUP,
    EBillSection.SHIPMENT_PARTIES,
    EBillSection.ROUTE,
    EBillSection.EMPTY_REVERSE,
    EBillSection.COMMODITY,
    EBillSection.HAZARDOUS,
    EBillSection.VIN,
    EBillSection.SHIPMENT_REFERENCES,
    EBillSection.RATING,
    EBillSection.CUSTOMS,
    EBillSection.PROTECTIVE_SERVICE,
    EBillSection.OTMA_LOAD_UP
  ];
}
