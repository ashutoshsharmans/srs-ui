import { TestBed } from '@angular/core/testing';
import LaunchDarkly from 'launchdarkly-js-client-sdk';

import { EDarklyFlags } from '@otc/shared/enums/launch-darkly.enums';
import { ERba } from '@otc/shared/enums/rba.enums';
import { ILaunchDarklyFlags } from '@otc/shared/models/launch-darkly.interface';
import { IPermission } from '@otc/shared/models/permission.interface';
import { IUser } from '@otc/shared/models/user.interface';
import { LaunchDarklyService } from '@otc/shared/services/launch-darkly.service';

const client = {
  waitUntilReady: jest.fn(),
  close: jest.fn(),
  variation: jest.fn(),
  identify: jest.fn(),
  on: jest.fn()
};

jest.mock('launchdarkly-js-client-sdk', () => ({
  initialize: () => client
}));

describe('Launch Darkly Service', () => {
  let service: LaunchDarklyService;

  const mockUser: IUser = {
    permission: {} as IPermission,
    preference: {
      darkMode: false
    },
    racf: 'zd4eu',
    roles: [ERba.OTC_ACCESS, ERba.OTC_ADMIN_ACCESS],
    darklyFlags: {
      comparisonDashboard: true,
      soManagement: true
    }
  };

  const mockFlags: ILaunchDarklyFlags = {
    billOfLading: true,
    cartaPorte: false,
    comparisonDashboard: true,
    multiHaz: false,
    pingIntegration: true,
    shipmentRequestUpdate: false,
    soManagement: true
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LaunchDarklyService]
    });
    service = TestBed.inject(LaunchDarklyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all flags when initializing launch darkly', done => {
    jest.spyOn(LaunchDarkly, 'initialize').mockReturnValue({
      waitUntilReady: () => Promise.resolve(),
      allFlags: () => ({
        [EDarklyFlags.BILL_OF_LADING]: true,
        [EDarklyFlags.CARTA_PORTE]: false,
        [EDarklyFlags.COMPARISON_DASHBOARD]: true,
        [EDarklyFlags.MULTI_HAZ]: false,
        [EDarklyFlags.PING_INTEGRATION]: true,
        [EDarklyFlags.SHIPMENT_REQUEST_UPDATE]: false,
        [EDarklyFlags.SO_MANAGEMENT]: true
      })
    } as never);
    service.getAllFlags(mockUser).subscribe(flags => {
      expect(flags).toEqual(mockFlags);
      done();
    });
  });
});
