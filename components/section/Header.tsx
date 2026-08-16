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

  // Prevent scrolling when mobile drawer is active
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

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
            : "bg-transparent py-3"
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 flex justify-between items-center">
          <button
            className="md:hidden text-primary p-1 hover:opacity-80 transition-opacity"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open mobile menu"
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
            <a
              href="https://reservations.hotel-spider.com/03w6a62fee16853"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center justify-center bg-primary text-white px-6 py-2.5 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-secondary transition-colors duration-300 shadow-md"
            >
              Book Now
            </a>
            <a href="tel:8889866686" className="text-primary hover:text-secondary flex">
              <MaterialIcon name="phone" className="text-2xl" />
            </a>
          </div>
        </div>
      </header>

      {/* Animated Mobile Sidebar Backdrop */}
      <div
        className={`fixed inset-0 z-[90] bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Animated Mobile Sidebar Drawer */}
      <div
        className={`fixed top-0 left-0 bottom-0 z-[100] w-[300px] max-w-[85vw] bg-surface border-r border-surface-variant shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-5 border-b border-surface-variant">
          <h1 className="text-2xl font-display-lg text-primary tracking-widest font-bold">
            TANORA
          </h1>
          <button
            className="text-primary p-2 hover:bg-surface-variant rounded-full transition-colors"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            <MaterialIcon name="close" className="text-2xl" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-5">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`text-lg font-display-lg tracking-wide py-1 border-b border-surface-variant/40 transition-colors ${
                pathname === link.path ? "text-secondary font-bold" : "text-on-surface hover:text-secondary"
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="mt-6 pt-4 border-t border-surface-variant">
            <a
              href="https://reservations.hotel-spider.com/03w6a62fee16853"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center bg-primary text-white px-6 py-3.5 rounded-full text-base font-bold uppercase tracking-widest hover:bg-secondary transition-colors shadow-lg"
            >
              Book Now
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
