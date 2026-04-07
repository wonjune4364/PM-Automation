"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { PrivacyPolicyFormData } from "../types";

// 수집 항목 옵션
const REQUIRED_ITEMS = [
  { id: "email", label: "Email Address" },
  { id: "password", label: "Password" },
  { id: "name", label: "Name" },
  { id: "nickname", label: "Nickname" },
  { id: "birthdate", label: "Date of Birth" },
  { id: "phone", label: "Mobile Number" },
  { id: "address", label: "Address" },
];

const OPTIONAL_ITEMS = [
  { id: "gender", label: "Gender" },
  { id: "job", label: "Occupation" },
  { id: "company", label: "Company Name" },
  { id: "profile", label: "Profile Image" },
  { id: "interests", label: "Interests" },
];

// 수집 방법 옵션
const COLLECT_METHODS = [
  { id: "website", label: "Website Registration" },
  { id: "app", label: "Mobile App Registration" },
  { id: "email", label: "Email" },
  { id: "customer_service", label: "Customer Service Consultation" },
  { id: "board", label: "Board/Forum" },
  { id: "event", label: "Event Participation" },
];

// 이용 목적 옵션
const USAGE_PURPOSES = [
  { id: "service", label: "Service Provision and Contract Fulfillment" },
  { id: "improvement", label: "Service Improvement and New Service Development" },
  { id: "marketing", label: "Marketing and Advertisement" },
  { id: "event", label: "Events and Promotions Notifications" },
  { id: "statistics", label: "Demographic Analysis" },
  { id: "relationship", label: "User Relationship Building" },
];

