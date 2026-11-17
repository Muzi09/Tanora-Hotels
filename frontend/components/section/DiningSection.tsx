"use client";
import type { DiningCard } from "@/lib/cms/types";
import React from "react";
import Image from "next/image";
import Link from "@/components/cms/CmsLink";
import MaterialIcon from "@/components/ui/MaterialIcon";
import SectionEditWrapper from "./SectionEditWrapper";
import { useAdmin } from "@/context/AdminContext";
import { DiningContent } from "@/lib/cms/types";

interface DiningSectionProps {
  isAdmin?: boolean;
  content?: DiningContent;
}

export default function DiningSection({ isAdmin, content }: DiningSectionProps) {
  const { homeData } = useAdmin();
  const data = content || homeData.dining.data;

  return (
    <SectionEditWrapper
      sectionKey="dining"
      sectionTitle="Dining Experience"
      isAdmin={isAdmin}
    >
      <section className="py-24 bg-primary text-white px-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

        <div className="max-w-[1440px] mx-auto relative z-10 reveal">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display-lg mb-4 text-white">
              {data.title}
            </h2>
            <div className="w-24 h-1 bg-secondary mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {data.items?.map((item: DiningCard) => {
              if (item.type === "featured" || !item.imageSrc) {
                return (
                  <div
                    key={item.id}
                    className="bg-surface/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:bg-surface/10 transition-colors group flex flex-col justify-center items-center text-center p-8 border-dashed"
                  >
                    <MaterialIcon
                      name={item.icon || "wine_bar"}
                      className="text-5xl text-secondary-fixed mb-4"
                    />
                    <h3 className="text-2xl font-display-lg text-secondary-fixed mb-2">
                      {item.title}
                    </h3>
                    <p className="text-white/70 mb-6">{item.description}</p>
                    {item.linkHref && (
                      <Link
                        href={item.linkHref}
                        className="text-white font-bold tracking-widest text-sm uppercase flex items-center gap-2 hover:text-secondary-fixed border border-white/20 px-6 py-3 rounded-full hover:bg-white/10"
                      >
                        {item.linkText || "View Details"}
                      </Link>
                    )}
                  </div>
                );
              }

              return (
                <div
                  key={item.id}
                  className="bg-surface/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:bg-surface/10 transition-colors group flex flex-col"
                >
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={item.imageSrc}
                      alt={item.imageAlt || item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      unoptimized
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-8 flex flex-col flex-grow">
                    <h3 className="text-2xl font-display-lg text-secondary-fixed mb-2">
                      {item.title}
                    </h3>
                    <p className="text-white/70 mb-4 flex-grow">
                      {item.description}
                    </p>
                    {item.linkHref && (
                      <Link
                        href={item.linkHref}
                        className="text-white font-bold tracking-widest text-sm uppercase flex items-center gap-2 hover:text-secondary-fixed mt-auto pt-2"
                      >
                        {item.linkText || "Explore"}{" "}
                        <MaterialIcon name="chevron_right" />
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </SectionEditWrapper>
  );
}
