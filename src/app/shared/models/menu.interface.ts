import { Params } from '@angular/router';

export interface IMenu {
  active?: boolean;
  child?: Array<IMenu>;
  label: string;
  link: boolean;
  queryParams?: Params;
  url: string;
}
