import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { AppointmentForm } from "@/components/AppointmentForm";
import { Clinics } from "@/components/Clinics";
import { createLocalizedMetadata, type Locale } from "@/lib/metadata";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return createLocalizedMetadata({ locale: locale as Locale, pathname: "/contact", title: t("contactTitle"), description: t("contactDescription") });
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");
  const home = await getTranslations("home");

  return (
    <div className="mx-auto max-w-5xl px-5 py-14">
      <p className="text-xs uppercase tracking-[0.16em] text-saffron-deep">{t("kicker")}</p>
      <h1 className="mt-2 font-display text-5xl text-maroon-deep">{t("title")}</h1>
      <p className="mt-4 max-w-2xl leading-7">{t("intro")}</p>
      <div className="mt-8">
        <AppointmentForm />
      </div>
      <h2 className="mt-12 text-2xl text-maroon-deep">{home("clinicsTitle")}</h2>
      <div className="mt-4">
        <Clinics />
      </div>
    </div>
  );
}
