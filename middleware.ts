import createMiddleware from 'next-intl/middleware';
import { locales } from './i18n';

export default createMiddleware({
  // List of all supported locales
  locales,
  // Default locale if none is matched
  defaultLocale: 'en',
  // Automatically detect user's locale from browser/location
  localeDetection: true,
});

export const config = {
  // Match all pathnames except for
  // - API routes
  // - _next (Next.js internals)
  // - static files
  matcher: ['/((?!api|_next|.*\\..*).*)']
};
