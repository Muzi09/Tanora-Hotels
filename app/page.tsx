"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/section/Header";
import Footer from "@/components/section/Footer";
import RevealObserver from "@/components/RevealObserver";
import AnimatedCard from "@/components/ui/AnimatedCard";
import AmenitiesGrid from "@/components/ui/AmenitiesGrid";
import MaterialIcon from "@/components/ui/MaterialIcon";
import BookingForm from "@/components/section/BookingForm";
import { useBookingModal } from "@/context/BookingModalContext";

export default function Home() {
  const { openBookingModal } = useBookingModal();
  return (
    <>
      <RevealObserver />
      <Header />
      <main className="pt-16">
        <section className="relative min-h-[100vh] lg:h-[90vh] lg:min-h-[600px] flex flex-col justify-end pb-12 pt-16 lg:pt-0 lg:pb-16 px-4 overflow-hidden">
          <Image
            src="/images/hero_hotel_1784569172973.png"
            alt="Tanora Hotel Exterior"
            fill
            className="object-cover parallax-bg scale-105"
            priority
          />
          <div className="absolute inset-0 bg-black/40 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center text-center reveal mb-8">
            <h2 className="text-sm md:text-base font-bold text-secondary-fixed uppercase tracking-[0.3em] mb-4">
              Premium 3 star hotel in Indore
            </h2>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-display-lg text-white leading-tight drop-shadow-xl">
              Luxury Comfort Exceptional Hospitililty
            </h1>
          </div>
          <div className="relative z-10 w-full reveal max-w-[1200px] mx-auto">
            <BookingForm />
          </div>
        </section>

        {/* HOTEL INTRODUCTION */}
        <section className="py-24 bg-surface px-4">
          <div className="max-w-4xl mx-auto text-center reveal">
            <MaterialIcon name="spa" className="text-secondary text-5xl mb-6" />
            <h2 className="text-4xl md:text-5xl font-display-lg text-primary mb-8">
              Welcome to Tanora Hotel
            </h2>
            <p className="text-lg text-on-surface-variant leading-relaxed">
              Nestled in the vibrant heart of Indore, Tanora Hotel is a premium
              3-star property that offers more than just a place to stay. It is
              a sanctuary of comfort, elegance, and genuine hospitality. Every
              stay is designed to deliver unforgettable experiences through
              personalized service, modern comfort, and exceptional hospitality.
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

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {[
                { title: "Elegant 3-Star Accommodation", icon: "king_bed" },
                { title: "Modern Rooms", icon: "bedroom_parent" },
                { title: "Restaurant", icon: "restaurant" },
                { title: "Rooftop Restaurant & Bar", icon: "deck" },
                { title: "Conference Rooms", icon: "video_camera_front" },
                { title: "Banquet Hall", icon: "celebration" },
                { title: "Free WiFi", icon: "wifi" },
                { title: "Valet Parking", icon: "directions_car" },
                { title: "24/7 Service", icon: "support_agent" },
                { title: "Hospitality from the Heart", icon: "favorite" },
              ].map((feature, idx) => (
                <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-shadow text-center flex flex-col items-center border border-surface-variant group">
                  <div className="w-16 h-16 bg-primary/5 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary transition-colors">
                    <MaterialIcon name={feature.icon} className="text-primary text-3xl group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="font-medium text-on-surface leading-snug">{feature.title}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FEATURED ROOMS */}
        <section className="py-24 bg-surface px-4">
          <div className="max-w-[1440px] mx-auto reveal">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
              <div>
                <h2 className="text-4xl md:text-5xl font-display-lg text-primary mb-4">
                  Featured Rooms
                </h2>
                <div className="w-24 h-1 bg-secondary"></div>
              </div>
              <Link href="/rooms" className="text-primary font-bold uppercase tracking-widest hover:text-secondary flex items-center gap-2 transition-colors">
                View All Rooms <MaterialIcon name="arrow_forward" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <AnimatedCard
                imageSrc="/images/standard_room_1784569189614.png"
                title="Standard Room"
                description="A peaceful retreat featuring modern comforts, king-size bed, premium linens, and a stylish workspace designed for both relaxation and productivity."
                linkText="Explore Room"
                linkHref="/rooms"
                amenities={["King Size Bed", "High Speed WiFi", "Smart TV", "Rain Shower"]}
              />
              <AnimatedCard
                imageSrc="/images/executive_suite_1784569211005.png"
                title="Executive Suite"
                description="Our most luxurious offering. A massive open layout suite with a private lounge area, premium sofa set, oversized bathroom, and unparalleled comfort."
                linkText="Explore Suite"
                linkHref="/rooms"
                amenities={["Private Lounge", "Oversized Bathroom", "Premium Coffee", "Luxury Bed"]}
              />
            </div>
          </div>
        </section>

        {/* DINING EXPERIENCE */}
        <section className="py-24 bg-primary text-white px-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

          <div className="max-w-[1440px] mx-auto relative z-10 reveal">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-display-lg mb-4 text-white">
                Dining Experience
              </h2>
              <div className="w-24 h-1 bg-secondary mx-auto"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-surface/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:bg-surface/10 transition-colors group">
                <div className="relative h-64 overflow-hidden">
                  <Image src="/images/restaurant_pavilion_1784569251819.png" alt="The Pavilion" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-display-lg text-secondary-fixed mb-2">The Pavilion</h3>
                  <p className="text-white/70 mb-4">Ground Floor Restaurant offering all-day dining with a curated menu of multi-cuisine delights.</p>
                  <Link href="/dining" className="text-white font-bold tracking-widest text-sm uppercase flex items-center gap-2 hover:text-secondary-fixed">
                    Explore <MaterialIcon name="chevron_right" />
                  </Link>
                </div>
              </div>

              <div className="bg-surface/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:bg-surface/10 transition-colors group">
                <div className="relative h-64 overflow-hidden">
                  <Image src="/images/restaurant_luxe_1784569279478.png" alt="The LUXE" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-display-lg text-secondary-fixed mb-2">The LUXE</h3>
                  <p className="text-white/70 mb-4">Rooftop Restaurant & Bar featuring city skyline views, premium spirits, and fusion cuisine.</p>
                  <Link href="/rooftop" className="text-white font-bold tracking-widest text-sm uppercase flex items-center gap-2 hover:text-secondary-fixed">
                    Explore <MaterialIcon name="chevron_right" />
                  </Link>
                </div>
              </div>

              <div className="bg-surface/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:bg-surface/10 transition-colors group flex flex-col justify-center items-center text-center p-8 border-dashed">
                <MaterialIcon name="wine_bar" className="text-5xl text-secondary-fixed mb-4" />
                <h3 className="text-2xl font-display-lg text-secondary-fixed mb-2">Private Dining</h3>
                <p className="text-white/70 mb-6">Exclusive private dining rooms for VIP experiences and intimate celebrations.</p>
                <Link href="/dining" className="text-white font-bold tracking-widest text-sm uppercase flex items-center gap-2 hover:text-secondary-fixed border border-white/20 px-6 py-3 rounded-full hover:bg-white/10">
                  View Details
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* MEETING & EVENTS */}
        <section className="py-24 bg-surface-container-low px-4">
          <div className="max-w-[1440px] mx-auto reveal">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-display-lg text-primary mb-4">
                Meetings & Events
              </h2>
              <div className="w-24 h-1 bg-secondary mx-auto"></div>
              <p className="mt-6 text-on-surface-variant max-w-2xl mx-auto">
                Host your next corporate meeting or grand celebration in our premium, state-of-the-art event spaces.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <AnimatedCard
                imageSrc="/images/hero_hotel_1784569172973.png" // placeholder
                title="Boardroom"
                description="Executive luxury for high-stakes decisions. Private, fully-equipped space for 10-12 guests."
                linkText="Details"
                linkHref="/meetings"
              />
              <AnimatedCard
                imageSrc="/images/hero_hotel_1784569172973.png" // placeholder
                title="Regent Room"
                description="Ideal for interviews, brainstorming, and small team meetings for 5-6 guests with natural lighting."
                linkText="Details"
                linkHref="/meetings"
              />
              <AnimatedCard
                imageSrc="/images/banquet_hall_1784569314141.png"
                title="The Ballroom"
                description="Elegant 1,000+ sq ft premium banquet hall perfect for birthdays, private celebrations, and social gatherings."
                linkText="Explore Banquet"
                linkHref="/banquet"
              />
            </div>
          </div>
        </section>

        {/* HOTEL AMENITIES */}
        <section className="py-24 bg-surface px-4">
          <div className="max-w-[1440px] mx-auto reveal">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-display-lg text-primary mb-4">
                Comprehensive Amenities
              </h2>
              <div className="w-24 h-1 bg-secondary mx-auto"></div>
            </div>

            <AmenitiesGrid />
          </div>
        </section>

        {/* PROMOTIONAL BANNER */}
        <section className="relative py-32 bg-primary flex items-center justify-center text-center px-4">
          <div className="absolute inset-0 opacity-20">
            <Image src="/images/hero_hotel_1784569172973.png" alt="Background" fill className="object-cover" />
          </div>
          <div className="relative z-10 max-w-3xl mx-auto reveal">
            <h2 className="text-5xl md:text-6xl font-display-lg text-white mb-6">
              Luxury Stay Awaits
            </h2>
            <p className="text-xl text-white/90 mb-10 font-light">
              Book directly with us and enjoy exclusive offers, premium hospitality and unforgettable experiences.
            </p>
            <button
              onClick={openBookingModal}
              className="inline-block px-10 py-5 bg-secondary text-primary font-bold text-lg tracking-widest uppercase rounded-full hover:bg-white transition-colors duration-300 shadow-xl cursor-pointer"
            >
              Book Now
            </button>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
