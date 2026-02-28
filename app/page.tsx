import type { Metadata } from 'next';
import Hero from '@/components/hero/Hero';
import FeaturesSection from '@/components/features/FeaturesSection';
import TestimonialsSection from '@/components/testimonials/TestimonialsSection';

export const metadata: Metadata = {
  title: 'StellarSpend — Track your Stellar transactions',
  description:
    'StellarSpend is a financial management platform for the unbanked and underbanked, built on the Stellar blockchain. Track spending, set budgets, and reach your savings goals.',
  openGraph: {
    title: 'StellarSpend',
    description: 'Blockchain-powered budgeting for everyone.',
    url: 'https://stellarspend.app',
    siteName: 'StellarSpend',
  },
};

export default function HomePage() {
  return (
    <main id="main-content">
      <Hero />
      <FeaturesSection />
      <TestimonialsSection />
    </main>
  );
}