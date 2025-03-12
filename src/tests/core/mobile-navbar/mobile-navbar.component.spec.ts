import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';

import { MobileNavbarComponent } from '@otc/core/mobile-navbar/mobile-navbar.component';
import { IAuthenticationState, IUserState } from '@otc/shared/models/state.interface';
import { UserFacade } from '@otc/shared/store/facades/user.facade';

describe('MobileNavbarComponent', () => {
  let component: MobileNavbarComponent;
  let fixture: ComponentFixture<MobileNavbarComponent>;
  let userFacade: UserFacade;
  let userState: Observable<{ auth: IAuthenticationState; user: IUserState }>;

  beforeEach(async () => {
    userState = of({ auth: {} as IAuthenticationState, user: { permission: {}, darklyFlags: {} } as IUserState });

    userFacade = {
      get userInfoState() {
        return userState;
      }
    } as unknown as UserFacade;

    await TestBed.configureTestingModule({
      imports: [],
      providers: [
        { provide: UserFacade, useValue: userFacade }]
    }).compileComponents();

    fixture = TestBed.createComponent(MobileNavbarComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should setup the user permission permission and darkly flag change', () => {
    jest.spyOn(component, 'setup');
    fixture.detectChanges();
    expect(component.setup).toHaveBeenCalled();
  });
});
