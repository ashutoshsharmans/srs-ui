import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ICellRendererParams } from 'ag-grid-community';

import { LinkColumnComponent } from '@otc/shared/components/columns/link-column/link-column.component';
import { IOtcCellRendererParams } from '@otc/shared/models/grid.interface';

describe('Link Column Component', () => {
  let component: LinkColumnComponent;
  let fixture: ComponentFixture<LinkColumnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [LinkColumnComponent],
      providers: []
    }).compileComponents();
    fixture = TestBed.createComponent(LinkColumnComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should setup value and params on agInit', () => {
    const params: IOtcCellRendererParams = { value: 'something' } as ICellRendererParams;
    component.agInit(params);
    expect(component.params).toEqual(params);
  });

  it('should call onLinkCellClick when click method invoked', () => {
    const params = { context: { onLinkCellClick: (): void => {} } } as IOtcCellRendererParams;
    jest.spyOn(params.context, 'onLinkCellClick');
    component.params = params;
    component.click();
    expect(params.context.onLinkCellClick).toHaveBeenCalled();
  });
});