export function PrivacyPolicyForm({
  onSubmit,
}: {
  onSubmit: (data: PrivacyPolicyFormData) => void;
}) {
  // 1. 서비스 제공자
  const [serviceName, setServiceName] = useState("");
  const [isFirstPolicy, setIsFirstPolicy] = useState(true);

  // 2. 수집할 개인정보
  const [requiredItems, setRequiredItems] = useState<string[]>([]);
  const [optionalItems, setOptionalItems] = useState<string[]>([]);
  const [customRequiredItems, setCustomRequiredItems] = useState("");
  const [customOptionalItems, setCustomOptionalItems] = useState("");

  // 3. 개인정보를 수집하는 방법
  const [collectMethods, setCollectMethods] = useState<string[]>([]);
  const [customCollectMethod, setCustomCollectMethod] = useState("");

  // 4. 개인정보의 이용 상황
  const [usagePurposes, setUsagePurposes] = useState<string[]>([]);
  const [customUsagePurpose, setCustomUsagePurpose] = useState("");

  // 5. 개인정보의 제3자 제공
  const [isProvidingToThirdParty, setIsProvidingToThirdParty] = useState(false);
  const [thirdPartyRecipient, setThirdPartyRecipient] = useState("");
  const [thirdPartyPurpose, setThirdPartyPurpose] = useState("");
  const [thirdPartyItems, setThirdPartyItems] = useState("");

  // 6. 개인정보의 처리 위탁
  const [isOutsourcing, setIsOutsourcing] = useState(false);
  const [outsourcingCompany, setOutsourcingCompany] = useState("");
  const [outsourcingScope, setOutsourcingScope] = useState("");

  // 7. 개인정보 보호 책임자 지정
  const [officerName, setOfficerName] = useState("");
  const [officerPosition, setOfficerPosition] = useState("");
  const [officerPhone, setOfficerPhone] = useState("");
  const [officerEmail, setOfficerEmail] = useState("");
  const [hasPrivacyManager, setHasPrivacyManager] = useState(false);
  const [hasPrivacyDepartment, setHasPrivacyDepartment] = useState(false);

  // 8. 수집된 개인정보의 관리 및 이용
  const [allowsUnder14, setAllowsUnder14] = useState(false);
  const [allowsWithdrawal, setAllowsWithdrawal] = useState(true);
  const [hasTechnicalProtection, setHasTechnicalProtection] = useState(true);
  const [notifiesDataBreach, setNotifiesDataBreach] = useState(true);
  const [hasOverseasTransfer, setHasOverseasTransfer] = useState(false);

  // 9. 시행일
  const [date, setDate] = useState<Date | undefined>(new Date());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      serviceName,
      isFirstPolicy,
      collectItems: {
        required: requiredItems,
        optional: optionalItems,
        customRequired: customRequiredItems,
        customOptional: customOptionalItems,
      },
      collectMethods,
      customCollectMethod,
      usagePurposes,
      customUsagePurpose,
      isProvidingToThirdParty,
      thirdPartyInfo: {
        recipient: thirdPartyRecipient,
        purpose: thirdPartyPurpose,
        items: thirdPartyItems,
      },
      isOutsourcing,
      outsourcingInfo: {
        company: outsourcingCompany,
        scope: outsourcingScope,
      },
      privacyOfficer: {
        name: officerName,
        position: officerPosition,
        phone: officerPhone,
        email: officerEmail,
      },
      hasPrivacyManager,
      hasPrivacyDepartment,
      allowsUnder14,
      allowsWithdrawal,
      hasTechnicalProtection,
      notifiesDataBreach,
      hasOverseasTransfer,
      effectiveDate: date ? format(date, "yyyy-MM-dd") : "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* 1. 서비스 제공자 */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <h2 className="text-xl font-bold">1. Service Provider</h2>

            <div className="space-y-2">
              <Label htmlFor="serviceName">Information & Communications Service Provider Name</Label>
              <Input
                id="serviceName"
                placeholder="e.g., Some Company Co., Ltd."
                value={serviceName}
                onChange={(e) => setServiceName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Policy Enactment Information</Label>
              <RadioGroup
                value={isFirstPolicy ? "first" : "existing"}
                onValueChange={(value) => setIsFirstPolicy(value === "first")}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="first" id="first" />
                  <Label htmlFor="first">Creating this policy for the first time</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="existing" id="existing" />
                  <Label htmlFor="existing">
                    Existing Privacy Policy exists
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 2. 수집할 개인정보 */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <h2 className="text-xl font-bold">2. Personal Information to Collect</h2>

            <div className="space-y-2">
              <Label>Required Items</Label>
              <div className="grid grid-cols-2 gap-2">
                {REQUIRED_ITEMS.map((item) => (
                  <div key={item.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`required-${item.id}`}
                      checked={requiredItems.includes(item.id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setRequiredItems([...requiredItems, item.id]);
                        } else {
                          setRequiredItems(
                            requiredItems.filter((i) => i !== item.id)
                          );
                        }
                      }}
                    />
                    <Label htmlFor={`required-${item.id}`}>{item.label}</Label>
                  </div>
                ))}
              </div>
              <div className="pt-2">
                <Label htmlFor="customRequiredItems">Other (Enter directly)</Label>
                <Textarea
                  id="customRequiredItems"
                  placeholder="Enter other required items (separated by comma)"
                  value={customRequiredItems}
                  onChange={(e) => setCustomRequiredItems(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Optional Items</Label>
              <div className="grid grid-cols-2 gap-2">
                {OPTIONAL_ITEMS.map((item) => (
                  <div key={item.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`optional-${item.id}`}
                      checked={optionalItems.includes(item.id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setOptionalItems([...optionalItems, item.id]);
                        } else {
                          setOptionalItems(
                            optionalItems.filter((i) => i !== item.id)
                          );
                        }
                      }}
                    />
                    <Label htmlFor={`optional-${item.id}`}>{item.label}</Label>
                  </div>
                ))}
              </div>
              <div className="pt-2">
                <Label htmlFor="customOptionalItems">Other (Enter directly)</Label>
                <Textarea
                  id="customOptionalItems"
                  placeholder="Enter other optional items (separated by comma)"
                  value={customOptionalItems}
                  onChange={(e) => setCustomOptionalItems(e.target.value)}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 3. 개인정보를 수집하는 방법 */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <h2 className="text-xl font-bold">3. Methods of Collection</h2>

            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-2">
                {COLLECT_METHODS.map((method) => (
                  <div key={method.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`method-${method.id}`}
                      checked={collectMethods.includes(method.id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setCollectMethods([...collectMethods, method.id]);
                        } else {
                          setCollectMethods(
                            collectMethods.filter((i) => i !== method.id)
                          );
                        }
                      }}
                    />
                    <Label htmlFor={`method-${method.id}`}>
                      {method.label}
                    </Label>
                  </div>
                ))}
              </div>
              <div className="pt-2">
                <Label htmlFor="customCollectMethod">Other (Enter directly)</Label>
                <Textarea
                  id="customCollectMethod"
                  placeholder="Enter other collection methods"
                  value={customCollectMethod}
                  onChange={(e) => setCustomCollectMethod(e.target.value)}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 4. 개인정보의 이용 상황 */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <h2 className="text-xl font-bold">4. Purpose of Collection and Use</h2>

            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-2">
                {USAGE_PURPOSES.map((purpose) => (
                  <div key={purpose.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`purpose-${purpose.id}`}
                      checked={usagePurposes.includes(purpose.id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setUsagePurposes([...usagePurposes, purpose.id]);
                        } else {
                          setUsagePurposes(
                            usagePurposes.filter((i) => i !== purpose.id)
                          );
                        }
                      }}
                    />
                    <Label htmlFor={`purpose-${purpose.id}`}>
                      {purpose.label}
                    </Label>
                  </div>
                ))}
              </div>
              <div className="pt-2">
                <Label htmlFor="customUsagePurpose">Other (Enter directly)</Label>
                <Textarea
                  id="customUsagePurpose"
                  placeholder="Enter other purposes"
                  value={customUsagePurpose}
                  onChange={(e) => setCustomUsagePurpose(e.target.value)}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 5. 개인정보의 제3자 제공 */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <h2 className="text-xl font-bold">5. Third-Party Provision of Personal Information</h2>

            <div className="space-y-2">
              <Label>Do you provide personal information to third parties?</Label>
              <RadioGroup
                value={isProvidingToThirdParty ? "yes" : "no"}
                onValueChange={(value) =>
                  setIsProvidingToThirdParty(value === "yes")
                }
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="provide-yes" />
                  <Label htmlFor="provide-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="provide-no" />
                  <Label htmlFor="provide-no">No</Label>
                </div>
              </RadioGroup>
            </div>

            {isProvidingToThirdParty && (
              <div className="space-y-4 pl-4 border-l-2 border-gray-200">
                <div className="space-y-2">
                  <Label htmlFor="thirdPartyRecipient">Recipient</Label>
                  <Input
                    id="thirdPartyRecipient"
                    placeholder="e.g., Partner Company Inc."
                    value={thirdPartyRecipient}
                    onChange={(e) => setThirdPartyRecipient(e.target.value)}
                    required={isProvidingToThirdParty}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="thirdPartyPurpose">Purpose of Provision</Label>
                  <Input
                    id="thirdPartyPurpose"
                    placeholder="e.g., Marketing use"
                    value={thirdPartyPurpose}
                    onChange={(e) => setThirdPartyPurpose(e.target.value)}
                    required={isProvidingToThirdParty}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="thirdPartyItems">Provided Items</Label>
                  <Input
                    id="thirdPartyItems"
                    placeholder="e.g., Name, Email, Mobile Number"
                    value={thirdPartyItems}
                    onChange={(e) => setThirdPartyItems(e.target.value)}
                    required={isProvidingToThirdParty}
                  />
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* 6. 개인정보의 처리 위탁 */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <h2 className="text-xl font-bold">6. Outsourcing of Personal Information Processing</h2>

            <div className="space-y-2">
              <Label>Do you outsource personal information processing to external parties?</Label>
              <RadioGroup
                value={isOutsourcing ? "yes" : "no"}
                onValueChange={(value) => setIsOutsourcing(value === "yes")}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="outsource-yes" />
                  <Label htmlFor="outsource-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="outsource-no" />
                  <Label htmlFor="outsource-no">No</Label>
                </div>
              </RadioGroup>
            </div>

            {isOutsourcing && (
              <div className="space-y-4 pl-4 border-l-2 border-gray-200">
                <div className="space-y-2">
                  <Label htmlFor="outsourcingCompany">Trustee Company Name</Label>
                  <Input
                    id="outsourcingCompany"
                    placeholder="e.g., Payment Gateway Inc."
                    value={outsourcingCompany}
                    onChange={(e) => setOutsourcingCompany(e.target.value)}
                    required={isOutsourcing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="outsourcingScope">Scope of Outsourcing</Label>
                  <Input
                    id="outsourcingScope"
                    placeholder="e.g., Payment processing, Identity verification"
                    value={outsourcingScope}
                    onChange={(e) => setOutsourcingScope(e.target.value)}
                    required={isOutsourcing}
                  />
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* 7. 개인정보 보호 책임자 지정 */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <h2 className="text-xl font-bold">7. Designation of Privacy Officer</h2>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="officerName">Name</Label>
                <Input
                  id="officerName"
                  placeholder="e.g., Hong Gil-dong"
                  value={officerName}
                  onChange={(e) => setOfficerName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="officerPosition">Position</Label>
                <Input
                  id="officerPosition"
                  placeholder="e.g., Director"
                  value={officerPosition}
                  onChange={(e) => setOfficerPosition(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="officerPhone">Phone Number</Label>
                <Input
                  id="officerPhone"
                  placeholder="e.g., 02-1234-5678"
                  value={officerPhone}
                  onChange={(e) => setOfficerPhone(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="officerEmail">Email</Label>
                <Input
                  id="officerEmail"
                  placeholder="e.g., privacy@example.com"
                  value={officerEmail}
                  onChange={(e) => setOfficerEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="hasPrivacyManager"
                  checked={hasPrivacyManager}
                  onCheckedChange={(checked) => setHasPrivacyManager(!!checked)}
                />
                <Label htmlFor="hasPrivacyManager">
                  Has a Privacy Officer
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="hasPrivacyDepartment"
                  checked={hasPrivacyDepartment}
                  onCheckedChange={(checked) =>
                    setHasPrivacyDepartment(!!checked)
                  }
                />
                <Label htmlFor="hasPrivacyDepartment">
                  Operates a Privacy Department
                </Label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 8. 수집된 개인정보의 관리 및 이용 */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <h2 className="text-xl font-bold">
              8. Management and Use of Collected Personal Information
            </h2>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="allowsUnder14"
                  checked={allowsUnder14}
                  onCheckedChange={(checked) => setAllowsUnder14(!!checked)}
                />
                <Label htmlFor="allowsUnder14">
                  Allow sign-up for children under 14
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="allowsWithdrawal"
                  checked={allowsWithdrawal}
                  onCheckedChange={(checked) => setAllowsWithdrawal(!!checked)}
                />
                <Label htmlFor="allowsWithdrawal">
                  Allow data inquiry and withdrawal of consent
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="hasTechnicalProtection"
                  checked={hasTechnicalProtection}
                  onCheckedChange={(checked) =>
                    setHasTechnicalProtection(!!checked)
                  }
                />
                <Label htmlFor="hasTechnicalProtection">
                  Establish technical/administrative protection measures
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="notifiesDataBreach"
                  checked={notifiesDataBreach}
                  onCheckedChange={(checked) =>
                    setNotifiesDataBreach(!!checked)
                  }
                />
                <Label htmlFor="notifiesDataBreach">
                  Notify/Report in case of personal information leakage
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="hasOverseasTransfer"
                  checked={hasOverseasTransfer}
                  onCheckedChange={(checked) =>
                    setHasOverseasTransfer(!!checked)
                  }
                />
                <Label htmlFor="hasOverseasTransfer">
                  Apply privacy protection clauses for overseas transfer
                </Label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 9. 시행일 */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <h2 className="text-xl font-bold">9. Effective Date</h2>

            <div className="space-y-2">
              <Label>Policy Effective Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP", { locale: ko }) : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    locale={ko}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </CardContent>
      </Card>

      <Button type="submit" className="w-full">
        Generate
      </Button>
    </form>
  );
}
