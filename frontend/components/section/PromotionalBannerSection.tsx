"use client";
import Link from "@/components/cms/CmsLink";
import React from "react";
import Image from "next/image";
import SectionEditWrapper from "./SectionEditWrapper";
import { useAdmin } from "@/context/AdminContext";
import { PromotionalBannerContent } from "@/lib/cms/types";

interface PromotionalBannerSectionProps {
  isAdmin?: boolean;
  content?: PromotionalBannerContent;
}

export default function PromotionalBannerSection({
  isAdmin,
  content,
}: PromotionalBannerSectionProps) {
  const { homeData } = useAdmin();
  const data = content || homeData.promotionalBanner.data;

  return (
    <SectionEditWrapper
      sectionKey="promotionalBanner"
      sectionTitle="Promotional Banner"
      isAdmin={isAdmin}
    >
      <section className="relative py-32 bg-primary flex items-center justify-center text-center px-4 overflow-hidden">
        {data.backgroundImage?.url && (
          <div className="absolute inset-0 opacity-20">
            <Image
              src={data.backgroundImage.url}
              alt={data.backgroundImage.alt || "Background"}
              fill
              sizes="100vw"
              unoptimized
              className="object-cover"
            />
          </div>
        )}
        <div className="relative z-10 max-w-3xl mx-auto reveal">
          <h2 className="text-5xl md:text-6xl font-display-lg text-white mb-6">
            {data.title}
          </h2>
          <p className="text-xl text-white/90 mb-10 font-light">
            {data.description}
          </p>
          {data.cta?.href && (
            <Link
              href={data.cta.href}
              target={data.cta.href.startsWith("http") ? "_blank" : undefined}
              rel={data.cta.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="inline-block px-10 py-5 bg-secondary text-primary font-bold text-lg tracking-widest uppercase rounded-full hover:bg-white transition-colors duration-300 shadow-xl cursor-pointer"
            >
              {data.cta.label || "Book Now"}
            </Link>
          )}
        </div>
      </section>
    </SectionEditWrapper>
  );
}
