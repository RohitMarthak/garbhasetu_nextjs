import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { phones } from "@/lib/site";

export function Footer() {
  const t = useTranslations("nav");
  const home = useTranslations("home");
  const footer = useTranslations("footer");

  return (
    <footer className="border-t border-line bg-maroon-deep text-cream">
      <div className="mx-auto flex max-w-5xl flex-col gap-8 px-5 py-10 md:flex-row md:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <img src="/brand/mark.png" alt="" className="h-14 w-14 rounded-full bg-cream object-contain" />
            <p className="font-display text-3xl">GarbhaSetu</p>
          </div>
          <p className="mt-3 max-w-sm text-sm text-cream/80">{home("tagline")}</p>
          <p className="mt-4 text-sm text-cream/70">{footer("rights")}</p>
          <p className="mt-2 max-w-sm text-xs leading-5 text-cream/60">{footer("photos")}</p>
        </div>
        <div className="flex flex-col gap-2 text-sm">
          <Link href="/services" className="hover:text-white">
            {t("services")}
          </Link>
          <Link href="/packages" className="hover:text-white">
            {t("packages")}
          </Link>
          <Link href="/contact" className="hover:text-white">
            {t("contact")}
          </Link>
          <a href={`tel:${phones.jagrut.tel}`} className="hover:text-white">
            {home("jagrutName")} · {phones.jagrut.display}
          </a>
          <a href={`tel:${phones.richa.tel}`} className="hover:text-white">
            {home("richaName")} · {phones.richa.display}
          </a>
        </div>
      </div>
    </footer>
  );
}
