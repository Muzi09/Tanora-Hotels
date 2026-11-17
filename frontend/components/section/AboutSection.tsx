"use client";
import React from "react";
import MaterialIcon from "@/components/ui/MaterialIcon";
import SectionEditWrapper from "./SectionEditWrapper";
import { useAdmin } from "@/context/AdminContext";
import { IntroContent } from "@/lib/cms/types";

interface AboutSectionProps {
  isAdmin?: boolean;
  content?: IntroContent;
}

export default function AboutSection({ isAdmin, content }: AboutSectionProps) {
  const { homeData } = useAdmin();
  const data = content || homeData.intro.data;

  return (
    <SectionEditWrapper
      sectionKey="intro"
      sectionTitle="About"
      isAdmin={isAdmin}
    >
      <section className="py-24 bg-surface px-4">
        <div className="max-w-4xl mx-auto text-center reveal">
          <MaterialIcon
            name={data.icon || "spa"}
            className="text-secondary text-5xl mb-6"
          />
          <h2 className="text-4xl md:text-5xl font-display-lg text-primary mb-8">
            {data.title}
          </h2>
          <p className="text-lg text-on-surface-variant leading-relaxed whitespace-pre-line">
            {data.description}
          </p>
        </div>
      </section>
    </SectionEditWrapper>
  );
}
