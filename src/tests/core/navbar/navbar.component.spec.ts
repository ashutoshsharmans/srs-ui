import { ComponentRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ActivatedRoute, Router } from '@angular/router';
import { MockComponent, MockProvider } from 'ng-mocks';
import { Observable, of } from 'rxjs';

import { NavbarComponent } from '@otc/core/navbar/navbar.component';
import { NotificationComponent } from '@otc/features/notification/notification.component';
import { ETheme } from '@otc/shared/enums/theme.enums';
import { IAuthenticationState, IUserState } from '@otc/shared/models/state.interface';
import { UserFacade } from '@otc/shared/store/facades/user.facade';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let componentRef: ComponentRef<NavbarComponent>;
  let fixture: ComponentFixture<NavbarComponent>;
  let userFacade: UserFacade;
  let userState: Observable<{ auth: IAuthenticationState; user: IUserState }>;
  let mockDocument: Document;
  let mockBodyClassList: DOMTokenList;

  beforeEach(async () => {
    userState = of({ auth: {} as IAuthenticationState, user: { permission: {}, preference: { darkMode: true }, darklyFlags: {} } as IUserState });
    userFacade = {
      get userInfoState() {
        return userState;
      },
      updateTheme: jest.fn()
    } as unknown as UserFacade;
    mockBodyClassList = {
      add: jest.fn(),
      remove: jest.fn(),
      contains: jest.fn()
    } as unknown as DOMTokenList;

    mockDocument = {
      body: {
        classList: mockBodyClassList
      }
    } as unknown as Document;

    await TestBed.configureTestingModule({
      imports: [
        NavbarComponent,
        MockComponent(NotificationComponent)
      ],
      providers: [
        MockProvider(ActivatedRoute, {}),
        { provide: UserFacade, useValue: userFacade }]
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    component.document = mockDocument;
    componentRef.setInput('mobile', true);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should setup the user permission permission and darkly flag change', () => {
    jest.spyOn(component, 'setup');
    fixture.detectChanges();
    expect(component.setup).toHaveBeenCalled();
  });

  it('should setup the user permission permission and darkly flag change', () => {
    jest.spyOn(userFacade, 'updateTheme');
    component.changeTheme({ checked: true } as MatSlideToggleChange);
    expect(userFacade.updateTheme).toHaveBeenCalledWith(true);
  });

  it('should remove class from the body when darkMode is disabled', () => {
    jest.spyOn(mockDocument.body.classList, 'remove');
    component.updateTheme(false);
    expect(mockBodyClassList.remove).toHaveBeenCalledWith(ETheme.DARK_MODE);
  });

  it('should navigate to notifications when view notifications invoked', () => {
    component.router = {
      navigate: jest.fn(() => Promise.resolve())
    } as unknown as Router;
    const navigateSpy = jest.spyOn(component.router, 'navigate');
    component.viewNotifications();
    expect(navigateSpy).toHaveBeenCalledWith(['/home/notifications']);
  });
});
