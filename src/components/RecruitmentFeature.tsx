import Image from "next/image";
import Link from "next/link";
import { CheckCircle2 as CheckCircle2Icon, ArrowRight as ArrowRightIcon } from "lucide-react";
import { clubConfig } from "@/config/club";

const CheckCircle2 = CheckCircle2Icon as any;
const ArrowRight = ArrowRightIcon as any;

export default function RecruitmentFeature() {
  const { recruitment } = clubConfig;

  return (
    <section className="section-pad bg-gradient-to-b from-brand-dark via-brand-dark/95 to-brand-dark relative border-y border-brand-blue/30 overflow-hidden">
      <div className="absolute right-0 top-0 w-72 h-72 court-key-circle opacity-10 translate-x-1/2 -translate-y-1/2 pointer-events-none hidden md:block" />

      <div className="container-pad relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-center">

          {/* Image Column */}
          <div className="lg:col-span-6 relative">
            <div className="relative w-full border-4 border-brand-blue/40 p-1.5 sm:p-2 bg-brand-dark"
              style={{ aspectRatio: "4/3" }}>
              <div className="relative w-full h-full overflow-hidden">
                <Image
                  src="/images/recruitment-action.jpg"
                  alt="Player Recruitment Action - Trivandrum Capitals"
                  fill
                  className="object-cover object-center transition-all duration-500 hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/70 via-transparent to-transparent" />
              </div>

              {/* TC Tag */}
              <div className="absolute -bottom-4 -right-4 bg-brand-orange text-brand-cream p-3 sm:p-4 border-2 border-brand-yellow shadow-xl hidden sm:block">
                <div className="font-display text-2xl sm:text-3xl font-bold leading-none">TC 2026</div>
                <div className="text-[10px] sm:text-xs uppercase tracking-wider font-semibold">TRIAL SEASON</div>
              </div>

              <div className="absolute top-4 left-4 bg-brand-dark/90 text-brand-yellow font-display text-sm sm:text-lg tracking-wider px-3 py-1 sm:px-4 sm:py-1.5 border border-brand-yellow">
                OFFICIAL TRIALS
              </div>
            </div>
          </div>

          {/* Content Column */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8 mt-6 sm:mt-0">
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center gap-3">
                <span className="font-display text-3xl sm:text-4xl text-brand-yellow font-bold">02</span>
                <span className="h-0.5 w-10 bg-brand-yellow shrink-0" />
                <span className="text-xs uppercase tracking-widest text-brand-cream/70 font-semibold">
                  {recruitment.label}
                </span>
              </div>

              <h2 className="font-display font-bold leading-none uppercase text-brand-cream
                text-3xl sm:text-4xl lg:text-5xl xl:text-6xl">
                YOUR COURT. <br />
                <span className="text-brand-orange">YOUR MOMENT.</span>
              </h2>

              <p className="text-sm sm:text-base lg:text-lg text-brand-cream/85 leading-relaxed font-normal">
                {recruitment.subtext}
              </p>
            </div>

            {/* Benefits */}
            <div className="space-y-3 sm:space-y-4">
              <div className="font-display text-base sm:text-xl text-brand-yellow uppercase tracking-wide border-b border-brand-blue/30 pb-2">
                What Applicants Receive:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {recruitment.benefits.map((benefit, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3 sm:p-3.5 bg-brand-blue/10 border border-brand-blue/30 hover:border-brand-orange transition-colors"
                  >
                    <CheckCircle2 size={18} className="text-brand-orange shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base text-brand-cream font-medium leading-snug">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <Link
              href="#register-form"
              className="btn-primary w-full sm:w-auto justify-center gap-3"
              id="recruitment-cta"
            >
              START REGISTRATION
              <ArrowRight size={18} className="shrink-0" />
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
