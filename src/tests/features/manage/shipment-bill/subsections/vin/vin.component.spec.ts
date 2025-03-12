import { ChangeDetectorRef, ComponentRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MockModule } from 'ng-mocks';
import { Subject } from 'rxjs';

import { IVinFG } from '@otc/features/manage/shipment-bill/models/shipment-bill.interface';
import { VinComponent } from '@otc/features/manage/shipment-bill/subsections/vin/vin.component';
import { EBillSection, EBillType } from '@otc/shared/enums/bill.enums';
import { EStatus } from '@otc/shared/enums/status.enums';
import { IPermission } from '@otc/shared/models/permission.interface';
import { IShipmentBillState } from '@otc/shared/models/state.interface';

describe('Vin Component', () => {
  let component: VinComponent;
  let componentRef: ComponentRef<VinComponent>;
  let fixture: ComponentFixture<VinComponent>;

  const form: FormGroup<IVinFG> = new FormGroup({
    multipleVINS: new FormControl(),
    vinNumbers: new FormArray([])
  }) as unknown as FormGroup<IVinFG>;
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
        VinComponent,
        MockModule(BrowserAnimationsModule)
      ],
      providers: [
        { provide: ChangeDetectorRef, useValue: changeDetectionRef }]
    }).compileComponents();

    fixture = TestBed.createComponent(VinComponent);
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
      key: EBillSection.VIN,
      expanded: true
    });
  });

  it('should add vin when addVin invoked', () => {
    const totalVinNumbers = form.controls.vinNumbers.length;
    component.addVin();
    expect(form.controls.vinNumbers.length).toEqual(totalVinNumbers + 1);
  });
});
