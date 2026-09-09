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

      {/* Watermark */}
      <div className="absolute -left-8 -bottom-12 select-none pointer-events-none opacity-[0.03] font-display text-[12rem] sm:text-[18rem] text-brand-blue leading-none">
        TC
      </div>

      <div className="site-container pt-12 sm:pt-16 pb-8 sm:pb-12 relative z-10">

        {/* Main Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-8 mb-10 sm:mb-14">

          {/* Brand Column */}
          <div className="sm:col-span-2 lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 sm:w-11 sm:h-11 shrink-0">
                <Image
                  src={clubConfig.logoUrl}
                  alt={`${clubConfig.name} Official Logo`}
                  width={44}
                  height={44}
                  className="object-contain w-full h-full"
                />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-display text-2xl sm:text-3xl tracking-wider text-brand-cream uppercase">TRIVANDRUM</span>
                <span className="font-display text-lg sm:text-xl tracking-widest text-brand-orange uppercase mt-0.5">CAPITALS</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-brand-cream/80 leading-relaxed max-w-sm">
              {clubConfig.description}
            </p>

            <div className="space-y-2 text-xs sm:text-sm text-brand-cream/90 pt-1">
              <div className="flex items-start gap-2.5">
                <MapPin size={15} className="text-brand-orange shrink-0 mt-0.5" />
                <span>{clubConfig.location}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail size={15} className="text-brand-yellow shrink-0" />
                <span className="break-all">{clubConfig.contact.emailPlaceholder}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone size={15} className="text-brand-blue shrink-0" />
                <span>{clubConfig.contact.phonePlaceholder}</span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-3 space-y-3 sm:space-y-4">
            <h4 className="font-display text-lg sm:text-xl text-brand-yellow uppercase tracking-wider border-b border-brand-blue/40 pb-2">
              Navigation
            </h4>
            <ul className="space-y-2 font-display text-base sm:text-lg tracking-wider text-brand-cream">
              {[["/#home", "Home"], ["/#club", "The Club"], ["/register", "Player Trials"], ["/#contact", "Contact"]].map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="hover:text-brand-orange transition-colors uppercase inline-block py-1">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div className="lg:col-span-2 space-y-3 sm:space-y-4">
            <h4 className="font-display text-lg sm:text-xl text-brand-yellow uppercase tracking-wider border-b border-brand-blue/40 pb-2">
              Follow Us
            </h4>
            <div className="flex flex-col space-y-2.5">
              {[
                { href: clubConfig.contact.socials.instagram, Icon: Share2, label: "Instagram" },
                { href: clubConfig.contact.socials.facebook, Icon: Globe, label: "Facebook" },
                { href: clubConfig.contact.socials.youtube, Icon: Video, label: "YouTube" },
              ].map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-3 text-xs sm:text-sm text-brand-cream hover:text-brand-orange transition-colors py-1"
                >
                  <div className="w-8 h-8 bg-brand-blue/20 border border-brand-blue flex items-center justify-center shrink-0">
                    <Icon size={14} />
                  </div>
                  <span>{label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* CTA Box */}
          <div className="sm:col-span-2 lg:col-span-3 bg-brand-blue/15 border-2 border-brand-blue/40 p-4 sm:p-6 space-y-3 sm:space-y-4">
            <h4 className="font-display text-lg sm:text-xl text-brand-cream uppercase font-bold">
              READY TO PLAY?
            </h4>
            <p className="text-xs sm:text-sm text-brand-cream/80 leading-relaxed">
              Register now for Trivandrum Capitals youth &amp; senior trial evaluations.
            </p>
            <Link
              href="/register"
              className="btn-primary w-full justify-center"
            >
              REGISTER NOW
            </Link>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 sm:pt-8 border-t border-brand-blue/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-brand-cream/70">
          <div className="flex items-center gap-2 text-center sm:text-left">
            <Shield size={13} className="text-brand-orange shrink-0" />
            <span>{clubConfig.privacyNote}</span>
          </div>
          <div className="flex items-center gap-4 sm:gap-6">
            <span>{clubConfig.copyright}</span>
            <a
              href="#home"
              className="inline-flex items-center gap-1 text-brand-yellow hover:text-brand-orange uppercase font-display text-xs sm:text-sm tracking-wider py-1"
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
