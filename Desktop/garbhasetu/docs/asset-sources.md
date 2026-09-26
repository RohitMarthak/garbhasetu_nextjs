# Public asset source register

**Audit date:** 2026-09-26
**Scope:** every current public image under `public/brand` and `public/photos`.

## Evidence standard

This register records repository evidence only. All five files were introduced together in the repository’s initial commit (`63fdd21`, 2026-09-26). No source URL, creator name, license text, purchase record, release, or item-level attribution was found in the tracked files, commit message, filenames, or embedded asset metadata.

The original `footer.photos` copy made a broad Unsplash/Wikimedia claim without item-level evidence. The site now states only that sources are recorded in this register. That wording does not provide clearance for an asset.

The ICC/profile copyright strings found in some JPEGs identify colour-profile vendors, not the image creator or permission to use the image. Visual resemblance to a known image-hosting service is also not proof of a source or license.

**Rule:** Until a source record is supplied, the creator, original source, license, attribution requirement, and commercial-use permission for every entry below are **unknown**. Do not publish an inferred credit, remove a required credit, reuse the asset in other media, or treat the current footer claim as clearance.

## Current public assets

| Asset | Repository evidence | Current use | Creator / original source | License / attribution requirement | Governance status |
| --- | --- | --- | --- | --- | --- |
| `public/brand/logo.jpg` | JPEG, 1254 × 660; SHA-256 `4e170e71d206dabdb6aef093f82e4c7a246386041ef8fa9726b0625f264aee77`. It depicts the GarbhaSetu wordmark/illustration and matches the site’s visible brand treatment. No author/license metadata. | Social sharing image configured in `lib/metadata.ts`; no longer used as the home hero. | **Unknown.** No repository evidence establishes creator or ownership. | **Unknown.** No attribution can safely be invented; obtain written ownership or a license/credit instruction from the brand owner/designer. | **Brand clearance required.** Preserve the original file while obtaining the master logo and usage rights. |
| `public/brand/mark.png` | PNG, 428 × 464; SHA-256 `c592c35d3c377ada41f82a5fed61563a1972945d5b41fe6deb57e850ee90f996`. It is the standalone GarbhaSetu illustration. No author/license metadata. | Shared brand treatment in the home hero, header, and footer. | **Unknown.** No repository evidence identifies its designer, relationship to `logo.jpg`, or ownership. | **Unknown.** Obtain written brand-owner/designer permission and any derivative/attribution requirements before editing, tracing, recolouring, or distributing it. | **Brand clearance required.** |
| `public/photos/spices.jpg` | JPEG, 1400 × 933; SHA-256 `f019ec42ce88967cb9e5077e3683eb007dfe84de28ba8fdc63bc52e71ddd93ef`. No creator/source metadata; an embedded colour profile is not provenance. | Home diet card and services Ayurveda image. Alt/caption is diet and daily routine. | **Unknown.** The generic footer reference to Unsplash/Wikimedia does not identify this file’s source. | **Unknown.** Do not credit Unsplash, Wikimedia, or an author until the original item URL and applicable license are verified. | **Replace or document before release.** |
| `public/photos/meditation.jpg` | JPEG, 1400 × 1628; SHA-256 `2f2329bd16d9e03afdaa507c1d55a177d475b4d08ab2b4943aaad4ce86cc3a68`. No creator/source metadata; an embedded Adobe colour-profile copyright is not image copyright. | Home meditation, yoga, and prayer card. It is no longer used for clinical physiotherapy. | **Unknown.** No repository evidence establishes author, source, or permission. | **Unknown.** Obtain the original source and license/attribution terms, or replace with a cleared asset. | **Replace or document before release.** |
| `public/photos/lotus.jpg` | JPEG, 1280 × 1173; SHA-256 `95399f3b43ce72015f51a158f0fda8e51c62b3e38a2b8857c4144a144da76814`. No creator/source metadata; an embedded profile copyright is not image provenance. | Home Garbha Sangeet card. | **Unknown.** Do not infer Wikimedia provenance from the subject matter or footer’s general statement. | **Unknown.** Verify original URL, creator, license version, and required attribution before continuing use. | **Replace or document before release.** |

## Local font files

The application self-hosts Noto Sans Gujarati and Cormorant Garamond from Google Fonts. The files live in `app/fonts/` with their SIL Open Font License texts. Self-hosting prevents missing Gujarati glyphs and removes a runtime dependency on Google Fonts. The font files use the official `fonts.gstatic.com` URLs formerly returned by the Google Fonts CSS API.

## Required source record for each asset

The content owner should provide and retain these fields for every asset before release:

1. Asset path and SHA-256 (to bind the clearance to the exact file).
2. Original creator/rights holder and direct original source URL or internal asset identifier.
3. License or written permission, including commercial web use, modification, and sublicensing limits.
4. Required attribution text, URL, placement, and license version; record “none required” only when documented.
5. Model/property release status where relevant.
6. Approval owner, date, and replacement/expiry terms.

After verification, replace the generic `footer.photos` wording with only the exact, required per-asset attributions. If clearance cannot be produced, replace the photo with a separately documented licensed asset and preserve the original file only as a non-public reference until approval.
