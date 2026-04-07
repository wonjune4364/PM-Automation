import { PrivacyPolicyPage } from "@/features/privacy-policy/page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy Generator",
  description: "Draft and generate Privacy Policy step-by-step.",
};

export default function Page() {
  return <PrivacyPolicyPage />;
}
