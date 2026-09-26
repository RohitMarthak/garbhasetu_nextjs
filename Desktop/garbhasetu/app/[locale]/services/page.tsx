import type { Metadata } from "next";
import Image from "next/image";
import { Baby, Flower2, HeartPulse, Stethoscope } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { BulletList } from "@/components/BulletList";
import { SourceList } from "@/components/SourceList";
import { SourceNote } from "@/components/SourceNote";
import { createLocalizedMetadata, type Locale } from "@/lib/metadata";
import { inr, prices } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };
type PillarId = "antenatal" | "labour" | "lactation" | "postpartum";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return createLocalizedMetadata({ locale: locale as Locale, pathname: "/services", title: t("servicesTitle"), description: t("servicesDescription") });
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return <section><h3 className="text-xl text-maroon-deep">{title}</h3><div className="mt-3">{children}</div></section>;
}

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("services");
  const pillars = t.raw("pillars") as { id: PillarId; title: string; body: string }[];
  const labourPlans = t.raw("labourPlansRich") as { id: "counselling" | "presence"; text: string }[];
  const neoItems = t.raw("neoItemsRich") as { id: "neonatal" | "binder" | "incision"; text: string }[];
  const pillarIcons = { antenatal: HeartPulse, labour: Baby, lactation: Flower2, postpartum: Stethoscope };

  return (
    <div className="pb-16">
      <header className="story-band">
        <div className="mx-auto max-w-5xl px-5 py-14 sm:py-18">
          <p className="section-kicker">{t("kicker")}</p>
          <h1 className="mt-2 max-w-3xl font-display text-5xl leading-tight text-maroon-deep sm:text-6xl">{t("title")}</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8">{t("intro")}</p>
          <nav aria-label={t("sectionNav")} className="mt-7 flex flex-wrap gap-3 text-sm">
            <a className="anchor-pill" href="#ayurveda">{t("ayurvedaTitle")}</a>
            {pillars.map((pillar) => <a key={pillar.id} className="anchor-pill" href={`#${pillar.id}`}>{pillar.title}</a>)}
            <a className="anchor-pill" href="#facilities">{t("facilitiesTitle")}</a>
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-5xl px-5 py-12">
        <div className="editorial-split items-center">
          <div>
            <p className="section-kicker">{t("journeyKicker")}</p>
            <h2 className="section-title">{t("journeyTitle")}</h2>
            <p className="mt-4 text-lg leading-8 text-ink-soft">{t("journeyBody")}</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {pillars.map((pillar) => {
              const Icon = pillarIcons[pillar.id];
              return <a key={pillar.id} href={`#${pillar.id}`} className="stage-card panel rounded-2xl p-4"><span className="icon-wrap"><Icon className="h-5 w-5" aria-hidden /></span><h3 className="mt-3 text-maroon-deep">{pillar.title}</h3><p className="mt-1 text-sm leading-6 text-ink-soft">{pillar.body}</p></a>;
            })}
          </div>
        </div>
      </section>

      <article id="ayurveda" className="mx-auto max-w-5xl scroll-mt-24 px-5 py-8">
        <div className="panel overflow-hidden rounded-[2rem]">
          <div className="editorial-split gap-0">
            <div className="p-7 sm:p-9">
              <p className="section-kicker">{t("ayurvedaKicker")}</p>
              <h2 className="mt-2 text-3xl text-maroon-deep">{t("ayurvedaTitle")}</h2>
              <p className="mt-4 leading-7">{t("ayurvedaIntro")}</p>
              <SourceNote sourceIds={["clinic-presentation-2026", "clinic-garbhasanskar-guide-2026"]} locale={locale} />
            </div>
            <figure className="relative min-h-72 overflow-hidden">
              <Image src="/photos/food-vegetable-basket.webp" alt={t("ayurvedaImageAlt")} fill sizes="(max-width: 767px) 100vw, 50vw" className="object-cover" />
              <figcaption className="absolute inset-x-4 bottom-4 rounded-xl bg-paper/95 p-3 text-xs text-ink-soft">{t("foodPhotoCaption")}</figcaption>
            </figure>
          </div>
          <div className="grid gap-8 border-t border-line p-7 sm:p-9 md:grid-cols-2">
            <Block title={t("counselTitle")}><p className="leading-7">{t("counselBody")}</p></Block>
            <Block title={t("dietTitle")}><Image src="/illustrations/nourishment.svg" alt="" width={96} height={72} unoptimized className="mb-3 h-16 w-auto text-maroon" /><p className="leading-7">{t("dietBody")}</p></Block>
            <Block title={t("mindTitle")}><BulletList items={t.raw("mindItems") as string[]} /></Block>
            <div className="space-y-8">
              <Block title={t("samvadTitle")}><p className="leading-7">{t("samvadBody")}</p></Block>
              <Block title={t("activitiesTitle")}><p className="mb-3 leading-7">{t("activitiesIntro")}</p><BulletList items={t.raw("activities") as string[]} /></Block>
              <Block title={t("journalTitle")}><p className="leading-7">{t("journalBody")}</p></Block>
            </div>
          </div>
        </div>
      </article>

      <article id="physiotherapy" className="mx-auto max-w-5xl scroll-mt-24 px-5 py-8">
        <div className="overflow-hidden rounded-[2rem] bg-maroon-deep text-cream">
          <div className="editorial-split gap-0">
            <div className="p-7 sm:p-9">
              <p className="text-xs uppercase tracking-[0.16em] text-[#f1c982]">{t("physioKicker")}</p>
              <h2 className="mt-2 text-3xl text-cream">{t("physioTitle")}</h2>
              <p className="mt-4 leading-7 text-cream/80">{t("physioIntro")}</p>
              <SourceNote sourceIds={["clinic-presentation-2026", "clinic-garbhasanskar-guide-2026", "who-antenatal-care-2016"]} locale={locale} className="mt-3 text-sm leading-6 text-cream/85 [&_a]:text-[#f1c982] [&_span]:text-[#f1c982]" />
            </div>
            <figure className="relative min-h-72 overflow-hidden">
              <Image src="/photos/conversation-meeting-room.webp" alt={t("physioImageAlt")} fill sizes="(max-width: 767px) 100vw, 50vw" className="object-cover" />
              <figcaption className="absolute inset-x-4 bottom-4 rounded-xl bg-maroon-deep/95 p-3 text-xs text-cream/90">{t("roomPhotoCaption")}</figcaption>
            </figure>
          </div>
        </div>

        <div className="mt-6 grid gap-5">
          <section id="antenatal" className="service-chapter scroll-mt-24">
            <div className="chapter-heading"><HeartPulse className="h-6 w-6" aria-hidden /><div><p className="section-kicker">01</p><h2>{t("ancTitle")}</h2></div></div>
            <div className="chapter-grid">
              <div><BulletList items={t.raw("ancItems") as string[]} /><div className="notice-card mt-6"><h3>{t("safetyTitle")}</h3><p>{t("safetyBody")}</p></div></div>
              <div className="space-y-8"><Block title={t("exerciseTitle")}><p className="mb-3 leading-7">{t("exerciseIntro")}</p><BulletList items={t.raw("exerciseItems") as string[]} /><SourceNote sourceIds={["clinic-presentation-2026", "acog-exercise-during-pregnancy"]} locale={locale} /></Block><Block title={t("familyTitle")}><BulletList items={t.raw("familyItems") as string[]} /></Block><Block title={t("redFlagsTitle")}><BulletList items={t.raw("redFlags") as string[]} /></Block></div>
            </div>
          </section>

          <section id="labour" className="service-chapter scroll-mt-24">
            <div className="chapter-heading"><Baby className="h-6 w-6" aria-hidden /><div><p className="section-kicker">02</p><h2>{t("labourTitle")}</h2></div></div>
            <div className="chapter-grid"><BulletList items={t.raw("labourItems") as string[]} /><div><h3 className="text-xl text-maroon-deep">{t("labourPlansTitle")}</h3><BulletList items={labourPlans.map((item) => item.id === "presence" ? `${item.text} — ${inr(prices.labourPresence)}` : item.text)} /><SourceNote sourceIds={["clinic-presentation-2026"]} locale={locale} /></div></div>
          </section>

          <section id="lactation" className="service-chapter scroll-mt-24">
            <div className="chapter-heading"><Flower2 className="h-6 w-6" aria-hidden /><div><p className="section-kicker">03</p><h2>{t("lactationTitle")}</h2></div></div>
            <p className="max-w-3xl leading-7">{t("lactationIntro")}</p><div className="mt-5"><BulletList items={t.raw("lactationItems") as string[]} /></div>
          </section>

          <section id="postpartum" className="service-chapter scroll-mt-24">
            <div className="chapter-heading"><Stethoscope className="h-6 w-6" aria-hidden /><div><p className="section-kicker">04</p><h2>{t("postTitle")}</h2></div></div>
            <p className="max-w-3xl leading-7">{t("postIntro")}</p>
            <div className="chapter-grid mt-6"><BulletList items={t.raw("postItems") as string[]} /><div className="space-y-7"><div className="notice-card"><h3>{t("timingTitle")}</h3><p>{t("timingBody")}</p></div><Block title={t("neoTitle")}><BulletList items={neoItems.map((item) => item.id === "incision" ? `${item.text} — ${inr(prices.incisionExtra)}` : item.text)} /></Block><Block title={t("emotionTitle")}><p className="leading-7">{t("emotionBody")}</p></Block><SourceNote sourceIds={["clinic-presentation-2026", "clinic-garbhasanskar-guide-2026"]} locale={locale} /></div></div>
          </section>
        </div>
      </article>

      <article id="facilities" className="mx-auto max-w-5xl scroll-mt-24 px-5 py-8">
        <div className="panel rounded-[2rem] p-7 sm:p-9">
          <h2 className="section-title">{t("facilitiesTitle")}</h2>
          <div className="mt-7 grid gap-7 md:grid-cols-3"><Block title={t("modalitiesTitle")}><BulletList items={t.raw("modalities") as string[]} /></Block><Block title={t("toolsTitle")}><BulletList items={t.raw("tools") as string[]} /></Block><Block title={t("roomsTitle")}><BulletList items={t.raw("rooms") as string[]} /></Block></div>
          <SourceNote sourceIds={["clinic-presentation-2026"]} locale={locale} />
        </div>
      </article>

      <SourceList sectionIds={["services-ayurvedic-counselling", "services-antenatal-support", "services-exercise-context", "services-labour-support", "services-lactation-support", "services-postpartum-support", "services-facilities"]} locale={locale} title={t("sourceContextTitle")} intro={t("sourceContextIntro")} />
    </div>
  );
}
