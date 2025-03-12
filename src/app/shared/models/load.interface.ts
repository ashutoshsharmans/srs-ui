import { ELoadAction } from '@otc/shared/enums/load-action.enums';

export interface ILoadAction {
  action: ELoadAction;
  param: ILoadParam;
}

export interface ILoadParam {
  stcc?: string;
}
