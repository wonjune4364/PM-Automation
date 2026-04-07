"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect, useCallback } from "react";
import { UsecaseFormData } from "../types";
import { useDraftStorage } from "@/hooks/useDraftStorage";
import { toast } from "@/components/ui/use-toast";

const DEFAULT_STATE = {
  systemName: "",
  actors: "",
  features: "",
  nonFunctionalRequirements: "",
};

export function UsecaseForm({
  onSubmit,
}: {
  onSubmit: (data: UsecaseFormData) => void;
}) {
  const [systemName, setSystemName] = useState(DEFAULT_STATE.systemName);
  const [actors, setActors] = useState(DEFAULT_STATE.actors);
  const [features, setFeatures] = useState(DEFAULT_STATE.features);
  const [nonFunctionalRequirements, setNonFunctionalRequirements] =
    useState(DEFAULT_STATE.nonFunctionalRequirements);

  const isValid = systemName.trim() !== "" && actors.trim() !== "" && features.trim() !== "";

  const applyState = useCallback((data: typeof DEFAULT_STATE) => {
    setSystemName(data.systemName ?? "");
    setActors(data.actors ?? "");
    setFeatures(data.features ?? "");
    setNonFunctionalRequirements(data.nonFunctionalRequirements ?? "");
  }, []);

  const { save, clear } = useDraftStorage({
    docType: "usecases",
    defaultValue: DEFAULT_STATE,
    onRestore: applyState,
    onRestoreToast: () =>
      toast({ title: "Draft restored", description: "Your previous Use Cases draft has been loaded." }),
  });

  useEffect(() => {
    save({ systemName, actors, features, nonFunctionalRequirements });
  }, [systemName, actors, features, nonFunctionalRequirements, save]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    onSubmit({
      systemName,
      actors,
      features,
      nonFunctionalRequirements,
    });
  };

  const handleFillExample = () => {
    setSystemName("Internet Banking System");
    setActors("Individual Customer\nCorporate Customer\nBank Staff\nSystem Administrator");
    setFeatures(
      "Login and Authentication\nAccount Inquiry\nFund Transfer\nTransaction History\nForeign Exchange\nLoan Application"
    );
    setNonFunctionalRequirements(
      "Response time within 3 seconds\n99.9% availability\nSupport 10,000 concurrent users\nFinancial security compliance"
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
            <Label htmlFor="systemName">System Name</Label>
            <Input
              id="systemName"
              placeholder="e.g., Internet Banking System"
              value={systemName}
              onChange={(e) => setSystemName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="actors">Actors</Label>
            <Textarea
              id="actors"
              placeholder={"Enter one actor per line.\ne.g.:\nIndividual Customer\nCorporate Customer\nSystem Administrator"}
              value={actors}
              onChange={(e) => setActors(e.target.value)}
              rows={4}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="features">Features</Label>
            <Textarea
              id="features"
              placeholder={"Enter one feature per line.\ne.g.:\nLogin and Authentication\nAccount Inquiry\nFund Transfer"}
              value={features}
              onChange={(e) => setFeatures(e.target.value)}
              rows={5}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="nonFunctionalRequirements">
              Non-Functional Requirements (Optional)
            </Label>
            <Textarea
              id="nonFunctionalRequirements"
              placeholder={"e.g.:\nResponse time within 3 seconds\n99.9% availability\nSecurity compliance"}
              value={nonFunctionalRequirements}
              onChange={(e) => setNonFunctionalRequirements(e.target.value)}
              rows={3}
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={handleFillExample}
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
            <Button type="submit" className="w-full" disabled={!isValid}>
              Generate/Copy Prompt
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
