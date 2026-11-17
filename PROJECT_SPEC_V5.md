# TEGAR — Personal Finance Portfolio
## Product & Design Specification (V5)

**Status:** Approved direction / implementation reference  
**Revision:** V5.0 — 16 November 2026  
**Website language:** English  
**Collaboration language with the owner:** Indonesian  
**Owner:** Tegar Ardiyansyah  
**Primary domain (planned):** `tegar.info`  
**Companion documents:** `AGENTS.md` and `IMPLEMENTATION_PLAN.md`

> **Purpose:** This is the product/design source of truth for Codex and future collaborators. It captures decisions already made and identifies unresolved inputs honestly. Do not silently replace an approved choice with a generic template. A design direction being approved is **not** the same as code being implemented or data being verified.

---

## 1. Product charter

Create an English-language **personal portfolio website** for a fresh graduate in Management (Finance Concentration), targeting roles in Financial Planning & Analysis (FP&A), Financial Analysis, Corporate Finance, and adjacent finance/business administration work.

The website should let a recruiter quickly identify who Tegar is, understand his relevant experience and skills, inspect genuine financial-analysis projects and research, and contact him. It is **not** a trading platform, analytics SaaS, finance terminal, or corporate website. Financial/economic elements reinforce his professional identity without dominating the portfolio.

### Experience principles

1. **Credibility first:** No invented achievements, metrics, certificates, quotes, screenshots, affiliations, prices, or market data.
2. **Personal and professional:** Modern, polished, editorial, somewhat futuristic; do not overstate seniority or imply work responsibilities that were not actually performed.
3. **Visual craft with restraint:** Distinctive Sapphire Blue design, immersive hero and contact finale, but uncluttered sections and readable content.
4. **Performance:** Prefer static HTML and CSS; hydrate React islands only when they create clear value.
5. **Accessible by default:** Keyboard, touch, responsive layouts, readable contrast and typography, and reduced-motion behavior.
6. **Progressively deliverable:** A working minimal website first, then polished sections, real content, data integration, and production QA.

## 2. Target audience and content tone

- **Primary:** recruiters and hiring managers evaluating fresh-graduate FP&A / Financial Analyst candidates.
- **Secondary:** mentors, peers, potential professional collaborators.
- **Narrative:** clear, grounded, data-literate, concise, not self-congratulatory.
- **Writing:** all visitor-facing copy is English. Editing discussion may remain Indonesian.
- **Avoid:** fictitious testimonials, invented employment claims, fake numerical counters, exaggerated terminology, “AI-generated” generic slogans, fake third-party endorsements, and unnecessarily technical stack displays on public pages.

## 3. Visual identity

### Confirmed

- **Brand accent:** Sapphire Blue; consistent across buttons, links, highlights, focus states and chart accents.
- **Default theme:** dark. A compact **sun/moon toggle** in the navbar switches to a tasteful light theme.
- **Persist** user theme preference across page loads; prevent a visible wrong-theme flash as reasonably possible.
- **No public accent-color picker.**
- Editorial/cinematic balance: generous whitespace, precise typography, restrained glass/ambient treatments, clear section hierarchy and refined borders.
- Headlines use normal section titles; **do not use giant section numbering** such as `02 / EDUCATION`.
- Desktop and mobile should feel intentionally designed, not merely scaled down.
- Allow polished hover, press, scroll, navigation and tab transitions. Do not make core information accessible only on hover.

### Proposed implementation tokens (adjust after visual review)

These are engineering starting points, **not additional locked visual decisions**:

| Token | Initial suggestion | Rationale |
| --- | --- | --- |
| `--color-accent` | `#2563EB` | Sapphire-family blue starting point |
| `--color-bg-dark` | `#0B1020` | Deep navy, less harsh than pure black |
| `--color-text-dark` | `#E8EDF8` | Legible foreground |
| `--color-bg-light` | `#F7F9FD` | Soft neutral light mode |
| `--radius-card` | `1rem` | Subtle modern rounding |

Review contrast, emphasis hierarchy and the actual visual output before finalizing token values. Typography may use well-supported web fonts with a sensible system fallback; minimize weight/file requests.

## 4. Site map and navigation

### Main homepage — `/`

Ordered sections:

1. Navbar (global)
2. Hero
3. Indonesia Economic Snapshot (directly below hero)
4. About Me
5. Education / My Academic Journey
6. Experience & Involvement
7. Selected Financial Work
8. Skills & Professional Development
9. Contact
10. Footer

