"use client";
import React from "react";
import { usePageContent } from "@/lib/cms/pages";
import SectionEditWrapper from "@/components/section/SectionEditWrapper";
import Image from "next/image";
import Link from "@/components/cms/CmsLink";
import MaterialIcon from "@/components/ui/MaterialIcon";
import ImageGallery from "@/components/ui/ImageGallery";

export default function DiningPage() {
  const content = usePageContent("dining");
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
            <div className="absolute inset-0 bg-black/50" />
            <div className="relative z-10 reveal">
              <h1 className="text-5xl md:text-7xl font-display-lg text-white mb-6">
                {content.heroBanner.heading}
              </h1>
              <div className="w-24 h-1 bg-secondary mx-auto"></div>
            </div>
          </section>
        </SectionEditWrapper>

        {/* THE PAVILION */}
        <SectionEditWrapper sectionKey="thePavilion" sectionTitle="The Pavilion">
          <section className="py-24 bg-surface px-4">
            <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row gap-16 items-center reveal">
              <div className="lg:w-1/2 w-full">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                  <Image src={content.thePavilion.image} alt={content.thePavilion.alt} fill className="object-cover" />
                </div>
              </div>
              <div className="lg:w-1/2 w-full">
                <h2 className="text-sm md:text-base font-bold text-secondary uppercase tracking-[0.2em] mb-2">
                  {content.thePavilion.heading}
              </h2>
                <h3 className="text-4xl md:text-5xl font-display-lg text-primary mb-6">
                  {content.thePavilion.heading2}
              </h3>
                <p className="text-lg text-on-surface-variant mb-8 leading-relaxed">
                  {content.thePavilion.description}
              </p>
  
                <div className="grid grid-cols-2 gap-y-4 gap-x-6 mb-10">
                  {content.thePavilion.items.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <MaterialIcon name={content.thePavilion.icon} className="text-secondary" />
                      <span className="text-on-surface-variant font-medium text-sm md:text-base">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </SectionEditWrapper>

        {/* THE RESERVE (PRIVATE DINING) */}
        <SectionEditWrapper sectionKey="theReservePrivateDining" sectionTitle="The Reserve (Private Dining)">
          <section className="py-24 bg-surface-container-low px-4">
            <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row-reverse gap-16 items-center reveal">
              <div className="lg:w-1/2 w-full flex justify-center">
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative aspect-square rounded-2xl overflow-hidden shadow-lg mt-8">
                    <Image src={content.theReservePrivateDining.image} alt={content.theReservePrivateDining.alt} fill className="object-cover" />
                  </div>
                  <div className="relative aspect-square rounded-2xl overflow-hidden shadow-lg">
                    <Image src={content.theReservePrivateDining.image2} alt={content.theReservePrivateDining.alt2} fill className="object-cover" />
                  </div>
                </div>
              </div>
              <div className="lg:w-1/2 w-full">
                <h2 className="text-sm md:text-base font-bold text-secondary uppercase tracking-[0.2em] mb-2">
                  {content.theReservePrivateDining.heading}
              </h2>
                <h3 className="text-4xl md:text-5xl font-display-lg text-primary mb-6">
                  {content.theReservePrivateDining.heading2}
              </h3>
                <p className="text-lg text-on-surface-variant mb-8 leading-relaxed">
                  {content.theReservePrivateDining.description}
              </p>
  
                <div className="grid grid-cols-2 gap-y-4 gap-x-6 mb-10">
                  {content.theReservePrivateDining.items.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <MaterialIcon name={content.theReservePrivateDining.icon} className="text-secondary" />
                      <span className="text-on-surface-variant font-medium text-sm md:text-base">{feature}</span>
                    </div>
                  ))}
                </div>
  
                <Link
                  href={content.theReservePrivateDining.link}
                  className="inline-block px-10 py-4 bg-primary text-white font-bold tracking-widest uppercase rounded-full hover:bg-secondary transition-colors duration-300 shadow-lg"
                >
                  {content.theReservePrivateDining.buttonText}</Link>
              </div>
            </div>
          </section>
        </SectionEditWrapper>

        {/* DINING GALLERY */}
        <SectionEditWrapper sectionKey="diningGallery" sectionTitle="Dining Gallery">
          <section className="py-24 bg-surface px-4">
            <div className="max-w-[1440px] mx-auto reveal">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-display-lg text-primary mb-4">
                  {content.diningGallery.heading}
              </h2>
                <div className="w-24 h-1 bg-secondary mx-auto"></div>
              </div>
  
              <ImageGallery
                images={content.diningGallery.images}
                categories={content.diningGallery.categories}
              />
            </div>
          </section>
        </SectionEditWrapper>
      </main>
    </>
  );
}
