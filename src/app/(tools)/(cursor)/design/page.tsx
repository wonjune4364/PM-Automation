import { DesignPage } from "@/features/design/page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Design Prompt Generator",
  description: "Prompt Generator for creating UI/UX design guides",
};

export default function Page() {
  return <DesignPage />;
}
