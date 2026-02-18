'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import { API_URL } from '@/lib/api';
import {
  ArrowLeft,
  Building2,
  TrendingUp,
  DollarSign,
  Calendar,
  Target
} from 'lucide-react';

export default function PartnershipDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [partnership, setPartnership] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPartnership();
  }, [params.id]);

  const loadPartnership = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/partnerships/${params.id}`);
      setPartnership(response.data);
    } catch (error) {
      console.error('Failed to load partnership:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading partnership details...</div>
      </div>
    );
  }

  if (!partnership) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-xl text-gray-600">Partnership not found</div>
      </div>
    );
  }

  const getHealthColor = (health: string) => {
    switch (health) {
      case 'healthy': return 'from-green-400 to-green-600';
      case 'at-risk': return 'from-yellow-400 to-yellow-600';
      case 'critical': return 'from-red-400 to-red-600';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#1e293b] via-[#334155] to-[#475569] border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push('/partnerships')}
                className="p-2 text-gray-300 hover:bg-white/10 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${getHealthColor(partnership.health)} flex items-center justify-center`}>
                <span className="text-2xl font-bold text-white">
                  {partnership.name.charAt(0)}
                </span>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-[#60a5fa] to-[#60e1fa] bg-clip-text text-transparent">
                  {partnership.name}
                </h1>
                <p className="text-gray-300 mt-1">
                  {partnership.partnership_type?.replace('_', ' ')} • {partnership.tier} Tier • {partnership.health}
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-8 py-8">
        {/* Health Score Banner */}
        <div className={`bg-gradient-to-r ${getHealthColor(partnership.health)} rounded-2xl shadow-xl p-8 mb-8 text-white`}>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-6xl font-bold mb-2">{partnership.health_score}</div>
              <div className="text-xl font-semibold uppercase tracking-wide mb-2">Overall Health Score</div>
              <p className="text-white/80 max-w-md">
                {partnership.strategic_objective}
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold mb-1">${((partnership.revenue || 0) / 1000000).toFixed(1)}M</div>
              <div className="text-white/80 mb-4">Annual Revenue</div>
              <div className="flex items-center space-x-4">
                <div>
                  <div className="text-lg font-semibold">{partnership.days_to_milestone}</div>
                  <div className="text-sm text-white/80">Days to Milestone</div>
                </div>
                <div>
                  <div className="text-lg font-semibold">${((partnership.pipeline || 0) / 1000000).toFixed(1)}M</div>
                  <div className="text-sm text-white/80">Pipeline</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-[#60a5fa] to-[#60e1fa] flex items-center justify-center mb-4">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              ${((partnership.revenue || 0) / 1000000).toFixed(1)}M
            </div>
            <div className="text-sm text-gray-600">Revenue</div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-green-400 to-green-600 flex items-center justify-center mb-4">
              <Target className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              ${((partnership.pipeline || 0) / 1000000).toFixed(1)}M
            </div>
            <div className="text-sm text-gray-600">Pipeline</div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-purple-400 to-purple-600 flex items-center justify-center mb-4">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{partnership.days_to_milestone}</div>
            <div className="text-sm text-gray-600">Days to Milestone</div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-orange-400 to-orange-600 flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{partnership.health_score}</div>
            <div className="text-sm text-gray-600">Health Score</div>
          </div>
        </div>

        {/* Partnership Details */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Partnership Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <div className="text-sm text-gray-600">Partnership Type</div>
                <div className="font-semibold text-gray-900">{partnership.partnership_type?.replace('_', ' ')}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Tier</div>
                <div className="font-semibold text-gray-900">{partnership.tier}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Status</div>
                <div className="font-semibold text-gray-900">{partnership.status}</div>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <div className="text-sm text-gray-600">Next Milestone</div>
                <div className="font-semibold text-gray-900">{partnership.next_milestone}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Strategic Objective</div>
                <div className="font-semibold text-gray-900">{partnership.strategic_objective}</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
