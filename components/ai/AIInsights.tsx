'use client';
import { useState } from 'react';
import { Sparkles } from 'lucide-react';

interface AIInsightsProps {
  partnershipId: number;
  partnershipName: string;
}

export default function AIInsights({ partnershipId, partnershipName }: AIInsightsProps) {
  const [insights, setInsights] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  return (
    <div className="bg-purple-50 rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">AI Insights</h3>
      <button onClick={() => setInsights('Test')} className="px-4 py-2 bg-purple-600 text-white rounded">
        Generate
      </button>
      {insights && <p className="mt-4">{insights}</p>}
    </div>
  );
}
