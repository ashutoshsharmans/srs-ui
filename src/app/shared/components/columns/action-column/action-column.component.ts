import { Component } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

import { IAction } from '@otc/shared/models/common.interface';
import { IOtcCellRendererParams } from '@otc/shared/models/grid.interface';

@Component({
  selector: 'otc-action-column',
  standalone: true,
  imports: [
    MatIconButton,
    MatIcon,
    MatTooltip
  ],
  templateUrl: './action-column.component.html',
  styleUrl: './action-column.component.scss'
})
export class ActionColumnComponent implements ICellRendererAngularComp {
  value?: string;
  params!: IOtcCellRendererParams;
  visibility: IAction = { add: true, clone: true, delete: true, edit: true, xml: false };

  agInit(params: ICellRendererParams): void {
    this.refresh(params);
    this.setup();
  }

  refresh(params: ICellRendererParams): boolean {
    this.value = params.value;
    this.params = params;
    return true;
  }

  setup(): void {
    if (this.params.action) {
      this.visibility = this.params.action;
    }
  }

  clone(): void {
    const context = this.params.context;
    if (context?.onCloneCellClick) {
      this.params.context?.onCloneCellClick(this.value);
    }
  }

  edit(): void {
    const context = this.params.context;
    if (context?.onEditCellClick) {
      this.params.context?.onEditCellClick(this.value);
    }
  }

  delete(): void {
    const context = this.params.context;
    if (context?.onDeleteCellClick) {
      this.params.context?.onDeleteCellClick(this.value);
    }
  }

  add(): void {
    const context = this.params.context;
    if (context?.onAddCellClick) {
      this.params.context?.onAddCellClick(this.value);
    }
  }
}
