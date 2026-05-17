# Greenfield Academy — Premium School Website

A production-ready, fully responsive premium school website built with semantic HTML5, modular CSS3, and vanilla JavaScript. No frameworks, no dependencies — just handcrafted, elegant code.

---

## Project Structure

```
school-website/
│
├── index.html                  # Main entry point
│
├── assets/
│   ├── css/
│   │   ├── variables.css       # Design tokens (colors, typography, spacing, shadows)
│   │   ├── style.css           # Core component styles
│   │   ├── animations.css      # Scroll reveal, parallax, motion system
│   │   └── responsive.css      # Breakpoints & adaptive layout
│   │
│   ├── js/
│   │   ├── app.js              # Core bootstrap (loader, navbar, cursor, counters)
│   │   ├── animations.js       # Scroll reveal, parallax, tilt, marquee
│   │   ├── slider.js           # Testimonials slider + gallery lightbox
│   │   └── ui.js               # Modals, tabs, accordion, tooltips, a11y
│   │
│   └── images/
│       ├── hero/               # Hero section images (og-image.jpg, hero-main.jpg)
│       ├── campus/             # Campus life photos (6 images)
│       ├── faculty/            # Faculty portraits (4+ images)
│       ├── events/             # Event banner images (6 images)
│       ├── gallery/            # Masonry gallery images (8 images)
│       └── icons/              # SVG icons, favicon assets
│
└── README.md
```

---

## Design System

### Color Palette

| Token | Value | Usage |
|---|---|---|
| `--clr-ivory` | `#F9F6F0` | Page background |
| `--clr-cream` | `#F4EFE6` | Section alternates |
| `--clr-emerald` | `#1E5645` | Primary accent, CTAs |
| `--clr-terracotta` | `#C0624A` | Secondary highlight |
| `--clr-stone-900` | `#2A2520` | Primary text, dark sections |

### Typography

- **Display / Headings:** Sora (Google Fonts) — weights 600, 700, 800
- **Body:** Plus Jakarta Sans (Google Fonts) — weights 400, 500, 600
- **Scale:** Full fluid clamp() system from `--text-xs` (0.7rem) to `--text-hero` (7rem)

### Breakpoints

| Name | Range | Key changes |
|---|---|---|
| Desktop XL | ≥ 1440px | Wider gutters |
| Desktop | 1025–1439px | Full layout |
| Tablet | 769–1024px | 2-col grids, hidden nav |
| Mobile | 481–768px | Single column |
| Small Mobile | ≤ 480px | Compact spacing |

---

## Features

### Navigation
- Sticky navbar with scroll-triggered frosted glass effect
- Active section tracking via IntersectionObserver
- Animated mobile hamburger menu with full-screen overlay
- Smooth scroll to all anchor sections

### Hero
- Fluid editorial hero with 2-column split layout
- Animated stat counters with easeOutExpo timing
- Two floating cards with CSS keyframe animations
- Animated underline on accent word

### Sections Included
1. **Hero** — Editorial hero with stats, floating cards, dual CTAs
2. **Marquee Band** — Infinite scroll ticker strip
3. **About** — Split layout, pillars grid, animated counters
4. **Academics** — 6-card grid with full hover reveal effect
5. **Campus Life** — 12-column editorial photo grid
6. **Events** — 6 event cards with date badges
7. **Faculty** — 4-card portrait grid with social links
8. **Testimonials** — Auto-advancing slider with touch/swipe support
9. **Admissions** — Timeline + feature panel
10. **Gallery** — Masonry grid with lightbox
11. **Contact** — Split form + details layout
12. **Footer** — 4-column editorial footer with newsletter

### JavaScript Modules
- **Custom cursor** — Smooth lerp-based cursor with hover states
- **Scroll reveal** — IntersectionObserver-powered fade/slide reveals
- **Animated counters** — easeOutExpo number animations
- **Parallax** — Subtle multi-speed parallax (desktop only)
- **Tilt effect** — 3D perspective tilt on academic and event cards
- **Testimonials slider** — Auto-play, dots, prev/next, touch swipe, keyboard
- **Gallery lightbox** — Click-to-open with prev/next navigation
- **Admission modal** — Full form modal with validation
- **Contact form** — Submit simulation with success state
- **Marquee** — Auto-duplicating infinite scroll

### Accessibility
- Semantic HTML5 throughout (`<header>`, `<main>`, `<section>`, `<footer>`, `<article>`, `<nav>`)
- ARIA labels on all interactive elements
- Skip-to-content link
- Focus-visible keyboard indicator
- Reduced-motion media query respects user preferences
- Form labels properly associated with inputs

### Performance
- `loading="lazy"` on all images
- `will-change` only on animated elements
- Passive scroll event listeners
- CSS `contain` where applicable
- Web fonts preconnected via `<link rel="preconnect">`
- No external JS dependencies

---

## Adding Real Images

Replace gradient placeholders by adding real images to the `/assets/images/` subfolders and updating the HTML. Each placeholder `<div>` should become an `<img>` tag:

```html
<!-- Before (placeholder) -->
<div class="img-placeholder img-ph-hero" role="img" aria-label="...">...</div>

<!-- After (real image) -->
<img
  src="assets/images/hero/hero-main.jpg"
  alt="Students at Greenfield Academy campus"
  class="hero-visual-main"
  loading="eager"
  fetchpriority="high"
>
```

### Recommended Image Sizes

| Location | Recommended Size | Format |
|---|---|---|
| Hero main | 1400 × 1000px | WebP / JPG |
| About main | 800 × 1000px | WebP / JPG |
| About secondary | 500 × 500px | WebP / JPG |
| Campus items | 600 × 500px | WebP / JPG |
| Event cards | 700 × 400px | WebP / JPG |
| Faculty portraits | 400 × 520px | WebP / JPG |
| Gallery items | 600 × 500px | WebP / JPG |
| OG image | 1200 × 630px | JPG |

---

## Customization

### Change School Name & Brand
1. Search and replace `Greenfield Academy` in `index.html`
2. Update `--clr-emerald` in `variables.css` to your brand color
3. Replace the inline SVG logo in `.nav-logo-emblem` with your actual logo

### Update Color Scheme
All colors are defined as CSS custom properties in `variables.css`. Change `--clr-emerald` and `--clr-terracotta` to instantly retheme the entire site.

### Add/Remove Sections
Each section is a self-contained `<section id="...">` block. Remove any section and update the matching nav link.

---

## Browser Support

| Browser | Support |
|---|---|
| Chrome 90+ | ✅ Full |
| Firefox 88+ | ✅ Full |
| Safari 14+ | ✅ Full |
| Edge 90+ | ✅ Full |
| iOS Safari 14+ | ✅ Full |
| Android Chrome | ✅ Full |

---

## License

This project is for educational/portfolio use. Replace with your institution's license terms before deployment.

---

*Designed & developed as a premium school website frontend. Replace placeholder content, images, and contact details before going live.*
