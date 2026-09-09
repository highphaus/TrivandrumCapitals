import { clubConfig } from "@/config/club";
import { ShieldCheck, Flame, Compass } from "lucide-react";

export default function ClubSection() {
  return (
    <section id="club" className="py-20 lg:py-32 bg-brand-dark relative overflow-hidden court-overlay">
      {/* Decorative Top Accent Line */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Split Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Side: Editorial Manifesto Header */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-32">
            <div className="flex items-center gap-3">
              <span className="font-display text-4xl text-brand-orange font-bold">01</span>
              <span className="h-0.5 w-12 bg-brand-orange" />
              <span className="text-xs uppercase tracking-widest text-brand-cream/70 font-semibold">
                THE CLUB IDENTITY
              </span>
            </div>

            <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl text-brand-cream font-bold leading-none uppercase">
              BUILT FOR <br />
              <span className="text-brand-orange">THE CAPITAL.</span>
            </h2>

            <p className="text-lg text-brand-cream/80 leading-relaxed font-normal border-l-2 border-brand-blue/50 pl-4">
              {clubConfig.description}
            </p>

            <div className="p-6 bg-brand-blue/15 border-2 border-brand-blue/40 relative">
              <div className="absolute top-0 right-0 w-8 h-8 bg-brand-orange/20 border-b border-l border-brand-orange flex items-center justify-center font-display text-xs text-brand-orange">
                TC
              </div>
              <p className="font-display text-xl tracking-wide text-brand-yellow uppercase mb-2">
                &ldquo;OUR CITY. OUR TEAM. OUR LEGACY.&rdquo;
              </p>
              <p className="text-sm text-brand-cream/70">
                Thiruvananthapuram, Kerala, India
              </p>
            </div>
          </div>

          {/* Right Side: Club Principles List */}
          <div className="lg:col-span-7 space-y-8">
            <div className="border-b border-brand-blue/40 pb-4">
              <h3 className="font-display text-2xl text-brand-yellow tracking-wider uppercase">
                Core Club Principles
              </h3>
            </div>

            <div className="space-y-6">
              {clubConfig.principles.map((principle, index) => (
                <div
                  key={index}
                  className="group p-4 sm:p-6 bg-brand-dark/90 border-2 border-brand-blue/30 hover:border-brand-orange transition-all duration-300 relative"
                >
                  {/* Angle Accent on Hover */}
                  <div className="absolute top-0 left-0 w-2 h-full bg-brand-blue group-hover:bg-brand-orange transition-colors" />

                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="space-y-3 flex-1 pl-4">
                      <div className="flex items-center gap-3">
                        <span className="font-display text-3xl font-bold text-brand-orange">
                          {principle.number}
                        </span>
                        <h4 className="font-display text-xl sm:text-3xl text-brand-cream tracking-wide uppercase group-hover:text-brand-yellow transition-colors">
                          {principle.title}
                        </h4>
                      </div>
                      <p className="text-base text-brand-cream/85 font-normal leading-relaxed">
                        {principle.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
