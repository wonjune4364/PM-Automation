import { PrivacyPolicyFormData } from "../types";

// Required Items Labels
const REQUIRED_ITEMS_LABELS: Record<string, string> = {
  email: "Email Address",
  password: "Password",
  name: "Name",
  nickname: "Nickname",
  birthdate: "Date of Birth",
  phone: "Phone Number",
  address: "Address",
};

// Optional Items Labels
const OPTIONAL_ITEMS_LABELS: Record<string, string> = {
  gender: "Gender",
  job: "Occupation",
  company: "Company Name",
  profile: "Profile Image",
  interests: "Interests",
};

// Collection Methods Labels
const COLLECT_METHODS_LABELS: Record<string, string> = {
  website: "Website Registration",
  app: "Mobile App Registration",
  email: "Email",
  customer_service: "Customer Service Consultation",
  board: "Bulletin Board",
  event: "Event Participation",
};

// Usage Purposes Labels
const USAGE_PURPOSES_LABELS: Record<string, string> = {
  service: "Service Provision and Contract Fulfillment",
  improvement: "Service Improvement and New Service Development",
  marketing: "Marketing and Advertising Usage",
  event: "Event and Function Information",
  statistics: "Demographic Analysis",
  relationship: "Formation of Relationships between Users",
};

export function generatePrivacyPolicy(data: PrivacyPolicyFormData): string {
  const {
    serviceName,
    isFirstPolicy,
    collectItems,
    collectMethods,
    customCollectMethod,
    usagePurposes,
    customUsagePurpose,
    isProvidingToThirdParty,
    thirdPartyInfo,
    isOutsourcing,
    outsourcingInfo,
    privacyOfficer,
    hasPrivacyManager,
    hasPrivacyDepartment,
    allowsUnder14,
    allowsWithdrawal,
    hasTechnicalProtection,
    notifiesDataBreach,
    hasOverseasTransfer,
    effectiveDate,
  } = data;

  // Create Required Items String
  const requiredItemsStr = collectItems.required
    .map((item) => REQUIRED_ITEMS_LABELS[item])
    .concat(
      collectItems.customRequired
        ? collectItems.customRequired.split(",").map((item) => item.trim())
        : []
    )
    .filter(Boolean)
    .join(", ");

  // Create Optional Items String
  const optionalItemsStr = collectItems.optional
    .map((item) => OPTIONAL_ITEMS_LABELS[item])
    .concat(
      collectItems.customOptional
        ? collectItems.customOptional.split(",").map((item) => item.trim())
        : []
    )
    .filter(Boolean)
    .join(", ");

  // Create Collection Methods String
  const collectMethodsStr = collectMethods
    .map((method) => COLLECT_METHODS_LABELS[method])
    .filter(Boolean)
    .join(", ");

  // Create Usage Purposes String
  const usagePurposesStr = usagePurposes
    .map((purpose) => USAGE_PURPOSES_LABELS[purpose])
    .filter(Boolean)
    .join(", ");

  // Generate Privacy Policy
  return `# Privacy Policy

${serviceName} (hereinafter referred to as the "Company") establishes and discloses the following privacy policy to protect the personal information of data subjects and to handle grievances related thereto promptly and smoothly in accordance with Article 30 of the Personal Information Protection Act.

## Article 1 (Purpose of Processing Personal Information)

The Company processes personal information for the following purposes. The personal information being processed is not used for purposes other than the following purposes, and if the purpose of use is changed, necessary measures such as obtaining separate consent under Article 18 of the Personal Information Protection Act will be implemented.

1. ${usagePurposesStr}${customUsagePurpose ? `, ${customUsagePurpose}` : ""}

## Article 2 (Processing and Retention Period of Personal Information)

The Company processes and retains personal information within the personal information retention/use period according to laws and regulations or within the personal information retention/use period agreed upon when collecting personal information from the data subject.

1. Member registration and management: Until membership withdrawal
2. Provision of goods or services: Until the completion of supply of goods/services and payment/settlement
3. Period prescribed by relevant laws

## Article 3 (Items and Method of Collection of Personal Information)

The Company collects the following personal information to provide services.

1. Collected Items
   - Required Items: ${requiredItemsStr || "None"}
   - Optional Items: ${optionalItemsStr || "None"}

2. Collection Method
   - ${collectMethodsStr}${
    customCollectMethod ? `, ${customCollectMethod}` : ""
  }

## Article 4 (Provision of Personal Information to Third Parties)

${
  isProvidingToThirdParty
    ? `The Company processes the personal information of data subjects only within the scope specified in Article 1 (Purpose of Processing Personal Information), and provides personal information to third parties only in cases falling under Articles 17 and 18 of the Personal Information Protection Act, such as the consent of the data subject or special provisions of the law.

1. Recipient of personal information: ${thirdPartyInfo.recipient}
2. Purpose of use of personal information by the recipient: ${thirdPartyInfo.purpose}
3. Items of personal information provided: ${thirdPartyInfo.items}
4. Retention and use period of the recipient: Until the purpose of provision is achieved`
    : "The Company processes the personal information of data subjects only within the scope specified in Article 1 (Purpose of Processing Personal Information), and provides personal information to third parties only in cases falling under Articles 17 and 18 of the Personal Information Protection Act, such as the consent of the data subject or special provisions of the law. Currently, the Company does not provide Users' personal information to third parties."
}

## Article 5 (Outsourcing of Personal Information Processing)

${
  isOutsourcing
    ? `The Company outsources personal information processing tasks as follows for smooth personal information processing.

1. Outsourcing recipient (Trustee): ${outsourcingInfo.company}
2. Content of outsourced work: ${outsourcingInfo.scope}

When complying with the outsourcing contract, in accordance with Article 26 of the Personal Information Protection Act, the Company specifies matters regarding prohibition of personal information processing other than the purpose of performing outsourced work, technical and administrative protection measures, restriction on re-outsourcing, management and supervision of the trustee, and liability for damages in documents such as the contract, and supervises whether the trustee processes personal information safely.`
    : "The Company does not currently outsource personal information processing externally. If the need for outsourcing arises in the future, we will notify the data subject of the outsourcing recipient and the content of the outsourced work, and obtain prior consent if necessary."
}

## Article 6 (Rights and Obligations of Data Subjects and Legal Representatives and Method of Exercise)

Data subjects may exercise rights such as viewing, correcting, deleting, or suspending processing of personal information against the Company at any time.
${
  allowsUnder14
    ? `
In the case of children under the age of 14, the legal representative has the right to view, correct/delete, or suspend processing of the child's personal information.`
    : ""
}
${
  allowsWithdrawal
    ? `
Data subjects may request to view personal information under Article 35 of the Personal Information Protection Act to the department below. The Company will strive to process personal information viewing requests promptly.`
    : ""
}

