# Techfest XXX: The Codex (landing page concept)

A landing page concept for **Techfest, IIT Bombay**, for its 30th edition. It's built with plain HTML, CSS and JavaScript, with **no 3D assets**: every visual is 2D SVG, CSS or canvas, generated in code.

**Demo video:** [demo.mp4](demo.mp4)

> This is a design concept, not the official Techfest website. All event details were taken from [techfest.org](https://techfest.org) on 11 Nov 2026.

## Research → idea

I went through techfest.org first (home, competitions, workshops, Ignite, accommodation, contact):

- **What works:** a striking "lost civilisation" art direction (floating ruins at dusk, tribal riders with glowing circuits), gold-on-navy glass UI, and Space Grotesk.
- **What's missing on the homepage:** it's almost all artwork. There are no dates, no numbers and no events ("More details coming soon"), while the inner pages hold rich content: 28 competitions with prize pools, 17 zonal rounds, 32 workshops, the Ignite programme and on-campus stay.

**The concept:** keep the mythic, ancient-meets-future mood, and turn the landing page into a *codex* that tells the story of Edition XXX, with each section as a chapter.

## Sections

| Chapter | What it shows |
| --- | --- |
| **Hero** | Floating ruin islands with glowing windows and parallax, a giant gold **astrolabe** that turns with scroll and mouse, an inscription-style title, drifting embers, and a live countdown to the campus opening (15 Dec, 06:00 IST) |
| **I · The Legend** | Animated stats: 30th edition, 28 competitions, ₹41 L+ prize pools (plus up to ₹25.5 L in Pushpak), 17 zonal cities, 32 workshops |
| **II · The Arenas** | All 28 real competitions with **filters** (Open now / All / National / Pushpak / Ideates / Zonals), prize pools and open/closed status |
| **Spotlight** | Pushpak Grand Challenge 2026, with an animated drone swarm |
| **III · The Pilgrimage** | Zonal tour of 17 cities. The **next stop is worked out from today's date**, and finished rounds are struck through |
| **IV · The Guild** | Workshops by category tab, with festive prices and discount badges |
| **V · Ignite** | Catalyst vs Vanguard tracks, with animated seed-grant bars |
| **VI · The Sanctuary** | Accommodation: ₹3,599, check-in and check-out times, group discounts |
| **Finale** | College Ambassador call to action over a closing dusk scene |

## Details

- Fonts: **Cinzel** (Roman-inscription display) paired with **Space Grotesk** (the font Techfest already uses)
- Interactions: magnetic buttons, card spotlight on hover, cursor glow, active section in the nav, scroll reveals
- Responsive from 320px phones to wide desktops, keyboard-friendly tabs, and `prefers-reduced-motion` support
- Content lives in `data.js`, so it's easy to update each edition

## Run locally

Open `index.html` in a browser. Nothing to install.

```
index.html   page structure
style.css    visual design, animations, responsive rules
script.js    island/astrolabe generation, parallax, embers, filters, zonal route, tabs
data.js      competitions, zonals and workshops (from techfest.org)
demo.mp4     screen recording
```
