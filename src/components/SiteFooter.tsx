import Link from "next/link";
import { isPlaceholder, nav, site, telHref, whatsappLink } from "@/lib/site";
import { Logo } from "./Logo";

export function SiteFooter() {
  return <footer className="on-dark bg-green-900 text-mist">
    <div className="mx-auto w-full max-w-[1440px] px-6 py-10 sm:px-12 lg:px-20">
      <div className="flex flex-wrap items-center justify-between gap-8 border-b border-green-700 pb-8">
        <Logo tone="light" />
        <nav aria-label="Footer"><ul className="flex flex-wrap gap-x-7 gap-y-4 text-sm">{nav.map(item=><li key={item.href}><Link href={item.href} className="hover:text-sand hover:underline">{item.label}</Link></li>)}<li><Link href="/privacy" className="hover:text-sand hover:underline">Privacy</Link></li></ul></nav>
      </div>
      <div className="flex flex-col justify-between gap-6 py-7 text-sm md:flex-row">
        <p className="max-w-sm">Homes bought directly. Titles checked carefully.<br />Abuja · Lagos</p>
        <div className="flex flex-wrap gap-x-7 gap-y-3">
          <a href={telHref()} className="hover:text-sand">{site.phone}</a>
          <a href={`mailto:${site.email}`} className="break-all hover:text-sand">{site.email}</a>
          {!isPlaceholder(site.whatsappNumber) && <a href={whatsappLink()} className="hover:text-sand">WhatsApp</a>}
        </div>
      </div>
      <div className="flex flex-wrap justify-between gap-3 text-xs"><p>© {new Date().getFullYear()} {site.legalName}. Registered in Nigeria, {site.rcNumber}.</p>{!isPlaceholder(site.address) && <p>{site.address}</p>}</div>
    </div>
  </footer>;
}
