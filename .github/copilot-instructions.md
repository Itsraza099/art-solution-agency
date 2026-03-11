# AI Copilot Instructions - Art Solution Agency

## Project Overview
Art Solution Agency is a Next.js 16.1.6 **client-side rendered** premium agency portfolio showcasing web development, branding, and software services. The entire app is a single animated React component with glassmorphic UI, bilingual support (EN/FR), and dark/light themes.

## Architecture & Key Patterns

### Client-Side Single Component Structure
- **Entry Point**: `app/page.tsx` - Homepage with hero and capabilities sections
- **Navbar Component**: `components/Navbar.tsx` - Shared navigation across all pages (marked "use client")
- About Page: `app/about/page.tsx` - Mission, team, and services overview
- Contact Page: `app/contact/page.tsx` - Contact form with video call, email, and maps options
- Each page marked as "use client" for animations
- State: `isLoading`, `dark` (theme), `lang` (en/fr bilingual)

### Theming System (CSS Variables)
Set in `app/globals.css`:
```css
:root {
  --bg-color: #f8f9fa;
  --text-color: #0f172a;
  --card-bg: rgba(255, 255, 255, 0.7);
}
[data-theme='dark'] {
  --bg-color: #050505;
  --card-bg: rgba(20, 20, 20, 0.6);
}
```
**When modifying colors**: Always update both light AND dark theme variants. Apply via `bg-[var(--bg-color)]` in Tailwind.

**Theme toggle logic**: Clicking theme button → `setDark(!dark)` → `document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light')` (useEffect hook)

### i18n Pattern (NOT a library - state-based)
Languages stored in `content` object with `en` and `fr` keys containing all UI strings:
```tsx
const content = {
  en: { nav: ["Home", "About", "Works"], heroTitle1: "Defining", ... },
  fr: { nav: ["Accueil", "À propos", "Projets"], heroTitle1: "Définir", ... }
};
const t = content[lang];
```

**Adding new translations**: Add both `en` and `fr` strings to the `content` object, then use `t.keyName`. **Language switch triggers re-renders**: Each text element has `key={`text-${lang}`}` to force Framer Motion re-animation on language change.

### Animation Strategy (Framer Motion)
All animations use Framer Motion. Key patterns:

**Text fade on language/state changes**:
```tsx
const textFade = { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.3 } };
<motion.span key={`hero-title-${lang}`} {...textFade}>{t.heroTitle}</motion.span>
```
The `key` with `${lang}` ensures element re-animates on language switch.

**Preloader exit animation**: Uses `exit={{ y: "-100vh" }}` with ease curve `[0.76, 0, 0.24, 1]` (custom cubic-bezier).

**3D hover card**: `whileHover={{ y: -5 }}` on service cards for subtle lift effect.

### Styling with Tailwind v4 + CSS Variables
- **Framework**: Tailwind CSS v4 with `@tailwindcss/postcss` (no legacy PostCSS in tailwind.config)
- **Fonts**: Space Grotesk (headings) and Inter (body) imported from Google Fonts in [app/layout.tsx](app/layout.tsx)
- **Glassmorphism pattern**: `backdrop-blur-xl bg-[var(--card-bg)] border border-white/10` (semi-transparent, blurred background)
- **Gradients**: `bg-gradient-to-r from-purple-400 to-indigo-400` with `bg-clip-text text-transparent` for text gradients
- **Mobile-first**: Hidden on mobile (`hidden md:flex`), flex direction changes (`flex-col lg:flex-row`)

### Layout & Grid
- **Fixed navbar**: `fixed top-6 z-50` with max-width constraint `max-w-7xl left-1/2 -translate-x-1/2`
- **Bento layout**: Services section uses `grid grid-cols-1 md:grid-cols-3 gap-6` with `md:col-span-2` for larger cards
- **Sections**: All content centered via `max-w-7xl mx-auto px-6`

## Developer Workflows

### Running the Project
```bash
npm run dev          # Start dev server at localhost:3000
npm run build        # Production build (creates .next/)
npm start            # Start production server
npm run lint         # Run ESLint (eslint-config-next/core-web-vitals)
```

### ESLint Configuration
`eslint.config.mjs` uses:
- `eslint-config-next/core-web-vitals` for web vitals rules
- `eslint-config-next/typescript` for TypeScript support
- Ignores `.next/`, `out/`, `build/`, `next-env.d.ts`

## File Structure & Key Files
- `app/page.tsx` - Homepage component
- `app/about/page.tsx` - About page
- `app/contact/page.tsx` - Contact page  
- `components/Navbar.tsx` - Shared navigation component with theme/lang toggle
- `app/layout.tsx` - Root layout with custom fonts (Space Grotesk, Inter)
- `app/globals.css` - CSS theme variables + Tailwind imports
- `package.json` - Dependencies: framer-motion, lucide-react, @tailwindcss/postcss
- `tsconfig.json` - Strict mode enabled, `@/*` path alias for root

## Important Conventions
1. **Always preserve motion keys**: When adding new animated text, use `key={``identifier-${lang}``}` pattern
2. **Theme colors**: Use CSS variable classes, not hardcoded colors: `text-[var(--text-color)]` ✅ not `text-slate-900` ❌
3. **Section separators**: Each major UI section marked with `{/* N. SECTION NAME */}` comments
4. **State initialization**: User's dark theme pref not persisted (resets on page load)
5. **Responsive breakpoints**: Design mobile-first, use `md:` for desktop-only features

## Next Steps for Features
- **Add more pages**: Create `app/[page]/page.tsx` with Navbar import for consistent styling
- **Add animations**: Import Framer Motion hooks, use existing animation patterns in page components
- **Modify content**: Edit `content` object in each page file (must update both `en` and `fr`)
- **Styling changes**: Modify CSS variables in `app/globals.css` or Tailwind classes in JSX
- **Update Calendly**: Replace placeholder in `app/contact/page.tsx` with actual Calendly URL when ready
- **Add mobile navbar**: Create mobile menu component for small screens (currently hidden on mobile)
