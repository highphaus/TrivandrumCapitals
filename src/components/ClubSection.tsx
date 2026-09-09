import { clubConfig } from "@/config/club";

export default function ClubSection() {
  return (
    <section id="club" className="section-pad bg-brand-dark relative overflow-hidden court-overlay">
      <div className="container-pad">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">

          {/* Left: Editorial Header */}
          <div className="lg:col-span-5 space-y-5 lg:sticky lg:top-32">
            <div className="flex items-center gap-3">
              <span className="font-display text-3xl sm:text-4xl text-brand-orange font-bold">01</span>
              <span className="h-0.5 w-10 bg-brand-orange shrink-0" />
              <span className="text-xs uppercase tracking-widest text-brand-cream/70 font-semibold">
                THE CLUB IDENTITY
              </span>
            </div>

            <h2 className="font-display font-bold leading-none uppercase text-brand-cream
              text-3xl sm:text-4xl lg:text-5xl xl:text-6xl">
              BUILT FOR <br />
              <span className="text-brand-orange">THE CAPITAL.</span>
            </h2>

            <p className="text-sm sm:text-base lg:text-lg text-brand-cream/80 leading-relaxed font-normal border-l-2 border-brand-blue/50 pl-4">
              {clubConfig.description}
            </p>

            <div className="p-4 sm:p-6 bg-brand-blue/15 border-2 border-brand-blue/40 relative">
              <div className="absolute top-0 right-0 w-7 h-7 bg-brand-orange/20 border-b border-l border-brand-orange flex items-center justify-center font-display text-xs text-brand-orange">
                TC
              </div>
              <p className="font-display text-base sm:text-xl tracking-wide text-brand-yellow uppercase mb-1.5">
                &ldquo;OUR CITY. OUR TEAM. OUR LEGACY.&rdquo;
              </p>
              <p className="text-sm text-brand-cream/70">
                Thiruvananthapuram, Kerala, India
              </p>
            </div>
          </div>

          {/* Right: Principles */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6">
            <div className="border-b border-brand-blue/40 pb-3">
              <h3 className="font-display text-xl sm:text-2xl text-brand-yellow tracking-wider uppercase">
                Core Club Principles
              </h3>
            </div>

            <div className="space-y-4 sm:space-y-6">
              {clubConfig.principles.map((principle, index) => (
                <div
                  key={index}
                  className="group p-4 sm:p-6 bg-brand-dark/90 border-2 border-brand-blue/30 hover:border-brand-orange transition-all duration-300 relative"
                >
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-brand-blue group-hover:bg-brand-orange transition-colors" />
                  <div className="pl-4 space-y-2">
                    <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                      <span className="font-display text-2xl sm:text-3xl font-bold text-brand-orange shrink-0">
                        {principle.number}
                      </span>
                      <h4 className="font-display text-xl sm:text-2xl lg:text-3xl text-brand-cream tracking-wide uppercase group-hover:text-brand-yellow transition-colors">
                        {principle.title}
                      </h4>
                    </div>
                    <p className="text-sm sm:text-base text-brand-cream/85 font-normal leading-relaxed">
                      {principle.description}
                    </p>
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
