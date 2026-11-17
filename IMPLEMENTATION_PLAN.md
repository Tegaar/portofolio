# TEGAR Portfolio — Implementation Plan

**Revision:** 17 November 2026 · **Status:** M0–M2 accepted; M3A Hero implemented with checks passed, browser/widget QA pending; M3B not started  
**Product specification:** [`PROJECT_SPEC_V5.md`](./PROJECT_SPEC_V5.md)  
**Codex project rules:** [`AGENTS.md`](./AGENTS.md)

> **Status discipline:** A completed item is only something the owner reported working or a test actually performed. Installation/configuration, local validation, React island runtime behavior, and publication are separate states. Final design, data integrations, GitHub connectivity, and Vercel deployment are not validated by the foundation checks below.

## A. Current environment — known vs unverified

### Confirmed by owner

- [x] Working in Windows with Visual Studio Code.
- [x] OpenAI Codex extension is installed and its panel appears in VS Code; a complete end-to-end editing test has not been confirmed.
- [x] Node.js and npm are installed and their version commands return successfully (exact versions not recorded here).
- [x] Astro project was created locally; intended project folder is `tegar-portfolio`.
- [x] Astro development server was successfully started and displayed a localhost address.
- [x] PowerShell blocks `npm.ps1`; using `npm.cmd` avoids that issue.
- [x] GitHub Desktop is the preferred workflow for commits/pushes.
- [x] GitHub repository + Vercel are the selected hosting workflow (not necessarily connected yet).

### Foundation verification — 17 November 2026

- [x] Confirm the task workspace root is the Astro project folder containing `package.json` and all three reference documents.
- [x] Inspect current `package.json`, `astro.config.mjs`, `tsconfig.json` and project files.
- [x] Verify React and its Astro integration are installed/configured and the static build succeeds; island hydration will be verified when a genuinely interactive React component is needed. M2 uses lightweight browser JavaScript as approved.
- [x] Verify Tailwind CSS v4 uses the existing Vite plugin and global CSS is imported by `BaseLayout.astro`; compiled CSS is included in development and production output.
- [x] Verify existing `motion` and `lucide-react` installations; retain them without version changes for later interactive work.
- [x] Verify `npm.cmd run check` and `npm.cmd run build` succeed.
- [x] Ensure `.gitignore` excludes `node_modules/`, `dist/`, `.astro/`, `.env`, and `.env.*`, while allowing `.env.example`.

## B. Target milestones

### M0 — Baseline inspection and safe setup

**Objective:** Confirm the existing Astro project is healthy and avoid duplicate initialization.

Tasks:

1. Inspect actual folder structure and package scripts.
2. Confirm framework versions and existing integrations rather than assuming their state.
3. Add missing official React/Tailwind integrations only if necessary; verify global Tailwind import and React island rendering with a tiny isolated test if applicable.
4. Ensure TypeScript strict config, Motion/Lucide only when used, and sensible `.gitignore`.
5. Run local development server and a clean build.

**Acceptance:** localhost and `npm.cmd run build` work, without unused dependencies or duplicated Astro projects. Record what was actually tested.

**Status:** Validated (owner-approved M0 scope, 17 November 2026).

Verified results:

- Existing Astro 7.4.12, React/React DOM 19.3.1, `@astrojs/react` 7.1.9, Tailwind/Vite plugin 4.3.5, Motion 14.14.0, and Lucide React 1.73.0 are preserved.
- Added development-only `typescript` 6.0.3 and `@astrojs/check` 0.9.12; `check` runs `astro check`. Existing strict TypeScript/React configuration is unchanged.
- `npm.cmd run check`: 0 errors, 0 warnings, 0 hints. `npm.cmd run build`: success, static output with one homepage only.
- Existing development server at `http://localhost:4321/`: HTTP 200 with the updated scaffold; global CSS endpoint also returns HTTP 200 with compiled Tailwind.
- Production HTML includes the compiled Tailwind stylesheet and preflight, title, description, English language, and responsive viewport. No React hydration script or temporary test route was added.
- Package name is `tegar-portfolio`; manifest/lockfile names, dependency declarations, and installed direct versions match. Astro `site` is `https://tegar.info`.

Verification limits / approved deferrals:

