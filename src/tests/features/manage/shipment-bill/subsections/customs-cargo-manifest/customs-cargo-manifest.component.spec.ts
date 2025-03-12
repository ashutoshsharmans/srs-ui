import { ChangeDetectorRef, ComponentRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormArray, FormGroup } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MockModule } from 'ng-mocks';
import { Subject } from 'rxjs';

import { OtcShipmentBillFormConstants } from '@otc/configs/shipment-bill-form.constants';
import { ICustomsCargoManifestFG, IInboundSubGroup, IManifestSubGroup } from '@otc/features/manage/shipment-bill/models/shipment-bill.interface';
import { CustomsCargoManifestComponent } from '@otc/features/manage/shipment-bill/subsections/customs-cargo-manifest/customs-cargo-manifest.component';
import { EBillSection, EBillType } from '@otc/shared/enums/bill.enums';
import { EStatus } from '@otc/shared/enums/status.enums';
import { IPermission } from '@otc/shared/models/permission.interface';
import { IShipmentBillState } from '@otc/shared/models/state.interface';

describe('Customs Cargo Manifest Component', () => {
  let component: CustomsCargoManifestComponent;
  let componentRef: ComponentRef<CustomsCargoManifestComponent>;
  let fixture: ComponentFixture<CustomsCargoManifestComponent>;

  const form: FormGroup<ICustomsCargoManifestFG> = new FormGroup({
    customParties: new FormArray([]),
    inBonds: new FormArray([]),
    manifests: new FormArray([]),
    shipmentParties: new FormArray([])
  }) as unknown as FormGroup<ICustomsCargoManifestFG>;
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
        CustomsCargoManifestComponent,
        MockModule(BrowserAnimationsModule)
      ],
      providers: [
        { provide: ChangeDetectorRef, useValue: changeDetectionRef }]
    }).compileComponents();

    fixture = TestBed.createComponent(CustomsCargoManifestComponent);
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
      key: EBillSection.CUSTOMS,
      expanded: true
    });
  });

  it('should add custom party when addCustomParty Invoked', () => {
    const totalCustomParties = form.controls.customParties.length;
    component.addCustomParty();
    expect(form.controls.customParties.length).toEqual(totalCustomParties + 1);
  });

  it('should toggle second manifest data when toggleSecondManifestData invoked', () => {
    form.controls.manifests = new FormArray<FormGroup<IManifestSubGroup>>([]);
    form.controls.manifests.push(OtcShipmentBillFormConstants.getManifestForm(false));
    form.controls.manifests.push(OtcShipmentBillFormConstants.getManifestForm(false));
    const totalManifests = form.controls.manifests.length;
    component.toggleSecondManifestData();
    expect(form.controls.manifests.length).toEqual(totalManifests - 1);
    component.toggleSecondManifestData();
    expect(form.controls.manifests.length).toEqual(totalManifests);
  });

  it('should toggle second in bond data data when toggleSecondInBondData invoked', () => {
    form.controls.inBonds = new FormArray<FormGroup<IInboundSubGroup>>([]);
    form.controls.inBonds.push(OtcShipmentBillFormConstants.getInBondForm(false));
    form.controls.inBonds.push(OtcShipmentBillFormConstants.getInBondForm(false));
    const totalInBonds = form.controls.manifests.length;
    component.toggleSecondInBondData();
    expect(form.controls.inBonds.length).toEqual(totalInBonds - 1);
    component.toggleSecondInBondData();
    expect(form.controls.inBonds.length).toEqual(totalInBonds);
  });
});
