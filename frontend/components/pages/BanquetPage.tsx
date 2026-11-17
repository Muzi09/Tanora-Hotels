"use client";
import React from "react";
import { usePageContent } from "@/lib/cms/pages";
import SectionEditWrapper from "@/components/section/SectionEditWrapper";
import Image from "next/image";
import Link from "@/components/cms/CmsLink";
import MaterialIcon from "@/components/ui/MaterialIcon";
import ImageGallery from "@/components/ui/ImageGallery";

export default function BanquetPage() {
  const content = usePageContent("banquet");
  return (
    <>
      <main className="pt-16">

        {/* HERO BANNER */}
        <SectionEditWrapper sectionKey="heroBanner" sectionTitle="Hero Banner">
          <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center text-center px-4">
            <Image
              src={content.heroBanner.image}
              alt={content.heroBanner.alt}
              fill
              className="object-cover parallax-bg"
              priority
            />
            <div className="absolute inset-0 bg-black/50" />
            <div className="relative z-10 reveal">
              <h2 className="text-sm md:text-base font-bold text-secondary uppercase tracking-[0.3em] mb-4">
                {content.heroBanner.heading}
              </h2>
              <h1 className="text-5xl md:text-7xl font-display-lg text-white mb-6">
                {content.heroBanner.heading2}
              </h1>
              <div className="w-24 h-1 bg-secondary mx-auto mb-6"></div>
              <p className="text-lg text-white/90 max-w-2xl mx-auto leading-relaxed">
                {content.heroBanner.description}
              </p>
            </div>
          </section>
        </SectionEditWrapper>

        {/* HIGHLIGHTS */}
        <SectionEditWrapper sectionKey="highlights" sectionTitle="Highlights">
          <section className="py-24 bg-surface px-4">
            <div className="max-w-[1440px] mx-auto reveal">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-display-lg text-primary mb-4">
                  {content.highlights.heading}
              </h2>
                <div className="w-24 h-1 bg-secondary mx-auto"></div>
              </div>
  
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {content.highlights.items.map((item, idx) => (
                  <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-surface-variant flex flex-col items-center text-center hover:shadow-md transition-shadow">
                    <div className="w-16 h-16 bg-primary/5 rounded-full flex items-center justify-center mb-4">
                      <MaterialIcon name={item.icon} className="text-3xl text-primary" />
                    </div>
                    <h3 className="font-medium text-on-surface">{item.title}</h3>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </SectionEditWrapper>

        {/* EVENT PHOTOS GALLERY */}
        <SectionEditWrapper sectionKey="eventPhotosGallery" sectionTitle="Event Photos Gallery">
          <section className="py-24 bg-surface-container-low px-4">
            <div className="max-w-[1440px] mx-auto reveal">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-display-lg text-primary mb-4">
                  {content.eventPhotosGallery.heading}
              </h2>
                <div className="w-24 h-1 bg-secondary mx-auto"></div>
              </div>
  
              <ImageGallery
                images={content.eventPhotosGallery.images}
                categories={content.eventPhotosGallery.categories}
              />
            </div>
          </section>
        </SectionEditWrapper>

        {/* BOOKING CTA */}
        <SectionEditWrapper sectionKey="bookingCta" sectionTitle="Booking Cta">
          <section className="py-24 bg-primary text-white text-center px-4">
            <div className="max-w-3xl mx-auto reveal">
              <MaterialIcon name={content.bookingCta.icon} className="text-secondary-fixed text-6xl mb-6" />
              <h2 className="text-4xl md:text-5xl font-display-lg mb-6">
                {content.bookingCta.heading}
              </h2>
              <p className="text-xl text-white/80 mb-10">
                {content.bookingCta.description}
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <Link href={content.bookingCta.link} className="px-10 py-5 bg-secondary text-primary font-bold tracking-widest uppercase rounded-full hover:bg-white transition-colors duration-300 shadow-lg">
                  {content.bookingCta.buttonText}</Link>
                <Link href={content.bookingCta.link2} className="px-10 py-5 bg-transparent border-2 border-secondary text-secondary font-bold tracking-widest uppercase rounded-full hover:bg-secondary hover:text-primary transition-colors duration-300 shadow-lg flex items-center justify-center gap-3">
                  <MaterialIcon name={content.bookingCta.icon2} /> {content.bookingCta.buttonText2}</Link>
              </div>
            </div>
          </section>
        </SectionEditWrapper>
      </main>
    </>
  );
}
