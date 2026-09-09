import Image from "next/image";
import Link from "next/link";
import { ArrowRight as ArrowRightIcon } from "lucide-react";
import { clubConfig } from "@/config/club";

const ArrowRight = ArrowRightIcon as any;

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-[92vh] sm:min-h-screen flex items-center justify-center overflow-hidden bg-brand-dark court-overlay pt-20 pb-12 xs:pt-24 xs:pb-14 sm:pt-28 sm:pb-16 lg:pt-32 lg:pb-24"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0 select-none">
        <Image
          src="/images/hero-action.jpg"
          alt="Trivandrum Capitals Basketball Action"
          fill
          priority
          className="object-cover object-center opacity-55"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/95 via-brand-dark/80 to-brand-dark/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-brand-dark/50" />
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-brand-orange/10 to-transparent pointer-events-none" />
      </div>

      {/* Watermark — desktop only */}
      <div className="absolute -right-10 top-1/2 -translate-y-1/2 select-none pointer-events-none z-0 hidden xl:block opacity-[0.04]">
        <span className="font-display text-[22rem] font-bold text-brand-cream leading-none">TC</span>
      </div>

      {/* Court circle — tablet+ */}
      <div className="absolute left-[-80px] bottom-[-80px] w-[320px] h-[320px] lg:w-[480px] lg:h-[480px] court-key-circle pointer-events-none hidden md:block opacity-40" />

      {/* Content */}
      <div className="relative z-10 w-full site-container">
        <div className="max-w-xl sm:max-w-2xl lg:max-w-3xl">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-2.5 py-1 sm:px-4 sm:py-1.5 bg-brand-blue/25 border-l-4 border-brand-orange text-brand-cream uppercase tracking-widest font-semibold mb-3 sm:mb-6 fluid-xs">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-brand-yellow animate-pulse shrink-0" />
            <span className="truncate">{clubConfig.heroLabel}</span>
          </div>

          {/* Headline */}
          <h1 className="font-display font-bold tracking-tight text-brand-cream uppercase drop-shadow-md leading-[0.92] mb-4 sm:mb-6 fluid-hero">
            THE CAPITAL <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange via-brand-yellow to-brand-orange">
              RISES.
            </span>
          </h1>

          {/* Subtext */}
          <p className="prose-fluid text-brand-cream/85 font-normal mb-6 sm:mb-8 border-l-2 border-brand-blue pl-3 sm:pl-4 max-w-lg leading-relaxed">
            {clubConfig.heroSubtext}
          </p>

          {/* CTAs */}
          <div className="flex flex-col xs:flex-row items-stretch xs:items-center gap-3 sm:gap-4">
            <Link
              href="/register"
              className="btn-primary group justify-center text-center w-full xs:w-auto"
              id="hero-primary-cta"
            >
              REGISTER FOR TRIALS
              <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform shrink-0 inline-block" />
            </Link>
            <Link
              href="#club"
              className="btn-secondary justify-center text-center w-full xs:w-auto"
              id="hero-secondary-cta"
            >
              DISCOVER THE CLUB
            </Link>
          </div>

          {/* Stats bar */}
          <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-brand-blue/30 grid grid-cols-3 gap-2 sm:gap-6 max-w-xs xs:max-w-sm sm:max-w-lg">
            <div className="flex flex-col min-w-0">
              <span className="font-display text-brand-yellow tracking-wider leading-tight text-sm xs:text-base sm:text-xl truncate">
                TRIVANDRUM
              </span>
              <span className="text-brand-cream/60 uppercase font-medium mt-0.5 text-[10px] xs:text-xs sm:text-sm truncate">
                Home City
              </span>
            </div>
            <div className="flex flex-col min-w-0 border-l border-brand-blue/40 pl-2 sm:pl-4">
              <span className="font-display text-brand-orange leading-tight text-sm xs:text-base sm:text-xl truncate">
                YOUTH &amp; SR
              </span>
              <span className="text-brand-cream/60 uppercase font-medium mt-0.5 text-[10px] xs:text-xs sm:text-sm truncate">
                Trial Rosters
              </span>
            </div>
            <div className="flex flex-col min-w-0 border-l border-brand-blue/40 pl-2 sm:pl-4">
              <span className="font-display text-brand-cream leading-tight text-sm xs:text-base sm:text-xl truncate">
                2026
              </span>
              <span className="text-brand-cream/60 uppercase font-medium mt-0.5 text-[10px] xs:text-xs sm:text-sm truncate">
                Season
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* Accent bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-orange via-brand-yellow to-brand-blue" />
    </section>
  );
}
