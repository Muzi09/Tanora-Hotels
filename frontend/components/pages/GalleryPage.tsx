"use client";
import React from "react";
import { usePageContent } from "@/lib/cms/pages";
import SectionEditWrapper from "@/components/section/SectionEditWrapper";
import ImageGallery from "@/components/ui/ImageGallery";

export default function GalleryPage() {
  const content = usePageContent("gallery");
  const images = content.gallery.images;

  const categories = content.gallery.categories;

  return (
    <>
      <main className="pt-24 pb-24 bg-surface min-h-screen px-4">
        <SectionEditWrapper sectionKey="gallery" sectionTitle="Gallery">
          <div className="max-w-[1440px] mx-auto reveal">
            <div className="text-center mb-16">
              <h1 className="text-5xl md:text-6xl font-display-lg text-primary mb-6">
                {content.gallery.heading}
              </h1>
              <div className="w-24 h-1 bg-secondary mx-auto mb-8"></div>
              <p className="text-lg text-on-surface-variant max-w-2xl mx-auto">
                {content.gallery.description}
              </p>
            </div>
            
            <ImageGallery images={images} categories={categories} />
          </div>
        </SectionEditWrapper>
      </main>
    </>
  );
}
