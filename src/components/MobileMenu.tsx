"use client";

import Link from "next/link";
import { ListIcon, XIcon } from "@phosphor-icons/react";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { nav } from "@/lib/site";
import { buttonStyles } from "./ui";

/**
 * Native <details> disclosure, so the menu opens even before hydration.
 * The only script here closes it after a client-side navigation.
 */
export function MobileMenu() {
  const ref = useRef<HTMLDetailsElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (ref.current) ref.current.open = false;
  }, [pathname]);

  return (
    <details ref={ref} className="group lg:hidden">
      <summary className="flex min-h-11 items-center gap-2 px-1 font-medium text-sand">
        <span className="group-open:hidden">Menu</span>
        <span className="hidden group-open:inline">Close</span>
        <ListIcon className="h-5 w-5 group-open:hidden" aria-hidden="true" /><XIcon className="hidden h-5 w-5 group-open:block" aria-hidden="true" />
      </summary>
      <nav
        aria-label="Main"
        className="absolute inset-x-0 top-full border-b border-line bg-sand px-5 pb-6 pt-2 shadow-[0_12px_24px_-16px_rgba(22,48,42,0.35)] sm:px-8"
      >
        <ul className="divide-y divide-line">
          {nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={pathname === item.href ? "page" : undefined}
                className="block py-4 font-serif text-2xl text-green-900"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <Link href="/sell" className={`${buttonStyles.primary} mt-4 w-full`}>
          Get a cash offer
        </Link>
      </nav>
    </details>
  );
}
