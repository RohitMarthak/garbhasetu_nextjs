# GarbhaSetu content audit

**Audit date:** 2026-09-26
**Scope:** the public Gujarati and English routes as currently implemented. This is a governance record, not clinical advice or an approval to publish a source claim.

## How to use this record

### Source labels

- **D** — `docs/details.md`. Its first 228 lines are a working transcription of presentation material; lines 229–329 are guide material. It also contains drafting material that is not patient content.
- **P** — `docs/GarbhaSetu_Presentation_.pdf` (32 pages).
- **G** — `docs/garbhsanskar_guide.pdf` (3 pages).

### Current-content labels

Both languages use the same key path in `messages/en.json` and `messages/gu.json`; a key in this record therefore means both translations are currently rendered.

| Public route | Current message namespace(s) | Main implementation |
| --- | --- | --- |
| `/` and `/en` | `home.*` | `app/[locale]/page.tsx`, `components/Clinics.tsx` |
| `/services` and `/en/services` | `services.*` | `app/[locale]/services/page.tsx` |
| `/packages` and `/en/packages` | `packages.*` | `app/[locale]/packages/page.tsx`, `lib/site.ts` |
| `/contact` and `/en/contact` | `contact.*`, `home.*` | `app/[locale]/contact/page.tsx`, `components/AppointmentForm.tsx`, `components/Clinics.tsx` |

### Statuses

| Status | Meaning |
| --- | --- |
| **covered** | A matching, public bilingual surface exists. “Covered” does **not** replace clinical or practitioner approval. |
| **correction needed** | The public wording, scope, or bilingual parity needs a change before the source can be treated as accurately represented. |
| **missing** | The source topic has no appropriate current public surface. |
| **conflicting** | Sources or current surfaces give incompatible facts; do not choose a value silently. |
| **intentionally excluded** | Deliberately not patient-facing. Do not reintroduce it without a documented approval. |

`PR-CLINICAL` marks a clinical statement that needs practitioner review before release or expansion. `PR-FEE` marks a fee that needs practitioner approval.

## Source-to-route coverage

This matrix groups related facts so each meaningful topic in all three source documents has a recorded public disposition.

