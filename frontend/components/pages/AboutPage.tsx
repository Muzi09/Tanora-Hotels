"use client";
import React from "react";
import { usePageContent } from "@/lib/cms/pages";
import SectionEditWrapper from "@/components/section/SectionEditWrapper";
import Image from "next/image";
import MaterialIcon from "@/components/ui/MaterialIcon";
import AmenitiesGrid from "@/components/ui/AmenitiesGrid";

export default function AboutPage() {
  const content = usePageContent("about");
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
              <h1 className="text-5xl md:text-6xl font-display-lg text-white mb-4">
                {content.heroBanner.heading}
              </h1>
              <div className="w-24 h-1 bg-secondary mx-auto"></div>
            </div>
          </section>
        </SectionEditWrapper>

        {/* HOTEL STORY */}
        <SectionEditWrapper sectionKey="hotelStory" sectionTitle="Hotel Story">
          <section className="py-24 bg-surface px-4">
            <div className="max-w-4xl mx-auto text-center reveal">
              <h2 className="text-sm md:text-base font-bold text-secondary uppercase tracking-[0.2em] mb-4">
                {content.hotelStory.heading}
              </h2>
              <h3 className="text-4xl md:text-5xl font-display-lg text-primary mb-10">
                {content.hotelStory.heading2}
              </h3>
  
              <p className="text-lg text-on-surface-variant leading-relaxed mb-6 text-justify md:text-center">
                {content.hotelStory.description}
              </p>
              <p className="text-lg text-on-surface-variant leading-relaxed text-justify md:text-center">
                {content.hotelStory.description2}
              </p>
            </div>
          </section>
        </SectionEditWrapper>

        {/* WHY CHOOSE TANORA */}
        <SectionEditWrapper sectionKey="whyChooseTanora" sectionTitle="Why Choose Tanora">
          <section className="py-24 bg-surface-container-low px-4">
            <div className="max-w-[1440px] mx-auto reveal">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-display-lg text-primary mb-4">
                  {content.whyChooseTanora.heading}
              </h2>
                <div className="w-24 h-1 bg-secondary mx-auto"></div>
              </div>
  
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {content.whyChooseTanora.items.map((item, idx) => (
                  <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-surface-variant text-center hover:shadow-xl transition-shadow group">
                    <div className="w-20 h-20 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary transition-colors">
                      <MaterialIcon name={item.icon} className="text-4xl text-primary group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="text-xl font-display-lg text-primary mb-4">{item.title}</h3>
                    <p className="text-on-surface-variant">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </SectionEditWrapper>

        {/* MISSION & VISION */}
        <SectionEditWrapper sectionKey="missionVision" sectionTitle="Mission & Vision">
          <section className="py-24 bg-primary text-white px-4 relative overflow-hidden">
            <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 relative z-10 reveal">
              <div className="bg-white/5 p-10 rounded-3xl border border-white/10 backdrop-blur-md">
                <div className="flex items-center gap-4 mb-6">
                  <MaterialIcon name={content.missionVision.icon} className="text-secondary-fixed text-4xl" />
                  <h2 className="text-3xl font-display-lg text-secondary-fixed">{content.missionVision.heading}
              </h2>
                </div>
                <p className="text-lg leading-relaxed text-white/90">
                  {content.missionVision.description}
              </p>
              </div>
  
              <div className="bg-white/5 p-10 rounded-3xl border border-white/10 backdrop-blur-md">
                <div className="flex items-center gap-4 mb-6">
                  <MaterialIcon name={content.missionVision.icon2} className="text-secondary-fixed text-4xl" />
                  <h2 className="text-3xl font-display-lg text-secondary-fixed">{content.missionVision.heading2}
              </h2>
                </div>
                <p className="text-lg leading-relaxed text-white/90">
                  {content.missionVision.description2}
              </p>
              </div>
            </div>
          </section>
        </SectionEditWrapper>

        {/* AMENITIES */}
        <SectionEditWrapper sectionKey="amenities" sectionTitle="Amenities">
          <section className="py-24 bg-surface px-4">
            <div className="max-w-[1440px] mx-auto reveal">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-display-lg text-primary mb-4">
                  {content.amenities.heading}
              </h2>
                <div className="w-24 h-1 bg-secondary mx-auto"></div>
              </div>
  
              <AmenitiesGrid selected={content.amenities.selectedAmenities} />
            </div>
          </section>
        </SectionEditWrapper>
      </main>
    </>
  );
}