- React island hydration remains deferred until a component actually needs React. M2 uses lightweight browser JavaScript for the theme toggle and renders existing Lucide icons as static SVGs; Motion remains reserved for later work.
- Browser preview access is unavailable, so visual desktop/mobile QA was not performed. The existing development server was reused without stopping or replacing it.
- No Git commands, commits, or deployment were performed; production DNS/HTTPS are not verified.

### M1 — Repository documentation and structure

**Objective:** Establish one source of truth and a maintainable target structure before visuals.

Tasks:

1. Place `PROJECT_SPEC_V5.md`, `AGENTS.md`, `IMPLEMENTATION_PLAN.md` at the actual Astro project root.
2. Read all three; reconcile with real scaffold, **do not delete/recreate working files**.
3. Prepare only necessary starter folders/modules; use the folder tree in V5, not an overly deep boilerplate.
4. Create an initial minimal typed profile/route data module and shared design tokens if needed in the next milestone.
5. Run build; report modified files and what is still missing.

**Acceptance:** Three Markdown documents are present in the root, CodeX can read them, no unrelated homepage or feature has been added, build remains healthy.

**Status:** Validated (owner-approved M1 foundation scope, 17 November 2026).

- All three reference documents are present and read at the project root; `PROJECT_SPEC_V5.md` and `AGENTS.md` are unchanged.
- Created `src/layouts/BaseLayout.astro` with typed title/description props, shared global CSS, document metadata, existing favicons, and an Astro slot.
- At M1 completion, `src/pages/index.astro` used the shared layout with only a temporary English scaffold. Later M2/M3A changes are recorded below.
- Profile/route data modules, theme tokens, and additional folders are deferred until their matching milestone needs them; no unused boilerplate was created.
- TypeScript checking and the production build pass as recorded under M0. M2 was subsequently approved by the owner; its results and remaining QA are recorded below.

### M2 — Design foundations and shared shell

**Objective:** Create a consistent cross-page visual system.

Tasks:

1. `BaseLayout`: semantic document shell, global CSS, page metadata.
2. Sapphire Blue tokens, dark default and thoughtful light palette; persistent theme toggle and prevent initial theme flash.
3. Navbar desktop/mobile, focus states, anchors, smooth scrolling, footer shell.
4. Typography scale, responsive containers, reusable CTA/button and section-heading primitives.
5. First visual QA at phone and desktop widths, reduced-motion behavior and build.

**Acceptance:** The basic homepage loads cleanly, global theme works on refresh and on detail routes, keyboard/mobile navigation works, no unnecessary React hydration.

**Status:** Validated (accepted by the owner based on successful build checks, theme persistence, and initial desktop/mobile review; final keyboard and reduced-motion QA remain pending).

Owner acceptance: the owner confirmed M2 acceptance when authorizing M3A. Initial desktop/mobile review and theme persistence are owner-reported validation; they are not new browser tests performed by Codex. Detailed keyboard, reduced-motion, zoom, and cross-route checks remain release QA.

Implemented within the approved M2 scope:

- Semantic dark/light tokens in `src/styles/global.css`, mapped to Tailwind v4 with `@theme inline` and a data-attribute dark variant. Includes surfaces, text, Sapphire accents, borders, focus, spacing, containers, radii, subtle shadows, typography, and reduced-motion transition tokens.
- Dark is the first-visit default. A small inline script restores a valid saved preference before the stylesheet; blocked/missing storage safely falls back to dark. The toggle updates labels and stores the choice when possible. Storage events and back/forward cache restoration keep the control synchronized.
- Reusable Astro `Header`, `ThemeToggle`, and `Footer`; `BaseLayout` owns the header, single main landmark/slot, skip link, and footer. Shared identity and currently functional navigation live in `src/data/site.ts`; theme behavior/key live in `src/lib/theme.ts`.
- Home is the only exposed navigation destination. The compact Home/theme controls use the same responsive layout on mobile; an expandable menu is deferred until actual section links exist. No dead anchors or unnecessary menu controls were added.
- Footer contains the shared identity/tagline and copyright year derived at static build time. The M2 homepage was a clearly labeled temporary preview, replaced by the M3A Hero below.
- No final homepage sections, contact links/effects, market data, new dependencies, React islands, or temporary test routes were added. Existing package versions, configuration, `PROJECT_SPEC_V5.md`, and `AGENTS.md` are unchanged. Production domain remains `https://tegar.info`.

