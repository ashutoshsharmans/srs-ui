import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, input, InputSignal, OnDestroy, OnInit, output, OutputEmitterRef } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Subject, Subscription } from 'rxjs';

import { OtcShipmentBillFormConstants } from '@otc/configs/shipment-bill-form.constants';
import { IBillSection, IShipmentPartiesFG } from '@otc/features/manage/shipment-bill/models/shipment-bill.interface';
import { BadgeComponent } from '@otc/shared/components/badge/badge.component';
import { EBillSection, EBillSectionLabel, EBillType } from '@otc/shared/enums/bill.enums';
import { ELoadAction } from '@otc/shared/enums/load-action.enums';
import { EStatus } from '@otc/shared/enums/status.enums';
import { IPermission } from '@otc/shared/models/permission.interface';
import { IShipmentBillState } from '@otc/shared/models/state.interface';

@Component({
  selector: 'otc-shipment-parties',
  standalone: true,
  imports: [
    BadgeComponent,
    FormsModule,
    MatButton,
    MatDatepickerModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIcon,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule
  ],
  templateUrl: './shipment-parties.component.html',
  styleUrl: './shipment-parties.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShipmentPartiesComponent implements OnInit, OnDestroy {
  protected readonly sectionLabel: typeof EBillSectionLabel = EBillSectionLabel;
  form: InputSignal<FormGroup<IShipmentPartiesFG>> = input.required<FormGroup<IShipmentPartiesFG>>();
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
    this.expanded.emit({ key: EBillSection.SHIPMENT_PARTIES, expanded: $event.valueOf() } as IBillSection);
  }

  addAdditionalParty(): void {
    this.form().controls.additionalParties.push(OtcShipmentBillFormConstants.getAdditionalPartyForm(this.viewOnly()));
  }

  removeAdditionalParty(index: number): void {
    this.form().controls.additionalParties.removeAt(index);
  }
}
