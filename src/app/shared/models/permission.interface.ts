export interface IPermission extends ICategoryPermission, IOrderSetupPermission, IScreenPermission {
  cloneBill: boolean;
  createBill: boolean;
}

export interface IScreenPermission {
  adminTools: boolean;
  dashboard: boolean;
  manage: boolean;
  shipmentOrders: boolean;
}

export interface IOrderSetupPermission {
  caseNumber: boolean;
  orderOption: boolean;
  orderOptionEmptyNoneRevenue: boolean;
  orderOptionEmptyRevenue: boolean;
  orderOptionLoadedMerchandise: boolean;
  orderOptionMiscellaneousBill: boolean;
  orderOptionProperToAccrueMerchandise: boolean;
  orderOptionProperToAccrueRailHighway: boolean;
  orderOptionRailHighway: boolean;
  orderOptionRailManifest: boolean;
  orderOptionReship: boolean;
  orderOptionUnitTrain: boolean;
  searchBy: boolean;
}

export interface ICategoryPermission {
  commodity: boolean;
  commodityLading: boolean;
  customs: boolean;
  emptyReverse: boolean;
  general: boolean;
  hazardous: boolean;
  location: boolean;
  orderSetup: boolean;
  otmaLoadUp: boolean;
  protectiveService: boolean;
  rating: boolean;
  routes: boolean;
  shipmentParties: boolean;
  shipmentReferences: boolean;
  vin: boolean;
}
