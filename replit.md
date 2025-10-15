# Handmade Crafts & Workshops Website

## Overview
A modern, multilingual Next.js website for a handmade crafts and workshops business. The site supports English, Dutch, and Turkish with automatic locale detection and manual language switching.

## Recent Changes (October 15, 2025)
- Created complete Next.js 15 application with App Router
- Implemented multilingual support using next-intl (EN, NL, TR)
- Built all main sections: Hero, About, Portfolio, Workshops, Contact
- Added form validation using React Hook Form and Zod
- Configured custom Tailwind CSS theme with natural color palette
- Set up automatic locale detection with manual language switcher

## Project Architecture

### Technology Stack
- **Framework**: Next.js 15.5.5 with App Router
- **Internationalization**: next-intl 4.3.12
- **Styling**: Tailwind CSS 3.x with custom theme
- **Forms**: React Hook Form + Zod validation
- **Language**: TypeScript
- **Fonts**: Playfair Display (headings), Lora (body), Inter (UI)

### Directory Structure
```
├── app/
│   ├── [locale]/          # Dynamic locale routes
│   │   ├── layout.tsx     # Root layout with i18n provider
│   │   └── page.tsx       # Homepage with all sections
│   └── globals.css        # Global styles and Tailwind
├── components/            # React components
│   ├── Header.tsx         # Navigation with language switcher
│   ├── Hero.tsx           # Hero section
│   ├── About.tsx          # About Me section
│   ├── Portfolio.tsx      # Portfolio gallery
│   ├── Workshops.tsx      # Workshops section
│   ├── WorkshopForm.tsx   # Workshop registration modal
│   ├── Contact.tsx        # Contact form
│   ├── Footer.tsx         # Footer
│   └── LanguageSwitcher.tsx  # Language dropdown
├── i18n/
│   └── request.ts         # i18n configuration
├── locales/               # Translation files
│   ├── en.json           # English translations
│   ├── nl.json           # Dutch translations
│   └── tr.json           # Turkish translations
├── middleware.ts          # Locale routing middleware
├── tailwind.config.ts     # Custom theme configuration
└── next.config.mjs        # Next.js + next-intl setup
```

### Key Features

#### Internationalization (i18n)
- **Supported Languages**: English (en), Dutch (nl), Turkish (tr)
- **Automatic Detection**: Detects user's browser/location locale
- **Manual Switching**: Dropdown with flag icons for language selection
- **Persistent Selection**: Language choice maintained during session
- **Middleware**: Routes requests to correct locale (/, /en, /nl, /tr)

#### Custom Design
- **Color Palette**:
  - Beige (#E8DED2) - Primary background
  - Terracotta (#D89580) - CTA and accents
  - Sage (#A8C8A8) - Secondary accents
  - Off-white (#FEFDFB) - Pure backgrounds
- **Typography**:
  - Playfair Display: Headings (elegant serif)
  - Lora: Body text (readable serif)
  - Inter: UI elements (modern sans-serif)
- **Animations**: Subtle fade-in and hover scale effects

#### Forms & Validation
- **Workshop Registration**: Captures name, email, phone, workshop selection, date, and message
- **Contact Form**: Name, email, subject, and message with validation
- **Validation**: Zod schemas with custom error messages in all languages
- **UX**: Success modals with localized messages

### Important Implementation Notes

#### i18n Configuration Issue & Fix
The project initially had 404 errors due to incorrect i18n configuration. The fix was:
- Changed `getRequestConfig` parameter from `{ locale }` to `{ requestLocale }`
- Added fallback to 'en' when locale is invalid or missing
- Updated middleware matcher to explicitly include root and locale paths

#### Tailwind CSS Version
- Using Tailwind CSS v3 (not v4) for compatibility
- PostCSS configured with tailwindcss and autoprefixer
- Uses `@tailwind` directives (not `@import 'tailwindcss'`)

#### Next.js 15 Compatibility
- Params are handled as `Promise<{ locale: string }>` in layouts/pages
- Using `setRequestLocale()` for static rendering enablement
- `dynamicParams = false` enforces strict locale validation
- `generateStaticParams()` pre-generates routes for all locales

### Development Commands
```bash
npm run dev      # Start development server on port 5000
npm run build    # Build for production
npm start        # Start production server
```

### Future Enhancements
- Backend API integration for form submissions
- Email notifications for workshop registrations
- CMS integration for easy content management
- Image optimization and lazy loading for portfolio
- Workshop calendar with availability tracking
- Admin dashboard for managing registrations
- Social media integration
- Blog section for creative tips and tutorials

### User Preferences
- Clean, well-documented code
- Modular component structure for easy updates
- Natural, elegant design aesthetic
- Full multilingual support (EN/NL/TR)
