import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

interface PackageJsonFormProps {
  onSubmit: (packageJsonString: string) => void;
  isLoading: boolean;
}

export function PackageJsonForm({ onSubmit, isLoading }: PackageJsonFormProps) {
  const [packageJsonString, setPackageJsonString] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = () => {
    try {
      // Validate simple input
      if (!packageJsonString.trim()) {
        setError("Please enter the contents of package.json.");
        return;
      }

      // Validate JSON format
      JSON.parse(packageJsonString);

      // Clear errors
      setError(null);

      // Pass values to parent
      onSubmit(packageJsonString);
    } catch {
      setError(
        "Invalid JSON format. Please verify the package.json content."
      );
    }
  };

  const handlePaste = async () => {
    try {
      const clipboardText = await navigator.clipboard.readText();
      setPackageJsonString(clipboardText);
      setError(null);
    } catch {
      setError("Failed to read from clipboard.");
    }
  };

  const handleClear = () => {
    setPackageJsonString("");
    setError(null);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Input package.json</CardTitle>
        <CardDescription>
          Paste the content of your package.json file to generate an open source license document.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={handlePaste} type="button">
              Paste from Clipboard
            </Button>
            <Button variant="outline" onClick={handleClear} type="button">
              Clear
            </Button>
          </div>

          <Textarea
            placeholder="Paste package.json content here..."
            value={packageJsonString}
            onChange={(e) => setPackageJsonString(e.target.value)}
            className="min-h-[300px] font-mono text-sm"
          />

          {error && (
            <div className="bg-destructive/15 text-destructive p-3 rounded-md flex items-start gap-2">
              <AlertCircle className="h-4 w-4 mt-0.5" />
              <p className="text-sm">{error}</p>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleSubmit}
          disabled={isLoading || !packageJsonString.trim()}
          className="w-full"
        >
          {isLoading ? "Processing..." : "Generate License Document"}
        </Button>
      </CardFooter>
    </Card>
  );
}
