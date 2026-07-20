"use client";
import React from "react";
import Header from "@/components/section/Header";
import Footer from "@/components/section/Footer";
import RevealObserver from "@/components/RevealObserver";
import ImageGallery from "@/components/ui/ImageGallery";

export default function GalleryPage() {
  const images = [
    // Hotel
    { src: "/images/hero_hotel_1784569172973.png", alt: "Hotel Exterior", category: "Hotel" },
    { src: "/images/hero_hotel_1784569172973.png", alt: "Lobby", category: "Hotel" },
    
    // Rooms
    { src: "/images/standard_room_1784569189614.png", alt: "Standard Room", category: "Rooms" },
    { src: "/images/executive_suite_1784569211005.png", alt: "Executive Suite", category: "Rooms" },
    
    // Restaurant & Rooftop
    { src: "/images/restaurant_pavilion_1784569251819.png", alt: "The Pavilion", category: "Restaurant" },
    { src: "/images/restaurant_luxe_1784569279478.png", alt: "The LUXE Rooftop", category: "Rooftop" },
    { src: "/images/restaurant_luxe_1784569279478.png", alt: "Private Dining", category: "Restaurant" },
    
    // Events
    { src: "/images/hero_hotel_1784569172973.png", alt: "Boardroom", category: "Events" }, // Using placeholder
    { src: "/images/hero_hotel_1784569172973.png", alt: "Regent Room", category: "Events" },
    { src: "/images/banquet_hall_1784569314141.png", alt: "Banquet Hall", category: "Events" },
    
    // Food & Drinks
    { src: "/images/restaurant_pavilion_1784569251819.png", alt: "Gourmet Dish", category: "Food" },
    { src: "/images/restaurant_luxe_1784569279478.png", alt: "Cocktails", category: "Drinks" },
    
    // Ambiance
    { src: "/images/hero_hotel_1784569172973.png", alt: "Ambiance", category: "Ambiance" },
  ];

  const categories = [
    "Hotel", "Rooms", "Restaurant", "Rooftop", "Events", "Food", "Drinks", "Ambiance"
  ];

  return (
    <>
      <RevealObserver />
      <Header />
      <main className="pt-24 pb-24 bg-surface min-h-screen px-4">
        <div className="max-w-[1440px] mx-auto reveal">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-display-lg text-primary mb-6">
              Our Gallery
            </h1>
            <div className="w-24 h-1 bg-secondary mx-auto mb-8"></div>
            <p className="text-lg text-on-surface-variant max-w-2xl mx-auto">
              Explore the luxurious spaces, exquisite dining, and grand event venues that make Tanora Hotel an unforgettable destination.
            </p>
          </div>
          
          <ImageGallery images={images} categories={categories} />
        </div>
      </main>
      <Footer />
    </>
  );
}
