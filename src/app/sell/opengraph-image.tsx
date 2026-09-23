import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Pasturelands: Get a cash offer for your home.";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ eyebrow: "Sell your home", title: "Get a cash offer for your home." });
}
