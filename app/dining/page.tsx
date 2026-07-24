"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/section/Header";
import Footer from "@/components/section/Footer";
import RevealObserver from "@/components/RevealObserver";
import MaterialIcon from "@/components/ui/MaterialIcon";
import ImageGallery from "@/components/ui/ImageGallery";

export default function DiningPage() {
  return (
    <>
      <RevealObserver />
      <Header />
      <main className="pt-14 sm:pt-16">

        {/* HERO BANNER */}
        <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center text-center px-4">
          <Image
            src="/images/restaurant_pavilion_1784569251819.png"
            alt="Tanora Dining Experiences"
            fill
            className="object-cover parallax-bg"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-10 reveal">
            <h1 className="text-5xl md:text-7xl font-display-lg text-white mb-6">
              Extraordinary Dining Experiences
            </h1>
            <div className="w-24 h-1 bg-secondary mx-auto"></div>
          </div>
        </section>

        {/* THE PAVILION */}
        <section className="py-24 bg-surface px-4">
          <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row gap-16 items-center reveal">
            <div className="lg:w-1/2 w-full">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <Image src="/images/restaurant_pavilion_1784569251819.png" alt="The Pavilion" fill className="object-cover" />
              </div>
            </div>
            <div className="lg:w-1/2 w-full">
              <h2 className="text-sm md:text-base font-bold text-secondary uppercase tracking-[0.2em] mb-2">
                Ground Floor Restaurant
              </h2>
              <h3 className="text-4xl md:text-5xl font-display-lg text-primary mb-6">
                The Pavilion
              </h3>
              <p className="text-lg text-on-surface-variant mb-8 leading-relaxed">
                Start your day with a sumptuous breakfast or enjoy a leisurely lunch and dinner in our elegant all-day dining restaurant. Offering a wide range of culinary delights to satisfy every palate.
              </p>

              <div className="grid grid-cols-2 gap-y-4 gap-x-6 mb-10">
                {[
                  "All Day Dining", "Family Friendly", "Breakfast, Lunch, Dinner",
                  "Coffee Meetings", "Multi Cuisine", "Vegetarian Options",
                  "Healthy Options", "Buffet & À La Carte", "Grilled Dishes"
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <MaterialIcon name="done_all" className="text-secondary" />
                    <span className="text-on-surface-variant font-medium text-sm md:text-base">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* THE RESERVE (PRIVATE DINING) */}
        <section className="py-24 bg-surface-container-low px-4">
          <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row-reverse gap-16 items-center reveal">
            <div className="lg:w-1/2 w-full flex justify-center">
              <div className="grid grid-cols-2 gap-4">
                <div className="relative aspect-square rounded-2xl overflow-hidden shadow-lg mt-8">
                  <Image src="/images/restaurant_pavilion_1784569251819.png" alt="Private Dining" fill className="object-cover" />
                </div>
                <div className="relative aspect-square rounded-2xl overflow-hidden shadow-lg">
                  <Image src="/images/restaurant_luxe_1784569279478.png" alt="Private Dining Detail" fill className="object-cover" />
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 w-full">
              <h2 className="text-sm md:text-base font-bold text-secondary uppercase tracking-[0.2em] mb-2">
                Private Dining Rooms
              </h2>
              <h3 className="text-4xl md:text-5xl font-display-lg text-primary mb-6">
                The Reserve
              </h3>
              <p className="text-lg text-on-surface-variant mb-8 leading-relaxed">
                For those seeking an exclusive dining experience, The Reserve offers beautifully appointed private dining rooms ideal for business dinners, confidential meetings, and intimate family celebrations.
              </p>

              <div className="grid grid-cols-2 gap-y-4 gap-x-6 mb-10">
                {[
                  "Private Dining", "VIP Experience", "Private Bar", "Air Conditioning",
                  "Smart Screens", "Sound System", "Business Dinners",
                  "Family Celebrations", "Confidential Meetings"
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <MaterialIcon name="star" className="text-secondary" />
                    <span className="text-on-surface-variant font-medium text-sm md:text-base">{feature}</span>
                  </div>
                ))}
              </div>

              <Link
                href="/contact"
                className="inline-block px-10 py-4 bg-primary text-white font-bold tracking-widest uppercase rounded-full hover:bg-secondary transition-colors duration-300 shadow-lg"
              >
                Reserve Now
              </Link>
            </div>
          </div>
        </section>

        {/* DINING GALLERY */}
        <section className="py-24 bg-surface px-4">
          <div className="max-w-[1440px] mx-auto reveal">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-display-lg text-primary mb-4">
                Dining Gallery
              </h2>
              <div className="w-24 h-1 bg-secondary mx-auto"></div>
            </div>

            <ImageGallery
              images={[
                { src: "/images/restaurant_pavilion_1784569251819.png", alt: "The Pavilion", category: "The Pavilion" },
                { src: "/images/restaurant_luxe_1784569279478.png", alt: "Private Dining Area", category: "The Reserve" },
                { src: "/images/restaurant_pavilion_1784569251819.png", alt: "Food & Drinks", category: "The Pavilion" },
                { src: "/images/restaurant_luxe_1784569279478.png", alt: "Cocktails", category: "The Reserve" },
              ]}
              categories={["The Pavilion", "The Reserve"]}
            />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
