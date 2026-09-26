import type { Metadata } from "next";
import Image from "next/image";
import { Baby, Flower2, HeartPulse, Stethoscope } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { BulletList } from "@/components/BulletList";
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
    <section className="mt-8">
      <h3 className="text-xl text-maroon-deep">{title}</h3>
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
    <div className="mx-auto max-w-5xl px-5 py-14">
      <p className="text-xs uppercase tracking-[0.16em] text-saffron-deep">{t("kicker")}</p>
      <h1 className="mt-2 font-display text-5xl text-maroon-deep">{t("title")}</h1>
      <p className="mt-4 max-w-2xl leading-7">{t("intro")}</p>

      <nav className="mt-6 flex flex-wrap gap-3 text-sm">
        <a className="rounded-full border border-line px-3 py-1.5 hover:border-saffron" href="#ayurveda">
          {t("ayurvedaTitle")}
        </a>
        <a className="rounded-full border border-line px-3 py-1.5 hover:border-saffron" href="#physiotherapy">
          {t("physioTitle")}
        </a>
        <a className="rounded-full border border-line px-3 py-1.5 hover:border-saffron" href="#facilities">
          {t("facilitiesTitle")}
        </a>
      </nav>

      <article id="ayurveda" className="panel mt-10 scroll-mt-24 rounded-2xl p-6 sm:p-8">
        <p className="text-xs uppercase tracking-[0.16em] text-saffron-deep">{t("ayurvedaKicker")}</p>
        <h2 className="mt-2 flex items-center gap-2 text-3xl text-maroon-deep">
          <Flower2 className="h-7 w-7 text-saffron" aria-hidden />
          {t("ayurvedaTitle")}
        </h2>
        <div className="relative mt-5 h-64 overflow-hidden rounded-2xl">
          <Image src="/photos/spices.jpg" alt={t("dietTitle")} fill sizes="(max-width: 1024px) 100vw, 960px" className="object-cover" />
        </div>
        <p className="mt-3 leading-7">{t("ayurvedaIntro")}</p>
        <Block title={t("counselTitle")}>
          <p className="leading-7">{t("counselBody")}</p>
        </Block>
        <Block title={t("dietTitle")}>
          <p className="leading-7">{t("dietBody")}</p>
        </Block>
        <Block title={t("mindTitle")}>
          <BulletList items={t.raw("mindItems") as string[]} />
        </Block>
        <Block title={t("samvadTitle")}>
          <p className="leading-7">{t("samvadBody")}</p>
        </Block>
        <Block title={t("activitiesTitle")}>
          <p className="mb-3 leading-7">{t("activitiesIntro")}</p>
          <BulletList items={t.raw("activities") as string[]} />
        </Block>
        <Block title={t("journalTitle")}>
          <p className="leading-7">{t("journalBody")}</p>
        </Block>
      </article>

      <article id="physiotherapy" className="panel mt-8 scroll-mt-24 rounded-2xl p-6 sm:p-8">
        <p className="text-xs uppercase tracking-[0.16em] text-saffron-deep">{t("physioKicker")}</p>
        <h2 className="mt-2 flex items-center gap-2 text-3xl text-maroon-deep">
          <Stethoscope className="h-7 w-7 text-saffron" aria-hidden />
          {t("physioTitle")}
        </h2>
        <div className="mt-5 rounded-2xl bg-[linear-gradient(135deg,var(--color-cream-deep),var(--color-paper))] p-6 sm:flex sm:items-center sm:gap-5">
          <span className="icon-wrap h-12 w-12 shrink-0"><HeartPulse className="h-6 w-6" aria-hidden /></span>
          <p className="mt-3 leading-7 sm:mt-0">{t("physioIntro")}</p>
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {pillars.map((pillar) => {
            const Icon = { antenatal: HeartPulse, labour: Baby, lactation: Flower2, postpartum: Stethoscope }[pillar.id];
            return (
              <div key={pillar.id} className="rounded-xl bg-cream px-4 py-4">
                <span className="icon-wrap"><Icon className="h-5 w-5" aria-hidden /></span>
                <h3 className="mt-2 text-maroon-deep">{pillar.title}</h3>
                <p className="mt-1 text-sm leading-6 text-ink-soft">{pillar.body}</p>
              </div>
            );
          })}
        </div>

        <Block title={t("ancTitle")}>
          <BulletList items={t.raw("ancItems") as string[]} />
        </Block>
        <div className="mt-6 rounded-xl border border-maroon/30 bg-cream px-4 py-4">
          <h3 className="text-maroon-deep">{t("safetyTitle")}</h3>
          <p className="mt-2 leading-7">{t("safetyBody")}</p>
        </div>
        <Block title={t("exerciseTitle")}>
          <p className="mb-3 leading-7">{t("exerciseIntro")}</p>
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
          <h4 className="mt-4 text-maroon">{t("labourPlansTitle")}</h4>
          <BulletList
            items={(t.raw("labourPlans") as string[]).map((item, index) =>
              index === 1 ? `${item} — ${inr(prices.labourPresence)}` : item,
            )}
          />
        </Block>
        <Block title={t("lactationTitle")}>
          <p className="mb-3 leading-7">{t("lactationIntro")}</p>
          <BulletList items={t.raw("lactationItems") as string[]} />
        </Block>
        <Block title={t("postTitle")}>
          <p className="mb-3 leading-7">{t("postIntro")}</p>
          <BulletList items={t.raw("postItems") as string[]} />
        </Block>
        <div className="mt-6 rounded-xl border border-leaf/30 bg-cream px-4 py-4">
          <h3 className="text-leaf">{t("timingTitle")}</h3>
          <p className="mt-2 leading-7">{t("timingBody")}</p>
        </div>
        <Block title={t("neoTitle")}>
          <BulletList
            items={(t.raw("neoItems") as string[]).map((item, index, list) =>
              index === list.length - 1 ? `${item} — ${inr(prices.incisionExtra)}` : item,
            )}
          />
        </Block>
        <Block title={t("emotionTitle")}>
          <p className="leading-7">{t("emotionBody")}</p>
        </Block>
      </article>

      <article id="facilities" className="panel mt-8 scroll-mt-24 rounded-2xl p-6 sm:p-8">
        <h2 className="text-3xl text-maroon-deep">{t("facilitiesTitle")}</h2>
        <Block title={t("modalitiesTitle")}>
          <BulletList items={t.raw("modalities") as string[]} />
        </Block>
        <Block title={t("toolsTitle")}>
          <BulletList items={t.raw("tools") as string[]} />
        </Block>
        <Block title={t("roomsTitle")}>
          <BulletList items={t.raw("rooms") as string[]} />
        </Block>
      </article>
    </div>
  );
}
