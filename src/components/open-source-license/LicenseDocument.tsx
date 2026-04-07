import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LicenseInfo } from "@/types/license";
import { LicenseTable } from "./LicenseTable";
import { useToast } from "@/components/ui/use-toast";
import { Check, Download, Copy } from "lucide-react";

interface LicenseDocumentProps {
  licenseInfoList: LicenseInfo[];
  markdownContent: string;
  onReset: () => void;
}

export function LicenseDocument({
  licenseInfoList,
  markdownContent,
  onReset,
}: LicenseDocumentProps) {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<string>("table");
  const [copied, setCopied] = useState(false);
  const [reactCodeCopied, setReactCodeCopied] = useState(false);
  const [htmlCodeCopied, setHtmlCodeCopied] = useState(false);

  // 프로덕션 의존성과 개발 의존성 분리
  const prodDependencies = licenseInfoList.filter((pkg) => !pkg.isDev);
  const devDependencies = licenseInfoList.filter((pkg) => pkg.isDev);

  // 라이선스 정보를 HTML 코드로 변환하는 함수
  const generateHtmlCode = (): string => {
    // Production dependencies HTML
    const prodDependenciesHtml =
      prodDependencies.length > 0
        ? `<!-- Production Dependencies -->
<div style="margin-bottom: 2rem;">
  <h3 style="font-size: 1.125rem; font-weight: 600; margin-bottom: 1rem;">Production Dependencies</h3>
  <div style="overflow-x: auto;">
    <table style="width: 100%; border-collapse: collapse;">
      <thead>
        <tr style="background-color: #f3f4f6;">
          <th style="padding: 0.5rem 1rem; text-align: left; border: 1px solid #e5e7eb;">Package</th>
          <th style="padding: 0.5rem 1rem; text-align: left; border: 1px solid #e5e7eb;">Version</th>
          <th style="padding: 0.5rem 1rem; text-align: left; border: 1px solid #e5e7eb;">License</th>
        </tr>
      </thead>
      <tbody>
        ${prodDependencies
          .map(
            (pkg) => `
        <tr style="border-bottom: 1px solid #e5e7eb;">
          <td style="padding: 0.5rem 1rem; border: 1px solid #e5e7eb;">${pkg.name}</td>
          <td style="padding: 0.5rem 1rem; border: 1px solid #e5e7eb;">${pkg.version}</td>
          <td style="padding: 0.5rem 1rem; border: 1px solid #e5e7eb;">${pkg.license}</td>
        </tr>`
          )
          .join("")}
      </tbody>
    </table>
  </div>
</div>`
        : "";

    // Development dependencies HTML
    const devDependenciesHtml =
      devDependencies.length > 0
        ? `<!-- Development Dependencies -->
<div>
  <h3 style="font-size: 1.125rem; font-weight: 600; margin-bottom: 1rem;">Development Dependencies</h3>
  <div style="overflow-x: auto;">
    <table style="width: 100%; border-collapse: collapse;">
      <thead>
        <tr style="background-color: #f3f4f6;">
          <th style="padding: 0.5rem 1rem; text-align: left; border: 1px solid #e5e7eb;">Package</th>
          <th style="padding: 0.5rem 1rem; text-align: left; border: 1px solid #e5e7eb;">Version</th>
          <th style="padding: 0.5rem 1rem; text-align: left; border: 1px solid #e5e7eb;">License</th>
        </tr>
      </thead>
      <tbody>
        ${devDependencies
          .map(
            (pkg) => `
        <tr style="border-bottom: 1px solid #e5e7eb;">
          <td style="padding: 0.5rem 1rem; border: 1px solid #e5e7eb;">${pkg.name}</td>
          <td style="padding: 0.5rem 1rem; border: 1px solid #e5e7eb;">${pkg.version}</td>
          <td style="padding: 0.5rem 1rem; border: 1px solid #e5e7eb;">${pkg.license}</td>
        </tr>`
          )
          .join("")}
      </tbody>
    </table>
  </div>
</div>`
        : "";

    // Full HTML document
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Open Source Licenses</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      line-height: 1.5;
      color: #333;
      max-width: 1000px;
      margin: 0 auto;
      padding: 2rem;
    }
    h2 {
      font-size: 1.5rem;
      font-weight: 700;
      margin-bottom: 1.5rem;
      text-align: center;
    }
    @media (prefers-color-scheme: dark) {
      body {
        background-color: #1a1a1a;
        color: #f3f4f6;
      }
      table, th, td {
        border-color: #4b5563;
      }
      tr {
        background-color: #2d3748;
      }
    }
  </style>
</head>
<body>
  <h2>Open Source Licenses</h2>
  
  ${prodDependenciesHtml}
  
  ${devDependenciesHtml}
</body>
</html>`;
  };

  // 라이선스 정보를 React JSX 코드로 변환
  const generateReactJSX = (): string => {
    // Production dependencies JSX
    const prodDependenciesJSX =
      prodDependencies.length > 0
        ? `{/* Production Dependencies */}
<div className="mb-8">
  <h3 className="text-lg font-semibold mb-4">Production Dependencies</h3>
  <div className="overflow-x-auto">
    <table className="w-full border-collapse">
      <thead>
        <tr className="bg-gray-100 dark:bg-gray-800">
          <th className="px-4 py-2 text-left border border-gray-300 dark:border-gray-700">Package</th>
          <th className="px-4 py-2 text-left border border-gray-300 dark:border-gray-700">Version</th>
          <th className="px-4 py-2 text-left border border-gray-300 dark:border-gray-700">License</th>
        </tr>
      </thead>
      <tbody>
        ${prodDependencies
          .map(
            (pkg) => `
        <tr key="${pkg.name}" className="border-b border-gray-300 dark:border-gray-700">
          <td className="px-4 py-2 border border-gray-300 dark:border-gray-700">${pkg.name}</td>
          <td className="px-4 py-2 border border-gray-300 dark:border-gray-700">${pkg.version}</td>
          <td className="px-4 py-2 border border-gray-300 dark:border-gray-700">${pkg.license}</td>
        </tr>`
          )
          .join("")}
      </tbody>
    </table>
  </div>
</div>`
        : "";

    // Development dependencies JSX
    const devDependenciesJSX =
      devDependencies.length > 0
        ? `{/* Development Dependencies */}
<div>
  <h3 className="text-lg font-semibold mb-4">Development Dependencies</h3>
  <div className="overflow-x-auto">
    <table className="w-full border-collapse">
      <thead>
        <tr className="bg-gray-100 dark:bg-gray-800">
          <th className="px-4 py-2 text-left border border-gray-300 dark:border-gray-700">Package</th>
          <th className="px-4 py-2 text-left border border-gray-300 dark:border-gray-700">Version</th>
          <th className="px-4 py-2 text-left border border-gray-300 dark:border-gray-700">License</th>
        </tr>
      </thead>
      <tbody>
        ${devDependencies
          .map(
            (pkg) => `
        <tr key="${pkg.name}" className="border-b border-gray-300 dark:border-gray-700">
          <td className="px-4 py-2 border border-gray-300 dark:border-gray-700">${pkg.name}</td>
          <td className="px-4 py-2 border border-gray-300 dark:border-gray-700">${pkg.version}</td>
          <td className="px-4 py-2 border border-gray-300 dark:border-gray-700">${pkg.license}</td>
        </tr>`
          )
          .join("")}
      </tbody>
    </table>
  </div>
</div>`
        : "";

    // Full component JSX
    return `import React from 'react';

export function OpenSourceLicenses() {
  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Open Source Licenses</h2>
      
      ${prodDependenciesJSX}
      
      ${devDependenciesJSX}
    </div>
  );
}`;
  };

  const htmlContent = generateHtmlCode();
  const reactJSXCode = generateReactJSX();

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(markdownContent);
      setCopied(true);
      toast({
        title: "Copied",
        description: "License document copied to clipboard.",
      });

      // Reset copied state after 3 seconds
      setTimeout(() => setCopied(false), 3000);
    } catch {
      toast({
        title: "Copy Failed",
        description: "Failed to copy to clipboard.",
        variant: "destructive",
      });
    }
  };

  const handleCopyReactCode = async () => {
    try {
      await navigator.clipboard.writeText(reactJSXCode);
      setReactCodeCopied(true);
      toast({
        title: "Copied",
        description: "React JSX code copied to clipboard.",
      });

      // Reset copied state after 3 seconds
      setTimeout(() => setReactCodeCopied(false), 3000);
    } catch {
      toast({
        title: "Copy Failed",
        description: "Failed to copy to clipboard.",
        variant: "destructive",
      });
    }
  };

  const handleCopyHtmlCode = async () => {
    try {
      await navigator.clipboard.writeText(htmlContent);
      setHtmlCodeCopied(true);
      toast({
        title: "Copied",
        description: "HTML code copied to clipboard.",
      });

      // Reset copied state after 3 seconds
      setTimeout(() => setHtmlCodeCopied(false), 3000);
    } catch {
      toast({
        title: "Copy Failed",
        description: "Failed to copy to clipboard.",
        variant: "destructive",
      });
    }
  };

  const handleDownload = () => {
    const blob = new Blob([markdownContent], {
      type: "text/markdown;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "오픈소스라이선스.md";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Download Complete",
      description: "License document downloaded.",
    });
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Open Source License Document</CardTitle>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            onClick={handleCopyToClipboard}
            className="flex items-center gap-1"
          >
            {copied ? <Check className="h-4 w-4" /> : null}
            Copy to Clipboard
          </Button>
          <Button onClick={handleDownload} className="flex items-center gap-1">
            <Download className="h-4 w-4" />
            Download
          </Button>
          <Button variant="secondary" onClick={onReset}>
            Reset
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs
          defaultValue="table"
          value={activeTab}
          onValueChange={setActiveTab}
        >
          <TabsList className="mb-4">
            <TabsTrigger value="table">Table</TabsTrigger>
            <TabsTrigger value="markdown">Markdown</TabsTrigger>
            <TabsTrigger value="html">HTML</TabsTrigger>
            <TabsTrigger value="react">React</TabsTrigger>
          </TabsList>

          <TabsContent value="table" className="space-y-6">
            {prodDependencies.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Production Dependencies</h3>
                <LicenseTable licenseInfoList={prodDependencies} />
              </div>
            )}

            {devDependencies.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Development Dependencies</h3>
                <LicenseTable licenseInfoList={devDependencies} />
              </div>
            )}
          </TabsContent>

          <TabsContent value="markdown">
            <div className="bg-muted p-4 rounded-md">
              <pre className="whitespace-pre-wrap text-sm font-mono overflow-auto max-h-[500px]">
                {markdownContent}
              </pre>
            </div>
          </TabsContent>

          <TabsContent value="html">
            <div className="flex justify-end mb-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopyHtmlCode}
                className="flex items-center gap-1"
              >
                {htmlCodeCopied ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
                Copy HTML Code
              </Button>
            </div>
            <div className="bg-muted p-4 rounded-md">
              <pre className="whitespace-pre-wrap text-sm font-mono overflow-auto max-h-[500px]">
                {htmlContent}
              </pre>
            </div>
          </TabsContent>

          <TabsContent value="react">
            <div className="flex justify-end mb-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopyReactCode}
                className="flex items-center gap-1"
              >
                {reactCodeCopied ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
                Copy JSX Code
              </Button>
            </div>
            <div className="bg-muted p-4 rounded-md">
              <pre className="whitespace-pre-wrap text-sm font-mono overflow-auto max-h-[500px]">
                {reactJSXCode}
              </pre>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
