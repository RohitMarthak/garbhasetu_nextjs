import type { Metadata } from "next";
import { Baby, Flower2, HeartPulse, Stethoscope } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { BulletList } from "@/components/BulletList";
import { NutritionIllustration } from "@/components/WellnessIllustrations";
import { createLocalizedMetadata, type Locale } from "@/lib/metadata";
import { inr, prices } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return createLocalizedMetadata({ locale: locale as Locale, pathname: "/services", title: t("servicesTitle"), description: t("servicesDescription") });
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-8 pt-6 border-t border-[#E6DFD1]">
      <h3 className="text-lg font-bold text-[#142621]">{title}</h3>
      <div className="mt-3">{children}</div>
    </section>
  );
}

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("services");
  const pillars = t.raw("pillars") as { id: "antenatal" | "labour" | "lactation" | "postpartum"; title: string; body: string }[];

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

      <nav className="mt-6 flex flex-wrap gap-2 text-xs font-semibold">
        <a className="rounded-full bg-white border border-[#E6DFD1] px-4 py-2 text-[#153C33] shadow-xs hover:bg-[#FAF6EE] transition-colors" href="#ayurveda">
          {t("ayurvedaTitle")}
        </a>
        <a className="rounded-full bg-white border border-[#E6DFD1] px-4 py-2 text-[#153C33] shadow-xs hover:bg-[#FAF6EE] transition-colors" href="#physiotherapy">
          {t("physioTitle")}
        </a>
        <a className="rounded-full bg-white border border-[#E6DFD1] px-4 py-2 text-[#153C33] shadow-xs hover:bg-[#FAF6EE] transition-colors" href="#facilities">
          {t("facilitiesTitle")}
        </a>
      </nav>

      <article id="ayurveda" className="mt-10 scroll-mt-28 rounded-3xl border border-[#E6DFD1] bg-white p-6 sm:p-10 shadow-xs">
        <div className="section-label">
          <span>{t("ayurvedaKicker")}</span>
        </div>
        <h2 className="mt-3 flex items-center gap-3 text-2xl sm:text-3xl font-bold tracking-tight text-[#142621]">
          <Flower2 className="h-7 w-7 text-[#D98A2C] stroke-[1.75]" aria-hidden />
          <span>{t("ayurvedaTitle")}</span>
        </h2>
        <div className="mt-5 h-56 overflow-hidden rounded-2xl bg-white border border-[#E6DFD1]">
          <NutritionIllustration />
        </div>
        <p className="mt-5 text-sm leading-relaxed text-[#445951]">{t("ayurvedaIntro")}</p>
        
        <Block title={t("counselTitle")}>
          <p className="text-xs sm:text-sm leading-relaxed text-[#445951]">{t("counselBody")}</p>
        </Block>
        <Block title={t("dietTitle")}>
          <p className="text-xs sm:text-sm leading-relaxed text-[#445951]">{t("dietBody")}</p>
        </Block>
        <Block title={t("mindTitle")}>
          <BulletList items={t.raw("mindItems") as string[]} />
        </Block>
        <Block title={t("samvadTitle")}>
          <p className="text-xs sm:text-sm leading-relaxed text-[#445951]">{t("samvadBody")}</p>
        </Block>
        <Block title={t("activitiesTitle")}>
          <p className="mb-3 text-xs sm:text-sm leading-relaxed text-[#445951]">{t("activitiesIntro")}</p>
          <BulletList items={t.raw("activities") as string[]} />
        </Block>
        <Block title={t("journalTitle")}>
          <p className="text-xs sm:text-sm leading-relaxed text-[#445951]">{t("journalBody")}</p>
        </Block>
      </article>

      <article id="physiotherapy" className="mt-8 scroll-mt-28 rounded-3xl border border-[#E6DFD1] bg-white p-6 sm:p-10 shadow-xs">
        <div className="section-label">
          <span>{t("physioKicker")}</span>
        </div>
        <h2 className="mt-3 flex items-center gap-3 text-2xl sm:text-3xl font-bold tracking-tight text-[#142621]">
          <Stethoscope className="h-7 w-7 text-[#D98A2C] stroke-[1.75]" aria-hidden />
          <span>{t("physioTitle")}</span>
        </h2>
        <div className="mt-5 rounded-2xl bg-[#FAF6EE] border border-[#E6DFD1] p-6 sm:flex sm:items-center sm:gap-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#153C33] border border-[#E6DFD1]">
            <HeartPulse className="h-6 w-6 stroke-[1.75]" aria-hidden />
          </div>
          <p className="mt-3 text-xs sm:text-sm leading-relaxed text-[#445951] sm:mt-0">{t("physioIntro")}</p>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {pillars.map((pillar) => {
            const Icon = { antenatal: HeartPulse, labour: Baby, lactation: Flower2, postpartum: Stethoscope }[pillar.id];
            return (
              <div key={pillar.id} className="rounded-2xl bg-[#FAF6EE] border border-[#E6DFD1] p-5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-[#153C33] border border-[#E6DFD1]">
                  <Icon className="h-5 w-5 stroke-[1.75]" aria-hidden />
                </div>
                <h3 className="mt-3 text-base font-bold text-[#142621]">{pillar.title}</h3>
                <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-[#445951]">{pillar.body}</p>
              </div>
            );
          })}
        </div>

        <Block title={t("ancTitle")}>
          <BulletList items={t.raw("ancItems") as string[]} />
        </Block>
        <div className="mt-6 rounded-2xl border border-[#153C33]/15 bg-[#E9F0EC] p-5">
          <h3 className="text-base font-bold text-[#153C33]">{t("safetyTitle")}</h3>
          <p className="mt-2 text-xs sm:text-sm leading-relaxed text-[#445951]">{t("safetyBody")}</p>
        </div>
        <Block title={t("exerciseTitle")}>
          <p className="mb-3 text-xs sm:text-sm leading-relaxed text-[#445951]">{t("exerciseIntro")}</p>
          <BulletList items={t.raw("exerciseItems") as string[]} />
        </Block>
        <Block title={t("familyTitle")}>
          <BulletList items={t.raw("familyItems") as string[]} />
        </Block>
        <Block title={t("redFlagsTitle")}>
          <BulletList items={t.raw("redFlags") as string[]} />
        </Block>
        <Block title={t("labourTitle")}>
          <BulletList items={t.raw("labourItems") as string[]} />
          <h4 className="mt-4 font-bold text-[#142621]">{t("labourPlansTitle")}</h4>
          <BulletList
            items={(t.raw("labourPlans") as string[]).map((item, index) =>
              index === 1 ? `${item} — ${inr(prices.labourPresence)}` : item,
            )}
          />
        </Block>
        <Block title={t("lactationTitle")}>
          <p className="mb-3 text-xs sm:text-sm leading-relaxed text-[#445951]">{t("lactationIntro")}</p>
          <BulletList items={t.raw("lactationItems") as string[]} />
        </Block>
        <Block title={t("postTitle")}>
          <p className="mb-3 text-xs sm:text-sm leading-relaxed text-[#445951]">{t("postIntro")}</p>
          <BulletList items={t.raw("postItems") as string[]} />
        </Block>
        <div className="mt-6 rounded-2xl border border-[#153C33]/15 bg-[#E9F0EC] p-5">
          <h3 className="text-base font-bold text-[#153C33]">{t("timingTitle")}</h3>
          <p className="mt-2 text-xs sm:text-sm leading-relaxed text-[#445951]">{t("timingBody")}</p>
        </div>
        <Block title={t("neoTitle")}>
          <BulletList
            items={(t.raw("neoItems") as string[]).map((item, index, list) =>
              index === list.length - 1 ? `${item} — ${inr(prices.incisionExtra)}` : item,
            )}
          />
        </Block>
        <Block title={t("emotionTitle")}>
          <p className="text-xs sm:text-sm leading-relaxed text-[#445951]">{t("emotionBody")}</p>
        </Block>
      </article>

      <article id="facilities" className="mt-8 scroll-mt-28 rounded-3xl border border-[#E6DFD1] bg-white p-6 sm:p-10 shadow-xs">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#142621]">{t("facilitiesTitle")}</h2>
        <Block title={t("modalitiesTitle")}>
          <BulletList items={t.raw("modalities") as string[]} />
        </Block>
        <Block title={t("toolsTitle")}>
          <BulletList items={t.raw("tools") as string[]} />
        </Block>
      </article>
    </div>
  );
}
