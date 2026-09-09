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
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on resize to desktop
  useEffect(() => {
    const handleResize = () => { if (window.innerWidth >= 768) setMobileMenuOpen(false); };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-brand-dark/95 backdrop-blur-md py-2 sm:py-3 border-b border-brand-blue/40 shadow-xl"
          : "bg-gradient-to-b from-brand-dark/90 to-transparent py-3 sm:py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3">

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 sm:gap-3 group focus:outline-none focus:ring-2 focus:ring-brand-orange shrink-0"
            id="nav-logo"
          >
            <div className="relative w-9 h-9 sm:w-12 sm:h-12 flex items-center justify-center">
              <Image
                src={clubConfig.logoUrl}
                alt={`${clubConfig.name} Logo`}
                width={48}
                height={48}
                className="object-contain w-full h-full"
                priority
              />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-display text-lg sm:text-2xl tracking-wider text-brand-cream uppercase leading-none group-hover:text-brand-yellow transition-colors">
                TRIVANDRUM
              </span>
              <span className="font-display text-sm sm:text-lg tracking-widest text-brand-orange uppercase leading-none">
                CAPITALS
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8" aria-label="Main Navigation">
            {["#home", "#club", "/register", "#contact"].map((href, i) => (
              <Link
                key={href}
                href={href}
                className="font-display text-base lg:text-lg tracking-wider text-brand-cream hover:text-brand-yellow transition-colors uppercase py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-brand-orange hover:after:w-full after:transition-all"
              >
                {["Home", "The Club", "Register", "Contact"][i]}
              </Link>
            ))}
          </nav>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/register"
              className="btn-primary !text-[10px] !px-2.5 !py-1.5 !min-h-0 sm:!text-sm sm:!px-4 sm:!py-2 md:!text-base md:!px-6 md:!py-2.5 shadow-[0_0_14px_rgba(232,65,3,0.65)] hover:shadow-[0_0_22px_rgba(232,65,3,0.95)] ring-1 ring-brand-orange ring-offset-1 ring-offset-brand-dark animate-pulse"
              id="header-cta"
            >
              <span className="sm:hidden">REG</span>
              <span className="hidden sm:inline">REGISTER NOW</span>
            </Link>

            {/* Hamburger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-brand-cream hover:text-brand-orange focus:outline-none focus:ring-2 focus:ring-brand-orange rounded"
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
              id="mobile-menu-toggle"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-brand-dark border-b-2 border-brand-orange shadow-2xl">
          <nav className="flex flex-col px-4 pt-3 pb-2" aria-label="Mobile Navigation">
            {(["#home", "#club", "/register", "#contact"] as const).map((href, i) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileMenuOpen(false)}
                className="font-display text-xl tracking-wider text-brand-cream hover:text-brand-orange flex items-center justify-between border-b border-brand-blue/25 py-3"
              >
                {["HOME", "THE CLUB", "REGISTER", "CONTACT"][i]}
                <ChevronRight size={18} className="text-brand-orange" />
              </Link>
            ))}
          </nav>
          <div className="px-4 py-4">
            <Link
              href="/register"
              onClick={() => setMobileMenuOpen(false)}
              className="btn-primary w-full justify-center !text-base !py-3"
              id="mobile-register-cta"
            >
              REGISTER NOW
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
