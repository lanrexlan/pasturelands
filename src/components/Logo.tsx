import Link from "next/link";

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

/** Small house mark used in the logo. */
function HouseMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <circle cx="23" cy="9" r="6" fill={"#E3B04B"} />
      <rect x="5" y="12" width="20" height="16" fill={"#8E3E1B"} />
      <rect x="3" y="10" width="24" height="3" fill={"#16302A"} />
      <rect x="8" y="16" width="6" height="5" fill={"#F3EDE2"} />
      <rect x="17" y="18" width="5" height="10" fill={"#F3EDE2"} />
    </svg>
  );
}
