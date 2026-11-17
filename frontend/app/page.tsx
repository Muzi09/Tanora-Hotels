import React from "react";
import TanoraHotelView from "@/components/TanoraHotelView";
import { fetchHomePageData } from "@/lib/cms/api";

export const revalidate = 60; // Next.js ISR revalidation every 60 seconds

export default async function Home() {
  const initialData = await fetchHomePageData("published");

  return <TanoraHotelView initialData={initialData} isAdmin={false} />;
}
