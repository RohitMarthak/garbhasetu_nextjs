"use client";

import { useEffect, useRef, useState } from "react";
import { MessageCircle, Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { Brand } from "./Brand";
import { LanguageSwitch } from "./LanguageSwitch";

const storyLinks = [
  { hash: "concept", key: "concept" },
  { hash: "whynow", key: "whyNow" },
  { hash: "services", key: "services" },
  { hash: "pricing", key: "packages" },
  { hash: "locations", key: "locations" },
] as const;

export function Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const isHomePage = pathname === "/";

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 20);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

  return (
    <header className="fixed inset-x-0 top-0 z-40 w-full pt-3 sm:pt-4 pointer-events-none transition-all duration-300">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div
          className={`pointer-events-auto flex items-center justify-between gap-3 sm:gap-6 rounded-full border px-4 sm:px-5 py-2 transition-all duration-300 ${
            scrolled
              ? "border-[#E6DFD1] bg-[#FAF6EE]/95 shadow-[0_12px_36px_rgba(20,38,33,0.1)] ring-1 ring-black/[0.04] backdrop-blur-xl"
              : "border-[#E6DFD1]/80 bg-[#FAF6EE]/90 shadow-[0_6px_20px_rgba(20,38,33,0.05)] ring-1 ring-black/[0.02] backdrop-blur-lg"
          }`}
        >
          <Link href="/" aria-label={t("homeLabel")} className="shrink-0 flex items-center hover:opacity-95 transition-opacity">
            <Brand compact />
          </Link>

          {/* Desktop Nav Items */}
          <nav
            aria-label={t("primaryNav")}
            className="hidden items-center gap-0.5 rounded-full bg-[#153C33]/[0.05] p-1 border border-[#153C33]/[0.06] text-[13px] font-medium lg:flex text-[#142621]"
          >
            {storyLinks.map((link) => {
              if (isHomePage) {
                return (
                  <a
                    key={link.key}
                    href={`#${link.hash}`}
                    className="rounded-full px-3.5 py-1.5 transition-all duration-150 hover:bg-white hover:text-[#153C33] hover:shadow-xs active:scale-[0.98]"
                  >
                    {t(link.key)}
                  </a>
                );
              }
              return (
                <Link
                  key={link.key}
                  href={`/#${link.hash}`}
                  className="rounded-full px-3.5 py-1.5 transition-all duration-150 hover:bg-white hover:text-[#153C33] hover:shadow-xs active:scale-[0.98]"
                >
                  {t(link.key)}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <LanguageSwitch className="rounded-full border border-[#E6DFD1] bg-white/95 px-3 py-1.5 text-xs font-semibold text-[#142621] shadow-2xs hover:bg-white hover:border-[#153C33]/30 hover:text-[#153C33] transition-all" />

            {isHomePage ? (
              <a
                href="#contact"
                className="hidden sm:inline-flex items-center gap-2 rounded-full bg-[#153C33] px-4 py-2 text-xs font-semibold text-[#FAF6EE] shadow-xs hover:bg-[#1C483D] active:scale-95 transition-all"
              >
                <MessageCircle className="h-3.5 w-3.5 text-[#D98A2C]" />
                <span>{t("appointment")}</span>
              </a>
            ) : (
              <Link
                href="/#contact"
                className="hidden sm:inline-flex items-center gap-2 rounded-full bg-[#153C33] px-4 py-2 text-xs font-semibold text-[#FAF6EE] shadow-xs hover:bg-[#1C483D] active:scale-95 transition-all"
              >
                <MessageCircle className="h-3.5 w-3.5 text-[#D98A2C]" />
                <span>{t("appointment")}</span>
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <button
              ref={menuButton}
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E6DFD1] text-[#445951] hover:bg-[#F4EFE4] lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-navigation"
              onClick={() => setOpen((value) => !value)}
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <div className="mx-4 mt-2 max-w-5xl pointer-events-auto sm:mx-6 lg:hidden">
          <nav
            id="mobile-navigation"
            aria-label={t("mobileNav")}
            className="flex flex-col gap-2 rounded-2xl border border-[#E6DFD1] bg-[#FAF6EE]/98 p-5 shadow-xl backdrop-blur-md"
          >
            {storyLinks.map((link) => {
              if (isHomePage) {
                return (
                  <a
                    key={link.key}
                    href={`#${link.hash}`}
                    onClick={() => setOpen(false)}
                    className="rounded-xl px-3 py-2 text-sm font-medium text-[#142621] hover:bg-[#F4EFE4] transition-colors"
                  >
                    {t(link.key)}
                  </a>
                );
              }
              return (
                <Link
                  key={link.key}
                  href={`/#${link.hash}`}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-2 text-sm font-medium text-[#142621] hover:bg-[#F4EFE4] transition-colors"
                >
                  {t(link.key)}
                </Link>
              );
            })}
            <div className="mt-2 pt-3 border-t border-[#E6DFD1]">
              {isHomePage ? (
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-full bg-[#153C33] py-2.5 text-xs font-semibold text-[#FAF6EE] shadow-sm"
                >
                  <MessageCircle className="h-4 w-4 text-[#D98A2C]" />
                  <span>{t("appointment")}</span>
                </a>
              ) : (
                <Link
                  href="/#contact"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-full bg-[#153C33] py-2.5 text-xs font-semibold text-[#FAF6EE] shadow-sm"
                >
                  <MessageCircle className="h-4 w-4 text-[#D98A2C]" />
                  <span>{t("appointment")}</span>
                </Link>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

