import { ChangeDetectorRef, ComponentRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MockModule } from 'ng-mocks';
import { Subject } from 'rxjs';

import { IShipmentReferenceFG } from '@otc/features/manage/shipment-bill/models/shipment-bill.interface';
import { ShipmentReferencesComponent } from '@otc/features/manage/shipment-bill/subsections/shipment-references/shipment-references.component';
import { EBillSection, EBillType } from '@otc/shared/enums/bill.enums';
import { EStatus } from '@otc/shared/enums/status.enums';
import { IPermission } from '@otc/shared/models/permission.interface';
import { IShipmentBillState } from '@otc/shared/models/state.interface';

describe('Shipment References Component', () => {
  let component: ShipmentReferencesComponent;
  let componentRef: ComponentRef<ShipmentReferencesComponent>;
  let fixture: ComponentFixture<ShipmentReferencesComponent>;

  const form: FormGroup<IShipmentReferenceFG> = new FormGroup({
    additionalShipmentItems: new FormControl(),
    brimCustomerName: new FormControl(),
    brimVesselDestination: new FormControl(),
    mineNumber: new FormControl(),
    permitNumber: new FormControl(),
    shipmentReferences: new FormArray([]),
    specialEndorsements: new FormControl()
  }) as unknown as FormGroup<IShipmentReferenceFG>;
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
        ShipmentReferencesComponent,
        MockModule(BrowserAnimationsModule)
      ],
      providers: [
        { provide: ChangeDetectorRef, useValue: changeDetectionRef }]
    }).compileComponents();

    fixture = TestBed.createComponent(ShipmentReferencesComponent);
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
      key: EBillSection.SHIPMENT_REFERENCES,
      expanded: true
    });
  });

  it('should add Shipment Reference when addShipmentReference Invoked', () => {
    const totalShipmentReferences = form.controls.shipmentReferences.length;
    component.addShipmentReference();
    expect(form.controls.shipmentReferences.length).toEqual(totalShipmentReferences + 1);
  });

  it('should remove Shipment Reference when removeShipmentReference Invoked', () => {
    const totalShipmentReferences = form.controls.shipmentReferences.length;
    component.addShipmentReference();
    const totalAfterShipmentReferences = form.controls.shipmentReferences.length;
    component.removeShipmentReference(0);
    expect(totalAfterShipmentReferences).toBeGreaterThan(form.controls.shipmentReferences.length);
    expect(form.controls.shipmentReferences.length).toEqual(totalShipmentReferences);
  });

  it('should update selected shipment Items when updateSelectedShipment with new input is provided', () => {
    const selectionEvent = { option: { viewValue: 'a', deselect: jest.fn() } } as unknown as MatAutocompleteSelectedEvent;
    jest.spyOn(component.form().controls.additionalShipmentItems, 'setValue');
    component.updateSelectedShipmentItems(selectionEvent);
    expect(component.form().controls.additionalShipmentItems.setValue).toHaveBeenCalledWith(['a']);
  });

  it('should remove Shipment Reference when removeShipmentReference Invoked', () => {
    component.selectedAdditionalShipmentItems = ['a'];
    component.removeAdditionalShipmentItems('a');
    expect(component.selectedAdditionalShipmentItems.length).toEqual(0);
  });

  it('should remove Endorsement when removeEndorsement Invoked', () => {
    component.selectedEndorsements = ['a'];
    component.removeEndorsement('a');
    expect(component.selectedEndorsements.length).toEqual(0);
  });

  it('should update selected endorsements Items when updateSelectedEndorsements with new input is provided', () => {
    const selectionEvent = { option: { viewValue: 'a', deselect: jest.fn() } } as unknown as MatAutocompleteSelectedEvent;
    jest.spyOn(component.form().controls.specialEndorsements, 'setValue');
    component.updateSelectedEndorsements(selectionEvent);
    expect(component.form().controls.specialEndorsements.setValue).toHaveBeenCalledWith(['a']);
  });
});