Use human-readable IDs such as `#about`, `#education`, `#experience`, `#projects`, `#skills`, and `#contact`; smooth-scrolling anchors should account for fixed/sticky navbar height.

### Detail pages

- `/projects/garudafood/` — Financial Analysis, PT Garudafood Putra Putri Jaya Tbk (2018–2025).
- `/projects/estika/` — Financial Analysis, PT Estika Tata Tiara Tbk (pre/post IPO analysis; historical scope must match verified project files).
- `/research/firm-value-esg/` — Undergraduate research detail.
- `/404` fallback or Astro-compatible not-found page.

Details may use a shared project-case-study layout, but each requires authentic individual data and visuals. Define actual URL slugs in data rather than repeating hard-coded URLs in components.

## 5. Homepage section acceptance specifications

### 5.1 Navbar

- Refined compact brand mark/name: **TEGAR**; accessible links to key sections and to home from detail pages.
- Active/hover/focus states, theme switch with icon and accessible label, responsive mobile menu.
- Sticky behavior only if it improves layout; navigation must not obscure headings or impede keyboard navigation.
- Smooth anchor navigation; avoid an intrusive full-screen transition on every click.
- Respect reduced-motion settings and preserve focus after mobile menu actions.

### 5.2 Hero

- **Left:** authentic headline along the lines of “Hello, I'm Tegar. Finance Graduate & Aspiring Financial Analyst.” Short personal support copy, CTA **View Projects**, secondary CTA **Download CV**.
- **Right:** visually integrated **IHSG / IDX Composite** market chart, ideally an official or reputable embedded provider widget (TradingView is a candidate).
- Verify correct market symbol, provider attribution, latency/realtime/delayed claim and embed reliability before publishing. If embedding is unavailable, use a clearly labeled non-fabricated fallback; **never generate fake market trajectories**.
- Ambient finance-themed background, polished intro animation, concise scroll indicator.
- Mobile layout: readable headline before non-essential visual effects; chart should not crowd primary CTA or cause excessive page weight. Lazy-load eligible embeds.
- Do not use ornamental counters pretending to be real accomplishments.

### 5.3 Indonesia Economic Snapshot

Place **immediately under Hero**. Display exactly **four compact indicator cards** in one row on desktop; enable accessible horizontal swipe/scroll on narrow devices.

1. **BI-Rate** — Bank Indonesia policy interest rate.
2. **USD/IDR JISDOR** — Bank Indonesia reference exchange rate.
3. **Indonesian Inflation YoY** — BPS official annual inflation reading.
4. **Consumer Confidence Index (IKK)** — Bank Indonesia survey series.

Each card has **four visual text rows**:

1. Indicator title.
2. Large current value plus small adjacent direction arrow and numerical difference relative to a **clearly defined previous reference period**.
3. Source.
4. `Data as of: <date>`.

A secondary info affordance can show the precise comparison period, `Last checked`, units, methodology, or freshness; do not overcrowd the default card.

**Semantics:** positive/negative direction represents a numeric increase/decrease, not automatically a favorable/unfavorable economic development. Use `pp` for percentage-point interest/inflation comparisons as applicable, points for IKK index changes, and correct IDR/FX notation for JISDOR. Never compare incomparable units. Provide textual direction for color-blind users.

**Data contract (conceptual, refine when implemented):**

- `id`, `label`, `value: number | null`, `unit`, `formattedValue`, `sourceName`, `sourceUrl`.
- `asOfDate`, `referenceDate`, `referenceValue`, `changeValue`, `changeUnit`.
- `checkedAt`, `status: verified | stale | unavailable | manually_verified`, `isDelayed?`, `notes?`.
- Retain value and comparator **together as one verified snapshot**; do not mix dates from different downloads.

**Data handling, phased:**

- V1: type-safe, transparently dated verified snapshot file, or `Data unavailable` until validated. There is **no requirement to fabricate demo figures**.
- V2: source adapters and scheduled refresh **only after official source/access/licensing and actual response format are verified**. On failure keep the last known good snapshot, visibly indicate stale data, record `checkedAt` separately from `asOfDate`, and support a per-indicator manual override without an admin interface.
- Do not claim a live service merely because a timer/cron exists. Vercel Cron and serverless compute do not themselves constitute persistent storage; choose and test storage/update strategy before implementation.
- Update cadence must reflect each source's actual publication schedule (policy rate, daily JISDOR, monthly inflation, monthly IKK), not a blanket “realtime” label.

### 5.4 About Me

