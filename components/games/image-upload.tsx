"use client";

import { PlusIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageUploadProps {
  label: string;
  className?: string;
}

export function ImageUpload({ label, className }: ImageUploadProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center p-4 border-2 border-dashed rounded-lg hover:bg-accent cursor-pointer",
        className
      )}
    >
      <PlusIcon className="h-6 w-6 mb-2" />
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
}