import { getPublicContentSources, getPublicSourcesForSections, type ContentSourceCategory } from "@/lib/content";

type SourceListProps = {
  /** Use sourceIds for a deliberate page selection, or sectionIds to collect a route's approved citations. */
  sourceIds?: readonly string[];
  sectionIds?: readonly string[];
  id?: string;
  locale?: string;
  title?: string;
  className?: string;
};

const labels = {
  en: {
    title: "Sources and context",
    explanation: "These references identify clinic-provided information, cultural context, and general health guidance. Categories describe the kind of source; they are not approval badges.",
    category: {
      "clinic-material": "Clinic-provided information",
      "cultural-context": "Cultural context",
      "general-health-guidance": "General health guidance",
    },
    locator: "Relevant section",
    language: "Source language",
    accessed: "Accessed",
    return: "Back to sources",
  },
  gu: {
    title: "સ્ત્રોતો અને સંદર્ભ",
    explanation: "આ સંદર્ભો ક્લિનિક-આપેલી માહિતી, સાંસ્કૃતિક સંદર્ભ અને સામાન્ય આરોગ્ય માર્ગદર્શનને અલગ દર્શાવે છે. આ શ્રેણીઓ મંજૂરીના બેજ નથી.",
    category: {
      "clinic-material": "ક્લિનિક-આપેલી માહિતી",
      "cultural-context": "સાંસ્કૃતિક સંદર્ભ",
      "general-health-guidance": "સામાન્ય આરોગ્ય માર્ગદર્શન",
    },
    locator: "સંબંધિત વિભાગ",
    language: "સ્ત્રોતની ભાષા",
    accessed: "ઍક્સેસ તારીખ",
    return: "સ્ત્રોતો પર પાછા જાઓ",
  },
} as const;

/**
 * Server-rendered patient-facing bibliography. It never exposes internal files:
 * document-backed records render their title and verified locator without a link.
 */
export function SourceList({ sourceIds, sectionIds, id = "sources", locale = "en", title, className }: SourceListProps) {
  if (sourceIds && sectionIds) throw new Error("SourceList accepts sourceIds or sectionIds, not both.");
  if (!sourceIds && !sectionIds) throw new Error("SourceList needs an explicit sourceIds or sectionIds selection.");

  const text = labels[locale === "gu" ? "gu" : "en"];
  const sources = sourceIds ? getPublicContentSources(sourceIds) : getPublicSourcesForSections(sectionIds ?? []);

  if (!sources.length) return null;

  return (
    <aside id={id} className={className ?? "mx-auto max-w-5xl px-5 py-10"} aria-labelledby={`${id}-title`}>
      <h2 id={`${id}-title`} className="text-2xl text-maroon-deep">
        {title ?? text.title}
      </h2>
      <p className="mt-3 max-w-3xl leading-7 text-ink-soft">{text.explanation}</p>
      <ol className="mt-5 space-y-4">
        {sources.map((source) => (
          <li key={source.id} id={`${id}-source-${source.id}`} className="rounded-xl border border-line bg-paper p-4">
            <p className="text-xs font-medium uppercase tracking-[0.12em] text-saffron-deep">{text.category[source.category as ContentSourceCategory]}</p>
            <p className="mt-1 font-medium text-maroon-deep">
              {source.url ? (
                <a className="underline-offset-2 hover:underline" href={source.url} target="_blank" rel="noreferrer">
                  {source.title}
                </a>
              ) : (
                source.title
              )}
            </p>
            <p className="mt-1 text-sm text-ink-soft">{source.publisher}</p>
            <dl className="mt-3 space-y-1 text-sm leading-6 text-ink-soft">
              <div>
                <dt className="inline font-medium text-ink">{text.locator}: </dt>
                <dd className="inline">{source.locator}</dd>
              </div>
              <div>
                <dt className="inline font-medium text-ink">{text.language}: </dt>
                <dd className="inline">{source.language}</dd>
              </div>
              <div>
                <dt className="inline font-medium text-ink">{text.accessed}: </dt>
                <dd className="inline">{source.accessDate}</dd>
              </div>
            </dl>
          </li>
        ))}
      </ol>
      <a className="mt-5 inline-block text-sm text-maroon underline-offset-2 hover:underline" href={`#${id}-title`}>
        {text.return}
      </a>
    </aside>
  );
}
