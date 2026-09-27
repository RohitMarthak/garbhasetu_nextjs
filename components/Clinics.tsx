"use client";

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
    <div className="grid gap-6 md:grid-cols-2">
      {clinics.map((clinic) => (
        <article
          key={clinic.name}
          className="overflow-hidden rounded-2xl border border-[#E6DFD1] bg-white shadow-xs flex flex-col justify-between"
        >
          <div>
            <div className="relative h-60 overflow-hidden bg-[#E9F0EC]">
              <div className="absolute inset-0 grid place-items-center px-6 text-center text-sm text-[#153C33]">
                <span>
                  <MapPin className="mx-auto mb-2 h-6 w-6 text-[#D98A2C]" aria-hidden />
                  {t("mapPreview")}
                </span>
              </div>
              <iframe
                title={t("mapFrameTitle", { clinic: clinic.name })}
                src={mapEmbed(clinic.query)}
                className="absolute inset-0 h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className="p-6">
              <h3 className="flex items-start gap-2.5 text-base sm:text-lg font-bold text-[#142621]">
                <MapPin className="mt-1 h-4 w-4 shrink-0 text-[#D98A2C]" aria-hidden />
                <span>{clinic.name}</span>
              </h3>
              <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-[#445951]">{clinic.address}</p>
              <p className="mt-4 flex items-center gap-2 text-xs sm:text-sm font-medium">
                <Phone className="h-4 w-4 text-[#D98A2C]" aria-hidden />
                <a className="text-[#142621] hover:text-[#153C33] transition-colors" href={`tel:${clinic.phone.tel}`}>
                  {t("call")} {clinic.phone.display}
                </a>
              </p>
              <p className="mt-1 font-mono text-[11px] text-[#6E8078]">{clinic.person}</p>
            </div>
          </div>

          <div className="px-6 pb-6 pt-2">
            <a
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#153C33] hover:text-[#0E2923] transition-colors"
              href={mapsUrl(clinic.query)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>{t("map")}</span>
              <span>→</span>
            </a>
          </div>
        </article>
      ))}
    </div>
  );
}
