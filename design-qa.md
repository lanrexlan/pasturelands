# Design QA — architectural direction

final result: passed

Reviewed 13 October 2026. Scope: responsive website redesign; existing backend integrations preserved.

Reference: `/workspace/generated_images/exec-a9b4a67c-8557-4c7d-9ab2-be3f2fd2adbe.png` (selected option 2).
Rendered evidence: `/workspace/design-artifacts/home-final-1440.png`, `home-final-390.png`, and full-page captures of the six primary routes. Original reference and latest captures were visually opened and compared.

Browser verification used local Chromium through Playwright because the plugin cloud browser is unavailable. This is local verification, not a hosted preview or deployment.

- Desktop at 1440 × 1024: forest hero, serif headline, sand primary CTA, architectural home, gold sun, quiet navigation rules, numbered process rows, terracotta buyer band and restrained footer match the selected direction.
- Mobile at 390 × 844: copy stacks clearly; architectural art moves below the primary action; menu and forms remain usable. No horizontal overflow on any of the six primary pages.
- Extended the reference with the site's original seller-audience, verification and FAQ content. Inner pages use the same palette, typography and editorial layout. No invented listings, metrics or testimonials.
- Fixed artwork seam with a continuous wide background; removed hidden scroll-reveal states; corrected duplicate investor H1; removed fake founder-photo placeholders.
- All six primary routes render with expected headings and content. No browser page errors during route and interaction checks.
- Desktop FAQ opens; mobile navigation reaches the seller page and closes after navigation; required seller fields show errors.
- All six seller steps are reachable, optional photos can be skipped, and draft progress survives reload. Existing seller validation and autosave are unchanged.
- Waitlist and investor forms return required-field errors. These checks waited beyond bot protection and used invalid inputs, so no database writes or emails were performed.
- Lint passed. Production build including TypeScript passed after font self-hosting; final build rechecked after layout refinements. Production server startup and homepage browser render also passed.

No outstanding P0/P1/P2 design findings. Artwork is concept illustration, not a photograph of an available listing. Listing pages without supplied photos explicitly say that photos are coming soon.

Limitations: Supabase credentials and optional Resend/WhatsApp configuration are absent. Database submission success, photo uploads, live listings, and email delivery remain unverified. Cloud browser preview and in-chat file delivery remain unavailable. No deployment performed.
