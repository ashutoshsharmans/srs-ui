import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, Subscription } from 'rxjs';

import { ShipmentBillComponent } from '@otc/features/manage/shipment-bill/shipment-bill.component';
import { ShipmentBillFacade } from '@otc/features/manage/shipment-bill/store/facades/shipment-bill.facade';
import { OtcAsyncValidators } from '@otc/shared/validators/common-async.validators';

describe('ShipmentBillComponent', () => {
  let component: ShipmentBillComponent;
  let fixture: ComponentFixture<ShipmentBillComponent>;
  const shipmentBillWithUserInfo = of({
    user: {
      permission: {}
    },
    bill: {
      pattern: {},
      draft: {}
    },
    billType: '',
    webOwner: ''
  });
  const shipmentBillFacade = {
    get shipmentBillWithUserInfo() {
      return shipmentBillWithUserInfo;
    },
    getShipmentBillState: jest.fn().mockReturnValue({ validEquipments: {} }),
    loadShipmentRequestData: jest.fn(),
    loadPattern: jest.fn(),
    loadDraftBill: jest.fn(),
    resetDraft: jest.fn(),
    resetPattern: jest.fn()
  } as unknown as ShipmentBillFacade;
  const asyncValidators = {} as unknown as OtcAsyncValidators;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShipmentBillComponent],
      providers: [
        { provide: ShipmentBillFacade, useValue: shipmentBillFacade },
        { provide: OtcAsyncValidators, useValue: asyncValidators },
        { provide: ChangeDetectorRef, useValue: { detectChanges: jest.fn() } },
        { provide: MediaMatcher, useValue: { matchMedia: jest.fn().mockReturnValue({ addEventListener: () => {}, removeEventListener: () => {} }) } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ShipmentBillComponent);
    component = fixture.componentInstance;
    component.statusSubscription = { unsubscribe: jest.fn() } as unknown as Subscription;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
