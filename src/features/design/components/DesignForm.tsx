"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useEffect, useCallback } from "react";
import { DesignFormData, DesignStyle, ColorScheme } from "../types";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { HexColorPicker } from "react-colorful";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useDraftStorage } from "@/hooks/useDraftStorage";
import { toast } from "@/components/ui/use-toast";

const DESIGN_STYLES: { value: DesignStyle; label: string }[] = [
  { value: "minimal", label: "Minimal" },
  { value: "modern", label: "Modern" },
  { value: "classic", label: "Classic" },
  { value: "playful", label: "Playful (Games, etc.)" },
  { value: "luxury", label: "Luxury" },
  { value: "tech", label: "Tech" },
];

const COLOR_SCHEMES: {
  value: ColorScheme;
  label: string;
  recommend?: boolean;
}[] = [
  { value: "monochrome", label: "Monochrome" },
  { value: "analogous", label: "Analogous" },
  { value: "complementary", label: "Complementary", recommend: true },
  { value: "triadic", label: "Triadic" },
];

const DEFAULT_STATE = {
  designStyle: "modern" as DesignStyle,
  colorScheme: "monochrome" as ColorScheme,
  primaryColor: "",
  moodKeywords: "",
  references: "",
  themeDetailType: "manual" as "auto" | "manual",
};

export function DesignForm({
  onSubmit,
}: {
  onSubmit: (data: DesignFormData) => void;
}) {
  const [designStyle, setDesignStyle] = useState<DesignStyle>(DEFAULT_STATE.designStyle);
  const [colorScheme, setColorScheme] = useState<ColorScheme>(DEFAULT_STATE.colorScheme);
  const [primaryColor, setPrimaryColor] = useState(DEFAULT_STATE.primaryColor);
  const [moodKeywords, setMoodKeywords] = useState(DEFAULT_STATE.moodKeywords);
  const [references, setReferences] = useState(DEFAULT_STATE.references);
  const [themeDetailType, setThemeDetailType] = useState<"auto" | "manual">(DEFAULT_STATE.themeDetailType);

  const applyState = useCallback((data: typeof DEFAULT_STATE) => {
    setDesignStyle(data.designStyle ?? "modern");
    setColorScheme(data.colorScheme ?? "monochrome");
    setPrimaryColor(data.primaryColor ?? "");
    setMoodKeywords(data.moodKeywords ?? "");
    setReferences(data.references ?? "");
    setThemeDetailType(data.themeDetailType ?? "manual");
  }, []);

  const { save, clear } = useDraftStorage({
    docType: "design",
    defaultValue: DEFAULT_STATE,
    onRestore: applyState,
    onRestoreToast: () =>
      toast({ title: "Draft restored", description: "Your previous Design draft has been loaded." }),
  });

  useEffect(() => {
    save({ designStyle, colorScheme, primaryColor, moodKeywords, references, themeDetailType });
  }, [designStyle, colorScheme, primaryColor, moodKeywords, references, themeDetailType, save]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      designStyle,
      colorScheme,
      primaryColor,
      moodKeywords,
      references,
      themeDetailType,
    });
  };

  const handleClear = () => {
    clear();
    toast({ title: "Form reset", description: "Starting fresh." });
  };

  const isThemeDetailDisabled = themeDetailType === "auto";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardContent className="pt-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="references">Reference Design Services</Label>
            <Input
              id="references"
              value={references}
              onChange={(e) => setReferences(e.target.value)}
              placeholder="Please mention design services you'd like to reference"
              required={isThemeDetailDisabled}
            />
          </div>

          <div className="space-y-2">
            <Label>Theme Detail Settings</Label>
            <RadioGroup
              value={themeDetailType}
              onValueChange={(value: "auto" | "manual") => {
                setThemeDetailType(value);
                if (value === "auto") {
                  setDesignStyle("modern");
                  setPrimaryColor("");
                  setColorScheme("monochrome");
                  setMoodKeywords("");
                }
              }}
              className="flex flex-col space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="auto" id="auto" />
                <Label htmlFor="auto">
                  Auto-configure based on reference services
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="manual" id="manual" />
                <Label htmlFor="manual">Configure manually</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label>Design Style</Label>
            <Select
              value={designStyle}
              onValueChange={(value) => setDesignStyle(value as DesignStyle)}
              disabled={isThemeDetailDisabled}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {DESIGN_STYLES.map((style) => (
                  <SelectItem key={style.value} value={style.value}>
                    {style.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Primary Color</Label>
            <div className="flex gap-2">
              <Input
                value={primaryColor}
                onChange={(e) => setPrimaryColor(e.target.value)}
                placeholder="HEX Color Code (#FFFFFF)"
                disabled={isThemeDetailDisabled}
              />
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-[60px] h-[40px] p-0"
                    style={{ backgroundColor: primaryColor || "#ffffff" }}
                    disabled={isThemeDetailDisabled}
                  >
                    <span className="sr-only">Select Color</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-3">
                  <HexColorPicker
                    color={primaryColor || "#ffffff"}
                    onChange={setPrimaryColor}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Color Scheme</Label>
            <Select
              value={colorScheme}
              onValueChange={(value) => setColorScheme(value as ColorScheme)}
              disabled={isThemeDetailDisabled}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {COLOR_SCHEMES.map((scheme) => (
                  <SelectItem key={scheme.value} value={scheme.value}>
                    {scheme.label}
                    {scheme.recommend && (
                      <span className="text-xs bg-accent text-white py-1 px-2 rounded-sm ml-2">
                        Recommended
                      </span>
                    )}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="moodKeywords">Mood Keywords</Label>
            <Textarea
              id="moodKeywords"
              value={moodKeywords}
              onChange={(e) => setMoodKeywords(e.target.value)}
              placeholder="Enter keywords expressing the design mood (one per line)"
              required={!isThemeDetailDisabled}
              disabled={isThemeDetailDisabled}
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setDesignStyle("modern");
                setColorScheme("monochrome");
                setPrimaryColor("#3182F6");
                setMoodKeywords("Professional\nTrustworthy\nClean");
                setReferences("");
                setThemeDetailType("manual");
              }}
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
            <Button type="submit">Generate/Copy Prompt</Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
