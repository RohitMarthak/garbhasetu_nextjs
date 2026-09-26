"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LanguageSwitch } from "./LanguageSwitch";

const links = [
  { href: "/", key: "home" },
  { href: "/services", key: "services" },
  { href: "/packages", key: "packages" },
  { href: "/contact", key: "contact" },
] as const;

export function Header() {
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-20 border-b border-line/80 bg-cream/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-5 py-3">
        <Link href="/" className="flex items-center gap-2">
          <img src="/brand/mark.png" alt="" className="h-12 w-12 object-contain" />
          <span className="font-display text-2xl tracking-wide text-maroon-deep">GarbhaSetu</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm md:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="text-ink-soft hover:text-maroon">
              {t(link.key)}
            </Link>
          ))}
          <Link href="/contact" className="rounded-full bg-maroon px-4 py-2 text-cream hover:bg-maroon-deep">
            {t("whatsapp")}
          </Link>
          <LanguageSwitch className="rounded-full border border-line px-3 py-2 text-ink hover:border-saffron" />
        </nav>
        <button
          type="button"
          className="rounded-full border border-line px-3 py-2 text-sm md:hidden"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? t("closeMenu") : t("openMenu")}
        </button>
      </div>
      {open ? (
        <nav className="flex flex-col gap-3 border-t border-line px-5 py-4 md:hidden">
          {links.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className="text-ink">
              {t(link.key)}
            </Link>
          ))}
          <Link href="/contact" onClick={() => setOpen(false)} className="text-maroon">
            {t("whatsapp")}
          </Link>
          <LanguageSwitch className="self-start rounded-full border border-line px-3 py-2" />
        </nav>
      ) : null}
    </header>
  );
}
