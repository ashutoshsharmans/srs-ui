import { ChangeDetectorRef, ComponentRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormArray, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';

import { IHazardousFG } from '@otc/features/manage/shipment-bill/models/shipment-bill.interface';
import { HazardousComponent } from '@otc/features/manage/shipment-bill/subsections/hazardous/hazardous.component';
import { EBillSection, EBillType } from '@otc/shared/enums/bill.enums';
import { EStatus } from '@otc/shared/enums/status.enums';
import { IPermission } from '@otc/shared/models/permission.interface';
import { IShipmentBillState } from '@otc/shared/models/state.interface';

describe('Hazardous Component', () => {
  let component: HazardousComponent;
  let componentRef: ComponentRef<HazardousComponent>;
  let fixture: ComponentFixture<HazardousComponent>;

  const form: FormGroup<IHazardousFG> = new FormGroup({
    hazContacts: new FormArray([]),
    hazRadioActive: new FormGroup({}),
    hazStccs: new FormGroup({}),
    hazWaste: new FormGroup({})
  }) as unknown as FormGroup<IHazardousFG>;
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
        HazardousComponent
      ],
      providers: [
        { provide: ChangeDetectorRef, useValue: changeDetectionRef }]
    }).compileComponents();

    fixture = TestBed.createComponent(HazardousComponent);
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
      key: EBillSection.HAZARDOUS,
      expanded: true
    });
  });
});
