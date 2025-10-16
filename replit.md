# Handmade Crafts & Workshops Website

## Overview
A modern, multilingual Next.js website for a handmade crafts and workshops business. The site supports English, Dutch, and Turkish with automatic locale detection and manual language switching.

## Recent Changes (October 16, 2025)
- **Admin Authentication & User Management**: Implemented secure password-based authentication
  - Created admin login page at /admin/login with ADMIN_PASSWORD environment variable
  - Session-based authentication using HTTP-only cookies
  - Added admin_users table for managing administrative users
  - Built user management section with CRUD operations (add/delete users)
  - Enhanced admin UI with gradient stat cards, professional styling, and logout functionality
  - **Critical Fix**: Changed cookie path from '/admin' to '/' to enable authentication with /api/admin/* endpoints
- **Form Loading States**: Added localized "submitting" and "errorMessage" translations
  - Updated all three language files (EN, NL, TR) with form loading state translations
  - Workshop and contact forms now display proper loading states in user's language
- **Database Integration**: Implemented PostgreSQL database with Drizzle ORM
  - Created schema with `workshop_enrollments`, `contact_submissions`, and `admin_users` tables
  - Added API routes for form submissions (/api/workshop-enrollment, /api/contact-submission)
  - Built admin dashboard at /admin to view all submissions with authentication
  - Fixed WebSocket issue by switching from @neondatabase/serverless to postgres.js driver
  - All form data is now persisted to database with locale tracking
- **SEO Enhancements**: Added comprehensive meta tags for all three languages
  - Title, description, and keywords optimized for each locale
  - Open Graph tags for social media sharing (Facebook, LinkedIn)
  - Twitter Card tags for Twitter/X sharing
  - Structured data (JSON-LD) with Schema.org markup
  - Canonical URLs and language alternates for multilingual SEO
  - Viewport configuration and theme color
- Created complete Next.js 15 application with App Router
- Implemented multilingual support using next-intl (EN, NL, TR)
- Built all main sections: Hero, About, Portfolio, Workshops, Contact
- Added form validation using React Hook Form and Zod
- Configured custom Tailwind CSS theme with natural color palette
- Set up automatic locale detection with manual language switcher

## Project Architecture

### Technology Stack
- **Framework**: Next.js 15.5.5 with App Router
- **Database**: PostgreSQL with Drizzle ORM
- **Database Driver**: postgres.js (for development compatibility)
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
│   ├── admin/             # Admin dashboard
│   │   ├── page.tsx       # View workshop enrollments and contact submissions
│   │   └── login/
│   │       └── page.tsx   # Admin login page
│   ├── api/               # API routes
│   │   ├── workshop-enrollment/
│   │   │   └── route.ts   # Workshop enrollment submission endpoint
│   │   ├── contact-submission/
│   │   │   └── route.ts   # Contact form submission endpoint
│   │   └── admin/
│   │       ├── data/
│   │       │   └── route.ts  # Fetch all submissions for admin dashboard
│   │       ├── users/
│   │       │   └── route.ts  # User management CRUD endpoints
│   │       └── auth/
│   │           ├── login/
│   │           │   └── route.ts  # Admin login endpoint
│   │           ├── logout/
│   │           │   └── route.ts  # Admin logout endpoint
│   │           └── check/
│   │               └── route.ts  # Auth status check endpoint
│   └── globals.css        # Global styles and Tailwind
├── components/            # React components
│   ├── Header.tsx         # Navigation with language switcher
│   ├── Hero.tsx           # Hero section
│   ├── About.tsx          # About Me section
│   ├── Portfolio.tsx      # Portfolio gallery
│   ├── Workshops.tsx      # Workshops section
│   ├── WorkshopForm.tsx   # Workshop registration modal with DB integration
│   ├── Contact.tsx        # Contact form with DB integration
│   ├── Footer.tsx         # Footer
│   ├── LanguageSwitcher.tsx  # Language dropdown
│   ├── UserManagement.tsx # Admin user management component
│   └── StructuredData.tsx # JSON-LD structured data for SEO
├── server/
│   └── db.ts              # Database connection and Drizzle setup
├── shared/
│   └── schema.ts          # Drizzle ORM schema definitions
├── i18n/
│   └── request.ts         # i18n configuration
├── locales/               # Translation files
│   ├── en.json           # English translations
│   ├── nl.json           # Dutch translations
│   └── tr.json           # Turkish translations
├── middleware.ts          # Locale routing middleware
├── drizzle.config.ts      # Drizzle configuration
├── tailwind.config.ts     # Custom theme configuration
├── next.config.mjs        # Next.js + next-intl setup
└── .gitignore             # Git ignore rules for Next.js
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
- **Database Persistence**: All form submissions saved to PostgreSQL with locale tracking

#### Database & Admin Dashboard
- **Database**: PostgreSQL with three main tables
  - `workshop_enrollments`: Stores workshop registration data
  - `contact_submissions`: Stores contact form submissions
  - `admin_users`: Stores administrative user accounts
- **Admin Dashboard**: Available at `/admin` route (requires authentication)
  - Password-based authentication via `/admin/login`
  - Session-based security with HTTP-only cookies
  - Displays all workshop enrollments and contact submissions
  - Tabbed interface for easy navigation between enrollments, contacts, and users
  - Shows submission count with gradient stat cards
  - User management with add/delete capabilities
  - Logout functionality with secure session clearing

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

#### Database Driver Fix
- Initially used `@neondatabase/serverless` which caused WebSocket errors (`bufferUtil.mask is not a function`)
- Switched to `postgres.js` driver for better compatibility in Replit environment
- Connection configured with `max: 1` to prevent connection pooling issues in development

### Development Commands
```bash
npm run dev      # Start development server on port 5000
npm run build    # Build for production
npm start        # Start production server
```

### Future Enhancements
- **Email Notifications**: Implement email notifications for workshop registrations and contact submissions
- **Localized Error Messages**: Improve API error responses with localized error messages
- **CMS Integration**: Add content management system for easy content updates
- **Image Optimization**: Implement lazy loading and optimization for portfolio images
- **Workshop Calendar**: Add calendar with availability tracking and booking system
- **Social Media**: Integrate social media feeds and sharing
- **Blog Section**: Add blog for creative tips and tutorials
- **Database Monitoring**: Monitor postgres.js connection settings under load
- **Password Reset**: Add password reset functionality for admin users

### User Preferences
- Clean, well-documented code
- Modular component structure for easy updates
- Natural, elegant design aesthetic
- Full multilingual support (EN/NL/TR)
