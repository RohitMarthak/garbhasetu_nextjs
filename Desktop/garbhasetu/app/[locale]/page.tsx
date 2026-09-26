import type { Metadata } from "next";
import { Flower2, HeartHandshake, Utensils } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Clinics } from "@/components/Clinics";
import { Link } from "@/i18n/navigation";
import { phones } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: { absolute: t("homeTitle") },
    description: t("homeDescription"),
    alternates: { languages: { gu: "/", en: "/en" } },
  };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");
  const aspects = t.raw("aspects") as { title: string; body: string }[];
  const examples = t.raw("examples") as string[];
  const parts = t.raw("equationParts") as string[];

  return (
    <>
      <section className="mx-auto max-w-5xl px-5 pt-8 pb-6">
        <div className="rise overflow-hidden rounded-3xl bg-white shadow-sm">
          <img src="/brand/logo.jpg" alt={t("tagline")} className="w-full" />
        </div>
        <h1 className="rise rise-2 mt-6 font-display text-4xl text-maroon-deep sm:text-5xl">GarbhaSetu</h1>
        <p className="mt-3 max-w-xl text-lg leading-8 text-ink">{t("tagline")}</p>
        <p className="mt-5 text-sm uppercase tracking-[0.14em] text-ink-soft">{t("founderKicker")}</p>
        <p className="mt-1 text-ink-soft">{t("founderRole")}</p>
        <div className="rise rise-3 mt-8 flex flex-wrap gap-3">
          <Link href="/services" className="rounded-full bg-maroon px-5 py-2.5 text-sm text-cream hover:bg-maroon-deep">
            {t("ctaServices")}
          </Link>
          <Link
            href="/contact"
            className="rounded-full border border-maroon px-5 py-2.5 text-sm text-maroon hover:bg-cream-deep"
          >
            {t("ctaContact")}
          </Link>
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
          {aspects.map((aspect, index) => {
            const Icon = [Utensils, Flower2, HeartHandshake][index] ?? Flower2;
            return (
              <article key={aspect.title} className="lift panel rounded-2xl p-5">
                <Icon className="h-6 w-6 text-saffron" aria-hidden />
                <h4 className="mt-3 text-lg text-maroon-deep">{aspect.title}</h4>
                <p className="mt-2 text-sm leading-6 text-ink-soft">{aspect.body}</p>
              </article>
            );
          })}
        </div>
        <div className="reveal mt-8 grid gap-4 md:grid-cols-3">
          {[
            { src: "/photos/spices.jpg", caption: t("photoDiet") },
            { src: "/photos/meditation.jpg", caption: t("photoMeditation") },
            { src: "/photos/lotus.jpg", caption: t("photoLotus") },
          ].map((photo) => (
            <figure key={photo.src} className="lift panel overflow-hidden rounded-2xl">
              <img src={photo.src} alt={photo.caption} className="photo-zoom h-52 w-full object-cover" />
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
