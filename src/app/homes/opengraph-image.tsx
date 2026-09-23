import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Pasturelands: Verified, renovated homes. No agency fee.";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ eyebrow: "Homes", title: "Verified, renovated homes. No agency fee." });
}
