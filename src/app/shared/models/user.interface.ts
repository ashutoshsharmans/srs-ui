import { ERba } from '@otc/shared/enums/rba.enums';
import { ILaunchDarklyFlags } from '@otc/shared/models/launch-darkly.interface';
import { IPermission } from '@otc/shared/models/permission.interface';
import { IPreference } from '@otc/shared/models/preference.interface';

export interface IUserRaw {
  firstName: string;
  lastName: string;
  racf: string;
  rba: Array<ERba>;
  username: string;
}

export interface IUser {
  darklyFlags: ILaunchDarklyFlags;
  firstName?: string;
  lastName?: string;
  permission: IPermission;
  preference: IPreference;
  racf?: string;
  roles: Array<ERba>;
  username?: string;
}
