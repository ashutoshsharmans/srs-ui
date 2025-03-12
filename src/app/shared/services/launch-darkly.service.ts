import { Injectable } from '@angular/core';
import * as LaunchDarkly from 'launchdarkly-js-client-sdk';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { EDarklyFlags } from '@otc/shared/enums/launch-darkly.enums';
import { ILaunchDarklyFlags } from '@otc/shared/models/launch-darkly.interface';
import { IUser } from '@otc/shared/models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class LaunchDarklyService {
  getAllFlags(user: IUser): Observable<ILaunchDarklyFlags | never> {
    const fetchFlags: Subject<void> = new Subject<void>();
    const ldUser: LaunchDarkly.LDSingleKindContext = {
      kind: 'user',
      key: user.racf,
      authorities: user.roles,
      _meta: {
        privateAttributes: []
      }
    };
    const client: LaunchDarkly.LDClient = LaunchDarkly.initialize('65b2e4a4cf0b5d109433fbb6', ldUser);
    client.waitUntilReady().then(() => fetchFlags.next());
    return fetchFlags.pipe(map(() => this.getFlags(client.allFlags())));
  }

  private getFlags(flags: LaunchDarkly.LDFlagSet): ILaunchDarklyFlags {
    return {
      billOfLading: !!flags[EDarklyFlags.BILL_OF_LADING],
      cartaPorte: !!flags[EDarklyFlags.CARTA_PORTE],
      comparisonDashboard: !!flags[EDarklyFlags.COMPARISON_DASHBOARD],
      multiHaz: !!flags[EDarklyFlags.MULTI_HAZ],
      pingIntegration: !!flags[EDarklyFlags.PING_INTEGRATION],
      shipmentRequestUpdate: !!flags[EDarklyFlags.SHIPMENT_REQUEST_UPDATE],
      soManagement: !!flags[EDarklyFlags.SO_MANAGEMENT]
    };
  }
}
