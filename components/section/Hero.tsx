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
      <div className="relative z-10 text-center px-4 max-w-4xl">
        <div className="mb-12 animate-pulse transition-opacity duration-1000">
          <img
            alt="TANORA Logo"
            className="mx-auto w-48 md:w-64 drop-shadow-2xl"
            src={LOGO}
          />
        </div>
        <h2 className="text-white font-display-lg text-[40px] md:text-display-lg leading-tight mb-8 drop-shadow-lg">
          A Heritage of Quiet Confidence
        </h2>
        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          <button className="bg-primary text-secondary-fixed px-10 py-4 font-label-sm uppercase tracking-widest hover:bg-primary-container transition-all duration-300 shadow-xl group">
            Explore Suites
            <MaterialIcon
              name="arrow_forward"
              className="align-middle ml-2 text-sm group-hover:translate-x-1 transition-transform"
            />
          </button>
          <button className="border border-secondary-fixed text-secondary-fixed px-10 py-4 font-label-sm uppercase tracking-widest hover:bg-secondary-fixed hover:text-primary transition-all duration-300 backdrop-blur-sm">
            Inquire for Events
          </button>
        </div>
      </div>
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/60 flex flex-col items-center animate-bounce">
        <span className="text-[10px] tracking-[0.3em] uppercase mb-2">
          Scroll
        </span>
        <MaterialIcon name="expand_more" />
      </div>
    </section>
  );
}
