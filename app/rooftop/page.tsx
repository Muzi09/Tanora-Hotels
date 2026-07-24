"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/section/Header";
import Footer from "@/components/section/Footer";
import RevealObserver from "@/components/RevealObserver";
import MaterialIcon from "@/components/ui/MaterialIcon";
import ImageGallery from "@/components/ui/ImageGallery";

export default function RooftopPage() {
  return (
    <>
      <RevealObserver />
      <Header />
      <main className="pt-14 sm:pt-16">

        {/* HERO BANNER */}
        <section className="relative h-[80vh] min-h-[500px] flex items-center justify-center text-center px-4">
          <Image
            src="/images/restaurant_luxe_1784569279478.png"
            alt="The LUXE Rooftop Restaurant & Bar"
            fill
            className="object-cover parallax-bg"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
          <div className="relative z-10 reveal mt-20">
            <h2 className="text-sm md:text-base font-bold text-secondary-fixed uppercase tracking-[0.4em] mb-4">
              Rooftop Restaurant & Bar
            </h2>
            <h1 className="text-6xl md:text-8xl font-display-lg text-white mb-6">
              The LUXE
            </h1>
            <div className="w-32 h-1 bg-secondary-fixed mx-auto mb-8"></div>
            <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed font-light">
              Elevate your evenings with panoramic city skyline views, premium spirits, and an unforgettable nightlife experience.
            </p>
          </div>
        </section>

        {/* DETAILS */}
        <section className="py-24 bg-tertiary text-white px-4">
          <div className="max-w-[1440px] mx-auto reveal">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { title: "Luxury Ambiance", icon: "deck", desc: "Open-air seating under the stars with sophisticated decor." },
                { title: "City Skyline", icon: "location_city", desc: "Breathtaking panoramic views of the vibrant city." },
                { title: "Premium Spirits", icon: "liquor", desc: "Curated cocktails, fine wines, and rare spirits." },
                { title: "Fusion Cuisine", icon: "restaurant", desc: "Charcoal grills and global fusion delicacies." }
              ].map((item, idx) => (
                <div key={idx} className="bg-tertiary-container p-8 rounded-2xl border border-white/5 text-center hover:bg-white/5 transition-colors group">
                  <MaterialIcon name={item.icon} className="text-5xl text-secondary-fixed mb-6 group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-display-lg text-white mb-3">{item.title}</h3>
                  <p className="text-white/70">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* EXPERIENCE TEXT */}
        <section className="py-24 bg-surface px-4">
          <div className="max-w-4xl mx-auto text-center reveal">
            <MaterialIcon name="nightlife" className="text-secondary text-6xl mb-6" />
            <h2 className="text-4xl md:text-5xl font-display-lg text-primary mb-8">
              A Nightlife Experience Like No Other
            </h2>
            <p className="text-lg text-on-surface-variant leading-relaxed">
              The LUXE is the ultimate destination for those looking to unwind in style. Whether you are sipping on our signature cocktails, enjoying the finest wine collection, or indulging in our charcoal grills and fusion cuisine, the elegant open-air seating and evening events create the perfect sophisticated ambiance.
            </p>
          </div>
        </section>

        {/* GALLERY */}
        <section className="py-24 bg-surface-container-low px-4">
          <div className="max-w-[1440px] mx-auto reveal">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-display-lg text-primary mb-4">
                The LUXE Gallery
              </h2>
              <div className="w-24 h-1 bg-secondary mx-auto"></div>
            </div>

            <ImageGallery
              images={[
                { src: "/images/restaurant_luxe_1784569279478.png", alt: "The LUXE Ambiance", category: "Ambiance" },
                { src: "/images/restaurant_luxe_1784569279478.png", alt: "Cocktails", category: "Drinks" },
                { src: "/images/restaurant_luxe_1784569279478.png", alt: "Food", category: "Food" },
                { src: "/images/restaurant_luxe_1784569279478.png", alt: "Evening View", category: "Ambiance" },
              ]}
              categories={["Ambiance", "Drinks", "Food"]}
            />
          </div>
        </section>

        {/* RESERVATION CTA */}
        <section className="py-24 bg-tertiary text-white px-4 text-center">
          <div className="max-w-3xl mx-auto reveal">
            <h2 className="text-4xl md:text-5xl font-display-lg text-secondary-fixed mb-6">
              Reserve Your Table
            </h2>
            <p className="text-xl text-white/80 mb-10">
              Ensure your spot at the most exclusive rooftop destination in the city.
            </p>
            <div className="flex justify-center gap-6">
              <Link href="/contact" className="px-10 py-5 bg-secondary-fixed text-tertiary font-bold tracking-widest uppercase rounded-full hover:bg-white transition-colors duration-300 shadow-lg">
                Make a Reservation
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
