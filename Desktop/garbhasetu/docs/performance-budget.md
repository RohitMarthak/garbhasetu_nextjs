# GarbhaSetu enrichment performance budget

**Status:** acceptance targets, not measurements already taken.  
**Applies to:** the richer home and services editorial work, including cleared photographs, original SVGs, and the server-rendered content-provenance components.

## Measurement protocol

Record a baseline before enrichment and a revised result after enrichment for `/` and `/services` in both Gujarati and English. Use the same production build, route, viewport, throttling, CPU setting, cache state, and repeat count for each comparison.

- Test at a 390 CSS-pixel mobile viewport first; record the exact browser and device-pixel ratio.
- Use a throttled mobile network and CPU profile that are recorded with the results. Run at least three cold-cache and three warm-cache passes; report the median and range.
- Use a production server, not a development server. Record the commit, `SITE_URL`, test date, viewport, network/CPU profiles, and whether the cache was cleared.
- Measure transferred bytes from the browser network panel or a reproducible equivalent. Report image bytes separately from fonts, JavaScript, CSS, and third-party map traffic.
- Record LCP and CLS from the same lab run. Lab results cannot establish field INP; use responsiveness checks to investigate a regression against the **INP ≤200 ms target**.

| Route / locale | Cache state | LCP | CLS | Enrichment JS delta | First-viewport editorial images | Full-scroll editorial images | Font bytes | Map bytes | Notes |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- |
| `/` Gujarati baseline | To be measured | — | — | — | — | — | — | — | — |
| `/` Gujarati revised | To be measured | — | — | — | — | — | — | — | — |
| `/services` Gujarati baseline | To be measured | — | — | — | — | — | — | — | — |
| `/services` Gujarati revised | To be measured | — | — | — | — | — | — | — | — |
| `/en` baseline | To be measured | — | — | — | — | — | — | — | — |
| `/en` revised | To be measured | — | — | — | — | — | — | — | — |
| `/en/services` baseline | To be measured | — | — | — | — | — | — | — | — |
| `/en/services` revised | To be measured | — | — | — | — | — | — | — | — |

## Delivery budgets

| Area | Acceptance target | How to apply it |
| --- | --- | --- |
| Mobile hero photograph | At most **250 KiB** delivered at the tested phone viewport | Measure the responsive derivative actually requested, not the source asset’s disk size. |
| Other individual photographs | At most **150 KiB** delivered each at the tested phone viewport | Resize/crop or select a lighter derivative before increasing a budget. |
| Original SVG | At most **25 KiB** per SVG and **100 KiB** total on a route | Keep vectors simple; no embedded raster data, scripts, external resources, or complex path animation. |
| First viewport editorial images | At most **600 KiB** newly fetched | Include the actual LCP photo and any other editorial image fetched before the fold. |
| Full-scroll editorial images | At most **1.5 MiB** newly fetched | Use the same phone viewport; exclude map traffic only when it is reported separately. |
| Enrichment JavaScript | At most **20 KiB** additional compressed route JavaScript over baseline | Provenance JSON and audit data remain server-side. Any motion island counts toward this total. |
| Visual stability | **CLS ≤0.1** | Reserve image/map space and do not reveal content through layout-changing animation. |
| Loading | **LCP ≤2.5 s** | Prioritize only the real above-the-fold LCP image; investigate repeated-run regressions. |
| Interaction | Consistent with **INP ≤200 ms** | This is a field target, not proven by a lab check. Do not add interaction work that creates a clear responsiveness regression. |

## Guardrails

- `SourceNote` and `SourceList` are server-rendered. Do not make them client components or ship the complete audit/register merely to render a citation.
- Lazy-load below-fold images; give every rendered image an accurate `sizes` value and reserved aspect ratio.
- Keep Gujarati, Latin, and Devanagari font delivery in the measurement. Do not hide font cost by testing only English.
- Report Google Maps and any other third-party traffic separately; it is not an excuse to omit it from the page-level discussion.
- If a route exceeds a target, reduce image transfer or decorative work before raising the target. Record the decision and retest the same route and profile.
