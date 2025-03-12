import { ColDef } from 'ag-grid-community';

import { OtcStatusConstants } from '@otc/configs/status.constants';

export class OtcShipmentOrderManagementConstants {
  static columns: Array<ColDef> = [
    { field: 'serial', headerName: 'Shipment / Waybill Serial' },
    { field: 'equipmentId', headerName: 'Equipment Id' },
    { field: 'status', headerName: 'Status', cellClass: OtcStatusConstants.getStatusBadgeClass },
    { field: 'errorDependencies', headerName: 'Errors / Dependencies' },
    { field: 'priority', headerName: 'Priority' },
    { field: 'orderType', headerName: 'Order Type' },
    { field: 'originCityState', headerName: 'Origin City, State' },
    { field: 'destinationCityState', headerName: 'Destination City, State' },
    { field: 'shipper', headerName: 'Shipper' },
    { field: 'stcc', headerName: 'STCC' },
    { field: 'commodityGroup', headerName: 'Commodity Group' },
    { field: 'queueAage', headerName: 'Queue Age' },
    { field: 'waybillDate', headerName: 'Waybill Date' }
  ];
}
