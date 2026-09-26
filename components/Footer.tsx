import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { phones } from "@/lib/site";
import { Brand } from "./Brand";

export function Footer() {
  const t = useTranslations("nav");
  const home = useTranslations("home");
  const footer = useTranslations("footer");

  return (
    <footer className="border-t border-line bg-maroon-deep text-cream">
      <div className="mx-auto flex max-w-5xl flex-col gap-8 px-5 py-10 md:flex-row md:justify-between">
        <div>
          <Brand inverse />
          <p className="mt-3 max-w-sm text-sm text-cream/80">{home("tagline")}</p>
          <p className="mt-4 text-sm text-cream/70">{footer("rights")}</p>
          <p className="mt-3 max-w-lg text-xs leading-5 text-cream/75">{footer("notice")}</p>
          <p className="mt-2 max-w-sm text-xs leading-5 text-cream/60">{footer("photos")}</p>
        </div>
        <nav aria-label={t("footerNav")} className="flex flex-col gap-2 text-sm">
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
        </nav>
      </div>
    </footer>
  );
}
