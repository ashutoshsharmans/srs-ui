import { OtcCommonConstants } from '@otc/configs/common.constants';
import { EEnv } from '@otc/shared/enums/env';

export class OtcUrlConstants {
  static readonly baseUrl = '/api';

  // SRS Services
  static readonly srsBaseUrl = `${OtcUrlConstants.baseUrl}/srs-service`;
  static readonly submitUrl = `${OtcUrlConstants.srsBaseUrl}/submit`;

  // Equipment Services
  static readonly equipmentBaseUrl = `${OtcUrlConstants.baseUrl}/equipment-service`;
  static readonly equipmentValidateUrl = `${OtcUrlConstants.equipmentBaseUrl}/v1/validate-equipment`;

  // Security Services
  static readonly securityBaseUrl = `${OtcUrlConstants.baseUrl}/security-service`;
  static readonly securityUserInfoUrl = `${OtcUrlConstants.securityBaseUrl}/v1/user/info`;

  // Notification Services
  static readonly notificationBaseUrl = `${OtcUrlConstants.baseUrl}/notification-service`;
  static readonly notificationsUrl = `${OtcUrlConstants.notificationBaseUrl}/v1/notifications`;

  // Pattern Services
  static readonly patternBaseUrl = `${OtcUrlConstants.baseUrl}/pattern-service`;
  static readonly patternUrl = `${OtcUrlConstants.patternBaseUrl}/v1/pattern`;
  static readonly draftUrl = `${OtcUrlConstants.patternBaseUrl}/v1/draft`;

  // Special Endorsement
  static readonly specialEndorsementBaseUrl = `${OtcUrlConstants.baseUrl}/special-endorsement-service`;
  static readonly specialEndorsementsUrl = `${OtcUrlConstants.specialEndorsementBaseUrl}/v1/special-endorsements`;
  static readonly referenceNumberQualifiersUrl = `${OtcUrlConstants.specialEndorsementBaseUrl}/v1/reference-number-qualifiers`;

  // STCC Services
  static readonly stccBaseUrl = `${OtcUrlConstants.baseUrl}/stcc-service`;
  static readonly stccsUrl = `${OtcUrlConstants.stccBaseUrl}/v1/stccs`;
  static readonly qualifiersUrl = `${OtcUrlConstants.stccBaseUrl}/v1/qualifiers`;
  static readonly submittedRequestsUrl = `${OtcUrlConstants.stccBaseUrl}/v1/submitted-requests`;
  static readonly updatedWaybillsUrl = `${OtcUrlConstants.stccBaseUrl}/v1/updated-waybills`;
  static readonly draftsUrl = `${OtcUrlConstants.stccBaseUrl}/v1/drafts`;
  static readonly brimCustomerNamesUrl = `${OtcUrlConstants.stccBaseUrl}/v1/brim-customer-names`;
  static readonly brimVesselDestinationsUrl = `${OtcUrlConstants.stccBaseUrl}/v1/brim-vessel-destinations`;

  // Ping Id
  static readonly pingIdUrl = `${OtcUrlConstants.getPingIdDomainUrl()}/as/authorization.oauth2`;
  static readonly pingOAuthUrl = `${OtcUrlConstants.getSecurityDomainUrl()}/oauth-landing`;

  // Conditional URIs
  private static getSecurityDomainUrl(): string {
    const env: EEnv = OtcCommonConstants.getEnv();
    let url;
    if (env === EEnv.PROD || env === EEnv.DR) {
      url = 'https://otc-security-service-raoapps.apps.ocp4np.nscorp.com';
    } else if (env === EEnv.QA) {
      url = 'https://otc-security-service-raoapps-qa.apps.ocp4np.nscorp.com';
    } else {
      url = 'http://localhost:8099';
    }
    return url;
  }

  private static getPingIdDomainUrl(): string {
    const env: EEnv = OtcCommonConstants.getEnv();
    let url;
    if (env === EEnv.PROD || env === EEnv.DR) {
      url = 'https://nsidp.nscorp.com';
    } else {
      url = 'https://nsidpqa.nscorp.com';
    }
    return url;
  }
}
