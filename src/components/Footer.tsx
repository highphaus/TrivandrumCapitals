import Image from "next/image";
import Link from "next/link";
import { clubConfig } from "@/config/club";
import {
  MapPin as MapPinIcon,
  Mail as MailIcon,
  Phone as PhoneIcon,
  Share2 as Share2Icon,
  Globe as GlobeIcon,
  Video as VideoIcon,
  Shield as ShieldIcon,
  ArrowUp as ArrowUpIcon,
} from "lucide-react";

const MapPin = MapPinIcon as any;
const Mail = MailIcon as any;
const Phone = PhoneIcon as any;
const Share2 = Share2Icon as any;
const Globe = GlobeIcon as any;
const Video = VideoIcon as any;
const Shield = ShieldIcon as any;
const ArrowUp = ArrowUpIcon as any;

export default function Footer() {
  return (
    <footer id="contact" className="bg-gradient-to-b from-brand-dark via-[#021730] to-brand-dark text-brand-cream border-t-4 border-brand-orange relative overflow-hidden">
      
      {/* Background Graphic Watermark */}
      <div className="absolute -left-12 -bottom-16 select-none pointer-events-none opacity-5 font-display text-[18rem] text-brand-blue leading-none">
        TC
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          {/* Brand & Monogram Column */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 flex items-center justify-center">
                <Image
                  src={clubConfig.logoUrl}
                  alt={`${clubConfig.name} Official Logo`}
                  width={48}
                  height={48}
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-display text-3xl tracking-wider text-brand-cream uppercase leading-none">
                  TRIVANDRUM
                </span>
                <span className="font-display text-xl tracking-widest text-brand-orange uppercase leading-none">
                  CAPITALS
                </span>
              </div>
            </div>

            <p className="text-sm text-brand-cream/80 leading-relaxed max-w-sm font-normal">
              {clubConfig.description}
            </p>

            <div className="space-y-2 text-sm text-brand-cream/90">
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-brand-orange shrink-0" />
                <span>{clubConfig.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-brand-yellow shrink-0" />
                <span>{clubConfig.contact.emailPlaceholder}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} className="text-brand-blue shrink-0" />
                <span>{clubConfig.contact.phonePlaceholder}</span>
              </div>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-display text-xl text-brand-yellow uppercase tracking-wider border-b border-brand-blue/40 pb-2">
              Navigation
            </h4>
            <ul className="space-y-2.5 font-display text-lg tracking-wider text-brand-cream">
              <li>
                <Link href="#home" className="hover:text-brand-orange transition-colors uppercase">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#club" className="hover:text-brand-orange transition-colors uppercase">
                  The Club
                </Link>
              </li>
              <li>
                <Link href="#trials" className="hover:text-brand-orange transition-colors uppercase">
                  Player Trials
                </Link>
              </li>
              <li>
                <Link href="#contact" className="hover:text-brand-orange transition-colors uppercase">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-display text-xl text-brand-yellow uppercase tracking-wider border-b border-brand-blue/40 pb-2">
              Follow Us
            </h4>
            <div className="flex flex-col space-y-3">
              <a
                href={clubConfig.contact.socials.instagram}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 text-sm text-brand-cream hover:text-brand-orange transition-colors"
              >
                <div className="w-8 h-8 bg-brand-blue/20 border border-brand-blue flex items-center justify-center">
                  <Share2 size={16} />
                </div>
                <span>Instagram</span>
              </a>
              <a
                href={clubConfig.contact.socials.facebook}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 text-sm text-brand-cream hover:text-brand-orange transition-colors"
              >
                <div className="w-8 h-8 bg-brand-blue/20 border border-brand-blue flex items-center justify-center">
                  <Globe size={16} />
                </div>
                <span>Facebook</span>
              </a>
              <a
                href={clubConfig.contact.socials.youtube}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 text-sm text-brand-cream hover:text-brand-orange transition-colors"
              >
                <div className="w-8 h-8 bg-brand-blue/20 border border-brand-blue flex items-center justify-center">
                  <Video size={16} />
                </div>
                <span>YouTube</span>
              </a>
            </div>
          </div>

          {/* Player Trial Callout Box */}
          <div className="lg:col-span-3 bg-brand-blue/15 border-2 border-brand-blue/40 p-6 space-y-4">
            <h4 className="font-display text-2xl text-brand-cream uppercase font-bold">
              READY TO PLAY?
            </h4>
            <p className="text-xs text-brand-cream/80 leading-relaxed">
              Register now for Trivandrum Capitals youth & senior trial evaluations.
            </p>
            <Link
              href="#trials"
              className="btn-primary w-full py-2.5 text-center text-base block"
            >
              REGISTER FOR TRIALS
            </Link>
          </div>

        </div>

        {/* Bottom Copyright & Privacy Section */}
        <div className="pt-8 border-t border-brand-blue/30 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-brand-cream/70">
          <div className="flex items-center gap-2">
            <Shield size={14} className="text-brand-orange shrink-0" />
            <span>{clubConfig.privacyNote}</span>
          </div>

          <div className="flex items-center gap-6">
            <span>{clubConfig.copyright}</span>
            <a
              href="#home"
              className="inline-flex items-center gap-1 text-brand-yellow hover:text-brand-orange uppercase font-display text-sm tracking-wider"
              aria-label="Back to top"
            >
              TOP <ArrowUp size={14} />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
