"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  partnersAndSponsors,
  officialPartners,
  officialSponsors,
  PartnerOrSponsor,
} from "@/config/partners";
import {
  ShieldCheck as ShieldCheckIcon,
  Award as AwardIcon,
  CheckCircle2 as CheckCircle2Icon,
  ArrowRight as ArrowRightIcon,
  Sparkles as SparklesIcon,
  Calendar as CalendarIcon,
  Mail as MailIcon,
  Phone as PhoneIcon,
} from "lucide-react";
import { clubConfig } from "@/config/club";

const ShieldCheck = ShieldCheckIcon as any;
const Award = AwardIcon as any;
const CheckCircle2 = CheckCircle2Icon as any;
const ArrowRight = ArrowRightIcon as any;
const Sparkles = SparklesIcon as any;
const Calendar = CalendarIcon as any;
const Mail = MailIcon as any;
const Phone = PhoneIcon as any;

export default function PartnersPage() {
  const [activeTab, setActiveTab] = useState<"all" | "partners" | "sponsors">("all");

  const displayedList =
    activeTab === "all"
      ? partnersAndSponsors
      : activeTab === "partners"
      ? officialPartners
      : officialSponsors;

  return (
    <div className="min-h-screen bg-brand-dark flex flex-col selection:bg-brand-orange selection:text-brand-cream">
      <Header />

      <main className="flex-grow pt-24 sm:pt-28 pb-16">
        {/* Hero Section */}
        <section className="relative py-12 sm:py-16 overflow-hidden border-b border-brand-blue/30 bg-gradient-to-b from-brand-dark via-[#021832] to-brand-dark">
          <div className="absolute inset-0 bg-[radial-gradient(#e84103_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-brand-orange/10 blur-3xl rounded-full pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-blue/20 border border-brand-blue/40 text-brand-orange text-xs sm:text-sm font-semibold uppercase tracking-widest mb-4">
              <ShieldCheck size={16} />
              <span>Official Ecosystem & Sanctioning Bodies</span>
            </div>

            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl text-brand-cream uppercase tracking-tight font-bold">
              PARTNERS & <span className="text-brand-orange">SPONSORS</span>
            </h1>

            <p className="mt-4 text-base sm:text-xl text-brand-cream/80 max-w-3xl mx-auto leading-relaxed font-normal">
              Meet the visionary state associations, sports management pioneers, athletic academies, and corporate leaders powering <strong className="text-brand-yellow font-semibold">Trivandrum Capitals</strong> and the <strong className="text-brand-orange font-semibold">BLK Buddies League</strong> across Kerala.
            </p>

            {/* Quick Metrics */}
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-3xl mx-auto">
              <div className="p-3 bg-brand-blue/15 border border-brand-blue/30 rounded">
                <div className="font-display text-2xl sm:text-3xl text-brand-yellow font-bold">5</div>
                <div className="text-[11px] sm:text-xs text-brand-cream/70 uppercase tracking-wider mt-0.5">Official Partners</div>
              </div>
              <div className="p-3 bg-brand-blue/15 border border-brand-blue/30 rounded">
                <div className="font-display text-2xl sm:text-3xl text-brand-orange font-bold">2</div>
                <div className="text-[11px] sm:text-xs text-brand-cream/70 uppercase tracking-wider mt-0.5">Official Sponsors</div>
              </div>
              <div className="p-3 bg-brand-blue/15 border border-brand-blue/30 rounded">
                <div className="font-display text-2xl sm:text-3xl text-brand-cream font-bold">1955</div>
                <div className="text-[11px] sm:text-xs text-brand-cream/70 uppercase tracking-wider mt-0.5">TDBA Legacy Year</div>
              </div>
              <div className="p-3 bg-brand-blue/15 border border-brand-blue/30 rounded">
                <div className="font-display text-2xl sm:text-3xl text-brand-yellow font-bold">14</div>
                <div className="text-[11px] sm:text-xs text-brand-cream/70 uppercase tracking-wider mt-0.5">Districts Reached</div>
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="mt-8 sm:mt-10 inline-flex p-1.5 bg-brand-dark/90 border border-brand-blue/40 rounded-lg shadow-xl">
              <button
                type="button"
                onClick={() => setActiveTab("all")}
                className={`px-4 sm:px-6 py-2 rounded-md font-display text-xs sm:text-sm uppercase tracking-wider transition-all ${
                  activeTab === "all"
                    ? "bg-brand-orange text-white shadow-md font-bold"
                    : "text-brand-cream/70 hover:text-brand-cream"
                }`}
              >
                All Organizations (7)
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("partners")}
                className={`px-4 sm:px-6 py-2 rounded-md font-display text-xs sm:text-sm uppercase tracking-wider transition-all ${
                  activeTab === "partners"
                    ? "bg-brand-blue text-white shadow-md font-bold"
                    : "text-brand-cream/70 hover:text-brand-cream"
                }`}
              >
                Official Partners (5)
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("sponsors")}
                className={`px-4 sm:px-6 py-2 rounded-md font-display text-xs sm:text-sm uppercase tracking-wider transition-all ${
                  activeTab === "sponsors"
                    ? "bg-brand-yellow text-brand-dark shadow-md font-bold"
                    : "text-brand-cream/70 hover:text-brand-cream"
                }`}
              >
                Official Sponsors (2)
              </button>
            </div>
          </div>
        </section>

        {/* Detailed Entities List */}
        <section className="py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
            {displayedList.map((entity: PartnerOrSponsor) => (
              <div
                key={entity.id}
                id={entity.id}
                className="scroll-mt-32 rounded-xl bg-gradient-to-b from-brand-blue/15 via-brand-dark to-brand-dark border-2 border-brand-blue/30 hover:border-brand-orange/60 transition-all duration-300 p-6 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden group"
              >
                {/* Accent glow corner */}
                <div
                  className={`absolute -right-20 -top-20 w-48 h-48 rounded-full blur-3xl pointer-events-none ${
                    entity.type === "sponsor" ? "bg-brand-yellow/10" : "bg-brand-orange/10"
                  }`}
                />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start relative z-10">
                  
                  {/* Left Column: Logo Showcase & Quick Metadata */}
                  <div className="lg:col-span-4 flex flex-col items-center sm:items-start text-center sm:text-left">
                    <div className="w-full max-w-[280px] sm:max-w-none h-44 sm:h-52 bg-white rounded-lg p-5 flex items-center justify-center shadow-xl border-2 border-brand-blue/40 group-hover:border-brand-orange transition-colors">
                      <div className="relative w-full h-full">
                        <Image
                          src={entity.logoUrl}
                          alt={`${entity.name} Official Logo`}
                          fill
                          className="object-contain"
                          sizes="(max-width: 1024px) 280px, 340px"
                        />
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2 justify-center sm:justify-start">
                      <span
                        className={`inline-flex items-center gap-1 text-xs uppercase font-bold tracking-wider px-3 py-1 rounded-sm border ${
                          entity.type === "partner"
                            ? "bg-brand-blue/30 text-brand-cream border-brand-blue/50"
                            : "bg-brand-orange/20 text-brand-orange border-brand-orange/50"
                        }`}
                      >
                        {entity.type === "partner" ? <ShieldCheck size={14} /> : <Award size={14} />}
                        {entity.type === "partner" ? "Official Partner" : "Official Sponsor"}
                      </span>

                      {entity.establishedYear && (
                        <span className="inline-flex items-center gap-1 text-xs text-brand-yellow bg-brand-yellow/15 border border-brand-yellow/30 px-2.5 py-1 rounded-sm font-mono">
                          <Calendar size={13} />
                          ESTD {entity.establishedYear}
                        </span>
                      )}
                    </div>

                    {/* Stats pills */}
                    {entity.keyStats && (
                      <div className="mt-4 w-full grid grid-cols-3 gap-2 text-center pt-2 border-t border-brand-blue/20">
                        {entity.keyStats.map((stat, idx) => (
                          <div key={idx} className="p-2 bg-brand-dark/80 border border-brand-blue/30 rounded">
                            <div className="font-display text-xs text-brand-yellow leading-tight font-bold">
                              {stat.value}
                            </div>
                            <div className="text-[10px] text-brand-cream/60 mt-0.5 truncate uppercase">
                              {stat.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Right Column: Deep Explanation & Strategic Impact */}
                  <div className="lg:col-span-8 space-y-4 sm:space-y-5">
                    <div>
                      <div className="text-xs uppercase font-semibold tracking-wider text-brand-orange mb-1">
                        {entity.category} &bull; {entity.roleTitle}
                      </div>
                      <h2 className="font-display text-2xl sm:text-4xl text-brand-cream font-bold uppercase tracking-wide">
                        {entity.name}
                      </h2>
                      {entity.tagline && (
                        <p className="text-sm sm:text-base text-brand-yellow italic mt-0.5">
                          &ldquo;{entity.tagline}&rdquo;
                        </p>
                      )}
                    </div>

                    <p className="text-sm sm:text-base text-brand-cream/90 leading-relaxed font-normal">
                      {entity.description}
                    </p>

                    {/* Strategic Impact List */}
                    <div className="space-y-2.5 pt-1">
                      <h3 className="font-display text-xs sm:text-sm uppercase tracking-wider text-brand-cream/90 flex items-center gap-2">
                        <Sparkles size={15} className="text-brand-yellow" />
                        <span>Strategic Impact on Trivandrum Capitals:</span>
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5">
                        {entity.strategicImpact.map((impact, idx) => (
                          <div
                            key={idx}
                            className="flex items-start gap-2.5 p-2.5 bg-brand-blue/10 border border-brand-blue/20 rounded text-xs text-brand-cream/85"
                          >
                            <CheckCircle2 size={15} className="text-brand-orange shrink-0 mt-0.5" />
                            <span>{impact}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>

                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Call To Action: Partner With Us */}
        <section className="mt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl p-8 sm:p-12 bg-gradient-to-r from-brand-orange/20 via-[#032044] to-brand-dark border-2 border-brand-orange/40 shadow-2xl relative overflow-hidden">
            <div className="relative z-10 max-w-3xl">
              <div className="inline-flex items-center gap-2 text-brand-yellow text-xs sm:text-sm font-semibold uppercase tracking-wider mb-2">
                <Sparkles size={16} />
                <span>Join Our Championship Mission</span>
              </div>
              <h2 className="font-display text-3xl sm:text-5xl text-brand-cream font-bold uppercase leading-tight">
                PARTNER WITH <span className="text-brand-orange">TRIVANDRUM CAPITALS</span>
              </h2>
              <p className="mt-3 text-sm sm:text-base text-brand-cream/85 leading-relaxed">
                Connect your organization with passionate youth basketball fans, school sports networks, and rising basketball stars in Kerala. Explore title sponsorships, jersey branding, grassroot tournament rights, and media partnerships.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-4">
                <a
                  href={`mailto:${clubConfig.contact.emailPlaceholder}?subject=Partnership%20Inquiry%20-%20Trivandrum%20Capitals`}
                  className="btn-primary inline-flex items-center gap-2 py-3 px-6 text-sm sm:text-base"
                >
                  <Mail size={18} />
                  <span>INQUIRE FOR PARTNERSHIP</span>
                </a>
                <Link
                  href="/register"
                  className="btn-yellow inline-flex items-center gap-2 py-3 px-6 text-sm sm:text-base"
                >
                  <span>REGISTER FOR LEAGUE</span>
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
