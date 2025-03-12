import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ChangeDetectorRef, Component, inject, input, InputSignal, OnDestroy, OnInit, output, OutputEmitterRef } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatBadge } from '@angular/material/badge';
import { MatIconButton } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltip } from '@angular/material/tooltip';
import { Subject, Subscription } from 'rxjs';

import { OtcShipmentBillFormConstants } from '@otc/configs/shipment-bill-form.constants';
import { IBillSection, IShipmentReferenceFG } from '@otc/features/manage/shipment-bill/models/shipment-bill.interface';
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
    MatAutocompleteModule,
    MatBadge,
    MatChipsModule,
    MatDatepickerModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatIcon,
    MatIconButton,
    MatInputModule,
    MatSelectModule,
    MatTooltip,
    ReactiveFormsModule
  ],
  providers: [provideNativeDateAdapter()],
  selector: 'otc-shipment-references',
  standalone: true,
  styleUrl: './shipment-references.component.scss',
  templateUrl: './shipment-references.component.html'
})
export class ShipmentReferencesComponent implements OnInit, OnDestroy {
  protected readonly sectionLabel: typeof EBillSectionLabel = EBillSectionLabel;
  form: InputSignal<FormGroup<IShipmentReferenceFG>> = input.required<FormGroup<IShipmentReferenceFG>>();
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
  selectedEndorsements: Array<string> = [];
  selectedAdditionalShipmentItems: Array<string> = [];
  readonly separatorKeysCodes: Array<number> = [ENTER, COMMA];

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
    this.expanded.emit({ key: EBillSection.SHIPMENT_REFERENCES, expanded: $event.valueOf() } as IBillSection);
  }

  removeEndorsement(endorsement: string): void {
    const index: number = this.selectedEndorsements.indexOf(endorsement);
    if (index >= 0) this.selectedEndorsements.splice(index, 1);
    this.form().controls.specialEndorsements.setValue(this.selectedEndorsements);
  }

  removeAdditionalShipmentItems(shipmentItem: string): void {
    const index: number = this.selectedAdditionalShipmentItems.indexOf(shipmentItem);
    if (index >= 0) this.selectedAdditionalShipmentItems.splice(index, 1);
    this.form().controls.additionalShipmentItems.setValue(this.selectedAdditionalShipmentItems);
  }

  updateSelectedEndorsements(event: MatAutocompleteSelectedEvent): void {
    if (!this.selectedEndorsements.includes(event.option.viewValue)) {
      this.selectedEndorsements = [...this.selectedEndorsements, event.option.viewValue];
    }
    this.form().controls.specialEndorsements.setValue(this.selectedEndorsements);
    event.option.deselect();
  }

  updateSelectedShipmentItems(event: MatAutocompleteSelectedEvent): void {
    if (!this.selectedAdditionalShipmentItems.includes(event.option.viewValue)) {
      this.selectedAdditionalShipmentItems = [...this.selectedAdditionalShipmentItems, event.option.viewValue];
    }
    this.form().controls.additionalShipmentItems.setValue(this.selectedAdditionalShipmentItems);
    event.option.deselect();
  }

  removeShipmentReference(index: number): void {
    this.form().controls.shipmentReferences.removeAt(index);
  }

  addShipmentReference(): void {
    this.form().controls.shipmentReferences.push(OtcShipmentBillFormConstants.getShipmentReferenceDetailForm(this.viewOnly()));
  }
}
