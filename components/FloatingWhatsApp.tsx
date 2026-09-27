"use client";

import { useState } from "react";
import { MessageCircle, X, ChevronUp, User, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import { phones } from "@/lib/site";

export function FloatingWhatsApp() {
  const t = useTranslations("nav");
  const home = useTranslations("home");
  const [isOpen, setIsOpen] = useState(false);

  return (
    <aside aria-label="WhatsApp quick contact" className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Direct WhatsApp consultation contacts"
          className="mb-3 w-80 rounded-3xl border border-[#17352B]/15 bg-white/95 p-5 shadow-[0_20px_50px_rgba(23,53,43,0.18)] backdrop-blur-xl animate-in fade-in slide-in-from-bottom-3 duration-200"
        >
          <div className="flex items-center justify-between border-b border-[#17352B]/[0.08] pb-3">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#25D366]/15 text-[#25D366]">
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
              </span>
              <p className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#17352B]">Direct WhatsApp</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-full p-1 text-[#708279] hover:bg-[#FAF8F5] hover:text-[#111C18] transition-colors"
              aria-label="Close WhatsApp options"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <p className="mt-3 text-xs leading-relaxed text-[#4A5D54]">
            Connect directly with GarbhaSetu founders for personalized care in Palanpur:
          </p>

          <div className="mt-4 flex flex-col gap-2.5">
            <a
              href={`https://wa.me/${phones.jagrut.wa}?text=${encodeURIComponent("Hello Dr. Jagrut, I would like to know more about Ayurvedic Garbhasanskar at GarbhaSetu.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-2xl border border-[#17352B]/[0.08] bg-[#FAF8F5] p-3 hover:border-[#17352B]/25 hover:bg-white transition-all group"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#EBF3EE] text-[#17352B]">
                <Sparkles className="h-4 w-4 stroke-[1.75]" />
              </div>
              <div className="min-w-0 text-left">
                <p className="text-xs font-bold text-[#111C18] group-hover:text-[#17352B] transition-colors truncate">
                  {home("jagrutName")}
                </p>
                <p className="font-mono text-[10px] text-[#708279]">Ayurveda & Garbhasanskar</p>
              </div>
            </a>

            <a
              href={`https://wa.me/${phones.richa.wa}?text=${encodeURIComponent("Hello Dr. Richa, I would like to inquire about Pregnancy Physiotherapy & ANC/PNC at GarbhaSetu.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-2xl border border-[#17352B]/[0.08] bg-[#FAF8F5] p-3 hover:border-[#17352B]/25 hover:bg-white transition-all group"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#FCF4EB] text-[#9E5218]">
                <User className="h-4 w-4 stroke-[1.75]" />
              </div>
              <div className="min-w-0 text-left">
                <p className="text-xs font-bold text-[#111C18] group-hover:text-[#17352B] transition-colors truncate">
                  {home("richaName")}
                </p>
                <p className="font-mono text-[10px] text-[#708279]">Physiotherapy & ANC/PNC</p>
              </div>
            </a>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={t("floatingWhatsApp")}
        className="flex items-center gap-2.5 rounded-full bg-[#25D366] px-4 py-3 text-white shadow-[0_10px_30px_rgba(37,211,102,0.35)] hover:bg-[#20bd5a] hover:scale-105 active:scale-95 transition-all duration-200"
      >
        <MessageCircle className="h-5 w-5" />
        <span className="hidden sm:inline text-xs font-semibold tracking-wide">{t("floatingWhatsApp")}</span>
        <ChevronUp className={`h-3.5 w-3.5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>
    </aside>
  );
}
