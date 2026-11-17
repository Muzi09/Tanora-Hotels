"use client";
import type { MeetingCard } from "@/lib/cms/types";
import React from "react";
import AnimatedCard from "@/components/ui/AnimatedCard";
import SectionEditWrapper from "./SectionEditWrapper";
import { useAdmin } from "@/context/AdminContext";
import { MeetingsContent } from "@/lib/cms/types";

interface MeetingsSectionProps {
  isAdmin?: boolean;
  content?: MeetingsContent;
}

export default function MeetingsSection({
  isAdmin,
  content,
}: MeetingsSectionProps) {
  const { homeData } = useAdmin();
  const data = content || homeData.meetings.data;

  return (
    <SectionEditWrapper
      sectionKey="meetings"
      sectionTitle="Meetings & Events"
      isAdmin={isAdmin}
    >
      <section className="py-24 bg-surface-container-low px-4">
        <div className="max-w-[1440px] mx-auto reveal">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display-lg text-primary mb-4">
              {data.title}
            </h2>
            <div className="w-24 h-1 bg-secondary mx-auto"></div>
            {data.subtitle && (
              <p className="mt-6 text-on-surface-variant max-w-2xl mx-auto">
                {data.subtitle}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {data.cards?.map((card: MeetingCard) => (
              <AnimatedCard
                key={card.id}
                imageSrc={card.imageSrc}
                title={card.title}
                description={card.description}
                linkText={card.linkText}
                linkHref={card.linkHref}
              />
            ))}
          </div>
        </div>
      </section>
    </SectionEditWrapper>
  );
}
