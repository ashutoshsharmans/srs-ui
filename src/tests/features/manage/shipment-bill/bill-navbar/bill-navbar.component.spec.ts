import { ComponentRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillNavbarComponent } from '@otc/features/manage/shipment-bill/bill-navbar/bill-navbar.component';
import { EBillSection } from '@otc/shared/enums/bill.enums';

describe('Bill Navbar Component', () => {
  let component: BillNavbarComponent;
  let componentRef: ComponentRef<BillNavbarComponent>;
  let fixture: ComponentFixture<BillNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BillNavbarComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(BillNavbarComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('billSections', []);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should scroll to the specified section', () => {
    const sectionName = EBillSection.VIN;
    const mockSection = { scrollIntoView: jest.fn() } as unknown as Element;
    jest.spyOn(document, 'querySelector').mockReturnValue(mockSection);
    component.scrollTo(sectionName);

    expect(document.querySelector).toHaveBeenCalledWith(`.${sectionName}`);
    expect(mockSection.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
  });
});
