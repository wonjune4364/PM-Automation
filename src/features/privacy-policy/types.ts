export interface PrivacyPolicyFormData {
  // 1. Service Provider
  serviceName: string;
  isFirstPolicy: boolean;

  // 2. Personal Information to be Collected
  collectItems: {
    required: string[];
    optional: string[];
    customRequired: string;
    customOptional: string;
  };

  // 3. Methods of Collecting Personal Information
  collectMethods: string[];
  customCollectMethod: string;

  // 4. Purpose of Use of Personal Information
  usagePurposes: string[];
  customUsagePurpose: string;

  // 5. Provision of Personal Information to Third Parties
  isProvidingToThirdParty: boolean;
  thirdPartyInfo: {
    recipient: string;
    purpose: string;
    items: string;
  };

  // 6. Outsourcing of Personal Information Processing
  isOutsourcing: boolean;
  outsourcingInfo: {
    company: string;
    scope: string;
  };

  // 7. Designation of Privacy Officer
  privacyOfficer: {
    name: string;
    position: string;
    phone: string;
    email: string;
  };
  hasPrivacyManager: boolean;
  hasPrivacyDepartment: boolean;

  // 8. Management and Use of Collected Personal Information
  allowsUnder14: boolean;
  allowsWithdrawal: boolean;
  hasTechnicalProtection: boolean;
  notifiesDataBreach: boolean;
  hasOverseasTransfer: boolean;

  // 9. Effective Date
  effectiveDate: string;
}
