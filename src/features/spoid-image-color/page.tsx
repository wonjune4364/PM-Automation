"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { DialogHeader, DialogFooter } from "@/components/ui/dialog";
import { Dialog, DialogContent, DialogTitle } from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { ImageColorPicker } from "./ImageColorPicker";

export function SpoidImageColorPage() {
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [recentImages, setRecentImages] = useState<string[]>([]);
  const [selectedImageUrl, setSelectedImageUrl] = useState<string>("");

  useEffect(() => {
    const saved = localStorage.getItem("recentImages");
    if (saved) {
      setRecentImages(JSON.parse(saved));
    }
  }, []);

  const handleImageAdded = (imageUrl: string) => {
    // 이미지가 이미 존재하는 경우 기존 이미지 제거
    const filteredImages = recentImages.filter((img) => img !== imageUrl);

    // 새 이미지를 맨 앞에 추가하고 최대 5개까지만 유지
    const newImages = [imageUrl, ...filteredImages].slice(0, 5);
    setRecentImages(newImages);
    localStorage.setItem("recentImages", JSON.stringify(newImages));
  };

  const handleRemoveImage = (imageToRemove: string) => {
    const newImages = recentImages.filter((img) => img !== imageToRemove);
    setRecentImages(newImages);
    localStorage.setItem("recentImages", JSON.stringify(newImages));

    // 현재 선택된 이미지가 삭제되는 경우 선택 해제
    if (selectedImageUrl === imageToRemove) {
      setSelectedImageUrl("");
    }
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center w-full max-w-4xl">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-2xl font-bold text-center">Image Color Extractor</h1>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsHelpOpen(true)}
          >
            How to Use
          </Button>
        </div>

        <ImageColorPicker
          onImageAdded={handleImageAdded}
          selectedImageUrl={selectedImageUrl}
        />

        {recentImages.length > 0 && (
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="text-base">Recent Images</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4 overflow-x-auto pb-2">
                {recentImages.map((image, index) => (
                  <div
                    key={index}
                    className="relative flex-shrink-0 w-20 h-20 group"
                  >
                    <div
                      className="w-full h-full rounded-md overflow-hidden border cursor-pointer hover:opacity-80 transition-opacity"
                      onClick={() => setSelectedImageUrl(image)}
                    >
                      <img
                        src={image}
                        alt={`Recent image ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <Button
                      variant="secondary"
                      size="icon"
                      className="absolute -top-2 -right-2 w-6 h-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveImage(image);
                      }}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <Dialog open={isHelpOpen} onOpenChange={setIsHelpOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>How to use Image Color Extractor</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <p>1. Drag and drop or select an image to upload.</p>
              <p>
                2. Once loaded, click on the spot where you want to extract color.
              </p>
              <p>
                3. The color info of the selected spot is displayed in HEX, RGB, HSL.
              </p>
              <p>4. Click the color code to copy to clipboard.</p>
            </div>
            <DialogFooter className="mt-6">
              <Button onClick={() => setIsHelpOpen(false)}>Confirm</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}
