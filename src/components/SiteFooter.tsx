import Link from "next/link";
import { isPlaceholder, nav, site, whatsappLink } from "@/lib/site";
import { Logo } from "./Logo";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="on-dark bg-green-900 text-mist">
      <div className="mx-auto w-full max-w-6xl px-5 pb-28 pt-16 sm:px-8 sm:pb-24">
        <div className="grid gap-12 border-b border-green-700 pb-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Logo tone="light" />
            <p className="mt-5 max-w-sm">
              We buy homes directly from owners in Abuja and Lagos, check every
              title, and sell renovated homes with no agency fee.
            </p>
          </div>

          <div>
            <h2 className="font-sans text-[0.8125rem] font-bold uppercase tracking-[0.16em] text-gold">
              Contact
            </h2>
            <ul className="mt-4 space-y-2">
              <li>
                {isPlaceholder(site.phone) ? (
                  site.phone
                ) : (
                  <a className="hover:text-sand" href={`tel:${site.phone.replace(/\s/g, "")}`}>
                    {site.phone}
                  </a>
                )}
              </li>
              <li>
                <a className="underline underline-offset-4 hover:text-sand" href={whatsappLink()}>
                  WhatsApp
                </a>
              </li>
              <li>
                {isPlaceholder(site.email) ? (
                  site.email
                ) : (
                  <a className="hover:text-sand" href={`mailto:${site.email}`}>
                    {site.email}
                  </a>
                )}
              </li>
              <li>{site.address}</li>
            </ul>
          </div>

          <div>
            <h2 className="font-sans text-[0.8125rem] font-bold uppercase tracking-[0.16em] text-gold">
              Pages
            </h2>
            <ul className="mt-4 space-y-2">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link className="hover:text-sand" href={item.href}>
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link className="hover:text-sand" href="/privacy">
                  Privacy notice
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <p className="mt-8 text-[0.9375rem]">
          © {year} {site.legalName}. Registered in Nigeria, {site.rcNumber}.
        </p>
      </div>
    </footer>
  );
}
