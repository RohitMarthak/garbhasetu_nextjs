import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, BookOpen, HeartHandshake, Music2, NotebookPen, Sparkles } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Brand } from "@/components/Brand";
import { Clinics } from "@/components/Clinics";
import { SourceList } from "@/components/SourceList";
import { SourceNote } from "@/components/SourceNote";
import { Link } from "@/i18n/navigation";
import { createLocalizedMetadata, type Locale } from "@/lib/metadata";
import { phones } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };
type PracticeId = "reading" | "conversation" | "creative" | "journal";
type StageId = "antenatal" | "labour" | "lactation" | "postpartum";

const practiceMedia: Record<PracticeId, { src: string; kind: "photo" | "illustration" }> = {
  reading: { src: "/photos/reading-book-tea.webp", kind: "photo" },
  conversation: { src: "/illustrations/conversation-support.svg", kind: "illustration" },
  creative: { src: "/illustrations/reading-music.svg", kind: "illustration" },
  journal: { src: "/illustrations/journal-path.svg", kind: "illustration" },
};

const practiceIcons = { reading: BookOpen, conversation: HeartHandshake, creative: Music2, journal: NotebookPen };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  const metadata = createLocalizedMetadata({ locale: locale as Locale, title: t("homeTitle"), description: t("homeDescription") });
  return { ...metadata, title: { absolute: t("homeTitle") } };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");
  const examples = t.raw("examples") as string[];
  const practices = t.raw("practices") as { id: PracticeId; title: string; body: string; imageAlt: string }[];
  const stages = t.raw("stages") as { id: StageId; title: string; body: string }[];

  return (
    <>
      <section className="mx-auto max-w-5xl px-5 pb-10 pt-8 sm:pt-12">
        <div className="hero-grid calm-settle overflow-hidden rounded-[2rem] border border-line bg-paper shadow-[0_24px_70px_rgb(84_31_44/0.08)]">
          <div className="relative z-10 p-7 sm:p-10 lg:p-12">
            <Brand />
            <p className="mt-8 text-xs font-medium uppercase tracking-[0.16em] text-saffron-deep">{t("heroEyebrow")}</p>
            <h1 className="mt-3 max-w-xl font-display text-4xl leading-[1.05] text-maroon-deep sm:text-6xl">{t("heroTitle")}</h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-ink">{t("heroBody")}</p>
            <p lang="sa" className="mt-5 border-l-2 border-saffron pl-4 text-sm tracking-[0.15em] text-maroon">{t("shloka")}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/services" className="action-primary">{t("ctaServices")}<ArrowRight className="h-4 w-4" aria-hidden /></Link>
              <Link href="/contact" className="action-secondary">{t("ctaContact")}</Link>
            </div>
          </div>
          <figure className="hero-photo relative min-h-80 overflow-hidden sm:min-h-[34rem]">
            <Image src="/photos/hero-garden-path.webp" alt={t("heroImageAlt")} fill priority sizes="(max-width: 767px) 100vw, 44vw" className="object-cover" />
            <figcaption className="absolute inset-x-4 bottom-4 rounded-2xl bg-paper/95 p-3 text-xs leading-5 text-ink-soft shadow-lg backdrop-blur-sm">
              <span>{t("heroImageCaption")}</span>{" "}
              <a className="text-maroon underline" href="https://commons.wikimedia.org/wiki/File:Garden_path_Capel_Manor_College_Gardens_Enfield_London_England_01.jpg">{t("heroImageCredit")}</a>{" "}
              <a className="text-maroon underline" href="https://creativecommons.org/licenses/by-sa/4.0">{t("heroLicense")}</a> <span>{t("heroModified")}</span>
            </figcaption>
          </figure>
        </div>
      </section>

      <section id="understanding" className="mx-auto max-w-5xl scroll-mt-24 px-5 py-10">
        <div className="editorial-split items-start">
          <div>
            <p className="section-kicker">{t("traditionKicker")}</p>
            <h2 className="section-title">{t("traditionTitle")}</h2>
            <p className="mt-5 text-lg leading-8">{t("traditionBody")}</p>
            <SourceNote sourceIds={["clinic-presentation-2026", "clinic-garbhasanskar-guide-2026", "britannica-samskara-cultural-context-2026"]} locale={locale} />
          </div>
          <div className="space-y-4">
            <div className="panel rounded-3xl p-6">
              <p className="text-xs uppercase tracking-[0.14em] text-saffron-deep">{t("definitionKicker")}</p>
              <h3 className="mt-2 text-2xl text-maroon-deep">{t("definitionTitle")}</h3>
              <p className="mt-3 leading-7">{t("definitionBody")}</p>
              <blockquote className="mt-5 border-l-2 border-saffron pl-4">
                <p lang="sa" className="text-lg text-maroon-deep">{t("quote")}</p>
                <p className="mt-2 text-sm leading-6 text-ink-soft">{t("quoteMeaning")}</p>
              </blockquote>
            </div>
            <div className="rounded-3xl border border-leaf/30 bg-leaf/8 p-6">
              <h3 className="flex items-center gap-2 text-lg text-leaf"><Sparkles className="h-5 w-5" aria-hidden />{t("boundaryTitle")}</h3>
              <p className="mt-2 leading-7 text-ink-soft">{t("boundaryBody")}</p>
            </div>
          </div>
        </div>
        <div className="mt-8 rounded-3xl bg-cream-deep/50 p-6">
          <h3 className="text-lg text-maroon-deep">{t("examplesTitle")}</h3>
          <ul className="mt-3 grid gap-3 sm:grid-cols-3">{examples.map((example) => <li key={example} className="rounded-2xl bg-paper px-4 py-3">{example}</li>)}</ul>
        </div>
      </section>

      <section id="practices" className="story-band scroll-mt-24">
        <div className="mx-auto max-w-5xl px-5 py-14">
          <p className="section-kicker">{t("practicesKicker")}</p>
          <h2 className="section-title max-w-2xl">{t("practicesTitle")}</h2>
          <p className="mt-4 max-w-3xl leading-8 text-ink-soft">{t("practicesIntro")}</p>
          <SourceNote sourceIds={["clinic-presentation-2026", "clinic-garbhasanskar-guide-2026"]} locale={locale} />
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {practices.map((practice) => {
              const media = practiceMedia[practice.id];
              const Icon = practiceIcons[practice.id];
              return (
                <article key={practice.id} className="practice-card panel overflow-hidden rounded-3xl">
                  <div className={`relative ${media.kind === "photo" ? "h-56" : "grid h-48 place-items-center bg-cream-deep/55 p-8 text-maroon"}`}>
                    {media.kind === "photo" ? (
                      <Image src={media.src} alt={practice.imageAlt} fill sizes="(max-width: 640px) 100vw, 50vw" className="object-cover" />
                    ) : (
                      <Image src={media.src} alt="" width={240} height={180} unoptimized className="h-full w-auto" />
                    )}
                  </div>
                  <div className="p-6">
                    <span className="icon-wrap"><Icon className="h-5 w-5" aria-hidden /></span>
                    <h3 className="mt-3 text-xl text-maroon-deep">{practice.title}</h3>
                    <p className="mt-2 leading-7 text-ink-soft">{practice.body}</p>
                    {practice.id === "reading" ? <p className="mt-3 text-xs text-ink-soft">{t("readingPhotoCaption")}</p> : null}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="family-support" className="mx-auto max-w-5xl scroll-mt-24 px-5 py-14">
        <div className="editorial-split items-center">
          <div className="relative min-h-72 overflow-hidden rounded-3xl">
            <Image src="/photos/conversation-meeting-room.webp" alt={t("meetingRoomAlt")} fill sizes="(max-width: 767px) 100vw, 50vw" className="object-cover" />
            <p className="absolute inset-x-4 bottom-4 rounded-xl bg-paper/95 px-3 py-2 text-xs text-ink-soft">{t("roomPhotoCaption")}</p>
          </div>
          <div>
            <p className="section-kicker">{t("familyKicker")}</p>
            <h2 className="section-title">{t("familyTitle")}</h2>
            <p className="mt-4 text-lg leading-8">{t("familyBody")}</p>
            <SourceNote sourceIds={["clinic-presentation-2026", "clinic-garbhasanskar-guide-2026", "who-antenatal-care-2016"]} locale={locale} />
          </div>
        </div>
      </section>

      <section id="care-stages" className="bg-maroon-deep text-cream">
        <div className="mx-auto max-w-5xl px-5 py-14">
          <p className="text-xs uppercase tracking-[0.16em] text-[#f1c982]">{t("stagesKicker")}</p>
          <h2 className="mt-2 font-display text-4xl">{t("stagesTitle")}</h2>
          <p className="mt-4 max-w-2xl leading-7 text-cream/80">{t("stagesIntro")}</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stages.map((stage) => (
              <Link key={stage.id} href={`/services#${stage.id}`} className="stage-link rounded-2xl border border-cream/20 bg-cream/8 p-5">
                <h3 className="text-lg text-cream">{stage.title}</h3>
                <p className="mt-2 text-sm leading-6 text-cream/70">{stage.body}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm text-[#f1c982]">{t("learnMore")}<ArrowRight className="h-4 w-4" aria-hidden /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-14">
        <p className="section-kicker">{t("founderKicker")}</p>
        <h2 className="section-title">{t("foundersTitle")}</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <article className="panel rounded-2xl p-6"><h3 className="text-lg text-maroon-deep">{t("jagrutName")}</h3><p className="mt-1 text-sm text-ink-soft">{t("jagrutPlace")}</p><a className="mt-3 inline-block text-maroon underline-offset-2 hover:underline" href={`tel:${phones.jagrut.tel}`}>{phones.jagrut.display}</a></article>
          <article className="panel rounded-2xl p-6"><h3 className="text-lg text-maroon-deep">{t("richaName")}</h3><p className="mt-1 text-sm text-ink-soft">{t("richaPlace")}</p><a className="mt-3 inline-block text-maroon underline-offset-2 hover:underline" href={`tel:${phones.richa.tel}`}>{phones.richa.display}</a></article>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 pb-8"><h2 className="mb-4 text-2xl text-maroon-deep">{t("clinicsTitle")}</h2><Clinics /></section>

      <SourceList sectionIds={["home-garbha-sanskar-framing", "home-optional-practices", "home-family-support"]} locale={locale} title={t("sourceContextTitle")} intro={t("sourceContextIntro")} className="mx-auto max-w-5xl px-5 py-12" />
    </>
  );
}
