import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export default function NotFound() {
  const t = useTranslations("notFound");
  return (
    <div className="mx-auto max-w-3xl px-5 py-24 text-center">
      <p className="text-sm uppercase tracking-[0.16em] text-saffron-deep">404</p>
      <h1 className="mt-3 font-display text-5xl text-maroon-deep">{t("title")}</h1>
      <p className="mx-auto mt-4 max-w-xl leading-7 text-ink-soft">{t("body")}</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className="rounded-full bg-maroon px-5 py-2.5 text-cream hover:bg-maroon-deep">{t("home")}</Link>
        <Link href="/contact" className="rounded-full border border-maroon px-5 py-2.5 text-maroon hover:bg-cream-deep">{t("contact")}</Link>
      </div>
    </div>
  );
}
