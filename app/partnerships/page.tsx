'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useOrganization } from '@/lib/useOrganization';
import axios from 'axios';
import { API_URL } from '@/lib/api';

export default function PartnershipsPage() {
  const router = useRouter();
  const { currentOrg } = useOrganization();
  const [partnerships, setPartnerships] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentOrg) {
      loadPartnerships();
    }
  }, [currentOrg]);

  const loadPartnerships = async () => {
    if (!currentOrg) return;
    
    try {
      const response = await axios.get(`${API_URL}/api/partnerships?org_id=${currentOrg.id}`);
      setPartnerships(response.data);
    } catch (error) {
      console.error('Failed to load partnerships:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!currentOrg) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No Organization Selected</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-[#1e293b] border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div>
            <h1 className="text-3xl font-bold text-white">Partnerships</h1>
            <p className="text-gray-400 mt-1">{currentOrg.name} - {partnerships.length} partnerships</p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-8 py-8">
        {loading ? (
          <div className="text-center py-12">Loading partnerships...</div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Partnership</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Health</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Revenue</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {partnerships.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{p.name}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        p.health === 'healthy' ? 'bg-green-100 text-green-800' :
                        p.health === 'at-risk' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {p.health} ({p.health_score})
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-900">
                      ${((p.revenue || 0) / 1000000).toFixed(2)}M
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {p.partnership_type?.replace('_', ' ')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
