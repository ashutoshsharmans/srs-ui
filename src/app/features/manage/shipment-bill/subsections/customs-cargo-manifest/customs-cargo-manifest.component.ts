import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, input, InputSignal, OnDestroy, OnInit, output, OutputEmitterRef } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatBadge } from '@angular/material/badge';
import { MatButton } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Subject, Subscription } from 'rxjs';

import { OtcShipmentBillFormConstants } from '@otc/configs/shipment-bill-form.constants';
import { IBillSection, ICustomsCargoManifestFG } from '@otc/features/manage/shipment-bill/models/shipment-bill.interface';
import { BadgeComponent } from '@otc/shared/components/badge/badge.component';
import { EBillSection, EBillSectionLabel, EBillType } from '@otc/shared/enums/bill.enums';
import { EStatus } from '@otc/shared/enums/status.enums';
import { IPermission } from '@otc/shared/models/permission.interface';
import { IShipmentBillState } from '@otc/shared/models/state.interface';

@Component({
  imports: [
    BadgeComponent,
    FormsModule,
    MatBadge,
    MatDatepickerModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatIcon,
    MatButton
  ],
  providers: [provideNativeDateAdapter()],
  selector: 'otc-customs-cargo-manifest',
  standalone: true,
  styleUrl: './customs-cargo-manifest.component.scss',
  templateUrl: './customs-cargo-manifest.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomsCargoManifestComponent implements OnInit, OnDestroy {
  protected readonly sectionLabel: typeof EBillSectionLabel = EBillSectionLabel;
  form: InputSignal<FormGroup<ICustomsCargoManifestFG>> = input.required<FormGroup<ICustomsCargoManifestFG>>();
  billType: InputSignal<EBillType> = input.required<EBillType>();
  shipmentData: InputSignal<IShipmentBillState> = input.required<IShipmentBillState>();
  expand: InputSignal<Subject<boolean>> = input.required<Subject<boolean>>();
  viewOnly: InputSignal<boolean> = input<boolean>(false);
  permission: InputSignal<IPermission> = input.required<IPermission>();
  status: InputSignal<EStatus> = input.required<EStatus>();

  expanded: OutputEmitterRef<IBillSection> = output<IBillSection>();

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
    this.expanded.emit({ key: EBillSection.CUSTOMS, expanded: $event.valueOf() } as IBillSection);
  }

  toggleSecondManifestData(): void {
    if (this.form().controls.manifests.length > 1) {
      this.form().controls.manifests.removeAt(1);
    } else {
      this.form().controls.manifests.push(OtcShipmentBillFormConstants.getManifestForm(this.viewOnly()));
    }
  }

  toggleSecondInBondData(): void {
    if (this.form().controls.inBonds.length > 1) {
      this.form().controls.inBonds.removeAt(1);
    } else {
      this.form().controls.inBonds.push(OtcShipmentBillFormConstants.getInBondForm(this.viewOnly()));
    }
  }

  addCustomParty(): void {
    if (this.form().controls.customParties.length < 2) {
      this.form().controls.customParties.push(OtcShipmentBillFormConstants.getAdditionalPartyForm(this.viewOnly()));
    }
  }
}
