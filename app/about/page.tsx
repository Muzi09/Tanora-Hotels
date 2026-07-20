"use client";
import React from "react";
import Image from "next/image";
import Header from "@/components/section/Header";
import Footer from "@/components/section/Footer";
import RevealObserver from "@/components/RevealObserver";
import MaterialIcon from "@/components/ui/MaterialIcon";
import AmenitiesGrid from "@/components/ui/AmenitiesGrid";

export default function AboutPage() {
  return (
    <>
      <RevealObserver />
      <Header />
      <main className="pt-16">
        
        {/* HERO BANNER */}
        <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center text-center px-4">
          <Image
            src="/images/hero_hotel_1784569172973.png"
            alt="Tanora Hotel"
            fill
            className="object-cover parallax-bg"
            priority
          />
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative z-10 reveal">
            <h1 className="text-5xl md:text-6xl font-display-lg text-white mb-4">
              About Tanora Hotel
            </h1>
            <div className="w-24 h-1 bg-secondary mx-auto"></div>
          </div>
        </section>

        {/* HOTEL STORY */}
        <section className="py-24 bg-surface px-4">
          <div className="max-w-4xl mx-auto text-center reveal">
            <h2 className="text-sm md:text-base font-bold text-secondary uppercase tracking-[0.2em] mb-4">
              Hotel Story
            </h2>
            <h3 className="text-4xl md:text-5xl font-display-lg text-primary mb-10">
              Welcome to Tanora Hotel
            </h3>
            
            <p className="text-lg text-on-surface-variant leading-relaxed mb-6 text-justify md:text-center">
              Nestled in the vibrant heart of Indore, Tanora Hotel is a premium 3-star property that offers more than just a place to stay. It is a sanctuary of comfort, elegance, and genuine hospitality. From the moment you arrive, our dedication to creating unforgettable experiences ensures that your time with us is nothing short of exceptional.
            </p>
            <p className="text-lg text-on-surface-variant leading-relaxed text-justify md:text-center">
              At Tanora, we perfectly blend modern convenience with timeless charm. As a proud 3-star hotel, our thoughtfully designed rooms and suites offer a peaceful retreat from the city's hustle and bustle. Whether you are winding down after a busy day of business or exploring Indore’s rich culture, our attentive staff is committed to anticipating your needs with personalized, warm service.
            </p>
          </div>
        </section>

        {/* WHY CHOOSE TANORA */}
        <section className="py-24 bg-surface-container-low px-4">
          <div className="max-w-[1440px] mx-auto reveal">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-display-lg text-primary mb-4">
                Why Choose Tanora
              </h2>
              <div className="w-24 h-1 bg-secondary mx-auto"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: "Elegant 3-Star Accommodation",
                  desc: "Beautifully appointed rooms equipped with modern amenities.",
                  icon: "bedroom_parent"
                },
                {
                  title: "Delightful Dining",
                  desc: "Curated culinary experiences featuring local and international cuisine.",
                  icon: "restaurant"
                },
                {
                  title: "Hospitality from the Heart",
                  desc: "Exceptional round-the-clock service.",
                  icon: "favorite"
                },
                {
                  title: "An Oasis of Calm",
                  desc: "Peaceful atmosphere for complete relaxation.",
                  icon: "spa"
                }
              ].map((item, idx) => (
                <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-surface-variant text-center hover:shadow-xl transition-shadow group">
                  <div className="w-20 h-20 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary transition-colors">
                    <MaterialIcon name={item.icon} className="text-4xl text-primary group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-xl font-display-lg text-primary mb-4">{item.title}</h3>
                  <p className="text-on-surface-variant">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* MISSION & VISION */}
        <section className="py-24 bg-primary text-white px-4 relative overflow-hidden">
          <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 relative z-10 reveal">
            <div className="bg-white/5 p-10 rounded-3xl border border-white/10 backdrop-blur-md">
              <div className="flex items-center gap-4 mb-6">
                <MaterialIcon name="flag" className="text-secondary-fixed text-4xl" />
                <h2 className="text-3xl font-display-lg text-secondary-fixed">Our Mission</h2>
              </div>
              <p className="text-lg leading-relaxed text-white/90">
                At Tanora Hotel, our mission is to deliver comfortable, modern, and affordable stays with genuine hospitality. We are committed to providing clean, well-equipped rooms and friendly service that makes every guest feel welcome and cared for, ensuring a pleasant and hassle-free experience from check-in to check-out.
              </p>
            </div>

            <div className="bg-white/5 p-10 rounded-3xl border border-white/10 backdrop-blur-md">
              <div className="flex items-center gap-4 mb-6">
                <MaterialIcon name="visibility" className="text-secondary-fixed text-4xl" />
                <h2 className="text-3xl font-display-lg text-secondary-fixed">Our Vision</h2>
              </div>
              <p className="text-lg leading-relaxed text-white/90">
                Our vision is to become the preferred choice for travelers in Indore by building a reputation as a reliable, new-generation hotel that prioritizes guest comfort, value, and satisfaction. We aim to create memorable stays that inspire guests to return again and again.
              </p>
            </div>
          </div>
        </section>

        {/* AMENITIES */}
        <section className="py-24 bg-surface px-4">
          <div className="max-w-[1440px] mx-auto reveal">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-display-lg text-primary mb-4">
                Hotel Amenities
              </h2>
              <div className="w-24 h-1 bg-secondary mx-auto"></div>
            </div>
            
            <AmenitiesGrid />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
