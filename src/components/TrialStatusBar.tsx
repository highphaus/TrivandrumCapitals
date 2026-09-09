import Link from "next/link";
import { Calendar as CalendarIcon, MapPin as MapPinIcon, Users as UsersIcon, ArrowRight as ArrowRightIcon } from "lucide-react";
import { clubConfig } from "@/config/club";

const Calendar = CalendarIcon as any;
const MapPin = MapPinIcon as any;
const Users = UsersIcon as any;
const ArrowRight = ArrowRightIcon as any;

export default function TrialStatusBar() {
  const { trialStatus } = clubConfig;

  return (
    <section className="bg-brand-blue/20 border-y border-brand-blue/40 relative z-20 py-4 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Mobile Layout (<640px): Stacked items */}
        <div className="flex flex-col sm:hidden divide-y divide-brand-blue/30">
          <div className="flex items-center gap-3.5 py-3">
            <div className="w-10 h-10 bg-brand-orange/20 border border-brand-orange text-brand-orange flex items-center justify-center shrink-0">
              <Calendar size={18} />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-xs uppercase tracking-wider text-brand-cream/70 font-semibold">Player Trials</div>
              <div className="font-display text-base text-brand-yellow flex items-center gap-2 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-ping inline-block shrink-0" />
                <span className="truncate">{trialStatus.statusText}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3.5 py-3">
            <div className="w-10 h-10 bg-brand-blue/20 border border-brand-blue text-brand-cream flex items-center justify-center shrink-0">
              <MapPin size={18} />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-xs uppercase tracking-wider text-brand-cream/70 font-semibold">Location</div>
              <div className="font-display text-base text-brand-cream mt-0.5 truncate">{trialStatus.location}</div>
            </div>
          </div>

          <div className="flex items-center gap-3.5 py-3">
            <div className="w-10 h-10 bg-brand-yellow/20 border border-brand-yellow text-brand-yellow flex items-center justify-center shrink-0">
              <Users size={18} />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-xs uppercase tracking-wider text-brand-cream/70 font-semibold">Categories</div>
              <div className="font-display text-base text-brand-cream mt-0.5 truncate">{trialStatus.categories}</div>
            </div>
          </div>

          <div className="pt-3">
            <Link
              href="/register"
              className="w-full btn-yellow text-base py-2.5 px-6 flex items-center justify-center gap-2"
              id="status-bar-cta-mobile"
            >
              {trialStatus.ctaText}
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>

        {/* Tablet / Desktop Layout (640px+): Same as original Vercel site */}
        <div className="hidden sm:flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Status Items Grid */}
          <div className="grid grid-cols-3 gap-4 md:gap-8 flex-1">
            
            {/* Item 1: Registration Status */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-brand-orange/20 border border-brand-orange text-brand-orange flex items-center justify-center shrink-0">
                <Calendar size={20} />
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-brand-cream/70 font-semibold">
                  Player Trials
                </div>
                <div className="font-display text-lg tracking-wide text-brand-yellow flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-ping inline-block" />
                  {trialStatus.statusText}
                </div>
              </div>
            </div>

            {/* Item 2: Location */}
            <div className="flex items-center gap-3 border-l border-brand-blue/30 pl-6">
              <div className="w-10 h-10 bg-brand-blue/20 border border-brand-blue text-brand-cream flex items-center justify-center shrink-0">
                <MapPin size={20} />
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-brand-cream/70 font-semibold">
                  Location
                </div>
                <div className="font-display text-lg tracking-wide text-brand-cream">
                  {trialStatus.location}
                </div>
              </div>
            </div>

            {/* Item 3: Categories */}
            <div className="flex items-center gap-3 border-l border-brand-blue/30 pl-6">
              <div className="w-10 h-10 bg-brand-yellow/20 border border-brand-yellow text-brand-yellow flex items-center justify-center shrink-0">
                <Users size={20} />
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-brand-cream/70 font-semibold">
                  Categories
                </div>
                <div className="font-display text-lg tracking-wide text-brand-cream truncate">
                  {trialStatus.categories}
                </div>
              </div>
            </div>

          </div>

          {/* Action CTA */}
          <div className="shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-brand-blue/30 flex justify-end">
            <Link
              href="/register"
              className="w-full sm:w-auto btn-yellow text-base py-2.5 px-6 flex items-center justify-center gap-2"
              id="status-bar-cta"
            >
              {trialStatus.ctaText}
              <ArrowRight size={18} />
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
}
