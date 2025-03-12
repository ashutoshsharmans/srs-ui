import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { MockComponent } from 'ng-mocks';

import { AdminToolsFacade } from '@otc/features/admin-tools/store/facades/admin-tools.facade';
import { SubmittedBillComponent } from '@otc/features/admin-tools/submitted-bill/submitted-bill.component';
import { GridComponent } from '@otc/shared/components/grid/grid.component';
import { EBillType } from '@otc/shared/enums/bill.enums';

describe('Submitted Bills Component', () => {
  let component: SubmittedBillComponent;
  let fixture: ComponentFixture<SubmittedBillComponent>;
  let adminToolFacade: AdminToolsFacade;
  const mockRouter: { navigate: jest.Mock } = {
    navigate: jest.fn().mockResolvedValue(true)
  };

  beforeEach(async () => {
    adminToolFacade = {
      get adminToolsState() {
        return {
          adminTool: {},
          user: {}
        };
      },
      loadUpdatedWaybillMF: jest.fn(),
      loadSubmittedRequestToMF: jest.fn()
    } as unknown as AdminToolsFacade;

    await TestBed.configureTestingModule({
      imports: [
        SubmittedBillComponent,
        MockComponent(GridComponent)
      ],
      providers: [
        { provide: AdminToolsFacade, useValue: adminToolFacade },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SubmittedBillComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should load Updated WaybillMF if the type is UPDATED_SUBMITTED_SHIPMENT_REQUESTS', () => {
    component.type = EBillType.UPDATED_SUBMITTED_SHIPMENT_REQUESTS;
    jest.spyOn(adminToolFacade, 'loadUpdatedWaybillMF');
    component.setup();
    expect(adminToolFacade.loadUpdatedWaybillMF).toHaveBeenCalled();
  });

  it('should load Updated WaybillMF if the type is UPDATED_SUBMITTED_SHIPMENT_REQUESTS', () => {
    component.type = EBillType.SUBMITTED_SHIPMENT_REQUESTS;
    jest.spyOn(adminToolFacade, 'loadSubmittedRequestToMF');
    component.setup();
    expect(adminToolFacade.loadSubmittedRequestToMF).toHaveBeenCalled();
  });

  it('should  navigate to shipment request when clicked link', () => {
    jest.spyOn(mockRouter, 'navigate');
    component.onLinkCellClick();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/home/manage/shipment-request'], { queryParams: { type: 'submitted', webOwner: '00001' } });
  });
});