Actually verified:

- `npm.cmd run check`: 9 files, 0 errors, 0 warnings, 0 hints.
- `npm.cmd run build`: success, static output with only `/index.html`.
- Production HTML: theme bootstrap precedes the stylesheet, exactly one main/H1, valid current Home link and skip-link target, static SVG icons, and no React hydration or external client-script reference.
- Production theme scripts: 14 scenarios passed in Node VM with a simulated DOM/storage. Covers absent/dark/light/invalid preferences, toggle state and labels, persistence in a new document, blocked/missing storage, storage updates/reset, and back/forward restoration. This is script-level validation, not a browser interaction test.
- Calculated token contrast: minimum normal-text ratio 4.56:1 in dark mode and 4.75:1 in light mode across primary/secondary/muted/accent text on the defined page/raised/hover surfaces; focus-ring contrast is at least 3:1. This is not a full rendered-page accessibility audit.
- Reduced-motion CSS disables the defined transitions; smooth scrolling is enabled only with `prefers-reduced-motion: no-preference`. Visible focus and 44px theme/navigation control styles are present.
- Existing localhost returned HTTP 200 with M2 preview/control markup. No existing development server was stopped or replaced.

Remaining release QA (M2 accepted by owner):

- [ ] Check both themes at 320px, 375px, 768px, and 1440px widths, including horizontal overflow, long text, and zoom.
- [x] Owner confirmed theme persistence and initial desktop/mobile review.
- [ ] Complete detailed first-visit/flash, zoom, and cross-route regression checks as additional real routes become available.
- [ ] Check keyboard Tab order, skip link, visible focus, and Enter/Space activation of the theme button.
- [ ] Confirm reduced-motion behavior and appearance in a real browser.
- [ ] Review a phone/desktop screenshot before considering visual QA complete. Cross-route behavior must also be checked when a second real route exists.

Codex browser QA limitation during M2: the browser connector reported its access host unavailable; native Chrome access approval then timed out. No Codex screenshot or browser-interaction pass is claimed. The owner subsequently accepted M2 and authorized M3A only.

### M3 — Hero and Economic Snapshot presentation

**Objective:** Establish signature first impression without inventing market data.

Tasks:

1. Hero headline, short introduction, View Projects and approved CV link (hide/disable until file exists).
2. Elegant ambient background and intro animation with reduced-motion fallback.
3. IHSG chart slot + honest placeholder until provider/symbol/latency have been verified.
4. Four Economic Snapshot cards, exactly four rows on desktop, horizontal scroll/swipe on mobile.
5. Define typed snapshot schema (value/reference/source/as-of/checked-at/status) and `Data unavailable` state; use only verified financial readings.
6. Mobile layout and performance check.

**Acceptance:** Visual composition aligns with V5; market figures are not fabricated, the snapshot remains usable with unavailable data, mobile does not overflow unexpectedly.

**Status:** Partially complete (M3A Hero implementation and automated checks complete; M3B Economic Snapshot not started).

#### M3A — Hero Section Implementation

**Status:** Partially complete (Hero design/chart appearance accepted by owner; Hero-wide spotlight, text-based role control, and laptop sizing implemented with automated checks passed; visual/keyboard browser QA pending).

Implemented:

- Replaced the temporary homepage preview with `src/components/sections/Hero.astro`, using the exact approved greeting and professional positioning, plus a concise introduction grounded in V5 Management/Finance studies and property valuation experience.
- Hero copy and CTA availability are typed in `src/data/profile.ts`. Desktop has introduction/chart columns; mobile stacks the introduction before the chart. Existing Sapphire tokens, theme system, `BaseLayout`, header, and footer are reused; the approved sticky-header refinement is recorded below.
- Static sapphire ambient glow/grid, CSS entrance animations, and a finite scroll cue. Animations run only under `prefers-reduced-motion: no-preference`; the cue points to the existing `#market-context` region, not an unimplemented section.
- `View Projects` and `Download CV` use native disabled buttons until the real destinations exist. At the owner's final refinement request, the small Hero eyebrow and CTA availability paragraphs were removed, including their obsolete description references/data fields. No `#projects` link or fictional CV URL is emitted.
- Added `IhsgChart.astro`, typed provider/source metadata in `src/data/market.ts`, and a small non-React controller in `src/lib/ihsg-chart.ts`. Loads the documented TradingView mini chart near the viewport and recreates it for the site's selected theme.
- A compact static no-JavaScript/unavailable state, script/frame-error and 15-second timeout handling, iframe title, loading focus protection, and original TradingView credit text/link are present. The separate custom direct-IHSG action and explanatory sentence were removed at owner request. An iframe `load` event is treated only as frame loading, not proof that quotes are available or the provider has completed its internal paint.
- Homepage metadata now describes the finance portfolio rather than a development preview. No packages, backend, market-data API, Economic Snapshot, other final sections, Git operations, or deployment were added.