- Authentic natural professional portrait supplied by the owner; avoid synthetic facial modifications.
- Concise credible story about finance, data analysis, financial reporting and property valuation.
- Editorial/cinematic layout, strong but restrained type hierarchy; background effects remain secondary.
- If the portrait is not yet supplied, use a clearly labeled neutral placeholder, **not an invented photo**.

### 5.5 Education / My Academic Journey

Primary information:

- **UIN Syarif Hidayatullah Jakarta**.
- **Bachelor of Management, Finance Concentration**, 2022–2026.
- **GPA 3.72 / 4.00**, Cum Laude.

Visual layout: university details on one side and **one** landscape graduation/university image on the other, using an original approved asset. Below: exactly **three academic highlight cards**:

1. **KSE Scholarship** — period/details to be confirmed against final public copy.
2. **Undergraduate Research** — firm value and ESG research.
3. **Relevant Finance Studies** — concise selection of genuinely completed coursework.

Avoid inflated academic distinctions or multiple unnecessary photo galleries.

### 5.6 Experience & Involvement

Desktop: **two continuous vertical timelines side by side**. Mobile: thoughtfully stacked timelines.

**Professional Experience** (left):

- Property Valuation — Freelance, **KJPP Martono & Rekan**, Sep 2023–Aug 2026.
- University Administrative Experience — UIN Jakarta, Dec 2024–Jul 2025 (use verified unit/role title in final copy).

**Leadership & Organizations** (right):

- **KSE UIN Jakarta** — activities, coordination, financial-literacy/community involvement.
- **KRAMIK FEB UIN Jakarta** — logistics coordination and event support.

Each entry: period, role, institution and concise evidence-based contribution. Include gentle timeline line/point animations and focus/hover treatment.

**Strict exclusion:** No photos, thumbnails, galleries, documentation links, or “View Documentation” buttons anywhere in this section.

No unapproved client names, valuation documents, non-public assignments, or confidential contract details.

### 5.7 Selected Financial Work

Two featured visual cards plus one secondary research card:

**A. PT Garudafood Putra Putri Jaya Tbk (GOOD)**

- Historical financial analysis **2018–2025**.
- Relevant verified areas: performance and growth, margins, profitability, liquidity/leverage, working capital efficiency, cash flow, and selected driver insights.
- Use **real dashboard/project screenshots** supplied or exported from the owner's original workbook.
- CTA: **View Project** → `/projects/garudafood/`.

**B. PT Estika Tata Tiara Tbk**

- Financial analysis comparing **pre-IPO and post-IPO** performance; precise range as supported by project materials.
- Relevant areas: revenue/margins, financial structure, cash flow, financial ratios and core findings.
- Use actual dashboard/chart screenshots.
- CTA: **View Project** → `/projects/estika/`.

**C. Undergraduate Research** (compact horizontal card)

- Research topic: the impact of **DER, Capital Expenditure, Profitability (ROA), and ESG Score** on firm value for Indonesian public companies, **2021–2024**.
- A research-specific detail page; do not style this as a third commercial/dashboard product.

**Detail-page framework:** breadcrumb/back navigation, clear title and metadata, short overview/objective, dataset/source/scope, methodology, selected real visualizations, **3–5 validated insights where justified**, limitations, and conclusion. No unverified statistical values or fabricated dashboards. Distinguish public annual-report data from private licensed Refinitiv/LSEG extracts and respect redistribution permissions.

### 5.8 Skills & Professional Development

Three accessible interactive tabs, in this order: **Skills | Courses | Certifications**.

**Skills:** one unified group of skill tags (no unnecessary subcategories, progress percentages, or faux skill-level gauges). Use simple hover/focus highlights; tags do not need stateful click selection.

**Courses:** image + course name cards; aim for a well-spaced four-across desktop grid **only if four real courses are confirmed**. Fewer confirmed courses should render fewer cards, not an invented fourth course. Known training themes include Excel Basic–Intermediate, Corporate Finance and Excel for Accounting; verify exact program names, issuers and imagery before publication.

**Certifications:** authentic certificate images or issuer marks, title and concise verified description. Known items:

- **MAPPI — Pendidikan Dasar Penilaian 1 (PDP 1)**.
- **AFSI — Sharia Fintech Basic**.

Animate tab panel transitions subtly; accessible keyboard operation, focus visibility and clear active tab state are required.

### 5.9 Contact and Footer

**Contact heading:** “Let's Connect.”

- **No contact form.**
- Primary direct-contact CTAs: **Email** and **WhatsApp**.
- Secondary links: **LinkedIn, GitHub, Download CV**.
- Contact URLs and CV asset must be supplied and validated; absent links must not point to made-up addresses or `#` placeholders that appear functional.

