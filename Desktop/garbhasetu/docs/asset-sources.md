# Public asset source register

**Audit date:** 2026-09-26
**Scope:** every public image currently under `public/brand` and `public/photos`, plus the original vectors under `public/illustrations`. Existing unknown-provenance assets remain documented below; cleared editorial derivatives and original motifs have their own dated records.

## Evidence standard

This register records repository evidence only. All five files were introduced together in the repository’s initial commit (`63fdd21`, 2026-09-26). No source URL, creator name, license text, purchase record, release, or item-level attribution was found in the tracked files, commit message, filenames, or embedded asset metadata.

The original `footer.photos` copy made a broad Unsplash/Wikimedia claim without item-level evidence. The site now states only that sources are recorded in this register. That wording does not provide clearance for an asset.

The ICC/profile copyright strings found in some JPEGs identify colour-profile vendors, not the image creator or permission to use the image. Visual resemblance to a known image-hosting service is also not proof of a source or license.

**Rule:** Until a source record is supplied, the creator, original source, license, attribution requirement, and commercial-use permission for every entry below are **unknown**. Do not publish an inferred credit, remove a required credit, reuse the asset in other media, or treat the current footer claim as clearance.

## Existing public assets with unresolved provenance

| Asset | Repository evidence | Current use | Creator / original source | License / attribution requirement | Governance status |
| --- | --- | --- | --- | --- | --- |
| `public/brand/logo.jpg` | JPEG, 1254 × 660; SHA-256 `4e170e71d206dabdb6aef093f82e4c7a246386041ef8fa9726b0625f264aee77`. It depicts the GarbhaSetu wordmark/illustration and matches the site’s visible brand treatment. No author/license metadata. | Social sharing image configured in `lib/metadata.ts`; no longer used as the home hero. | **Unknown.** No repository evidence establishes creator or ownership. | **Unknown.** No attribution can safely be invented; obtain written ownership or a license/credit instruction from the brand owner/designer. | **Brand clearance required.** Preserve the original file while obtaining the master logo and usage rights. |
| `public/brand/mark.png` | PNG, 428 × 464; SHA-256 `c592c35d3c377ada41f82a5fed61563a1972945d5b41fe6deb57e850ee90f996`. It is the standalone GarbhaSetu illustration. No author/license metadata. | Shared brand treatment in the home hero, header, and footer. | **Unknown.** No repository evidence identifies its designer, relationship to `logo.jpg`, or ownership. | **Unknown.** Obtain written brand-owner/designer permission and any derivative/attribution requirements before editing, tracing, recolouring, or distributing it. | **Brand clearance required.** |
| `public/photos/spices.jpg` | JPEG, 1400 × 933; SHA-256 `f019ec42ce88967cb9e5077e3683eb007dfe84de28ba8fdc63bc52e71ddd93ef`. No creator/source metadata; an embedded colour profile is not provenance. | Home diet card and services Ayurveda image. Alt/caption is diet and daily routine. | **Unknown.** The generic footer reference to Unsplash/Wikimedia does not identify this file’s source. | **Unknown.** Do not credit Unsplash, Wikimedia, or an author until the original item URL and applicable license are verified. | **Replace or document before release.** |
| `public/photos/meditation.jpg` | JPEG, 1400 × 1628; SHA-256 `2f2329bd16d9e03afdaa507c1d55a177d475b4d08ab2b4943aaad4ce86cc3a68`. No creator/source metadata; an embedded Adobe colour-profile copyright is not image copyright. | Home meditation, yoga, and prayer card. It is no longer used for clinical physiotherapy. | **Unknown.** No repository evidence establishes author, source, or permission. | **Unknown.** Obtain the original source and license/attribution terms, or replace with a cleared asset. | **Replace or document before release.** |
| `public/photos/lotus.jpg` | JPEG, 1280 × 1173; SHA-256 `95399f3b43ce72015f51a158f0fda8e51c62b3e38a2b8857c4144a144da76814`. No creator/source metadata; an embedded profile copyright is not image provenance. | Home Garbha Sangeet card. | **Unknown.** Do not infer Wikimedia provenance from the subject matter or footer’s general statement. | **Unknown.** Verify original URL, creator, license version, and required attribution before continuing use. | **Replace or document before release.** |

