"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu as MenuIcon, X as XIcon, ChevronRight as ChevronRightIcon } from "lucide-react";
import { clubConfig } from "@/config/club";

const Menu = MenuIcon as any;
const X = XIcon as any;
const ChevronRight = ChevronRightIcon as any;

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-brand-dark/95 backdrop-blur-md py-3 border-b border-brand-blue/40 shadow-xl"
          : "bg-gradient-to-b from-brand-dark/90 to-transparent py-4 sm:py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Official Brand Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 sm:gap-3 group focus:outline-none focus:ring-2 focus:ring-brand-orange"
            id="nav-logo"
            onClick={() => setMobileMenuOpen(false)}
          >
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 transform group-hover:scale-105 transition-transform flex items-center justify-center shrink-0">
              <Image
                src={clubConfig.logoUrl}
                alt={`${clubConfig.name} Logo`}
                width={48}
                height={48}
                className="object-contain w-full h-full"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-xl sm:text-2xl tracking-wider text-brand-cream uppercase leading-none group-hover:text-brand-yellow transition-colors">
                TRIVANDRUM
              </span>
              <span className="font-display text-base sm:text-lg tracking-widest text-brand-orange uppercase leading-none mt-0.5">
                CAPITALS
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main Navigation">
            <Link
              href="#home"
              className="font-display text-lg tracking-wider text-brand-cream hover:text-brand-yellow transition-colors uppercase py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-brand-orange hover:after:w-full after:transition-all"
            >
              Home
            </Link>
            <Link
              href="#club"
              className="font-display text-lg tracking-wider text-brand-cream hover:text-brand-yellow transition-colors uppercase py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-brand-orange hover:after:w-full after:transition-all"
            >
              The Club
            </Link>
            <Link
              href="/register"
              className="font-display text-lg tracking-wider text-brand-cream hover:text-brand-yellow transition-colors uppercase py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-brand-orange hover:after:w-full after:transition-all"
            >
              Register
            </Link>
            <Link
              href="#contact"
              className="font-display text-lg tracking-wider text-brand-cream hover:text-brand-yellow transition-colors uppercase py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-brand-orange hover:after:w-full after:transition-all"
            >
              Contact
            </Link>
          </nav>

          {/* Action CTA & Mobile Toggle */}
          <div className="flex items-center gap-2.5 sm:gap-4">
            <Link
              href="/register"
              className="btn-primary text-xs sm:text-base py-2 px-3 sm:py-2.5 sm:px-6 shadow-[0_0_12px_rgba(232,65,3,0.5)] ring-1 ring-brand-orange"
              id="header-cta"
            >
              <span className="sm:hidden">REGISTER</span>
              <span className="hidden sm:inline">REGISTER NOW</span>
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-brand-cream hover:text-brand-orange focus:outline-none focus:ring-2 focus:ring-brand-orange"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
              id="mobile-menu-toggle"
            >
              {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-brand-dark/98 border-b-2 border-brand-orange px-4 pt-4 pb-6 space-y-4 shadow-2xl animate-in slide-in-from-top-5 duration-200">
          <nav className="flex flex-col space-y-3">
            <Link
              href="#home"
              onClick={() => setMobileMenuOpen(false)}
              className="font-display text-xl sm:text-2xl tracking-wider text-brand-cream hover:text-brand-orange flex items-center justify-between border-b border-brand-blue/30 pb-2"
            >
              HOME <ChevronRight size={20} className="text-brand-orange" />
            </Link>
            <Link
              href="#club"
              onClick={() => setMobileMenuOpen(false)}
              className="font-display text-xl sm:text-2xl tracking-wider text-brand-cream hover:text-brand-orange flex items-center justify-between border-b border-brand-blue/30 pb-2"
            >
              THE CLUB <ChevronRight size={20} className="text-brand-orange" />
            </Link>
            <Link
              href="/register"
              onClick={() => setMobileMenuOpen(false)}
              className="font-display text-xl sm:text-2xl tracking-wider text-brand-cream hover:text-brand-orange flex items-center justify-between border-b border-brand-blue/30 pb-2"
            >
              REGISTER <ChevronRight size={20} className="text-brand-orange" />
            </Link>
            <Link
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="font-display text-xl sm:text-2xl tracking-wider text-brand-cream hover:text-brand-orange flex items-center justify-between border-b border-brand-blue/30 pb-2"
            >
              CONTACT <ChevronRight size={20} className="text-brand-orange" />
            </Link>
          </nav>

          <Link
            href="/register"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full btn-primary py-3 text-center block mt-4"
          >
            REGISTER NOW
          </Link>
        </div>
      )}
    </header>
  );
}
