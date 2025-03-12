import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnauthorizedComponent } from '@otc/core/unauthorized/unauthorized.component';

describe('Unauthorized Component', () => {
  let component: UnauthorizedComponent;
  let fixture: ComponentFixture<UnauthorizedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [
        UnauthorizedComponent
      ],
      providers: []
    }).compileComponents();
    fixture = TestBed.createComponent(UnauthorizedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
