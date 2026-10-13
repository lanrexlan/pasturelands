import type { ReactNode } from "react";
import { Container, Eyebrow } from "./ui";
export function PageIntro({eyebrow,title,children,art}: {eyebrow:string; title:ReactNode;children?:ReactNode;art?:ReactNode;tone?:"sand"|"green"}) {
 return <section className="on-dark bg-green-900 text-mist"><Container className={`grid gap-12 pb-16 pt-10 sm:pb-24 sm:pt-16 ${art ? "lg:grid-cols-[1.3fr_1fr] lg:items-center" : ""}`}><div><Eyebrow tone="gold">{eyebrow}</Eyebrow><h1 className="mt-6 max-w-4xl text-[2.75rem] text-sand sm:text-[3.75rem] lg:text-[4.5rem]">{title}</h1>{children && <div className="mt-7 max-w-xl text-[1.125rem]">{children}</div>}</div>{art && <div className="overflow-hidden">{art}</div>}</Container></section>;
}
