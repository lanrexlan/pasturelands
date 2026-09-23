import type { ReactNode } from "react";
import { Container, Eyebrow } from "./ui";

/** Opening band for inner pages: eyebrow, serif headline, intro, optional art. */
export function PageIntro({
  eyebrow,
  title,
  children,
  art,
  tone = "sand",
}: {
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
  art?: ReactNode;
  tone?: "sand" | "green";
}) {
  const dark = tone === "green";
  return (
    <section className={`${dark ? "on-dark bg-green-900 text-mist" : "bg-sand"} relative overflow-hidden`}>
      <Container className={`grid gap-10 py-14 sm:py-20 ${art ? "lg:grid-cols-[1.2fr_1fr] lg:items-center" : ""}`}>
        <div className="animate-rise">
          <Eyebrow tone={dark ? "gold" : "terracotta"}>{eyebrow}</Eyebrow>
          <h1 className={`mt-4 text-[2.75rem] sm:text-[3.75rem] lg:text-[4.25rem] ${dark ? "text-sand" : ""}`}>{title}</h1>
          {children && <div className="mt-6 max-w-xl text-[1.125rem] md:text-[1.1875rem]">{children}</div>}
        </div>
        {art && <div className="mx-auto w-full max-w-md lg:max-w-none">{art}</div>}
      </Container>
    </section>
  );
}
