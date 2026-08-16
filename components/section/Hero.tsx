"use client";

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
          data-alt="A cinematic facade of Tanora Hotel."
          style={{ backgroundImage: `url('${HERO_BG}')` }}
        />
      </div>
      <div className="relative z-10 w-full max-w-[1100px] px-4 mx-auto mt-20 text-center">
        <div className="mb-12 animate-pulse transition-opacity duration-1000">
          <img
            alt="TANORA Logo"
            className="mx-auto w-48 md:w-56 drop-shadow-2xl"
            src={LOGO}
          />
        </div>

        <a
          href="https://reservations.hotel-spider.com/03w6a62fee16853"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-10 py-5 bg-[#D4B776] hover:bg-[#c4a660] text-white font-bold text-lg tracking-widest uppercase rounded-full transition-colors duration-300 shadow-xl cursor-pointer"
        >
          Book Now
        </a>
      </div>
    </section>
  );
}
