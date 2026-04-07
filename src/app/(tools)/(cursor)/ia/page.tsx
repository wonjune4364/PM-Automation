import { IAPage } from "@/features/ia/page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "IA Prompt Generator",
  description: "Information Architecture Prompt Generator",
};

export default function Page() {
  return <IAPage />;
}
