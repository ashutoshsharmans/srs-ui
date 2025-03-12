import { createReducer, on } from '@ngrx/store';

import { IUserState } from '@otc/shared/models/state.interface';
import * as UserActions from '@otc/shared/store/actions/user.actions';

export const featureKey = 'user';

export const initialState: IUserState = {
  preference: {
    darkMode: false
  },
  darklyFlags: {
    billOfLading: false
  },
  roles: [],
  permission: {
    general: false,
    adminTools: false,
    manage: false,
    dashboard: false,
    shipmentOrders: false,
    caseNumber: false,
    commodityLading: false,
    cloneBill: false,
    commodity: false,
    createBill: false,
    customs: false,
    emptyReverse: false,
    otmaLoadUp: false,
    orderOption: false,
    orderOptionReship: false,
    orderOptionEmptyNoneRevenue: false,
    orderOptionLoadedMerchandise: false,
    orderOptionMiscellaneousBill: false,
    orderOptionUnitTrain: false,
    orderOptionProperToAccrueMerchandise: false,
    orderOptionEmptyRevenue: false,
    orderOptionRailHighway: false,
    orderOptionProperToAccrueRailHighway: false,
    orderOptionRailManifest: false,
    orderSetup: false,
    protectiveService: false,
    rating: false,
    routes: false,
    searchBy: false,
    vin: false,
    shipmentParties: false,
    shipmentReferences: false,
    hazardous: false,
    location: false
  },
  racf: undefined,
  username: undefined,
  firstName: undefined,
  lastName: undefined,
  error: undefined,
  loading: false,
  loadingLaunchDarkly: false,
  infoLoaded: false,
  launchDarklyLoaded: false
};

export const reducer = createReducer(
  initialState,
  on(UserActions.loadUserInfo, () => ({
    ...initialState,
    loading: true
  })),
  on(UserActions.loadUserInfoSuccess, (state, action) => ({
    ...state,
    ...action.data,
    loading: false,
    infoLoaded: true
  })),
  on(UserActions.loadUserInfoFailure, (state, action) => ({
    ...state,
    error: action.error,
    loading: false,
    infoLoaded: false
  })),
  on(UserActions.loadLaunchDarkly, (state: IUserState) => ({
    ...state,
    loadingLaunchDarkly: true
  })),
  on(UserActions.loadLaunchDarklySuccess, (state, action) => ({
    ...state,
    darklyFlags: action.data,
    loadingLaunchDarkly: false,
    launchDarklyLoaded: true
  })),
  on(UserActions.loadLaunchDarklyFailure, (state, action) => ({
    ...state,
    error: action.error,
    loadingLaunchDarkly: false,
    launchDarklyLoaded: false
  })),
  on(UserActions.updateTheme, (state, action) => ({
    ...state,
    preference: { ...state.preference, darkMode: action.darkMode }
  }))
);
