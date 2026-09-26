import { notFoundResponse } from "@/lib/not-found-response";

export async function GET(_request: Request, { params }: { params: Promise<{ locale: string }> }) {
  const { locale: requestedLocale } = await params;
  return notFoundResponse(requestedLocale === "en" ? "en" : "gu");
}
