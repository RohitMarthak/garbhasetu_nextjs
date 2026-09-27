import type { Metadata } from "next";
import { Baby, HeartPulse, Laptop, UserRound } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { createLocalizedMetadata, type Locale } from "@/lib/metadata";
import { inr, prices } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return createLocalizedMetadata({ locale: locale as Locale, pathname: "/packages", title: t("packagesTitle"), description: t("packagesDescription") });
}

const planDetails = {
  anc: { amount: prices.anc, Icon: Laptop },
  ancPnc: { amount: prices.ancPnc, Icon: Laptop },
  lactation: { amount: prices.lactation, Icon: Baby },
  labourOnline: { amount: prices.labourOnline, Icon: HeartPulse },
  labourPresence: { amount: prices.labourPresence, Icon: UserRound },
} as const;

export default async function PackagesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("packages");
  const plans = t.raw("plans") as { id: keyof typeof planDetails | "incontinence"; title: string; detail: string }[];
  const conditions = t.raw("conditions") as string[];
  const pricedPlans = plans.filter((plan): plan is typeof plan & { id: keyof typeof planDetails } => plan.id in planDetails);
  const incontinence = plans.find((plan) => plan.id === "incontinence");

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

      {/* Master Offline Card */}
      <article className="mt-10 overflow-hidden rounded-3xl border-2 border-[#D98A2C]/30 bg-white shadow-md">
        <div className="bg-[#0E2923] p-6 sm:p-8 text-white sm:flex sm:items-center sm:justify-between">
          <div>
            <span className="inline-block font-mono text-[11px] font-bold uppercase tracking-wider text-[#D98A2C] bg-white/10 border border-white/15 px-3 py-1 rounded-full">
              Complete Offline Care
            </span>
            <h2 className="mt-3 text-2xl sm:text-3xl font-bold text-white tracking-tight">{t("offlineTitle")}</h2>
            <p className="mt-1.5 text-sm text-white/80">
              {t("offlineSessions", { sessions: prices.offlineSessions })} · {t("offlineRate", { amount: inr(prices.perSession) })}
            </p>
          </div>
          <div className="mt-5 sm:mt-0 text-left sm:text-right">
            <p className="text-xs line-through text-white/50">{inr(prices.offlineList)}</p>
            <p className="text-3xl sm:text-4xl font-bold text-white tracking-tight">{inr(prices.offlinePay)}</p>
            <span className="mt-1 inline-block rounded-full bg-[#D98A2C] px-3 py-0.5 text-xs font-bold text-white">
              {prices.discountPercent}% Discount
            </span>
          </div>
        </div>
      </article>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {pricedPlans.map((plan) => {
          const { amount, Icon } = planDetails[plan.id];
          return (
            <article key={plan.id} className="rounded-2xl border border-[#E6DFD1] bg-white p-6 flex flex-col justify-between shadow-xs">
              <div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FAF6EE] text-[#153C33] border border-[#E6DFD1]">
                  <Icon className="h-5 w-5 stroke-[1.75]" aria-hidden />
                </div>
                <h2 className="mt-3.5 text-lg font-bold text-[#142621]">{plan.title}</h2>
                <p className="mt-2 text-2xl sm:text-3xl font-bold text-[#153C33] tracking-tight">{inr(amount)}</p>
                <p className="mt-2 text-xs sm:text-sm leading-relaxed text-[#445951]">{plan.detail}</p>
              </div>
            </article>
          );
        })}
        {incontinence ? (
          <article className="rounded-2xl border border-[#E6DFD1] bg-white p-6 flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FAF6EE] text-[#153C33] border border-[#E6DFD1]">
                <HeartPulse className="h-5 w-5 stroke-[1.75]" aria-hidden />
              </div>
              <h2 className="mt-3.5 text-lg font-bold text-[#142621]">{incontinence.title}</h2>
              <div className="mt-2 space-y-1">
                <p className="text-lg font-bold text-[#153C33]">
                  {inr(prices.incontinenceConsult)} <span className="text-xs font-normal text-[#6E8078]">({t("consultLabel")})</span>
                </p>
                <p className="text-lg font-bold text-[#153C33]">
                  {inr(prices.incontinenceSession)} <span className="text-xs font-normal text-[#6E8078]">({t("perSessionLabel")})</span>
                </p>
              </div>
              <p className="mt-2 text-xs sm:text-sm leading-relaxed text-[#445951]">{incontinence.detail}</p>
            </div>
          </article>
        ) : null}
      </div>

      <article className="mt-6 rounded-2xl border border-[#E6DFD1] bg-[#FAF6EE] p-6 shadow-xs">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-bold text-[#142621]">{t("sessionTitle")}</h2>
            <p className="mt-1 text-xs sm:text-sm text-[#445951]">{t("sessionBody", { amount: inr(prices.physioSession) })}</p>
          </div>
          <span className="mt-3 sm:mt-0 inline-block rounded-full bg-[#153C33] px-3.5 py-1 text-xs font-semibold text-white">
            {inr(prices.physioSession)} / session
          </span>
        </div>
        <ul className="mt-4 flex flex-wrap gap-2">
          {conditions.map((condition) => (
            <li key={condition} className="rounded-full bg-white px-3 py-1 text-xs font-medium border border-[#E6DFD1] text-[#142621] shadow-2xs">
              {condition}
            </li>
          ))}
        </ul>
      </article>

      <article className="mt-6 rounded-2xl border border-[#E6DFD1] bg-white p-6 shadow-xs">
        <h2 className="text-lg font-bold text-[#142621]">{t("extraTitle")}</h2>
        <p className="mt-2 text-xs sm:text-sm leading-relaxed text-[#445951]">{t("extraBody", { amount: inr(prices.incisionExtra) })}</p>
      </article>

      <article className="mt-6 rounded-2xl border border-[#D98A2C]/30 bg-[#FBF3E7] p-6">
        <h2 className="text-lg font-bold text-[#B56E1A]">{t("ayurvedaTitle")}</h2>
        <p className="mt-2 text-xs sm:text-sm leading-relaxed text-[#445951]">{t("ayurvedaBody")}</p>
      </article>
    </div>
  );
}