Focused refinements after owner visual review:

- During the earlier chart-only refinement, the owner approved the overall Hero design and reported a white/faint-label initial chart in dark mode. `Hero.astro` and `profile.ts` were unchanged in that chart-only pass. The subsequent, explicitly approved visual/animation refinements are recorded below.
- Actual provider integration is the legacy **Mini Symbol Overview iframe** loader, not the newer `tv-mini-chart` web component. Its documented `colorTheme: dark | light` is captured from the already-restored root theme before creating each instance. Changed `isTransparent: true` to the officially supported `false` so the provider controls an opaque background together with its labels. Transparent composition was an identified configuration risk; the exact internal rendering cause is not confirmed without browser access.
- Each load now owns a separate provider container, observer, timeout, and abortable event listeners. Replacing a theme detaches the complete previous container and cancels its handlers/observer/timer. A late provider script retains its detached parent rather than sharing the active mount. Generation checks reject stale callbacks; unchanged themes and repeated initialization do not create another embed.
- Set the host/iframe element's native `color-scheme` to the selected theme; no iframe document access, unsupported internal CSS, hover workaround, or fabricated/static replacement chart is used. The unavailable state occupies the empty chart stage instead of overlaying the widget; provider branding is not selectively hidden or covered.
- Simplified the card to its heading, actual chart/unavailable state, required TradingView attribution, and one EOD label. Removed the custom `Open IHSG on TradingView` link/icon, blank/blocked explanatory sentence, and the associated spacing/divider.
- Header now uses CSS `position: sticky; top: 0`, a shared z-index, existing border, and theme-aware translucent/blurred background with an opaque fallback. Root scroll padding includes header height, and the skip link sits above the header. No scroll JavaScript, fixed-position spacer, new dependencies, or sticky-ancestor overflow/transform was introduced.

Final visual/interaction refinement:

