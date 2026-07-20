"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/section/Header";
import Footer from "@/components/section/Footer";
import RevealObserver from "@/components/RevealObserver";
import MaterialIcon from "@/components/ui/MaterialIcon";
import ImageGallery from "@/components/ui/ImageGallery";

export default function BanquetPage() {
  return (
    <>
      <RevealObserver />
      <Header />
      <main className="pt-16">
        
        {/* HERO BANNER */}
        <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center text-center px-4">
          <Image
            src="/images/banquet_hall_1784569314141.png"
            alt="The Ballroom Banquet Hall"
            fill
            className="object-cover parallax-bg"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-10 reveal">
            <h2 className="text-sm md:text-base font-bold text-secondary uppercase tracking-[0.3em] mb-4">
              Premium Banquet Hall
            </h2>
            <h1 className="text-5xl md:text-7xl font-display-lg text-white mb-6">
              The Ballroom
            </h1>
            <div className="w-24 h-1 bg-secondary mx-auto mb-6"></div>
            <p className="text-lg text-white/90 max-w-2xl mx-auto leading-relaxed">
              Elegant 1,000+ sq ft banquet hall perfect for birthdays, private celebrations, social gatherings and intimate events.
            </p>
          </div>
        </section>

        {/* HIGHLIGHTS */}
        <section className="py-24 bg-surface px-4">
          <div className="max-w-[1440px] mx-auto reveal">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-display-lg text-primary mb-4">
                Grand Celebrations Start Here
              </h2>
              <div className="w-24 h-1 bg-secondary mx-auto"></div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {[
                { title: "Private Entrance", icon: "door_front" },
                { title: "VIP Experience", icon: "stars" },
                { title: "Premium Catering", icon: "restaurant_menu" },
                { title: "Custom Menus", icon: "menu_book" },
                { title: "Cocktail Service", icon: "local_bar" },
                { title: "Mocktail Service", icon: "local_drink" },
                { title: "Audio Visual Setup", icon: "settings_input_hdmi" },
                { title: "DJ Setup", icon: "speaker" },
                { title: "Flexible Seating", icon: "chair" },
                { title: "Party Layout", icon: "celebration" },
                { title: "Elegant Dining Layout", icon: "restaurant" }
              ].map((item, idx) => (
                <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-surface-variant flex flex-col items-center text-center hover:shadow-md transition-shadow">
                  <div className="w-16 h-16 bg-primary/5 rounded-full flex items-center justify-center mb-4">
                    <MaterialIcon name={item.icon} className="text-3xl text-primary" />
                  </div>
                  <h3 className="font-medium text-on-surface">{item.title}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* EVENT PHOTOS GALLERY */}
        <section className="py-24 bg-surface-container-low px-4">
          <div className="max-w-[1440px] mx-auto reveal">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-display-lg text-primary mb-4">
                Event Gallery
              </h2>
              <div className="w-24 h-1 bg-secondary mx-auto"></div>
            </div>
            
            <ImageGallery 
              images={[
                { src: "/images/banquet_hall_1784569314141.png", alt: "Banquet Hall Setup", category: "Setup" },
                { src: "/images/banquet_hall_1784569314141.png", alt: "Dining Layout", category: "Dining" },
                { src: "/images/banquet_hall_1784569314141.png", alt: "Stage Area", category: "Setup" },
                { src: "/images/banquet_hall_1784569314141.png", alt: "Party Decor", category: "Events" },
              ]}
              categories={["Setup", "Dining", "Events"]}
            />
          </div>
        </section>

        {/* BOOKING CTA */}
        <section className="py-24 bg-primary text-white text-center px-4">
          <div className="max-w-3xl mx-auto reveal">
            <MaterialIcon name="celebration" className="text-secondary-fixed text-6xl mb-6" />
            <h2 className="text-4xl md:text-5xl font-display-lg mb-6">
              Ready to host your next unforgettable event?
            </h2>
            <p className="text-xl text-white/80 mb-10">
              Our dedicated events team is here to bring your vision to life.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link href="/contact" className="px-10 py-5 bg-secondary text-primary font-bold tracking-widest uppercase rounded-full hover:bg-white transition-colors duration-300 shadow-lg">
                Request a Proposal
              </Link>
              <a href="tel:8889866686" className="px-10 py-5 bg-transparent border-2 border-secondary text-secondary font-bold tracking-widest uppercase rounded-full hover:bg-secondary hover:text-primary transition-colors duration-300 shadow-lg flex items-center justify-center gap-3">
                <MaterialIcon name="phone" /> Call Now
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
