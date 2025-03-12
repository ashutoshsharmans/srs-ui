import { OverlayModule } from '@angular/cdk/overlay';
import { ComponentRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockModule } from 'ng-mocks';

import { MaskComponent } from '@otc/shared/components/mask/mask.component';

describe('Mask Component', () => {
  let component: MaskComponent;
  let componentRef: ComponentRef<MaskComponent>;
  let fixture: ComponentFixture<MaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [
        MaskComponent,
        MockModule(OverlayModule)
      ],
      providers: []
    }).compileComponents();

    fixture = TestBed.createComponent(MaskComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('value', true);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