## Local font files

The application self-hosts subset WOFF2 files for Noto Sans Gujarati, Noto Sans Devanagari, and Cormorant Garamond from Google Fonts. The main files live in `app/fonts/` with their SIL Open Font License texts. The Gujarati subset is also served from `public/fonts/` for the standalone 404 response. Separate font families provide Gujarati body text, Sanskrit Devanagari text, and Latin text without device-font dependence. The font files use official `fonts.gstatic.com` URLs returned by the Google Fonts CSS API and load on demand without route-level preloads.

## Required source record for each asset

The content owner should provide and retain these fields for every asset before release:

1. Asset path and SHA-256 (to bind the clearance to the exact file).
2. Original creator/rights holder and direct original source URL or internal asset identifier.
3. License or written permission, including commercial web use, modification, and sublicensing limits.
4. Required attribution text, URL, placement, and license version; record “none required” only when documented.
5. Model/property release status where relevant.
6. Approval owner, date, and replacement/expiry terms.

After verification, replace the generic `footer.photos` wording with only the exact, required per-asset attributions. If clearance cannot be produced, replace the photo with a separately documented licensed asset and preserve the original file only as a non-public reference until approval.

## Cleared editorial derivatives — acquired 2026-09-26

The following five files are the cleared, local derivatives supplied for the richer editorial layout. They are intentionally an **illustrative stock/editorial set**, not photographs of GarbhaSetu, its practitioners, patients, facilities, or services. Do not write a caption, alternative, or nearby copy that identifies a depicted person, room, food, or garden as connected to the clinic.

All were downloaded from the individual Wikimedia Commons file page named in each record on 2026-09-26. The recorded “source SHA-1” is Wikimedia’s item-level original-file hash; the separate acquisition SHA-256 binds the exact original payload used to make the derivative. The acquisition payloads were used only in the local conversion workspace and are not public application assets. The individual Commons page plus its item metadata is the retained licensing evidence location; no provider preview, hotlink, tracking URL, or unverified search result is used at runtime.

### Licensing and safety rules shared by this set

- A copyright license does **not** establish a model release, privacy/publicity clearance, medical endorsement, suitability for sensitive-health advertising, property permission, or trademark permission. Where a provider supplied no release evidence, the record says so rather than inferring it.
- Use these photographs only for general, clearly labelled illustrative editorial context. Never present a model or setting as pregnant, a patient, treated by GarbhaSetu, a practitioner, a clinic site, an endorsement, or evidence of an outcome. Do not pair an image with a diagnosis, clinical procedure, before/after claim, or sensitive personal story.
- Public-domain/CC0 items require no legal attribution according to the recorded item metadata. The proposed accessible credits preserve useful provenance voluntarily. The CC BY-SA item must retain its stated credit, link, and license notice wherever it is displayed, including derivative uses; its adaptation remains under CC BY-SA 4.0 when the license applies.
- **Acquisition owner:** GarbhaSetu web team. **Approval owner:** product/content owner, pending visual and legal review. **Expiry/replacement:** no stated term on the selected Commons records; replace immediately if item-level license status changes, a rights concern is raised, or the visual use becomes sensitive. Do not treat this technical register as practitioner or legal approval.
- Proposed localized keys are integration targets only; no message files were changed by this asset task. Before publishing, add matching English and Gujarati alt/caption keys and render the required credit adjacent to the image or in an accessible page-level credits list.

### `PHOTO-HERO-GARDEN-PATH`

