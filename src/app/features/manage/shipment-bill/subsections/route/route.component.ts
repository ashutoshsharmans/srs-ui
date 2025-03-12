import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, input, InputSignal, OnDestroy, OnInit, output, OutputEmitterRef } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle } from '@angular/material/expansion';
import { MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { Subject, Subscription } from 'rxjs';

import { OtcShipmentBillFormConstants } from '@otc/configs/shipment-bill-form.constants';
import { IBillSection, IRouteFG } from '@otc/features/manage/shipment-bill/models/shipment-bill.interface';
import { BadgeComponent } from '@otc/shared/components/badge/badge.component';
import { EBillSection, EBillSectionLabel, EBillType } from '@otc/shared/enums/bill.enums';
import { ELoadAction } from '@otc/shared/enums/load-action.enums';
import { EStatus } from '@otc/shared/enums/status.enums';
import { IPermission } from '@otc/shared/models/permission.interface';
import { IShipmentBillState } from '@otc/shared/models/state.interface';

@Component({
  selector: 'otc-route',
  standalone: true,
  imports: [
    BadgeComponent,
    FormsModule,
    MatButton,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    MatFormField,
    MatIcon,
    MatIconModule,
    MatIconButton,
    MatInputModule,
    MatLabel,
    MatSuffix,
    MatTableModule,
    ReactiveFormsModule
  ],
  templateUrl: './route.component.html',
  styleUrl: './route.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RouteComponent implements OnInit, OnDestroy {
  protected readonly sectionLabel: typeof EBillSectionLabel = EBillSectionLabel;
  form: InputSignal<FormGroup<IRouteFG>> = input.required<FormGroup<IRouteFG>>();
  billType: InputSignal<EBillType> = input.required<EBillType>();
  shipmentData: InputSignal<IShipmentBillState> = input.required<IShipmentBillState>();
  expand: InputSignal<Subject<boolean>> = input.required<Subject<boolean>>();
  viewOnly: InputSignal<boolean> = input<boolean>(false);
  permission: InputSignal<IPermission> = input.required<IPermission>();
  status: InputSignal<EStatus> = input.required<EStatus>();

  expanded: OutputEmitterRef<IBillSection> = output<IBillSection>();
  loadData: OutputEmitterRef<ELoadAction> = output<ELoadAction>();

  cdr: ChangeDetectorRef = inject(ChangeDetectorRef);

  expandPanel = true;
  expandSubscription!: Subscription;

  ngOnInit(): void {
    this.expandSubscription = this.expand().subscribe(value => this.expandCollapsePanel(value));
  }

  ngOnDestroy(): void {
    this.expandSubscription.unsubscribe();
  }

  expandCollapsePanel(value: boolean): void {
    this.expandPanel = value;
    this.cdr.detectChanges();
  }

  onExpandPanel($event: boolean): void {
    this.expanded.emit({ key: EBillSection.ROUTE, expanded: $event.valueOf() } as IBillSection);
  }

  toggleOriginFrom(): void {
    const remove = !!this.form().controls.originFromRoad;
    if (remove) {
      this.form().removeControl('originFromRoad');
      this.form().removeControl('originFromStation');
    } else {
      this.form().addControl('originFromRoad', new FormControl(undefined, { nonNullable: true }));
      this.form().addControl('originFromStation', new FormControl(undefined, { nonNullable: true }));
    }
  }

  toggleOriginSwitch(): void {
    const remove = !!this.form().controls.originSwitchRoad;
    if (remove) {
      this.form().removeControl('originSwitchRoad');
    } else {
      this.form().addControl('originSwitchRoad', new FormControl(undefined, { nonNullable: true }));
    }
  }

  toggleOriginJunctionSettlement(): void {
    const remove = !!this.form().controls.originSettlementJunction;
    if (remove) {
      this.form().removeControl('originSettlementJunction');
      this.form().removeControl('originSettlementRoad');
    } else {
      this.form().addControl('originSettlementJunction', new FormControl(undefined, { nonNullable: true }));
      this.form().addControl('originSettlementRoad', new FormControl(undefined, { nonNullable: true }));
    }
  }

  toggleDestinationBeyond(): void {
    const remove = !!this.form().controls.destinationBeyondLocation;
    if (remove) {
      this.form().removeControl('destinationBeyondLocation');
      this.form().removeControl('destinationBeyondRoad');
    } else {
      this.form().addControl('destinationBeyondLocation', new FormControl(undefined, { nonNullable: true }));
      this.form().addControl('destinationBeyondRoad', new FormControl(undefined, { nonNullable: true }));
    }
  }

  toggleDestinationSwitch(): void {
    const remove = !!this.form().controls.destinationSwitchJunction;
    if (remove) {
      this.form().removeControl('destinationSwitchJunction');
      this.form().removeControl('destinationSwitchRoad');
    } else {
      this.form().addControl('destinationSwitchJunction', new FormControl(undefined, { nonNullable: true }));
      this.form().addControl('destinationSwitchRoad', new FormControl(undefined, { nonNullable: true }));
    }
  }

  toggleDestinationJunctionSettlement(): void {
    const remove = !!this.form().controls.destinationJunctionSettlementJunction;
    if (remove) {
      this.form().removeControl('destinationJunctionSettlementJunction');
      this.form().removeControl('destinationJunctionSettlementRoad');
    } else {
      this.form().addControl('destinationJunctionSettlementJunction', new FormControl(undefined, { nonNullable: true }));
      this.form().addControl('destinationJunctionSettlementRoad', new FormControl(undefined, { nonNullable: true }));
    }
  }

  addSegment(): void {
    this.form().controls.segments.push(OtcShipmentBillFormConstants.getNewSegmentForm(this.viewOnly()));
  }

  removeSegment(index: number): void {
    this.form().controls.segments.removeAt(index);
  }
}
