import { ChangeDetectorRef, ComponentRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadge } from '@angular/material/badge';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MockComponent, MockDirective, MockModule } from 'ng-mocks';
import { Subject } from 'rxjs';

import { IEmptyReverseFG } from '@otc/features/manage/shipment-bill/models/shipment-bill.interface';
import { EmptyReverseComponent } from '@otc/features/manage/shipment-bill/subsections/empty-reverse/empty-reverse.component';
import { BadgeComponent } from '@otc/shared/components/badge/badge.component';
import { EBillSection, EBillType } from '@otc/shared/enums/bill.enums';
import { EStatus } from '@otc/shared/enums/status.enums';
import { IPermission } from '@otc/shared/models/permission.interface';
import { IShipmentBillState } from '@otc/shared/models/state.interface';

describe('Empty Reverse Component', () => {
  let component: EmptyReverseComponent;
  let componentRef: ComponentRef<EmptyReverseComponent>;
  let fixture: ComponentFixture<EmptyReverseComponent>;

  const form: FormGroup<IEmptyReverseFG> = new FormGroup({
    destinationCity: new FormControl(),
    destinationSwitch: new FormControl(),
    emptyReverseConsignee: new FormControl(),
    emptyReverseRoad: new FormControl(),
    emptyReverseSegments: new FormArray([])
  }) as unknown as FormGroup<IEmptyReverseFG>;
  const billType: EBillType = EBillType.BOL;
  const shipmentData: IShipmentBillState = {} as IShipmentBillState;
  const expand: Subject<boolean> = new Subject<boolean>();
  const viewOnly = false;
  const status: EStatus = EStatus.PROCESSED;
  const permission: IPermission = {} as IPermission;
  const changeDetectionRef = { detectChanges: jest.fn() } as unknown as ChangeDetectorRef;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        EmptyReverseComponent,
        MockModule(MatExpansionModule),
        MockModule(MatSelectModule),
        MockComponent(MatIcon),
        MockModule(MatFormFieldModule),
        MockModule(MatInputModule),
        MockModule(MatDatepickerModule),
        MockModule(MatAutocompleteModule),
        MockModule(FormsModule),
        MockModule(ReactiveFormsModule),
        MockComponent(BadgeComponent),
        MockDirective(MatBadge),
        MockComponent(MatProgressSpinner)
      ],
      providers: [
        { provide: ChangeDetectorRef, useValue: changeDetectionRef }]
    }).compileComponents();

    fixture = TestBed.createComponent(EmptyReverseComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('form', form);
    componentRef.setInput('billType', billType);
    componentRef.setInput('shipmentData', shipmentData);
    componentRef.setInput('expand', expand);
    componentRef.setInput('viewOnly', viewOnly);
    componentRef.setInput('permission', permission);
    componentRef.setInput('status', status);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should expand panel on expandCollapsePanel Invoked', () => {
    component.expandPanel = false;
    jest.spyOn(changeDetectionRef, 'detectChanges');
    component.expandCollapsePanel(true);
    expect(component.expandPanel).toEqual(true);
  });

  it('should emit expand value to when panel is expanded', () => {
    jest.spyOn(component.expanded, 'emit');
    component.onExpandPanel(true);
    expect(component.expanded.emit).toHaveBeenCalledWith({
      key: EBillSection.EMPTY_REVERSE,
      expanded: true
    });
  });

  it('should add segment when addSegment Invoked', () => {
    const totalEmptyReverseSegments = form.controls.emptyReverseSegments.length;
    component.addSegment();
    expect(form.controls.emptyReverseSegments.length).toEqual(totalEmptyReverseSegments + 1);
  });

  it('should remove additional party when removeAdditionalParty Invoked', () => {
    const totalEmptyReverseSegments = form.controls.emptyReverseSegments.length;
    component.addSegment();
    const totalAfterAddingAdditionalParties = form.controls.emptyReverseSegments.length;
    component.removeSegment(0);
    expect(totalAfterAddingAdditionalParties).toBeGreaterThan(form.controls.emptyReverseSegments.length);
    expect(form.controls.emptyReverseSegments.length).toEqual(totalEmptyReverseSegments);
  });

  it('should toggle Destination Switch when toggleDestinationSwitch Invoked', () => {
    form.controls.destinationSwitch = undefined;
    component.toggleDestinationSwitch();
    expect(form.controls.destinationSwitch).toBeDefined();
    component.toggleDestinationSwitch();
    expect(form.controls.destinationSwitch).toBeUndefined();
  });
});
