# Acme Air

Acme Airlines demo website for Cloudflare application services.

A complete, responsive recreation of the supplied Acme Air travel landing-page reference, built with React 19, TypeScript, Tailwind CSS 4, and Vite.

## Run locally

```sh
npm install
npm run dev
```

Open the local URL printed by Vite. The development preview for this session runs at **http://localhost:5174**.

```sh
npm run build   # TypeScript checks and production build
npm run preview # Serve the production build
npm test        # Playwright interaction and responsive checks
```

Tests use an installed Google Chrome browser. Install Chrome or update `playwright.config.ts` to use a Playwright-managed browser.

## Included

- Cloud-and-airplane hero with destination search, matching results, and empty states.
- Domestic/international destination and flight-route toggles with distinct imagery.
- Singapore-first departure selector with alternate country and airport options.
- A quiet “Space” search easter egg plus tiny cloud constellation and lantern-light details.
- Accessible FAQ disclosures, mobile navigation, and native dialogs.
- Local trip planning, registration, sign-in, support, partnership, and newsletter demos.
- Testimonials, app badges, a generated QR code, and the complete footer.
- Responsive layouts, keyboard focus, reduced-motion support, and local fonts/images.

## Structure

- `src/App.tsx` — page composition and section components.
- `src/components/ui.tsx` — shared heading, scope controls, and accessible action dialog.
- `src/data.ts` — typed destination, route, FAQ, and testimonial content.
- `src/styles.css` — Tailwind theme, reference-specific styling, and responsive rules.
- `tests/landing.spec.ts` — interaction, focus, image-loading, and viewport checks.
- `ASSETS.md` — image origins and attribution.
- `PRODUCT.md`, `DESIGN.md`, `.impeccable/` — product and design context.

This is a frontend demo. Forms do not send or retain information; live booking, authentication, payments, email, social profiles, and app downloads are not connected. Original raster assets were not supplied, so close visual replacements are used. Screenshot copy and testimonial content are reproduced as sample material.
