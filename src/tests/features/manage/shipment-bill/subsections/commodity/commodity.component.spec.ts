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

import { ICommodityFG } from '@otc/features/manage/shipment-bill/models/shipment-bill.interface';
import { CommodityComponent } from '@otc/features/manage/shipment-bill/subsections/commodity/commodity.component';
import { BadgeComponent } from '@otc/shared/components/badge/badge.component';
import { EBillSection, EBillType } from '@otc/shared/enums/bill.enums';
import { EStatus } from '@otc/shared/enums/status.enums';
import { IPermission } from '@otc/shared/models/permission.interface';
import { IShipmentBillState } from '@otc/shared/models/state.interface';

describe('Commodity Component', () => {
  let component: CommodityComponent;
  let componentRef: ComponentRef<CommodityComponent>;
  let fixture: ComponentFixture<CommodityComponent>;

  const form: FormGroup<ICommodityFG> = new FormGroup({
    stcc: new FormGroup({
      stcc: new FormControl(),
      description: new FormControl()
    }),
    hazStcc: new FormControl(),
    hazSTCCs: new FormArray([])
  }) as unknown as FormGroup<ICommodityFG>;
  const billType: EBillType = EBillType.BOL;
  const shipmentData: IShipmentBillState = {} as IShipmentBillState;
  const expand: Subject<boolean> = new Subject<boolean>();
  const viewOnly = false;
  const status: EStatus = EStatus.PROCESSED;
  const permission: IPermission = {} as IPermission;
  const changeDetectionRef = { detectChanges: jest.fn() } as unknown as ChangeDetectorRef;
  const update = new Subject();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommodityComponent,
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

    fixture = TestBed.createComponent(CommodityComponent);
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
      key: EBillSection.COMMODITY,
      expanded: true
    });
  });
});
