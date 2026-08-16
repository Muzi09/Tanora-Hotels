"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/section/Header";
import Footer from "@/components/section/Footer";
import RevealObserver from "@/components/RevealObserver";
import MaterialIcon from "@/components/ui/MaterialIcon";
export default function ContactPage() {
  return (
    <>
      <RevealObserver />
      <Header />
      <main className="pt-16">

        {/* HERO BANNER */}
        <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center text-center px-4">
          <Image
            src="/images/hero_hotel_1784569172973.png"
            alt="Contact Tanora Hotel"
            fill
            className="object-cover parallax-bg"
            priority
          />
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative z-10 reveal">
            <h1 className="text-5xl md:text-6xl font-display-lg text-white mb-6">
              Get In Touch
            </h1>
            <div className="w-24 h-1 bg-secondary mx-auto"></div>
          </div>
        </section>

        <section className="py-24 bg-surface px-4">
          <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 reveal">

            {/* CONTACT DETAILS & MAP */}
            <div>
              <h2 className="text-3xl md:text-4xl font-display-lg text-primary mb-8">
                Contact Details
              </h2>

              <div className="flex flex-col gap-8 mb-12">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/5 rounded-full flex items-center justify-center flex-shrink-0">
                    <MaterialIcon name="location_on" className="text-primary text-2xl" />
                  </div>
                  <div>
                    <h4 className="font-bold text-primary mb-1">Address</h4>
                    <p className="text-on-surface-variant">
                      Tanora Hotel<br />
                      Heart of Indore<br />
                      Madhya Pradesh, India
                    </p>
                    <a
                      href="https://maps.app.goo.gl/yQdyQVsYHpe96Njs9?g_st=iw"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-secondary hover:text-primary font-medium text-sm mt-2 inline-flex items-center gap-1 transition-colors"
                    >
                      <span>Get Directions</span>
                      <MaterialIcon name="open_in_new" className="text-xs" />
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/5 rounded-full flex items-center justify-center flex-shrink-0">
                    <MaterialIcon name="phone" className="text-primary text-2xl" />
                  </div>
                  <div>
                    <h4 className="font-bold text-primary mb-1">Phone</h4>
                    <a href="tel:8889866686" className="text-on-surface-variant hover:text-secondary text-lg transition-colors">
                      8889866686
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/5 rounded-full flex items-center justify-center flex-shrink-0">
                    <MaterialIcon name="mail" className="text-primary text-2xl" />
                  </div>
                  <div>
                    <h4 className="font-bold text-primary mb-1">Email</h4>
                    <a href="mailto:info@tanorahotels.com" className="text-on-surface-variant hover:text-secondary transition-colors">
                      info@tanorahotels.com
                    </a>
                  </div>
                </div>
              </div>

              {/* GOOGLE MAP EMBED */}
              <div className="w-full h-80 md:h-96 bg-surface-variant rounded-2xl overflow-hidden relative border border-surface-variant/50 shadow-lg group">
                <iframe
                  src="https://maps.google.com/maps?q=22.7645434,75.8993094&z=16&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Tanora Hotel Location Map"
                  className="w-full h-full rounded-2xl"
                />
                <div className="absolute top-4 right-4 z-10">
                  <a
                    href="https://maps.app.goo.gl/yQdyQVsYHpe96Njs9?g_st=iw"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white/90 hover:bg-white text-primary text-xs font-bold px-3 py-2 rounded-lg shadow-md backdrop-blur-sm flex items-center gap-1.5 transition-all hover:shadow-lg"
                  >
                    <MaterialIcon name="map" className="text-secondary text-sm" />
                    <span>Open in Google Maps</span>
                    <MaterialIcon name="open_in_new" className="text-[10px]" />
                  </a>
                </div>
              </div>
            </div>

            {/* CONTACT FORM */}
            <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-surface-variant">
              <h2 className="text-3xl md:text-4xl font-display-lg text-primary mb-8">
                Send a Message
              </h2>
              <form className="flex flex-col gap-6">
                <div>
                  <label className="block text-sm font-medium text-primary mb-2 uppercase tracking-wide">Full Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-lg border border-surface-variant focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-colors bg-surface-container-lowest text-on-surface"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-primary mb-2 uppercase tracking-wide">Email Address</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 rounded-lg border border-surface-variant focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-colors bg-surface-container-lowest text-on-surface"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-primary mb-2 uppercase tracking-wide">Phone Number</label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 rounded-lg border border-surface-variant focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-colors bg-surface-container-lowest text-on-surface"
                    placeholder="+91 8889866686"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-primary mb-2 uppercase tracking-wide">Message</label>
                  <textarea
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg border border-surface-variant focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-colors bg-surface-container-lowest text-on-surface resize-none"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>

                <button
                  type="button"
                  className="w-full mt-4 px-8 py-4 bg-primary text-white font-bold tracking-widest uppercase rounded-full hover:bg-secondary transition-colors duration-300 shadow-lg"
                >
                  Send Message
                </button>
              </form>
            </div>

          </div>
        </section>

        {/* QUICK CTAs */}
        <section className="py-16 bg-primary text-center px-4">
          <div className="max-w-2xl mx-auto flex flex-col sm:flex-row justify-center gap-6 reveal">
            <a href="tel:8889866686" className="px-10 py-5 bg-white text-primary font-bold tracking-widest uppercase rounded-full hover:bg-secondary transition-colors duration-300 shadow-lg flex items-center justify-center gap-2">
              <MaterialIcon name="phone" /> Call Now
            </a>
            <a
              href="https://reservations.hotel-spider.com/03w6a62fee16853"
              target="_blank"
              rel="noopener noreferrer"
              className="px-10 py-5 bg-secondary text-primary font-bold tracking-widest uppercase rounded-full hover:bg-white transition-colors duration-300 shadow-lg flex items-center justify-center gap-2 cursor-pointer"
            >
              <MaterialIcon name="event_seat" /> Book Now
            </a>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
