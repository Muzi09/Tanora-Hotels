"use client";
import React from "react";
import Link from "@/components/cms/CmsLink";
import MaterialIcon from "@/components/ui/MaterialIcon";
import { useAdmin } from "@/context/AdminContext";

interface FooterProps {
  isAdmin?: boolean;
}

export default function Footer({ isAdmin: propIsAdmin }: FooterProps) {
  const { isAdmin: contextIsAdmin, openEditor, homeData } = useAdmin();
  const isAdmin = propIsAdmin !== undefined ? propIsAdmin : contextIsAdmin;

  const settings = homeData?.settings;
  const brandName = settings?.brandName || "TANORA";
  const aboutText =
    settings?.footer?.aboutText ||
    "Nestled in the vibrant heart of Indore, Tanora Hotel is a premium 3-star property offering a sanctuary of comfort, elegance, and genuine hospitality.";
  const copyrightText =
    settings?.footer?.copyrightText ||
    "© 2026 TANORA HOTEL. ALL RIGHTS RESERVED.";

  const defaultQuickLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Rooms & Suites", path: "/rooms" },
    { name: "Restaurants & Dining", path: "/dining" },
    { name: "Rooftop Bar", path: "/rooftop" },
    { name: "Meeting & Conference", path: "/meetings" },
    { name: "Banquet Hall", path: "/banquet" },
    { name: "Gallery", path: "/gallery" },
    { name: "Offers", path: "/offers" },
    { name: "Contact Us", path: "/contact" },
  ];

  const quickLinks = settings?.navigation?.length
    ? settings.navigation
    : defaultQuickLinks;

  const defaultAmenities = [
    "Free WiFi",
    "Valet Parking",
    "24/7 Service",
    "Room Service",
    "Meeting Rooms",
    "Banquet Hall",
    "Restaurants",
    "Rooftop Bar",
  ];

  const amenities = settings?.footer?.amenitiesList?.length
    ? settings.footer.amenitiesList
    : defaultAmenities;

  const phone = settings?.contact?.phone || "8889866686";
  const email = settings?.contact?.email || "info@tanorahotels.com";
  const address = settings?.contact?.address || "Indore, Madhya Pradesh\nIndia";
  const googleMapsUrl =
    settings?.contact?.googleMapsUrl ||
    "https://maps.app.goo.gl/yQdyQVsYHpe96Njs9?g_st=iw";
  const bookingUrl =
    settings?.contact?.bookingUrl ||
    "https://reservations.hotel-spider.com/03w6a62fee16853";
  const bookingButtonText = settings?.contact?.bookingButtonText || "Book Now";

  return (
    <footer className="bg-primary text-white pt-16 pb-8 border-t-4 border-secondary relative group/footer">
      {/* Edit button in admin mode */}
      {isAdmin && (
        <div className="admin-ui absolute top-4 left-4 z-40">
          <button
            onClick={(e) => {
              e.stopPropagation();
              openEditor("settings");
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container-high text-white border border-[#dcae5d]/60 shadow-xl hover:bg-[#dcae5d] hover:text-primary transition-all text-xs font-semibold backdrop-blur-md cursor-pointer group/btn"
            title="Edit Footer & Site Settings"
          >
            <MaterialIcon name="edit" className="text-xs text-[#dcae5d] group-hover/btn:text-primary" />
            <span>Edit Footer &amp; Info</span>
          </button>
        </div>
      )}

      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="flex flex-col gap-6">
            <h1 className="text-3xl font-display-lg tracking-widest text-secondary-fixed">
              {brandName}
            </h1>
            <p className="text-white/80 font-body-md leading-relaxed whitespace-pre-line">
              {aboutText}
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-secondary hover:border-secondary transition-all"
                aria-label="Share"
              >
                <MaterialIcon name="share" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-secondary hover:border-secondary transition-all"
                aria-label="Photos"
              >
                <MaterialIcon name="photo_camera" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-display-lg mb-6 text-secondary-fixed uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="grid grid-cols-2 gap-y-3 gap-x-4">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.path}
                    className="text-white/80 hover:text-secondary-fixed transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-display-lg mb-6 text-secondary-fixed uppercase tracking-wider">
              Key Amenities
            </h3>
            <ul className="grid grid-cols-2 gap-y-3 gap-x-4">
              {amenities.map((item, idx) => (
                <li key={idx} className="flex items-center gap-2 text-white/80 text-sm">
                  <MaterialIcon
                    name="check_circle"
                    className="text-secondary text-base"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-6">
            <h3 className="text-lg font-display-lg text-secondary-fixed uppercase tracking-wider">
              Contact Us
            </h3>
            <div className="flex flex-col gap-4 text-white/80 text-sm">
              <a
                href={`tel:${phone}`}
                className="flex items-center gap-3 hover:text-secondary transition-colors"
              >
                <MaterialIcon name="phone" className="text-secondary text-xl" />
                {phone}
              </a>
              <a
                href={`mailto:${email}`}
                className="flex items-center gap-3 hover:text-secondary transition-colors"
              >
                <MaterialIcon name="mail" className="text-secondary text-xl" />
                {email}
              </a>
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 hover:text-secondary transition-colors"
              >
                <MaterialIcon
                  name="location_on"
                  className="text-secondary text-xl flex-shrink-0 mt-0.5"
                />
                <span className="whitespace-pre-line">{address}</span>
              </a>
            </div>
            <a
              href={bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex justify-center bg-secondary text-primary font-bold px-6 py-3 rounded-full hover:bg-white transition-colors shadow-md"
            >
              {bookingButtonText}
            </a>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-white/60 text-xs tracking-widest text-center md:text-left">
          <p>{copyrightText}</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-white">
              PRIVACY POLICY
            </Link>
            <Link href="/terms" className="hover:text-white">
              TERMS OF SERVICE
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
