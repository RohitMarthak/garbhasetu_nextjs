import { getTranslations } from "next-intl/server";
import { getPublicContentSources, getPublicSourcesForSections, type ContentSourceCategory } from "@/lib/content";

type SourceListProps = {
  sourceIds?: readonly string[];
  sectionIds?: readonly string[];
  id?: string;
  locale?: string;
  title?: string;
  intro?: string;
  className?: string;
};

/** Server-rendered patient-facing bibliography. Internal document paths never render. */
export async function SourceList({ sourceIds, sectionIds, id = "sources", locale = "en", title, intro, className }: SourceListProps) {
  if (sourceIds && sectionIds) throw new Error("SourceList accepts sourceIds or sectionIds, not both.");
  if (!sourceIds && !sectionIds) throw new Error("SourceList needs an explicit sourceIds or sectionIds selection.");

  const t = await getTranslations({ locale, namespace: "sources" });
  const sources = sourceIds ? getPublicContentSources(sourceIds) : getPublicSourcesForSections(sectionIds ?? []);
  if (!sources.length) return null;

  const categoryLabel: Record<ContentSourceCategory, string> = {
    "clinic-material": t("clinicMaterial"),
    "cultural-context": t("culturalContext"),
    "general-health-guidance": t("generalHealth"),
  };

  return (
    <aside id={id} className={className ?? "mx-auto max-w-5xl px-5 py-10"} aria-labelledby={`${id}-title`}>
      <h2 id={`${id}-title`} className="scroll-mt-24 text-2xl text-maroon-deep">{title ?? t("title")}</h2>
      <p className="mt-3 max-w-3xl leading-7 text-ink-soft">{intro ?? t("explanation")}</p>
      <ol className="mt-5 space-y-4">
        {sources.map((source) => (
          <li key={source.id} id={`${id}-source-${source.id}`} className="scroll-mt-24 rounded-xl border border-line bg-paper p-4">
            <p className="text-xs font-medium uppercase tracking-[0.12em] text-saffron-deep">{categoryLabel[source.category]}</p>
            <p className="mt-1 font-medium text-maroon-deep">
              {source.url ? (
                <a className="underline-offset-2 hover:underline" href={source.url} target="_blank" rel="noreferrer">
                  {source.title} <span className="sr-only">({t("newTab")})</span>
                </a>
              ) : source.title}
            </p>
            <p className="mt-1 text-sm text-ink-soft">{source.publisher}</p>
            <dl className="mt-3 space-y-1 text-sm leading-6 text-ink-soft">
              <div><dt className="inline font-medium text-ink">{t("locator")}: </dt><dd className="inline">{source.locator}</dd></div>
              <div><dt className="inline font-medium text-ink">{t("language")}: </dt><dd className="inline">{source.language}</dd></div>
              <div><dt className="inline font-medium text-ink">{t("accessed")}: </dt><dd className="inline">{source.accessDate}</dd></div>
            </dl>
          </li>
        ))}
      </ol>
    </aside>
  );
}
