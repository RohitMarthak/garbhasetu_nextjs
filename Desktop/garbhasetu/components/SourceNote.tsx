import { getContentSource } from "@/lib/content";

type SourceNoteProps = {
  sourceIds: readonly string[];
  listId?: string;
  locale?: string;
  className?: string;
};

const labels = {
  en: { prefix: "Source", returnToSources: "Read source details" },
  gu: { prefix: "સ્ત્રોત", returnToSources: "સ્ત્રોતની વિગતો વાંચો" },
} as const;

/**
 * A compact, server-rendered link from a claim to its matching SourceList entry.
 * Keep the source list on the same page and pass a shared listId when a route has
 * more than one list.
 */
export function SourceNote({ sourceIds, listId = "sources", locale = "en", className }: SourceNoteProps) {
  const sourceLabels = labels[locale === "gu" ? "gu" : "en"];
  const sources = sourceIds.map(getContentSource);

  if (!sources.length) return null;
  if (sources.some((source) => !source.publicReference)) {
    throw new Error("SourceNote may reference only public source records.");
  }

  return (
    <p className={className ?? "mt-3 text-sm leading-6 text-ink-soft"}>
      <span className="font-medium text-maroon-deep">{sourceLabels.prefix}: </span>
      {sources.map((source, index) => (
        <span key={source.id}>
          {index > 0 ? "; " : null}
          <a className="text-maroon underline-offset-2 hover:underline" href={`#${listId}-source-${source.id}`} aria-label={`${sourceLabels.returnToSources}: ${source.title}`}>
            {source.publisher}
          </a>
        </span>
      ))}
    </p>
  );
}
