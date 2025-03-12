import { EEnv } from '@otc/shared/enums/env';

export class OtcCommonConstants {
  static getEnv(): EEnv {
    const origin = window.location.origin;
    let env: EEnv;
    if (/otc\.nscorp\.com/g.test(origin)) {
      env = EEnv.PROD;
    } else if (/otcdr\.nscorp\.com/g.test(origin)) {
      env = EEnv.DR;
    } else if (/otcqa\.nscorp\.com/g.test(origin)) {
      env = EEnv.QA;
    } else if (/otctest\.nscorp\.com/g.test(origin)) {
      env = EEnv.TEST;
    } else {
      env = EEnv.LOCAL;
    }
    return env;
  }
}
