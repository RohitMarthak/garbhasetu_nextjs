import Image from "next/image";
import { useTranslations } from "next-intl";

export function Brand({ inverse = false, compact = false }: { inverse?: boolean; compact?: boolean }) {
  const home = useTranslations("home");

  return (
    <span className={`inline-flex items-center gap-3 ${compact ? "brand-compact" : ""}`}>
      <span
        className={`brand-mark ${compact ? "h-11 w-11" : "h-14 w-14"}`}
        aria-hidden="true"
      >
        <Image src="/brand/mark.png" alt="" width={428} height={464} sizes="56px" priority={compact} />
      </span>
      <span>
        <span lang="en" className={`brand-wordmark block font-display text-2xl leading-none ${inverse ? "text-cream" : "text-maroon-deep"}`}>
          GarbhaSetu
        </span>
        {!compact ? (
          <span className={`mt-1 block text-xs ${inverse ? "text-cream/70" : "text-ink-soft"}`}>
            {home("brandDescriptor")}
          </span>
        ) : null}
      </span>
    </span>
  );
}
