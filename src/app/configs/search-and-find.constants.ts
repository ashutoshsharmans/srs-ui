import { ColDef } from 'ag-grid-community';

export class OtcSearchAndFineConstants {
  static columns: Array<ColDef> = [
    { field: 'serial', headerName: 'Shipment Serial' },
    { field: 'equipmentId', headerName: 'Equipment Id' },
    { field: 'orderType', headerName: 'Order Type' },
    { field: 'originCityState', headerName: 'Origin City, ST' },
    { field: 'destinationCityState', headerName: 'Destination City, ST' },
    { field: 'shipper', headerName: 'Shipper' },
    { field: 'consignee', headerName: 'Consignee' },
    { field: 'billToParty', headerName: 'Bill To Party' },
    { field: 'stcc', headerName: 'Stcc' },
    { field: 'commodityGroup', headerName: 'Commodity Group' },
    { field: 'waybillDate', headerName: 'Waybill Date' }
  ];
}
