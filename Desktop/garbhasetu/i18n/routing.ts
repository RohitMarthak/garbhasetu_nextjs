import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["gu", "en"],
  defaultLocale: "gu",
  localePrefix: "as-needed",
  localeDetection: false,
});

export type Locale = (typeof routing.locales)[number];
