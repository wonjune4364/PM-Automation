"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect, useCallback } from "react";
import { TRDFormData } from "../types";
import { useDraftStorage } from "@/hooks/useDraftStorage";
import { toast } from "@/components/ui/use-toast";

const SENSITIVE_DATA_CHOICES = [
  "None",
  "Basic Info",
  "Payment Info",
  "Highly Sensitive Info",
];

const EXTERNAL_INTEGRATIONS_CHOICES = [
  "None",
  "Social Login",
  "Payment Service",
  "Multiple External Services",
];

const BUDGET_SCHEDULE_CHOICES = [
  "No Constraints",
  "Fast Launch First",
  "Cost Efficiency First",
];

const DEFAULT_STATE = {
  projectName: "",
  overview: "",
  sensitiveData: "",
  externalIntegrations: "",
  budgetSchedule: "",
  additionalRequirements: "",
};

export function TRDForm({
  onSubmit,
}: {
  onSubmit: (data: TRDFormData) => void;
}) {
  const [projectName, setProjectName] = useState(DEFAULT_STATE.projectName);
  const [overview, setOverview] = useState(DEFAULT_STATE.overview);
  const [sensitiveData, setSensitiveData] = useState(DEFAULT_STATE.sensitiveData);
  const [externalIntegrations, setExternalIntegrations] = useState(DEFAULT_STATE.externalIntegrations);
  const [budgetSchedule, setBudgetSchedule] = useState(DEFAULT_STATE.budgetSchedule);
  const [additionalRequirements, setAdditionalRequirements] = useState(DEFAULT_STATE.additionalRequirements);

  const applyState = useCallback((data: typeof DEFAULT_STATE) => {
    setProjectName(data.projectName ?? "");
    setOverview(data.overview ?? "");
    setSensitiveData(data.sensitiveData ?? "");
    setExternalIntegrations(data.externalIntegrations ?? "");
    setBudgetSchedule(data.budgetSchedule ?? "");
    setAdditionalRequirements(data.additionalRequirements ?? "");
  }, []);

  const { save, clear } = useDraftStorage({
    docType: "trd",
    defaultValue: DEFAULT_STATE,
    onRestore: applyState,
    onRestoreToast: () =>
      toast({ title: "Draft restored", description: "Your previous TRD draft has been loaded." }),
  });

  useEffect(() => {
    save({ projectName, overview, sensitiveData, externalIntegrations, budgetSchedule, additionalRequirements });
  }, [projectName, overview, sensitiveData, externalIntegrations, budgetSchedule, additionalRequirements, save]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      projectName,
      overview,
      sensitiveData,
      externalIntegrations,
      budgetSchedule,
      additionalRequirements,
    });
  };

  const handleExampleInput = () => {
    setProjectName("Online Shopping Mall Service");
    setOverview(
      "B2C e-commerce platform including product search, cart, and checkout. Admins can register products, manage inventory, and manage orders."
    );
    setSensitiveData(
      "Payment Info - Must securely process credit card and personal info (name, address, phone)."
    );
    setExternalIntegrations(
      "Social Login, Payment Integration, SMS/Notification Service"
    );
    setBudgetSchedule("MVP launch within 3 months, budget under 30M KRW");
    setAdditionalRequirements(
      "Mobile responsive required, product image optimization, real-time inventory management"
    );
  };

  const handleClear = () => {
    clear();
    toast({ title: "Form reset", description: "Starting fresh." });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardContent className="pt-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="projectName">Project Name *</Label>
            <Input
              id="projectName"
              placeholder="e.g., AI Health Care App"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="overview">Project Overview *</Label>
            <Textarea
              id="overview"
              placeholder="Briefly describe the service and key features."
              value={overview}
              onChange={(e) => setOverview(e.target.value)}
              rows={4}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="sensitiveData">Sensitive Data Handling</Label>
            <Textarea
              id="sensitiveData"
              placeholder="Do you handle sensitive data (personal info, payment info) that needs special protection?"
              value={sensitiveData}
              onChange={(e) => setSensitiveData(e.target.value)}
              rows={3}
            />
            <div className="flex flex-wrap gap-2 mt-2">
              {SENSITIVE_DATA_CHOICES.map((choice) => (
                <Button
                  key={choice}
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setSensitiveData(choice)}
                  className="text-xs"
                >
                  {choice}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="externalIntegrations">External Integrations</Label>
            <Textarea
              id="externalIntegrations"
              placeholder="Are there other services that must be used with this service?
e.g., Social Login, SMS, Payment, etc."
              value={externalIntegrations}
              onChange={(e) => setExternalIntegrations(e.target.value)}
              rows={3}
            />
            <div className="flex flex-wrap gap-2 mt-2">
              {EXTERNAL_INTEGRATIONS_CHOICES.map((choice) => (
                <Button
                  key={choice}
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setExternalIntegrations(choice)}
                  className="text-xs"
                >
                  {choice}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="budgetSchedule">Budget and Schedule Constraints</Label>
            <Textarea
              id="budgetSchedule"
              placeholder="Are there any budget or deadline constraints?
It helps in choosing the most efficient technology and development scope.
e.g., Launch within 3 months, budget under 50M KRW"
              value={budgetSchedule}
              onChange={(e) => setBudgetSchedule(e.target.value)}
              rows={3}
            />
            <div className="flex flex-wrap gap-2 mt-2">
              {BUDGET_SCHEDULE_CHOICES.map((choice) => (
                <Button
                  key={choice}
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setBudgetSchedule(choice)}
                  className="text-xs"
                >
                  {choice}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="additionalRequirements">Additional Requirements</Label>
            <Textarea
              id="additionalRequirements"
              placeholder="Please list any additional requirements freely. Specifics are better.
e.g., specific feature behavior, design elements, platform support, etc."
              value={additionalRequirements}
              onChange={(e) => setAdditionalRequirements(e.target.value)}
              rows={4}
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <Button
              onClick={handleExampleInput}
              type="button"
              variant="outline"
              className="w-full"
            >
              Fill Example
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={handleClear}
            >
              Reset
            </Button>
            <Button type="submit" className="w-full">
              Generate/Copy Prompt
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
