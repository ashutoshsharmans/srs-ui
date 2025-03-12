import { getRouterSelectors } from '@ngrx/router-store';

// `router` is used as the default feature name. You can use the feature name

export const { selectCurrentRoute, selectFragment, selectQueryParams, selectQueryParam, selectRouteParams, selectRouteParam, selectRouteData, selectRouteDataParam, selectUrl, selectTitle } =
  getRouterSelectors();
