import type { MetadataRoute } from "next";
import { getListings } from "@/lib/listings";
import { site } from "@/lib/site";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = ["", "/sell", "/homes", "/about", "/investors", "/privacy"].map((p) => ({
    url: `${site.url}${p}`,
    changeFrequency: "weekly" as const,
    priority: p === "" ? 1 : p === "/sell" ? 0.9 : 0.6,
  }));
  const homes = (await getListings()).map((l) => ({
    url: `${site.url}/homes/${l.slug}`,
    lastModified: l.created_at,
    priority: 0.7,
  }));
  return [...pages, ...homes];
}
