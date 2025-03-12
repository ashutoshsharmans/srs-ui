import { ColDef } from 'ag-grid-community';

import { OtcStatusConstants } from '@otc/configs/status.constants';

export class OtcDashboardConstants {
  static draftColumns: Array<ColDef> = [
    { field: 'orderOption', headerName: 'Order Option' },
    { field: 'equipmentId', headerName: 'Equipment Id' },
    { field: 'status', headerName: 'Status', cellClass: OtcStatusConstants.getStatusBadgeClass },
    { field: 'dateSubmitted', headerName: 'Date' }
  ];

  static submittedColumns: Array<ColDef> = [
    { field: 'serialNumber', headerName: 'Shipment Serial' },
    { field: 'orderOption', headerName: 'Order Option' },
    { field: 'equipmentId', headerName: 'Equipment Id' },
    { field: 'status', headerName: 'Status', cellClass: OtcStatusConstants.getStatusBadgeClass },
    { field: 'dateSubmitted', headerName: 'Date' }
  ];
}