**Cinematic contact finale:** tasteful sapphire-toned Aurora + constellation dots/connecting lines; one short celebratory light burst **upon initial arrival**, then settle into a subtle ambience. Avoid repetitive blasts. Respect reduced-motion and battery/performance considerations. Keep text and CTAs readable.

**Footer:** small TEGAR wordmark, short understated tagline, quick navigation links, dynamic copyright year and back-to-top.

## 6. Interaction / animation policy

- **Hero:** stronger entrance animation; avoid blocking first paint.
- **Section entrances:** light reveal/opacity/translation with Intersection Observer or limited Motion use.
- **Navigation:** smooth anchors and clear active/focus feedback.
- **Cards:** tasteful hover/focus border/tint/lift; touch users get equivalent accessible access.
- **Tabs:** subtle content switch, no delay that harms interaction.
- **Contact:** one-shot burst and low-impact continuing ambience.
- **Reduced motion:** disable or substantially simplify entry sequences, smooth scroll, burst, decorative oscillation and parallax.
- **Performance:** primarily transform/opacity animations, avoid animating large blurred layers continuously, avoid layout shifts and heavy effects on low-power devices.
- Avoid hydration solely to display icons or static text.

## 7. Implementation architecture

### Technology choices

- **Astro:** static output by default; semantic HTML and file-based routing.
- **React:** isolated interactive components only, hydrated with appropriate Astro directives (`client:load`, `client:idle`, `client:visible`, or `client:media` as warranted).
- **TypeScript:** strict and typed content/data structures.
- **Tailwind CSS:** current Astro-supported **Tailwind 4 via Vite plugin**; avoid obsolete `@astrojs/tailwind` configuration in new projects. Keep design tokens and bespoke animations in CSS where it improves clarity.
- **Motion:** primarily within React islands for interactive transitions; plain CSS/Intersection Observer can serve static Astro sections.
- **Lucide:** icons where beneficial; avoid hydrating React purely for icons in otherwise static components.
- **Vercel:** static hosting for V1, with GitHub integration and automatic deployment; add server functions / adapter **only if** future verified requirements need them.
- **GitHub Desktop:** the owner's preferred GUI for version control. Do not require Git CLI in regular instructions.

### Target folder / module map

