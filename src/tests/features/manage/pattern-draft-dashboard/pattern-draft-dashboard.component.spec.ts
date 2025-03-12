import { AsyncPipe } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { MockComponent, MockPipe } from 'ng-mocks';

import { PatternDraftDashboardComponent } from '@otc/features/manage/pattern-draft-dashboard/pattern-draft-dashboard.component';
import { PatternDraftDashboardFacade } from '@otc/features/manage/pattern-draft-dashboard/store/facades/pattern-draft-dashboard.facade.service';
import { GridComponent } from '@otc/shared/components/grid/grid.component';
import { EBillType } from '@otc/shared/enums/bill.enums';

describe('Pattern Draft Dashboard Component', () => {
  let component: PatternDraftDashboardComponent;
  let fixture: ComponentFixture<PatternDraftDashboardComponent>;
  const patternDraftDashboardFacade = {
    get patternDraftDashboardState() {
      return {};
    },
    loadDrafts: jest.fn(),
    loadPatterns: jest.fn(),
    deleteDraft: jest.fn(),
    deletePattern: jest.fn()
  } as unknown as PatternDraftDashboardFacade;
  const router: { navigate: jest.Mock } = {
    navigate: jest.fn().mockResolvedValue(true)
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        PatternDraftDashboardComponent,
        MockPipe(AsyncPipe),
        MockComponent(GridComponent)
      ],
      providers: [
        { provide: PatternDraftDashboardFacade, useValue: patternDraftDashboardFacade },
        { provide: Router, useValue: router }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PatternDraftDashboardComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load draft on the component setup if the type is DRAFTS', () => {
    component.type = EBillType.DRAFTS;
    jest.spyOn(patternDraftDashboardFacade, 'loadDrafts');
    fixture.detectChanges();
    expect(patternDraftDashboardFacade.loadDrafts).toHaveBeenCalled();
  });

  it('should load pattern on the component setup if the type is PATTERNS', () => {
    component.type = EBillType.PATTERNS;
    jest.spyOn(patternDraftDashboardFacade, 'loadPatterns');
    fixture.detectChanges();
    expect(patternDraftDashboardFacade.loadPatterns).toHaveBeenCalled();
  });

  it('should redirect to shipment-request component with the params when clone is invoked', () => {
    const webOwner = '12345';
    jest.spyOn(router, 'navigate');
    component.onCloneCellClick(webOwner);
    expect(router.navigate).toHaveBeenCalledWith(['/home/manage/shipment-request'], { queryParams: { webOwner } });
  });

  it('should call delete Draft when onDeleteCellClick is invoked with the type as DRAFTS', () => {
    const id = '12345';
    component.type = EBillType.DRAFTS;
    jest.spyOn(patternDraftDashboardFacade, 'deleteDraft');
    component.onDeleteCellClick(id);
    expect(patternDraftDashboardFacade.deleteDraft).toHaveBeenCalledWith(id);
  });

  it('should call delete Pattern when onDeleteCellClick is invoked with the type as Pattern', () => {
    const id = '12345';
    component.type = EBillType.PATTERNS;
    jest.spyOn(patternDraftDashboardFacade, 'deletePattern');
    component.onDeleteCellClick(id);
    expect(patternDraftDashboardFacade.deletePattern).toHaveBeenCalledWith(id);
  });

  it('should redirect to shipment-request with DRAFT params when add is invoked', () => {
    component.type = EBillType.DRAFTS;
    const queryParams = { queryParams: { type: 'bol-with-draft', webOwner: '00001' } };
    jest.spyOn(router, 'navigate');
    component.onAddCellClick();
    expect(router.navigate).toHaveBeenCalledWith(['/home/manage/shipment-request'], queryParams);
  });

  it('should redirect to shipment-request with PATTERN params when add is invoked', () => {
    component.type = EBillType.PATTERNS;
    const queryParams = { queryParams: { type: 'bol-with-pattern', webOwner: '00001' } };
    jest.spyOn(router, 'navigate');
    component.onAddCellClick();
    expect(router.navigate).toHaveBeenCalledWith(['/home/manage/shipment-request'], queryParams);
  });

  it('should redirect to the params to shipment-request when edit is invoked', () => {
    component.type = EBillType.PATTERNS;
    const webOwner = '12345';
    const queryParams = { queryParams: { type: 'bol-with-pattern', webOwner } };
    jest.spyOn(router, 'navigate');
    component.onEditCellClick(webOwner);
    expect(router.navigate).toHaveBeenCalledWith(['/home/manage/shipment-request'], queryParams);
  });
});
