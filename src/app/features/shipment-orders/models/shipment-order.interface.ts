import { FormControl, FormGroup } from '@angular/forms';

export interface IShipmentOrder {
  billToParty: string;
  commodityGroup: string;
  consignee: string;
  dateSubmitted: string;
  destinationCityState: string;
  equipmentId: string;
  orderOption: string;
  orderType: string;
  originCityState: string;
  serialNumber: string;
  shipper: string;
  status: string;
  stcc: string;
  waybillDate: Date;
}

export interface IShipmentSearch {
  billToParty: string;
  consignee: string;
  date: {
    fromDate: Date;
    toDate: Date;
  };
  destinationCityState: string;
  equipmentId: string;
  orderType: string;
  originCityState: string;
  shipper: string;
  stcc: string;
  waybillSerial: string;
}

export interface IShipmentOrderGroup {
  billToParty: FormControl;
  consignee: FormControl;
  date: FormGroup<IShipmentOrderDateGroup>;
  destinationCityState: FormControl;
  equipmentId: FormControl;
  orderType: FormControl;
  originCityState: FormControl;
  shipper: FormControl;
  stcc: FormControl;
  waybillSerial: FormControl;
}

export interface IShipmentOrderDateGroup {
  fromDate: FormControl;
  toDate: FormControl;
}
