import "server-only";
import sourceRecords from "./content-sources.json";
import sectionRecords from "./content-sections.json";

export const contentSourceCategories = ["clinic-material", "cultural-context", "general-health-guidance"] as const;
export type ContentSourceCategory = (typeof contentSourceCategories)[number];

export const sourceVerificationStatuses = ["verified", "pending-verification"] as const;
export type SourceVerificationStatus = (typeof sourceVerificationStatuses)[number];

export const claimCategories = ["factual", "cultural", "clinical", "operational"] as const;
export type ClaimCategory = (typeof claimCategories)[number];

export const publicationStatuses = ["existing-pending-review", "published", "draft", "excluded"] as const;
export type PublicationStatus = (typeof publicationStatuses)[number];

export const reviewStates = ["not-applicable", "pending-review", "pending-practitioner-review", "verified-source", "practitioner-reviewed"] as const;
export type ReviewState = (typeof reviewStates)[number];

export type ContentSource = {
  id: string;
  category: ContentSourceCategory;
  title: string;
  publisher: string;
  documentPath: string | null;
  url: string | null;
  locator: string;
  publicationDate: string | null;
  accessDate: string;
  language: string;
  verificationStatus: SourceVerificationStatus;
  publicReference: boolean;
  evidence: string;
};

export type ContentReview = Record<ClaimCategory, ReviewState>;

export type ContentSection = {
  id: string;
  route: "/" | "/services" | "/packages" | "/contact";
  fragment: string | null;
  messageKeys: string[];
  sourceIds: string[];
  claimCategory: ClaimCategory;
  limitations: string;
  publicationStatus: PublicationStatus;
  review: ContentReview;
};

export type ContentValidationIssue = { record: string; message: string };

export const contentSources = sourceRecords as ContentSource[];
export const contentSections = sectionRecords as ContentSection[];

const sourceById = new Map(contentSources.map((source) => [source.id, source]));
const sectionById = new Map(contentSections.map((section) => [section.id, section]));

function duplicateIds(records: { id: string }[]) {
  const seen = new Set<string>();
  return records.flatMap(({ id }) => {
    if (seen.has(id)) return [id];
    seen.add(id);
    return [];
  });
}

function isAllowed<T extends readonly string[]>(values: T, value: string): value is T[number] {
  return (values as readonly string[]).includes(value);
}

export function validateContentRegisters(): ContentValidationIssue[] {
  const issues: ContentValidationIssue[] = [];

  for (const id of duplicateIds(contentSources)) issues.push({ record: id, message: "Duplicate source ID." });
  for (const id of duplicateIds(contentSections)) issues.push({ record: id, message: "Duplicate section ID." });

  for (const source of contentSources) {
    if (!source.id || !source.title || !source.publisher || !source.locator || !source.accessDate || !source.evidence) {
      issues.push({ record: source.id || "source", message: "Source records require identity, locator, access date, and evidence." });
    }
    if (!isAllowed(contentSourceCategories, source.category)) {
      issues.push({ record: source.id, message: "Unknown source category." });
    }
    if (!isAllowed(sourceVerificationStatuses, source.verificationStatus)) {
      issues.push({ record: source.id, message: "Unknown verification status." });
    }
    if (source.url && !source.url.startsWith("https://")) {
      issues.push({ record: source.id, message: "Public source URLs must use HTTPS." });
    }
    if (source.documentPath && !source.documentPath.startsWith("docs/")) {
      issues.push({ record: source.id, message: "Internal document paths must remain under docs/." });
    }
    if (!source.url && !source.documentPath) {
      issues.push({ record: source.id, message: "A source requires either an external URL or an internal document path." });
    }
  }

  for (const section of contentSections) {
    if (!section.id || !section.route || !section.messageKeys.length || !section.sourceIds.length || !section.limitations) {
      issues.push({ record: section.id || "section", message: "Sections require route, message keys, sources, and limitations." });
    }
    if (!isAllowed(claimCategories, section.claimCategory)) {
      issues.push({ record: section.id, message: "Unknown claim category." });
    }
    if (!isAllowed(publicationStatuses, section.publicationStatus)) {
      issues.push({ record: section.id, message: "Unknown publication status." });
    }
    if (section.fragment !== null && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(section.fragment)) {
      issues.push({ record: section.id, message: "Fragments must be stable kebab-case IDs." });
    }
    for (const sourceId of section.sourceIds) {
      if (!sourceById.has(sourceId)) issues.push({ record: section.id, message: `Unknown source ID: ${sourceId}.` });
    }
    for (const category of claimCategories) {
      const state = section.review[category];
      if (!isAllowed(reviewStates, state)) {
        issues.push({ record: section.id, message: `Unknown ${category} review state.` });
      }
    }
    if (section.publicationStatus === "published") {
      const hasVerifiedSources = section.sourceIds.every((sourceId) => sourceById.get(sourceId)?.verificationStatus === "verified");
      if (!hasVerifiedSources) issues.push({ record: section.id, message: "Published new content requires verified sources." });
      if (section.claimCategory === "clinical" && section.review.clinical !== "practitioner-reviewed") {
        issues.push({ record: section.id, message: "Published new clinical content requires practitioner review." });
      }
    }
  }

  return issues;
}

export function assertContentRegisters() {
  const issues = validateContentRegisters();
  if (issues.length) {
    throw new Error(`Invalid content register:\n${issues.map(({ record, message }) => `- ${record}: ${message}`).join("\n")}`);
  }
}

assertContentRegisters();

export function getContentSource(sourceId: string): ContentSource {
  const source = sourceById.get(sourceId);
  if (!source) throw new Error(`Unknown content source: ${sourceId}`);
  return source;
}

export function getContentSection(sectionId: string): ContentSection {
  const section = sectionById.get(sectionId);
  if (!section) throw new Error(`Unknown content section: ${sectionId}`);
  return section;
}

/** Returns only citations suitable for patient-facing source lists. */
export function getPublicContentSources(sourceIds: readonly string[]): ContentSource[] {
  return sourceIds.map(getContentSource).filter((source) => source.publicReference);
}

/** Resolves a deliberate, approved page-level source selection from stable section IDs. */
export function getPublicSourcesForSections(sectionIds: readonly string[]): ContentSource[] {
  const sections = sectionIds.map(getContentSection);
  const nonPublic = sections.filter(({ publicationStatus }) => publicationStatus === "draft" || publicationStatus === "excluded");
  if (nonPublic.length) {
    throw new Error(`Draft or excluded sections cannot be rendered: ${nonPublic.map(({ id }) => id).join(", ")}`);
  }

  const ids = [...new Set(sections.flatMap(({ sourceIds }) => sourceIds))];
  return getPublicContentSources(ids);
}
