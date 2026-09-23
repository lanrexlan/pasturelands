"use client";

import Link from "next/link";
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
      <summary className="flex min-h-11 items-center gap-2 px-1 font-bold text-green-900">
        <span className="group-open:hidden">Menu</span>
        <span className="hidden group-open:inline">Close</span>
        <svg viewBox="0 0 20 20" className="h-5 w-5" aria-hidden="true">
          <g className="group-open:hidden" fill="currentColor">
            <rect x="2" y="5" width="16" height="2" />
            <rect x="2" y="13" width="16" height="2" />
          </g>
          <path
            className="hidden group-open:block"
            d="m4.3 3 12.7 12.7-1.4 1.4L2.9 4.4zM15.6 3l1.4 1.4L4.3 17.1l-1.4-1.4z"
            fill="currentColor"
          />
        </svg>
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
