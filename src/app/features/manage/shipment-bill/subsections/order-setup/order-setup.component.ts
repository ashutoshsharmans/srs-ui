import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, input, InputSignal, OnDestroy, OnInit, output, OutputEmitterRef } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatBadge } from '@angular/material/badge';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatCheckbox } from '@angular/material/checkbox';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { MatTooltip } from '@angular/material/tooltip';
import { Subject, Subscription } from 'rxjs';

import { OtcShipmentBillFormConstants } from '@otc/configs/shipment-bill-form.constants';
import { IBillSection, IOrderSetupFG, IPieceOfEquipmentSubGroup, IUpdateSectionVisibility } from '@otc/features/manage/shipment-bill/models/shipment-bill.interface';
import { BadgeComponent } from '@otc/shared/components/badge/badge.component';
import { EBillSection, EBillSectionLabel, EBillType } from '@otc/shared/enums/bill.enums';
import { EOrderOption } from '@otc/shared/enums/order-setup.enums';
import { EStatus } from '@otc/shared/enums/status.enums';
import { IPermission } from '@otc/shared/models/permission.interface';
import { IShipmentBillState } from '@otc/shared/models/state.interface';
import { OtcAsyncValidators } from '@otc/shared/validators/common-async.validators';

@Component({
  imports: [
    BadgeComponent,
    FormsModule,
    MatBadge,
    MatButton,
    MatCheckbox,
    MatDatepickerModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatTimepickerModule,
    MatIcon,
    MatIconModule,
    MatIconButton,
    MatInputModule,
    MatProgressSpinner,
    MatRadioButton,
    MatRadioGroup,
    MatSelectModule,
    MatTooltip,
    ReactiveFormsModule,
    NgClass
  ],
  providers: [provideNativeDateAdapter()],
  selector: 'otc-order-setup',
  standalone: true,
  styleUrl: './order-setup.component.scss',
  templateUrl: './order-setup.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderSetupComponent implements OnInit, OnDestroy {
  protected readonly sectionLabel: typeof EBillSectionLabel = EBillSectionLabel;
  protected readonly orderOption: typeof EOrderOption = EOrderOption;
  form: InputSignal<FormGroup<IOrderSetupFG>> = input.required<FormGroup<IOrderSetupFG>>();
  billType: InputSignal<EBillType> = input.required<EBillType>();
  shipmentData: InputSignal<IShipmentBillState> = input.required<IShipmentBillState>();
  expand: InputSignal<Subject<boolean>> = input.required<Subject<boolean>>();
  viewOnly: InputSignal<boolean> = input<boolean>(false);
  permission: InputSignal<IPermission> = input.required<IPermission>();
  status: InputSignal<EStatus> = input.required<EStatus>();
  update: InputSignal<Subject<void>> = input.required<Subject<void>>();

  validators: OtcAsyncValidators = inject(OtcAsyncValidators);
  cdr: ChangeDetectorRef = inject(ChangeDetectorRef);

  updateSectionsVisibility: OutputEmitterRef<Array<IUpdateSectionVisibility>> = output<Array<IUpdateSectionVisibility>>();
  expanded: OutputEmitterRef<IBillSection> = output<IBillSection>();

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
    this.expanded.emit({ key: EBillSection.ORDER_SETUP, expanded: $event.valueOf() } as IBillSection);
  }

  updateAll(): void {
    this.updateSectionVisibilityOnOrderSelect();
  }

  removeDuplicates(): void {
    const equipmentIds = new Set<string>();
    const indicesToRemove: Array<number> = [];
    this.form().controls.piecesOfEquipment.controls.forEach((group, index) => {
      const equipmentId = `${group.controls.equipmentId.controls.initial.value} ${group.controls.equipmentId.controls.number.value}`.toLowerCase();
      equipmentIds.has(equipmentId) ? indicesToRemove.push(index) : equipmentIds.add(equipmentId);
    });
    indicesToRemove.reverse().forEach((indicesToRemove: number) => this.form().controls.piecesOfEquipment.removeAt(indicesToRemove));
    this.updateTotalNetWeight();
  }

  updateTotalNetWeight(): void {
    const total = this.form().controls.piecesOfEquipment.controls.reduce((accumulator: number, poe: FormGroup<IPieceOfEquipmentSubGroup>) => accumulator + (poe.controls.netWeight?.value || 0), 0);
    this.form().controls.totalNetWeight.setValue(total);
  }

  updateSectionVisibilityOnOrderSelect(): void {
    const orderOption: EOrderOption | undefined = this.form().controls.orderOption.value;
    if (orderOption) {
      const sections: Array<IUpdateSectionVisibility> = [
        { section: EBillSection.EMPTY_REVERSE, add: [EOrderOption.RESHIP, EOrderOption.LOADED_MERCHANDISE, EOrderOption.RAIL_MANIFEST].includes(orderOption) },
        {
          section: EBillSection.CUSTOMS,
          add: [
            EOrderOption.RESHIP,
            EOrderOption.EMPTY_NON_REVENUE,
            EOrderOption.LOADED_MERCHANDISE,
            EOrderOption.UNIT_TRAIN,
            EOrderOption.EMPTY_REVENUE,
            EOrderOption.RAIL_HIGHWAY,
            EOrderOption.RAIL_MANIFEST
          ].includes(orderOption)
        },
        { section: EBillSection.VIN, add: [EOrderOption.RESHIP, EOrderOption.LOADED_MERCHANDISE, EOrderOption.UNIT_TRAIN, EOrderOption.PROPER_TO_ACCRUE_MERCHANDISE].includes(orderOption) },
        {
          section: EBillSection.PROTECTIVE_SERVICE,
          add: [EOrderOption.RESHIP, EOrderOption.EMPTY_NON_REVENUE, EOrderOption.LOADED_MERCHANDISE, EOrderOption.UNIT_TRAIN, EOrderOption.RAIL_HIGHWAY, EOrderOption.RAIL_MANIFEST].includes(
            orderOption
          )
        },
        { section: EBillSection.EMPTY_REVERSE, add: [EOrderOption.RESHIP, EOrderOption.EMPTY_NON_REVENUE, EOrderOption.LOADED_MERCHANDISE].includes(orderOption) },
        { section: EBillSection.OTMA_LOAD_UP, add: [EOrderOption.LOADED_MERCHANDISE].includes(orderOption) }
      ];
      this.updateSectionsVisibility.emit(sections);
    }
  }

  addEquipment(): void {
    if (this.form().controls.piecesOfEquipment.length < 10) {
      this.form().controls.piecesOfEquipment.push(OtcShipmentBillFormConstants.getNewEquipmentForm(this.viewOnly(), this.validators));
    }
  }

  addCaseNumber(): void {
    if (this.form().controls.caseNumbers.length < 2) {
      this.form().controls.caseNumbers.push(OtcShipmentBillFormConstants.getNewCaseNumberForm(this.viewOnly()));
    }
  }

  addIdlerEquipment(): void {
    if (this.form().controls.idlerEquipments.length < 2) {
      this.form().controls.idlerEquipments.push(OtcShipmentBillFormConstants.getIdlerEquipmentForm(this.viewOnly()));
    }
  }

  removeEquipment(index: number): void {
    this.form().controls.piecesOfEquipment.removeAt(index);
  }

  removeCaseNumber(index: number): void {
    this.form().controls.caseNumbers.removeAt(index);
  }

  removeIdlerEquipment(index: number): void {
    this.form().controls.idlerEquipments.removeAt(index);
  }

  resetPiecesOfEquipments(): void {
    this.form().controls.piecesOfEquipment.clear();
    this.form().controls.piecesOfEquipment.push(OtcShipmentBillFormConstants.getNewEquipmentForm(this.viewOnly(), this.validators));
  }

  updateEquipmentIdValidations(): void {
    this.form().controls.piecesOfEquipment.controls.forEach(poe => poe.controls.equipmentId.updateValueAndValidity());
  }
}
