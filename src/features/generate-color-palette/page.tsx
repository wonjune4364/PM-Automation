"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ColorPaletteGenerator } from "./components/ColorPaletteGenerator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

export function GenerateColorPalettePage() {
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center w-full max-w-4xl">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-2xl font-bold text-center">Color Palette Generator</h1>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsHelpOpen(true)}
          >
            How to Use
          </Button>
        </div>

        <ColorPaletteGenerator />

        <Dialog open={isHelpOpen} onOpenChange={setIsHelpOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>How to Generate Color Palette</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <p>1. Select the desired color format (HEX, RGB, HSL).</p>
              <p>2. Enter the base color.</p>
              <p>3. Select the lightness of the input color (100~900).</p>
              <p>
                4. Click the Generate Palette button to automatically generate the palette.
              </p>
              <p>5. You can copy the generated palette in your desired format.</p>
            </div>
            <DialogFooter className="mt-6">
              <Button onClick={() => setIsHelpOpen(false)}>Confirm</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}
