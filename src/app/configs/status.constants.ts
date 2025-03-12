import { CellClassParams } from 'ag-grid-community';

import { EStatus } from '@otc/shared/enums/status.enums';

export class OtcStatusConstants {
  static getStatusBadgeClass(params: CellClassParams): string | undefined {
    const value: string = params.value || '';
    let css;
    switch (value.toUpperCase()) {
      case EStatus.PROCESSED:
        css = 'bg-secondary text-white rounded text-center';
        break;
      case EStatus.ERROR:
        css = 'bg-danger text-white rounded text-center';
        break;
      case EStatus.DRAFT:
        css = 'bg-primary text-white rounded text-center';
        break;
      default:
        css = '';
        break;
    }
    return css;
  }
}
