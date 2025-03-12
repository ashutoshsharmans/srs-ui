import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { provideMockStore } from '@ngrx/store/testing';
import { MockModule, MockProvider } from 'ng-mocks';

import { AppLayoutComponent } from '@otc/core/app-layout/app-layout.component';

describe('App Layout Component', () => {
  let component: AppLayoutComponent;
  let fixture: ComponentFixture<AppLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [
        AppLayoutComponent,
        MockModule(BrowserAnimationsModule)
      ],
      providers: [
        MockProvider(ActivatedRoute, {}),
        provideMockStore({}),
        { provide: ChangeDetectorRef, useValue: { detectChanges: jest.fn() } },
        { provide: MediaMatcher, useValue: { matchMedia: jest.fn().mockReturnValue({ addEventListener: () => {}, removeEventListener: () => {} }) } }]
    }).compileComponents();
    fixture = TestBed.createComponent(AppLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should invoke mobilQueryListener', () => {
    component.mobileQueryListener();
    expect(component).toBeTruthy();
  });
});
