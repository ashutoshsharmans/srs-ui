import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockComponent } from 'ng-mocks';

import { DashboardComponent } from '@otc/features/dashboard/dashboard.component';
import { DashboardFacade } from '@otc/features/dashboard/store/facades/dashboard.facade';
import { GridComponent } from '@otc/shared/components/grid/grid.component';

describe('Dashboard Component', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  const mockDashboardFacade = {
    loadDashboard: jest.fn()
  } as unknown as DashboardFacade;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        DashboardComponent,
        MockComponent(GridComponent)
      ],
      providers: [
        { provide: DashboardFacade, useValue: mockDashboardFacade }]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load store on component setup', () => {
    jest.spyOn(mockDashboardFacade, 'loadDashboard');
    fixture.detectChanges();
    expect(mockDashboardFacade.loadDashboard).toHaveBeenCalled();
  });
});
