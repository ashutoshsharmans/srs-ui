import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType, ROOT_EFFECTS_INIT } from '@ngrx/effects';
import { exhaustMap, filter, of, tap } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import { ERba } from '@otc/shared/enums/rba.enums';
import { ETheme } from '@otc/shared/enums/theme.enums';
import { IError } from '@otc/shared/models/error.interface';
import { ILaunchDarklyFlags } from '@otc/shared/models/launch-darkly.interface';
import { IPermission } from '@otc/shared/models/permission.interface';
import { IPreference } from '@otc/shared/models/preference.interface';
import { IUser, IUserRaw } from '@otc/shared/models/user.interface';
import { LaunchDarklyService } from '@otc/shared/services/launch-darkly.service';
import { TokenService } from '@otc/shared/services/token.service';
import { UserService } from '@otc/shared/services/user.service';
import * as UserActions from '@otc/shared/store/actions/user.actions';

@Injectable()
export class UserEffects {
  actions$: Actions = inject(Actions);
  rbaService: UserService = inject(UserService);
  tokenService: TokenService = inject(TokenService);
  launchDarklyService: LaunchDarklyService = inject(LaunchDarklyService);
  snackBar: MatSnackBar = inject(MatSnackBar);

  /**
   * The Following effect is called at the start of the application.
   * If there is a valid token it will load user info
   */
  loadUserInfo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ROOT_EFFECTS_INIT),
      filter(() => !!this.tokenService.getToken()),
      mergeMap(() =>
        this.rbaService.getUserInfo().pipe(
          map((data: IUserRaw) =>
            UserActions.loadUserInfoSuccess({
              data: {
                racf: data.racf,
                firstName: data.firstName,
                lastName: data.lastName,
                username: data.username,
                roles: data.rba,
                darklyFlags: {},
                preference: this.getPreference(),
                permission: this.getPermission(data.rba)
              }
            })
          ),
          catchError((error: IError) => of(UserActions.loadUserInfoFailure({ error })))
        )
      )
    )
  );

  setupLaunchDarkly$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUserInfoSuccess),
      map(action => UserActions.loadLaunchDarkly({ data: action.data }))
    )
  );

  loadLaunchDarklyFlags$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadLaunchDarkly),
      exhaustMap((action: { data: IUser }) =>
        this.launchDarklyService.getAllFlags(action.data).pipe(
          map((data: ILaunchDarklyFlags) => UserActions.loadLaunchDarklySuccess({ data })),
          catchError((error: IError) => of(UserActions.loadLaunchDarklyFailure({ error })))
        )
      )
    )
  );

  handleFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.loadUserInfoFailure),
        tap(action => {
          this.snackBar.open(action.error.message, '', { duration: 3000, panelClass: 'bg-primary' });
        })
      ),
    { dispatch: false }
  );

  private getPreference(): IPreference {
    return {
      darkMode: !!localStorage.getItem(ETheme.DARK_MODE)
    };
  }

  private getPermission(rba: Array<ERba>): IPermission {
    return {
      // Screens
      adminTools: true,
      manage: true,
      dashboard: true,
      shipmentOrders: true,

      // Shipment Bill Sections
      general: true,
      orderSetup: true,
      routes: true,
      vin: true,
      rating: true,
      shipmentReferences: true,
      shipmentParties: true,
      emptyReverse: true,
      customs: true,
      commodity: true,
      commodityLading: true,
      hazardous: true,
      location: true,

      // Order Options
      orderOption: rba.includes(ERba.OTC_ORDER_OPTION),
      orderOptionReship: rba.includes(ERba.SRS_NON_INTERMODAL_CREATE),
      orderOptionMiscellaneousBill: rba.includes(ERba.SRS_EXTERNAL_CREATE),
      orderOptionEmptyNoneRevenue: true,
      orderOptionLoadedMerchandise: rba.includes(ERba.SRS_NON_INTERMODAL_CREATE) || rba.includes(ERba.SRS_EXTERNAL_CREATE),
      orderOptionUnitTrain: rba.includes(ERba.SRS_EXTERNAL_CREATE) || rba.includes(ERba.SRS_UNIT_TRAIN_CREATE),
      orderOptionProperToAccrueMerchandise: rba.includes(ERba.SRS_PROPERTOACCRUE_NON_INTERMODAL_CREATE),
      orderOptionEmptyRevenue: rba.includes(ERba.SRS_EMPTY_REVENUE_CREATE) || rba.includes(ERba.SRS_EXTERNAL_CREATE),
      orderOptionRailHighway: rba.includes(ERba.SRS_INTERMODAL_CREATE) || rba.includes(ERba.SRS_EXTERNAL_CREATE),
      orderOptionProperToAccrueRailHighway: rba.includes(ERba.SRS_PROPERTOACCRUE_INTERMODAL_CREATE),
      orderOptionRailManifest: rba.includes(ERba.SRS_INTERMODAL_MANIFEST_CREATE),
      caseNumber: true,
      searchBy: true,
      protectiveService: true,
      otmaLoadUp: false,
      createBill: true,
      cloneBill: false
    };
  }
}
