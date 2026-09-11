import Image from "next/image";
import Link from "next/link";
import { CheckCircle2 as CheckCircle2Icon, ArrowRight as ArrowRightIcon } from "lucide-react";
import { clubConfig } from "@/config/club";

const CheckCircle2 = CheckCircle2Icon as any;
const ArrowRight = ArrowRightIcon as any;

export default function RecruitmentFeature() {
  const { recruitment } = clubConfig;

  return (
    <section className="py-16 sm:py-20 lg:py-28 bg-gradient-to-b from-brand-dark via-brand-dark/95 to-brand-dark relative border-y border-brand-blue/30 overflow-hidden">
      {/* Decorative Court Graphic Lines */}
      <div className="absolute right-0 top-0 w-96 h-96 court-key-circle opacity-20 translate-x-1/2 -translate-y-1/2 pointer-events-none hidden md:block" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Clean Image with Exact Aspect Ratio */}
          <div className="lg:col-span-6 relative flex justify-center">
            <div className="relative w-full max-w-[480px] sm:max-w-[520px] aspect-[4/5] border-2 sm:border-4 border-brand-blue/40 p-1.5 sm:p-2 bg-brand-dark shadow-2xl overflow-hidden group">
              <div className="relative h-full w-full overflow-hidden bg-brand-dark">
                <Image
                  src="/images/blk-buddies.jpeg"
                  alt="BLK Buddies Basketball Tournament"
                  fill
                  className="object-contain object-center transition-all duration-500 group-hover:scale-[1.02]"
                  sizes="(max-width: 1024px) 100vw, 520px"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Right Column: Recruitment Details */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8 mt-4 sm:mt-0">
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center gap-3">
                <span className="font-display text-3xl sm:text-4xl text-brand-yellow font-bold">02</span>
                <span className="h-0.5 w-10 sm:w-12 bg-brand-yellow shrink-0" />
                <span className="text-xs uppercase tracking-widest text-brand-cream/70 font-semibold">
                  {recruitment.label}
                </span>
              </div>

              <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl text-brand-cream font-bold leading-none uppercase">
                YOUR COURT. <br />
                <span className="text-brand-orange">YOUR MOMENT.</span>
              </h2>

              <p className="text-base sm:text-lg text-brand-cream/85 leading-relaxed font-normal">
                {recruitment.subtext}
              </p>
            </div>

            {/* Benefits Grid */}
            <div className="space-y-3 sm:space-y-4 pt-1 sm:pt-2">
              <div className="font-display text-lg sm:text-xl text-brand-yellow uppercase tracking-wide border-b border-brand-blue/30 pb-2">
                What Applicants Receive:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {recruitment.benefits.map((benefit, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3 sm:p-3.5 bg-brand-blue/10 border border-brand-blue/30 hover:border-brand-orange transition-colors"
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
            <div className="pt-2 sm:pt-4">
              <Link
                href="/register"
                className="btn-primary w-full sm:w-auto text-center inline-flex items-center justify-center gap-3"
                id="recruitment-cta"
              >
                START REGISTRATION
                <ArrowRight size={22} className="shrink-0" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
