# Kale Street

Website MVP for Kale Street, raw cold-pressed juice sold in returnable glass bottles at Orange County farmers markets. ENT 401 project by Jake Gerhart and Maddox Hammer.

**Demo only:** all menu, market and farm data is mock. Sign-ups and delivery requests stay in the visitor's browser. No payments.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:5173.

## Where things are

- `src/config.ts`: brand name, bottle deposit, FDA warning text
- `src/data/`: mock products, markets, farms
- `src/pages/`: one file per page
- `CLAUDE.md`: build spec and content rules (no health claims, FDA warning required)

## Deploy

Every push to `main` builds and publishes to GitHub Pages (`.github/workflows/deploy.yml`).
