"use client";

import { FormEvent, useState } from "react";
import { useTranslations } from "next-intl";
import { whatsappForNeed } from "@/lib/site";

const needKeys = [
  "antenatal",
  "labour",
  "lactation",
  "postpartum",
  "ayurveda",
  "incontinence",
  "vaginismus",
  "vaginalLaxity",
  "diastasis",
  "pivd",
  "prolapse",
  "incisionInfection",
  "posturalPain",
] as const;

const placeKeys = ["agnivesh", "sanidhi"] as const;

type Field = "name" | "phone" | "need" | "place";

export function AppointmentForm() {
  const t = useTranslations("contact");
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [chatUrl, setChatUrl] = useState("");

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const need = String(data.get("need") ?? "");
    const place = String(data.get("place") ?? "");
    const message = String(data.get("message") ?? "").trim();
    const nextErrors: Partial<Record<Field, string>> = {};

    if (!name) nextErrors.name = t("errors.name");
    if (phone.replace(/\D/g, "").length < 10) nextErrors.phone = t("errors.phone");
    if (!needKeys.includes(need as (typeof needKeys)[number])) nextErrors.need = t("errors.need");
    if (!placeKeys.includes(place as (typeof placeKeys)[number])) nextErrors.place = t("errors.place");

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setChatUrl("");
      return;
    }

    const needLabel = t(`needs.${need as (typeof needKeys)[number]}`);
    const placeLabel = t(`places.${place as (typeof placeKeys)[number]}`);
    const lines = [
      t("waPreviewTitle"),
      `${t("waName")}: ${name}`,
      `${t("waPhone")}: ${phone}`,
      `${t("waNeed")}: ${needLabel}`,
      `${t("waPlace")}: ${placeLabel}`,
    ];
    if (message) lines.push(`${t("waMessage")}: ${message}`);

    const doctor = whatsappForNeed(need);
    const url = `https://wa.me/${doctor.wa}?text=${encodeURIComponent(lines.join("\n"))}`;
    setChatUrl(url);
    window.open(url, "_blank", "noopener,noreferrer");
  }

  const fieldClass =
    "mt-1 w-full rounded-xl border border-line bg-paper px-3 py-2.5 text-ink outline-none ring-saffron focus:ring-2";

  return (
    <form onSubmit={onSubmit} noValidate className="panel rounded-2xl p-5 sm:p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          {t("name")}
          <input name="name" autoComplete="name" className={fieldClass} />
          {errors.name ? <span className="mt-1 block text-maroon">{errors.name}</span> : null}
        </label>
        <label className="block text-sm">
          {t("phone")}
          <input name="phone" type="tel" autoComplete="tel" inputMode="tel" className={fieldClass} />
          {errors.phone ? <span className="mt-1 block text-maroon">{errors.phone}</span> : null}
        </label>
        <label className="block text-sm">
          {t("need")}
          <select name="need" defaultValue="" className={fieldClass}>
            <option value="" disabled>
              {t("needPlaceholder")}
            </option>
            {needKeys.map((key) => (
              <option key={key} value={key}>
                {t(`needs.${key}`)}
              </option>
            ))}
          </select>
          {errors.need ? <span className="mt-1 block text-maroon">{errors.need}</span> : null}
        </label>
        <label className="block text-sm">
          {t("place")}
          <select name="place" defaultValue="" className={fieldClass}>
            <option value="" disabled>
              {t("placePlaceholder")}
            </option>
            {placeKeys.map((key) => (
              <option key={key} value={key}>
                {t(`places.${key}`)}
              </option>
            ))}
          </select>
          {errors.place ? <span className="mt-1 block text-maroon">{errors.place}</span> : null}
        </label>
      </div>
      <label className="mt-4 block text-sm">
        {t("message")} <span className="text-ink-soft">({t("messageOptional")})</span>
        <textarea name="message" rows={4} className={fieldClass} />
      </label>
      <button
        type="submit"
        className="mt-5 rounded-full bg-maroon px-5 py-2.5 text-sm text-cream hover:bg-maroon-deep"
      >
        {t("submit")}
      </button>
      {chatUrl ? (
        <p className="mt-4 text-sm leading-6 text-ink-soft">
          {t("opened")}{" "}
          <a className="text-maroon underline-offset-2 hover:underline" href={chatUrl} target="_blank" rel="noreferrer">
            {t("openedLink")}
          </a>
        </p>
      ) : null}
    </form>
  );
}
