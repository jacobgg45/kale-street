# CLAUDE.md: Kale Street MVP (ENT 401)

Read this whole file before planning. Start every session with `/plan` and wait for approval before editing files.

## What we're building

**Solution statement:** For busy Orange County parents who shop farmers markets weekly and want truly raw, local juice but have few places to buy it, Kale Street is a raw, organic, cold-pressed juice sold in returnable glass bottles at farmers market booths that delivers fresh, never-heated juice from local farms for $12 a bottle.

Brand name: **Kale Street** (confirmed Nov 2, 2026). It lives in `BRAND_NAME` in `src/config.ts`.

**This MVP:** a small website for the business, built with **mock data only**. No real payments, no real database, no real customer data. The goal for today is a working, clickable site we can demo and later deploy (Vercel or Netlify).

## Users

- **Primary persona:** busy Orange County parents (about 30 to 50) who shop farmers markets weekly, read ingredient labels, and pay more when quality is obvious and they trust the seller.
- **Secondary:** students and price-sensitive buyers, who are more likely to start with a shot than a full bottle.

## Scope

### Must have (build today)
1. **Home:** hero with the headline "Raw juice from Orange County farms, in glass.", the subline "Never heated. Pressed fresh for every market. $12 a bottle." (markets run Wed, Sat, Sun), and a "Join the list" button.
2. **Menu:** 5 juices and 2 shots from mock data. Each shows its name, ingredients, farm sources, size, price and a flavor color.
3. **Markets:** a schedule of 3 farmers markets (name, city, day, hours) from mock data.
4. **Sign up:** a form for name, email or phone, and preferred market. On submit it shows a confirmation and keeps the entry in memory or local storage only. No backend.
5. **FDA warning:** removed from the website on Nov 9, 2026 at Jake's request. Do not add it back unless asked. It still belongs on the bottle label (or a booth sign).

### Should have (if time allows)
6. **Farms:** cards for each mock farm and what it grows.
7. **Weekly delivery:** a mock order form (pick items, quantity, one-time or weekly). It shows an order summary only. No payment step.
8. **Our story:** why raw, why glass, why local, and how the bottle deposit works.

### Added Nov 9, 2026 (for the demo)
9. **Simulated checkout:** cart (Add to cart on Menu, cart icon in header), `/cart`, `/checkout` with fake-card validation (Luhn, expiry, CVC, ZIP) and a "Text me before each market" checkbox, then `/order-confirmed`. Card numbers are never saved or sent; only brand + last 4 are kept in local storage. Keep the "Demo checkout: no real charges" notice and the test card (4242 4242 4242 4242).

### Won't do in this MVP
Real payments, user accounts, a real database, an admin dashboard, wholesale ordering, a mobile app, or custom blends.

## Content rules

- **FDA warning text, exactly (for the bottle label, not the site):** "WARNING: This product has not been pasteurized and therefore may contain harmful bacteria that can cause serious illness in children, the elderly, and persons with weakened immune systems."
- **No health or medical claims.** Never say the juice treats, cures, prevents, detoxes or boosts anything. Allowed: "raw", "cold-pressed", "never heated", "organic ingredients", "from local farms".
- Do not market to kids, pregnant women or the elderly.
- Use plain, warm, short copy.

## Design

- **Palette (leaning toward the white + leaf green mockup):**
  - Primary green `#2E7D3E` (headlines, logo, buttons with white text)
  - Background white `#FFFFFF`; alternate section background pale mint `#EEF7EC`
  - Accent orange `#F28C28` (buttons and highlights; always dark text on it, never white)
  - Beet pink `#C2305E` (flavor highlight; white text is OK on it)
  - Text `#1A2B1D`
  - Flavor colors: green `#7FB24A`, citrus `#F2A33A`, beet `#C2305E`, ginger `#F3D45B`
- Clean, rounded sans-serif font. Fresh and light, not heavy or vintage.
- Mobile first. Most visitors will come from a phone at the market.
- All body text must meet WCAG AA contrast (4.5:1). Do not use orange or light colors for small text.

## Mock data

Keep all mock data in one folder (for example `src/data/`) as typed objects so it can be swapped for a real database later. Mark it clearly as mock.

- **Products (all 16 oz glass, $12; shots are 2 oz, price set in mock data):**
  - Green: celery, cucumber, apple, lemon, ginger
  - Citrus: orange, carrot, lemon
  - Beet: beet, apple, lemon, ginger
  - Two more juices with placeholder names and ingredients
  - Ginger shot: ginger, lemon
  - One more shot with a placeholder name
- **Markets:** 3 placeholder Orange County farmers markets (name, city, day, hours).
- **Farms:** 3 to 4 placeholder farms with what each one supplies.
- **Bottle deposit:** a placeholder amount in one constant.

## How to work

- Start with `/plan`. Propose the stack, folder structure and build order, then wait for approval.
- Build one section at a time, in the Must-have order above. Use a subagent per section where it helps, then review its output before moving on.
- After each section, run the app and check it in the browser before starting the next one.
- Keep components small and reusable (header, footer, product card, market card, form).
- Do not add features outside the Must/Should lists without asking.
- Ask before installing anything beyond the framework and a styling library.

## Definition of done (today)

- The site runs locally and every Must-have page works on a phone-width screen.
- The menu, markets and sign-up all read from mock data.
- No health claims, no real payments (checkout is simulated), no real data.

## Built (Nov 2, 2026)

- Stack: Vite + React + TypeScript + Tailwind CSS v4 + React Router.
- Run: `npm install` then `npm run dev`. Build: `npm run build` (outputs `dist/`).
- Constants: `src/config.ts`. Mock data: `src/data/`. Logos: `public/seal.svg`, `public/wordmark.svg`.
- Deploy: GitHub Pages via `.github/workflows/deploy.yml` on every push to `main`. It builds with base `/<repo>/` and copies index.html to 404.html so deep links work.

