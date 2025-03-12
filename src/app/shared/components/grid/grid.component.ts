import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input, InputSignal, OnInit } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { AllCommunityModule, ColDef, colorSchemeDarkBlue, GridOptions, ModuleRegistry, Theme, themeQuartz } from 'ag-grid-community';
import { AllEnterpriseModule, LicenseManager } from 'ag-grid-enterprise';
import { distinctUntilChanged, Observable, tap } from 'rxjs';

import { EColor } from '@otc/shared/enums/color.enums';
import { IAuthenticationState, IUserState } from '@otc/shared/models/state.interface';
import { UserFacade } from '@otc/shared/store/facades/user.facade';
LicenseManager.setLicenseKey(
  'Using_this_{AG_Grid}_Enterprise_key_{AG-059101}_in_excess_of_the_licence_granted_is_not_permitted' +
    '___Please_report_misuse_to_legal@ag-grid.com' +
    '___For_help_with_changing_this_key_please_contact_info@ag-grid.com' +
    '___{Norfolk_Southern_Railway_Company}_is_granted_a_{Multiple_Applications}_Developer_License_for_{55}_Front-End_JavaScript_developers' +
    '___All_Front-End_JavaScript_developers_need_to_be_licensed_in_addition_to_the_ones_working_with_{AG_Grid}_Enterprise' +
    '___This_key_has_not_been_granted_a_Deployment_License_Add-on' +
    '___This_key_works_with_{AG_Grid}_Enterprise_versions_released_before_{10_May_2025}' +
    '____[v3]_[01]_MTc0NjgzMTYwMDAwMA==0d40eed3bda3c111545dd06da4a9abc6'
);
ModuleRegistry.registerModules([AllEnterpriseModule, AllCommunityModule]);

@Component({
  selector: 'otc-grid',
  standalone: true,
  imports: [
    AgGridAngular,
    AsyncPipe
  ],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GridComponent implements OnInit {
  userFacade: UserFacade = inject(UserFacade);

  loading: InputSignal<boolean> = input.required<boolean>();
  rowData: InputSignal<Array<object>> = input.required<Array<object>>();
  colDef: InputSignal<Array<ColDef>> = input.required<Array<ColDef>>();
  defaultColDef: InputSignal<ColDef> = input<ColDef>({ filter: true });
  gridOptions: InputSignal<GridOptions> = input<GridOptions>({ cellSelection: true });
  state$?: Observable<{ auth: IAuthenticationState; user: IUserState }>;
  theme: Theme = themeQuartz.withParams({ accentColor: EColor.PRIMARY, fontFamily: 'Lato-Regular' });

  ngOnInit(): void {
    this.state$ = this.userFacade.userInfoState.pipe(
      distinctUntilChanged(
        (oldValue: { auth: IAuthenticationState; user: IUserState }, newValue: { auth: IAuthenticationState; user: IUserState }) =>
          oldValue.user.preference.darkMode === newValue.user.preference.darkMode
      ),
      tap((state: { auth: IAuthenticationState; user: IUserState }) => this.changeTheme(state.user.preference.darkMode))
    );
  }

  changeTheme(darkMode: boolean): void {
    this.theme = darkMode
      ? themeQuartz.withPart(colorSchemeDarkBlue).withParams({ accentColor: EColor.PRIMARY, backgroundColor: EColor.DARK_GREY, fontFamily: 'Lato-Regular' })
      : themeQuartz.withParams({ accentColor: EColor.PRIMARY, fontFamily: 'Lato-Regular' });
  }
}
