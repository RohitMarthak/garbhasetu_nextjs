import { localizedUrl } from "@/lib/metadata";

export const dynamic = "force-static";

export function GET() {
  const siteUrl = localizedUrl("gu");
  const robots = [
    "User-Agent: *",
    "Allow: /",
    "",
    `Sitemap: ${new URL("/sitemap.xml", siteUrl)}`,
    "",
  ].join("\n");

  return new Response(robots, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
