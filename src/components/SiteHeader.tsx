import Link from "next/link";
import { nav } from "@/lib/site";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";
import { buttonStyles } from "./ui";

export function SiteHeader() {
  return (
    <header className="relative z-20 border-b border-line bg-sand">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:bg-green-900 focus:px-4 focus:py-2 focus:text-sand"
      >
        Skip to content
      </a>
      <div className="mx-auto flex h-18 w-full max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        <Logo />

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-8 text-[1rem] font-medium text-green-900">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="underline-offset-8 decoration-2 decoration-terracotta hover:underline"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/sell" className={`${buttonStyles.primary} min-h-11 py-2`}>
                Get a cash offer
              </Link>
            </li>
          </ul>
        </nav>

        <MobileMenu />
      </div>
    </header>
  );
}
