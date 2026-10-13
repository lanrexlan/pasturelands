import Link from "next/link";
import { nav } from "@/lib/site";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";
export function SiteHeader() {
 return <header className="site-header on-dark relative z-20 bg-green-900 text-sand">
  <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:bg-paper focus:px-4 focus:py-2 focus:text-green-900">Skip to content</a>
  <div className="mx-auto flex h-24 w-full max-w-[1440px] items-center gap-12 px-6 sm:px-12 lg:px-20"><Logo tone="light" /><div className="header-rule hidden flex-1 lg:block" />
  <nav aria-label="Main" className="hidden lg:block"><ul className="flex items-center gap-9 text-sm">{nav.map(item=><li key={item.href}><Link href={item.href} className="py-3 underline-offset-8 hover:underline">{item.label}</Link></li>)}</ul></nav>
  <div className="ml-auto lg:hidden"><MobileMenu /></div></div>
 </header>;
}
