import React from "react";
import TanoraHotelView from "@/components/TanoraHotelView";
import { fetchHomePageData } from "@/lib/cms/api";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Admin Panel | Tanora Hotels CMS",
  description: "Live visual content management for Tanora Hotels",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminPage() {
  const initialData = await fetchHomePageData("published");

  return <TanoraHotelView initialData={initialData} isAdmin={true} />;
}