```text
tegar-portfolio/
├── public/
│   ├── files/                    # Approved downloadable CV PDF (once supplied)
│   └── favicon.svg               # Approved/created brand favicon
├── src/
│   ├── assets/
│   │   └── images/               # Approved originals for Astro image optimization
│   ├── components/
│   │   ├── layout/               # Header, Navbar, Footer, ThemeToggle (when static)
│   │   ├── sections/             # Hero, Snapshot, About, Education, Experience,
│   │   │                         # SelectedWork, Development, Contact
│   │   ├── ui/                   # Buttons, SectionHeading, Timeline, cards
│   │   └── islands/              # React only: Tabs, chart UI if warranted,
│   │                             # other genuinely stateful client components
│   ├── data/
│   │   ├── profile.ts            # Biography/hero/education info
│   │   ├── experience.ts         # Experience + leadership entries
│   │   ├── projects.ts           # Slugs, metadata, approved case-study copy
│   │   ├── development.ts        # Skills, courses, certifications
│   │   ├── contact.ts            # Owner-verified direct URLs
│   │   └── economy/              # Typed economic snapshot and verified fallback
│   ├── layouts/
│   │   ├── BaseLayout.astro       # Metadata, global CSS, theme bootstrap
│   │   └── DetailLayout.astro     # Shared project/research presentation
│   ├── lib/                      # Formatting, date/unit/URL helpers
│   ├── pages/
│   │   ├── index.astro
│   │   ├── projects/
│   │   │   └── [slug].astro       # Astro getStaticPaths; only approved slugs
│   │   ├── research/
│   │   │   └── firm-value-esg.astro
│   │   └── 404.astro
│   ├── styles/
│   │   ├── global.css
│   │   └── animations.css
│   └── types/                    # Shared content/economic type definitions
├── AGENTS.md
├── PROJECT_SPEC_V5.md
├── IMPLEMENTATION_PLAN.md
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

This is a **target map, not a request to create every empty directory immediately**. Add folders and files when the matching milestone begins. Reuse scaffold files rather than duplicating them.

### Assets and content separation

- Put **approved, optimizable images** in `src/assets/images/`; use Astro image tooling where supported.
- Put CV and other **directly downloadable approved files** in `public/files/`.
- Keep descriptive content in `src/data/*.ts` or appropriate content files, separate from view components. Avoid embedding extensive biographies or financial data directly inside JSX/ASTRO markup.
- Keep exact routes, labels, data source URLs, and contact URLs centralized.
- Do not commit secrets or private files. Do not include non-public client appraisal documents or licensed data exports without explicit permission.
- Use clear missing-asset states, not stock people pretending to be the owner.

### Page-rendering strategy

- Homepage and case-study pages are pre-rendered static HTML by default.
- Use React sparingly: tabs are a good candidate; lightweight theme toggle and menu may use plain browser JavaScript in Astro.
- Project pages can be generated through `[slug].astro` and `getStaticPaths()` over vetted entries in `projects.ts`.
- Research detail page can remain explicit because it has different information architecture.
- Reserve API/server endpoints, persistence and scheduled data workflows for a later milestone.

## 8. SEO, accessibility, privacy and quality

- English document language (`lang="en"`), semantic landmarks and one clear H1 per page.
- Page-specific title/description/canonical/OG metadata, descriptive social images (approved), useful alt text, sitemap/robots as appropriate.
- Valid links, readable navigation, accessible tab semantics and mobile menu focus handling.
- Aim for WCAG AA-relevant contrast and visible keyboard focus.
- Responsive layouts at phone, tablet, laptop and wide desktop; check narrow phones and long content strings.
- Respect `prefers-reduced-motion`; avoid autoplay sound/video or motion-triggered discomfort.
- Optimize media, limit third-party widgets and client JS; review Lighthouse/Core Web Vitals rather than claiming scores upfront.
- Treat all market/economic figures as high-trust content requiring source, time context and an honest data status.
- No public contact form or unaudited tracking scripts by default.

## 9. Inputs still needed from the owner

These are **not blockers for foundational development**; use labeled placeholders or omit until supplied:

- Approved personal portrait and one education/graduation landscape image.
- Final public bio text, verified organization role titles/date ranges and any confidential-claim restrictions.
- Actual exported Garudafood and Estika dashboard screenshots, selected financial findings/data, and publication permissions.
- Research visual/chart assets and exact wording/statistics approved for publication.
- Final course list, issuers, certificate images, logos and permissions.
- Real email address, WhatsApp link/number, LinkedIn URL, GitHub profile URL.
- Latest approved CV PDF.
- Confirmed IHSG embed symbol/provider and historical/delayed-data disclosure.
- Verified official source access for all four economic indicators and persistence/refresh strategy.
- Final visual polish decisions such as exact hex tokens and font combination after seeing real previews.

Never invent values for any missing item.

## 10. Deliberately out of scope for V1

- Account login, CMS/admin panel, database, finance-terminal dashboards and brokerage functions.
- Portfolio analytics SaaS, realtime proprietary market feed or paid API without owner approval.
- Contact form, email capture or unnecessary collection of visitor information.
- Interactive fake skill percentages, invented certification/course filler, inflated KPI counters.
- Repeated unnecessary animations, photo galleries in Experience, or a public theme color picker.
- Replacing GitHub Desktop with command-line Git as the normal owner workflow.

## 11. Release criteria

A release is ready only when:

- [ ] All approved homepage sections are present, in order, with coherent text.
- [ ] Detail routes exist and contain substantive, **verified** project/research information.
- [ ] Dark/light themes work and persist across pages without significant flashes.
- [ ] Navbar, anchors, mobile menu, tabs, contact CTAs and back-to-top function using keyboard and touch.
- [ ] No fabricated financial/economic figures; sources and `Data as of` are accurate or data is explicitly unavailable.
- [ ] No broken contact links or downloadable assets.
- [ ] Real owner-approved photos/screenshots replace placeholders where intended.
- [ ] Reduced-motion and basic accessibility checks pass.
- [ ] Mobile/desktop visual QA is completed and animation performance is acceptable.
- [ ] `npm.cmd run build` passes (plus any lint/type checks actually configured).
- [ ] Vercel preview and production deployment have been reviewed.
- [ ] Owner approves publication and any public disclosure of personal/work data.

## 12. Change control

- This file encodes V5 requirements. New changes can be proposed, but **do not silently modify a locked decision**.
- Record deliberate scope/architecture changes in `IMPLEMENTATION_PLAN.md` under decisions/notes.
- `AGENTS.md` contains implementation guardrails; `IMPLEMENTATION_PLAN.md` contains current phase status. They should refer to this file rather than duplicate the full product brief.
- Keep implementation claims distinct: **planned**, **implemented**, **locally validated**, and **published** are different states.
