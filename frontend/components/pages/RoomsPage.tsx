"use client";
import React from "react";
import { usePageContent } from "@/lib/cms/pages";
import SectionEditWrapper from "@/components/section/SectionEditWrapper";
import Image from "next/image";
import Link from "@/components/cms/CmsLink";
import MaterialIcon from "@/components/ui/MaterialIcon";
import ImageGallery from "@/components/ui/ImageGallery";
export default function RoomsPage() {
  const content = usePageContent("rooms");
  return (
    <>
      <main className="pt-16">

        {/* HERO BANNER */}
        <SectionEditWrapper sectionKey="heroBanner" sectionTitle="Hero Banner">
          <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center text-center px-4">
            <Image
              src={content.heroBanner.image}
              alt={content.heroBanner.alt}
              fill
              className="object-cover parallax-bg"
              priority
            />
            <div className="absolute inset-0 bg-black/60" />
            <div className="relative z-10 reveal">
              <h2 className="text-sm md:text-base font-bold text-secondary uppercase tracking-[0.3em] mb-4">
                {content.heroBanner.heading}
              </h2>
              <h1 className="text-5xl md:text-6xl font-display-lg text-white mb-4">
                {content.heroBanner.heading2}
              </h1>
              <div className="w-24 h-1 bg-secondary mx-auto mb-6"></div>
              <p className="text-lg text-white/90 max-w-2xl mx-auto leading-relaxed">
                {content.heroBanner.description}
              </p>
            </div>
          </section>
        </SectionEditWrapper>

        {/* STANDARD ROOM */}
        <SectionEditWrapper sectionKey="standardRoom" sectionTitle="Standard Room">
          <section className="py-24 bg-surface px-4">
            <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row gap-16 items-center reveal">
              <div className="lg:w-1/2 w-full">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                  <Image src={content.standardRoom.image} alt={content.standardRoom.alt} fill className="object-cover" />
                </div>
              </div>
              <div className="lg:w-1/2 w-full">
                <h2 className="text-4xl md:text-5xl font-display-lg text-primary mb-6">
                  {content.standardRoom.heading}
              </h2>
                <p className="text-lg text-on-surface-variant mb-8 leading-relaxed">
                  {content.standardRoom.description}
              </p>
  
                <div className="grid grid-cols-2 gap-y-4 gap-x-6 mb-10">
                  {content.standardRoom.items.map((amenity, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <MaterialIcon name={content.standardRoom.icon} className="text-secondary" />
                      <span className="text-on-surface-variant font-medium text-sm md:text-base">{amenity}</span>
                    </div>
                  ))}
                </div>
  
                <Link
                  href={content.standardRoom.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-10 py-4 bg-primary text-white font-bold tracking-widest uppercase rounded-full hover:bg-secondary transition-colors duration-300 shadow-lg cursor-pointer"
                >
                  {content.standardRoom.buttonText}</Link>
              </div>
            </div>
          </section>
        </SectionEditWrapper>

        {/* EXECUTIVE SUITE */}
        <SectionEditWrapper sectionKey="executiveSuite" sectionTitle="Executive Suite">
          <section className="py-24 bg-surface-container-low px-4">
            <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row-reverse gap-16 items-center reveal">
              <div className="lg:w-1/2 w-full">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                  <Image src={content.executiveSuite.image} alt={content.executiveSuite.alt} fill className="object-cover" />
                </div>
              </div>
              <div className="lg:w-1/2 w-full">
                <h2 className="text-4xl md:text-5xl font-display-lg text-primary mb-6">
                  {content.executiveSuite.heading}
              </h2>
                <p className="text-lg text-on-surface-variant mb-8 leading-relaxed">
                  {content.executiveSuite.description}
              </p>
  
                <div className="grid grid-cols-2 gap-y-4 gap-x-6 mb-10">
                  {content.executiveSuite.items.map((amenity, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <MaterialIcon name={content.executiveSuite.icon} className="text-secondary" />
                      <span className="text-on-surface-variant font-medium text-sm md:text-base">{amenity}</span>
                    </div>
                  ))}
                </div>
  
                <Link
                  href={content.executiveSuite.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-10 py-4 bg-primary text-white font-bold tracking-widest uppercase rounded-full hover:bg-secondary transition-colors duration-300 shadow-lg cursor-pointer"
                >
                  {content.executiveSuite.buttonText}</Link>
              </div>
            </div>
          </section>
        </SectionEditWrapper>

        {/* ROOM GALLERY */}
        <SectionEditWrapper sectionKey="roomGallery" sectionTitle="Room Gallery">
          <section className="py-24 bg-surface px-4">
            <div className="max-w-[1440px] mx-auto reveal">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-display-lg text-primary mb-4">
                  {content.roomGallery.heading}
              </h2>
                <div className="w-24 h-1 bg-secondary mx-auto"></div>
              </div>
  
              <ImageGallery
                images={content.roomGallery.images}
                categories={content.roomGallery.categories}
              />
            </div>
          </section>
        </SectionEditWrapper>

      </main>
    </>
  );
}
