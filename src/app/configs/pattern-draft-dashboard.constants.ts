import { ColDef } from 'ag-grid-community';

import { ActionColumnComponent } from '@otc/shared/components/columns/action-column/action-column.component';
import { IAction } from '@otc/shared/models/common.interface';

export class OtcPatternDraftDashboardConstants {
  static draftColumns: Array<ColDef> = [
    {
      field: 'id',
      headerName: 'Action',
      cellRenderer: ActionColumnComponent,
      minWidth: 100,
      cellRendererParams: { action: { edit: true, clone: false, delete: true, add: false, xml: false } as IAction }
    },
    { field: 'equipmentId', headerName: 'Equipment Id' },
    { field: 'shipper', headerName: 'Shipper' },
    { field: 'origin', headerName: 'Origin' },
    { field: 'consignee', headerName: 'Consignee' },
    { field: 'destination', headerName: 'Destination' },
    { field: 'le', headerName: 'L/E' },
    { field: 'stcc', headerName: 'STCC' },
    { field: 'lastUpdate', headerName: 'Last Update' }
  ];

  static patternColumns: Array<ColDef> = [
    { field: 'id', headerName: 'Action', cellRenderer: ActionColumnComponent, minWidth: 220 },
    { field: 'id', headerName: 'Pattern ID' },
    { field: 'name', headerName: 'Pattern Name' },
    { field: 'email', headerName: 'Pattern Name' },
    { field: 'shipper', headerName: 'Shipper' },
    { field: 'origin', headerName: 'Origin' },
    { field: 'consignee', headerName: 'Consignee' },
    { field: 'destination', headerName: 'Destination' },
    { field: 'billType', headerName: 'Bill Type' },
    { field: 'stcc', headerName: 'STCC' }
  ];
}
