import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, input, InputSignal, OnDestroy, OnInit, output, OutputEmitterRef } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadge } from '@angular/material/badge';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { Subject, Subscription } from 'rxjs';

import { OtcHazardousConstants } from '@otc/configs/hazardous.constants';
import { IBillSection, ICommodityFG, ISTCC, IUpdateSectionVisibility } from '@otc/features/manage/shipment-bill/models/shipment-bill.interface';
import { BadgeComponent } from '@otc/shared/components/badge/badge.component';
import { EBillSection, EBillSectionLabel, EBillType } from '@otc/shared/enums/bill.enums';
import { EHaz } from '@otc/shared/enums/haz.enums';
import { EStatus } from '@otc/shared/enums/status.enums';
import { ILoadAction } from '@otc/shared/models/load.interface';
import { IPermission } from '@otc/shared/models/permission.interface';
import { IShipmentBillState } from '@otc/shared/models/state.interface';

@Component({
  imports: [
    MatExpansionModule,
    MatSelectModule,
    MatIcon,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    BadgeComponent,
    MatBadge,
    MatProgressSpinner
  ],
  selector: 'otc-commodity',
  standalone: true,
  styleUrl: './commodity.component.scss',
  templateUrl: './commodity.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommodityComponent implements OnInit, OnDestroy {
  protected readonly sectionLabel: typeof EBillSectionLabel = EBillSectionLabel;
  form: InputSignal<FormGroup<ICommodityFG>> = input.required<FormGroup<ICommodityFG>>();
  billType: InputSignal<EBillType> = input.required<EBillType>();
  shipmentData: InputSignal<IShipmentBillState> = input.required<IShipmentBillState>();
  expand: InputSignal<Subject<boolean>> = input.required<Subject<boolean>>();
  viewOnly: InputSignal<boolean> = input<boolean>(false);
  permission: InputSignal<IPermission> = input.required<IPermission>();
  status: InputSignal<EStatus> = input.required<EStatus>();
  update: InputSignal<Subject<void>> = input.required<Subject<void>>();

  expanded: OutputEmitterRef<IBillSection> = output<IBillSection>();
  loadData: OutputEmitterRef<ILoadAction> = output<ILoadAction>();
  updateSectionsVisibility: OutputEmitterRef<Array<IUpdateSectionVisibility>> = output<Array<IUpdateSectionVisibility>>();

  cdr: ChangeDetectorRef = inject(ChangeDetectorRef);

  expandPanel = true;
  expandSubscription!: Subscription;
  updateSubscription!: Subscription;

  ngOnInit(): void {
    this.expandSubscription = this.expand().subscribe(value => this.expandCollapsePanel(value));
    this.updateSubscription = this.update().subscribe(() => this.updateAll());
  }

  ngOnDestroy(): void {
    this.expandSubscription.unsubscribe();
  }

  expandCollapsePanel(value: boolean): void {
    this.expandPanel = value;
    this.cdr.detectChanges();
  }

  onExpandPanel($event: boolean): void {
    this.expanded.emit({ key: EBillSection.COMMODITY, expanded: $event.valueOf() } as IBillSection);
  }

  updateAll(): void {
    this.updateDescriptionAndHazardousForm();
  }

  onStccChange(): void {
    if (!this.form().controls.stcc.controls.stcc.value) this.updateDescriptionAndHazardousForm();
  }

  updateDescriptionAndHazardousForm(): void {
    const value: ISTCC = this.form().controls.stcc.value;
    const hazStccControl: FormControl<EHaz | undefined> = this.form().controls.hazStcc;
    const descriptionControl: FormControl<string | undefined> = this.form().controls.stcc.controls.description;

    const description = this.getSTCCDescription(value.stcc);
    const hazardous = OtcHazardousConstants.isHazardous(value.stcc);
    const wasteHaz = OtcHazardousConstants.isWasteHaz(value.stcc);
    const newStatus = hazardous ? (wasteHaz ? EHaz.WASTE : EHaz.STCC) : undefined;
    const previousStatus = hazStccControl.value;
    if (description !== descriptionControl.value) descriptionControl.setValue(description);
    if (newStatus !== previousStatus) {
      hazStccControl.setValue(newStatus);
      this.updateSectionsVisibility.emit([{ section: EBillSection.HAZARDOUS, add: hazardous, additionalInfo: { radioActiveWaste: wasteHaz } }]);
    }
  }

  getSTCCDescription(value?: string): string | undefined {
    return this.shipmentData().stccs.find(detail => detail.stcc === value)?.description;
  }
}
