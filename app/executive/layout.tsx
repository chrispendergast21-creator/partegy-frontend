import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Executive Dashboard | Partegy',
  description: 'Portfolio-level partnership intelligence with AI-powered insights, risk analysis, and strategic decision support.',
  openGraph: {
    title: 'Executive Dashboard | Partegy',
    description: 'Portfolio-level partnership intelligence for strategic decision-making',
    images: ['/executive-dashboard.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Executive Dashboard | Partegy',
    description: 'Portfolio-level partnership intelligence for strategic decision-making',
    images: ['/executive-dashboard.png'],
  }
};

export default function ExecutiveLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
