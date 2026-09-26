import type { Metadata } from "next";
import Image from "next/image";
import { Flower2, HeartHandshake, Utensils } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Clinics } from "@/components/Clinics";
import { Link } from "@/i18n/navigation";
import { createLocalizedMetadata, type Locale } from "@/lib/metadata";
import { phones } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

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
  const aspects = t.raw("aspects") as { id: "nourishment" | "mind" | "bond"; title: string; body: string }[];
  const examples = t.raw("examples") as string[];
  const parts = t.raw("equationParts") as string[];

  return (
    <>
      <section className="mx-auto max-w-5xl px-5 pt-8 pb-8 sm:pt-12">
        <div className="hero-grid rise overflow-hidden rounded-[2rem] border border-line bg-paper shadow-[0_24px_70px_rgb(84_31_44/0.08)]">
          <div className="p-7 sm:p-10 lg:p-12">
            <p lang="sa" className="text-sm tracking-[0.15em] text-saffron-deep">{t("shloka")}</p>
            <h1 className="mt-5 font-display text-5xl leading-none text-maroon-deep sm:text-6xl">GarbhaSetu</h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-ink">{t("tagline")}</p>
            <p className="mt-6 text-sm uppercase tracking-[0.14em] text-maroon">{t("founderKicker")}</p>
            <p className="mt-1 text-sm text-ink-soft">{t("founderRole")}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/services" className="rounded-full bg-maroon px-5 py-3 text-sm text-cream hover:bg-maroon-deep">
                {t("ctaServices")}
              </Link>
              <Link href="/contact" className="rounded-full border border-maroon px-5 py-3 text-sm text-maroon hover:bg-cream-deep">
                {t("ctaContact")}
              </Link>
            </div>
          </div>
          <div className="hero-art relative grid min-h-72 place-items-center overflow-hidden p-8 sm:min-h-96">
            <span className="absolute inset-8 rounded-full border border-white/40" aria-hidden />
            <div className="relative h-64 w-60 overflow-hidden rounded-[40%] bg-paper/95 p-4 shadow-xl sm:h-80 sm:w-72">
              <Image src="/brand/mark.png" alt="" fill priority sizes="(max-width: 768px) 240px, 288px" className="object-contain p-3" />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-5xl gap-4 px-5 py-8 md:grid-cols-2">
        <article className="panel rounded-2xl p-6">
          <p className="text-xs uppercase tracking-[0.16em] text-saffron-deep">{t("definitionKicker")}</p>
          <h2 className="mt-2 text-2xl text-maroon-deep">{t("definitionTitle")}</h2>
          <p className="mt-3 leading-7">{t("definitionBody")}</p>
          <blockquote className="mt-4 border-l-2 border-saffron pl-4">
            <p className="text-lg text-maroon-deep">{t("quote")}</p>
            <p className="mt-2 text-sm leading-6 text-ink-soft">{t("quoteMeaning")}</p>
          </blockquote>
        </article>
        <article className="panel rounded-2xl p-6">
          <h2 className="text-2xl text-maroon-deep">{t("examplesTitle")}</h2>
          <ul className="mt-4 space-y-3">
            {examples.map((example) => (
              <li key={example} className="rounded-xl bg-cream px-4 py-3">
                {example}
              </li>
            ))}
          </ul>
        </article>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-6">
        <h2 className="text-2xl text-maroon-deep">{t("philosophyTitle")}</h2>
        <p className="mt-3 max-w-3xl leading-8">{t("philosophyBody")}</p>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-6">
        <h2 className="text-2xl text-maroon-deep">{t("wholeTitle")}</h2>
        <div className="mt-3 grid gap-4 md:grid-cols-2">
          <p className="leading-8">{t("wholeBody")}</p>
          <p className="leading-8">{t("scienceBody")}</p>
        </div>
        <h3 className="mt-8 text-xl text-maroon">{t("aspectsTitle")}</h3>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {aspects.map((aspect) => {
            const Icon = { nourishment: Utensils, mind: Flower2, bond: HeartHandshake }[aspect.id];
            return (
              <article key={aspect.id} className="lift panel rounded-2xl p-5">
                <span className="icon-wrap"><Icon className="h-5 w-5" aria-hidden /></span>
                <h4 className="mt-3 text-lg text-maroon-deep">{aspect.title}</h4>
                <p className="mt-2 text-sm leading-6 text-ink-soft">{aspect.body}</p>
              </article>
            );
          })}
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            { src: "/photos/spices.jpg", caption: t("photoDiet") },
            { src: "/photos/meditation.jpg", caption: t("photoMeditation") },
            { src: "/photos/lotus.jpg", caption: t("photoLotus") },
          ].map((photo) => (
            <figure key={photo.src} className="lift panel overflow-hidden rounded-2xl">
              <div className="relative h-52 overflow-hidden">
                <Image src={photo.src} alt={photo.caption} fill sizes="(max-width: 768px) 100vw, 33vw" className="photo-zoom object-cover" />
              </div>
              <figcaption className="px-4 py-3 text-sm text-maroon-deep">{photo.caption}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-10">
        <p className="text-xs uppercase tracking-[0.16em] text-saffron-deep">{t("equationKicker")}</p>
        <p className="mt-3 flex flex-wrap items-center gap-2 text-lg">
          {parts.map((part, index) => (
            <span key={part} className="flex items-center gap-2">
              {index > 0 ? <span className="text-saffron">+</span> : null}
              <span className="rounded-full bg-paper px-3 py-1">{part}</span>
            </span>
          ))}
          <span className="text-saffron">=</span>
          <span className="font-medium text-maroon-deep">{t("equationResult")}</span>
        </p>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-6">
        <h2 className="text-2xl text-maroon-deep">{t("foundersTitle")}</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <article className="panel rounded-2xl p-5">
            <h3 className="text-lg text-maroon-deep">{t("jagrutName")}</h3>
            <p className="mt-1 text-sm text-ink-soft">{t("jagrutPlace")}</p>
            <a className="mt-3 inline-block text-maroon underline-offset-2 hover:underline" href={`tel:${phones.jagrut.tel}`}>
              {phones.jagrut.display}
            </a>
          </article>
          <article className="panel rounded-2xl p-5">
            <h3 className="text-lg text-maroon-deep">{t("richaName")}</h3>
            <p className="mt-1 text-sm text-ink-soft">{t("richaPlace")}</p>
            <a className="mt-3 inline-block text-maroon underline-offset-2 hover:underline" href={`tel:${phones.richa.tel}`}>
              {phones.richa.display}
            </a>
          </article>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-8 pb-16">
        <h2 className="mb-4 text-2xl text-maroon-deep">{t("clinicsTitle")}</h2>
        <Clinics />
      </section>
    </>
  );
}
