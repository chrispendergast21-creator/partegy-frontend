'use client';

import { useParams } from 'next/navigation';

export default function PartnershipDetailPage() {
  const params = useParams();
  
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Partnership Detail</h1>
      <p>Partnership ID: {params.id}</p>
      <p>This is a simple test page to verify routing works.</p>
    </div>
  );
}
