"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { Menu as MenuIcon, X as XIcon } from "lucide-react";
import { clubConfig } from "@/config/club";

const Menu = MenuIcon as any;
const X = XIcon as any;

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/#club", label: "The Club" },
  { href: "/#trials", label: "Trials" },
  { href: "/#contact", label: "Contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const onScroll = useCallback(() => setScrolled(window.scrollY > 16), []);

  useEffect(() => {
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  // Close drawer when viewport becomes desktop
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const handler = (e: MediaQueryListEvent) => { if (e.matches) setOpen(false); };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Lock body scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-brand-dark/95 backdrop-blur-md border-b border-brand-blue/30 shadow-lg py-2"
            : "bg-gradient-to-b from-brand-dark/85 to-transparent py-3"
        }`}
      >
        <div className="site-container">
          <div className="flex items-center justify-between gap-3 h-12">

            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2.5 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
              id="nav-logo"
              onClick={() => setOpen(false)}
            >
              <Image
                src={clubConfig.logoUrl}
                alt="Trivandrum Capitals"
                width={36}
                height={36}
                className="object-contain w-9 h-9 sm:w-10 sm:h-10"
                priority
              />
              <div className="leading-none">
                <div className="font-display text-base sm:text-xl tracking-wider text-brand-cream uppercase leading-none">
                  Trivandrum
                </div>
                <div className="font-display text-sm sm:text-base tracking-widest text-brand-orange uppercase leading-none mt-0.5">
                  Capitals
                </div>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1 lg:gap-2" aria-label="Main">
              {NAV_LINKS.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="px-3 py-2 font-display text-base lg:text-lg tracking-wider text-brand-cream/90 hover:text-brand-yellow transition-colors uppercase"
                >
                  {label}
                </Link>
              ))}
            </nav>

            {/* Right: CTA + Hamburger */}
            <div className="flex items-center gap-2">
              <Link
                href="/register"
                className="btn-primary !py-2 !px-3 sm:!px-5 shadow-[0_0_12px_rgba(232,65,3,0.5)] ring-1 ring-brand-orange ring-offset-1 ring-offset-brand-dark"
                id="header-cta"
                style={{ fontSize: "clamp(0.7rem, 2vw, 0.9375rem)", minHeight: "2.25rem", padding: "0.4rem 0.75rem" }}
              >
                <span className="sm:hidden">REG</span>
                <span className="hidden sm:inline">REGISTER NOW</span>
              </Link>

              {/* Hamburger */}
              <button
                type="button"
                className="md:hidden flex items-center justify-center w-10 h-10 text-brand-cream hover:text-brand-orange transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
                onClick={() => setOpen(v => !v)}
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                aria-controls="mobile-nav"
                id="hamburger-btn"
              >
                {open ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-brand-dark/60 backdrop-blur-sm md:hidden"
          aria-hidden="true"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Mobile Drawer */}
      <div
        id="mobile-nav"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation Menu"
        className={`fixed inset-x-0 top-0 z-50 md:hidden transform transition-transform duration-300 ease-in-out ${
          open ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="bg-brand-dark border-b-2 border-brand-orange shadow-2xl pt-16 pb-6">
          {/* Close button */}
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="absolute top-3.5 right-4 w-10 h-10 flex items-center justify-center text-brand-cream hover:text-brand-orange transition-colors"
            aria-label="Close navigation menu"
          >
            <X size={22} />
          </button>

          <nav className="site-container flex flex-col gap-1" aria-label="Mobile Navigation">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between py-3.5 border-b border-brand-blue/20 font-display text-xl tracking-wider text-brand-cream hover:text-brand-yellow transition-colors uppercase"
              >
                {label}
                <span className="text-brand-orange text-sm">›</span>
              </Link>
            ))}

            <div className="pt-5">
              <Link
                href="/register"
                onClick={() => setOpen(false)}
                className="btn-primary w-full justify-center text-base py-3.5"
                id="mobile-nav-cta"
              >
                REGISTER NOW — FREE
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
