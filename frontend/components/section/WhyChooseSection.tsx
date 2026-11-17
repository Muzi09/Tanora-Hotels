"use client";
import type { WhyChooseFeature } from "@/lib/cms/types";
import React from "react";
import MaterialIcon from "@/components/ui/MaterialIcon";
import SectionEditWrapper from "./SectionEditWrapper";
import { useAdmin } from "@/context/AdminContext";
import { WhyChooseContent } from "@/lib/cms/types";

interface WhyChooseSectionProps {
  isAdmin?: boolean;
  content?: WhyChooseContent;
}

export default function WhyChooseSection({
  isAdmin,
  content,
}: WhyChooseSectionProps) {
  const { homeData } = useAdmin();
  const data = content || homeData.whyChoose.data;

  return (
    <SectionEditWrapper
      sectionKey="whyChoose"
      sectionTitle="Why Choose Tanora"
      isAdmin={isAdmin}
    >
      <section className="py-24 bg-surface-container-low px-4">
        <div className="max-w-[1440px] mx-auto reveal">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display-lg text-primary mb-4">
              {data.title}
            </h2>
            <div className="w-24 h-1 bg-secondary mx-auto"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {data.features?.map((feature: WhyChooseFeature, idx: number) => (
              <div
                key={idx}
                className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-shadow text-center flex flex-col items-center border border-surface-variant group"
              >
                <div className="w-16 h-16 bg-primary/5 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary transition-colors">
                  <MaterialIcon
                    name={feature.icon || "star"}
                    className="text-primary text-3xl group-hover:text-white transition-colors"
                  />
                </div>
                <h3 className="font-medium text-on-surface leading-snug">
                  {feature.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SectionEditWrapper>
  );
}
