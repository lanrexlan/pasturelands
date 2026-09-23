import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { Children, cloneElement, isValidElement, type ReactNode } from "react";
import { IsoHouse } from "@/components/illustrations/IsoHouse";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

async function font(file: string) {
  return readFile(join(process.cwd(), "assets/fonts", file));
}

/**
 * Satori only accepts intrinsic elements inside <svg>, so expand the
 * illustration's helper components into plain SVG elements first.
 */
function flatten(node: ReactNode): ReactNode {
  if (!isValidElement<{ children?: ReactNode; className?: string }>(node)) return node;
  if (typeof node.type === "function") {
    return flatten((node.type as (p: unknown) => ReactNode)(node.props));
  }
  const kids = Children.map(node.props.children, flatten);
  return cloneElement(node, { className: undefined }, kids);
}

/** Shared Open Graph card: headline on sand, house on a terracotta panel. */
export async function renderOg({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  const [serif, sansBold] = await Promise.all([
    font("dm-serif-display-latin-400-normal.woff"),
    font("dm-sans-latin-700-normal.woff"),
  ]);

  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", background: "#F3EDE2" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: 640,
            padding: "56px 56px 56px 64px",
          }}
        >
          <div style={{ display: "flex", fontFamily: "DM Serif Display", fontSize: 40, color: "#16302A" }}>
            Pasturelands
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                fontFamily: "DM Sans",
                fontSize: 22,
                letterSpacing: 3.5,
                textTransform: "uppercase",
                color: "#A7481F",
              }}
            >
              {eyebrow}
            </div>
            <div
              style={{
                marginTop: 18,
                fontFamily: "DM Serif Display",
                fontSize: 70,
                lineHeight: 1.04,
                color: "#16302A",
              }}
            >
              {title}
            </div>
          </div>
          <div style={{ display: "flex", height: 6, width: 120, background: "#16302A" }} />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            width: 560,
            background: "#A7481F",
            overflow: "hidden",
          }}
        >
          {flatten(<IsoHouse animate={false} title="" />)}
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "DM Serif Display", data: serif, weight: 400, style: "normal" },
        { name: "DM Sans", data: sansBold, weight: 700, style: "normal" },
      ],
    },
  );
}
