import Link from "next/link";
import { HouseMark } from "./illustrations/HouseScene";

export function Logo({ tone = "dark" }: { tone?: "dark" | "light" }) {
  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-2.5 font-serif text-[1.625rem] leading-none ${
        tone === "dark" ? "text-green-900" : "text-sand"
      }`}
    >
      <HouseMark className="h-8 w-8 shrink-0" />
      <span>Pasturelands</span>
    </Link>
  );
}