- Owner confirmed that the IDX Composite chart now renders correctly in dark/light manual screenshots. This is owner-reported visual validation, not a Codex browser test. Chart code, source metadata, provider attribution/EOD label, global styles/palette, theme controller, sticky header, and `BaseLayout` are byte-for-byte unchanged in this final pass.
- The initial interaction pass modified `Hero.astro`, `src/data/profile.ts`, this plan, and the new `src/lib/hero-interactions.ts`. The latest focused follow-up modifies only `Hero.astro`, `hero-interactions.ts`, and this plan; profile copy, SEO description, chart/global-shell files, and CTA destinations/disabled behavior are unchanged.
- Removed `FINANCE & ANALYSIS` and both CTA note paragraphs. Native disabled semantics remain; no fake URLs, dead anchors, or orphaned `aria-describedby` references were added.
- Refined local Hero CSS for 100% zoom. In the latest laptop follow-up the headline uses 3.25–4.75rem (unchanged mobile minimum), the Hero grid has a local 68rem maximum width, and vertical padding/copy gaps, desktop column gap, and role type are slightly smaller. The two-column direction and readable introduction are preserved. No global style, CSS zoom/scale, viewport restriction, or forced single-screen height was used. Actual 1366×768 / 1440×900 composition still needs browser review.
- Added exact role phrases `Finance Graduate` and `Aspiring Financial Analyst` to typed content data. Lightweight JavaScript types at 65ms/character, holds for 2000ms, deletes at 35ms/character, pauses between phrases, and loops. First typing starts after a 650ms entrance delay; timers pause while the document is hidden.
- A hidden-from-assistive-technology visual text span updates without an ARIA live region. The role text area itself is now a native, visually unboxed pause/resume button: click, Enter, and Space use the button's native activation. Its accessible label contains the complete static professional title plus the pause/resume action, and changes only with playback state. The separate icon button/control slot is removed. Without JavaScript or under reduced motion, the interactive control is hidden and the plain static title remains visible.
- An invisible grid sizer reserves the full title's natural wrapping height, with a minimum control height shared by the static/enhanced states. Explicit focus-visible styling is present. Actual keyboard activation, screen-reader output, and pixel/layout-shift verification remain browser QA. Reduced motion disables typing and pointer effects; hidden tabs pause timers, finite entrances/scroll cue, and caret blinking.
- Coordinated one-shot CSS entrances for greeting, name, role, introduction, then staggered CTAs. Only the role/caret loop; no repeated whole-Hero animation, scaling, or bounce was added.
- A soft Sapphire radial glow now follows the fine pointer across the whole Hero using Hero-local CSS variables and one requestAnimationFrame update per frame. It is a pointer-events-none pseudo-element behind content; the optional stronger name highlight activates only near the name. The effect is scoped to Hero, with no document-wide pointer handler, cursor replacement, particle trail, or input overlay. Leaving Hero, touch/coarse input, reduced motion, and hidden tabs cancel/disable it.
- Cross-origin iframe limitation: the parent page cannot receive movement from inside TradingView. The controller clears the glow on observable iframe boundary entry instead of reading the iframe document or placing an overlay above it. Surrounding chart/introduction space remains trackable; native chart interaction and provider attribution are untouched.

Chart research — checked 17 November 2026:

