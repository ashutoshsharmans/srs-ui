import { ColDef } from 'ag-grid-community';

export class OtcComparisonDashboard {
  static columns: Array<ColDef> = [
    { field: 'equipmentId', headerName: 'Equipment Id' },
    { field: 'serial', headerName: 'Serial' },
    { field: 'foundIn', headerName: 'Found In' },
    { field: 'match', headerName: 'Match' },
    { field: 'srsStatus', headerName: 'SRS Status' },
    { field: 'legacyStatus', headerName: 'Legacy Status' },
    { field: 'ruleVariances', headerName: 'Rule Variances' },
    { field: 'date', headerName: 'Date' }
  ];
}
