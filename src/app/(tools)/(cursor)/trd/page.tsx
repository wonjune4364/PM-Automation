import { TrdPage } from "@/features/trd/page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "TRD Prompt Generator",
  description: "TRD Prompt Generator",
};

export default function TRDPage() {
  return <TrdPage />;
}