## Article 7 (Destruction of Personal Information)

The Company destroys the personal information without delay when the personal information becomes unnecessary, such as the expiration of the personal information retention period or the achievement of the processing purpose.

1. Destruction Procedure: The Company selects the personal information for which the cause for destruction has occurred and destroys the personal information with the approval of the Company's privacy officer.
2. Destruction Method: Personal information recorded and stored in electronic file format is destroyed so that the record cannot be reproduced, and personal information recorded and stored in paper documents is destroyed by shredding or incineration.

## Article 8 (Measures to Ensure Safety of Personal Information)

${
  hasTechnicalProtection
    ? `The Company takes the following measures to ensure the safety of personal information.

1. Administrative measures: Establishment and implementation of internal management plans, regular employee training, etc.
2. Technical measures: Management of access rights to personal information processing systems, etc., installation of access control systems, encryption of unique identification information, etc., installation of security programs
3. Physical measures: Access control to computer rooms, data storage rooms, etc.`
    : "The Company takes necessary administrative, technical, and physical measures to ensure the safety of personal information in accordance with Article 29 of the Personal Information Protection Act."
}

## Article 9 (Installation, Operation and Refusal of Automatic Personal Information Collection Devices)

The Company uses 'cookies' that store and retrieve usage information from time to time to provide individually customized services. Cookies are a small amount of information sent by the server used to operate the website to the user's browser and are also stored on the hard disk of the user's PC computer.

1. Purpose of use of cookies: Used to provide optimized information to users by identifying the type of visit and usage, popular search terms, security connection status, etc. for each service and website visited by the user.
2. Installation, operation and refusal of cookies: You can refuse to store cookies by setting options in the Tools>Internet Options>Privacy menu at the top of the web browser.
3. If you refuse to store cookies, you may experience difficulties in using customized services.

## Article 10 (Privacy Officer)

The Company designates a privacy officer as follows to take overall responsibility for personal information processing tasks and to handle grievances and damage relief of data subjects related to personal information processing.

- Privacy Officer
  - Name: ${privacyOfficer.name}
  - Position: ${privacyOfficer.position}
  - Contact: ${privacyOfficer.phone}, ${privacyOfficer.email}

${
  hasPrivacyManager
    ? `- Privacy Manager
  - Department: Privacy Team
  - Contact: Please contact the Privacy Officer above.`
    : ""
}

${
  hasPrivacyDepartment
    ? `- Department in charge of privacy
  - Department Name: Privacy Team
  - Contact: Please contact the Privacy Officer above.`
    : ""
}

## Article 11 (Request for Viewing Personal Information)

Data subjects may request to view personal information under Article 35 of the Personal Information Protection Act to the department below. The Company will strive to process personal information viewing requests promptly.

- Department Receiving and Processing Personal Information Viewing Requests
  - Department Name: ${hasPrivacyDepartment ? "Privacy Team" : "Customer Service"}
  - Person in Charge: ${privacyOfficer.name}
  - Contact: ${privacyOfficer.phone}, ${privacyOfficer.email}

## Article 12 (Method of Remedies for Infringement of Rights)

Data subjects may apply for dispute resolution or consultation to the Personal Information Dispute Mediation Committee, the KISA Personal Information Infringement Report Center, etc. to receive relief due to personal information infringement. For other reports and consultations on personal information infringement, please contact the following organizations.

1. Personal Information Dispute Mediation Committee: 1833-6972 (www.kopico.go.kr)
2. Personal Information Infringement Report Center: 118 (privacy.kisa.or.kr)
3. Supreme Prosecutors' Office: 1301 (www.spo.go.kr)
4. Korean National Police Agency: 182 (ecrm.cyber.go.kr)

${
  notifiesDataBreach
    ? `
## Article 13 (Notice of Personal Information Leakage)

In the event of a leakage of personal information, the Company will notify the data subject without delay and report it to the relevant authorities in accordance with Article 34 of the Personal Information Protection Act.`
    : ""
}

${
  hasOverseasTransfer
    ? `
## Article 14 (Overseas Transfer of Personal Information)

The Company may transfer users' personal information overseas to provide and improve services. In this case, the Company will take protective measures and notify users in accordance with Article 39-12 of the Personal Information Protection Act and other relevant laws.`
    : ""
}

## Article ${
    notifiesDataBreach ? "15" : hasOverseasTransfer ? "15" : "13"
  } (Amendment of Privacy Policy)

This Privacy Policy applies from ${effectiveDate}.
${
  !isFirstPolicy
    ? `Previous Privacy Policy can be found below.
- View Previous Privacy Policy (Link)`
    : ""
}`;
}
