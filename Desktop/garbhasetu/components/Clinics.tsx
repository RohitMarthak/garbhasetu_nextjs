import { MapPin, Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import { clinicMaps, mapEmbed, mapsUrl, phones } from "@/lib/site";

export function Clinics() {
  const t = useTranslations("home");

  const clinics = [
    {
      name: t("agniveshName"),
      address: t("agniveshAddress"),
      query: clinicMaps.agnivesh.query,
      phone: phones.jagrut,
      person: t("jagrutName"),
    },
    {
      name: t("sanidhiName"),
      address: t("sanidhiAddress"),
      query: clinicMaps.sanidhi.query,
      phone: phones.richa,
      person: t("richaName"),
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {clinics.map((clinic) => (
        <article key={clinic.name} className="lift panel overflow-hidden rounded-2xl">
          <div className="relative h-56 overflow-hidden bg-cream-deep">
            <div className="absolute inset-0 grid place-items-center px-6 text-center text-sm text-maroon-deep">
              <span><MapPin className="mx-auto mb-2 h-6 w-6 text-saffron" aria-hidden />{t("mapPreview")}</span>
            </div>
            <iframe
              title={t("mapFrameTitle", { clinic: clinic.name })}
              src={mapEmbed(clinic.query)}
              className="absolute inset-0 h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="p-5">
            <h3 className="flex items-start gap-2 text-lg font-medium text-maroon-deep">
              <MapPin className="mt-1 h-4 w-4 shrink-0 text-saffron" aria-hidden />
              {clinic.name}
            </h3>
            <p className="mt-2 text-sm leading-6 text-ink-soft">{clinic.address}</p>
            <p className="mt-4 flex items-center gap-2 text-sm">
              <Phone className="h-4 w-4 text-saffron" aria-hidden />
              <a className="text-maroon underline-offset-2 hover:underline" href={`tel:${clinic.phone.tel}`}>
                {t("call")} {clinic.phone.display}
              </a>
            </p>
            <p className="mt-1 text-sm text-ink-soft">{clinic.person}</p>
            <a
              className="mt-3 inline-block text-sm text-saffron-deep underline-offset-2 hover:underline"
              href={mapsUrl(clinic.query)}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("map")}
            </a>
          </div>
        </article>
      ))}
    </div>
  );
}
