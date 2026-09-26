import type { Metadata } from "next";
import { Baby, HeartPulse, Laptop, UserRound } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { inr, prices } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: t("packagesTitle"),
    description: t("packagesDescription"),
    alternates: { languages: { gu: "/packages", en: "/en/packages" } },
  };
}

const planAmounts = [
  prices.anc,
  prices.ancPnc,
  prices.lactation,
  prices.labourOnline,
  prices.labourPresence,
] as const;

export default async function PackagesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("packages");
  const plans = t.raw("plans") as { title: string; detail: string }[];
  const conditions = t.raw("conditions") as string[];
  const pricedPlans = plans.slice(0, planAmounts.length);
  const incontinence = plans[planAmounts.length];

  return (
    <div className="mx-auto max-w-5xl px-5 py-14">
      <p className="text-xs uppercase tracking-[0.16em] text-saffron-deep">{t("kicker")}</p>
      <h1 className="mt-2 font-display text-5xl text-maroon-deep">{t("title")}</h1>
      <p className="mt-4 max-w-2xl leading-7">{t("intro")}</p>

      <article className="lift panel mt-8 rounded-2xl p-6 sm:p-8">
        <h2 className="text-2xl text-maroon-deep">{t("offlineTitle")}</h2>
        <p className="mt-4 font-display text-5xl text-maroon">{inr(prices.offlinePay)}</p>
        <dl className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-ink-soft">{t("offlineSessions", { sessions: prices.offlineSessions })}</dt>
            <dd>{t("offlineRate", { amount: inr(prices.perSession) })}</dd>
          </div>
          <div>
            <dt className="text-ink-soft">{t("offlineList", { amount: inr(prices.offlineList) })}</dt>
            <dd>{t("offlineDiscount", { percent: prices.discountPercent })}</dd>
          </div>
        </dl>
      </article>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {pricedPlans.map((plan, index) => {
          const Icon = [Laptop, Laptop, Baby, HeartPulse, UserRound][index] ?? HeartPulse;
          return (
          <article key={plan.title} className="lift panel rounded-2xl p-5">
            <Icon className="h-5 w-5 text-saffron" aria-hidden />
            <h2 className="mt-3 text-lg text-maroon-deep">{plan.title}</h2>
            <p className="mt-2 font-display text-4xl text-maroon">{inr(planAmounts[index])}</p>
            <p className="mt-2 text-sm leading-6 text-ink-soft">{plan.detail}</p>
          </article>
          );
        })}
        {incontinence ? (
          <article className="panel rounded-2xl p-5">
            <h2 className="text-lg text-maroon-deep">{incontinence.title}</h2>
            <p className="mt-3 text-lg text-maroon">
              {inr(prices.incontinenceConsult)} <span className="text-sm text-ink-soft">{t("consultLabel")}</span>
            </p>
            <p className="text-lg text-maroon">
              {inr(prices.incontinenceSession)} <span className="text-sm text-ink-soft">{t("perSessionLabel")}</span>
            </p>
            <p className="mt-2 text-sm leading-6 text-ink-soft">{incontinence.detail}</p>
          </article>
        ) : null}
      </div>

      <article className="panel mt-4 rounded-2xl p-6">
        <h2 className="text-xl text-maroon-deep">{t("sessionTitle")}</h2>
        <p className="mt-2 font-display text-4xl text-maroon">{inr(prices.physioSession)}</p>
        <p className="mt-2 text-sm text-ink-soft">{t("sessionBody", { amount: inr(prices.physioSession) })}</p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {conditions.map((condition) => (
            <li key={condition} className="rounded-full bg-cream px-3 py-1 text-sm">
              {condition}
            </li>
          ))}
        </ul>
      </article>

      <article className="panel mt-4 rounded-2xl p-6">
        <h2 className="text-xl text-maroon-deep">{t("extraTitle")}</h2>
        <p className="mt-2 leading-7">{t("extraBody", { amount: inr(prices.incisionExtra) })}</p>
      </article>

      <article className="mt-4 rounded-2xl border border-dashed border-saffron/60 px-6 py-5">
        <h2 className="text-xl text-maroon-deep">{t("ayurvedaTitle")}</h2>
        <p className="mt-2 leading-7">{t("ayurvedaBody")}</p>
      </article>
    </div>
  );
}
