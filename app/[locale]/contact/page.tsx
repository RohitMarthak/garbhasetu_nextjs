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
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-12 sm:py-16">
      <div className="section-label">
        <span>{t("kicker")}</span>
      </div>
      <h1 className="mt-3 font-display text-4xl sm:text-5xl font-bold tracking-tight text-[#142621]">
        {t("title")}
      </h1>
      <p className="mt-3 max-w-2xl text-base text-[#445951] leading-relaxed">
        {t("intro")}
      </p>
      
      <div className="mt-8">
        <AppointmentForm />
      </div>

      <div className="mt-16">
        <div className="section-label mb-2">
          <span>{home("clinicsTitle")}</span>
        </div>
        <h2 className="font-display text-3xl font-bold tracking-tight text-[#142621]">
          {home("clinicsTitle")}
        </h2>
        <div className="mt-6">
          <Clinics />
        </div>
      </div>
    </div>
  );
}
