"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/section/Header";
import Footer from "@/components/section/Footer";
import RevealObserver from "@/components/RevealObserver";
import MaterialIcon from "@/components/ui/MaterialIcon";

export default function OffersPage() {
  const packages = [
    { title: "Seasonal Offers", icon: "ac_unit", desc: "Special discounts for summer and winter getaways." },
    { title: "Weekend Packages", icon: "weekend", desc: "Relax and rejuvenate with our 2-night weekend staycations." },
    { title: "Corporate Packages", icon: "business_center", desc: "Exclusive rates and meeting room access for business travelers." },
    { title: "Birthday Packages", icon: "cake", desc: "Celebrate your special day with cake, decorations, and a private dinner." },
    { title: "Anniversary Packages", icon: "favorite", desc: "Romantic room setups, wine, and couples dining." },
    { title: "Conference Packages", icon: "groups", desc: "Full-day catering and A/V support included with room bookings." },
    { title: "Banquet Packages", icon: "celebration", desc: "Customized catering and decor for large events." },
    { title: "VIP Offers", icon: "stars", desc: "Exclusive luxury experiences and private transfers." }
  ];

  return (
    <>
      <RevealObserver />
      <Header />
      <main className="pt-16">

        {/* HERO BANNER */}
        <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center text-center px-4">
          <Image
            src="/images/hero_hotel_1784569172973.png"
            alt="Offers & Packages"
            fill
            className="object-cover parallax-bg"
            priority
          />
          <div className="absolute inset-0 bg-primary/80" />
          <div className="relative z-10 reveal">
            <h1 className="text-5xl md:text-6xl font-display-lg text-white mb-6">
              Offers & Packages
            </h1>
            <div className="w-24 h-1 bg-secondary mx-auto"></div>
          </div>
        </section>

        {/* DIRECT BOOKING BENEFITS */}
        <section className="py-16 bg-secondary text-primary px-4">
          <div className="max-w-[1440px] mx-auto reveal">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-display-lg font-bold mb-4">Direct Booking Benefits</h2>
              <p className="text-lg">Always get the best rate when you book directly with us.</p>
            </div>
            <div className="flex flex-wrap justify-center gap-8">
              {[
                { title: "Best Price Guarantee", icon: "verified" },
                { title: "Free Upgrade (Subject to availability)", icon: "upgrade" },
                { title: "Late Check-out", icon: "schedule" },
                { title: "Welcome Drink", icon: "local_bar" }
              ].map((benefit, idx) => (
                <div key={idx} className="flex items-center gap-3 bg-white/20 px-6 py-3 rounded-full">
                  <MaterialIcon name={benefit.icon} className="text-2xl" />
                  <span className="font-bold">{benefit.title}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PACKAGES GRID */}
        <section className="py-24 bg-surface px-4">
          <div className="max-w-[1440px] mx-auto reveal">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {packages.map((pkg, idx) => (
                <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-shadow border border-surface-variant flex flex-col items-center text-center">
                  <MaterialIcon name={pkg.icon} className="text-5xl text-secondary mb-6" />
                  <h3 className="text-xl font-display-lg text-primary mb-4">{pkg.title}</h3>
                  <p className="text-on-surface-variant mb-8 flex-grow">{pkg.desc}</p>
                  <Link href="/contact" className="text-primary font-bold text-sm tracking-widest uppercase hover:text-secondary transition-colors border-b-2 border-transparent hover:border-secondary pb-1">
                    Inquire Now
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
