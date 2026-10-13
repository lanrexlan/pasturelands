import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { site, telHref } from "@/lib/site";
import "./globals.css";

const dmSans = localFont({ src: "../../assets/fonts/dm-sans-variable.ttf", variable: "--font-dm-sans", display: "swap", weight: "100 900" });
const dmSerif = localFont({ src: "../../assets/fonts/dm-serif-display-latin-400-normal.woff", variable: "--font-dm-serif", display: "swap", weight: "400" });

const description =
  "Pasturelands buys homes directly from owners in Abuja and Lagos. We check the title, make a cash offer and pay within weeks. No agents, no fees to you.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Pasturelands | Sell your house in weeks, not months",
    template: "%s | Pasturelands",
  },
  description,
  applicationName: site.name,
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_NG",
    description,
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#F3EDE2",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-NG" className={`${dmSans.variable} ${dmSerif.variable}`} suppressHydrationWarning>
      <body className="flex min-h-dvh flex-col">
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <WhatsAppButton />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: site.legalName,
              url: site.url,
              email: site.email,
              telephone: telHref().replace("tel:", ""),
              areaServed: ["Abuja", "Lagos"],
            }).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  );
}
