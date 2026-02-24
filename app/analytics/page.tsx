'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useOrganization } from '@/lib/useOrganization';
import { API_URL } from '@/lib/api';
import { PageNavigation } from '@/components/PageNavigation';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Building2,
  Target,
  AlertTriangle,
  BarChart3,
  Calendar,
  Filter,
  Download
} from 'lucide-react';

export default function AnalyticsPage() {
  const router = useRouter();
  const { currentOrg } = useOrganization();
  const [partnerships, setPartnerships] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentOrg) {
      loadAnalyticsData();
    }
  }, [currentOrg]);

  const loadAnalyticsData = async () => {
    if (!currentOrg) return;
    
    try {
      const response = await axios.get(`${API_URL}/api/partnerships?org_id=${currentOrg.id}`);
      setPartnerships(response.data);
    } catch (error) {
      console.error('Failed to load analytics data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!currentOrg) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <Building2 className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No Organization Selected</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header with Navigation */}
      <header className="bg-gradient-to-r from-[#1e293b] via-[#334155] to-[#475569] border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-6">
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-[#60a5fa] to-[#60e1fa] bg-clip-text text-transparent">
                  Analytics
                </h1>
              </div>
              <PageNavigation />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-gray-300">{currentOrg.name} Partnership Intelligence</p>
            
            <div className="flex items-center space-x-4">
              <select className="px-4 py-2 bg-white/10 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#60a5fa]">
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
                <option value="1y">Last year</option>
              </select>
              <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-[#60a5fa] to-[#60e1fa] text-white rounded-lg hover:shadow-lg transition-all">
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-8 py-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center mb-4">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">$90.6M</div>
            <div className="text-sm font-medium text-gray-600 mb-3">Total Revenue</div>
            <div className="flex items-center space-x-1 text-green-600">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm font-semibold">+18.5%</span>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center mb-4">
              <Target className="w-6 h-6 text-white" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">$289M</div>
            <div className="text-sm font-medium text-gray-600 mb-3">Pipeline Value</div>
            <div className="flex items-center space-x-1 text-green-600">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm font-semibold">+12.3%</span>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center mb-4">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">78/100</div>
            <div className="text-sm font-medium text-gray-600 mb-3">Avg Health Score</div>
            <div className="flex items-center space-x-1 text-red-600">
              <TrendingDown className="w-4 h-4" />
              <span className="text-sm font-semibold">-2.1%</span>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center mb-4">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">34</div>
            <div className="text-sm font-medium text-gray-600 mb-3">Active Partnerships</div>
            <div className="flex items-center space-x-1 text-green-600">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm font-semibold">+8</span>
            </div>
          </div>
        </div>

        {/* Analytics Charts Placeholder */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Health Distribution</h2>
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
              <div className="text-center text-gray-500">
                <BarChart3 className="w-12 h-12 mx-auto mb-2" />
                <div className="text-sm">Health Score Analytics</div>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Revenue Trends</h2>
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
              <div className="text-center text-gray-500">
                <TrendingUp className="w-12 h-12 mx-auto mb-2" />
                <div className="text-sm">Revenue Performance</div>
              </div>
            </div>
          </div>
        </div>

        {/* Top Performers */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Top Performing Partnerships</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Partner</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Health Score</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Revenue</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Type</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-4 font-medium text-gray-900">TechFlow Systems</td>
                  <td className="px-4 py-4 text-lg font-bold text-gray-900">92</td>
                  <td className="px-4 py-4 font-medium text-gray-900">$28.5M</td>
                  <td className="px-4 py-4 text-sm text-gray-600">Strategic Alliance</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-4 font-medium text-gray-900">DataSync Partners</td>
                  <td className="px-4 py-4 text-lg font-bold text-gray-900">89</td>
                  <td className="px-4 py-4 font-medium text-gray-900">$18.2M</td>
                  <td className="px-4 py-4 text-sm text-gray-600">Co-Sell</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-4 font-medium text-gray-900">CloudTech Solutions</td>
                  <td className="px-4 py-4 text-lg font-bold text-gray-900">87</td>
                  <td className="px-4 py-4 font-medium text-gray-900">$12.1M</td>
                  <td className="px-4 py-4 text-sm text-gray-600">Strategic Alliance</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
