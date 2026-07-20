"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import MaterialIcon from "@/components/ui/MaterialIcon";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Rooms & Suites", path: "/rooms" },
    { name: "Dining", path: "/dining" },
    { name: "Rooftop", path: "/rooftop" },
    { name: "Meetings", path: "/meetings" },
    { name: "Banquet", path: "/banquet" },
    { name: "Gallery", path: "/gallery" },
    { name: "Offers", path: "/offers" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          isScrolled
            ? "glass-nav py-3 border-b border-surface-variant shadow-sm"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 flex justify-between items-center">
          <button
            className="md:hidden text-primary"
            onClick={() => setMobileMenuOpen(true)}
          >
            <MaterialIcon name="menu" className="text-3xl" />
          </button>
          
          <Link href="/">
            <h1 className="text-2xl md:text-3xl font-display-lg text-primary tracking-widest font-bold">
              TANORA
            </h1>
          </Link>

          <nav className="hidden xl:flex items-center gap-6">
            {navLinks.slice(0, 5).map((link) => (
              <Link
                key={link.name}
                href={link.path}
                className={`text-sm font-medium tracking-wide uppercase transition-colors hover:text-secondary ${
                  pathname === link.path ? "text-secondary" : "text-on-surface"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="group relative">
              <span className="text-sm font-medium tracking-wide uppercase cursor-pointer text-on-surface hover:text-secondary flex items-center">
                More <MaterialIcon name="expand_more" className="text-lg" />
              </span>
              <div className="absolute top-full left-0 mt-2 bg-surface border border-surface-variant shadow-lg rounded-xl flex flex-col min-w-[200px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                {navLinks.slice(5).map((link) => (
                  <Link
                    key={link.name}
                    href={link.path}
                    className="px-6 py-3 hover:bg-surface-variant hover:text-primary transition-colors text-sm uppercase tracking-wide border-b border-surface-variant last:border-0"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          </nav>

          <div className="flex items-center gap-4">
            <Link
              href="/rooms"
              className="hidden md:flex items-center justify-center bg-primary text-white px-6 py-2.5 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-secondary transition-colors duration-300"
            >
              Book Now
            </Link>
            <a href="tel:8889866686" className="text-primary hover:text-secondary hidden sm:flex">
              <MaterialIcon name="phone" className="text-2xl" />
            </a>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-surface flex flex-col">
          <div className="flex justify-between items-center p-4 border-b border-surface-variant">
            <h1 className="text-2xl font-display-lg text-primary tracking-widest font-bold">
              TANORA
            </h1>
            <button
              className="text-primary p-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <MaterialIcon name="close" className="text-3xl" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-xl font-display-lg tracking-wide ${
                  pathname === link.path ? "text-secondary" : "text-on-surface"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="mt-8">
              <Link
                href="/rooms"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center bg-primary text-white px-6 py-4 rounded-full text-lg font-bold uppercase tracking-widest hover:bg-secondary transition-colors"
              >
                Book Your Stay
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
