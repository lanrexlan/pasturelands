import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Pasturelands: A simpler way to sell, a safer way to buy.";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ eyebrow: "About us", title: "A simpler way to sell, a safer way to buy." });
}
