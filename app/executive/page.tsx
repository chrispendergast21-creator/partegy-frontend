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
  Building2,
  Target,
  AlertCircle,
  CheckCircle,
  BarChart3,
  PieChart,
  Calendar,
  Clock,
  ArrowUp,
  ArrowDown,
  Star,
  Zap
} from 'lucide-react';

export default function ExecutivePage() {
  const router = useRouter();
  const { currentOrg } = useOrganization();
  const [partnerships, setPartnerships] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentOrg) {
      loadExecutiveData();
    }
  }, [currentOrg]);

  const loadExecutiveData = async () => {
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

  // Calculate executive-level metrics
  const portfolioMetrics = {
    totalRevenue: partnerships.reduce((sum, p) => sum + (p.revenue || 0), 0),
    totalPipeline: partnerships.reduce((sum, p) => sum + (p.pipeline || 0), 0),
    avgHealthScore: partnerships.length > 0 
      ? Math.round(partnerships.reduce((sum, p) => sum + (p.health_score || 0), 0) / partnerships.length)
      : 0,
    totalPartnerships: partnerships.length,
    healthyCount: partnerships.filter(p => p.health === 'healthy').length,
    atRiskCount: partnerships.filter(p => p.health === 'at-risk').length,
    criticalCount: partnerships.filter(p => p.health === 'critical').length,
    strategicCount: partnerships.filter(p => p.tier === 'Strategic').length,
    growthCount: partnerships.filter(p => p.tier === 'Growth').length,
    emergingCount: partnerships.filter(p => p.tier === 'Emerging').length
  };

  const topPerformers = partnerships
    .sort((a, b) => (b.health_score || 0) - (a.health_score || 0))
    .slice(0, 5);

  const atRiskPartnerships = partnerships
    .filter(p => p.health === 'at-risk' || p.health === 'critical')
    .sort((a, b) => (a.health_score || 0) - (b.health_score || 0))
    .slice(0, 5);

  const revenueByTier = {
    Strategic: partnerships.filter(p => p.tier === 'Strategic').reduce((sum, p) => sum + (p.revenue || 0), 0),
    Growth: partnerships.filter(p => p.tier === 'Growth').reduce((sum, p) => sum + (p.revenue || 0), 0),
    Emerging: partnerships.filter(p => p.tier === 'Emerging').reduce((sum, p) => sum + (p.revenue || 0), 0)
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
      {/* Executive Header */}
      <header className="bg-gradient-to-r from-[#1e293b] via-[#334155] to-[#475569] border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-[#60a5fa] to-[#60e1fa] bg-clip-text text-transparent mb-2">
                Executive Dashboard
              </h1>
              <p className="text-gray-300 text-lg">{currentOrg.name} Partnership Portfolio</p>
              <div className="flex items-center space-x-6 mt-4 text-gray-300">
                <div className="flex items-center space-x-2">
                  <Building2 className="w-5 h-5" />
                  <span>{portfolioMetrics.totalPartnerships} Partnerships</span>
                </div>
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-5 h-5" />
                  <span>${(portfolioMetrics.totalRevenue / 1000000).toFixed(1)}M Revenue</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Target className="w-5 h-5" />
                  <span>{portfolioMetrics.avgHealthScore} Avg Health</span>
                </div>
              </div>
            </div>
            <div className="text-right text-white">
              <div className="text-6xl font-bold">{portfolioMetrics.avgHealthScore}</div>
              <div className="text-lg">Portfolio Health</div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-8 py-8">
        {/* Executive KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <ExecutiveKPI
            icon={DollarSign}
            title="Total Revenue"
            value={`$${(portfolioMetrics.totalRevenue / 1000000).toFixed(1)}M`}
            change="+18.5%"
            trend="up"
            subtitle="vs. last quarter"
            gradient="from-green-400 to-green-600"
          />
          <ExecutiveKPI
            icon={TrendingUp}
            title="Pipeline Value"
            value={`$${(portfolioMetrics.totalPipeline / 1000000).toFixed(1)}M`}
            change="+12.3%"
            trend="up"
            subtitle="vs. last quarter"
            gradient="from-blue-400 to-blue-600"
          />
          <ExecutiveKPI
            icon={Building2}
            title="Portfolio Health"
            value={`${portfolioMetrics.avgHealthScore}/100`}
            change="-2.1%"
            trend="down"
            subtitle="needs attention"
            gradient="from-purple-400 to-purple-600"
          />
          <ExecutiveKPI
            icon={AlertCircle}
            title="At Risk"
            value={portfolioMetrics.atRiskCount + portfolioMetrics.criticalCount}
            change="+3"
            trend="up"
            subtitle="requiring intervention"
            gradient="from-red-400 to-red-600"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Portfolio Health Distribution */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Portfolio Health Overview</h2>
              <div className="grid grid-cols-3 gap-6">
                <HealthSegment
                  label="Healthy"
                  count={portfolioMetrics.healthyCount}
                  total={portfolioMetrics.totalPartnerships}
                  color="from-green-400 to-green-600"
                  revenue={partnerships.filter(p => p.health === 'healthy').reduce((sum, p) => sum + (p.revenue || 0), 0)}
                />
                <HealthSegment
                  label="At Risk"
                  count={portfolioMetrics.atRiskCount}
                  total={portfolioMetrics.totalPartnerships}
                  color="from-yellow-400 to-yellow-600"
                  revenue={partnerships.filter(p => p.health === 'at-risk').reduce((sum, p) => sum + (p.revenue || 0), 0)}
                />
                <HealthSegment
                  label="Critical"
                  count={portfolioMetrics.criticalCount}
                  total={portfolioMetrics.totalPartnerships}
                  color="from-red-400 to-red-600"
                  revenue={partnerships.filter(p => p.health === 'critical').reduce((sum, p) => sum + (p.revenue || 0), 0)}
                />
              </div>
            </div>

            {/* Top Performers */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Top Performing Partnerships</h2>
                <button 
                  onClick={() => router.push('/partnerships')}
                  className="text-[#60a5fa] hover:text-[#3b82f6] font-medium"
                >
                  View All
                </button>
              </div>
              <div className="space-y-4">
                {topPerformers.map((partnership, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                       onClick={() => router.push(`/partnership/${partnership.id}`)}>
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-400 to-green-600 flex items-center justify-center">
                        <span className="text-white font-bold">{partnership.name.charAt(0)}</span>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">{partnership.name}</div>
                        <div className="text-sm text-gray-600">{partnership.tier} • {partnership.partnership_type?.replace('_', ' ')}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-gray-900">{partnership.health_score}</div>
                      <div className="text-sm text-gray-600">Health Score</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Executive Sidebar */}
          <div className="space-y-6">
            {/* Revenue by Tier */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Revenue by Tier</h3>
              <div className="space-y-4">
                {Object.entries(revenueByTier).map(([tier, revenue]) => (
                  <div key={tier}>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-700">{tier}</span>
                      <span className="font-semibold text-gray-900">${((revenue as number) / 1000000).toFixed(1)}M</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="h-3 rounded-full bg-gradient-to-r from-[#60a5fa] to-[#60e1fa]"
                        style={{ width: `${portfolioMetrics.totalRevenue ? ((revenue as number) / portfolioMetrics.totalRevenue) * 100 : 0}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* At Risk Partnerships */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Partnerships Requiring Attention</h3>
              {atRiskPartnerships.length === 0 ? (
                <div className="text-center text-gray-500 py-4">
                  <CheckCircle className="w-8 h-8 mx-auto mb-2 text-green-500" />
                  <p>All partnerships healthy!</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {atRiskPartnerships.map((partnership, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-red-50 rounded-lg cursor-pointer hover:bg-red-100 transition-colors"
                         onClick={() => router.push(`/partnership/${partnership.id}`)}>
                      <div>
                        <div className="font-medium text-gray-900">{partnership.name}</div>
                        <div className="text-sm text-gray-600">Health: {partnership.health_score}</div>
                      </div>
                      <AlertCircle className="w-5 h-5 text-red-600" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Stats */}
            <div className="bg-gradient-to-r from-[#60a5fa] to-[#60e1fa] rounded-2xl shadow-xl p-6 text-white">
              <h3 className="font-bold mb-4">Portfolio Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-white/80">Strategic Tier</span>
                  <span className="font-semibold">{portfolioMetrics.strategicCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/80">Growth Tier</span>
                  <span className="font-semibold">{portfolioMetrics.growthCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/80">Emerging Tier</span>
                  <span className="font-semibold">{portfolioMetrics.emergingCount}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function ExecutiveKPI({ icon: Icon, title, value, change, trend, subtitle, gradient }: any) {
  const TrendIcon = trend === 'up' ? ArrowUp : ArrowDown;
  const trendColor = trend === 'up' ? 'text-green-600' : 'text-red-600';

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 hover:shadow-2xl transition-all duration-300 group">
      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
        <Icon className="w-7 h-7 text-white" />
      </div>
      <div className="text-3xl font-bold text-gray-900 mb-1">{value}</div>
      <div className="text-sm font-medium text-gray-600 mb-3">{title}</div>
      <div className={`flex items-center space-x-1 ${trendColor}`}>
        <TrendIcon className="w-4 h-4" />
        <span className="text-sm font-semibold">{change}</span>
        <span className="text-xs text-gray-500 ml-2">{subtitle}</span>
      </div>
    </div>
  );
}

function HealthSegment({ label, count, total, color, revenue }: any) {
  const percentage = total > 0 ? Math.round((count / total) * 100) : 0;

  return (
    <div className="text-center">
      <div className={`w-20 h-20 mx-auto rounded-full bg-gradient-to-r ${color} flex items-center justify-center mb-4`}>
        <span className="text-2xl font-bold text-white">{count}</span>
      </div>
      <div className="font-semibold text-gray-900 mb-1">{label}</div>
      <div className="text-sm text-gray-600 mb-2">{percentage}% of portfolio</div>
      <div className="text-xs text-gray-500">${(revenue / 1000000).toFixed(1)}M revenue</div>
    </div>
  );
}
