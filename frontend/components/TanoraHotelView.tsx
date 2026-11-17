"use client";
import React from "react";
import Header from "@/components/section/Header";
import Footer from "@/components/section/Footer";
import RevealObserver from "@/components/RevealObserver";
import HeroSection from "@/components/section/HeroSection";
import AboutSection from "@/components/section/AboutSection";
import WhyChooseSection from "@/components/section/WhyChooseSection";
import RoomsSection from "@/components/section/RoomsSection";
import DiningSection from "@/components/section/DiningSection";
import MeetingsSection from "@/components/section/MeetingsSection";
import AmenitiesSection from "@/components/section/AmenitiesSection";
import PromotionalBannerSection from "@/components/section/PromotionalBannerSection";
import AdminTopBar from "@/components/admin/AdminTopBar";
import AdminEditDrawer from "@/components/admin/AdminEditDrawer";
import AdminLoginModal from "@/components/admin/AdminLoginModal";
import ToastNotification from "@/components/admin/ToastNotification";
import { AdminProvider } from "@/context/AdminContext";
import { HomePageData } from "@/lib/cms/types";

interface TanoraHotelViewProps {
  initialData: HomePageData;
  isAdmin?: boolean;
}

export default function TanoraHotelView({
  initialData,
  isAdmin = false,
}: TanoraHotelViewProps) {
  return (
    <AdminProvider initialData={initialData} initialIsAdmin={isAdmin}>
      <RevealObserver />

      {/* Admin Top Utility Bar */}
      {isAdmin && <AdminTopBar />}

      {/* Main Website Header */}
      <Header isAdmin={isAdmin} />

      {/* Main Website Content with Same Components */}
      <main className={`pt-16 ${isAdmin ? "mt-12" : ""}`}>
        <HeroSection isAdmin={isAdmin} />
        <AboutSection isAdmin={isAdmin} />
        <WhyChooseSection isAdmin={isAdmin} />
        <RoomsSection isAdmin={isAdmin} />
        <DiningSection isAdmin={isAdmin} />
        <MeetingsSection isAdmin={isAdmin} />
        <AmenitiesSection isAdmin={isAdmin} />
        <PromotionalBannerSection isAdmin={isAdmin} />
      </main>

      {/* Main Website Footer */}
      <Footer isAdmin={isAdmin} />

      {/* Admin Controls */}
      {isAdmin && (
        <>
          <AdminEditDrawer />
          <AdminLoginModal />
        </>
      )}

      {/* Global Notifications Toast */}
      <ToastNotification />
    </AdminProvider>
  );
}
