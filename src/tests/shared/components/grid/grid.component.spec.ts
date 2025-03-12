import { ComponentRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';

import { GridComponent } from '@otc/shared/components/grid/grid.component';
import { IAuthenticationState, IUserState } from '@otc/shared/models/state.interface';
import { UserFacade } from '@otc/shared/store/facades/user.facade';

describe('Grid Component', () => {
  let component: GridComponent;
  let componentRef: ComponentRef<GridComponent>;
  let fixture: ComponentFixture<GridComponent>;
  const mockUserFacade: { userInfoState: Observable<{ auth: IAuthenticationState; user: IUserState }> } = {
    userInfoState: of({ auth: {} as IAuthenticationState, user: { preference: { darkMode: true } } as IUserState })
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GridComponent],
      providers: [{ provide: UserFacade, useValue: mockUserFacade }]
    }).compileComponents();

    fixture = TestBed.createComponent(GridComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('loading', true);
    componentRef.setInput('rowData', []);
    componentRef.setInput('colDef', []);
    componentRef.setInput('defaultColDef', { filter: true });
    jest.spyOn(component, 'changeTheme');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize state$ on ngOnInit', () => {
    expect(component.state$).toBeDefined();
  });

  it('should change theme to regular mode if dark mode is disabled', () => {
    mockUserFacade.userInfoState = of({ auth: {} as IAuthenticationState, user: { preference: { darkMode: false } } as IUserState });
    fixture.detectChanges();
    expect(component.changeTheme).toHaveBeenCalledWith(true);
  });

  it('should change theme to dark mode if dark mode is enabled', () => {
    mockUserFacade.userInfoState = of({ auth: {} as IAuthenticationState, user: { preference: { darkMode: true } } as IUserState });
    fixture.detectChanges();
    expect(component.changeTheme).toHaveBeenCalledWith(false);
  });

  it('should not emit when darkMode preference does not change', () => {
    const initialDarkModeState = { auth: {} as IAuthenticationState, user: { preference: { darkMode: true, random: 1 } } as unknown as IUserState };
    const sameDarkModeState = { auth: {} as IAuthenticationState, user: { preference: { darkMode: true, random: 2 } } as unknown as IUserState };

    let emittedValues = 0;
    mockUserFacade.userInfoState = of(initialDarkModeState, sameDarkModeState);
    component.ngOnInit();

    component.state$?.subscribe(() => {
      emittedValues++;
    });

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(emittedValues).toBe(1); // Only the initial value should be emitted
    });
  });
});
