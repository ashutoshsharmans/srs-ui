import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockComponent } from 'ng-mocks';

import { ComparisonDashboardComponent } from '@otc/features/admin-tools/comparison-dashboard/comparison-dashboard.component';
import { GridComponent } from '@otc/shared/components/grid/grid.component';

describe('ComparisonDashboardComponent', () => {
  let component: ComparisonDashboardComponent;
  let fixture: ComponentFixture<ComparisonDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ComparisonDashboardComponent,
        MockComponent(GridComponent)
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ComparisonDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
