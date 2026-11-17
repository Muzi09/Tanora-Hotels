"use client";
import React from "react";
import { usePageContent } from "@/lib/cms/pages";
import SectionEditWrapper from "@/components/section/SectionEditWrapper";
import Image from "next/image";
import Link from "@/components/cms/CmsLink";
import MaterialIcon from "@/components/ui/MaterialIcon";

export default function MeetingsPage() {
  const content = usePageContent("meetings");
  return (
    <>
      <main className="pt-16">

        {/* HERO BANNER */}
        <SectionEditWrapper sectionKey="heroBanner" sectionTitle="Hero Banner">
          <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center text-center px-4">
            <Image
              src={content.heroBanner.image} // placeholder for boardroom
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
              <div className="w-24 h-1 bg-secondary mx-auto mb-6"></div>
              <p className="text-lg text-white/90 max-w-2xl mx-auto leading-relaxed">
                {content.heroBanner.description}
              </p>
            </div>
          </section>
        </SectionEditWrapper>

        {/* BOARDROOM */}
        <SectionEditWrapper sectionKey="boardroom" sectionTitle="Boardroom">
          <section className="py-24 bg-surface px-4">
            <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row gap-16 items-center reveal">
              <div className="lg:w-1/2 w-full">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                  <Image src={content.boardroom.image} alt={content.boardroom.alt} fill className="object-cover" />
                </div>
              </div>
              <div className="lg:w-1/2 w-full">
                <h2 className="text-sm md:text-base font-bold text-secondary uppercase tracking-[0.2em] mb-2">
                  {content.boardroom.heading}
              </h2>
                <h3 className="text-4xl md:text-5xl font-display-lg text-primary mb-6">
                  {content.boardroom.heading2}
              </h3>
  
                <div className="flex items-center gap-2 mb-6">
                  <MaterialIcon name={content.boardroom.icon} className="text-primary text-2xl" />
                  <span className="text-lg font-medium text-on-surface">{content.boardroom.text}</span>
                </div>
  
                <div className="grid grid-cols-2 gap-y-4 gap-x-6 mb-10">
                  {content.boardroom.items.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <MaterialIcon name={content.boardroom.icon2} className="text-secondary" />
                      <span className="text-on-surface-variant font-medium text-sm md:text-base">{feature}</span>
                    </div>
                  ))}
                </div>
  
                <div className="mb-8">
                  <h4 className="text-lg font-display-lg text-primary mb-3">{content.boardroom.heading3}
              </h4>
                  <div className="flex flex-wrap gap-3">
                    {content.boardroom.items2.map((suit, idx) => (
                      <span key={idx} className="px-4 py-2 bg-surface-container-high rounded-full text-sm font-medium text-on-surface">
                        {suit}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </SectionEditWrapper>

        {/* REGENT ROOM */}
        <SectionEditWrapper sectionKey="regentRoom" sectionTitle="Regent Room">
          <section className="py-24 bg-surface-container-low px-4">
            <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row-reverse gap-16 items-center reveal">
              <div className="lg:w-1/2 w-full">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                  <Image src={content.regentRoom.image} alt={content.regentRoom.alt} fill className="object-cover" />
                </div>
              </div>
              <div className="lg:w-1/2 w-full">
                <h3 className="text-4xl md:text-5xl font-display-lg text-primary mb-6">
                  {content.regentRoom.heading}
              </h3>
  
                <div className="flex items-center gap-2 mb-6">
                  <MaterialIcon name={content.regentRoom.icon} className="text-primary text-2xl" />
                  <span className="text-lg font-medium text-on-surface">{content.regentRoom.text}</span>
                </div>
  
                <div className="grid grid-cols-2 gap-y-4 gap-x-6 mb-10">
                  {content.regentRoom.items.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <MaterialIcon name={content.regentRoom.icon2} className="text-secondary" />
                      <span className="text-on-surface-variant font-medium text-sm md:text-base">{feature}</span>
                    </div>
                  ))}
                </div>
  
                <div className="mb-8">
                  <h4 className="text-lg font-display-lg text-primary mb-3">{content.regentRoom.heading2}
              </h4>
                  <div className="flex flex-wrap gap-3">
                    {content.regentRoom.items2.map((suit, idx) => (
                      <span key={idx} className="px-4 py-2 bg-white border border-surface-variant rounded-full text-sm font-medium text-on-surface">
                        {suit}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </SectionEditWrapper>

        {/* CORPORATE CATERING & SUPPORT */}
        <SectionEditWrapper sectionKey="corporateCateringSupport" sectionTitle="Corporate Catering & Support">
          <section className="py-24 bg-primary text-white px-4">
            <div className="max-w-[1440px] mx-auto reveal">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-display-lg mb-4 text-white">
                  {content.corporateCateringSupport.heading}
              </h2>
                <div className="w-24 h-1 bg-secondary mx-auto"></div>
              </div>
  
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {content.corporateCateringSupport.items.map((item, idx) => (
                  <div key={idx} className="bg-white/5 border border-white/10 p-8 rounded-2xl text-center backdrop-blur-sm">
                    <MaterialIcon name={item.icon} className="text-5xl text-secondary-fixed mb-6" />
                    <h3 className="text-xl font-display-lg text-white mb-2">{item.title}</h3>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </SectionEditWrapper>

        {/* CTA */}
        <SectionEditWrapper sectionKey="cta" sectionTitle="Cta">
          <section className="py-24 bg-surface px-4 text-center">
            <div className="max-w-2xl mx-auto reveal">
              <h2 className="text-4xl md:text-5xl font-display-lg text-primary mb-6">
                {content.cta.heading}
              </h2>
              <p className="text-xl text-on-surface-variant mb-10">
                {content.cta.description}
              </p>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
                <Link href={content.cta.link} className="flex items-center gap-3 text-2xl font-bold text-primary hover:text-secondary transition-colors">
                  <MaterialIcon name={content.cta.icon} className="text-3xl" />
                  {content.cta.buttonText}</Link>
                <span className="hidden sm:block text-outline-variant">{content.cta.text}</span>
                <Link href={content.cta.link2} className="px-8 py-4 bg-primary text-white font-bold tracking-widest uppercase rounded-full hover:bg-secondary transition-colors duration-300">
                  {content.cta.buttonText2}</Link>
              </div>
            </div>
          </section>
        </SectionEditWrapper>
      </main>
    </>
  );
}
