import { ComponentRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BadgeComponent } from '@otc/shared/components/badge/badge.component';
import { EStatus } from '@otc/shared/enums/status.enums';

describe('Badge Component', () => {
  let component: BadgeComponent;
  let componentRef: ComponentRef<BadgeComponent>;
  let fixture: ComponentFixture<BadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BadgeComponent],
      providers: []
    }).compileComponents();

    fixture = TestBed.createComponent(BadgeComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('value', EStatus.DISABLED);
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should set label to done and color secondary on EStatus VALID Or DONE', () => {
    componentRef.setInput('value', EStatus.VALID);
    fixture.detectChanges();
    expect(component.detail()).toEqual({ color: 'bg-secondary', label: 'Done' });

    componentRef.setInput('value', EStatus.DONE);
    fixture.detectChanges();
    expect(component.detail()).toEqual({ color: 'bg-secondary', label: 'Done' });
  });

  it('should set label to In Progress and color warning on EStatus VALID', () => {
    componentRef.setInput('value', EStatus.IN_PROGRESS);
    fixture.detectChanges();
    expect(component.detail()).toEqual({ color: 'bg-warning', label: 'In Progress' });
  });

  it('should set label to Validating and color light on EStatus PENDING', () => {
    componentRef.setInput('value', EStatus.PENDING);
    fixture.detectChanges();
    expect(component.detail()).toEqual({ color: 'bg-light', label: 'Validating' });
  });

  it('should set label to Invalid and color danger on EStatus PENDING', () => {
    componentRef.setInput('value', EStatus.INVALID);
    fixture.detectChanges();
    expect(component.detail()).toEqual({ color: 'bg-danger', label: 'Invalid' });
  });

  it('should set label to Required and color danger on EStatus REQUIRE', () => {
    componentRef.setInput('value', EStatus.REQUIRE);
    fixture.detectChanges();
    expect(component.detail()).toEqual({ color: 'bg-danger', label: 'Required' });
  });
});
