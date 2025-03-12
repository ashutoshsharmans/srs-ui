import { AsyncPipe } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockPipe } from 'ng-mocks';

import { IShipmentOrderGroup } from '@otc/features/shipment-orders/models/shipment-order.interface';
import { SearchAndFindComponent } from '@otc/features/shipment-orders/search-and-find/search-and-find.component';
import { ShipmentOrdersFacade } from '@otc/features/shipment-orders/store/facades/shipment-orders.facade';

describe('SearchAndFindComponent', () => {
  let component: SearchAndFindComponent;
  let fixture: ComponentFixture<SearchAndFindComponent>;
  const mockShipmentOrdersFacade = {
    get shipmentOrdersState() {
      return {};
    },
    loadShipmentOrders: jest.fn(),
    resetStore: jest.fn()
  } as unknown as ShipmentOrdersFacade;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SearchAndFindComponent,
        MockPipe(AsyncPipe)
      ],
      providers: [
        { provide: ShipmentOrdersFacade, useValue: mockShipmentOrdersFacade }]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchAndFindComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should load shipment order on search', () => {
    jest.spyOn(mockShipmentOrdersFacade, 'loadShipmentOrders');
    component.search();
    expect(mockShipmentOrdersFacade.loadShipmentOrders).toHaveBeenCalled();
  });

  it('should reset the form value when clear invoked', () => {
    jest.spyOn(component.searchForm, 'reset');
    component.clear();
    expect(component.searchForm.reset).toHaveBeenCalled();
  });

  it('should user toggles off advance search it should reset the searchForm and the advanceSearch value', () => {
    const controls: IShipmentOrderGroup = component.searchForm.controls;
    component.advancedSearch = true;
    jest.spyOn(controls.shipper, 'reset');
    jest.spyOn(controls.consignee, 'reset');
    jest.spyOn(controls.billToParty, 'reset');
    jest.spyOn(controls.originCityState, 'reset');
    jest.spyOn(controls.destinationCityState, 'reset');
    component.toggleAdvancedSearch();

    expect(component.advancedSearch).toEqual(false);
    expect(controls.shipper.reset).toHaveBeenCalled();
    expect(controls.consignee.reset).toHaveBeenCalled();
    expect(controls.billToParty.reset).toHaveBeenCalled();
    expect(controls.originCityState.reset).toHaveBeenCalled();
    expect(controls.destinationCityState.reset).toHaveBeenCalled();
  });
});
