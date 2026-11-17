"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import MaterialIcon from "@/components/ui/MaterialIcon";
import { useAdmin } from "@/context/AdminContext";

interface ImageUploaderProps {
  label: string;
  url: string;
  alt?: string;
  onUrlChange: (url: string) => void;
  onAltChange?: (alt: string) => void;
  aspectRatio?: string;
}

export default function ImageUploader({
  label,
  url,
  alt = "",
  onUrlChange,
  onAltChange,
  aspectRatio = "aspect-[16/9]",
}: ImageUploaderProps) {
  const { uploadImage } = useAdmin();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const uploadedUrl = await uploadImage(file, alt || file.name);
      if (uploadedUrl) {
        onUrlChange(uploadedUrl);
      }
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <div className="space-y-2 p-3 bg-surface-container-low border border-surface-variant rounded-xl">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold text-primary uppercase tracking-wider">
          {label}
        </label>
        {url && (
          <button
            type="button"
            onClick={() => onUrlChange("")}
            className="text-[11px] text-red-500 hover:text-red-600 transition-colors"
          >
            Remove Image
          </button>
        )}
      </div>

      {/* Image Preview Container */}
      <div
        className={`relative ${aspectRatio} w-full rounded-lg overflow-hidden bg-black/5 border border-surface-variant/80 group flex items-center justify-center`}
      >
        {url ? (
          <>
            <Image
              src={url}
              alt={alt || label}
              fill
              unoptimized
              className="object-cover"
              sizes="(max-width: 600px) 100vw, 400px"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="px-3 py-1.5 rounded-full bg-white text-primary text-xs font-bold hover:bg-[#dcae5d] transition-colors shadow-md flex items-center gap-1 cursor-pointer"
              >
                <MaterialIcon name="file_upload" className="text-sm" />
                <span>Replace</span>
              </button>
            </div>
          </>
        ) : (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="flex flex-col items-center justify-center p-4 text-center cursor-pointer hover:bg-black/10 transition-colors w-full h-full"
          >
            <MaterialIcon
              name="add_photo_alternate"
              className="text-3xl text-on-surface-variant/40 mb-1"
            />
            <span className="text-xs text-on-surface-variant font-medium">
              Click to upload image
            </span>
            <span className="text-[10px] text-on-surface-variant/60">
              JPG, PNG, WebP up to 10MB
            </span>
          </div>
        )}

        {isUploading && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white text-xs font-medium gap-2">
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            <span>Uploading...</span>
          </div>
        )}
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Direct URL input */}
      <div className="pt-1">
        <label className="text-[11px] text-on-surface-variant block mb-1">
          Image URL or Path:
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={url}
            onChange={(e) => onUrlChange(e.target.value)}
            placeholder="/images/example.png or https://..."
            className="flex-1 text-xs px-2.5 py-1.5 rounded-lg border border-surface-variant bg-surface text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="px-2.5 py-1.5 rounded-lg bg-surface-container-high hover:bg-surface-variant text-xs text-primary border border-surface-variant transition-colors flex items-center gap-1 cursor-pointer"
            title="Browse from computer"
          >
            <MaterialIcon name="upload" className="text-sm" />
            <span>Upload</span>
          </button>
        </div>
      </div>

      {/* Alt text input */}
      {onAltChange && (
        <div className="pt-1">
          <label className="text-[11px] text-on-surface-variant block mb-1">
            Alt Text (for SEO & Accessibility):
          </label>
          <input
            type="text"
            value={alt}
            onChange={(e) => onAltChange(e.target.value)}
            placeholder="Descriptive image text"
            className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-surface-variant bg-surface text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
      )}
    </div>
  );
}