| Source material | Current route and bilingual message coverage | Status and follow-up |
| --- | --- | --- |
| **Identity, Sanskrit blessing, founders, qualifications, telephone numbers, and clinic addresses** — P pp. 1–2; D 1–28 | Home: `home.shloka`, `tagline`, founder and clinic keys; telephone and map data in `lib/site.ts`; `Clinics` also appears on contact. | **covered.** Confirm spelling, qualifications, telephone ownership, clinic names, and map destinations with the practitioners before release. |
| **Garbha Sanskar definition, Sanskrit quote, crop analogy, and whole-person framing** — P pp. 3–5; D 34–41; G p. 1; D 229–238 | Home: `home.shloka`, `definition*`, `quote*`, `philosophy*`, `whole*`, `scienceBody`, `aspects*`. | **covered pending practitioner wording review.** The blessing is rendered as selectable text. Outcome-promising language was replaced with parent-wellbeing, informed-choice, and supportive-environment wording. The site now says these practices do not predict child traits or guarantee pregnancy or birth outcomes. |
| **Ayurvedic counselling; diet/routine; reading; prayer; meditation; yoga/pranayama; music; motivational/spiritual material; Garbha Samvad; daily WhatsApp activities** — P pp. 6–9; D 45–71; G pp. 1–2; D 240–266 | Services: `services.ayurveda*`, `counsel*`, `diet*`, `mind*`, `samvad*`, `activities*`. | **covered, PR-CLINICAL.** Reading, drawing, and reflection copy now uses optional parent-wellbeing language rather than promising child qualities, concentration, or creativity. Verify whether daily WhatsApp checking is an active operational service. |
| **Wellness journal, weight education, follow-up and task tracking** — P p. 15; D 106–110 | Services: `services.journal*`. | **covered, PR-CLINICAL.** Confirm the journal fields and whether medicine tracking is appropriate for this service. |
| **Physiotherapy scope and antenatal care:** psychological/physiological awareness, lifestyle, nutrition, rest, pain, posture/work/sitting adaptations, breathing, safe exercise, family education, and escalation/red flags — P pp. 10–15; D 73–110; G p. 2; D 268–290 | Services: `physio*`, `pillars`, `anc*`, `safety*`, `exercise*`, `family*`, and `redFlags*`. | **covered, PR-CLINICAL.** The red-flag list is more specific than the cited source; practitioner review must confirm it, escalation wording, and emergency handling. |
| **Antenatal electrical-modality restriction** — P p. 12; D 85–90 | Services: `services.safetyTitle`, `safetyBody`. | **covered, PR-CLINICAL.** It correctly distinguishes antenatal care from the separate postpartum equipment list, but needs the physiotherapist’s approval. |
| **Labour support:** support person, tactile stimulation/massage, breathing, pelvic-floor relaxation, positions/physio ball, TENS/massage, cooling pad, counselling, and paid presence — P pp. 16–17; D 112–127 | Services: `labour*`, `labourPlans*`; fee is from `prices.labourPresence`. Packages: labour plan cards. | **covered, PR-CLINICAL and PR-FEE.** Verify the safety, setting, clinician responsibility, and price for labour attendance. The source’s antenatal “no electrical modalities” statement must not be read as approval for TENS in every labour circumstance. |
| **Lactation support:** latch, positioning, posture, neck/thoracic discomfort, nipple/flat/inverted/cracked nipple guidance, breast massage, pump teaching, nutrition — P pp. 18–19; D 129–139; G p. 2; D 291–303 | Services: `lactation*`; packages: `packages.plans[2]`. | **covered, PR-CLINICAL.** Confirm scope and referral boundaries for nipple symptoms, pump, massage, and nutrition advice. |
| **Postpartum rehabilitation:** assessment, pelvic-floor education/exercise, breathing, mobility, pain, functional progression, diastasis, core, rehabilitation, Vonfidans, incontinence, vaginal laxity, strengthening, Caesarean scar/incision advice — P pp. 20–21; D 142–164; G p. 3; D 305–323 | Services: `post*`, `timing*`, `neo*`; packages: `conditions`, `extra*`. | **covered, PR-CLINICAL.** See the clinical-timing discrepancy below. Confirm that “Vonfidans” is the correct approved product name and that all named rehabilitation services are provided. |
| **Family guidance and postpartum emotional wellbeing / possible depression signs** — G p. 3; D 325–329; related P p. 14 | Services: `services.emotion*`; related `family*`. The footer and appointment form state that WhatsApp is not an emergency service. | **covered, PR-CLINICAL.** Confirm appropriate referral and emergency wording. The general notice does not replace a practitioner-approved emergency or referral process. |
| **Equipment and facilities:** postpartum TENS/therapeutic ultrasound; electrical stimulation for pelvic floor; Vonfidans; physio ball; 500 g–1 kg dumbbells/resistance bands; AC; speaker; yellow light; Sanidhi-only postpartum weight-reduction equipment — P pp. 22–24; D 166–182 | Services: `facilities*`, `modalities`, `tools`, `rooms`. | **covered, PR-CLINICAL.** The current text mostly preserves the antenatal/labour/postpartum distinctions, but availability, clinic location, indication, and supervision of each item require practitioner confirmation. See the equipment checklist. |
| **Offline package formula; online plans; incontinence; other physiotherapy conditions; Ayurveda treatment/medicine charges** — P pp. 25–32; D 183–226 | Packages: `packages.*`; numeric values in `lib/site.ts`; fee-linked service text in `services.labourPlans` and `services.neoItems`. | **conflicting, PR-FEE.** The displayed amounts are retained exactly as current public values but are **unverified pending practitioner approval**. See the pricing checklist. |
| **“Healthy mother + healthy environment + informed parents” equation** — P p. 28; D 206–207 | Home: `home.equation*`. | **covered.** Keep as educational positioning; do not extend it into a clinical outcome claim. |

## Discrepancy register

### Pricing — do not change current public prices without practitioner approval

All values below are currently public and **unverified pending practitioner approval**. A `covered` page is not evidence that the amount is approved.

