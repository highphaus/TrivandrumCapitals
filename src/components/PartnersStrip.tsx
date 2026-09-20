"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight as ArrowRightIcon, ShieldCheck as ShieldCheckIcon, Award as AwardIcon } from "lucide-react";
import { officialPartners, officialSponsors } from "@/config/partners";

const ArrowRight = ArrowRightIcon as any;
const ShieldCheck = ShieldCheckIcon as any;
const Award = AwardIcon as any;

export default function PartnersStrip() {
  return (
    <section className="py-12 sm:py-16 bg-gradient-to-b from-brand-dark via-[#021832] to-brand-dark border-t border-brand-blue/30 relative overflow-hidden">
      {/* Background Court Element */}
      <div className="absolute left-1/2 -top-24 -translate-x-1/2 w-[700px] h-[350px] bg-brand-orange/5 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-10 pb-4 border-b border-brand-blue/30">
          <div>
            <div className="flex items-center gap-2 text-brand-orange uppercase text-xs sm:text-sm font-semibold tracking-widest mb-1.5">
              <ShieldCheck size={16} />
              <span>Official Ecosystem & Sanctions</span>
            </div>
            <h2 className="font-display text-2xl sm:text-4xl text-brand-cream uppercase tracking-wide">
              OUR <span className="text-brand-yellow">PARTNERS</span> &{" "}
              <span className="text-brand-orange">SPONSORS</span>
            </h2>
            <p className="text-xs sm:text-sm text-brand-cream/70 max-w-xl mt-1">
              Sanctioned by official state and district associations, backed by premier sports management and energy pioneers.
            </p>
          </div>

          <Link
            href="/partners"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-display text-brand-yellow hover:text-brand-orange uppercase tracking-wider transition-colors shrink-0 group py-1"
          >
            <span>Explore All 7 Profiles & Impact</span>
            <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 1. Official Partners Grid */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-[11px] sm:text-xs uppercase font-bold tracking-wider px-2.5 py-0.5 bg-brand-blue/30 text-brand-cream border border-brand-blue/50 rounded-sm">
              Official Partners
            </span>
            <span className="h-px flex-1 bg-brand-blue/20" />
            <span className="text-[11px] text-brand-cream/50 font-mono">5 Organizations</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
            {officialPartners.map((partner) => (
              <Link
                key={partner.id}
                href={`/partners#${partner.id}`}
                className="group flex flex-col items-center justify-between p-3.5 sm:p-4 rounded bg-brand-blue/10 hover:bg-brand-blue/20 border border-brand-blue/30 hover:border-brand-orange transition-all duration-300 shadow-lg hover:shadow-brand-orange/10 hover:-translate-y-1 text-center"
              >
                <div className="w-full h-20 sm:h-24 bg-white/95 rounded p-2 flex items-center justify-center mb-3 shadow-inner group-hover:bg-white transition-colors">
                  <div className="relative w-full h-full">
                    <Image
                      src={partner.logoUrl}
                      alt={partner.name}
                      fill
                      className="object-contain"
                      sizes="(max-width: 640px) 140px, 180px"
                    />
                  </div>
                </div>

                <div className="w-full flex flex-col justify-center">
                  <span className="font-display text-sm sm:text-base text-brand-cream group-hover:text-brand-yellow transition-colors leading-tight line-clamp-1">
                    {partner.shortName}
                  </span>
                  <span className="text-[10px] sm:text-[11px] text-brand-cream/60 mt-0.5 line-clamp-1 font-sans">
                    {partner.category}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* 2. Official Sponsors Grid */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-[11px] sm:text-xs uppercase font-bold tracking-wider px-2.5 py-0.5 bg-brand-orange/20 text-brand-orange border border-brand-orange/40 rounded-sm flex items-center gap-1.5">
              <Award size={13} />
              Official Sponsors
            </span>
            <span className="h-px flex-1 bg-brand-orange/20" />
            <span className="text-[11px] text-brand-cream/50 font-mono">2 Sponsors</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {officialSponsors.map((sponsor) => (
              <Link
                key={sponsor.id}
                href={`/partners#${sponsor.id}`}
                className="group flex flex-col sm:flex-row items-center gap-4 p-4 rounded bg-gradient-to-r from-brand-orange/10 via-brand-blue/10 to-transparent hover:from-brand-orange/20 hover:to-brand-blue/20 border border-brand-orange/30 hover:border-brand-orange transition-all duration-300 shadow-md hover:-translate-y-0.5"
              >
                <div className="w-full sm:w-36 h-20 bg-white/95 rounded p-2 flex items-center justify-center shrink-0 shadow-inner group-hover:bg-white transition-colors">
                  <div className="relative w-full h-full">
                    <Image
                      src={sponsor.logoUrl}
                      alt={sponsor.name}
                      fill
                      className="object-contain"
                      sizes="(max-width: 640px) 180px, 140px"
                    />
                  </div>
                </div>

                <div className="flex-1 text-center sm:text-left">
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
                    <span className="font-display text-base sm:text-lg text-brand-cream group-hover:text-brand-yellow transition-colors">
                      {sponsor.name}
                    </span>
                    {sponsor.tagline && (
                      <span className="text-[10px] text-brand-yellow bg-brand-yellow/10 px-2 py-0.5 rounded border border-brand-yellow/30 font-medium">
                        &quot;{sponsor.tagline}&quot;
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-brand-cream/70 line-clamp-2">
                    {sponsor.description}
                  </p>
                </div>

                <ArrowRight size={18} className="text-brand-cream/40 group-hover:text-brand-orange group-hover:translate-x-1 transition-all hidden sm:block shrink-0" />
              </Link>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
