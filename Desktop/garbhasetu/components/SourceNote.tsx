import { getTranslations } from "next-intl/server";
import { getContentSource } from "@/lib/content";

type SourceNoteProps = {
  sourceIds: readonly string[];
  listId?: string;
  locale?: string;
  className?: string;
};

/** A compact, server-rendered link from a claim to its matching SourceList entry. */
export async function SourceNote({ sourceIds, listId = "sources", locale = "en", className }: SourceNoteProps) {
  const t = await getTranslations({ locale, namespace: "sources" });
  const sources = sourceIds.map(getContentSource);

  if (!sources.length) return null;
  if (sources.some((source) => !source.publicReference)) {
    throw new Error("SourceNote may reference only public source records.");
  }

  return (
    <p className={className ?? "mt-3 text-sm leading-6 text-ink-soft"}>
      <span className="font-medium text-maroon-deep">{t("prefix")}: </span>
      {sources.map((source, index) => (
        <span key={source.id}>
          {index > 0 ? "; " : null}
          <a className="text-maroon underline-offset-2 hover:underline" href={`#${listId}-source-${source.id}`} aria-label={`${t("details")}: ${source.title}`}>
            {source.publisher}
          </a>
        </span>
      ))}
    </p>
  );
}