- Verified instrument: **`IDX:COMPOSITE`** on the [TradingView IDX Composite page](https://www.tradingview.com/symbols/IDX-COMPOSITE/).
- The [widget-specific Asia/Pacific coverage table](https://www.tradingview.com/widget-docs/markets/asia-pacific/) lists IDX stocks/indices as **end-of-day**. The Hero discloses `End-of-day data · Not real-time`; platform subscription/feed delays are not substituted for widget-specific availability.
- Integration follows the [documented iframe mini-chart/lazy-loading pattern](https://www.tradingview.com/widget-docs/tutorials/iframe/lazy-loading/). The [data FAQ](https://www.tradingview.com/widget-docs/faq/data/) also explains that individual instruments can be restricted in widgets. The fallback remains available for that case.
- No prices, performance figures, historical trajectories, or freshness dates for market readings are hardcoded or fabricated. Provider metadata `checkedAt` is a documentation verification date, not the date of a market quote.

Actually verified:

- Final `npm.cmd run check`: 15 files, 0 errors, 0 warnings, 0 hints.
- Final `npm.cmd run build`: success, one static homepage; no temporary test routes or React hydration.
- Production HTML checks: exact Hero greeting, single H1/main, valid internal anchors, two native disabled CTAs without obsolete description references, static professional-title fallback, animated text marked aria-hidden, one attribution/EOD label, and removal of requested eyebrow/CTA notes/custom chart link/text/icon.
- Theme regression: 14 scenarios passed using actual built theme scripts in Node VM with simulated DOM/storage, including persisted preference, blocked storage, storage events, and back/forward restoration.
- Refined chart controller: 15 scenarios passed using the actual built controller in Node VM with simulated DOM, observers, timers, AbortController cleanup, and provider events. Covers lazy loading, opaque dark configuration, saved light/dark initialization, Dark–Light–Dark with one connected instance, frame title/color scheme, unchanged-theme stability, repeated initialization, cancelled old handlers/observers, detached late scripts, stale load/timeout events, script blocking, timeout, frame failure, and safe operation without IntersectionObserver/markup.
- Latest Hero interactions: 17 scenarios passed using the actual built Hero script in Node VM with simulated DOM, timers, media queries, pointer events, and document visibility. Covers static accessible role naming, full typing/hold/deletion loops, text-area click pause/resume, hidden-tab pause/background startup, initial/dynamic reduced motion, malformed-data static fallback, idempotence, Hero-wide frame-throttled coordinates, near-name emphasis, Hero leave cancellation, coarse/touch input, iframe boundary cleanup, hidden/reduced pointer cleanup, optional absent name, and absent Hero.
- Static accessibility/layout checks confirm a native text-only role button, removal of pause/play icons and the separate control slot, shared grid sizing/minimum height, full static fallback/name, no per-character live region, visible focus rules, background-only pointer-events-none glow, reduced-motion/fine-pointer gates, and no CSS zoom/scale/cursor replacement. Native Enter/Space behavior, rendered layout stability, and mobile overflow were not tested in a browser.
- Static sticky checks passed for positioning, top offset, theme-aware background, scroll offset, skip-link layering, and absence of overflow/transform on `html`/`body`. These assertions do not prove actual browser scrolling or visual contrast inside the provider's iframe.
- Localhost returned HTTP 200 with the text-area role control and without the removed pause/play icons/control slot. The built Hero interaction script is about 3.2KB; no dependency or React hydration was added. This is not a rendered browser pass.

Remaining manual checks and inputs:

- Browser access host is still unavailable in the final refinement task; a supported browser binding was attempted and failed. No Codex browser/screenshot pass is claimed and no browser tools, security changes, or system-permission workarounds were used. Owner manual Chrome review remains the next visual QA step.
- [x] Owner confirmed correct chart appearance in both themes through manual screenshots. The widget implementation is preserved.
- [ ] Review the final desktop Hero at 100% zoom, particularly 1366×768 and 1440×900; inspect mobile widths/zoom, overflow, readability, and stable placement while role phrases type/delete.
- [ ] Verify the coordinated entrance and full role loop; click/focus the role text area and test Enter/Space pause/resume, static screen-reader label, visibility pause, and plain static reduced-motion title.
- [ ] Review Hero-wide spotlight/fade and optional local name highlight in both themes, including surrounding chart space, iframe boundary behavior, touch/coarse pointers, and reduced motion. No screenshot was attached to this focused follow-up; no new visual comparison is claimed.
- [ ] Recheck chart initial rendering/attribution and saved-theme refresh as a regression after the Hero interaction changes.
- [ ] Exercise Dark → Light → Dark and confirm only one visible provider instance, correct colors, and persistent selection in a real browser.
- [ ] Review card at phone/tablet/desktop widths for sizing and overflow; verify removed custom content stays absent and mandatory provider branding remains fully visible.
- [ ] Scroll on desktop/mobile and confirm the navbar stays visible, anchor targets are not obscured, and keyboard skip-link/focus order remains usable.
- [ ] Recheck existing Hero entrance/scroll effects and theme control, including reduced motion. The broader Hero design is owner-approved; these interaction/regression checks are still pending.
- Finish keyboard/focus and reduced-motion QA carried forward from M2. Verify the anchor focus target and provider iframe traversal in a real browser.
- Supply the approved CV PDF; build the real Projects destination in its approved milestone before activating either CTA.

#### M3B — Indonesia Economic Snapshot

**Status:** Not started. No Snapshot UI or economic readings are implemented; separate owner approval is required.

### M4 — About, Education and two Experience timelines

**Objective:** Communicate the candidate's real academic and professional background.

Tasks:

1. About editorial layout with owner photo placeholder until approved image is supplied.
2. Education section and three academic highlight cards; one approved education photo slot.
3. Two side-by-side continuous timelines, stacking on mobile.
4. Source content from typed data; confirm final role wording and achievement claims.
5. **No experience photos, thumbnails, documentation galleries or buttons.**

**Acceptance:** Professional content is truthful, easy to scan, mobile-friendly and compliant with the strict Experience media exclusion.

**Status:** Not started.

### M5 — Financial Work, Research and detail pages

**Objective:** Make authentic analyses inspectable as a portfolio, not just pretty cards.

Tasks:

1. Two featured project cards with real dashboard screenshot slots and one compact research card.
2. Establish project data model and static project slug routes.
3. Build `DetailLayout` and case-study narrative blocks.
4. Garudafood 2018–2025 detail with validated charts/findings from owner's files.
5. Estika pre/post IPO detail with validated scope and findings from owner's files.
6. Firm Value / ESG research detail, with approved statistics only.
7. Verify links, responsive screenshots, alt text, source attribution and disclosure permissions.

**Acceptance:** All routes load, each card links to substantively different authentic content, no made-up market/financial metrics.

**Status:** Not started.

### M6 — Skills, Courses, Certifications, Contact finale

**Objective:** Complete personal credentials and distinctive direct contact experience.

Tasks:

1. Build accessible interactive tabs (Skills | Courses | Certifications), using React only for this island if needed.
2. Skills tags, confirmed course cards and approved certificate media.
3. Contact: Email and WhatsApp primary; LinkedIn, GitHub, CV secondary; no form.
4. Aurora + constellation + **one-shot** light burst, subtle resting ambience, reduced-motion fallback.
5. Final footer and back-to-top.

**Acceptance:** Keyboard/touch works, no invented courses or broken CTAs, contact effect is attractive but does not compromise readability/performance.

**Status:** Not started.

### M7 — Verified data connections and economic automation (separate workstream)

**Objective:** Implement authentic market/economic data with proper failure handling. **Do not block the rest of V1 on an unverified API.**

Tasks:

1. Research/verify BI and BPS data licensing, official endpoints or download formats for BI-Rate, JISDOR, inflation YoY and IKK.
2. Confirm provider, embed symbol, attribution and delay status for IHSG/IDX Composite.
3. Define appropriate comparison periods and precision/unit conventions per indicator.
4. Implement last-known-good snapshot and independent `checkedAt` / `asOfDate`; visibly flag stale/unavailable values.
5. Evaluate a suitable Vercel schedule + persistent storage or secure update mechanism; do not assume Cron writes static deployed files.
6. Implement manual override per indicator without an admin panel and document how to audit/update it.
7. Test success, missing data, malformed responses, delayed releases, rate limits and failures.

**Acceptance:** Every published reading has a legitimate source/date, fallback is honest, update mechanism is tested and does not expose secrets or invent data.

**Status:** Not started; depends on external source verification and infrastructure decisions.

### M8 — Polish, verification and production deployment

**Objective:** Deliver a dependable recruiter-facing website.

Tasks:

1. Check layout on small phones, tablets and desktops; ensure meaningful hover alternatives on touch.
2. Review keyboard tab order, menus/tabs, focus states, image alt text, contrast and reduced-motion.
3. Refine hero/contact effects without unnecessary JS or performance regressions.
4. SEO metadata, social preview, favicons, sitemap/robots and 404 page.
5. Check internal/external links, approved CV, original photos, dashboards and published claims.
6. Run actual build/checks, review devtools console and perform basic Lighthouse assessment.
7. Create/publish repository **through GitHub Desktop** in the correct project folder; inspect `.gitignore` and staged changes.
8. Import repository into Vercel, check preview build and configuration, and connect `tegar.info` using provider-supplied DNS values.
9. Confirm HTTPS, refresh/deep-link navigation, mobile experience and final owner sign-off.

**Acceptance:** All release criteria in V5 met; production site validated by owner.

**Status:** Not started.

## C. Suggested delivery sequence and checkpoints

- **First Codex task:** inspect local setup, verify dependencies, read/copy these documents into root, create no public UI beyond what is needed to confirm basic health.
- **Second Codex task:** build M2 shell and theme; send a browser screenshot for review.
- **Then:** implement one homepage group at a time and review visual output before proceeding.
- **Vercel can be linked earlier** for preview convenience, but do not present the website as finished until acceptance criteria are met.
- **M7 is a parallel/deferred task**; source research and the complete economic update mechanism must not block construction of authentic static portfolio sections.

## D. Testing checklist per milestone

- [ ] Existing behavior preserved.
- [ ] Relevant code is typed, simple and consistent with Astro-first architecture.
- [ ] `npm.cmd run build` executed and succeeded, or exact blocker recorded.
- [ ] Responsive/manual preview at mobile and desktop widths, if environment permits.
- [ ] Keyboard and reduced-motion behavior considered for interactive UI.
- [ ] No unverified facts, dummy market figures, secrets, private licensed data or dead links.
- [ ] Modified files, decisions, remaining blockers and next step clearly summarized in Indonesian.

## E. Risks and mitigations

| Risk | Mitigation |
| --- | --- |
| Codex builds everything at once | One milestone/task at a time; explicitly constrain touched files |
| Existing Astro integration is misconfigured | Inspect real files and package versions before installation |
| Unverified economy data or changing APIs | Honest unavailable state first; source verification + fallback later |
| Market widget is blocked or delayed | Validate IHSG symbol/provider, disclose delay, have a non-fabricated fallback |
| Animations make mobile slow | CSS-first, measured Motion, reduced-motion, performance QA |
| A portfolio screenshot exposes private/licensed information | Owner approval and safe sanitized export before uploading |
| GitHub repository created in wrong folder | Use `tegar-portfolio` root in GitHub Desktop; verify `package.json` at repo root |
| Theme toggle flashes or fails across routes | Initialize preference early in shared layout and test navigation/reload |
| Placeholder contact or CV links published | Hide unavailable CTAs; complete release link audit |
| Vercel cron cannot persist fetched data | Design tested storage/write-back before implementing scheduled refresh |

## F. Decision log

| Date | Decision | Notes |
| --- | --- | --- |
| 2026-11-16 | Approved V5 design direction | Sections, interactions and distinctive hero/contact are specified in V5 |
| 2026-11-16 | Astro-first architecture | React islands only for interactions that warrant hydration |
| 2026-11-16 | Sapphire Blue / dark default with light toggle | No visitor accent-color customizer |
| 2026-11-16 | GitHub Desktop + GitHub + Vercel | GitHub Pages is not the selected deployment destination |
| 2026-11-16 | Static output first | Backend and scheduled data are separate future workstreams |
| 2026-11-16 | Source-verified economic readings only | Last-known-good/manual fallback; never label fake values live |
| 2026-11-16 | No media in Experience | Strictly timelines without photos/documentation |
| 2026-11-17 | Approved M0 completion and M1 foundation setup | Shared minimal layout/CSS, TypeScript validation tools, package identity, environment ignores, and final site URL `https://tegar.info`; no visual sections or deployment |
| 2026-11-17 | Defer React hydration verification to M2 | Owner requested the first real interactive component instead of temporary production test pages; M2 requires separate approval |
| 2026-11-17 | Approved M2 foundation and theme system | Existing Tailwind v4, dark default, persisted light/dark toggle, shared Astro header/footer, and explicitly temporary preview; no M3 sections or deployment |
| 2026-11-17 | Use lightweight JavaScript for M2 interactions | No React island is warranted for theme toggling; React hydration verification waits until a component actually needs it. Manual browser QA remains pending due unavailable browser access |
| 2026-11-17 | Owner accepted M2 and authorized M3A Hero only | Acceptance includes build checks, theme persistence, and initial desktop/mobile review; final keyboard/reduced-motion QA remain pending. M3B requires separate approval |
| 2026-11-17 | TradingView Hero widget uses verified IDX symbol and EOD disclosure | `IDX:COMPOSITE`; widget-specific coverage documented as end-of-day, with permanent direct-source fallback and no fabricated prices. Actual embedded data still needs browser verification |
| 2026-11-17 | Approved focused M3A refinement after visual review | Preserve overall Hero design; use opaque official iframe themes with isolated instance cleanup, remove custom IHSG link/footnote, and make the existing header sticky. Required TradingView branding stays visible; M3A remains partially complete pending browser review |
| 2026-11-17 | Approved final M3A proportions and interaction refinement | Remove eyebrow/CTA notes, tune actual responsive CSS for 100% zoom, loop the two exact role phrases accessibly, coordinate one-shot entrances, and add a restrained fine-pointer name spotlight. Owner reports dark/light chart rendering correct; preserve the widget/global shell and stop before M3B |
| 2026-11-17 | Approved Hero-wide spotlight and discreet role control follow-up | Expand background glow only within Hero, replace separate pause icon with a native role-text button, and tune laptop proportions locally. Preserve chart, global styles, introduction, theme/navbar, and CTA behavior; browser QA remains pending and M3B is not started |

## G. How to update this plan

- Status options: **Not started**, **In progress**, **Partially complete**, **Validated**, **Blocked**.
- Change a checkbox to complete only after a task is genuinely performed or confirmed by the owner.
- Log substantial approved changes in the decision log with date and rationale.
- Do not silently rewrite requirements in `PROJECT_SPEC_V5.md` to accommodate implementation shortcuts.
