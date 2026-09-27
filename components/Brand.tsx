"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

export function BrandLogoMark({ className = "h-8 w-8" }: { className?: string; inverse?: boolean }) {
  return (
    <div className={`relative flex items-center justify-center overflow-hidden rounded-full bg-white p-0.5 shadow-xs ${className}`}>
      <Image
        src="/brand/mark.png"
        alt="GarbhaSetu Logo"
        width={160}
        height={160}
        className="h-full w-full object-contain rounded-full"
        priority
      />
    </div>
  );
}

export function Brand({ inverse = false, compact = false }: { inverse?: boolean; compact?: boolean }) {
  const home = useTranslations("home");

  return (
    <span className="inline-flex items-center gap-2.5">
      <span
        className={`flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-white p-0.5 shadow-2xs border border-[#E6DFD1] ${
          compact ? "h-9 w-9" : "h-11 w-11"
        }`}
        aria-hidden="true"
      >
        <Image
          src="/brand/mark.png"
          alt="GarbhaSetu"
          width={96}
          height={96}
          className="h-full w-full object-contain rounded-full"
          priority
        />
      </span>
      <span className="flex flex-col justify-center">
        <span className={`block font-display text-xl sm:text-2xl font-bold tracking-tight leading-none ${inverse ? "text-white" : "text-[#153C33]"}`}>
          GarbhaSetu
        </span>
        {!compact ? (
          <span className={`mt-0.5 block text-[10px] font-medium tracking-wider uppercase ${inverse ? "text-[#D98A2C]" : "text-[#6E8078]"}`}>
            {home("brandDescriptor")}
          </span>
        ) : null}
      </span>
    </span>
  );
}



