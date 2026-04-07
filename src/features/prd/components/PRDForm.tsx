"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useEffect, useCallback } from "react";
import { PRDFormData, Platform, StorageType } from "../types";
import { useDraftStorage } from "@/hooks/useDraftStorage";
import { toast } from "@/components/ui/use-toast";

const PLATFORMS: { value: Platform; label: string }[] = [
  { value: "web", label: "Web" },
  { value: "android", label: "Android" },
  { value: "ios", label: "iOS" },
  { value: "desktop", label: "Desktop" },
  { value: "other", label: "Other" },
];

const STORAGE_TYPES: { value: StorageType; label: string }[] = [
  { value: "local(no-database)", label: "Local Storage" },
  { value: "database", label: "Database" },
];

const DEFAULT_STATE = {
  overview: "",
  reference: "",
  features: "",
  targetUsers: "",
  platforms: [] as Platform[],
  storageType: "local(no-database)" as StorageType,
  techStack: "",
  suggestFeatures: true,
};

export function PRDForm({
  onSubmit,
}: {
  onSubmit: (data: PRDFormData) => void;
}) {
  const [reference, setReference] = useState(DEFAULT_STATE.reference);
  const [features, setFeatures] = useState(DEFAULT_STATE.features);
  const [selectedPlatforms, setSelectedPlatforms] = useState<Platform[]>(DEFAULT_STATE.platforms);
  const [storageType, setStorageType] = useState<StorageType>(DEFAULT_STATE.storageType);
  const [overview, setOverview] = useState(DEFAULT_STATE.overview);
  const [targetUsers, setTargetUsers] = useState(DEFAULT_STATE.targetUsers);
  const [techStack, setTechStack] = useState(DEFAULT_STATE.techStack);
  const [suggestFeatures, setSuggestFeatures] = useState(DEFAULT_STATE.suggestFeatures);

  const applyState = useCallback((data: typeof DEFAULT_STATE) => {
    setOverview(data.overview ?? "");
    setReference(data.reference ?? "");
    setFeatures(data.features ?? "");
    setTargetUsers(data.targetUsers ?? "");
    setSelectedPlatforms(data.platforms ?? []);
    setStorageType(data.storageType ?? "local(no-database)");
    setTechStack(data.techStack ?? "");
    setSuggestFeatures(data.suggestFeatures ?? true);
  }, []);

  const { save, clear } = useDraftStorage({
    docType: "prd",
    defaultValue: DEFAULT_STATE,
    onRestore: applyState,
    onRestoreToast: () =>
      toast({ title: "Draft restored", description: "Your previous PRD draft has been loaded." }),
  });

  // Auto-save on every state change
  useEffect(() => {
    save({ overview, reference, features, targetUsers, platforms: selectedPlatforms, storageType, techStack, suggestFeatures });
  }, [overview, reference, features, targetUsers, selectedPlatforms, storageType, techStack, suggestFeatures, save]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      overview,
      reference,
      features: features.split("\n").filter(Boolean),
      targetUsers,
      platforms: selectedPlatforms,
      storageType,
      techStack,
      suggestFeatures,
    });
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
            <Label htmlFor="overview">Product Overview</Label>
            <Textarea
              id="overview"
              placeholder="Briefly describe the service or product."
              value={overview}
              onChange={(e) => setOverview(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Reference Service URL</Label>
            <Input
              placeholder="https://"
              value={reference}
              onChange={(e) => {
                setReference(e.target.value);
              }}
            />
          </div>

          <div className="space-y-2">
            <Label>Key Features</Label>
            <Textarea
              placeholder="List features to include (one per line)."
              value={features}
              onChange={(e) => setFeatures(e.target.value)}
              rows={5}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="targetUsers">Target Users</Label>
            <Textarea
              id="targetUsers"
              placeholder="Describe the expected user types (age, gender, job, etc.)."
              value={targetUsers}
              onChange={(e) => setTargetUsers(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Target Platform</Label>
            <div className="grid grid-cols-2 gap-4">
              {PLATFORMS.map((platform) => (
                <div
                  key={platform.value}
                  className="flex items-center space-x-2"
                >
                  <Checkbox
                    id={platform.value}
                    checked={selectedPlatforms.includes(platform.value)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedPlatforms([
                          ...selectedPlatforms,
                          platform.value,
                        ]);
                      } else {
                        setSelectedPlatforms(
                          selectedPlatforms.filter((p) => p !== platform.value)
                        );
                      }
                    }}
                  />
                  <Label htmlFor={platform.value}>{platform.label}</Label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Data Storage Method</Label>
            <Select
              value={storageType}
              onValueChange={(value) => setStorageType(value as StorageType)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {STORAGE_TYPES.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Tech Stack (Optional)</Label>
            <Textarea
              placeholder="e.g., Next.js, TypeScript, OpenAI (comma separated)"
              value={techStack}
              onChange={(e) => setTechStack(e.target.value)}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="suggestFeatures"
              checked={suggestFeatures}
              onCheckedChange={(checked) =>
                setSuggestFeatures(checked as boolean)
              }
            />
            <Label htmlFor="suggestFeatures">Would you like feature suggestions?</Label>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <Button
              onClick={() => {
                setOverview("AI Resume Analysis Service");
                setReference("");
                setFeatures(
                  "Login, Sign up\nResume Upload\nResume Analysis, Feedback by Section"
                );
                setTargetUsers("University Students in 20s");
                setSelectedPlatforms(["web"]);
                setStorageType("database");
                setTechStack("Next.js, Supabase, OpenAI");
                setSuggestFeatures(true);
              }}
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
