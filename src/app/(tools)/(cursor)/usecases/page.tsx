import { UsecasesPage } from "@/features/usecases/page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Usecases Prompt Generator",
  description: "Prompt Generator for creating usecases",
};

export default function Page() {
  return <UsecasesPage />;
}