| Item | Source evidence | Current public value/surface | Disposition required |
| --- | --- | --- | --- |
| Offline package | P p. 25; D 184–187: 72 × ₹200 = ₹14,400; ₹16,000 list price with 10% discount | ₹14,400 payable, 72 sessions at ₹200, ₹16,000 / 10% on `/packages` via `prices.offline*` | **PR-FEE — unverified.** Approve package scope, session count, list-price claim, and discount before publication. |
| ANC online | P p. 26; D 198 | ₹4,999 via `prices.anc`, `/packages` | **PR-FEE — unverified.** Source says twice weekly plus daily task. |
| ANC + PNC online | P p. 26; D 199 | ₹6,999 via `prices.ancPnc`, `/packages` | **PR-FEE — unverified.** Source calls this “PNC+ANC”; current names it “ANC and PNC.” |
| Lactation online | P p. 26; D 194 | ₹599 via `prices.lactation`, `/packages` | **PR-FEE — unverified.** Source says one online session. |
| Labour counselling online | P p. 26; D 196 | ₹499 via `prices.labourOnline`, `/packages` | **PR-FEE — unverified.** Source says one online session and also says counselling is included in a package; define which package. |
| Presence during labour | P p. 17; D 123–125 | ₹700 via `prices.labourPresence`, services and packages | **PR-FEE — unverified.** Confirm availability, boundaries, travel/location conditions, and tax/extra-charge wording. |
| Incontinence consultation | P p. 26 gives ₹300; later P content / D 214 gives ₹500; D 192 vs. 214 repeat the conflict | ₹500 via `prices.incontinenceConsult`, `/packages` | **conflicting, PR-FEE.** Do not select ₹300 or ₹500 as authoritative. Current ₹500 remains visible but unverified. |
| Incontinence session | P p. 26 and later material give ₹250; P p. 27 includes incontinence in a ₹300 physiotherapy-condition list; D 192, 201–202, 214–225 mirror both | ₹250 in the dedicated incontinence card. Incontinence is omitted from the ₹300 list to avoid publishing contradictory prices. | **conflicting, PR-FEE.** Resolve whether incontinence is a special ₹250 rate or belongs to the ₹300 list before changing either surface. |
| Incision infection | P p. 21 / D 163: ₹250 extra per session; P p. 27 / D 201–202 include it in ₹300 physiotherapy conditions | ₹250 extra via `prices.incisionExtra`. Incision infection is omitted from the ₹300 list to avoid publishing contradictory prices. | **conflicting, PR-FEE.** Define whether ₹250 is an add-on or an alternate session price. |
| Other physiotherapy conditions | P p. 27; D 201–202 | ₹300 per session via `prices.physioSession`, `/packages` | **PR-FEE — unverified.** Approve the complete condition list and referral/suitability policy. |
| Ayurveda treatment and medicines | P p. 27; D 204, 226 | “charged separately” at `packages.ayurvedaBody` | **covered, PR-FEE.** No amount is published; confirm the wording and whether it applies to all listed Ayurvedic care. |

### Clinical timing and safety

| Topic | Evidence and current treatment | Status / required decision |
| --- | --- | --- |
| Postpartum week bands | P p. 21 visually labels early **0–3 weeks** and **6–12 weeks**; D 145–157 transcribes them. G p. 3 and `services.timingBody` instead require individual physiotherapist assessment and reject a fixed 6/10-week rule. | **conflicting source; current treatment is correct to retain.** Keep the guide’s individualised timing. Do **not** publish the presentation bands as universal instructions. Practitioner review must decide whether narrowly qualified phase language is ever useful. |
| Antenatal, labour, and postpartum modalities | P pp. 12, 17, 22 separates no antenatal electrical modalities, labour TENS, and postpartum equipment; current services reflects those separate areas. | **covered, PR-CLINICAL.** Confirm indications, contraindications, supervision, and wording. Do not imply that a facility list is a recommendation for every patient. |
| Warning signs, lactation, mental wellbeing, scar/infection, pelvic floor | Current message keys introduce or expand patient-facing clinical detail across `services.redFlags`, `lactationItems`, `emotionBody`, `postItems`, and `neoItems`. | **PR-CLINICAL.** Review against local referral and emergency processes. Add a bilingual educational/individual-assessment/non-emergency-WhatsApp notice before release. |

### Package frequency and delivery mode

| Finding | Evidence | Current treatment | Status / correction |
| --- | --- | --- | --- |
| Twice-weekly sessions apply **only** to ANC and ANC + PNC | P p. 26; D 198–199; each respective package card says twice weekly plus daily task | `packages.plans[0]` and `[1]` are correct | **covered, PR-FEE.** Preserve this exact limitation. |
| Lactation and labour online are one session | P p. 26; D 194, 196; package cards say one session | Stable plan IDs preserve the one-session cards, and `packages.intro` limits recurring sessions to ANC and ANC + PNC. | **covered, PR-FEE.** Preserve this distinction. |
| Labour presence is an additional charge | P p. 17; D 123–125 | Separate presence card and services fee display | **covered, PR-FEE.** Confirm terms before publication. |
| Offline service delivery | P pp. 25–27; D 184–202 describes the offline package/conditions | `/packages` calls the main package and other physiotherapy sessions offline | **covered, PR-FEE.** Confirm which locations and services are actually available offline. |

