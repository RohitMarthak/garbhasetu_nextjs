import type { Metadata } from "next";

export const locales = ["gu", "en"] as const;
export type Locale = (typeof locales)[number];

const defaultLocale: Locale = "gu";
const socialImagePath = "/brand/logo.jpg";

function getSiteUrl(): URL {
  const value = process.env.SITE_URL;

  if (!value) {
    throw new Error("SITE_URL must be set to the public HTTPS site origin.");
  }

  let url: URL;
  try {
    url = new URL(value);
  } catch {
    throw new Error("SITE_URL must be a valid HTTPS site origin.");
  }

  if (
    url.protocol !== "https:" ||
    url.username ||
    url.password ||
    url.pathname !== "/" ||
    url.search ||
    url.hash
  ) {
    throw new Error("SITE_URL must be an HTTPS origin without a path, query, or fragment.");
  }

  return url;
}

function routePath(locale: Locale, pathname: string): string {
  if (!pathname.startsWith("/")) {
    throw new Error("Metadata paths must start with '/'.");
  }

  const normalizedPath = pathname === "/" ? "" : pathname.replace(/\/$/, "");
  return locale === defaultLocale ? normalizedPath || "/" : `/en${normalizedPath}`;
}

export function localizedUrl(locale: Locale, pathname = "/"): URL {
  return new URL(routePath(locale, pathname), getSiteUrl());
}

export function localizedAlternates(locale: Locale, pathname = "/"): Metadata["alternates"] {
  return {
    canonical: localizedUrl(locale, pathname).toString(),
    languages: {
      gu: localizedUrl("gu", pathname).toString(),
      en: localizedUrl("en", pathname).toString(),
      "x-default": localizedUrl(defaultLocale, pathname).toString(),
    },
  };
}

type LocalizedMetadataInput = {
  locale: Locale;
  pathname?: string;
  title: string;
  description: string;
};

export function createLocalizedMetadata({
  locale,
  pathname = "/",
  title,
  description,
}: LocalizedMetadataInput): Metadata {
  const url = localizedUrl(locale, pathname);
  const socialImage = new URL(socialImagePath, getSiteUrl());

  return {
    metadataBase: getSiteUrl(),
    title,
    description,
    alternates: localizedAlternates(locale, pathname),
    openGraph: {
      type: "website",
      locale: locale === "gu" ? "gu_IN" : "en_IN",
      url: url.toString(),
      siteName: "GarbhaSetu",
      title,
      description,
      images: [{ url: socialImage.toString() }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [socialImage.toString()],
    },
  };
}
