import { ColDef } from 'ag-grid-community';

import { ActionColumnComponent } from '@otc/shared/components/columns/action-column/action-column.component';
import { LinkColumnComponent } from '@otc/shared/components/columns/link-column/link-column.component';
import { IAction } from '@otc/shared/models/common.interface';

export class OtcAdminToolsConstants {
  static columns: Array<ColDef> = [
    {
      field: 'xmlId',
      headerName: '',
      cellRenderer: ActionColumnComponent,
      minWidth: 80,
      width: 80,
      cellRendererParams: { action: { edit: false, clone: false, delete: false, add: false, xml: true } as IAction }
    },
    { field: 'serialNumber', headerName: 'Shipment Serial', initialWidth: 300, cellRenderer: LinkColumnComponent, autoHeight: true },
    { field: 'submittedBy', headerName: 'Submitted By' },
    { field: 'submittedDate', headerName: 'Date', initialWidth: 300 },
    { field: 'orderOption', headerName: 'Order Options', initialWidth: 300 },
    { field: 'status', headerName: 'Status', initialWidth: 400 }
  ];
}
