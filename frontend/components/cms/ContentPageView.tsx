"use client";

import React from "react";
import { AdminProvider } from "@/context/AdminContext";
import { CmsPageData } from "@/lib/cms/types";
import { PageSlug } from "@/lib/cms/pages";
import Header from "@/components/section/Header";
import Footer from "@/components/section/Footer";
import RevealObserver from "@/components/RevealObserver";
import AdminTopBar from "@/components/admin/AdminTopBar";
import AdminEditDrawer from "@/components/admin/AdminEditDrawer";
import AdminLoginModal from "@/components/admin/AdminLoginModal";
import ToastNotification from "@/components/admin/ToastNotification";
import AboutPage from "@/components/pages/AboutPage";
import RoomsPage from "@/components/pages/RoomsPage";
import DiningPage from "@/components/pages/DiningPage";
import RooftopPage from "@/components/pages/RooftopPage";
import MeetingsPage from "@/components/pages/MeetingsPage";
import BanquetPage from "@/components/pages/BanquetPage";
import GalleryPage from "@/components/pages/GalleryPage";
import OffersPage from "@/components/pages/OffersPage";
import ContactPage from "@/components/pages/ContactPage";

const views = { about: AboutPage, rooms: RoomsPage, dining: DiningPage, rooftop: RooftopPage,
  meetings: MeetingsPage, banquet: BanquetPage, gallery: GalleryPage, offers: OffersPage, contact: ContactPage };

export default function ContentPageView({ page, initialData, isAdmin = false }: {
  page: PageSlug;
  initialData: CmsPageData;
  isAdmin?: boolean;
}) {
  const Page = views[page];
  return (
    <AdminProvider key={page} pageSlug={page} initialData={initialData} initialIsAdmin={isAdmin}>
      <RevealObserver />
      {isAdmin && <AdminTopBar />}
      <Header />
      <div className={isAdmin ? "mt-12" : undefined}><Page /></div>
      <Footer />
      {isAdmin && <><AdminEditDrawer /><AdminLoginModal /></>}
      <ToastNotification />
    </AdminProvider>
  );
}
