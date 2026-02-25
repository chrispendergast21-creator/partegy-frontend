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

  // Mock partnerships for demo
  const mockPartnerships = [
    { id: 1, name: 'TechFlow Systems', type: 'CO-SELL', tier: 'Strategic', health: 'A', revenue: 28500000, pipeline: 45000000 },
    { id: 2, name: 'DataSync Partners', type: 'STRATEGIC_ALLIANCE', tier: 'Strategic', health: 'A', revenue: 18200000, pipeline: 32000000 },
    { id: 3, name: 'CloudTech Solutions', type: 'CO-SELL', tier: 'Growth', health: 'B', revenue: 12100000, pipeline: 28000000 },
  ];

  const displayPartnerships = partnerships.length > 0 ? partnerships : mockPartnerships;

  if (!currentOrg) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Building2 className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No Organization Selected</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* CONSISTENT HEADER ACROSS ALL PAGES */}
      <header className="bg-slate-900 border-b-2 border-slate-700">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-12">
              <div>
                <h1 className="text-2xl font-semibold text-white">Partnerships</h1>
                <p className="text-slate-300 text-sm mt-1">{currentOrg.name} • Partnership Portfolio</p>
              </div>
              <PageNavigation />
            </div>
            <div className="text-right text-white">
              <div className="text-5xl font-bold">$90.6M</div>
              <div className="text-slate-300 text-sm">Partnership Revenue YTD</div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-8 py-8">
        {/* Action Bar */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search partnerships..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-700 focus:border-transparent"
              />
            </div>
          </div>
          <button 
            onClick={() => router.push('/partnerships/new')}
            className="flex items-center space-x-2 px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Partnership</span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-xl bg-blue-500 flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{displayPartnerships.length}</div>
                <div className="text-sm text-gray-600">Total Partnerships</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-xl bg-green-500 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">24</div>
                <div className="text-sm text-gray-600">Healthy</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-xl bg-purple-500 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">$90.6M</div>
                <div className="text-sm text-gray-600">Total Revenue</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-xl bg-orange-500 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">$289M</div>
                <div className="text-sm text-gray-600">Pipeline</div>
              </div>
            </div>
          </div>
        </div>

        {/* Partnership Cards */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Partnership Portfolio</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayPartnerships.map((partnership) => (
              <div 
                key={partnership.id}
                onClick={() => router.push(`/partnership/${partnership.id}`)}
                className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 cursor-pointer hover:shadow-xl transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center">
                      <span className="text-white font-semibold">{partnership.name.charAt(0)}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{partnership.name}</h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-medium">
                          {partnership.type?.replace('_', ' ') || 'CO-SELL'}
                        </span>
                        <span className="text-xs text-gray-500">{partnership.tier || 'Growth'}</span>
                      </div>
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">{partnership.health || 'A'}</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Revenue</span>
                    <span className="font-semibold text-gray-900">
                      ${((partnership.revenue || 0) / 1000000).toFixed(1)}M
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Pipeline</span>
                    <span className="font-semibold text-gray-900">
                      ${((partnership.pipeline || 0) / 1000000).toFixed(1)}M
                    </span>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="text-xs text-gray-500">30 days to milestone</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
