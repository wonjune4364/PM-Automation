import { SpoidImageColorPage } from "@/features/spoid-image-color/page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Image Color Extractor",
  description: "Extract color information from a selected point on an uploaded image.",
};

export default function Page() {
  return <SpoidImageColorPage />;
}
