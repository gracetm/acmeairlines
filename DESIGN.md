---
name: Acme Air
description: Screenshot-led travel imagery, muted cyan clouds, and clear black controls on a spacious white canvas.
colors:
  ink: "#0a0a0a"
  white: "#fff"
  action: "#050505"
  action-hover: "#2b4147"
  ice: "#f0f7fb"
  focus: "#367d8e"
  field-surface: "#f8fbfc"
  field-border: "#cbd8dd"
  scope-idle: "#eff1f1"
  scope-text: "#626a6e"
typography:
  display:
    fontFamily: "Manrope, sans-serif"
    fontSize: "58px"
    fontWeight: 800
    lineHeight: 1.28
    letterSpacing: "-.022em"
  headline:
    fontFamily: "Manrope, sans-serif"
    fontSize: "36px"
    fontWeight: 800
    lineHeight: 1.3
    letterSpacing: "-.025em"
  title:
    fontFamily: "Manrope, sans-serif"
    fontSize: "17px"
    fontWeight: 600
  body:
    fontFamily: "Manrope, sans-serif"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Manrope, sans-serif"
    fontSize: "14px"
    fontWeight: 500
    lineHeight: 1.4
rounded:
  badge: "5px"
  control: "6px"
  field: "7px"
  icon: "8px"
  panel: "10px"
  accordion: "12px"
  photo: "14px"
  results: "16px"
  dialog: "20px"
  register: "25px"
  header: "30px"
  search: "50px"
spacing:
  "8": "8px"
  "12": "12px"
  "16": "16px"
  "18": "18px"
  "20": "20px"
  "24": "24px"
  "25": "25px"
  "28": "28px"
  "32": "32px"
  "55": "55px"
  "75": "75px"
  "120": "120px"
components:
  button-primary:
    backgroundColor: "{colors.action}"
    textColor: "{colors.white}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "13px 25px"
  button-primary-hover:
    backgroundColor: "{colors.action-hover}"
  button-register:
    backgroundColor: "{colors.action}"
    textColor: "{colors.white}"
    rounded: "{rounded.register}"
    padding: "10px 25px"
  button-icon:
    textColor: "#6e7578"
    rounded: "{rounded.icon}"
    width: "40px"
    height: "44px"
  button-store:
    backgroundColor: "#000"
    textColor: "{colors.white}"
    rounded: "{rounded.badge}"
    padding: "4px 9px"
    height: "40px"
  scope-idle:
    backgroundColor: "{colors.scope-idle}"
    textColor: "{colors.scope-text}"
    rounded: "{rounded.control}"
    padding: "15px 25px"
  scope-selected:
    backgroundColor: "{colors.action}"
    textColor: "{colors.white}"
  field:
    backgroundColor: "{colors.field-surface}"
    rounded: "{rounded.field}"
    padding: "12px"
  search:
    backgroundColor: "{colors.white}"
    rounded: "{rounded.search}"
    padding: "0 25px"
    height: "76px"
  navigation:
    backgroundColor: "{colors.white}"
    rounded: "{rounded.header}"
    padding: "16px 35px 16px 46px"
  flight-card:
    backgroundColor: "{colors.ice}"
    textColor: "#45494b"
    rounded: "{rounded.panel}"
    padding: "17px 31px"
  destination-card:
    backgroundColor: "#c4d8d9"
    textColor: "{colors.white}"
    rounded: "{rounded.photo}"
  testimonial:
    rounded: "{rounded.panel}"
    padding: "16px 27px 15px"
  accordion:
    rounded: "{rounded.accordion}"
  dialog:
    backgroundColor: "{colors.white}"
    textColor: "#151515"
    rounded: "{rounded.dialog}"
---

# Design System: Acme Air

## Overview

**Creative North Star: "Muted cyan sky, white canvas"**

