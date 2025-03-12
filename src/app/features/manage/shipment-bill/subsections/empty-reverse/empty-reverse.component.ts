import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, input, InputSignal, OnDestroy, OnInit, output, OutputEmitterRef } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Subject, Subscription } from 'rxjs';

import { OtcShipmentBillFormConstants } from '@otc/configs/shipment-bill-form.constants';
import { IBillSection, IEmptyReverseFG } from '@otc/features/manage/shipment-bill/models/shipment-bill.interface';
import { BadgeComponent } from '@otc/shared/components/badge/badge.component';
import { EBillSection, EBillSectionLabel, EBillType } from '@otc/shared/enums/bill.enums';
import { ELoadAction } from '@otc/shared/enums/load-action.enums';
import { EStatus } from '@otc/shared/enums/status.enums';
import { IPermission } from '@otc/shared/models/permission.interface';
import { IShipmentBillState } from '@otc/shared/models/state.interface';

@Component({
  imports: [
    BadgeComponent,
    FormsModule,
    MatButton,
    MatDatepickerModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIcon,
    MatIconModule,
    MatIconButton,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule
  ],
  selector: 'otc-empty-reverse',
  standalone: true,
  styleUrl: './empty-reverse.component.scss',
  templateUrl: './empty-reverse.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmptyReverseComponent implements OnInit, OnDestroy {
  protected readonly sectionLabel: typeof EBillSectionLabel = EBillSectionLabel;
  form: InputSignal<FormGroup<IEmptyReverseFG>> = input.required<FormGroup<IEmptyReverseFG>>();
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
    this.expanded.emit({ key: EBillSection.EMPTY_REVERSE, expanded: $event.valueOf() } as IBillSection);
  }

  addSegment(): void {
    this.form().controls.emptyReverseSegments.push(OtcShipmentBillFormConstants.getNewSegmentForm(this.viewOnly()));
  }

  toggleDestinationSwitch(): void {
    if (!this.form().controls.destinationSwitch) {
      this.form().addControl('destinationSwitch', OtcShipmentBillFormConstants.getNewSegmentForm(this.viewOnly()));
    } else {
      this.form().removeControl('destinationSwitch');
    }
  }

  removeSegment(index: number): void {
    this.form().controls.emptyReverseSegments?.removeAt(index);
  }
}
