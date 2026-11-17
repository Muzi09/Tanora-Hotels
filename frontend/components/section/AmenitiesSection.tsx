"use client";
import React from "react";
import AmenitiesGrid from "@/components/ui/AmenitiesGrid";
import SectionEditWrapper from "./SectionEditWrapper";
import { useAdmin } from "@/context/AdminContext";
import { AmenitiesContent } from "@/lib/cms/types";

interface AmenitiesSectionProps {
  isAdmin?: boolean;
  content?: AmenitiesContent;
}

export default function AmenitiesSection({
  isAdmin,
  content,
}: AmenitiesSectionProps) {
  const { homeData } = useAdmin();
  const data = content || homeData.amenities.data;

  return (
    <SectionEditWrapper
      sectionKey="amenities"
      sectionTitle="Amenities"
      isAdmin={isAdmin}
    >
      <section className="py-24 bg-surface px-4">
        <div className="max-w-[1440px] mx-auto reveal">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display-lg text-primary mb-4">
              {data.title}
            </h2>
            <div className="w-24 h-1 bg-secondary mx-auto"></div>
          </div>

          <AmenitiesGrid
            selected={
              data.selectedAmenities && data.selectedAmenities.length > 0
                ? data.selectedAmenities
                : undefined
            }
          />
        </div>
      </section>
    </SectionEditWrapper>
  );
}
