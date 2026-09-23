import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Pasturelands: Privacy notice.";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ eyebrow: "Legal", title: "Privacy notice." });
}
