import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Pasturelands: Request information.";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ eyebrow: "Investors", title: "Request information." });
}