### Equipment and facility checklist

| Source fact | Current coverage | Status / practitioner confirmation |
| --- | --- | --- |
| TENS and therapeutic ultrasound are for pain management after delivery | `services.modalities[0]` | **covered, PR-CLINICAL.** Confirm both equipment availability and postpartum-only wording. |
| Electrical stimulation for pelvic-floor training in postpartum incontinence, prolapse, and vaginal laxity | `services.modalities[1]` | **covered, PR-CLINICAL.** Confirm indication, privacy, supervision, and referral boundaries. |
| Vonfidans, physio ball, 500 g–1 kg dumbbells, resistance bands | `services.tools` | **covered, PR-CLINICAL.** Confirm spelling/product, ownership, availability, and use by stage of care. |
| AC, garbha-sangeet speaker, yellow meditation light | `services.rooms[0..1]` | **covered.** Confirm these facilities exist at the intended clinic(s). |
| Postpartum weight-reduction equipment only at Sanidhi | `services.rooms[2]` | **covered, PR-CLINICAL.** Confirm the clinic-specific limitation and ensure the wording does not promise an outcome. |

## Intentional exclusions and unsafe source material

| Source material | Public disposition | Reason |
| --- | --- | --- |
| Commission discussion — P p. 25; D 189 | **intentionally excluded** | Internal commercial drafting note; never patient content. |
| “Any advice/suggestions are appreciated” and “Thank you” drafting text — P p. 28; D 209–210 | **intentionally excluded** | Presentation closing text, not service information. |
| Reference-site URL and tracking parameters — D 332–334 | **intentionally excluded** | Internal reference only; not a GarbhaSetu endorsement, source, or patient link. |
| PDF illustrations and unnamed third-party material | **intentionally excluded** | No reuse without a separate verified license/provenance record. See `asset-sources.md`. |
| Claims that reading, activities, manifestation, Garbha Sanskar, or treatment will create desired child qualities, concentration/creativity, health, or delivery outcomes | **corrected pending practitioner wording review** | Current messages use parent-wellbeing, optional creative activity, informed-choice, and no-guarantee wording. Do not restore outcome promises. |
| Universal postpartum timetable | **intentionally excluded** as a universal instruction | The guide requires individual assessment; fixed presentation bands must not become blanket public advice. |

## Release gates

1. A named practitioner approves every public fee and resolves the three price conflicts (₹300/₹500 consultation, ₹250/₹300 incontinence session, and ₹250/₹300 incision-infection session).
2. **Implemented:** the online-plan frequency sentence now limits twice-weekly sessions to ANC and ANC + PNC and retains one-session lactation and labour wording.
3. A physiotherapist reviews all `PR-CLINICAL` items, including timing, modality distinctions, warning signs, lactation, postpartum, facilities, and referral/emergency wording.
4. **Implemented pending practitioner wording review:** bilingual footer and appointment-form notices state that content is educational, care needs individual assessment, and WhatsApp is not an emergency service.
5. **Implemented pending practitioner wording review:** outcome-promising language was replaced in both message files. Verify that the safer English and Gujarati wording matches practitioner intent.

## Static provenance register and citation rules

`lib/content-sources.json` is the repository-managed source register. Each stable source ID records its category, title, publisher/author, external URL or private internal-document path, verified locator, known publication/update date, access date, source language, verification status, and a short conservative statement of what the source actually supports. Unknown dates remain `null`; do not infer them. Evidence text is a short paraphrase, not a copied extract.

`lib/content-sections.json` maps each stable editorial section ID to a route and, where the current route has one, an existing fragment. It lists the shared English/Gujarati message keys, source IDs, claim category, limitations, publication status, and separate factual, cultural, clinical, and operational review states. Neither register contains a reviewer name or date until a real review has occurred. `lib/content.ts` validates the records and provides server-only lookup helpers.

### Patient-facing categories

The source components use the following explanatory categories. They identify the kind of material, **not** an approval badge or endorsement:

- **Clinic-provided information** — supplied GarbhaSetu documents describe the clinic's stated material. They do not independently prove availability, qualifications, price, safety, or efficacy.
- **Cultural context** — a cultural reference can explain a tradition. It is not medical evidence and must not be used to imply fetal-development, pregnancy, or birth outcomes.
- **General health guidance** — an external health reference supports only its stated general context. It does not validate Garbha Sanskar or prescribe a GarbhaSetu service.

