import Image from "next/image";
import Link from "next/link";
import { clubConfig } from "@/config/club";
import {
  MapPin as MapPinIcon,
  Mail as MailIcon,
  Phone as PhoneIcon,
  Globe as GlobeIcon,
  Video as VideoIcon,
  Shield as ShieldIcon,
  ArrowUp as ArrowUpIcon,
} from "lucide-react";

const MapPin = MapPinIcon as any;
const Mail = MailIcon as any;
const Phone = PhoneIcon as any;
const Globe = GlobeIcon as any;
const Video = VideoIcon as any;
const Shield = ShieldIcon as any;
const ArrowUp = ArrowUpIcon as any;

function InstagramIcon({ size = 16, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer id="contact" className="bg-gradient-to-b from-brand-dark via-[#021730] to-brand-dark text-brand-cream border-t-4 border-brand-orange relative overflow-hidden">
      
      {/* Background Graphic Watermark */}
      <div className="absolute -left-12 -bottom-16 select-none pointer-events-none opacity-5 font-display text-[18rem] text-brand-blue leading-none">
        TC
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-16 pb-8 sm:pb-12 relative z-10">
        
        {/* Main Grid: On mobile, middle columns sit side-by-side horizontally */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-8 mb-10 sm:mb-16">
          
          {/* Brand & Monogram Column */}
          <div className="lg:col-span-4 space-y-4 sm:space-y-6">
            <div className="flex items-center gap-3">
              <div className="relative w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center shrink-0">
                <Image
                  src={clubConfig.logoUrl}
                  alt={`${clubConfig.name} Official Logo`}
                  width={48}
                  height={48}
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-display text-2xl sm:text-3xl tracking-wider text-brand-cream uppercase leading-none">
                  TRIVANDRUM
                </span>
                <span className="font-display text-lg sm:text-xl tracking-widest text-brand-orange uppercase leading-none mt-0.5">
                  CAPITALS
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-brand-cream/80 leading-relaxed max-w-sm font-normal">
              {clubConfig.description}
            </p>

            {/* Contact Details — Horizontal flow on mobile */}
            <div className="flex flex-col sm:flex-col gap-2 text-xs sm:text-sm text-brand-cream/90 pt-1">
              <div className="flex items-center gap-2">
                <MapPin size={15} className="text-brand-orange shrink-0" />
                <span>{clubConfig.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={15} className="text-brand-yellow shrink-0" />
                <a
                  href="mailto:trivandrumcapitals@gmail.com"
                  className="hover:text-brand-yellow transition-colors break-all"
                >
                  trivandrumcapitals@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={15} className="text-brand-blue shrink-0" />
                <a
                  href="tel:+917736665965"
                  className="hover:text-brand-blue transition-colors"
                >
                  +91 77366 65965
                </a>
              </div>
            </div>
          </div>

          {/* Horizontal Side-by-Side Wrapper for Navigation & Social on Mobile */}
          <div className="grid grid-cols-2 gap-6 sm:gap-8 lg:contents">
            
            {/* Quick Navigation Links */}
            <div className="lg:col-span-3 space-y-3 sm:space-y-4">
              <h4 className="font-display text-lg sm:text-xl text-brand-yellow uppercase tracking-wider border-b border-brand-blue/40 pb-1.5 sm:pb-2">
                Navigation
              </h4>
              <ul className="space-y-1.5 sm:space-y-2.5 font-display text-base sm:text-lg tracking-wider text-brand-cream">
                <li>
                  <Link href="#home" className="hover:text-brand-orange transition-colors uppercase inline-block py-0.5">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="#club" className="hover:text-brand-orange transition-colors uppercase inline-block py-0.5">
                    The Club
                  </Link>
                </li>
                <li>
                  <Link href="/register" className="hover:text-brand-orange transition-colors uppercase inline-block py-0.5">
                    Player Trials
                  </Link>
                </li>
                <li>
                  <Link href="#contact" className="hover:text-brand-orange transition-colors uppercase inline-block py-0.5">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Social Media Links */}
            <div className="lg:col-span-2 space-y-3 sm:space-y-4">
              <h4 className="font-display text-lg sm:text-xl text-brand-yellow uppercase tracking-wider border-b border-brand-blue/40 pb-1.5 sm:pb-2">
                Follow Us
              </h4>
              <div className="flex flex-col space-y-2 sm:space-y-3">
                <a
                  href="https://www.instagram.com/trivandrum_capitals?stkn=NGRvcHh4Z256MjF6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 sm:gap-3 text-xs sm:text-sm text-brand-cream hover:text-brand-orange transition-colors py-0.5 group"
                  aria-label="Follow Trivandrum Capitals on Instagram"
                >
                  <div className="w-8 h-8 rounded bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] flex items-center justify-center shrink-0 shadow-md transform group-hover:scale-110 transition-transform">
                    <InstagramIcon size={16} className="text-white" />
                  </div>
                  <span className="font-medium group-hover:text-brand-yellow transition-colors">Instagram</span>
                </a>
                <a
                  href={clubConfig.contact.socials.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2.5 sm:gap-3 text-xs sm:text-sm text-brand-cream hover:text-brand-orange transition-colors py-0.5"
                >
                  <div className="w-7 h-7 sm:w-8 sm:h-8 bg-brand-blue/20 border border-brand-blue flex items-center justify-center shrink-0">
                    <Globe size={14} />
                  </div>
                  <span>Facebook</span>
                </a>
                <a
                  href={clubConfig.contact.socials.youtube}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2.5 sm:gap-3 text-xs sm:text-sm text-brand-cream hover:text-brand-orange transition-colors py-0.5"
                >
                  <div className="w-7 h-7 sm:w-8 sm:h-8 bg-brand-blue/20 border border-brand-blue flex items-center justify-center shrink-0">
                    <Video size={14} />
                  </div>
                  <span>YouTube</span>
                </a>
              </div>
            </div>

          </div>

          {/* Player Trial Callout Box */}
          <div className="lg:col-span-3 bg-brand-blue/15 border-2 border-brand-blue/40 p-4 sm:p-6 space-y-3 sm:space-y-4">
            <h4 className="font-display text-lg sm:text-2xl text-brand-cream uppercase font-bold">
              READY TO PLAY?
            </h4>
            <p className="text-xs sm:text-sm text-brand-cream/80 leading-relaxed">
              Register now for Trivandrum Capitals youth &amp; senior trial evaluations.
            </p>
            <Link
              href="/register"
              className="btn-primary w-full py-2.5 text-center text-sm sm:text-base block"
            >
              REGISTER NOW
            </Link>
          </div>

        </div>

        {/* Bottom Copyright & Privacy Section — Horizontal row on mobile and desktop */}
        <div className="pt-6 sm:pt-8 border-t border-brand-blue/30 flex flex-row items-center justify-between gap-3 text-[11px] sm:text-xs text-brand-cream/70 flex-wrap">
          <div className="flex items-center gap-2">
            <Shield size={14} className="text-brand-orange shrink-0" />
            <span className="hidden xs:inline">{clubConfig.privacyNote}</span>
            <span className="xs:hidden">Official League Registration</span>
          </div>

          <div className="flex items-center gap-4 sm:gap-6 ml-auto">
            <span className="hidden sm:inline">{clubConfig.copyright}</span>
            <span className="sm:hidden">© 2026 TC</span>
            <a
              href="#home"
              className="inline-flex items-center gap-1 text-brand-yellow hover:text-brand-orange uppercase font-display text-xs sm:text-sm tracking-wider"
              aria-label="Back to top"
            >
              TOP <ArrowUp size={12} />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
