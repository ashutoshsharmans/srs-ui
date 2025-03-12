import { ICellRendererParams } from 'ag-grid-community';

import { IAction } from '@otc/shared/models/common.interface';

export interface IOtcCellRendererParams extends ICellRendererParams {
  action?: IAction;
}
