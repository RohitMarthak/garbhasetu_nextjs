"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { phones } from "@/lib/site";
import { Brand } from "./Brand";

export function Footer() {
  const t = useTranslations("nav");
  const home = useTranslations("home");
  const footer = useTranslations("footer");

  return (
    <footer className="relative border-t border-white/15 bg-[#0A1D17] text-white">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 botanical-matrix-dark opacity-15" />
      <div className="relative z-10 mx-auto flex max-w-5xl flex-col gap-10 px-5 py-12 md:flex-row md:justify-between">
        <div>
          <Brand inverse />
          <p className="mt-3 max-w-sm text-sm text-white/85">{home("tagline")}</p>
          <p className="mt-4 font-mono text-xs text-white/50">{footer("rights")}</p>
          <p className="mt-3 max-w-lg text-xs leading-relaxed text-white/70">{footer("notice")}</p>
        </div>
        <nav aria-label={t("footerNav")} className="flex flex-col gap-2.5 text-xs sm:text-sm">
          <Link href="/services" className="text-white/85 hover:text-white transition-colors">
            {t("services")}
          </Link>
          <Link href="/packages" className="text-white/85 hover:text-white transition-colors">
            {t("packages")}
          </Link>
          <Link href="/contact" className="text-white/85 hover:text-white transition-colors">
            {t("contact")}
          </Link>
          <div className="mt-2 pt-2 border-t border-white/15 flex flex-col gap-2">
            <a href={`tel:${phones.jagrut.tel}`} className="text-[#D98A2C] hover:text-white transition-colors font-medium">
              {home("jagrutName")} · {phones.jagrut.display}
            </a>
            <a href={`tel:${phones.richa.tel}`} className="text-[#D98A2C] hover:text-white transition-colors font-medium">
              {home("richaName")} · {phones.richa.display}
            </a>
          </div>
        </nav>
      </div>
    </footer>
  );
}
