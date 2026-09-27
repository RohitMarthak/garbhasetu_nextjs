import Image from "next/image";
import type { Metadata } from "next";
import {
  Activity,
  AlertCircle,
  ArrowRight,
  Baby,
  BookOpen,
  Brain,
  CheckCircle2,
  Flower2,
  HeartHandshake,
  HeartPulse,
  MapPin,
  MessageCircle,
  Phone,
  Radio,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Users,
} from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { AppointmentForm } from "@/components/AppointmentForm";
import { Clinics } from "@/components/Clinics";
import {
  MeditationIllustration,
  MusicIllustration,
  NutritionIllustration,
  SeedSoilIllustration,
} from "@/components/WellnessIllustrations";
import { createLocalizedMetadata, type Locale } from "@/lib/metadata";
import { inr, phones, prices } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  const metadata = createLocalizedMetadata({
    locale: locale as Locale,
    title: t("homeTitle"),
    description: t("homeDescription"),
  });
  return { ...metadata, title: { absolute: t("homeTitle") } };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("home");
  const s = await getTranslations("services");
  const p = await getTranslations("packages");
  const c = await getTranslations("contact");

  const problemPoints = t.raw("problemPoints") as {
    id: string;
    title: string;
    desc: string;
  }[];
  const whyNowPillars = t.raw("whyNowPillars") as {
    id: string;
    title: string;
    desc: string;
  }[];
  const examples = t.raw("examples") as string[];
  const parts = t.raw("equationParts") as string[];

  const physioPillars = s.raw("pillars") as {
    id: "antenatal" | "labour" | "lactation" | "postpartum";
    title: string;
    body: string;
  }[];
  const onlinePlans = p.raw("plans") as {
    id: string;
    title: string;
    detail: string;
  }[];
  const conditions = p.raw("conditions") as string[];

  return (
    <div className="flex flex-col pb-24">
      {/* ────────────────────────────────────────────────────────────
          SECTION 1: HERO STAGE (Ayurvedic & Clinical Harmony)
      ──────────────────────────────────────────────────────────── */}
      <section
        id="hero"
        className="relative -mt-16 sm:-mt-20 w-full overflow-hidden bg-gradient-to-b from-[#0A1F18] via-[#123329] to-[#174033] pt-28 pb-16 sm:pt-36 sm:pb-24 text-white border-b border-white/15"
      >
        {/* Luminous Warm Botanical Lighting */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 botanical-matrix-dark opacity-20"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 left-1/4 -translate-x-1/2 h-[600px] w-[900px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(217,138,44,0.22),rgba(18,51,41,0)_70%)] blur-[100px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-1/3 right-0 h-[450px] w-[450px] rounded-full bg-[radial-gradient(circle,rgba(21,60,51,0.4),transparent_70%)] blur-[90px]"
        />

        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
            {/* Left Column (7 cols): High-Impact Editorial Statement & Actions */}
            <div className="relative isolate flex flex-col justify-center text-center lg:text-left lg:col-span-7 hero-entrance">
              {/* Layer 1: Sacred Shloka & Discipline Eyebrow */}
              <div className="self-center lg:self-start section-label-dark">
                <span className="h-2 w-2 rounded-full bg-[#D98A2C] animate-pulse" />
                <span lang="sa" className="font-semibold text-white/95">{t("shloka")}</span>
                <span className="text-white/40">·</span>
                <span className="text-[#D98A2C] uppercase text-xs font-semibold tracking-wider">Ayurveda + Physiotherapy</span>
              </div>

              {/* Layer 2: Headline & Tagline */}
              <h1 className="mt-4 font-display text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.04]">
                GarbhaSetu
              </h1>

              <p className="mt-3 text-lg sm:text-xl font-medium text-[#D98A2C] tracking-tight">
                {t("tagline")}
              </p>

              {/* Layer 3: Short Subhead */}
              <p className="mt-4 max-w-xl text-sm sm:text-base leading-relaxed text-white/90 font-normal">
                {t("heroSubtitle")}
              </p>

              {/* Credentials & Location (Plain Text Hierarchy, High Contrast) */}
              <div className="mt-6 flex flex-wrap items-center justify-center lg:justify-start gap-x-3 gap-y-1.5 text-xs sm:text-sm text-white/90">
                <span className="font-semibold text-white">{t("jagrutName")}</span>
                <span className="text-white/40">·</span>
                <span className="font-semibold text-white">{t("richaName")}</span>
                <span className="text-white/40">·</span>
                <span className="inline-flex items-center gap-1 font-semibold text-[#D98A2C]">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>Palanpur, Gujarat</span>
                </span>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-3.5">
                <a
                  href="#pricing"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#9C511B] hover:bg-[#85400F] px-6 sm:px-7 py-3 text-sm font-semibold text-white border border-[#B3642B]/30 shadow-xs hover:shadow-sm active:translate-y-px transition-all duration-150 tracking-tight"
                >
                  <span>{t("ctaExplore")}</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/[0.06] px-5 sm:px-6 py-3 text-sm font-medium text-white/90 backdrop-blur-sm hover:border-white/35 hover:bg-white/10 active:translate-y-px transition-all duration-150 tracking-tight"
                >
                  <MessageCircle className="h-4 w-4 text-[#D98A2C]" />
                  <span>{t("ctaContact")}</span>
                </a>
              </div>
            </div>

            {/* Right Column (5 cols): Authentic Editorial Photography (Natural Framing) */}
            <div className="relative flex flex-col items-center justify-center lg:col-span-5">
              <div className="relative w-full max-w-md lg:max-w-none aspect-[4/3] sm:aspect-[16/13] lg:aspect-[4/3] overflow-hidden rounded-3xl border border-[#D98A2C]/30 bg-[#0A1F18] shadow-[0_24px_60px_rgba(0,0,0,0.45)]">
                <Image
                  src="/photos/hero-maternal-editorial.jpg"
                  alt="Ayurvedic Garbhasanskar and Prenatal Physiotherapy Care at GarbhaSetu, Palanpur"
                  fill
                  className="object-cover object-center transition-transform duration-700 hover:scale-[1.02]"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 480px"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0A1F18]/50 via-transparent to-black/10" />
                
                {/* Subtle Floating Verified Tag */}
                <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 flex items-center justify-between rounded-2xl bg-[#0A1F18]/85 backdrop-blur-md px-3.5 py-2 border border-white/15 text-white shadow-md">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="h-2 w-2 rounded-full bg-[#D98A2C]" />
                    <span className="font-semibold text-white/95">Science Meets Sanskar</span>
                  </div>
                  <span className="font-mono text-[10px] text-[#D98A2C] font-semibold">Palanpur, Gujarat</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Credentials Ticker Bar */}
        <div className="mt-14 border-t border-white/15 pt-6">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 text-center sm:text-left">
              <div className="border-l border-white/15 pl-4">
                <p className="font-mono text-[10px] uppercase tracking-wider text-[#D98A2C]">Integrative Care</p>
                <p className="mt-1 text-xs font-semibold text-white/95">Ayurveda + Clinical Physio</p>
              </div>
              <div className="border-l border-white/15 pl-4">
                <p className="font-mono text-[10px] uppercase tracking-wider text-[#D98A2C]">Specialists</p>
                <p className="mt-1 text-xs font-semibold text-white/95">BAMS + PT (ANC/PNC)</p>
              </div>
              <div className="border-l border-white/15 pl-4">
                <p className="font-mono text-[10px] uppercase tracking-wider text-[#D98A2C]">Locations</p>
                <p className="mt-1 text-xs font-semibold text-white/95">2 Clinics in Palanpur</p>
              </div>
              <div className="border-l border-white/15 pl-4">
                <p className="font-mono text-[10px] uppercase tracking-wider text-[#D98A2C]">Format</p>
                <p className="mt-1 text-xs font-semibold text-white/95">Offline & Online Guidance</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────
          SECTION 2: THE CHALLENGE & THE CONCEPT (#concept)
      ──────────────────────────────────────────────────────────── */}
      <section
        id="concept"
        className="relative mx-auto max-w-6xl scroll-mt-28 px-4 sm:px-6 lg:px-8 py-16 sm:py-24"
      >
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="section-label">
            <span>{t("problemKicker")}</span>
          </div>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[-0.03em] text-[#142621]">
            {t("problemTitle")}
          </h2>
          <p className="mt-3.5 text-base sm:text-lg text-[#445951] leading-relaxed">
            {t("problemLead")}
          </p>
        </div>

        {/* Comparison Architecture (Fragmented vs GarbhaSetu Integrated Care) */}
        <div className="mt-12 grid gap-8 lg:grid-cols-12 items-stretch">
          {/* Left Column: 4 Challenges */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-4">
            <div className="grid gap-3.5 sm:grid-cols-2">
              {problemPoints.map((point) => {
                const iconMap: Record<string, typeof Brain> = {
                  noise: Brain,
                  disconnect: Flower2,
                  physical: Activity,
                  partner: Users,
                };
                const IconComponent = iconMap[point.id] || Brain;

                return (
                  <article
                    key={point.id}
                    className="rounded-2xl border border-[#E6DFD1] bg-[#F4EFE4] p-5 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-[#153C33] shadow-xs border border-[#E6DFD1]">
                          <IconComponent className="h-4 w-4 stroke-[1.75]" />
                        </div>
                      </div>
                      <h3 className="mt-3 text-base font-bold text-[#142621]">
                        {point.title}
                      </h3>
                      <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-[#445951]">
                        {point.desc}
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Editorial Pullquote */}
            <blockquote className="rounded-2xl border-l-4 border-[#153C33] bg-white p-5 sm:p-6 border border-[#E6DFD1] shadow-xs">
              <p className="text-base sm:text-lg italic text-[#153C33] leading-relaxed font-serif">
                {t("problemQuote")}
              </p>
            </blockquote>
          </div>

          {/* Right Column: The Integrated Setu (Bridge) Solution */}
          <div className="lg:col-span-5 rounded-3xl border border-[#E6DFD1] bg-white p-6 sm:p-8 flex flex-col justify-between shadow-xs">
            <div>
              <div className="section-label">
                <span>THE GARBHASETU BRIDGE</span>
              </div>
              <h3 className="mt-2.5 text-2xl font-bold tracking-tight text-[#142621]">
                {t("definitionTitle")}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-[#445951]">
                {t("definitionBody")}
              </p>

              <div className="mt-5 rounded-2xl bg-[#153C33] p-5 text-white shadow-xs">
                <p lang="sa" className="text-base font-bold text-[#D98A2C]">
                  {t("quote")}
                </p>
                <p className="mt-1.5 text-xs leading-relaxed text-white/80">
                  {t("quoteMeaning")}
                </p>
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-[#E6DFD1]">
              <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#6E8078]">
                {t("examplesTitle")}
              </p>
              <div className="mt-2.5 flex flex-wrap gap-2">
                {examples.map((ex) => (
                  <span
                    key={ex}
                    className="rounded-full bg-[#FAF6EE] px-3 py-1 text-xs font-semibold border border-[#E6DFD1] text-[#142621]"
                  >
                    ✓ {ex}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Seed & Soil Philosophy Banner */}
        <div className="mt-8 rounded-3xl border border-[#E6DFD1] bg-white p-6 sm:p-8 shadow-xs">
          <div className="grid gap-6 md:grid-cols-12 items-center">
            <div className="md:col-span-7">
              <div className="section-label">
                <span>{t("metaphorKicker")}</span>
              </div>
              <h3 className="mt-2.5 text-xl sm:text-2xl font-bold text-[#142621]">
                {t("metaphorTitle")}
              </h3>
              <p className="mt-2 text-xs sm:text-sm leading-relaxed text-[#445951]">
                {t("metaphorBody")}
              </p>

              <div className="mt-4 rounded-2xl bg-[#F4EFE4] border border-[#E6DFD1] p-4">
                <p className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#153C33]">
                  {t("wholeTitle")}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-[#445951]">
                  {t("wholeBody")}
                </p>
              </div>
            </div>

            <div className="md:col-span-5 flex items-center justify-center p-2">
              <SeedSoilIllustration />
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────
          SECTION 3: WHY NOW? THE 9-MONTH WINDOW (#whynow)
      ──────────────────────────────────────────────────────────── */}
      <section
        id="whynow"
        className="mx-auto max-w-5xl scroll-mt-28 px-4 sm:px-6"
      >
        <div className="rounded-3xl border border-[#E6DFD1] bg-[#F4EFE4] p-7 sm:p-10 lg:p-12 shadow-xs">
          <div className="max-w-3xl">
            <div className="section-label">
              <span>{t("whyNowKicker")}</span>
            </div>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#142621]">
              {t("whyNowTitle")}
            </h2>
            <p className="mt-3 text-base text-[#445951] leading-relaxed">
              {t("whyNowLead")}
            </p>
          </div>

          <div className="mt-9 grid gap-4 sm:grid-cols-2">
            {whyNowPillars.map((item) => {
              const iconMap: Record<string, typeof Brain> = {
                brain: Brain,
                epigenetics: Flower2,
                labor: Activity,
                bonding: HeartHandshake,
              };
              const IconComponent = iconMap[item.id] || Sparkles;

              return (
                <div
                  key={item.id}
                  className="rounded-2xl border border-[#E6DFD1] bg-white p-5 sm:p-6 transition-all duration-200 hover:shadow-xs"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FAF6EE] text-[#153C33] border border-[#E6DFD1]">
                      <IconComponent className="h-4 w-4 stroke-[1.75]" />
                    </div>
                    <h3 className="text-base font-bold text-[#142621]">
                      {item.title}
                    </h3>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-[#445951]">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Formula Banner */}
          <div className="mt-8 rounded-2xl bg-white p-5 sm:p-6 border border-[#E6DFD1] shadow-xs">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-wider text-[#D98A2C]">
              {t("equationKicker")}
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
              {parts.map((part, index) => (
                <span key={part} className="flex items-center gap-2">
                  {index > 0 ? (
                    <span className="font-mono font-bold text-[#D98A2C]">+</span>
                  ) : null}
                  <span className="rounded-full bg-[#FAF6EE] px-3.5 py-1 text-xs font-semibold text-[#142621] border border-[#E6DFD1]">
                    {part}
                  </span>
                </span>
              ))}
              <span className="font-mono font-bold text-[#D98A2C]">=</span>
              <span className="font-semibold text-xs text-[#153C33] bg-[#E9F0EC] px-4 py-1.5 rounded-full border border-[#153C33]/15">
                {t("equationResult")}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────
          SECTION 4: SERVICES & ACTIVITIES SHOWCASE (#services)
      ──────────────────────────────────────────────────────────── */}
      <section
        id="services"
        className="mx-auto max-w-5xl scroll-mt-28 px-4 sm:px-6 mt-16 sm:mt-24"
      >
        <div className="text-center">
          <div className="section-label">
            <span>{s("kicker")}</span>
          </div>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#142621]">
            {s("title")}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base text-[#445951] leading-relaxed">
            {s("intro")}
          </p>
        </div>

        {/* ── PART A: AYURVEDIC GUIDANCE ── */}
        <div className="mt-12 rounded-3xl border border-[#E6DFD1] bg-white p-6 sm:p-10 shadow-xs">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E6DFD1] pb-6">
            <div>
              <div className="section-label">
                <span>{s("ayurvedaKicker")}</span>
              </div>
              <h3 className="mt-2 text-2xl font-bold tracking-tight text-[#142621]">
                {s("ayurvedaTitle")}
              </h3>
              <p className="mt-1 text-sm text-[#445951]">{s("ayurvedaIntro")}</p>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#FAF6EE] text-[#153C33] border border-[#E6DFD1]">
              <Flower2 className="h-6 w-6 stroke-[1.75]" />
            </div>
          </div>

          {/* Ayurvedic Cards Grid with Illustrations */}
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Card 1: Diet & Daily Routine */}
            <div className="rounded-2xl border border-[#E6DFD1] bg-[#FAF6EE] overflow-hidden flex flex-col transition-all hover:bg-white hover:shadow-xs">
              <div className="h-44 w-full bg-white">
                <NutritionIllustration />
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="text-base font-bold text-[#142621]">
                    {s("dietTitle")}
                  </h4>
                  <p className="mt-2 text-xs leading-relaxed text-[#445951]">
                    {s("dietBody")}
                  </p>
                </div>
                <p className="mt-4 font-mono text-[10px] font-semibold tracking-wider uppercase text-[#153C33]">
                  Ahara · Vihara · Ritucharya
                </p>
              </div>
            </div>

            {/* Card 2: Psychological & Spiritual Guidance */}
            <div className="rounded-2xl border border-[#E6DFD1] bg-[#FAF6EE] overflow-hidden flex flex-col transition-all hover:bg-white hover:shadow-xs">
              <div className="h-44 w-full bg-white">
                <MeditationIllustration />
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="text-base font-bold text-[#142621]">
                    {s("mindTitle")}
                  </h4>
                  <p className="mt-2 text-xs leading-relaxed text-[#445951]">
                    Swadhyay, monthly readings, Om chanting, and peaceful reflection.
                  </p>
                </div>
                <p className="mt-4 font-mono text-[10px] font-semibold tracking-wider uppercase text-[#153C33]">
                  Swadhyay · Dhyana · Pranayama
                </p>
              </div>
            </div>

            {/* Card 3: Garbha Sangeet */}
            <div className="rounded-2xl border border-[#E6DFD1] bg-[#FAF6EE] overflow-hidden flex flex-col transition-all hover:bg-white hover:shadow-xs">
              <div className="h-44 w-full bg-white">
                <MusicIllustration />
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="text-base font-bold text-[#142621]">
                    Garbha Sangeet & Sound
                  </h4>
                  <p className="mt-2 text-xs leading-relaxed text-[#445951]">
                    Jijabai na halarda, Krishna-theme wellness music, and acoustic harmonic relaxation.
                  </p>
                </div>
                <p className="mt-4 font-mono text-[10px] font-semibold tracking-wider uppercase text-[#153C33]">
                  Halarda · Sound · Relaxation
                </p>
              </div>
            </div>
          </div>

          {/* Garbha Samvad & WhatsApp Activities */}
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-[#E6DFD1] bg-[#FAF6EE] p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-[#153C33] border border-[#E6DFD1]">
                      <HeartHandshake className="h-4 w-4 stroke-[1.75]" />
                    </div>
                    <h4 className="text-base font-bold text-[#142621]">
                      {s("samvadTitle")}
                    </h4>
                  </div>
                  <span className="rounded-full bg-[#FBF3E7] px-3 py-1 text-[11px] font-semibold text-[#B56E1A] border border-[#E6DFD1]">
                    Couple Bonding
                  </span>
                </div>
                <p className="mt-3.5 text-xs leading-relaxed text-[#445951] sm:text-sm">
                  {s("samvadBody")}
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-[#E6DFD1] bg-[#FAF6EE] p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-[#153C33] border border-[#E6DFD1]">
                      <Radio className="h-4 w-4 stroke-[1.75]" />
                    </div>
                    <h4 className="text-base font-bold text-[#142621]">
                      {s("activitiesTitle")}
                    </h4>
                  </div>
                  <span className="rounded-full bg-[#E9F0EC] px-3 py-1 text-[11px] font-semibold text-[#153C33] border border-[#153C33]/15">
                    Daily Guidance
                  </span>
                </div>
                <p className="mt-3 text-xs leading-relaxed text-[#445951]">
                  {s("activitiesIntro")}
                </p>

                <div className="mt-4 grid gap-2 sm:grid-cols-2">
                  {(s.raw("activities") as string[]).map((act, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2.5 rounded-xl bg-white p-3 text-xs font-medium text-[#142621] border border-[#E6DFD1] shadow-2xs hover:border-[#153C33]/20 transition-all"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-[#153C33] shrink-0" />
                      <span className="leading-snug">{act}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Daily Journal Note */}
          <div className="mt-6 rounded-2xl bg-[#E9F0EC] p-5 sm:p-6 border border-[#153C33]/15">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-[#153C33] border border-[#153C33]/15">
                <BookOpen className="h-4 w-4 stroke-[1.75]" />
              </div>
              <div>
                <h4 className="text-base font-bold text-[#153C33]">{s("journalTitle")}</h4>
                <p className="text-[11px] text-[#445951] font-medium">Daily reflection & mindfulness tracking</p>
              </div>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-[#445951] sm:text-sm">
              {s("journalBody")}
            </p>
          </div>
        </div>

        {/* ── PART B: PHYSIOTHERAPY & CLINICAL CARE ── */}
        <div className="mt-10 rounded-3xl border border-[#E6DFD1] bg-white p-6 sm:p-10 shadow-xs">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E6DFD1] pb-6">
            <div>
              <div className="section-label">
                <span>{s("physioKicker")}</span>
              </div>
              <h3 className="mt-2 text-2xl font-bold tracking-tight text-[#142621]">
                {s("physioTitle")}
              </h3>
              <p className="mt-1 text-sm text-[#445951]">{s("physioIntro")}</p>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#FAF6EE] text-[#153C33] border border-[#E6DFD1]">
              <Stethoscope className="h-6 w-6 stroke-[1.75]" />
            </div>
          </div>

          {/* 4 Clinical Pillars Grid */}
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {physioPillars.map((pillar) => {
              const Icon = {
                antenatal: HeartPulse,
                labour: Baby,
                lactation: Flower2,
                postpartum: Activity,
              }[pillar.id];
              return (
                <div
                  key={pillar.id}
                  className="rounded-2xl border border-[#E6DFD1] bg-[#FAF6EE] p-5 flex flex-col justify-between transition-all hover:bg-white hover:shadow-xs"
                >
                  <div>
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-[#153C33] border border-[#E6DFD1]">
                      <Icon className="h-4 w-4 stroke-[1.75]" />
                    </div>
                    <h4 className="mt-3 text-base font-bold text-[#142621]">
                      {pillar.title}
                    </h4>
                    <p className="mt-1.5 text-xs leading-relaxed text-[#445951]">
                      {pillar.body}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Exercise & Lactation Guidance (Balanced Editorial Layout) */}
          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            {/* Safe Prenatal Movement */}
            <div className="rounded-3xl border border-[#E6DFD1] bg-white p-6 sm:p-8 flex flex-col justify-between shadow-xs">
              <div>
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#FAF6EE] text-[#153C33] border border-[#E6DFD1]">
                      <Activity className="h-5 w-5 stroke-[1.75]" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-[#142621]">
                        {s("exerciseTitle")}
                      </h4>
                      <p className="text-[11px] font-mono uppercase tracking-wider text-[#9C511B]">Trimester 1–3 Mobility & Strength</p>
                    </div>
                  </div>
                </div>

                <p className="mt-3.5 text-xs sm:text-sm leading-relaxed text-[#445951]">
                  {s("exerciseIntro")}
                </p>

                {/* 2-Column Scannable Grid */}
                <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
                  {(s.raw("exerciseItems") as string[]).map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 rounded-xl bg-[#FAF6EE] p-3 text-xs font-medium text-[#142621] border border-[#E6DFD1]/80 hover:bg-white hover:border-[#153C33]/20 transition-all"
                    >
                      <CheckCircle2 className="h-4 w-4 text-[#153C33] shrink-0 mt-0.5" />
                      <span className="leading-snug">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Postnatal Lactation Support */}
            <div className="rounded-3xl border border-[#E6DFD1] bg-white p-6 sm:p-8 flex flex-col justify-between shadow-xs">
              <div>
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#FAF6EE] text-[#153C33] border border-[#E6DFD1]">
                      <Baby className="h-5 w-5 stroke-[1.75]" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-[#142621]">
                        {s("lactationTitle")}
                      </h4>
                      <p className="text-[11px] font-mono uppercase tracking-wider text-[#153C33]">Postnatal Feeding & Comfort</p>
                    </div>
                  </div>
                </div>

                <p className="mt-3.5 text-xs sm:text-sm leading-relaxed text-[#445951]">
                  {s("lactationIntro")}
                </p>

                {/* 2-Column Scannable Grid */}
                <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
                  {(s.raw("lactationItems") as string[]).map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 rounded-xl bg-[#FAF6EE] p-3 text-xs font-medium text-[#142621] border border-[#E6DFD1]/80 hover:bg-white hover:border-[#153C33]/20 transition-all"
                    >
                      <CheckCircle2 className="h-4 w-4 text-[#153C33] shrink-0 mt-0.5" />
                      <span className="leading-snug">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Unified Clinical Safety & Red Flags Banner */}
          <div className="mt-8 grid gap-6 lg:grid-cols-12 items-stretch">
            {/* Left Column (7 cols): Clinical Safety Protocol */}
            <div className="lg:col-span-7 rounded-3xl border border-[#153C33]/15 bg-[#E9F0EC] p-6 sm:p-7 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-[#153C33] border border-[#153C33]/15 shadow-2xs">
                    <ShieldCheck className="h-5 w-5 stroke-[1.75]" />
                  </div>
                  <div>
                    <h4 className="text-base sm:text-lg font-bold text-[#153C33]">
                      {s("safetyTitle")}
                    </h4>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#445951]">Non-Invasive Maternal Standards</span>
                  </div>
                </div>

                <div className="mt-4 rounded-2xl bg-white p-5 border border-[#153C33]/10 shadow-2xs">
                  <p className="text-xs sm:text-sm leading-relaxed text-[#2D4238]">
                    {s("safetyBody")}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column (5 cols): Urgent Medical Red Flags */}
            <div className="lg:col-span-5 rounded-3xl border border-rose-200 bg-[#FFF5F5] p-6 sm:p-7 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-rose-100 text-rose-700 border border-rose-200 shadow-2xs">
                    <AlertCircle className="h-5 w-5 stroke-[1.75]" />
                  </span>
                  <div>
                    <h4 className="text-base sm:text-lg font-bold text-rose-950">
                      {s("redFlagsTitle")}
                    </h4>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-rose-700">Immediate Medical Attention</span>
                  </div>
                </div>

                <div className="mt-4 grid gap-2">
                  {(s.raw("redFlags") as string[]).map((flag, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2.5 rounded-xl bg-white px-3.5 py-2.5 text-xs font-medium text-rose-950 border border-rose-200/60 shadow-2xs"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-rose-600 shrink-0" />
                      <span className="leading-snug">{flag}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────
          SECTION 5: PACKAGES & PRICING (#pricing)
      ──────────────────────────────────────────────────────────── */}
      <section
        id="pricing"
        className="mx-auto max-w-5xl scroll-mt-28 px-4 sm:px-6 mt-16 sm:mt-24"
      >
        <div className="text-center">
          <div className="section-label">
            <span>{p("kicker")}</span>
          </div>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#142621]">
            {p("title")}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base text-[#445951] leading-relaxed">
            {p("intro")}
          </p>
        </div>

        {/* Master Offline Card */}
        <div className="mt-10 overflow-hidden rounded-3xl border-2 border-[#D98A2C]/30 bg-white shadow-md">
          <div className="bg-[#0E2923] p-6 text-white sm:flex sm:items-center sm:justify-between sm:p-8">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1 text-xs font-semibold text-[#D98A2C]">
                <Sparkles className="h-3.5 w-3.5 text-[#D98A2C]" />
                <span>Complete 9-Month Care</span>
              </div>
              <h3 className="mt-3 text-2xl sm:text-3xl font-bold text-white tracking-tight">
                {p("offlineTitle")}
              </h3>
              <p className="mt-1.5 text-sm text-white/80">
                {p("offlineSessions", { sessions: prices.offlineSessions })} ·{" "}
                {p("offlineRate", { amount: inr(prices.perSession) })}
              </p>
            </div>
            <div className="mt-5 sm:mt-0 text-left sm:text-right">
              <p className="text-xs line-through text-white/50">
                {inr(prices.offlineList)}
              </p>
              <p className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                {inr(prices.offlinePay)}
              </p>
              <span className="mt-1 inline-block rounded-full bg-[#D98A2C] px-3 py-0.5 text-xs font-bold text-white">
                {prices.discountPercent}% Discount
              </span>
            </div>
          </div>
          <div className="p-6 sm:p-8 bg-white flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs sm:text-sm text-[#445951] leading-relaxed">
              Complete offline Garbhasanskar and Physiotherapy journey in Palanpur with Dr. Jagrut Chauhan & Dr. Richa Madhu.
            </p>
            <a
              href="#contact"
              className="w-full sm:w-auto shrink-0 inline-flex items-center justify-center gap-2 rounded-full bg-[#153C33] px-6 py-3 text-xs font-semibold text-white hover:bg-[#0E2923] transition-all shadow-xs"
            >
              <span>Book Full Package</span>
            </a>
          </div>
        </div>

        {/* Online & Specialized Plans Grid */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {onlinePlans.map((plan) => (
            <div
              key={plan.id}
              className="rounded-2xl border border-[#E6DFD1] bg-white flex flex-col justify-between p-5 sm:p-6 shadow-xs hover:border-[#153C33]/20 transition-all"
            >
              <div>
                <h4 className="text-base font-bold text-[#142621]">
                  {plan.title}
                </h4>
                <p className="mt-2 text-xs leading-relaxed text-[#445951]">
                  {plan.detail}
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-[#E6DFD1] flex items-center justify-between">
                <span className="font-mono text-[11px] font-semibold text-[#153C33]">
                  Online & Offline
                </span>
                <a
                  href="#contact"
                  className="text-xs font-semibold text-[#B56E1A] hover:underline"
                >
                  Book Plan
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Physiotherapy Sessions */}
        <div className="mt-8 rounded-2xl border border-[#E6DFD1] bg-[#FAF6EE] p-6">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div>
              <h4 className="text-base font-bold text-[#142621]">
                {p("sessionTitle")}
              </h4>
              <p className="mt-1 text-xs text-[#445951]">
                {p("sessionBody", { amount: inr(prices.physioSession) })}
              </p>
            </div>
            <span className="mt-3 sm:mt-0 inline-block rounded-full bg-[#153C33] px-3.5 py-1 text-xs font-semibold text-white">
              {inr(prices.physioSession)} / session
            </span>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {conditions.map((cond) => (
              <span
                key={cond}
                className="rounded-full bg-white px-3 py-1 text-xs font-medium border border-[#E6DFD1] text-[#142621] shadow-2xs"
              >
                {cond}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────
          SECTION 6: CLINICS & FOUNDERS (#locations)
      ──────────────────────────────────────────────────────────── */}
      <section
        id="locations"
        className="mx-auto max-w-5xl scroll-mt-28 px-4 sm:px-6 mt-16 sm:mt-24"
      >
        <div className="text-center">
          <div className="section-label">
            <span>Palanpur Clinics</span>
          </div>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#142621]">
            {t("clinicsTitle")}
          </h2>
        </div>

        {/* Founders Cards */}
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <article className="rounded-2xl border border-[#E6DFD1] bg-white p-6 sm:p-7 flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex items-center gap-3.5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FAF6EE] text-[#153C33] border border-[#E6DFD1]">
                  <Sparkles className="h-5 w-5 stroke-[1.75]" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#142621]">
                    {t("jagrutName")}
                  </h3>
                  <p className="text-xs text-[#153C33] font-semibold">
                    Ayurveda & Garbhasanskar Specialist
                  </p>
                </div>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-[#445951]">
                {t("jagrutPlace")}
              </p>
            </div>
            
            <div className="mt-5 pt-4 border-t border-[#E6DFD1] flex items-center justify-between">
              <a
                href={`tel:${phones.jagrut.tel}`}
                className="flex items-center gap-2 text-xs font-semibold text-[#142621] hover:text-[#153C33] transition-colors"
              >
                <Phone className="h-3.5 w-3.5" />
                <span>{phones.jagrut.display}</span>
              </a>
              <a
                href={`https://wa.me/${phones.jagrut.wa}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-[#153C33] px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-[#0E2923] transition-colors shadow-2xs"
              >
                WhatsApp Chat
              </a>
            </div>
          </article>

          <article className="rounded-2xl border border-[#E6DFD1] bg-white p-6 sm:p-7 flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex items-center gap-3.5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FAF6EE] text-[#D98A2C] border border-[#E6DFD1]">
                  <Activity className="h-5 w-5 stroke-[1.75]" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#142621]">
                    {t("richaName")}
                  </h3>
                  <p className="text-xs text-[#B56E1A] font-semibold">
                    Physiotherapist (ANC & PNC Specialist)
                  </p>
                </div>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-[#445951]">
                {t("richaPlace")}
              </p>
            </div>
            
            <div className="mt-5 pt-4 border-t border-[#E6DFD1] flex items-center justify-between">
              <a
                href={`tel:${phones.richa.tel}`}
                className="flex items-center gap-2 text-xs font-semibold text-[#142621] hover:text-[#153C33] transition-colors"
              >
                <Phone className="h-3.5 w-3.5" />
                <span>{phones.richa.display}</span>
              </a>
              <a
                href={`https://wa.me/${phones.richa.wa}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-[#153C33] px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-[#0E2923] transition-colors shadow-2xs"
              >
                WhatsApp Chat
              </a>
            </div>
          </article>
        </div>

        {/* Interactive Google Map Embeds */}
        <div className="mt-8">
          <Clinics />
        </div>

        {/* TESTIMONIALS: awaiting real patient quotes — do not populate with generated content */}
      </section>

      {/* ────────────────────────────────────────────────────────────
          SECTION 7: INTERACTIVE WHATSAPP CONSULTATION (#contact)
      ──────────────────────────────────────────────────────────── */}
      <section
        id="contact"
        className="mx-auto max-w-5xl scroll-mt-28 px-4 sm:px-6 mt-16 sm:mt-24"
      >
        <div className="text-center">
          <div className="section-label">
            <span>{c("kicker")}</span>
          </div>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#142621]">
            {c("title")}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-base text-[#445951] leading-relaxed">
            {c("intro")}
          </p>
        </div>

        <div className="mt-8 max-w-3xl mx-auto">
          <AppointmentForm />
        </div>
      </section>
    </div>
  );
}

