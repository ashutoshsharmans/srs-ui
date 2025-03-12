import { ChangeDetectorRef, ComponentRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MockModule } from 'ng-mocks';
import { Subject } from 'rxjs';

import { IProtectiveServiceFG } from '@otc/features/manage/shipment-bill/models/shipment-bill.interface';
import { ProtectiveServiceComponent } from '@otc/features/manage/shipment-bill/subsections/protective-service/protective-service.component';
import { EBillSection, EBillType } from '@otc/shared/enums/bill.enums';
import { EStatus } from '@otc/shared/enums/status.enums';
import { IPermission } from '@otc/shared/models/permission.interface';
import { IShipmentBillState } from '@otc/shared/models/state.interface';

describe('Protective Service Component', () => {
  let component: ProtectiveServiceComponent;
  let componentRef: ComponentRef<ProtectiveServiceComponent>;
  let fixture: ComponentFixture<ProtectiveServiceComponent>;

  const form: FormGroup<IProtectiveServiceFG> = new FormGroup({
    preCooled: new FormControl(),
    protectiveServiceCode: new FormControl(),
    protectiveServiceRoad: new FormControl(),
    protectiveServiceRule: new FormControl(),
    station: new FormControl(),
    temperature: new FormControl(),
    temperatureUnit: new FormControl()
  }) as unknown as FormGroup<IProtectiveServiceFG>;
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
        ProtectiveServiceComponent,
        MockModule(BrowserAnimationsModule)
      ],
      providers: [
        { provide: ChangeDetectorRef, useValue: changeDetectionRef }]
    }).compileComponents();

    fixture = TestBed.createComponent(ProtectiveServiceComponent);
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
      key: EBillSection.PROTECTIVE_SERVICE,
      expanded: true
    });
  });
});
