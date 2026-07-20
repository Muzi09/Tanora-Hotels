"use client";

import MaterialIcon from "@/components/ui/MaterialIcon";
import { useParallax } from "@/lib/useParallax";

const HERO_BG =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCIF6Ji2fQoN8drFISbxYwgfTp5xhuO8SYHQ3RZgd9ymS35YHlwyEsaFGn6XvRL4ypq1OsFR9-T_k2Y5lkXwZu5e3v9mqybcXH1EwRXcCh4URnIMPGjWPMBY_15dZlZu4wZeyIUMF3awE1dOyhjGNgQsI_q6JVNZo-EqaPMtc-vMeCq7Q3eD10WtcAGUMNJXeRtbuZhaW2wjI-a2avPZqrVTrvec0eY91KscOa5kDpWhs7rUJW0vJHFWCGaAwFdVx28sfylueD0X17z";

const LOGO =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAMZ39XS1GQJZwsww0rSIcpapoorKFSwe_YEZCJ_2t2cyJE6AkNt1c2S6NiHkCMMw7SAWud1PZ1FlarhFuDoMmANMHEOQamSa_SXBBhTHZyDeQtrnCaME54XlROTKgbfCWbbQKgQoC8DgJBDOqSznMKpea8VoRsJnl18DJrRbvMXwMuVFjkARjyY5zBOtYBAVy7SpSSrBHWcRs6GKzubGYq1zvxryhz-ZooElvluenYwHDrgW-dISRvq85Aj8rL-15oISYn2UJW7r6q";

export default function Hero() {
  useParallax();

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div
          className="parallax-bg w-full h-full brightness-[0.6]"
          data-alt="A cinematic, wide-angle shot of a grand, luxury hotel facade at twilight. The architectural details are illuminated by warm, golden lighting against a deep indigo sky. The surrounding gardens are lush and perfectly manicured, reflecting a modern luxury aesthetic with a calm, exclusive atmosphere. Soft ambient light spills from large glass windows, creating a welcoming glow."
          style={{ backgroundImage: `url('${HERO_BG}')` }}
        />
      </div>
      <div className="relative z-10 w-full max-w-[1100px] px-4 mx-auto mt-20">
        <div className="mb-12 animate-pulse transition-opacity duration-1000">
          <img
            alt="TANORA Logo"
            className="mx-auto w-48 md:w-56 drop-shadow-2xl"
            src={LOGO}
          />
        </div>

        {/* Booking Form */}
        <div className="w-full bg-black/40 backdrop-blur-md p-6 border border-white/10 shadow-2xl">
          {/* Top Row: Toggle */}
          <div className="flex items-center gap-3 mb-6">
            <span className="text-white text-sm font-medium tracking-wide">Overnight</span>
            <div className="w-10 h-5 bg-white rounded-full flex items-center p-0.5 cursor-pointer shadow-inner">
              <div className="w-4 h-4 bg-[#D4B776] rounded-full shadow-sm"></div>
            </div>
            <span className="text-white text-sm font-medium tracking-wide">Day Use</span>
          </div>

          {/* First Grid Row: Place & Hotel */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="flex flex-col w-full text-left">
              <span className="text-white text-[11px] uppercase tracking-wider mb-1.5 font-medium">Place</span>
              <div className="bg-white text-gray-800 h-12 px-3 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-2 overflow-hidden">
                  <MaterialIcon name="place" className="text-gray-400 text-[20px]" />
                  <span className="text-sm font-medium">Indore</span>
                </div>
                <MaterialIcon name="keyboard_arrow_down" className="text-gray-400 text-[20px] flex-shrink-0" />
              </div>
            </div>

            <div className="flex flex-col w-full text-left">
              <span className="text-white text-[11px] uppercase tracking-wider mb-1.5 font-medium">Hotel</span>
              <div className="bg-white text-gray-800 h-12 px-3 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-2 overflow-hidden">
                  <MaterialIcon name="business" className="text-gray-400 text-[20px]" />
                  <span className="text-sm font-medium truncate">Jardin Hotels, Nipania, Indore</span>
                </div>
                <MaterialIcon name="keyboard_arrow_down" className="text-gray-400 text-[20px] flex-shrink-0" />
              </div>
            </div>
          </div>

          {/* Second Grid Row */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
            <div className="flex flex-col w-full text-left">
              <span className="text-white text-[11px] uppercase tracking-wider mb-1.5 font-medium">Check In</span>
              <div className="bg-white text-gray-800 h-12 px-3 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-2 overflow-hidden">
                  <MaterialIcon name="calendar_today" className="text-gray-400 text-[18px]" />
                  <span className="text-sm font-medium">21 Jul '26, Tue</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col w-full text-left">
              <span className="text-white text-[11px] uppercase tracking-wider mb-1.5 font-medium">Check Out</span>
              <div className="bg-white text-gray-800 h-12 px-3 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-2 overflow-hidden">
                  <MaterialIcon name="calendar_today" className="text-gray-400 text-[18px]" />
                  <span className="text-sm font-medium">22 Jul '26, Wed</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col w-full text-left">
              <span className="text-white text-[11px] uppercase tracking-wider mb-1.5 font-medium">Rooms & Guests</span>
              <div className="bg-white text-gray-800 h-12 px-3 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-2 overflow-hidden">
                  <MaterialIcon name="person" className="text-gray-400 text-[18px]" />
                  <span className="text-sm font-medium">1 Room, 1 Guest</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col w-full text-left">
              <span className="text-white text-[11px] uppercase tracking-wider mb-1.5 font-medium">Promo Code</span>
              <div className="bg-white text-gray-800 h-12 px-3 flex items-center">
                <MaterialIcon name="local_offer" className="text-gray-400 text-[18px] mr-2" />
                <input type="text" placeholder="Promo Code" className="w-full h-full outline-none text-sm font-medium bg-transparent placeholder:text-gray-500" />
              </div>
            </div>

            <div className="flex flex-col w-full text-center">
              <span className="text-white text-[11px] tracking-wider mb-1.5 font-medium whitespace-nowrap">From 2,634 INR/Night</span>
              <button className="bg-[#D4B776] hover:bg-[#c4a660] text-white h-12 font-medium tracking-widest uppercase transition-colors shadow-lg">
                Book Now
              </button>
            </div>
          </div>

          {/* Bottom Row: Links */}
          <div className="flex flex-wrap items-center justify-between mt-6 text-white text-[11px] tracking-wider uppercase font-medium">
            <div className="flex items-center gap-1.5 cursor-pointer hover:text-[#D4B776] transition-colors">
              <MaterialIcon name="remove_circle" className="text-[16px]" />
              <span>Show Less</span>
            </div>
            <div className="flex gap-8">
              <a href="#" className="hover:text-[#D4B776] transition-colors">Why Book Direct?</a>
              <a href="#" className="hover:text-[#D4B776] transition-colors">Manage Booking</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
