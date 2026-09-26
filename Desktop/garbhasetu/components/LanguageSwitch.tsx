"use client";

import { useLocale } from "next-intl";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";

export function LanguageSwitch({ className }: { className?: string }) {
  const locale = useLocale();
  const t = useTranslations("nav");
  const router = useRouter();
  const pathname = usePathname();
  const next = locale === "gu" ? "en" : "gu";

  return (
    <button
      type="button"
      className={className}
      aria-label={next === "en" ? t("switchToEnglish") : t("switchToGujarati")}
      onClick={() => router.replace(pathname, { locale: next })}
    >
      {next === "en" ? "English" : "ગુજરાતી"}
    </button>
  );
}
