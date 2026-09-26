import type { MetadataRoute } from "next";
import { locales, localizedUrl } from "@/lib/metadata";

const routes = [
  { pathname: "/", priority: 1 },
  { pathname: "/services", priority: 0.8 },
  { pathname: "/packages", priority: 0.8 },
  { pathname: "/contact", priority: 0.8 },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.flatMap(({ pathname, priority }) =>
    locales.map((locale) => ({
      url: localizedUrl(locale, pathname).toString(),
      changeFrequency: "weekly" as const,
      priority,
    })),
  );
}
