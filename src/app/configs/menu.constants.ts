import { ILaunchDarklyFlags } from '@otc/shared/models/launch-darkly.interface';
import { IMenu } from '@otc/shared/models/menu.interface';
import { IPermission } from '@otc/shared/models/permission.interface';

export class OtcMenuConstants {
  /**
   * Get Menu
   * @description Get Menu. Will move this to the backend later
   * @param permission
   * @param launchDarklyFlags
   */
  static getMenus(permission: IPermission, launchDarklyFlags: ILaunchDarklyFlags): Array<IMenu> {
    const menus: Array<IMenu> = [];
    if (permission.dashboard) {
      menus.push({ url: '/home/dashboard', label: 'Overview', link: true });
    }
    if (permission.manage) {
      menus.push({
        url: '/home/manage',
        label: 'Manage',
        link: false,
        child: [
          { url: '/home/manage/pattern-and-draft', label: 'View Patterns & Drafts', link: true },
          { url: '/home/manage/shipment-request', label: 'Create BOL', link: true, queryParams: { type: 'bol' } },
          { url: '/home/manage/shipment-request', label: 'Create Waybill', link: true, queryParams: { type: 'waybill' } },
          { url: '/home/manage/shipment-request', label: 'Create Miscellaneous Bill', link: true, queryParams: { type: 'misc' } }
        ]
      });
    }
    if (permission.manage && launchDarklyFlags.soManagement) {
      menus.push({
        label: 'Shipment Orders',
        url: '/home/shipment-orders',
        link: false,
        child: [
          { url: '/home/shipment-orders/search-and-find', label: 'Search & Find', link: true },
          { url: '/home/shipment-orders/so-management', label: 'SO Management', link: true }
        ]
      });
    }
    if (permission.adminTools) {
      menus.push({
        label: 'Admin Tools',
        link: false,
        url: '/home/admin-tools',
        child: [
          { url: '/home/admin-tools/comparison-dashboard', label: 'Comparison Dashboard', link: true },
          { url: '/home/admin-tools/submitted-bill', label: 'Submitted Bills', link: true }
        ]
      });
    }
    return menus;
  }
}
