import Link from "next/link";
export function Logo({ tone = "dark" }: { tone?: "dark" | "light" }) {
 return <Link href="/" aria-label="Pasturelands home" className={`font-serif text-[1.875rem] leading-none tracking-tight ${tone === "light" ? "text-sand" : "text-green-900"}`}>pasturelands</Link>;
}
