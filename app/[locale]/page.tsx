import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Portfolio from '@/components/Portfolio';
import Workshops from '@/components/Workshops';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import StructuredData from '@/components/StructuredData';

export default async function Home({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const baseUrl = process.env.REPLIT_DEV_DOMAIN 
    ? `https://${process.env.REPLIT_DEV_DOMAIN}` 
    : 'https://handmade-crafts-workshops.com';

  return (
    <main className="min-h-screen">
      <StructuredData locale={locale} baseUrl={baseUrl} />
      <Header />
      <Hero />
      <About />
      <Portfolio />
      <Workshops />
      <Contact />
      <Footer />
    </main>
  );
}
