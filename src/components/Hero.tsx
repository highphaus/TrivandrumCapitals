import Image from "next/image";
import Link from "next/link";
import { ArrowRight as ArrowRightIcon } from "lucide-react";
import { clubConfig } from "@/config/club";

const ArrowRight = ArrowRightIcon as any;

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen pt-28 pb-16 lg:pt-36 lg:pb-24 flex items-center justify-center overflow-hidden bg-brand-dark court-overlay"
    >
      {/* Background Action Visual */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-action.jpg"
          alt="Trivandrum Capitals Basketball Action"
          fill
          priority
          className="object-cover object-center opacity-60 scale-105"
        />
        {/* Left fade so text stays readable */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/95 via-brand-dark/70 to-brand-dark/20" />
        {/* Bottom fade */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-brand-dark/40" />
        {/* Subtle orange warmth bottom-right */}
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-brand-orange/15 to-transparent pointer-events-none" />
      </div>

      {/* Watermark TC */}
      <div className="absolute -right-10 top-1/2 -translate-y-1/2 select-none pointer-events-none z-0 hidden lg:block opacity-[0.06]">
        <span className="font-display text-[28rem] font-bold text-brand-cream leading-none">TC</span>
      </div>

      {/* Yellow court key circle accent */}
      <div className="absolute left-[-120px] bottom-[-120px] w-[500px] h-[500px] court-key-circle pointer-events-none hidden md:block" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-3xl">

          {/* Label badge — blue bg, orange left border, yellow dot */}
          <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-4 sm:py-1.5 bg-brand-blue/25 border-l-4 border-brand-orange text-brand-cream text-xs sm:text-sm uppercase tracking-widest font-semibold mb-5 sm:mb-7 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-brand-yellow animate-pulse" />
            <span className="truncate">{clubConfig.heroLabel}</span>
          </div>

          {/* Headline — cream base, orange→yellow gradient accent */}
          <h1 className="font-display text-4xl sm:text-7xl lg:text-8xl font-bold tracking-tight text-brand-cream leading-[0.9] uppercase mb-5 sm:mb-6 drop-shadow-md">
            THE CAPITAL <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange via-brand-yellow to-brand-orange">
              RISES.
            </span>
          </h1>

          {/* Subtext — cream/90, blue left rule */}
          <p className="text-base sm:text-xl text-brand-cream/85 font-normal leading-relaxed mb-6 sm:mb-8 max-w-2xl border-l-2 border-brand-blue pl-4">
            {clubConfig.heroSubtext}
          </p>

          {/* CTAs — Horizontal on both mobile and desktop */}
          <div className="flex flex-row items-center gap-2 sm:gap-4 w-full sm:w-auto">
            <Link
              href="/register"
              className="btn-primary group text-center justify-center flex-1 sm:flex-initial !text-xs xs:!text-sm sm:!text-xl !px-2.5 xs:!px-4 sm:!px-8 !py-2.5 sm:!py-3.5"
              id="hero-primary-cta"
            >
              <span className="truncate">REGISTER FOR TRIALS</span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-5 sm:h-5 ml-1 sm:ml-2 group-hover:translate-x-1 transition-transform inline-block shrink-0" />
            </Link>
            <Link
              href="#club"
              className="btn-secondary text-center justify-center flex-1 sm:flex-initial !text-xs xs:!text-sm sm:!text-xl !px-2.5 xs:!px-4 sm:!px-8 !py-2.5 sm:!py-3.5"
              id="hero-secondary-cta"
            >
              <span className="truncate">DISCOVER THE CLUB</span>
            </Link>
          </div>

          {/* Stats bar */}
          <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-brand-blue/30 grid grid-cols-3 gap-3 sm:gap-8 max-w-lg">
            <div className="flex flex-col">
              <span className="font-display text-base sm:text-2xl text-brand-yellow tracking-wider leading-tight">
                TRIVANDRUM
              </span>
              <span className="text-[10px] sm:text-xs text-brand-cream/60 uppercase tracking-widest font-medium mt-0.5">
                Home City
              </span>
            </div>
            <div className="flex flex-col border-l border-brand-blue/40 pl-3 sm:pl-4">
              <span className="font-display text-base sm:text-2xl text-brand-orange leading-tight">
                YOUTH &amp; SR
              </span>
              <span className="text-[10px] sm:text-xs text-brand-cream/60 uppercase tracking-widest font-medium mt-0.5">
                Trial Rosters
              </span>
            </div>
            <div className="flex flex-col border-l border-brand-blue/40 pl-3 sm:pl-4">
              <span className="font-display text-base sm:text-2xl text-brand-cream leading-tight">
                2026
              </span>
              <span className="text-[10px] sm:text-xs text-brand-cream/60 uppercase tracking-widest font-medium mt-0.5">
                Season
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom tri-color accent bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-orange via-brand-yellow to-brand-blue" />
    </section>
  );
}
