"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { TableToJsonConverter } from "./TableToJsonConverter";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

export function TableToJsonPage() {
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center w-full max-w-4xl">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-2xl font-bold text-center">
            HTML Table to JSON Converter
          </h1>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsHelpOpen(true)}
          >
            How to copy table
          </Button>
        </div>

        <TableToJsonConverter />

        <Dialog open={isHelpOpen} onOpenChange={setIsHelpOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>How to copy HTML table</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <p>1. Find the table you want to convert on a webpage.</p>
              <p>
                2. Right-click the table and select &quot;Inspect&quot; or &quot;Inspect Element&quot;.
              </p>
              <p>
                3. Find the <code>&lt;table&gt;</code> element in Developer Tools.
              </p>
              <p>
                4. Right-click the table tag and select &quot;Copy&quot; → &quot;Copy
                element&quot;.
              </p>
              <p>5. Paste the copied HTML into the input box here.</p>
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
