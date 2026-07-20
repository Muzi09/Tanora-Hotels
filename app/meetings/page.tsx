"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/section/Header";
import Footer from "@/components/section/Footer";
import RevealObserver from "@/components/RevealObserver";
import MaterialIcon from "@/components/ui/MaterialIcon";

export default function MeetingsPage() {
  return (
    <>
      <RevealObserver />
      <Header />
      <main className="pt-16">
        
        {/* HERO BANNER */}
        <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center text-center px-4">
          <Image
            src="/images/hero_hotel_1784569172973.png" // placeholder for boardroom
            alt="Corporate Meetings & Conferences"
            fill
            className="object-cover parallax-bg"
            priority
          />
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative z-10 reveal">
            <h1 className="text-5xl md:text-6xl font-display-lg text-white mb-4">
              Corporate Meetings & Conferences
            </h1>
            <div className="w-24 h-1 bg-secondary mx-auto mb-6"></div>
            <p className="text-lg text-white/90 max-w-2xl mx-auto leading-relaxed">
              Elevate your business gatherings with our premium meeting spaces, designed for productivity, privacy, and seamless execution.
            </p>
          </div>
        </section>

        {/* BOARDROOM */}
        <section className="py-24 bg-surface px-4">
          <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row gap-16 items-center reveal">
            <div className="lg:w-1/2 w-full">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <Image src="/images/hero_hotel_1784569172973.png" alt="Boardroom" fill className="object-cover" />
              </div>
            </div>
            <div className="lg:w-1/2 w-full">
              <h2 className="text-sm md:text-base font-bold text-secondary uppercase tracking-[0.2em] mb-2">
                Executive Luxury for High-Stakes Decisions
              </h2>
              <h3 className="text-4xl md:text-5xl font-display-lg text-primary mb-6">
                The Boardroom
              </h3>
              
              <div className="flex items-center gap-2 mb-6">
                <MaterialIcon name="group" className="text-primary text-2xl" />
                <span className="text-lg font-medium text-on-surface">Capacity: 10 to 12 Guests</span>
              </div>

              <div className="grid grid-cols-2 gap-y-4 gap-x-6 mb-10">
                {[
                  "Executive Seating", "Large Meeting Table", "Blackout Curtains", "Private Washroom",
                  "Dedicated Refreshment Station", "Coffee & Tea", "Premium Snacks",
                  "Large Smart TV", "Presentation System", "High Speed WiFi"
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <MaterialIcon name="check" className="text-secondary" />
                    <span className="text-on-surface-variant font-medium text-sm md:text-base">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="mb-8">
                <h4 className="text-lg font-display-lg text-primary mb-3">Best Suited For:</h4>
                <div className="flex flex-wrap gap-3">
                  {["Board Meetings", "Strategy Sessions", "Executive Meetings"].map((suit, idx) => (
                    <span key={idx} className="px-4 py-2 bg-surface-container-high rounded-full text-sm font-medium text-on-surface">
                      {suit}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* REGENT ROOM */}
        <section className="py-24 bg-surface-container-low px-4">
          <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row-reverse gap-16 items-center reveal">
            <div className="lg:w-1/2 w-full">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <Image src="/images/hero_hotel_1784569172973.png" alt="Regent Room" fill className="object-cover" />
              </div>
            </div>
            <div className="lg:w-1/2 w-full">
              <h3 className="text-4xl md:text-5xl font-display-lg text-primary mb-6">
                Regent Room
              </h3>
              
              <div className="flex items-center gap-2 mb-6">
                <MaterialIcon name="group" className="text-primary text-2xl" />
                <span className="text-lg font-medium text-on-surface">Capacity: 5 to 6 Guests</span>
              </div>

              <div className="grid grid-cols-2 gap-y-4 gap-x-6 mb-10">
                {[
                  "Natural Lighting", "Comfortable Seating", "Large Smart TV", "High Speed WiFi"
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <MaterialIcon name="check" className="text-secondary" />
                    <span className="text-on-surface-variant font-medium text-sm md:text-base">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="mb-8">
                <h4 className="text-lg font-display-lg text-primary mb-3">Ideal For:</h4>
                <div className="flex flex-wrap gap-3">
                  {["Interviews", "Client Meetings", "Brainstorming", "Small Team Meetings"].map((suit, idx) => (
                    <span key={idx} className="px-4 py-2 bg-white border border-surface-variant rounded-full text-sm font-medium text-on-surface">
                      {suit}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CORPORATE CATERING & SUPPORT */}
        <section className="py-24 bg-primary text-white px-4">
          <div className="max-w-[1440px] mx-auto reveal">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-display-lg mb-4 text-white">
                Corporate Catering & Support
              </h2>
              <div className="w-24 h-1 bg-secondary mx-auto"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { title: "Coffee Breaks & High Tea", icon: "emoji_food_beverage" },
                { title: "Working Lunches", icon: "lunch_dining" },
                { title: "Technical Assistance", icon: "engineering" },
                { title: "Dedicated Event Support", icon: "support_agent" }
              ].map((item, idx) => (
                <div key={idx} className="bg-white/5 border border-white/10 p-8 rounded-2xl text-center backdrop-blur-sm">
                  <MaterialIcon name={item.icon} className="text-5xl text-secondary-fixed mb-6" />
                  <h3 className="text-xl font-display-lg text-white mb-2">{item.title}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 bg-surface px-4 text-center">
          <div className="max-w-2xl mx-auto reveal">
            <h2 className="text-4xl md:text-5xl font-display-lg text-primary mb-6">
              Ready to host a flawless meeting?
            </h2>
            <p className="text-xl text-on-surface-variant mb-10">
              Contact our dedicated events team to start planning.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
              <a href="tel:8889866686" className="flex items-center gap-3 text-2xl font-bold text-primary hover:text-secondary transition-colors">
                <MaterialIcon name="phone" className="text-3xl" />
                8889866686
              </a>
              <span className="hidden sm:block text-outline-variant">|</span>
              <Link href="/contact" className="px-8 py-4 bg-primary text-white font-bold tracking-widest uppercase rounded-full hover:bg-secondary transition-colors duration-300">
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