Acme Air pairs photographic clouds and a large isolated passenger airplane with neutral sans-serif lettering, black controls, and gently rounded destination photography. This phrase describes the built OWN-WORLD contract; it introduces no new visual direction. The user-provided screenshot pins the palette, composition, Acme Air name, and spacious character.

The React/TypeScript, Tailwind CSS 4 frontend uses custom CSS for its visual identity and utility classes for flex/grid composition. Local imagery closely matches the reference rather than reproducing its exact assets; provenance lives in ASSETS.md. This record follows the shipped source, with the supplied desktop/mobile captures as composition evidence. The reported finish verdict is ship at two-fix scope: cloud contrast and text contrast resolved.

**Key Characteristics:**
- Muted cyan photographic atmosphere fading into white.
- Heavy Manrope headlines, quiet supporting text, and black actions.
- Rounded photographic tiles and pale, mostly flat information panels.
- Generous desktop spacing that compresses into stacked mobile sections.

Source of truth: `src/styles.css`, `src/App.tsx`, `src/components/ui.tsx`, `src/data.ts`, and font imports in `src/main.tsx`; direction and product constraints are in `.impeccable/surface.md` and `PRODUCT.md`. Frontmatter records reused built values, not a newly imposed scale. Sidecar tonal ramps are generated swatch previews, not additional shipping palette choices.

## Colors

### Primary

Muted cyan belongs to atmosphere and pale panels; black carries the primary action. Ice is the repeated route/support surface; focus teal marks keyboard focus and the caret. The action-hover token is the dark blue-gray hover treatment.

The hero's actual gradient is `linear-gradient(to bottom, #dceef0 0%, #a2d2da 62%, #abd5dc 77%, #fff 98%)`; the partner band is `linear-gradient(90deg, #a0d8e2, #eef1f1)`. The footer cloud base is `#a4d6df`. These are distinct built compositions, not a single flat cyan fill. The declared theme sky (`#acd8df`) is not directly applied by these components.

### Neutral

Ink is the root text color, white the canvas/header/search surface, and action the near-black control fill. Scope-idle and scope-text define unselected region controls. Field-surface and field-border define dialog fields. The declared muted theme color is not the universal body color: actual supporting copy uses contextual grays, including `#505050` for section descriptions, `#414d51` for hero copy, and `#565656` for testimonial quotes.

Orange (`#ee501b`) is confined to rating stars; multicolor store marks remain artwork rather than general UI accents. Destination labels sit in white over a lower-image gradient from transparent to `#001d22a8`.

**The Contrast Separation Rule.** Keep the built dark text on pale surfaces and white labels over darkened destination images; cloud photography remains softened behind copy.

## Typography

Manrope, falling back to sans-serif, is self-hosted at weights 400, 500, 600, 700, and 800. There is no separate display or monospace family. The hierarchy is custom, not a modular ratio.

- **Display:** frontmatter display role is the desktop hero. It steps to 48px at ≤1199px and 43px at ≤900px; at ≤767px it becomes `clamp(32px, 6.4vw, 44px)`, line-height 1.22, tracking −.035em.
- **Headline:** frontmatter headline role covers section headings; 31px at ≤1199px and 28px on mobile. The partner heading starts at 37px. Dialog headings are 30px, then 27px on mobile.
- **Title:** the title role captures footer group headings. Route titles are 16px/600; photo labels 17px/700; testimonial names 15px/600. These are contextual roles, not uniform heading sizes.
- **Body:** the body token describes hero/section supporting text, not every paragraph. Section copy steps to 16px and then 14px; testimonial copy is 17px/1.55, then 15px. FAQs use 15px/1.75 answers, then 13px on mobile.
- **Label:** the label token describes primary buttons. Navigation is 14px regular, compact desktop navigation steps to 12px then 11px, and the expanded mobile menu returns to 14px. Small supporting labels range from 12–13px; store artwork uses smaller two-line lettering.

Headlines are dense and heavy, with balanced section headings. Supporting paragraphs are lighter and spacious. Desktop-only line breaks disappear on mobile; the testimonial heading retains its explicit break. Dates use tabular numerals.

