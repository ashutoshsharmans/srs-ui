import { AsyncPipe } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MockModule, MockPipe } from 'ng-mocks';

import { SoManagementComponent } from '@otc/features/shipment-orders/so-management/so-management.component';
import { ShipmentOrdersFacade } from '@otc/features/shipment-orders/store/facades/shipment-orders.facade';

describe('SoManagementComponent', () => {
  let component: SoManagementComponent;
  let fixture: ComponentFixture<SoManagementComponent>;
  const shipmentOrdersFacade = {
    get shipmentOrdersState() {
      return {};
    },
    loadShipmentOrders: jest.fn()
  } as unknown as ShipmentOrdersFacade;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SoManagementComponent,
        MockModule(MatCardModule),
        MockPipe(AsyncPipe)
      ],
      providers: [
        { provide: ShipmentOrdersFacade, useValue: shipmentOrdersFacade }]
    }).compileComponents();

    fixture = TestBed.createComponent(SoManagementComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load shipment order on component initialization', () => {
    jest.spyOn(shipmentOrdersFacade, 'loadShipmentOrders');
    fixture.detectChanges();
    expect(shipmentOrdersFacade.loadShipmentOrders).toHaveBeenCalled();
  });
});
