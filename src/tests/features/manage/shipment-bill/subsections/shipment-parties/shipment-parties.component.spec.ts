import { ChangeDetectorRef, ComponentRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MockModule } from 'ng-mocks';
import { Subject } from 'rxjs';

import { IShipmentPartiesFG } from '@otc/features/manage/shipment-bill/models/shipment-bill.interface';
import { ShipmentPartiesComponent } from '@otc/features/manage/shipment-bill/subsections/shipment-parties/shipment-parties.component';
import { EBillSection, EBillType } from '@otc/shared/enums/bill.enums';
import { EStatus } from '@otc/shared/enums/status.enums';
import { IPermission } from '@otc/shared/models/permission.interface';
import { IShipmentBillState } from '@otc/shared/models/state.interface';

describe('Shipment Parties Component', () => {
  let component: ShipmentPartiesComponent;
  let componentRef: ComponentRef<ShipmentPartiesComponent>;
  let fixture: ComponentFixture<ShipmentPartiesComponent>;

  const form: FormGroup<IShipmentPartiesFG> = new FormGroup({
    additionalParties: new FormArray([]),
    billToPartyAddress: new FormControl(),
    consignee: new FormGroup({
      addressOne: new FormControl(),
      addressTwo: new FormControl(),
      city: new FormControl(),
      contact: new FormControl(),
      customerId: new FormControl(),
      entityId: new FormControl(),
      entityIdQualifier: new FormControl(),
      name: new FormControl(),
      phone: new FormControl(),
      shipperName: new FormControl(),
      state: new FormControl(),
      zip: new FormControl()
    }),
    shipper: new FormGroup({
      addressOne: new FormControl(),
      addressTwo: new FormControl(),
      city: new FormControl(),
      contact: new FormControl(),
      customerId: new FormControl(),
      entityId: new FormControl(),
      entityIdQualifier: new FormControl(),
      name: new FormControl(),
      phone: new FormControl(),
      shipperName: new FormControl(),
      state: new FormControl(),
      zip: new FormControl()
    })
  }) as unknown as FormGroup<IShipmentPartiesFG>;
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
        ShipmentPartiesComponent,
        MockModule(BrowserAnimationsModule)
      ],
      providers: [
        { provide: ChangeDetectorRef, useValue: changeDetectionRef }]
    }).compileComponents();

    fixture = TestBed.createComponent(ShipmentPartiesComponent);
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
      key: EBillSection.SHIPMENT_PARTIES,
      expanded: true
    });
  });

  it('should add Additional party when addAdditionalParty Invoked', () => {
    const totalAdditionalParties = form.controls.additionalParties.length;
    component.addAdditionalParty();
    expect(form.controls.additionalParties.length).toEqual(totalAdditionalParties + 1);
  });

  it('should remove additional party when removeAdditionalParty Invoked', () => {
    const totalAdditionalParties = form.controls.additionalParties.length;
    component.addAdditionalParty();
    const totalAfterAddingAdditionalParties = form.controls.additionalParties.length;
    component.removeAdditionalParty(0);
    expect(totalAfterAddingAdditionalParties).toBeGreaterThan(form.controls.additionalParties.length);
    expect(form.controls.additionalParties.length).toEqual(totalAdditionalParties);
  });
});