Public source lists may show a source title, publisher, verified locator, language, and external URL when one exists. They must not link to raw repository documents, internal working notes, approval discussion, commercial notes, or unpublished PDFs. The register’s working-notes record is deliberately non-public.

### Initial registered sources

| Source ID | Category | Exact locator and recorded limit |
| --- | --- | --- |
| `clinic-presentation-2026` | Clinic-provided information | `GarbhaSetu_Presentation_.pdf`, physical pages 3–28 of the 32-page supplied file. Supports only the clinic’s stated framing, service topics, facilities, and package material. |
| `clinic-garbhasanskar-guide-2026` | Clinic-provided information | `garbhsanskar_guide.pdf`, physical pages 1–3. Its postpartum material supports individual assessment, not a universal timetable. |
| `clinic-details-working-notes-2026` | Clinic-provided information (internal only) | `details.md`, lines 1–329. Used as a cross-check; it includes drafts/conflicts and is never a public citation. |
| `who-antenatal-care-2016` | General health guidance | WHO, *WHO recommendations on antenatal care for a positive pregnancy experience*, guiding principles/person-centred-care overview: https://www.who.int/publications/i/item/9789241549912. It does not evaluate Garbha Sanskar or clinic services. |
| `acog-exercise-during-pregnancy` | General health guidance | ACOG, *Exercise During Pregnancy*, FAQ sections “Is exercise safe during pregnancy?” and “When should I not exercise during pregnancy?”: https://www.acog.org/womens-health/faqs/exercise-during-pregnancy. It is not a universal programme, dosage, or local emergency protocol. |
| `britannica-samskara-cultural-context-2026` | Cultural context | Encyclopaedia Britannica, *Samskara*, entry overview: https://www.britannica.com/topic/samskara-Hindu-passage-rite. It supports rites-of-passage context only, not medical efficacy. |

### Editing and publication gate

1. Use a stable semantic ID; never select citations by array position. Both language versions use the same section and source IDs, while their copy remains in `messages/en.json` and `messages/gu.json`.
2. Any material change to the cited source, locator, English copy, Gujarati copy, claim meaning, route, or limitation invalidates the related review state. Change the status to the appropriate pending state before publishing the revision.
3. A new factual or cultural addition may use `published` only with exact, verified source support and explicit limitations. A clinical addition additionally requires `clinical: practitioner-reviewed`; source verification alone is not clinical approval.
4. Existing public material uses `existing-pending-review` so the register documents the baseline without falsely upgrading it. New draft material stays `draft`; excluded material stays `excluded` and must not be selected by a public component.
5. A source note must use `SourceNote` and point to the matching same-page `SourceList` entry. Render only an explicit `sourceIds` or `sectionIds` selection. Keep the source-list explanation visible and keyboard-accessible; do not replace it with tiny superscripts, tooltips, or a modal.
6. Run `node --test test/content-sources.test.mjs` after register changes. The focused provenance test checks unique IDs, allowed HTTPS URLs, private document paths, source associations, message keys in both languages, real route fragments, and the no-bypass rule for newly published clinical content.

### Current section register disposition

| Section ID | Source selection | Publication/review disposition |
| --- | --- | --- |
| `home-garbha-sanskar-framing` | Clinic presentation, guide, Britannica | Existing public baseline; cultural source verified, operational wording pending review. |
| `home-optional-practices` | Clinic presentation and guide | Existing public baseline; optional-activity boundary retained. |
| `home-family-support` | Clinic presentation, guide, WHO | Existing public baseline; clinical context remains pending practitioner review. |
| `services-ayurvedic-counselling` | Clinic presentation and guide | Existing public baseline; clinical and operational claims pending review. |
| `services-antenatal-support` | Clinic presentation, guide, WHO | Existing public baseline; clinical/referral/equipment wording pending review. |
| `services-exercise-context` | Clinic presentation and ACOG | Existing public baseline; ACOG is general context only and clinical review remains pending. |
| `services-labour-support` | Clinic presentation | Existing public baseline; safety, availability, and fees remain pending review. |
| `services-lactation-and-postpartum` | Clinic presentation and guide | Existing public baseline; timing remains individualised and clinical review is pending. |
| `services-facilities` | Clinic presentation | Existing public baseline; availability and suitability remain pending review. |
| `packages-and-fees` | Clinic presentation | Existing public baseline; all prices/operations remain unverified as documented above. |