| Field | Record |
| --- | --- |
| Public derivative / dimensions | `public/photos/hero-garden-path.webp` — WebP, 800 × 1067, 224,560 bytes; SHA-256 `557984121fb4f55586dbbc215ff6248a81dd2960f545312d6400fecded7bb3ba` |
| Original asset | `Garden path Capel Manor College Gardens Enfield London England 01.jpg`; Wikimedia original SHA-1 `f933d960f67e5a85f5ec064cef06daf6389a4034`; downloaded acquisition SHA-256 `caf526a8eb82932651d6b51aadc95b8963c9ebdb10c57919d51f52ef63eccc3d` |
| Creator / rights holder | Acabashi (own work; copyright retained by creator) |
| Original asset URL / evidence | https://commons.wikimedia.org/wiki/File:Garden_path_Capel_Manor_College_Gardens_Enfield_London_England_01.jpg — inspected 2026-09-26; direct original was obtained from its linked upload URL. |
| Exact license / use terms | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) (Wikimedia metadata: `cc-by-sa-4.0`). Commercial use and modification are permitted subject to attribution and ShareAlike. |
| Attribution / placement | Required: `“Garden path at Capel Manor College Gardens” by Acabashi, CC BY-SA 4.0` linked to the Commons page and license. Place adjacent to the image or in the page-level credits section that is clearly associated with it. |
| Release and limitations | No people are visible; no model release is relevant. No property release evidence was supplied. Depicts Capel Manor College Gardens, London—not GarbhaSetu. Use only as an illustrative garden/restoration context; do not imply clinic location, affiliation, or therapeutic result. |
| Derivative history | Downloaded original JPEG; orientation normalized, metadata stripped, proportionally resized to 800 × 1067, WebP quality 65. No content crop, compositing, retouching, or color-meaning edit. |
| Intended use / status | Proposed home hero or quiet transition image. Illustrative, not an authentic clinic image. Proposed keys: `home.hero.gardenAlt`, `home.hero.gardenCaption`, `assets.credits.heroGardenPath`. |

### `PHOTO-READING-BOOK-TEA`

