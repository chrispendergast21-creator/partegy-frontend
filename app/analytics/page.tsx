'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useOrganization } from '@/lib/useOrganization';
import { API_URL } from '@/lib/api';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Target,
  Building2,
  Calendar,
  BarChart3,
  AlertCircle,
  CheckCircle,
  ArrowUp,
  ArrowDown
} from 'lucide-react';

export default function AnalyticsPage() {
  const router = useRouter();
  const { currentOrg } = useOrganization();
  const [partnerships, setPartnerships] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('30d');

  useEffect(() => {
    if (currentOrg) {
      loadData();
    }
  }, [currentOrg]);

  const loadData = async () => {
    if (!currentOrg) return;
    
    try {
      const response = await axios.get(`${API_URL}/api/partnerships?org_id=${currentOrg.id}`);
      setPartnerships(response.data);
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  };

  const stats = {
    totalRevenue: partnerships.reduce((sum, p) => sum + (p.revenue || 0), 0),
    totalPipeline: partnerships.reduce((sum, p) => sum + (p.pipeline || 0), 0),
    avgHealthScore: partnerships.length > 0 
      ? Math.round(partnerships.reduce((sum, p) => sum + (p.health_score || 0), 0) / partnerships.length)
      : 0,
    healthyCount: partnerships.filter(p => p.health === 'healthy').length,
    atRiskCount: partnerships.filter(p => p.health === 'at-risk').length,
    criticalCount: partnerships.filter(p => p.health === 'critical').length,
    growthRate: 12.5,
    pipelineGrowth: 8.3
  };

  const healthDistribution = [
    { name: 'Healthy', count: stats.healthyCount, percentage: partnerships.length ? Math.round((stats.healthyCount / partnerships.length) * 100) : 0, color: 'from-emerald-400 to-emerald-600' },
    { name: 'At Risk', count: stats.atRiskCount, percentage: partnerships.length ? Math.round((stats.atRiskCount / partnerships.length) * 100) : 0, color: 'from-amber-400 to-amber-600' },
    { name: 'Critical', count: stats.criticalCount, percentage: partnerships.length ? Math.round((stats.criticalCount / partnerships.length) * 100) : 0, color: 'from-red-400 to-red-600' }
  ];

  const typeDistribution = [
    { type: 'Strategic Alliance', count: partnerships.filter(p => p.partnership_type === 'STRATEGIC_ALLIANCE').length, color: 'from-[#60a5fa] to-[#3b82f6]' },
    { type: 'Co-Sell', count: partnerships.filter(p => p.partnership_type === 'CO_SELL').length, color: 'from-[#60e1fa] to-[#06b6d4]' },
    { type: 'Referral', count: partnerships.filter(p => p.partnership_type === 'REFERRAL').length, color: 'from-[#34d399] to-[#10b981]' },
    { type: 'Delivery', count: partnerships.filter(p => p.partnership_type === 'DELIVERY').length, color: 'from-[#a855f7] to-[#8b5cf6]' }
  ];

  const topPerformers = partnerships
    .sort((a, b) => (b.health_score || 0) - (a.health_score || 0))
    .slice(0, 5);

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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="bg-gradient-to-r from-[#1e293b] via-[#334155] to-[#475569] border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-[#60a5fa] to-[#60e1fa] bg-clip-text text-transparent">
                Partnership Analytics
              </h1>
              <p className="text-gray-300 mt-1">{currentOrg.name} • {partnerships.length} partnerships</p>
            </div>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-4 py-2 bg-white/10 backdrop-blur-sm text-white border border-white/20 rounded-lg focus:ring-2 focus:ring-[#60a5fa]"
            >
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="90d">Last 90 Days</option>
              <option value="1y">Last Year</option>
            </select>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-8 py-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <KPICard
            icon={DollarSign}
            label="Total Revenue"
            value={`$${(stats.totalRevenue / 1000000).toFixed(1)}M`}
            change={`+${stats.growthRate}%`}
            trend="up"
            gradient="from-emerald-400 to-emerald-600"
          />
          <KPICard
            icon={TrendingUp}
            label="Pipeline Value"
            value={`$${(stats.totalPipeline / 1000000).toFixed(1)}M`}
            change={`+${stats.pipelineGrowth}%`}
            trend="up"
            gradient="from-[#60a5fa] to-[#3b82f6]"
          />
          <KPICard
            icon={Target}
            label="Avg Health Score"
            value={stats.avgHealthScore}
            change="-2.1%"
            trend="down"
            gradient="from-[#a855f7] to-[#8b5cf6]"
          />
          <KPICard
            icon={Building2}
            label="Active Partnerships"
            value={partnerships.length}
            change="+5"
            trend="up"
            gradient="from-[#f59e0b] to-[#d97706]"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Health Distribution */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Partnership Health Distribution</h2>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-emerald-500" />
                <span className="text-sm font-medium text-gray-600">Health Overview</span>
              </div>
            </div>
            <div className="space-y-6">
              {healthDistribution.map((item, idx) => (
                <HealthBar key={idx} {...item} total={partnerships.length} />
              ))}
            </div>
          </div>

          {/* Type Distribution */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Partnership Types</h2>
              <div className="flex items-center space-x-2">
                <BarChart3 className="w-5 h-5 text-[#60a5fa]" />
                <span className="text-sm font-medium text-gray-600">Distribution</span>
              </div>
            </div>
            <div className="space-y-4">
              {typeDistribution.map((item, idx) => (
                <div key={idx} className="group">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">{item.type}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-bold text-gray-900">{item.count}</span>
                      <span className="text-xs text-gray-500">
                        ({partnerships.length ? Math.round((item.count / partnerships.length) * 100) : 0}%)
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div
                      className={`h-3 rounded-full bg-gradient-to-r ${item.color} transition-all duration-700 group-hover:scale-105`}
                      style={{ width: `${partnerships.length ? (item.count / partnerships.length) * 100 : 0}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Health Dimensions */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Health Dimension Analysis</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            <HealthDimension name="Executive" score={85} />
            <HealthDimension name="Value" score={78} />
            <HealthDimension name="Revenue" score={92} />
            <HealthDimension name="Operations" score={71} />
            <HealthDimension name="Innovation" score={65} />
            <HealthDimension name="Risk" score={88} />
          </div>
        </div>

        {/* Top Performers */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Top Performing Partnerships</h2>
            <button 
              onClick={() => router.push('/partnerships')}
              className="text-[#60a5fa] hover:text-[#3b82f6] font-medium text-sm flex items-center space-x-1"
            >
              <span>View All</span>
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Partnership</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Health</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Revenue</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Pipeline</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Type</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {topPerformers.map((p, idx) => (
                  <tr key={idx} className="hover:bg-gradient-to-r hover:from-[#60a5fa]/5 hover:to-[#60e1fa]/5 transition-colors cursor-pointer"
                      onClick={() => router.push(`/partnership/${p.id}`)}>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#60a5fa] to-[#60e1fa] flex items-center justify-center">
                          <span className="text-white font-semibold text-sm">
                            {(p.name || 'P').charAt(0)}
                          </span>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{p.name}</div>
                          <div className="text-xs text-gray-500">{p.tier}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div
                            className="h-2 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600"
                            style={{ width: `${p.health_score || 0}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-semibold text-gray-900">{p.health_score}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-semibold text-gray-900">
                        ${((p.revenue || 0) / 1000000).toFixed(2)}M
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-600">
                        ${((p.pipeline || 0) / 1000000).toFixed(2)}M
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 text-xs rounded-full bg-gradient-to-r from-[#60a5fa]/20 to-[#60e1fa]/20 text-[#60a5fa] font-medium">
                        {p.partnership_type?.replace('_', ' ')}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

function KPICard({ icon: Icon, label, value, change, trend, gradient }: any) {
  const TrendIcon = trend === 'up' ? ArrowUp : ArrowDown;
  const trendColor = trend === 'up' ? 'text-emerald-600' : 'text-red-600';

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 hover:shadow-2xl transition-all duration-300 group">
      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
        <Icon className="w-7 h-7 text-white" />
      </div>
      <div className="text-3xl font-bold text-gray-900 mb-1">{value}</div>
      <div className="text-sm font-medium text-gray-600 mb-3">{label}</div>
      <div className={`flex items-center space-x-1 ${trendColor}`}>
        <TrendIcon className="w-4 h-4" />
        <span className="text-sm font-semibold">{change}</span>
      </div>
    </div>
  );
}

function HealthBar({ name, count, percentage, color, total }: any) {
  return (
    <div className="group">
      <div className="flex justify-between items-center mb-3">
        <span className="text-sm font-semibold text-gray-700">{name}</span>
        <div className="flex items-center space-x-2">
          <span className="text-lg font-bold text-gray-900">{count}</span>
          <span className="text-sm text-gray-500">({percentage}%)</span>
        </div>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
        <div
          className={`h-4 rounded-full bg-gradient-to-r ${color} transition-all duration-700 group-hover:scale-105`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}

function HealthDimension({ name, score }: any) {
  const getColor = (score: number) => {
    if (score >= 80) return 'from-emerald-400 to-emerald-600';
    if (score >= 60) return 'from-amber-400 to-amber-600';
    return 'from-red-400 to-red-600';
  };

  return (
    <div className="text-center group">
      <div className="relative w-20 h-20 mx-auto mb-3">
        <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
          <path
            className="text-gray-200"
            stroke="currentColor"
            strokeWidth="3"
            fill="none"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <path
            className={`bg-gradient-to-r ${getColor(score)}`}
            stroke="url(#gradient)"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
            strokeDasharray={`${score}, 100`}
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#60a5fa" />
              <stop offset="100%" stopColor="#60e1fa" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-bold text-gray-900">{score}</span>
        </div>
      </div>
      <div className="text-xs font-medium text-gray-600 uppercase tracking-wide">{name}</div>
    </div>
  );
}
