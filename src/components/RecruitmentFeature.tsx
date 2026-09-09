import Image from "next/image";
import Link from "next/link";
import { CheckCircle2 as CheckCircle2Icon, ArrowRight as ArrowRightIcon, Activity as ActivityIcon, Award as AwardIcon } from "lucide-react";
import { clubConfig } from "@/config/club";

const CheckCircle2 = CheckCircle2Icon as any;
const ArrowRight = ArrowRightIcon as any;
const Activity = ActivityIcon as any;
const Award = AwardIcon as any;

export default function RecruitmentFeature() {
  const { recruitment } = clubConfig;

  return (
    <section className="py-20 lg:py-28 bg-gradient-to-b from-brand-dark via-brand-dark/95 to-brand-dark relative border-y border-brand-blue/30 overflow-hidden">
      {/* Decorative Court Graphic Lines */}
      <div className="absolute right-0 top-0 w-96 h-96 court-key-circle opacity-20 translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Image with Court Framing */}
          <div className="lg:col-span-6 relative">
            <div className="relative h-[400px] sm:h-[480px] w-full border-4 border-brand-blue/40 p-2 bg-brand-dark">
              <div className="relative h-full w-full overflow-hidden">
                <Image
                  src="/images/recruitment-action.jpg"
                  alt="Player Recruitment Action - Trivandrum Capitals"
                  fill
                  className="object-cover object-center transition-all duration-500 transform hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent opacity-80" />
              </div>

              {/* Angle Box Graphic Accent */}
              <div className="absolute -bottom-5 -right-5 bg-brand-orange text-brand-cream p-4 border-2 border-brand-yellow shadow-xl hidden sm:block">
                <div className="font-display text-3xl font-bold leading-none">TC 2026</div>
                <div className="text-xs uppercase tracking-wider font-semibold">TRIAL SEASON</div>
              </div>

              {/* Tag Badge */}
              <div className="absolute top-6 left-6 bg-brand-dark/90 text-brand-yellow font-display text-lg tracking-wider px-4 py-1.5 border border-brand-yellow">
                OFFICIAL TRIALS
              </div>
            </div>
          </div>

          {/* Right Column: Recruitment Details */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="font-display text-4xl text-brand-yellow font-bold">02</span>
                <span className="h-0.5 w-12 bg-brand-yellow" />
                <span className="text-xs uppercase tracking-widest text-brand-cream/70 font-semibold">
                  {recruitment.label}
                </span>
              </div>

              <h2 className="font-display text-4xl sm:text-6xl text-brand-cream font-bold leading-none uppercase">
                YOUR COURT. <br />
                <span className="text-brand-orange">YOUR MOMENT.</span>
              </h2>

              <p className="text-lg text-brand-cream/85 leading-relaxed font-normal">
                {recruitment.subtext}
              </p>
            </div>

            {/* Benefits Grid */}
            <div className="space-y-4 pt-2">
              <div className="font-display text-xl text-brand-yellow uppercase tracking-wide border-b border-brand-blue/30 pb-2">
                What Applicants Receive:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {recruitment.benefits.map((benefit, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3.5 bg-brand-blue/10 border border-brand-blue/30 hover:border-brand-orange transition-colors"
                  >
                    <CheckCircle2 size={20} className="text-brand-orange shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base text-brand-cream font-medium">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action CTA */}
            <div className="pt-4">
              <Link
                href="#register-form"
                className="btn-primary w-full sm:w-auto text-center inline-flex items-center justify-center gap-3"
                id="recruitment-cta"
              >
                START REGISTRATION
                <ArrowRight size={22} />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
