import { ChangeDetectorRef, ComponentRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MockModule } from 'ng-mocks';
import { Subject } from 'rxjs';

import { IOrderSetupFG } from '@otc/features/manage/shipment-bill/models/shipment-bill.interface';
import { OrderSetupComponent } from '@otc/features/manage/shipment-bill/subsections/order-setup/order-setup.component';
import { EBillSection, EBillType } from '@otc/shared/enums/bill.enums';
import { EStatus } from '@otc/shared/enums/status.enums';
import { IPermission } from '@otc/shared/models/permission.interface';
import { IShipmentBillState } from '@otc/shared/models/state.interface';
import { OtcAsyncValidators } from '@otc/shared/validators/common-async.validators';

describe('Location Component', () => {
  let component: OrderSetupComponent;
  let componentRef: ComponentRef<OrderSetupComponent>;
  let fixture: ComponentFixture<OrderSetupComponent>;

  const asyncValidators = {} as unknown as OtcAsyncValidators;
  const form: FormGroup<IOrderSetupFG> = new FormGroup({
    caseNumbers: new FormArray([]),
    deliveryDate: new FormControl(),
    deliveryTime: new FormControl(),
    distributedTotalWeight: new FormControl(),
    distributedWeightType: new FormControl(),
    idlerEquipments: new FormArray([]),
    multipleEquipments: new FormControl(),
    orderOption: new FormControl(),
    overwriteAllPOEs: new FormControl(),
    piecesOfEquipment: new FormArray([]),
    sectionSeven: new FormControl(),
    shipmentType: new FormControl(),
    shipperBOLDate: new FormControl(),
    shipperBOLNumber: new FormControl(),
    shipperBOLTime: new FormControl(),
    totalNetWeight: new FormControl(),
    waybillDate: new FormControl(),
    waybillNumber: new FormControl(),
    weightAgreement: new FormControl(),
    weightQualifier: new FormControl()
  }) as unknown as FormGroup<IOrderSetupFG>;
  const billType: EBillType = EBillType.BOL;
  const shipmentData: IShipmentBillState = {} as IShipmentBillState;
  const expand: Subject<boolean> = new Subject<boolean>();
  const viewOnly = false;
  const status: EStatus = EStatus.PROCESSED;
  const permission: IPermission = {} as IPermission;
  const update = new Subject();
  const changeDetectionRef = { detectChanges: jest.fn() } as unknown as ChangeDetectorRef;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        OrderSetupComponent,
        MockModule(BrowserAnimationsModule)
      ],
      providers: [
        { provide: ChangeDetectorRef, useValue: changeDetectionRef },
        { provide: OtcAsyncValidators, useValue: asyncValidators }
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(OrderSetupComponent);

    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('form', form);
    componentRef.setInput('billType', billType);
    componentRef.setInput('shipmentData', shipmentData);
    componentRef.setInput('expand', expand);
    componentRef.setInput('viewOnly', viewOnly);
    componentRef.setInput('permission', permission);
    componentRef.setInput('status', status);
    componentRef.setInput('update', update);
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
      key: EBillSection.ORDER_SETUP,
      expanded: true
    });
  });
});