## Layout

The built landing composition is hero/navigation/search/airplane → destinations → routes → FAQ and support callout → full-width partner band → testimonials → app promotion and footer. This records this surface's order; its strategy remains in `.impeccable/surface.md`.

- **Container:** centered, 82.5% wide, capped at 1200px; 86% at ≤1199px; viewport minus 40px at ≤767px. FAQ is capped at 900px, with 48px total outer allowance before switching to the mobile container allowance. The page has a 320px minimum width.
- **First viewport:** desktop hero is 960px tall, with an inset header at 26px, content padding-top 110px, and a 700px search pill. The 960×350px airplane sits at top 655px, rotated 4°. At ≥1600px the hero becomes 1000px and the airplane moves to top 635px. At ≤1199px the hero is 800px; mobile is 710px, with a 62px-high search and a 103%-wide airplane capped at 680px, top 470px, height 220px.
- **Grids:** destinations are four columns at Tailwind `md` (48rem), two below; routes two then one; testimonials three then one. Desktop gaps are 24px for destinations/routes and 28px for testimonials. Intermediate overrides tighten gaps; mobile uses 16px, 12px, and 18px respectively.
- **Rhythm:** repeated small intervals are captured in frontmatter. Desktop grid offsets are 55px for destinations/routes and 66px for testimonials, becoming 32px on mobile. Large section spaces are deliberately varied: destination/route top padding 95/92px, FAQ 140px, testimonials 115px above/120px below; mobile equivalents are 45/72px, 80px, and 70/75px.
- **Responsive composition:** custom max-width breakpoints at 1199px, 900px, and 767px progressively compact type, padding, imagery, and gaps. Mobile navigation becomes a two-column popup; the sign-in link hides. Partner content and testimonial heading stack. Footer changes from four weighted columns to two, with its brand spanning both, and the legal row stacks.
- **Overlays:** search results sit 12px below the pill with a 330px maximum height and scrolling. Dialog width is `min(520px, calc(100% - 32px))`, maximum height `calc(100dvh - 40px)`, with internal scrolling; padding changes from 35px to 28px 22px.

## Elevation & Depth

Most sections remain flat: white space, thin borders, pale fills, and photographic overlays establish hierarchy. Shadows identify overlays, while a subtle drop shadow separates the airplane from the sky.

- Search results: `0 12px 35px #23485124`.
- Mobile navigation: `0 10px 30px #274c5b1a`.
- Modal: `0 24px 100px #17363c38`; backdrop `#17303870` with 4px blur.
- Airplane filter: `drop-shadow(0 18px 12px #3d657313)`.
- Search focus: `0 0 0 3px #508e9b`; this is a focus treatment, not ambient elevation.

Cloud treatment is part of the final contrast fix: both image layers use `grayscale(1) contrast(.6) brightness(1.4)` and luminosity blending. Hero opacity is .6, footer opacity .55. Masks fade the hero to white and the footer at both edges; preserve these softened layers when reproducing the built atmosphere.

**The Flat Surface Rule.** Keep routes and testimonials flat at rest; reserve the existing diffuse shadows for overlays and the airplane.

## Shapes

Controls are gently rectangular; rounded header and search surfaces are the exceptions. Frontmatter names radii by their actual use rather than inventing a small/medium/large hierarchy. The header tightens to 22px on mobile, destination tiles to 10px, and the mobile menu uses 18px. Avatars and route-plane discs are circular. Photo cards clip their images at aspect-ratio .82. Borders are typically 1px, with quiet gray-blue colors for fields, routes, accordions, and testimonials.

## Components

