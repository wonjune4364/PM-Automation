import { GenerateColorPalettePage } from "@/features/generate-color-palette/page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Color Palette Generator",
  description:
    "Generate 100~900 color palettes from hex, hsl, rgb, oklch codes.",
};

export default function Page() {
  return <GenerateColorPalettePage />;
}