| Field | Record |
| --- | --- |
| Public derivative / dimensions | `public/photos/reading-book-tea.webp` — WebP, 1500 × 1000, 31,644 bytes; SHA-256 `78e7f16ce1ede222c854eca9bfff35b4fc6ac27be5585e1aad50b448c8af6fba` |
| Original asset | `Open book and a cup of tea (29364151550).jpg`; Wikimedia original SHA-1 `afadffa70b030d87bb359fc4c318a98869de0636`; downloaded acquisition SHA-256 `78094401fa5d0c8aec30c9554659513fe8fadc3aabb01b019aa25d9cf5af653e` |
| Creator / rights holder | freestocks.org, Olsztyn, Poland |
| Original asset URL / evidence | https://commons.wikimedia.org/wiki/File:Open_book_and_a_cup_of_tea_(29364151550).jpg — inspected 2026-09-26. The item credits https://www.flickr.com/photos/freestocks/29364151550/. |
| Exact license / use terms | [Creative Commons Zero 1.0 / CC0](http://creativecommons.org/publicdomain/zero/1.0/deed.en) (Wikimedia metadata: `cc0`). Commercial use and modification are permitted; attribution is not required. |
| Attribution / placement | None required. Voluntary credit if a credits list is rendered: `“Open book and a cup of tea” — freestocks.org, CC0`, linked to the Commons page. |
| Release and limitations | No people are visible. No model release is relevant; property-release evidence was not supplied. The image illustrates optional reading/reflection only. It does not depict a prescribed activity, GarbhaSetu material, or a health benefit. |
| Derivative history | Downloaded original JPEG; orientation normalized, metadata stripped, proportionally resized to 1500 × 1000, WebP quality 82. No crop, compositing, or retouching. |
| Intended use / status | Proposed home everyday-practices reading/reflection block and services editorial image. Illustrative, not an authentic clinic image. Proposed keys: `home.practices.readingAlt`, `home.practices.readingCaption`, `assets.credits.readingBookTea`. |

### `PHOTO-FOOD-VEGETABLE-BASKET`

| Field | Record |
| --- | --- |
| Public derivative / dimensions | `public/photos/food-vegetable-basket.webp` — WebP, 800 × 650, 149,516 bytes; SHA-256 `8d1e74a6113804cfe6d38adfdb372fecd5cdc9bfc4984872b89df443972065d1` |
| Original asset | `Basket with vegetables 2017 G1.jpg`; Wikimedia original SHA-1 `4315114d5a4b17489910a1b89e1afb46b11a1a0a`; downloaded acquisition SHA-256 `ead2621894e89757b8b89aa9442a1280d989c36e3f8a25c65f97fd8527ffe9bc` |
| Creator / rights holder | George Chernilevsky (own work) |
| Original asset URL / evidence | https://commons.wikimedia.org/wiki/File:Basket_with_vegetables_2017_G1.jpg — inspected 2026-09-26. |
| Exact license / use terms | Public domain (Wikimedia item metadata `pd`; no license version or license URL was supplied by the source record). Commercial use and modification are permitted by the recorded public-domain status; attribution is not required. |
| Attribution / placement | None required. Voluntary credit if rendered: `“Basket with vegetables” — George Chernilevsky, public domain`, linked to the Commons page. |
| Release and limitations | No people are visible. No model release is relevant; no property-release evidence was supplied. The basket was photographed in Vinnytsia Raion, Ukraine. It is general food context only—not a diet prescription, portion guidance, supplement claim, or clinic-provided meal. |
| Derivative history | Downloaded original JPEG; orientation normalized, metadata stripped, proportionally resized to 800 × 650, WebP quality 65. No crop, compositing, or retouching. |
| Intended use / status | Proposed food/wellbeing context on home or services. Illustrative, not an authentic clinic image. Proposed keys: `services.wellbeing.foodAlt`, `services.wellbeing.foodCaption`, `assets.credits.foodVegetableBasket`. |

### `PHOTO-FAMILY-SHARED-TEA`

| Field | Record |
| --- | --- |
| Public derivative / dimensions | `public/photos/family-shared-tea.webp` — WebP, 1150 × 1187, 75,556 bytes; SHA-256 `e7fa9792568430753751f84944636ef4a5d3388ab1999dfd1c552b22a41f003f` |
| Original asset | `Four friends raise their tea cups in a toast to celebrate an afternoon's fun in Hyde Park, London during their 'stay at home holiday' in 1943. D16029.jpg`; Wikimedia original SHA-1 `2ecc5812b6e5afe642f6ff36b83d52d49b024836`; downloaded acquisition SHA-256 `280ac2b009baad084dc70bfecead4f4c1317db2aedfc04be351db89ca69c71b6` |
| Creator / rights holder | Ministry of Information Photo Division Photographer; item source/scan credited to Imperial War Museums |
| Original asset URL / evidence | https://commons.wikimedia.org/wiki/File:Four_friends_raise_their_tea_cups_in_a_toast_to_celebrate_an_afternoon%27s_fun_in_Hyde_Park,_London_during_their_%27stay_at_home_holiday%27_in_1943._D16029.jpg — inspected 2026-09-26. The item records pre-1957 Crown copyright as expired. |
| Exact license / use terms | Public domain (Wikimedia item metadata `pd`; no license version or license URL was supplied by the source record). The item explains that the Ministry of Information was dissolved and the pre-1 June 1957 Crown copyright is expired. Commercial use and modification are permitted by that status; attribution is not required. |
| Attribution / placement | None required. Voluntary credit if rendered: `“Four friends raising tea cups, Hyde Park, 1943” — Ministry of Information Photo Division / Imperial War Museums, public domain`, linked to the Commons page. |
| Release and limitations | Recognizable historical people; no model release or personality-rights evidence was supplied. It is a 1943 photograph of named friends in Hyde Park, not a contemporary family, patient group, or GarbhaSetu session. Use only beside broad, non-clinical language about shared support; never identify it as a family, pregnancy group, testimonial, care interaction, or endorsement. |
| Derivative history | Downloaded original JPEG; orientation normalized, metadata stripped, proportionally resized to 1150 × 1187, WebP quality 82. No crop, compositing, recoloring, or retouching. |
| Intended use / status | Proposed family/support editorial context only after content-owner review. Illustrative historical image, not an authentic clinic image. Proposed keys: `home.familySupport.sharedAlt`, `home.familySupport.sharedCaption`, `assets.credits.familySharedTea`. |

### `PHOTO-CONVERSATION-MEETING-ROOM`

| Field | Record |
| --- | --- |
| Public derivative / dimensions | `public/photos/conversation-meeting-room.webp` — WebP, 1440 × 960, 50,682 bytes; SHA-256 `d768396de9fea32a54f0316c4a285249c039e4c16136dae384663eee9b80a2f1` |
| Original asset | `Minimalist meeting room (Unsplash).jpg`; Wikimedia original SHA-1 `a9695cd431c163ce17220be1a64e9a235e072349`; downloaded acquisition SHA-256 `7221d88849aaad1bc44451b1c1d38504f089be27a2a9f657d0cf00a335d03bd2` |
| Creator / rights holder | Breather (`@breather` on Unsplash); original item page identifies the location as 150 W 28th Street, New York, United States. |
| Original asset URL / evidence | https://commons.wikimedia.org/wiki/File:Minimalist_meeting_room_(Unsplash).jpg — inspected 2026-09-26. The item credits https://unsplash.com/photos/BlEfS8-wzHM and retains an archived copy link. |
| Exact license / use terms | [Creative Commons Zero 1.0 / CC0](http://creativecommons.org/publicdomain/zero/1.0/deed.en) (Wikimedia metadata: `cc0`). Commercial use and modification are permitted; attribution is not required. |
| Attribution / placement | None required. Voluntary credit if rendered: `“Minimalist meeting room” — Breather, CC0`, linked to the Commons page. |
| Release and limitations | No people are visible. No model release is relevant; property/trademark-release evidence was not supplied. This is not a GarbhaSetu consultation room and does not show care being provided. Use only as a quiet illustrative conversation/planning context, never as a claim about clinic facilities, visit experience, availability, or professional credentials. |
| Derivative history | Downloaded original JPEG; orientation normalized, metadata stripped, proportionally resized to 1440 × 960, WebP quality 82. No crop, compositing, recoloring, or retouching. |
| Intended use / status | Proposed professional-conversation/support context on home or services. Illustrative, not an authentic clinic image. Proposed keys: `services.conversation.roomAlt`, `services.conversation.roomCaption`, `assets.credits.conversationMeetingRoom`. |

## Original vector motifs — created 2026-09-26

All four vectors below were created from original geometric SVG paths by the GarbhaSetu web team for this repository on 2026-09-26. They contain no external resource, embedded raster, text, tracker, script, event handler, `foreignObject`, `href`, or `src`; each has `viewBox="0 0 240 180"`, uses `currentColor`, and defaults to `aria-hidden="true"` / `focusable="false"`. They are decorative motifs, not logos, clinical diagrams, sacred imagery, or medical instruction. The project may use, modify, and redistribute them with no attribution requirement; retain the origin note in this register.

| Asset ID / public path | Theme / recommended use | File hash / size | Editing history / intended alternative |
| --- | --- | --- | --- |
| `ILLUSTRATION-READING-MUSIC` — `public/illustrations/reading-music.svg` | Open book, leaf, and note for optional reading/music practice sections. | SHA-256 `e0c28befab3b02037f747453da7ddc8cb0f53e5cc82461365c9b197a8b82382b`; 926 bytes. | Original paths only; no derivative source. Decorative: keep hidden from assistive technology. If made informative, use matching localized key `assets.illustrations.readingMusicAlt`. |
| `ILLUSTRATION-NOURISHMENT` — `public/illustrations/nourishment.svg` | Bowl and sprigs for food/wellbeing context. | SHA-256 `ab4834ac860bb93f26c1d9d1ee556db40201c53276f627a4b709232b3b2d0185`; 821 bytes. | Original paths only; no derivative source. Decorative: keep hidden from assistive technology. Never use as a diet prescription. |
| `ILLUSTRATION-CONVERSATION-SUPPORT` — `public/illustrations/conversation-support.svg` | Linked speech bubbles for Garbha Samvad, family, and support themes. | SHA-256 `160115afbf4a5d4dc97f6586d57d24a0e725716b832a313d20b62f51e95ced6b`; 733 bytes. | Original paths only; no derivative source. Decorative: keep hidden from assistive technology. Never imply a counselling session or clinical result. |
| `ILLUSTRATION-JOURNAL-PATH` — `public/illustrations/journal-path.svg` | Journal page and gentle path for reflection/journal or care-stage navigation. | SHA-256 `edf02836c852ac66d7b1c56a2a2cd188a7765285eff5331b4362ec0b93a78043`; 726 bytes. | Original paths only; no derivative source. Decorative: keep hidden from assistive technology. It is not a developmental timeline or treatment path. |
