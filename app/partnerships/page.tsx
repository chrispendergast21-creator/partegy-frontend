'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useOrganization } from '@/lib/useOrganization';
import { API_URL } from '@/lib/api';
import { PageNavigation } from '@/components/PageNavigation';
import {
  Building2,
  Search,
  Plus,
  TrendingUp,
  DollarSign
} from 'lucide-react';

export default function PartnershipsPage() {
  const router = useRouter();
  const { currentOrg } = useOrganization();
  const [partnerships, setPartnerships] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

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

  const mockPartnerships = [
    { id: 1, name: 'Acme Corporation', type: 'CO-SELL', tier: 'Strategic', health: 'A', revenue: 28500000, pipeline: 45000000 },
    { id: 2, name: 'Apex Dynamics', type: 'STRATEGIC_ALLIANCE', tier: 'Strategic', health: 'A', revenue: 18200000, pipeline: 32000000 },
    { id: 3, name: 'CloudTech Solutions', type: 'CO-SELL', tier: 'Growth', health: 'B', revenue: 12100000, pipeline: 28000000 },
    { id: 6, name: 'Enterprise Systems Co', type: 'CO-SELL', tier: 'Growth', health: 'B', revenue: 3500000, pipeline: 8000000 },
    { id: 9, name: 'NextGen Technologies', type: 'STRATEGIC_ALLIANCE', tier: 'Growth', health: 'C', revenue: 2800000, pipeline: 5000000 },
  ];

  const displayPartnerships = partnerships.length > 0 ? partnerships : mockPartnerships;

  const filteredPartnerships = displayPartnerships.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-950">
      <PageNavigation />

      <main className="max-w-7xl mx-auto px-8 py-8">
        {/* Page Title */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Partnership Portfolio</h1>
            <p className="text-slate-400 mt-1">Manage and monitor all your strategic partnerships</p>
          </div>
          <button
            onClick={() => router.push('/partnerships/new')}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Partnership</span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                <Building2 className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{displayPartnerships.length}</div>
                <div className="text-sm text-slate-400">Total Partnerships</div>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">24</div>
                <div className="text-sm text-slate-400">Healthy</div>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">$90.6M</div>
                <div className="text-sm text-slate-400">Total Revenue</div>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-orange-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">$289M</div>
                <div className="text-sm text-slate-400">Pipeline</div>
              </div>
            </div>
          </div>
        </div>

        {/* Search + Partnership Cards */}
        <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">All Partnerships</h2>
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search partnerships..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 bg-slate-800 border border-slate-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-slate-400 text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPartnerships.map((partnership) => (
              <div
                key={partnership.id}
                onClick={() => router.push(`/partnership/${partnership.id}`)}
                className="bg-slate-800 rounded-xl border border-slate-700 p-6 cursor-pointer hover:border-blue-500 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center">
                      <span className="text-white font-semibold">{partnership.name.charAt(0)}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{partnership.name}</h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full font-medium">
                          {partnership.type?.replace('_', ' ') || 'CO-SELL'}
                        </span>
                        <span className="text-xs text-slate-400">{partnership.tier || 'Growth'}</span>
                      </div>
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">{partnership.health || 'A'}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-400">Revenue</span>
                    <span className="font-semibold text-white">
                      ${((partnership.revenue || 0) / 1000000).toFixed(1)}M
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-400">Pipeline</span>
                    <span className="font-semibold text-white">
                      ${((partnership.pipeline || 0) / 1000000).toFixed(1)}M
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-700">
                  <div className="text-xs text-slate-500">30 days to milestone</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
