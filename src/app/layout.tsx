import type { Metadata } from "next";
import { Bebas_Neue, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { clubConfig } from "@/config/club";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${clubConfig.name} | Official Basketball Club`,
  description: clubConfig.description,
  keywords: [
    "Trivandrum Capitals",
    "Basketball Club",
    "Thiruvananthapuram Basketball",
    "Basketball Trials",
    "Kerala Basketball",
    "Youth Basketball",
  ],
  openGraph: {
    title: `${clubConfig.name} | Official Basketball Club`,
    description: clubConfig.heroSubtext,
    url: "https://trivandrumcapitals.com",
    siteName: clubConfig.name,
    locale: "en_IN",
    type: "website",
  },
  icons: {
    icon: "/images/TrivandrumCaptials.png",
    apple: "/images/TrivandrumCaptials.png",
    shortcut: "/images/TrivandrumCaptials.png",
  },
  twitter: {
    card: "summary_large_image",
    title: `${clubConfig.name} | Official Basketball Club`,
    description: clubConfig.heroSubtext,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`scroll-smooth ${bebasNeue.variable} ${plusJakartaSans.variable}`}>
      <body className="bg-brand-dark text-brand-cream antialiased min-h-screen selection:bg-brand-orange selection:text-brand-cream">
        {children}
      </body>
    </html>
  );
}
