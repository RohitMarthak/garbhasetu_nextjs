"use client";

import { FormEvent, useRef, useState } from "react";
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

const gujaratiDigits: Record<string, string> = {
  "૦": "0", "૧": "1", "૨": "2", "૩": "3", "૪": "4",
  "૫": "5", "૬": "6", "૭": "7", "૮": "8", "૯": "9",
};

export function normalizePhone(value: string) {
  return value.replace(/[૦-૯]/g, (digit) => gujaratiDigits[digit]).replace(/[^\d+]/g, "");
}

export function AppointmentForm() {
  const t = useTranslations("contact");
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [chatUrl, setChatUrl] = useState("");
  const [status, setStatus] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const phone = normalizePhone(String(data.get("phone") ?? "").trim());
    const need = String(data.get("need") ?? "");
    const place = String(data.get("place") ?? "");
    const message = String(data.get("message") ?? "").trim();
    const nextErrors: Partial<Record<Field, string>> = {};

    if (!name) nextErrors.name = t("errors.name");
    const phoneDigits = phone.replace(/\D/g, "");
    if (phoneDigits.length < 10 || phoneDigits.length > 15) nextErrors.phone = t("errors.phone");
    if (!needKeys.includes(need as (typeof needKeys)[number])) nextErrors.need = t("errors.need");
    if (!placeKeys.includes(place as (typeof placeKeys)[number])) nextErrors.place = t("errors.place");

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setChatUrl("");
      setStatus(t("errorSummary"));
      const firstField = Object.keys(nextErrors)[0];
      requestAnimationFrame(() => formRef.current?.querySelector<HTMLElement>(`[name="${firstField}"]`)?.focus());
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
    const opened = window.open(url, "_blank", "noopener,noreferrer");
    setStatus(opened ? t("opened") : t("blocked"));
  }

  const fieldClass =
    "mt-1 w-full rounded-xl border border-[#9f8b72] bg-paper px-3 py-2.5 text-ink outline-none ring-saffron-deep focus:ring-2";

  function onFormChange(event: React.ChangeEvent<HTMLFormElement>) {
    const field = (event.target as unknown as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement).name as Field;
    setChatUrl("");
    setStatus("");
    if (field) setErrors((current) => ({ ...current, [field]: undefined }));
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} onChange={onFormChange} noValidate className="panel rounded-2xl p-5 sm:p-6">
      <p className="mb-5 rounded-xl bg-cream px-4 py-3 text-sm leading-6 text-ink-soft">{t("privacyNotice")}</p>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          {t("name")} <span aria-hidden="true" className="text-maroon">*</span>
          <input name="name" autoComplete="name" required maxLength={80} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "name-error" : undefined} className={fieldClass} />
          {errors.name ? <span id="name-error" className="mt-1 block text-maroon">{errors.name}</span> : null}
        </label>
        <label className="block text-sm">
          {t("phone")} <span aria-hidden="true" className="text-maroon">*</span>
          <input name="phone" type="tel" autoComplete="tel" inputMode="tel" required maxLength={20} aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? "phone-error" : undefined} className={fieldClass} />
          {errors.phone ? <span id="phone-error" className="mt-1 block text-maroon">{errors.phone}</span> : null}
        </label>
        <label className="block text-sm">
          {t("need")} <span aria-hidden="true" className="text-maroon">*</span>
          <select name="need" defaultValue="" required aria-invalid={Boolean(errors.need)} aria-describedby={errors.need ? "need-error" : undefined} className={fieldClass}>
            <option value="" disabled>
              {t("needPlaceholder")}
            </option>
            {needKeys.map((key) => (
              <option key={key} value={key}>
                {t(`needs.${key}`)}
              </option>
            ))}
          </select>
          {errors.need ? <span id="need-error" className="mt-1 block text-maroon">{errors.need}</span> : null}
        </label>
        <label className="block text-sm">
          {t("place")} <span aria-hidden="true" className="text-maroon">*</span>
          <select name="place" defaultValue="" required aria-invalid={Boolean(errors.place)} aria-describedby={errors.place ? "place-error" : undefined} className={fieldClass}>
            <option value="" disabled>
              {t("placePlaceholder")}
            </option>
            {placeKeys.map((key) => (
              <option key={key} value={key}>
                {t(`places.${key}`)}
              </option>
            ))}
          </select>
          {errors.place ? <span id="place-error" className="mt-1 block text-maroon">{errors.place}</span> : null}
        </label>
      </div>
      <label className="mt-4 block text-sm">
        {t("message")} <span className="text-ink-soft">({t("messageOptional")})</span>
        <textarea name="message" rows={4} maxLength={400} className={fieldClass} />
      </label>
      <button
        type="submit"
        className="mt-5 rounded-full bg-maroon px-5 py-2.5 text-sm text-cream hover:bg-maroon-deep"
      >
        {t("submit")}
      </button>
      <p className="mt-4 text-sm leading-6 text-ink-soft" role="status" aria-live="polite">
        {status}{chatUrl ? (
          <>{" "}
          <a className="text-maroon underline-offset-2 hover:underline" href={chatUrl} target="_blank" rel="noopener noreferrer">
            {t("openedLink")}
          </a>
          </>
        ) : null}
      </p>
    </form>
  );
}
