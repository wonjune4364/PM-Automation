import { TableToJsonPage } from "@/features/table-to-json/page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "HTML Table to JSON Converter",
  description: "Convert HTML Table element to JSON.",
};

export default function Page() {
  return <TableToJsonPage />;
}
