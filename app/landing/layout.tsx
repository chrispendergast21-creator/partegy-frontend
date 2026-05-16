import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Partegy | Partnership Governance Platform',
  description: 'Govern strategic partnerships using proprietary health scoring, behavioral intelligence, and executive-level ecosystem visibility.',
  openGraph: {
    title: 'Partegy | Partnership Governance Platform',
    description: 'Govern strategic partnerships like assets with behavioral intelligence',
    images: ['/partnership-dashboard1.png'],
  },
};

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