- **Primary actions — compact and definite.** Near-black/white buttons have a 1px matching border and desktop minimum height 52px, then 46px on mobile. Hover changes fill and border to action-hover. Register uses the same treatment with a pill radius and a 40px desktop minimum. The later mobile `.button` rule wins for register padding, size, and minimum height (12px 22px, 12px text, 46px); its 25px radius remains. Icon buttons are transparent gray controls, hovering to `#edf5f7` with `#111` icons. Store badges retain their SVG artwork, stacked labels, and dark hover; mobile badge height is 37px.
- **Focus — explicit and consistent.** Buttons, links, summaries, inputs, textareas, and selects have a 3px focus-teal outline, offset 5px. The search field instead uses the parent's focus-within ring. The skip link becomes visible on focus. No custom disabled or validation-error visual system is implemented; required/email/password/date constraints use native controls.
- **Navigation — inset white container.** Gray links darken on hover. Mobile toggle exposes `aria-expanded`, shows the two-column menu, and switches menu/close SVGs; choosing an anchor closes it. Footer links underline with a 4px offset on hover.
- **Search — wide white pill.** Search, voice-information, and date SVG controls flank a labeled text field. Typing or submitting filters all eight demo destinations; an empty query shows all. Results have explicit empty and close states; Escape in the field closes them. Voice opens dictation guidance. Result selection/date control opens the trip dialog.
- **Region controls — paired toggles.** Domestic and International are a labeled button group using `aria-pressed`, not an ARIA tablist. Each section owns independent state. Idle fill changes to `#dfeaec` on hover; selected stays near-black. Mobile controls use 120px minimum width, 46px minimum height, and 12px 18px padding.
- **Destination tiles — photography first.** Full-bleed local images, lower dark gradient, and bottom-left labels; hover scales the image to 1.045, and hover/keyboard focus reveals the right arrow. Clicking opens a destination-specific trip dialog. Both regions reuse the four illustrative photographs; labels are not evidence of photo location.
- **Route cards — quiet information rows.** Ice fill, `#e4edf1` border, minimum height 86px; hover uses `#e6f2f6` fill and `#8cbdc8` border. Left/right route labels frame a pale circular airplane marker. Mobile height is at least 78px. Clicking opens the trip dialog.
- **FAQ — native disclosure rows.** A bordered rounded group contains independently expandable `details` elements. Summaries have 68px minimum height, a pale hover fill, and a plus SVG rotating 45° when open. Answer padding aligns with the question text. The ice support callout leads to an inquiry dialog.
- **Testimonials — bordered, not elevated.** Three desktop cards become one column. Circular avatars, quote copy, country/date, and orange rating stars form the hierarchy. Content is reference-derived demo material, not verified customer evidence.
- **Forms and dialogs — local confirmation.** Native `dialog.showModal()` supplies modal behavior; close button, Escape, and backdrop click dismiss it. Forms share pale bordered fields and black submit buttons, then replace inputs with an inline success state. Flight fields include fixed endpoints, a date, and traveler count. Auth, partner, support, info, and download variants are local demos. Newsletter validates email then shows a status message without storage; the QR code links to this site's destination section.

Motion is limited: button colors/borders, FAQ icons, and destination arrows transition over 180ms; photo zoom uses 400ms `cubic-bezier(.16,1,.3,1)`. The airplane enters once over 1.3s with that easing. Anchor scrolling is smooth. Reduced motion disables animations/transitions and uses immediate scrolling.

## Do's and Don'ts

### Do:
- **Do** preserve the screenshot-pinned cyan clouds, white canvas, black actions, and spacious composition.
- **Do** use the actual Manrope hierarchy and responsive overrides recorded here.
- **Do** retain the softened cloud layers, dark supporting text, destination scrims, and visible keyboard focus.
- **Do** keep local imagery provenance in ASSETS.md and demo interactions explicit.

### Don't:
- **Don't** replace the built atmosphere or section composition with a new visual direction.
- **Don't** add ambient shadows to flat route or testimonial cards.
- **Don't** treat illustrative photography, testimonials, or local confirmations as verified locations, customer evidence, or live bookings.
- **Don't** promote the two reference-specific tagline pills into a reusable eyebrow or kicker system.
