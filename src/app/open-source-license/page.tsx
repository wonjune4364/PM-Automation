"use client";

import { useState } from "react";
import { PackageJsonForm } from "@/components/open-source-license/PackageJsonForm";
import { LicenseDocument } from "@/components/open-source-license/LicenseDocument";
import {
  parsePackageJson,
  fetchAllLicenseInfo,
  generateLicenseMarkdown,
} from "@/lib/license-utils";
import { LicenseInfo } from "@/types/license";
import { useToast } from "@/components/ui/use-toast";

export default function OpenSourceLicensePage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [licenseInfoList, setLicenseInfoList] = useState<LicenseInfo[]>([]);
  const [markdownContent, setMarkdownContent] = useState<string>("");
  const [showResults, setShowResults] = useState(false);

  const handleFormSubmit = async (packageJsonString: string) => {
    try {
      setIsLoading(true);

      // package.json 파싱
      const packages = parsePackageJson(packageJsonString);

      if (packages.length === 0) {
        toast({
          title: "Error",
          description: "Dependency packages not found.",
          variant: "destructive",
        });
        return;
      }

      // 라이선스 정보 조회
      const licenseInfoList = await fetchAllLicenseInfo(packages);
      setLicenseInfoList(licenseInfoList);

      // 마크다운 생성
      const markdown = generateLicenseMarkdown(licenseInfoList);
      setMarkdownContent(markdown);

      // 결과 표시
      setShowResults(true);
    } catch (error) {
      console.error("Error processing license info:", error);
      toast({
        title: "Error",
        description: "An error occurred while processing license information.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setShowResults(false);
    setLicenseInfoList([]);
    setMarkdownContent("");
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Open Source License Document Generator
        </h1>
        <p className="text-muted-foreground">
          Paste your package.json file to automatically generate an open source license document for your project.
        </p>
      </div>

      {!showResults ? (
        <PackageJsonForm onSubmit={handleFormSubmit} isLoading={isLoading} />
      ) : (
        <LicenseDocument
          licenseInfoList={licenseInfoList}
          markdownContent={markdownContent}
          onReset={handleReset}
        />
      )}
    </div>
  );
}
