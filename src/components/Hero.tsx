import Image from "next/image";
import Link from "next/link";
import { ArrowRight as ArrowRightIcon, Trophy as TrophyIcon, Target as TargetIcon, Shield as ShieldIcon } from "lucide-react";
import { clubConfig } from "@/config/club";

const ArrowRight = ArrowRightIcon as any;
const Trophy = TrophyIcon as any;
const Target = TargetIcon as any;
const Shield = ShieldIcon as any;

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen pt-28 pb-16 lg:pt-36 lg:pb-24 flex items-center justify-center overflow-hidden bg-brand-dark court-overlay"
    >
      {/* Background Action Visual with Dark Blue Gradient Overlays */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-action.jpg"
          alt="Trivandrum Capitals Basketball Action"
          fill
          priority
          className="object-cover object-center opacity-30 mix-blend-luminosity scale-105 transform transition-transform duration-1000"
        />
        {/* Layered brand color overlays for dramatic atmosphere */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-dark/85 to-brand-dark/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-brand-dark/70" />
      </div>

      {/* Decorative Oversized Watermark "TC" & Court Markings Background */}
      <div className="absolute -right-16 top-1/2 -translate-y-1/2 select-none pointer-events-none z-0 hidden lg:block opacity-10">
        <span className="font-display text-[26rem] font-bold text-brand-blue leading-none">
          TC
        </span>
      </div>

      {/* Subtle Court Key Graphic Circle Accent */}
      <div className="absolute left-[-100px] bottom-[-100px] w-[400px] h-[400px] court-key-circle pointer-events-none hidden md:block" />

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-3xl">
          {/* Small Label Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-brand-blue/30 border-l-4 border-brand-orange text-brand-cream text-xs sm:text-sm uppercase tracking-widest font-semibold mb-6 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-brand-yellow animate-pulse" />
            {clubConfig.heroLabel}
          </div>

          {/* Main Oversized Headline */}
          <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight text-brand-cream leading-[0.9] uppercase mb-6 drop-shadow-md">
            THE CAPITAL <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange via-brand-yellow to-brand-orange">
              RISES.
            </span>
          </h1>

          {/* Supporting Copy */}
          <p className="text-lg sm:text-xl text-brand-cream/90 font-normal leading-relaxed mb-8 max-w-2xl border-l-2 border-brand-blue/60 pl-4">
            {clubConfig.heroSubtext}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <Link
              href="#register-form"
              className="btn-primary group"
              id="hero-primary-cta"
            >
              REGISTER FOR TRIALS
              <ArrowRight size={22} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="#club"
              className="btn-secondary"
              id="hero-secondary-cta"
            >
              DISCOVER THE CLUB
            </Link>
          </div>

          {/* Quick Metrics / Tagline Bar */}
          <div className="mt-12 pt-8 border-t border-brand-blue/30 grid grid-cols-3 gap-4 sm:gap-8 max-w-lg">
            <div className="flex flex-col">
              <span className="font-display text-2xl sm:text-3xl text-brand-yellow">THIRUVANANTHAPURAM</span>
              <span className="text-xs text-brand-cream/70 uppercase tracking-widest font-medium">Home City</span>
            </div>
            <div className="flex flex-col border-l border-brand-blue/30 pl-4">
              <span className="font-display text-2xl sm:text-3xl text-brand-orange">YOUTH & SR</span>
              <span className="text-xs text-brand-cream/70 uppercase tracking-widest font-medium">Trial Rosters</span>
            </div>
            <div className="flex flex-col border-l border-brand-blue/30 pl-4">
              <span className="font-display text-2xl sm:text-3xl text-brand-cream">2026</span>
              <span className="text-xs text-brand-cream/70 uppercase tracking-widest font-medium">Official Season</span>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Bottom Bar Line Accent */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-orange via-brand-yellow to-brand-blue" />
    </section>
  );
}
