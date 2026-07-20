import React from "react";
import Link from "next/link";
import MaterialIcon from "@/components/ui/MaterialIcon";

export default function Footer() {
  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Rooms & Suites", path: "/rooms" },
    { name: "Restaurants & Dining", path: "/dining" },
    { name: "Rooftop Bar", path: "/rooftop" },
    { name: "Meeting & Conference", path: "/meetings" },
    { name: "Banquet Hall", path: "/banquet" },
    { name: "Gallery", path: "/gallery" },
    { name: "Offers", path: "/offers" },
    { name: "Contact Us", path: "/contact" },
  ];

  const amenities = [
    "Free WiFi", "Valet Parking", "24/7 Service", "Room Service", 
    "Meeting Rooms", "Banquet Hall", "Restaurants", "Rooftop Bar"
  ];

  return (
    <footer className="bg-primary text-white pt-16 pb-8 border-t-4 border-secondary">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          <div className="flex flex-col gap-6">
            <h1 className="text-3xl font-display-lg tracking-widest text-secondary-fixed">
              TANORA
            </h1>
            <p className="text-white/80 font-body-md leading-relaxed">
              Nestled in the vibrant heart of Indore, Tanora Hotel is a premium 3-star property offering a sanctuary of comfort, elegance, and genuine hospitality.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-secondary hover:border-secondary transition-all">
                <MaterialIcon name="share" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-secondary hover:border-secondary transition-all">
                <MaterialIcon name="photo_camera" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-display-lg mb-6 text-secondary-fixed uppercase tracking-wider">Quick Links</h3>
            <ul className="grid grid-cols-2 gap-y-3 gap-x-4">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.path} className="text-white/80 hover:text-secondary-fixed transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-display-lg mb-6 text-secondary-fixed uppercase tracking-wider">Key Amenities</h3>
            <ul className="grid grid-cols-2 gap-y-3 gap-x-4">
              {amenities.map((item, idx) => (
                <li key={idx} className="flex items-center gap-2 text-white/80 text-sm">
                  <MaterialIcon name="check_circle" className="text-secondary text-base" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-6">
            <h3 className="text-lg font-display-lg text-secondary-fixed uppercase tracking-wider">Contact Us</h3>
            <div className="flex flex-col gap-4 text-white/80 text-sm">
              <a href="tel:8889866686" className="flex items-center gap-3 hover:text-secondary transition-colors">
                <MaterialIcon name="phone" className="text-secondary text-xl" />
                8889866686
              </a>
              <a href="mailto:info@tanorahotels.com" className="flex items-center gap-3 hover:text-secondary transition-colors">
                <MaterialIcon name="mail" className="text-secondary text-xl" />
                info@tanorahotels.com
              </a>
              <p className="flex items-start gap-3">
                <MaterialIcon name="location_on" className="text-secondary text-xl" />
                <span>Indore, Madhya Pradesh<br/>India</span>
              </p>
            </div>
            <Link
              href="/rooms"
              className="mt-2 inline-flex justify-center bg-secondary text-primary font-bold px-6 py-3 rounded-full hover:bg-white transition-colors"
            >
              Book Your Stay
            </Link>
          </div>

        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-white/60 text-xs tracking-widest text-center md:text-left">
          <p>© 2026 TANORA HOTEL. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-white">PRIVACY POLICY</Link>
            <Link href="/terms" className="hover:text-white">TERMS OF SERVICE</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
