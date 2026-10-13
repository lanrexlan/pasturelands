import Link from "next/link";
import { ArrowRightIcon, WhatsappLogoIcon } from "@phosphor-icons/react/dist/ssr";
import type { ComponentProps, ReactNode } from "react";

export function Container({
  className = "",
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={`mx-auto w-full max-w-[1440px] px-6 sm:px-12 lg:px-20 ${className}`}>
      {children}
    </div>
  );
}

export function Eyebrow({
  children,
  tone = "terracotta",
  className = "",
}: {
  children: ReactNode;
  tone?: "terracotta" | "gold" | "sand";
  className?: string;
}) {
  const color = {
    terracotta: "text-terracotta",
    gold: "text-gold",
    sand: "text-sand",
  }[tone];
  return (
    <p
      className={`text-[0.8125rem] font-bold uppercase tracking-[0.16em] ${color} ${className}`}
    >
      {children}
    </p>
  );
}

const buttonBase =
  "inline-flex min-h-12 items-center justify-center gap-2 px-6 py-3 text-base font-bold transition-colors duration-150";

export const buttonStyles = {
  primary: `${buttonBase} bg-terracotta text-white hover:bg-terracotta-dark`,
  dark: `${buttonBase} bg-green-900 text-sand hover:bg-green-700`,
  light: `${buttonBase} bg-paper text-green-900 hover:bg-sand`,
  outlineLight: `${buttonBase} border-2 border-sand text-sand hover:bg-sand hover:text-green-900`,
};

export function ButtonLink({
  variant = "primary",
  className = "",
  ...props
}: ComponentProps<typeof Link> & { variant?: keyof typeof buttonStyles }) {
  return (
    <Link className={`${buttonStyles[variant]} ${className}`} {...props} />
  );
}

export function Arrow({className=""}:{className?:string}) { return <ArrowRightIcon className={`h-5 w-5 ${className}`} aria-hidden="true" />; }
export function WhatsAppIcon({className=""}:{className?:string}) { return <WhatsappLogoIcon className={`h-5 w-5 ${className}`} aria-hidden="true" />; }
