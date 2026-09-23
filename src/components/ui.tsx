import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

export function Container({
  className = "",
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={`mx-auto w-full max-w-6xl px-5 sm:px-8 ${className}`}>
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

export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      className={`h-4 w-4 ${className}`}
      aria-hidden="true"
    >
      <path d="M3 9h11.2l-4-4 1.4-1.4L18 10l-6.4 6.4-1.4-1.4 4-4H3z" fill="currentColor" />
    </svg>
  );
}

export function WhatsAppIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`h-5 w-5 ${className}`} aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 2.5a9.5 9.5 0 0 0-8.2 14.3L2.5 21.5l4.8-1.3A9.5 9.5 0 1 0 12 2.5Zm0 17.2a7.7 7.7 0 0 1-3.9-1.1l-.3-.2-2.8.8.8-2.7-.2-.3A7.7 7.7 0 1 1 12 19.7Zm4.3-5.8c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.5.1l-.8.9c-.1.2-.3.2-.5.1a6.3 6.3 0 0 1-3.1-2.7c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.7-1.7c-.2-.4-.4-.4-.5-.4h-.5a.9.9 0 0 0-.6.3 2.7 2.7 0 0 0-.9 2c0 1.2.9 2.3 1 2.5.1.2 1.7 2.6 4.1 3.6 1.5.7 2.1.7 2.9.6.5-.1 1.4-.6 1.6-1.1.2-.6.2-1 .1-1.1l-.5-.3Z"
      />
    </svg>
  );
}
