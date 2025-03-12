import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';

import { AuthenticationComponent } from '@otc/core/authentication/authentication.component';
import { AuthenticationFacade } from '@otc/shared/store/facades/authentication.facade';

describe('AuthenticationComponent', () => {
  let component: AuthenticationComponent;
  let fixture: ComponentFixture<AuthenticationComponent>;
  let authFacade: AuthenticationFacade;
  let router: Router;
  let authState: Observable<{ authenticated: boolean; loading: boolean }>;

  beforeEach(async () => {
    authState = of({ authenticated: true, loading: false });

    authFacade = {
      load: jest.fn(),
      get authState() {
        return authState;
      }
    } as unknown as AuthenticationFacade;
    router = {
      navigateByUrl: jest.fn()
    } as unknown as Router;

    await TestBed.configureTestingModule({
      imports: [AuthenticationComponent],
      providers: [
        { provide: AuthenticationFacade, useValue: authFacade },
        { provide: Router, useValue: router },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { queryParams: { returnUrl: '/home/dashboard' } }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AuthenticationComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load authentication state and navigate on success', () => {
    fixture.detectChanges();
    expect(authFacade.load).toHaveBeenCalledWith('/home/dashboard');
    expect(router.navigateByUrl).toHaveBeenCalledWith('/home/dashboard');
  });

  it('should not redirect of the user is not authenticated', () => {
    authState = of({ authenticated: false, loading: false });
    fixture.detectChanges();
    expect(router.navigateByUrl).not.toHaveBeenCalled();
  });
});
