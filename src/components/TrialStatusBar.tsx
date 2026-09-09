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
    <section className="bg-brand-blue/20 border-y border-brand-blue/40 relative z-20 shadow-xl overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Mobile layout: stacked cards */}
        <div className="flex flex-col sm:hidden divide-y divide-brand-blue/30">

          {/* Item 1 */}
          <div className="flex items-center gap-4 py-3.5">
            <div className="w-10 h-10 bg-brand-orange/20 border border-brand-orange text-brand-orange flex items-center justify-center shrink-0">
              <Calendar size={20} />
            </div>
            <div>
              <div className="status-label text-brand-cream/60">Player Trials</div>
              <div className="font-display status-value text-brand-yellow flex items-center gap-2 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-ping inline-block shrink-0" />
                {trialStatus.statusText}
              </div>
            </div>
          </div>

          {/* Item 2 */}
          <div className="flex items-center gap-4 py-3.5">
            <div className="w-10 h-10 bg-brand-blue/20 border border-brand-blue text-brand-cream flex items-center justify-center shrink-0">
              <MapPin size={20} />
            </div>
            <div>
              <div className="status-label text-brand-cream/60">Location</div>
              <div className="font-display status-value text-brand-cream mt-0.5">{trialStatus.location}</div>
            </div>
          </div>

          {/* Item 3 */}
          <div className="flex items-center gap-4 py-3.5">
            <div className="w-10 h-10 bg-brand-yellow/20 border border-brand-yellow text-brand-yellow flex items-center justify-center shrink-0">
              <Users size={20} />
            </div>
            <div>
              <div className="status-label text-brand-cream/60">Categories</div>
              <div className="font-display status-value text-brand-cream mt-0.5">{trialStatus.categories}</div>
            </div>
          </div>

          {/* CTA full width */}
          <div className="py-4">
            <Link
              href="/register"
              className="btn-yellow w-full justify-center gap-2"
              id="status-bar-cta-mobile"
            >
              {trialStatus.ctaText}
              <ArrowRight size={16} className="shrink-0" />
            </Link>
          </div>
        </div>

        {/* Tablet/Desktop layout: horizontal row */}
        <div className="hidden sm:flex sm:items-center justify-between gap-6 py-5">

          <div className="flex items-center gap-6 lg:gap-10 flex-1">

            {/* Item 1 */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-brand-orange/20 border border-brand-orange text-brand-orange flex items-center justify-center shrink-0">
                <Calendar size={20} />
              </div>
              <div>
                <div className="status-label text-brand-cream/70">Player Trials</div>
                <div className="font-display status-value text-brand-yellow flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-ping inline-block shrink-0" />
                  {trialStatus.statusText}
                </div>
              </div>
            </div>

            {/* Item 2 */}
            <div className="flex items-center gap-3 border-l border-brand-blue/40 pl-6">
              <div className="w-10 h-10 bg-brand-blue/20 border border-brand-blue text-brand-cream flex items-center justify-center shrink-0">
                <MapPin size={20} />
              </div>
              <div>
                <div className="status-label text-brand-cream/70">Location</div>
                <div className="font-display status-value text-brand-cream">{trialStatus.location}</div>
              </div>
            </div>

            {/* Item 3 */}
            <div className="flex items-center gap-3 border-l border-brand-blue/40 pl-6">
              <div className="w-10 h-10 bg-brand-yellow/20 border border-brand-yellow text-brand-yellow flex items-center justify-center shrink-0">
                <Users size={20} />
              </div>
              <div>
                <div className="status-label text-brand-cream/70">Categories</div>
                <div className="font-display status-value text-brand-cream">{trialStatus.categories}</div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="shrink-0">
            <Link
              href="/register"
              className="btn-yellow gap-2"
              id="status-bar-cta"
            >
              {trialStatus.ctaText}
              <ArrowRight size={16} className="shrink-0" />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
