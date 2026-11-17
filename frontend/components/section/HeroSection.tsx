"use client";
import Link from "@/components/cms/CmsLink";
import React from "react";
import Image from "next/image";
import SectionEditWrapper from "./SectionEditWrapper";
import { useAdmin } from "@/context/AdminContext";
import { HeroContent } from "@/lib/cms/types";

interface HeroSectionProps {
  isAdmin?: boolean;
  content?: HeroContent;
}

export default function HeroSection({ isAdmin, content }: HeroSectionProps) {
  const { homeData } = useAdmin();
  const data = content || homeData.hero.data;

  return (
    <SectionEditWrapper
      sectionKey="hero"
      sectionTitle="Hero"
      isAdmin={isAdmin}
      className="relative"
    >
      <section className="relative min-h-[100vh] lg:h-[90vh] lg:min-h-[600px] flex flex-col justify-center pb-12 pt-16 lg:pt-0 lg:pb-16 px-4 overflow-hidden">
        {data.backgroundImage?.url && (
          <Image
            src={data.backgroundImage.url}
            alt={data.backgroundImage.alt || "Tanora Hotel Exterior"}
            fill
            sizes="100vw"
            unoptimized
            loading="eager"
            className="object-cover parallax-bg scale-105"
            priority
          />
        )}
        <div className="absolute inset-0 bg-black/40 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center text-center reveal">
          <h2 className="text-sm md:text-base font-bold text-secondary-fixed uppercase tracking-[0.3em] mb-4">
            {data.subtitle}
          </h2>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-display-lg text-white leading-tight drop-shadow-xl mb-10">
            {data.title}
          </h1>
          {data.cta?.href && (
            <Link
              href={data.cta.href}
              target={data.cta.href.startsWith("http") ? "_blank" : undefined}
              rel={data.cta.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="inline-block px-10 py-5 bg-[#dcae5d] text-white font-bold text-lg tracking-widest uppercase rounded-full hover:bg-[#c99f52] transition-colors duration-300 shadow-xl cursor-pointer"
            >
              {data.cta.label || "Book Now"}
            </Link>
          )}
        </div>
      </section>
    </SectionEditWrapper>
  );
}
