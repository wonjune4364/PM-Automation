import { PrdPage } from "@/features/prd/page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "PRD Prompt Generator",
  description: "PRD Prompt Generator",
};

export default function PRDPage() {
  return <PrdPage />;
}
