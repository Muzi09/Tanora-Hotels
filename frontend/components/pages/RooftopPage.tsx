"use client";
import React from "react";
import { usePageContent } from "@/lib/cms/pages";
import SectionEditWrapper from "@/components/section/SectionEditWrapper";
import Image from "next/image";
import Link from "@/components/cms/CmsLink";
import MaterialIcon from "@/components/ui/MaterialIcon";
import ImageGallery from "@/components/ui/ImageGallery";

export default function RooftopPage() {
  const content = usePageContent("rooftop");
  return (
    <>
      <main className="pt-16">

        {/* HERO BANNER */}
        <SectionEditWrapper sectionKey="heroBanner" sectionTitle="Hero Banner">
          <section className="relative h-[80vh] min-h-[500px] flex items-center justify-center text-center px-4">
            <Image
              src={content.heroBanner.image}
              alt={content.heroBanner.alt}
              fill
              className="object-cover parallax-bg"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
            <div className="relative z-10 reveal mt-20">
              <h2 className="text-sm md:text-base font-bold text-secondary-fixed uppercase tracking-[0.4em] mb-4">
                {content.heroBanner.heading}
              </h2>
              <h1 className="text-6xl md:text-8xl font-display-lg text-white mb-6">
                {content.heroBanner.heading2}
              </h1>
              <div className="w-32 h-1 bg-secondary-fixed mx-auto mb-8"></div>
              <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed font-light">
                {content.heroBanner.description}
              </p>
            </div>
          </section>
        </SectionEditWrapper>

        {/* DETAILS */}
        <SectionEditWrapper sectionKey="details" sectionTitle="Details">
          <section className="py-24 bg-tertiary text-white px-4">
            <div className="max-w-[1440px] mx-auto reveal">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {content.details.items.map((item, idx) => (
                  <div key={idx} className="bg-tertiary-container p-8 rounded-2xl border border-white/5 text-center hover:bg-white/5 transition-colors group">
                    <MaterialIcon name={item.icon} className="text-5xl text-secondary-fixed mb-6 group-hover:scale-110 transition-transform" />
                    <h3 className="text-xl font-display-lg text-white mb-3">{item.title}</h3>
                    <p className="text-white/70">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </SectionEditWrapper>

        {/* EXPERIENCE TEXT */}
        <SectionEditWrapper sectionKey="experienceText" sectionTitle="Experience Text">
          <section className="py-24 bg-surface px-4">
            <div className="max-w-4xl mx-auto text-center reveal">
              <MaterialIcon name={content.experienceText.icon} className="text-secondary text-6xl mb-6" />
              <h2 className="text-4xl md:text-5xl font-display-lg text-primary mb-8">
                {content.experienceText.heading}
              </h2>
              <p className="text-lg text-on-surface-variant leading-relaxed">
                {content.experienceText.description}
              </p>
            </div>
          </section>
        </SectionEditWrapper>

        {/* GALLERY */}
        <SectionEditWrapper sectionKey="gallery" sectionTitle="Gallery">
          <section className="py-24 bg-surface-container-low px-4">
            <div className="max-w-[1440px] mx-auto reveal">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-display-lg text-primary mb-4">
                  {content.gallery.heading}
              </h2>
                <div className="w-24 h-1 bg-secondary mx-auto"></div>
              </div>
  
              <ImageGallery
                images={content.gallery.images}
                categories={content.gallery.categories}
              />
            </div>
          </section>
        </SectionEditWrapper>

        {/* RESERVATION CTA */}
        <SectionEditWrapper sectionKey="reservationCta" sectionTitle="Reservation Cta">
          <section className="py-24 bg-tertiary text-white px-4 text-center">
            <div className="max-w-3xl mx-auto reveal">
              <h2 className="text-4xl md:text-5xl font-display-lg text-secondary-fixed mb-6">
                {content.reservationCta.heading}
              </h2>
              <p className="text-xl text-white/80 mb-10">
                {content.reservationCta.description}
              </p>
              <div className="flex justify-center gap-6">
                <Link href={content.reservationCta.link} className="px-10 py-5 bg-secondary-fixed text-tertiary font-bold tracking-widest uppercase rounded-full hover:bg-white transition-colors duration-300 shadow-lg">
                  {content.reservationCta.buttonText}</Link>
              </div>
            </div>
          </section>
        </SectionEditWrapper>

      </main>
    </>
  );
}
