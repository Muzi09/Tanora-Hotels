"use client";
import React from "react";
import { usePageContent } from "@/lib/cms/pages";
import SectionEditWrapper from "@/components/section/SectionEditWrapper";
import Image from "next/image";
import Link from "@/components/cms/CmsLink";
import MaterialIcon from "@/components/ui/MaterialIcon";

export default function OffersPage() {
  const content = usePageContent("offers");
  const packages = content.packagesGrid.packages;

  return (
    <>
      <main className="pt-16">

        {/* HERO BANNER */}
        <SectionEditWrapper sectionKey="heroBanner" sectionTitle="Hero Banner">
          <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center text-center px-4">
            <Image
              src={content.heroBanner.image}
              alt={content.heroBanner.alt}
              fill
              className="object-cover parallax-bg"
              priority
            />
            <div className="absolute inset-0 bg-primary/80" />
            <div className="relative z-10 reveal">
              <h1 className="text-5xl md:text-6xl font-display-lg text-white mb-6">
                {content.heroBanner.heading}
              </h1>
              <div className="w-24 h-1 bg-secondary mx-auto"></div>
            </div>
          </section>
        </SectionEditWrapper>

        {/* DIRECT BOOKING BENEFITS */}
        <SectionEditWrapper sectionKey="directBookingBenefits" sectionTitle="Direct Booking Benefits">
          <section className="py-16 bg-secondary text-primary px-4">
            <div className="max-w-[1440px] mx-auto reveal">
              <div className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-display-lg font-bold mb-4">{content.directBookingBenefits.heading}
              </h2>
                <p className="text-lg">{content.directBookingBenefits.description}
              </p>
              </div>
              <div className="flex flex-wrap justify-center gap-8">
                {content.directBookingBenefits.items.map((benefit, idx) => (
                  <div key={idx} className="flex items-center gap-3 bg-white/20 px-6 py-3 rounded-full">
                    <MaterialIcon name={benefit.icon} className="text-2xl" />
                    <span className="font-bold">{benefit.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </SectionEditWrapper>

        {/* PACKAGES GRID */}
        <SectionEditWrapper sectionKey="packagesGrid" sectionTitle="Packages Grid">
          <section className="py-24 bg-surface px-4">
            <div className="max-w-[1440px] mx-auto reveal">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {packages.map((pkg, idx) => (
                  <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-shadow border border-surface-variant flex flex-col items-center text-center">
                    <MaterialIcon name={pkg.icon} className="text-5xl text-secondary mb-6" />
                    <h3 className="text-xl font-display-lg text-primary mb-4">{pkg.title}</h3>
                    <p className="text-on-surface-variant mb-8 flex-grow">{pkg.desc}</p>
                    <Link href={content.packagesGrid.link} className="text-primary font-bold text-sm tracking-widest uppercase hover:text-secondary transition-colors border-b-2 border-transparent hover:border-secondary pb-1">
                      {content.packagesGrid.buttonText}</Link>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </SectionEditWrapper>

      </main>
    </>
  );
}
