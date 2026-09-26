"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { Brand } from "./Brand";
import { LanguageSwitch } from "./LanguageSwitch";

const links = [
  { href: "/", key: "home" },
  { href: "/services", key: "services" },
  { href: "/packages", key: "packages" },
  { href: "/contact", key: "contact" },
] as const;

export function Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  function isCurrent(href: (typeof links)[number]["href"]) {
    return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <header className="sticky top-0 z-20 border-b border-line/80 bg-cream/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-5 py-3">
        <Link href="/" aria-label={t("homeLabel")}>
          <Brand compact />
        </Link>
        <nav aria-label={t("primaryNav")} className="hidden items-center gap-5 text-sm md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isCurrent(link.href) ? "page" : undefined}
              className="nav-link text-ink-soft hover:text-maroon"
            >
              {t(link.key)}
            </Link>
          ))}
          <Link href="/contact" className="rounded-full bg-maroon px-4 py-2 text-cream hover:bg-maroon-deep">
            {t("appointment")}
          </Link>
          <LanguageSwitch className="rounded-full border border-line px-3 py-2 text-ink hover:border-saffron" />
        </nav>
        <div className="flex items-center gap-2 md:hidden">
          <LanguageSwitch className="rounded-full border border-line px-3 py-2 text-xs" />
          <button
            ref={menuButton}
            type="button"
            className="rounded-full border border-line px-3 py-2 text-sm"
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? t("closeMenu") : t("openMenu")}
          </button>
        </div>
      </div>
      {open ? (
        <nav id="mobile-navigation" aria-label={t("mobileNav")} className="flex flex-col gap-3 border-t border-line px-5 py-4 md:hidden">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isCurrent(link.href) ? "page" : undefined}
              onClick={() => setOpen(false)}
              className="text-ink"
            >
              {t(link.key)}
            </Link>
          ))}
          <Link href="/contact" onClick={() => setOpen(false)} className="text-maroon">
            {t("appointment")}
          </Link>
        </nav>
      ) : null}
    </header>
  );
}
