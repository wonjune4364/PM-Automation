"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useEffect, useCallback } from "react";
import { IAFormData, NavigationType, AuthType } from "../types";
import { useDraftStorage } from "@/hooks/useDraftStorage";
import { toast } from "@/components/ui/use-toast";

const NAVIGATION_TYPES: { value: NavigationType; label: string }[] = [
  { value: "sidebar", label: "Sidebar" },
  { value: "topbar", label: "Topbar" },
  { value: "sidebar, topbar", label: "Both" },
  { value: "none", label: "None" },
];

const AUTH_TYPES: { value: AuthType; label: string }[] = [
  { value: "required", label: "Login Required" },
  { value: "optional", label: "Available without Login" },
  { value: "none", label: "No Authentication" },
];

const DEFAULT_STATE = {
  navigationType: "sidebar" as NavigationType,
  authType: "required" as AuthType,
};

export function IAForm({ onSubmit }: { onSubmit: (data: IAFormData) => void }) {
  const [navigationType, setNavigationType] =
    useState<NavigationType>(DEFAULT_STATE.navigationType);
  const [authType, setAuthType] = useState<AuthType>(DEFAULT_STATE.authType);

  const applyState = useCallback((data: typeof DEFAULT_STATE) => {
    setNavigationType(data.navigationType ?? "sidebar");
    setAuthType(data.authType ?? "required");
  }, []);

  const { save, clear } = useDraftStorage({
    docType: "ia",
    defaultValue: DEFAULT_STATE,
    onRestore: applyState,
    onRestoreToast: () =>
      toast({ title: "Draft restored", description: "Your previous IA draft has been loaded." }),
  });

  useEffect(() => {
    save({ navigationType, authType });
  }, [navigationType, authType, save]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      navigationType,
      authType,
    });
  };

  const handleClear = () => {
    clear();
    toast({ title: "Form reset", description: "Starting fresh." });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card className="bg-gradient-to-br from-secondary/50 to-background">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4 text-muted-foreground">
            <div className="text-2xl bg-secondary/50 p-3 rounded-xl">🤔</div>
            <div className="space-y-2">
              <p className="font-semibold text-foreground">
                Wait! Have you created a PRD?
              </p>
              <p className="text-sm">
                Please create a PRD first for accurate IA creation.{" "}
                <Button
                  variant="link"
                  className="h-auto p-0 font-semibold"
                  asChild
                >
                  <Link
                    href="/prd"
                    className="text-primary hover:text-primary/80"
                  >
                    Go to create PRD →
                  </Link>
                </Button>
              </p>
              <p className="text-sm">
                Please write the PRD first, then paste it into the IA prompt as well.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="card-hover">
        <CardContent className="pt-6 space-y-6">
          <div className="space-y-3">
            <Label className="text-sm font-medium">Navigation Type</Label>
            <Select
              value={navigationType}
              onValueChange={(value) =>
                setNavigationType(value as NavigationType)
              }
            >
              <SelectTrigger className="input-focus bg-muted/50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {NAVIGATION_TYPES.map((type) => (
                  <SelectItem
                    key={type.value}
                    value={type.value}
                    className="focus:bg-primary/10"
                  >
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <Label className="text-sm font-medium">
              Authentication (Login, Sign-up) Status
            </Label>
            <Select
              value={authType}
              onValueChange={(value) => setAuthType(value as AuthType)}
            >
              <SelectTrigger className="input-focus bg-muted/50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {AUTH_TYPES.map((type) => (
                  <SelectItem
                    key={type.value}
                    value={type.value}
                    className="focus:bg-primary/10"
                  >
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={handleClear}
            >
              Reset
            </Button>
            <Button type="submit" className="w-full button-gradient">
              Generate/Copy Prompt
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
