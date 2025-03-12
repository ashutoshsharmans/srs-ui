import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

import { IOtcCellRendererParams } from '@otc/shared/models/grid.interface';

@Component({
  selector: 'otc-link-column-renderer',
  standalone: true,
  imports: [
    MatButton
  ],
  templateUrl: './link-column.component.html',
  styleUrl: './link-column.component.scss'
})
export class LinkColumnComponent implements ICellRendererAngularComp {
  value?: string;
  params!: IOtcCellRendererParams;

  agInit(params: ICellRendererParams): void {
    this.refresh(params);
  }

  refresh(params: ICellRendererParams): boolean {
    this.value = params.value;
    this.params = params;
    return true;
  }

  click(): void {
    const context = this.params.context;
    if (context?.onLinkCellClick) {
      this.params.context?.onLinkCellClick(this.value);
    }
  }
}
