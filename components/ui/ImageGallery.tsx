"use client";
import React, { useState } from "react";
import Image from "next/image";

interface ImageGalleryProps {
  images: { src: string; alt: string; category?: string }[];
  categories?: string[];
}

export default function ImageGallery({ images, categories }: ImageGalleryProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const filteredImages =
    activeCategory === "All"
      ? images
      : images.filter((img) => img.category === activeCategory);

  return (
    <div className="w-full">
      {categories && categories.length > 0 && (
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          <button
            onClick={() => setActiveCategory("All")}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
              activeCategory === "All"
                ? "bg-primary text-white"
                : "bg-surface text-on-surface hover:bg-surface-variant"
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat
                  ? "bg-primary text-white"
                  : "bg-surface text-on-surface hover:bg-surface-variant"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredImages.map((img, idx) => (
          <div
            key={idx}
            className="relative aspect-square overflow-hidden rounded-xl cursor-pointer group"
            onClick={() => setLightboxImage(img.src)}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <span className="material-symbols-outlined text-white text-4xl">
                zoom_in
              </span>
            </div>
          </div>
        ))}
      </div>

      {lightboxImage && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 cursor-zoom-out"
          onClick={() => setLightboxImage(null)}
        >
          <div className="relative w-full max-w-5xl aspect-video">
            <Image
              src={lightboxImage}
              alt="Fullscreen view"
              fill
              className="object-contain"
            />
          </div>
          <button
            className="absolute top-6 right-6 text-white bg-black/50 p-2 rounded-full hover:bg-white hover:text-black transition-colors"
            onClick={() => setLightboxImage(null)}
          >
            <span className="material-symbols-outlined text-3xl">close</span>
          </button>
        </div>
      )}
    </div>
  );
}
