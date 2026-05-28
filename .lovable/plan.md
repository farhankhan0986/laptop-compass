# Laptop Discovery Platform — Build Plan

A premium, editorial-style laptop discovery site (Vercel/Apple/Linear feel). Built in 3 phases to respect the 5-credit budget. JSON-driven so you can edit content without touching code.

## Tech & Conventions

- TanStack Start (already in template) + TypeScript + Tailwind v4
- Routing via file-based routes under `src/routes/` (not React Router DOM — the template uses TanStack Router; functionally equivalent for your needs)
- Shadcn UI (already installed) for primitives only: Sheet, Dialog, Dropdown, Slider, Checkbox, Button
- Framer Motion (motion/react) for subtle fades + hover scale only
- Static JSON in `src/data/` — no backend, no Lovable Cloud
- Theme: `next-themes`-style toggle using a tiny custom hook + `class="dark"` on `<html>`; tokens already defined in `src/styles.css`
- Typography: Inter via Google Fonts (loaded in `__root.tsx` head)
- Color tokens: rework `src/styles.css` to true neutral grayscale (kill the blue tint currently in the oklch values)

## Design tokens (rewrite of styles.css)

- Light: bg `oklch(1 0 0)`, fg `oklch(0.15 0 0)`, card `oklch(0.985 0 0)`, border `oklch(0.92 0 0)`, muted-fg `oklch(0.45 0 0)`
- Dark: bg `oklch(0.04 0 0)` (~#0a0a0a), fg `oklch(0.96 0 0)`, card `oklch(0.10 0 0)`, border `oklch(0.20 0 0)`, muted-fg `oklch(0.65 0 0)`
- Radius: 0.5rem (less rounded, more editorial)
- No accent color — primary == foreground inverted

## Data architecture

```
src/data/
  laptops.json       # 20 laptops, full spec object per the schema you gave
  brands.json        # {id, name, logo?}
  categories.json    # {slug, name, description}
  topLists.json      # {slug, title, description, laptopIds: string[], notes: Record<id, string>}
src/lib/data/
  index.ts           # typed loaders: getLaptops(), getLaptopBySlug(), getTopList(slug), filterLaptops(query)
  types.ts           # Laptop, Brand, Category, TopList interfaces
  search.ts          # local search (name, brand, cpu, gpu, tags)
```

All UI reads through `src/lib/data/index.ts` so swapping to a CMS later means changing one file.

## Routes (TanStack file-based)

```
src/routes/
  __root.tsx                    # header, footer, theme provider, fonts
  index.tsx                     # home
  laptops.index.tsx             # listing + filters
  laptops.$slug.tsx             # details page
  categories.$slug.tsx          # category landing (reuses listing)
  top-lists.index.tsx           # index of all top lists
  top-lists.$slug.tsx           # dynamic top list page
  compare.tsx                   # 2-laptop side-by-side
  about.tsx
  contact.tsx
```

Each route sets its own `head()` with title, description, og:title/description per the SEO contract.

## Reusable components

`src/components/`
- `layout/Header.tsx` (sticky, mobile Sheet menu, theme toggle, search)
- `layout/Footer.tsx`
- `theme/ThemeToggle.tsx` + `theme/ThemeProvider.tsx`
- `laptop/LaptopCard.tsx`
- `laptop/SpecTable.tsx`
- `laptop/BuyButtons.tsx`
- `laptop/RatingBadge.tsx`
- `laptop/CategoryBadge.tsx`
- `filters/FilterSidebar.tsx` (desktop) + `filters/FilterSheet.tsx` (mobile wrapper)
- `search/SearchBar.tsx` + `search/SearchCommand.tsx` (global Cmd+K)
- `shared/SectionHeader.tsx`
- `shared/HorizontalScroller.tsx` (mobile scroll rail, desktop grid)
- `top-list/TopListCard.tsx`

## Phase breakdown (mapped to credits)

### Phase 1 — Foundation + core pages (single build step)
1. Rewrite `src/styles.css` with neutral grayscale tokens + Inter font
2. Create `src/data/*.json` with 20 seeded laptops (MacBook Pro M4, MBA M3, XPS 13/15, ROG Zephyrus G14/G16, Legion Pro 7i, Alienware m18, HP Omen 16, Acer Predator Helios, Razer Blade 16, Surface Laptop 7, Galaxy Book4, ThinkPad X1 Carbon, IdeaPad Slim, Acer Aspire 5, HP Pavilion, Chromebook Plus, Framework 13, MSI Stealth 16, MacBook Air 15)
3. `src/lib/data/` loaders + types
4. Theme provider + toggle
5. Header + Footer in `__root.tsx`
6. Home page (hero, 6 featured rails, why-trust, categories grid, newsletter stub)
7. Laptops listing page (grid only, no filters yet)
8. Laptop details page (gallery, specs, pros/cons, similar, buy buttons)

### Phase 2 — Discovery features
1. `FilterSidebar` (brand, OS, category, RAM, storage, GPU brand, processor brand, display size, refresh rate, price range INR/USD) with mobile Sheet
2. Sorting dropdown
3. Top lists index + dynamic `top-lists/$slug` page
4. Categories dynamic page (reuses listing with preset filters)
5. Global search (`SearchCommand` triggered from header, ⌘K)
6. Compare page (pick 2 from URL search params, side-by-side spec table)

### Phase 3 — Polish
1. Framer Motion fade/slide on section mount, hover scale on cards
2. Image lazy-loading + `loading="lazy"` + intrinsic dimensions
3. SEO: per-route head(), JSON-LD `Product` on details, `ItemList` on top lists, sitemap.xml
4. Empty states, 404 polish, accessibility pass (focus rings, aria-labels)

## What I'm NOT doing (to save credits)

- No backend, no auth, no Lovable Cloud
- No real admin UI — editing is by hand in `src/data/*.json` (the structure is the CMS)
- No image generation — use placeholder URLs in JSON; you swap real product images later
- No payments, no real Amazon/Flipkart affiliate integration — buy buttons are plain `<a>` to URLs in JSON
- No comparison engine beyond static side-by-side rendering
- No reviews backend — static array per laptop in JSON

## Open questions before I build

1. **Phase scope per turn**: should I attempt all of Phase 1 in the next build (large single step, uses ~1 credit but is dense), or split Phase 1 into Foundation+Home, then Listing+Details?
2. **Laptop images**: OK to use Unsplash/placeholder URLs in JSON for now? (Generating 20 real laptop images would burn credits.)
3. **Anything to drop?** Contact page and Newsletter section are easy to cut if you'd rather save space for Compare/TopLists polish.
