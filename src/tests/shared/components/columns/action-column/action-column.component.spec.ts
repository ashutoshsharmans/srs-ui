import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionColumnComponent } from '@otc/shared/components/columns/action-column/action-column.component';
import { IAction } from '@otc/shared/models/common.interface';
import { IOtcCellRendererParams } from '@otc/shared/models/grid.interface';

describe('Action Column Component', () => {
  let component: ActionColumnComponent;
  let fixture: ComponentFixture<ActionColumnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [ActionColumnComponent],
      providers: []
    }).compileComponents();

    fixture = TestBed.createComponent(ActionColumnComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should setup value and params on agInit', () => {
    const action: IAction = { add: true, clone: true, delete: true, edit: true, xml: false };
    const params: IOtcCellRendererParams = { action, value: 'Column value' } as IOtcCellRendererParams;
    component.agInit(params);
    expect(component.params).toEqual(params);
    expect(component.visibility).toEqual(action);
  });

  it('should call onCloneCellClick when clone method invoked', () => {
    const params = { context: { onCloneCellClick: (): void => {} } } as IOtcCellRendererParams;
    jest.spyOn(params.context, 'onCloneCellClick');
    component.params = params;
    component.clone();
    expect(params.context.onCloneCellClick).toHaveBeenCalled();
  });

  it('should call onEditCellClick when edit method invoked', () => {
    const params = { context: { onEditCellClick: (): void => {} } } as IOtcCellRendererParams;
    jest.spyOn(params.context, 'onEditCellClick');
    component.params = params;
    component.edit();
    expect(params.context.onEditCellClick).toHaveBeenCalled();
  });

  it('should call onDeleteCellClick when delete method invoked', () => {
    const params = { context: { onDeleteCellClick: (): void => {} } } as IOtcCellRendererParams;
    jest.spyOn(params.context, 'onDeleteCellClick');
    component.params = params;
    component.delete();
    expect(params.context.onDeleteCellClick).toHaveBeenCalled();
  });

  it('should call onAddCellClick when add method invoked', () => {
    const params = { context: { onAddCellClick: (): void => {} } } as IOtcCellRendererParams;
    jest.spyOn(params.context, 'onAddCellClick');
    component.params = params;
    component.add();
    expect(params.context.onAddCellClick).toHaveBeenCalled();
  });
});
