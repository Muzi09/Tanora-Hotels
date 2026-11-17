"use client";
import type { RoomCard } from "@/lib/cms/types";
import React from "react";
import Link from "@/components/cms/CmsLink";
import MaterialIcon from "@/components/ui/MaterialIcon";
import AnimatedCard from "@/components/ui/AnimatedCard";
import SectionEditWrapper from "./SectionEditWrapper";
import { useAdmin } from "@/context/AdminContext";
import { FeaturedRoomsContent } from "@/lib/cms/types";

interface RoomsSectionProps {
  isAdmin?: boolean;
  content?: FeaturedRoomsContent;
}

export default function RoomsSection({ isAdmin, content }: RoomsSectionProps) {
  const { homeData } = useAdmin();
  const data = content || homeData.featuredRooms.data;

  return (
    <SectionEditWrapper
      sectionKey="featuredRooms"
      sectionTitle="Featured Rooms"
      isAdmin={isAdmin}
    >
      <section className="py-24 bg-surface px-4">
        <div className="max-w-[1440px] mx-auto reveal">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-display-lg text-primary mb-4">
                {data.title}
              </h2>
              <div className="w-24 h-1 bg-secondary"></div>
            </div>
            {data.viewAllHref && (
              <Link
                href={data.viewAllHref}
                className="text-primary font-bold uppercase tracking-widest hover:text-secondary flex items-center gap-2 transition-colors"
              >
                {data.viewAllText || "View All Rooms"}{" "}
                <MaterialIcon name="arrow_forward" />
              </Link>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {data.rooms?.map((room: RoomCard) => (
              <AnimatedCard
                key={room.id}
                imageSrc={room.imageSrc}
                title={room.title}
                description={room.description}
                linkText={room.linkText}
                linkHref={room.linkHref}
                amenities={room.amenities}
              />
            ))}
          </div>
        </div>
      </section>
    </SectionEditWrapper>
  );
}
