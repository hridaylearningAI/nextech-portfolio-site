# Nextech UI polish audit

Scope: preserve the existing layout, composition, brand, copy, navigation, and interactions. Apply Emil design engineering and design taste principles only to typography, icons, spacing, legibility, and control feedback. The user's explicit preservation requirement takes precedence over the skills' redesign defaults.

The original full-screen opener, vertical navigation, second hero, overlapping five-stat bar, three-column About section, six-card sector grid, fan carousel, gradient bands, image overlays, newsletter strip, and five-column footer remain. Inner-page compositions and legal copy remain.

| Before | After | Why |
| --- | --- | --- |
| Body secondary text `#86868b` on white and pale teal | `#62666c` in light mode; existing dark token retained | Improves readability without changing the palette or hierarchy |
| Bright brand teal used for small text on pale backgrounds | Darker teal text token; original teal fills and wordmark retained | Improves text contrast while preserving brand identity |
| Narrow About column uses 40px heading and 40px side padding | 32px heading, 32px side padding | Better line breaks inside the same three-column layout |
| Mixed bespoke icons and striped icon placeholders | One Phosphor family for sector, benefit, stat, contact, social, arrow, and theme icons | Consistent weight and optical alignment; only media remains represented by striped artwork blocks |
| Stats digits have proportional spacing | Tabular numerals | Less movement during the existing count animation |
| Mobile About spacing barely clears the overlapping stat bar | Extra mobile top padding | Keeps the original overlap without colliding with the following section |
| Footer email field resists shrinking | `min-width: 0` | Allows the field and submit button to fit their existing column |
| Newsletter band requires both fields on one narrow row | Allows wrapping at small widths | Avoids overflow while retaining its existing form and placement |
| Desktop header combines large gaps, full navigation, phone, theme, and quote | Smaller nav type and gaps; phone shown at wider screens | Keeps the same header arrangement with less crowding |
| Button feedback uses 250ms scale and brightness changes | 160–180ms targeted transitions and subtle press feedback | More immediate response without changing button shape |
| Hover scaling also fires on touch | Scaling limited to hover-capable fine pointers | Prevents sticky touch hover effects |
| Keyboard focus relies on inconsistent component defaults | Shared visible focus treatment, including fields | Makes keyboard position easier to follow |
| Theme state initializes through a synchronous effect update | External-store subscription to the theme attribute | Same three-state control, without the existing lint error |

## Page coverage

| Page | Review and treatment |
| --- | --- |
| Home | Preserved all sections and sequence. Refined heading rhythm, About column spacing, stat and benefit icons, and CTA feedback. |
| About Us | Preserved story, stats, principles, and sector cards. Completed stat and principle icons. |
| Industries | Preserved image grid, process steps, and capabilities split. Receives shared typography and focus improvements. |
| Products & Services | Preserved division cards, principals split, and benefit grid. Completed division and benefit icons. |
| Clients | Preserved roster and review form. Receives shared input and typography polish. Client names remain until real logo artwork is supplied. |
| Contact Us | Preserved form, information card, social row, map frame, and CTA. Completed contact and social icons. |
| Privacy / Terms | Preserved content and page structure. Shared text contrast and heading treatment apply. |
| Shared shell | Preserved cinematic-header handoff, theme selection, pill controls, newsletter forms, and five-column footer. |

## Media handoff

Replace only the large `Ph` elements with the final media. Retain their wrapper dimensions, masks, overlays, border radii, and existing motion attributes. Use `next/image` with descriptive alt text for informative photographs, appropriate `sizes`, and a reserved aspect ratio. Client logos should use `object-fit: contain`.

| Location | Required asset / existing frame |
| --- | --- |
| `video-hero.tsx` | Full-bleed footage with poster, or full-bleed still. Preserve the navigation scrim and responsive crop. |
| Homepage hero | Wide industrial image on desktop; 4:3 mobile crop. |
| `about-intro.tsx` | 3:2 company / partnership photograph, with enough quiet space for the existing overlay. |
| `sector-cards.tsx` | Six 7:8 industry images. |
| `sector-slider.tsx` | Five portrait sector images, cropped to the existing fan cards. |
| Homepage sustainability | Landscape image cropped to the existing split-section height. |
| About page | One 4:3 story image and three 16:10 sector images. |
| Products & Services | Three 4:3 division images and one 4:3 principals image. |
| Industries | Six 16:10 images and one 4:3 capabilities image. |
| Clients / homepage client strip | Approved client logos. |
| Contact | Final map artwork or a separately implemented map integration. |

## Existing functional issues recorded, not redesigned

The site's original newsletter, contact, and review forms have no delivery integration. Social links point to `#`; client-strip arrows and product “Read More” buttons have no handlers. Inner pages have no compact navigation menu below the desktop breakpoint. These need a separate functional pass; adding imagery alone does not make the site production-ready. No messages were sent or services connected during this UI pass.

## Validation

TypeScript and production generation pass with `pnpm exec next build --webpack` (all eight site routes). ESLint passes. The original desktop opener, second hero, and About composition were visually checked in the production preview, with both themes exercised. Turbopack's default build encountered a worker port restriction in this environment; webpack completed successfully. No Lighthouse performance score is claimed.
