import Image from "next/image";
import Link from "next/link";
import { ArrowRight as ArrowRightIcon } from "lucide-react";
import { clubConfig } from "@/config/club";

const ArrowRight = ArrowRightIcon as any;

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-brand-dark court-overlay pt-20 pb-12 sm:pt-24 sm:pb-16 lg:pt-32 lg:pb-24"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-action.jpg"
          alt="Trivandrum Capitals Basketball Action"
          fill
          priority
          className="object-cover object-center opacity-60"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/95 via-brand-dark/75 to-brand-dark/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-brand-dark/40" />
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-brand-orange/10 to-transparent pointer-events-none" />
      </div>

      {/* Watermark — desktop only */}
      <div className="absolute -right-10 top-1/2 -translate-y-1/2 select-none pointer-events-none z-0 hidden xl:block opacity-[0.05]">
        <span className="font-display text-[22rem] font-bold text-brand-cream leading-none">TC</span>
      </div>

      {/* Court circle — tablet+ */}
      <div className="absolute left-[-80px] bottom-[-80px] w-[350px] h-[350px] lg:w-[500px] lg:h-[500px] court-key-circle pointer-events-none hidden md:block opacity-40" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl sm:max-w-2xl lg:max-w-3xl">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-4 sm:py-1.5 bg-brand-blue/25 border-l-4 border-brand-orange text-brand-cream text-[10px] sm:text-xs uppercase tracking-widest font-semibold mb-4 sm:mb-6">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-brand-yellow animate-pulse shrink-0" />
            <span className="truncate">{clubConfig.heroLabel}</span>
          </div>

          {/* Headline */}
          <h1 className="font-display font-bold tracking-tight text-brand-cream uppercase drop-shadow-md leading-[0.9] mb-4 sm:mb-6
            text-[2.5rem] xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl">
            THE CAPITAL <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange via-brand-yellow to-brand-orange">
              RISES.
            </span>
          </h1>

          {/* Subtext */}
          <p className="text-sm sm:text-base lg:text-xl text-brand-cream/85 font-normal leading-relaxed mb-6 sm:mb-8 border-l-2 border-brand-blue pl-3 sm:pl-4 max-w-lg">
            {clubConfig.heroSubtext}
          </p>

          {/* CTAs */}
          <div className="flex flex-col xs:flex-row items-stretch xs:items-center gap-3 sm:gap-4">
            <Link href="/register" className="btn-primary group justify-center" id="hero-primary-cta">
              REGISTER FOR TRIALS
              <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform shrink-0" />
            </Link>
            <Link href="#club" className="btn-secondary justify-center" id="hero-secondary-cta">
              DISCOVER THE CLUB
            </Link>
          </div>

          {/* Stats bar */}
          <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-brand-blue/30 grid grid-cols-3 gap-2 sm:gap-6 max-w-sm sm:max-w-lg">
            <div className="flex flex-col">
              <span className="font-display text-sm sm:text-xl lg:text-2xl text-brand-yellow tracking-wider leading-tight">TRIVANDRUM</span>
              <span className="text-[9px] sm:text-xs text-brand-cream/60 uppercase tracking-widest font-medium mt-0.5">Home City</span>
            </div>
            <div className="flex flex-col border-l border-brand-blue/40 pl-2 sm:pl-4">
              <span className="font-display text-sm sm:text-xl lg:text-2xl text-brand-orange leading-tight">YOUTH &amp; SR</span>
              <span className="text-[9px] sm:text-xs text-brand-cream/60 uppercase tracking-widest font-medium mt-0.5">Trial Rosters</span>
            </div>
            <div className="flex flex-col border-l border-brand-blue/40 pl-2 sm:pl-4">
              <span className="font-display text-sm sm:text-xl lg:text-2xl text-brand-cream leading-tight">2026</span>
              <span className="text-[9px] sm:text-xs text-brand-cream/60 uppercase tracking-widest font-medium mt-0.5">Season</span>
            </div>
          </div>
        </div>
      </div>

      {/* Accent bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-orange via-brand-yellow to-brand-blue" />
    </section>
  );
}
