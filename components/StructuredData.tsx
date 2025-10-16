import { useTranslations } from 'next-intl';

export default function StructuredData({ locale, baseUrl }: { locale: string; baseUrl: string }) {
  const t = useTranslations('meta');
  const hero = useTranslations('hero');

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${baseUrl}/#organization`,
        name: 'Handmade Crafts & Workshops',
        url: baseUrl,
        logo: {
          '@type': 'ImageObject',
          url: `${baseUrl}/logo.png`,
        },
        sameAs: [
          'https://facebook.com/handmadecrafts',
          'https://instagram.com/handmadecrafts',
          'https://pinterest.com/handmadecrafts'
        ],
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'Customer Service',
          availableLanguage: ['English', 'Dutch', 'Turkish']
        }
      },
      {
        '@type': 'WebSite',
        '@id': `${baseUrl}/#website`,
        url: baseUrl,
        name: t('title'),
        description: t('description'),
        publisher: {
          '@id': `${baseUrl}/#organization`
        },
        inLanguage: locale,
        potentialAction: {
          '@type': 'SearchAction',
          target: `${baseUrl}/?s={search_term_string}`,
          'query-input': 'required name=search_term_string'
        }
      },
      {
        '@type': 'WebPage',
        '@id': `${baseUrl}/${locale}/#webpage`,
        url: `${baseUrl}/${locale}`,
        name: t('title'),
        description: t('description'),
        isPartOf: {
          '@id': `${baseUrl}/#website`
        },
        inLanguage: locale,
        breadcrumb: {
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: `${baseUrl}/${locale}`
            }
          ]
        }
      },
      {
        '@type': 'LocalBusiness',
        '@id': `${baseUrl}/#business`,
        name: 'Handmade Crafts & Workshops',
        image: `${baseUrl}/og-image.jpg`,
        description: t('description'),
        url: baseUrl,
        priceRange: '$$',
        servesCuisine: 'Art & Crafts',
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'NL'
        },
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            opens: '09:00',
            closes: '17:00'
          }
        ]
      },
      {
        '@type': 'Course',
        name: hero('name'),
        description: t('description'),
        provider: {
          '@type': 'Organization',
          name: 'Handmade Crafts & Workshops',
          sameAs: baseUrl
        },
        hasCourseInstance: {
          '@type': 'CourseInstance',
          courseMode: 'onsite',
          location: {
            '@type': 'Place',
            address: {
              '@type': 'PostalAddress',
              addressCountry: 'NL'
            }
          }
        }
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
