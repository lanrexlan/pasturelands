import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Pasturelands: sell your house in weeks, not months";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({
    eyebrow: "Abuja · Lagos",
    title: "Sell your house in weeks, not months.",
  });
}
