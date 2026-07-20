"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/section/Header";
import Footer from "@/components/section/Footer";
import RevealObserver from "@/components/RevealObserver";
import MaterialIcon from "@/components/ui/MaterialIcon";
import ImageGallery from "@/components/ui/ImageGallery";

export default function RoomsPage() {
  return (
    <>
      <RevealObserver />
      <Header />
      <main className="pt-16">
        
        {/* HERO BANNER */}
        <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center text-center px-4">
          <Image
            src="/images/standard_room_1784569189614.png"
            alt="Tanora Rooms"
            fill
            className="object-cover parallax-bg"
            priority
          />
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative z-10 reveal">
            <h2 className="text-sm md:text-base font-bold text-secondary uppercase tracking-[0.3em] mb-4">
              Your Sanctuary of Comfort
            </h2>
            <h1 className="text-5xl md:text-6xl font-display-lg text-white mb-4">
              Stay With Us
            </h1>
            <div className="w-24 h-1 bg-secondary mx-auto mb-6"></div>
            <p className="text-lg text-white/90 max-w-2xl mx-auto leading-relaxed">
              Whether you are traveling for business, a romantic getaway, or a peaceful staycation, our rooms combine modern technology, premium comfort and warm hospitality to create an unforgettable experience.
            </p>
          </div>
        </section>

        {/* STANDARD ROOM */}
        <section className="py-24 bg-surface px-4">
          <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row gap-16 items-center reveal">
            <div className="lg:w-1/2 w-full">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <Image src="/images/standard_room_1784569189614.png" alt="Standard Room" fill className="object-cover" />
              </div>
            </div>
            <div className="lg:w-1/2 w-full">
              <h2 className="text-4xl md:text-5xl font-display-lg text-primary mb-6">
                Standard Room
              </h2>
              <p className="text-lg text-on-surface-variant mb-8 leading-relaxed">
                A perfect blend of elegance and functionality. The Standard Room offers a peaceful retreat featuring modern comforts, a plush king-size bed, and a stylish workspace designed for both relaxation and productivity.
              </p>
              
              <div className="grid grid-cols-2 gap-y-4 gap-x-6 mb-10">
                {[
                  "King Size Bed", "Twin Option", "Premium Linens", "Hypoallergenic Bedding",
                  "Workspace", "High Speed WiFi", "Smart TV", "Netflix & YouTube",
                  "Rain Shower", "Luxury Toiletries", "Mini Bar", "Coffee & Tea Station",
                  "Digital Safe", "Climate Control", "Blackout Curtains", "Fast Charging Ports"
                ].map((amenity, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <MaterialIcon name="check" className="text-secondary" />
                    <span className="text-on-surface-variant font-medium text-sm md:text-base">{amenity}</span>
                  </div>
                ))}
              </div>

              <Link
                href="#"
                className="inline-block px-10 py-4 bg-primary text-white font-bold tracking-widest uppercase rounded-full hover:bg-secondary transition-colors duration-300 shadow-lg"
              >
                Book Now
              </Link>
            </div>
          </div>
        </section>

        {/* EXECUTIVE SUITE */}
        <section className="py-24 bg-surface-container-low px-4">
          <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row-reverse gap-16 items-center reveal">
            <div className="lg:w-1/2 w-full">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <Image src="/images/executive_suite_1784569211005.png" alt="Executive Suite" fill className="object-cover" />
              </div>
            </div>
            <div className="lg:w-1/2 w-full">
              <h2 className="text-4xl md:text-5xl font-display-lg text-primary mb-6">
                Executive Suite
              </h2>
              <p className="text-lg text-on-surface-variant mb-8 leading-relaxed">
                Experience unparalleled luxury in our Executive Suite. Featuring a massive open layout with a dedicated private lounge area, an oversized bathroom, and premium amenities curated for our most discerning guests.
              </p>
              
              <div className="grid grid-cols-2 gap-y-4 gap-x-6 mb-10">
                {[
                  "Massive Open Layout", "Private Lounge Area", "Premium Sofa Set", "Luxury King Bed",
                  "Premium Linens", "Oversized Bathroom", "Luxury Bathroom Amenities", "Premium Coffee Station",
                  "Expanded Wardrobe", "High Speed WiFi", "Smart TV", "Mini Bar",
                  "Digital Safe", "Climate Control", "Everything from Standard Room"
                ].map((amenity, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <MaterialIcon name="check" className="text-secondary" />
                    <span className="text-on-surface-variant font-medium text-sm md:text-base">{amenity}</span>
                  </div>
                ))}
              </div>

              <Link
                href="#"
                className="inline-block px-10 py-4 bg-primary text-white font-bold tracking-widest uppercase rounded-full hover:bg-secondary transition-colors duration-300 shadow-lg"
              >
                Book Now
              </Link>
            </div>
          </div>
        </section>

        {/* ROOM GALLERY */}
        <section className="py-24 bg-surface px-4">
          <div className="max-w-[1440px] mx-auto reveal">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-display-lg text-primary mb-4">
                Rooms Gallery
              </h2>
              <div className="w-24 h-1 bg-secondary mx-auto"></div>
            </div>
            
            <ImageGallery 
              images={[
                { src: "/images/standard_room_1784569189614.png", alt: "Standard Room", category: "Standard Room" },
                { src: "/images/executive_suite_1784569211005.png", alt: "Executive Suite", category: "Executive Suite" },
                { src: "/images/standard_room_1784569189614.png", alt: "Standard Room Details", category: "Standard Room" },
                { src: "/images/executive_suite_1784569211005.png", alt: "Executive Suite Details", category: "Executive Suite" },
              ]}
              categories={["Standard Room", "Executive Suite"]}
            />
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
