'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useOrganization } from '@/lib/useOrganization';
import { API_URL } from '@/lib/api';
import {
  TrendingUp,
  TrendingDown,
  ArrowRight,
  DollarSign,
  Building2,
  Target,
  AlertCircle,
  Users,
  Activity,
  Calendar,
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight,
  Minus
} from 'lucide-react';

export default function ExecutivePage() {
  const router = useRouter();
  const { currentOrg } = useOrganization();
  const [partnerships, setPartnerships] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedHealthFilter, setSelectedHealthFilter] = useState<string>('all');

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

  // Executive-level calculations
  const portfolioMetrics = {
    // Portfolio Health Overview
    overallHealthScore: partnerships.length > 0 
      ? Math.round(partnerships.reduce((sum, p) => sum + (p.health_score || 0), 0) / partnerships.length)
      : 0,
    healthDistribution: {
      healthy: partnerships.filter(p => p.health === 'healthy').length,
      watchlist: partnerships.filter(p => p.health === 'at-risk').length,
      atRisk: partnerships.filter(p => p.health === 'critical').length
    },
    
    // Revenue & Impact
    totalRevenue: partnerships.reduce((sum, p) => sum + (p.revenue || 0), 0),
    totalPipeline: partnerships.reduce((sum, p) => sum + (p.pipeline || 0), 0),
    revenueGrowth: 18.5, // Mock trend
    
    // Strategic metrics
    strategicPartnerships: partnerships.filter(p => p.tier === 'Strategic').length,
    onTrackOKRs: 78, // Mock percentage
    
    // Investment metrics
    avgROI: 165, // Mock percentage
    resourceEfficiency: 142 // Mock index
  };

  const getHealthPercentage = (health: string) => {
    if (partnerships.length === 0) return 0;
    return Math.round((portfolioMetrics.healthDistribution[health as keyof typeof portfolioMetrics.healthDistribution] / partnerships.length) * 100);
  };

  // Risk & Drift Signals - Top 5 requiring attention
  const riskyPartnerships = partnerships
    .filter(p => p.health === 'at-risk' || p.health === 'critical' || (p.health_score && p.health_score < 70))
    .sort((a, b) => {
      // Sort by revenue exposure (higher revenue = higher priority)
      const revenueA = (a.revenue || 0);
      const revenueB = (b.revenue || 0);
      return revenueB - revenueA;
    })
    .slice(0, 5);

  // Strategic drift alerts
  const driftAlerts = [
    {
      type: 'OKR Miss',
      partner: partnerships.find(p => p.tier === 'Strategic')?.name || 'TechCorp Solutions',
      issue: 'Q1 revenue milestone 25% behind target',
      severity: 'high',
      daysOpen: 12
    },
    {
      type: 'Engagement Decline',
      partner: partnerships.find(p => p.health === 'at-risk')?.name || 'DataFlow Systems',
      issue: 'Executive meetings cancelled 3x in past month',
      severity: 'medium',
      daysOpen: 18
    },
    {
      type: 'Initiative Stagnation',
      partner: partnerships[2]?.name || 'CloudSync Partners',
      issue: 'Joint product roadmap unchanged for 6 months',
      severity: 'medium',
      daysOpen: 45
    }
  ];

  // ROI Analysis
  const roiPartners = {
    overperforming: partnerships.filter(p => (p.revenue || 0) > 2000000).length,
    underperforming: partnerships.filter(p => (p.revenue || 0) < 500000 && p.tier === 'Strategic').length
  };

  // Forecasting
  const forecast = {
    likelyDecline: partnerships.filter(p => p.health_score && p.health_score < 60).length,
    revenueAtRisk: partnerships
      .filter(p => p.health_score && p.health_score < 60)
      .reduce((sum, p) => sum + (p.revenue || 0), 0)
  };

  const filteredPartnerships = selectedHealthFilter === 'all' 
    ? partnerships 
    : partnerships.filter(p => {
        if (selectedHealthFilter === 'watchlist') return p.health === 'at-risk';
        return p.health === selectedHealthFilter;
      });

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
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Partnership Portfolio</h1>
              <p className="text-gray-300 text-lg">{currentOrg.name} • Executive Dashboard</p>
            </div>
            <div className="text-right text-white">
              <div className="text-6xl font-bold">{portfolioMetrics.overallHealthScore}</div>
              <div className="text-lg flex items-center justify-end">
                <TrendingUp className="w-5 h-5 mr-1 text-green-400" />
                Portfolio Health
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-8 py-8">
        {/* 1️⃣ Portfolio Health Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <div className="lg:col-span-2 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Portfolio Health Distribution</h2>
            <div className="grid grid-cols-3 gap-4">
              <HealthDistributionCard
                label="Healthy"
                count={portfolioMetrics.healthDistribution.healthy}
                percentage={getHealthPercentage('healthy')}
                color="from-green-400 to-green-600"
                onClick={() => setSelectedHealthFilter('healthy')}
              />
              <HealthDistributionCard
                label="Watchlist"
                count={portfolioMetrics.healthDistribution.watchlist}
                percentage={getHealthPercentage('watchlist')}
                color="from-yellow-400 to-yellow-600"
                onClick={() => setSelectedHealthFilter('watchlist')}
              />
              <HealthDistributionCard
                label="At Risk"
                count={portfolioMetrics.healthDistribution.atRisk}
                percentage={getHealthPercentage('atRisk')}
                color="from-red-400 to-red-600"
                onClick={() => setSelectedHealthFilter('atRisk')}
              />
            </div>
          </div>

          {/* 2️⃣ Revenue & Impact Snapshot */}
          <div className="lg:col-span-2 grid grid-cols-2 gap-4">
            <ExecutiveMetricCard
              icon={DollarSign}
              title="Partner Revenue"
              value={`$${(portfolioMetrics.totalRevenue / 1000000).toFixed(1)}M`}
              subtitle="YTD vs $45M Target"
              trend="up"
              trendValue="+18.5%"
              color="from-green-400 to-green-600"
            />
            <ExecutiveMetricCard
              icon={Target}
              title="Pipeline Value"
              value={`$${(portfolioMetrics.totalPipeline / 1000000).toFixed(1)}M`}
              subtitle="3.2x Revenue Multiple"
              trend="up"
              trendValue="+12%"
              color="from-blue-400 to-blue-600"
            />
            <ExecutiveMetricCard
              icon={Building2}
              title="Portfolio ROI"
              value={`${portfolioMetrics.avgROI}%`}
              subtitle="vs 145% Target"
              trend="up"
              trendValue="+20pts"
              color="from-purple-400 to-purple-600"
            />
            <ExecutiveMetricCard
              icon={Users}
              title="Strategic OKRs"
              value={`${portfolioMetrics.onTrackOKRs}%`}
              subtitle="On Track This Quarter"
              trend="down"
              trendValue="-5pts"
              color="from-orange-400 to-orange-600"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* 3️⃣ Risk & Drift Signals */}
          <div className="space-y-6">
            {/* Partnerships Requiring Executive Attention */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">Executive Attention Required</h2>
                <span className="text-sm text-red-600 font-medium">Top 5 by Revenue Exposure</span>
              </div>
              <div className="space-y-3">
                {riskyPartnerships.map((partnership, idx) => (
                  <AttentionItem
                    key={idx}
                    rank={idx + 1}
                    partnerName={partnership.name}
                    healthScore={partnership.health_score}
                    revenueExposure={partnership.revenue || 0}
                    issue="Health deterioration trend"
                    onClick={() => router.push(`/partnership/${partnership.id}`)}
                  />
                ))}
              </div>
            </div>

            {/* Strategic Drift Alerts */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Strategic Drift Alerts</h2>
              <div className="space-y-3">
                {driftAlerts.map((alert, idx) => (
                  <DriftAlert key={idx} alert={alert} />
                ))}
              </div>
            </div>
          </div>

          {/* 4️⃣ Resource Allocation Insights & 5️⃣ Strategic Alignment */}
          <div className="space-y-6">
            {/* Investment vs Return */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Resource Allocation Insights</h2>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{roiPartners.overperforming}</div>
                  <div className="text-sm text-green-800">Above Expected ROI</div>
                  <div className="text-xs text-green-600">Consider increased investment</div>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">{roiPartners.underperforming}</div>
                  <div className="text-sm text-red-800">Below Expected ROI</div>
                  <div className="text-xs text-red-600">Requires intervention</div>
                </div>
              </div>
              <div className="text-center text-sm text-gray-600">
                Resource Efficiency Index: <span className="font-semibold text-gray-900">{portfolioMetrics.resourceEfficiency}%</span>
              </div>
            </div>

            {/* If No Action Taken Forecast */}
            <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl shadow-xl border-2 border-red-200 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
                <h2 className="text-xl font-bold text-red-900">"If No Action Taken" Forecast</h2>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-red-800">Partnerships likely to decline next quarter:</span>
                  <span className="text-2xl font-bold text-red-900">{forecast.likelyDecline}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-red-800">Revenue at risk:</span>
                  <span className="text-2xl font-bold text-red-900">
                    ${(forecast.revenueAtRisk / 1000000).toFixed(1)}M
                  </span>
                </div>
                <div className="text-sm text-red-700 mt-3 p-3 bg-red-100 rounded-lg">
                  <strong>Recommendation:</strong> Immediate executive intervention required for partnerships with health scores below 60.
                </div>
              </div>
            </div>

            {/* Strategic Alignment View */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Strategic Alignment</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Partnership OKRs On Track</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div className="w-[78%] bg-green-500 rounded-full h-2"></div>
                    </div>
                    <span className="text-lg font-bold text-gray-900">78%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Strategic Initiatives Progress</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div className="w-[65%] bg-yellow-500 rounded-full h-2"></div>
                    </div>
                    <span className="text-lg font-bold text-gray-900">65%</span>
                  </div>
                </div>
                <div className="text-sm text-gray-600 mt-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <strong>Attention:</strong> 22% of partnership OKRs are off-track. Strategic initiative execution needs acceleration.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 6️⃣ Portfolio Breakdown & Drill-In Table */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Partnership Portfolio</h2>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setSelectedHealthFilter('all')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedHealthFilter === 'all' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All ({partnerships.length})
              </button>
              <button 
                onClick={() => setSelectedHealthFilter('healthy')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedHealthFilter === 'healthy' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Healthy ({portfolioMetrics.healthDistribution.healthy})
              </button>
              <button 
                onClick={() => setSelectedHealthFilter('watchlist')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedHealthFilter === 'watchlist' ? 'bg-yellow-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Watchlist ({portfolioMetrics.healthDistribution.watchlist})
              </button>
              <button 
                onClick={() => setSelectedHealthFilter('atRisk')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedHealthFilter === 'atRisk' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                At Risk ({portfolioMetrics.healthDistribution.atRisk})
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Partner</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Health</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Revenue</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Strategic Priority</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Last Executive Touch</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Trend</th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredPartnerships
                  .sort((a, b) => (b.revenue || 0) - (a.revenue || 0))
                  .map((partnership, idx) => (
                    <PartnershipTableRow
                      key={partnership.id}
                      partnership={partnership}
                      onClick={() => router.push(`/partnership/${partnership.id}`)}
                    />
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

// Component Definitions
function HealthDistributionCard({ label, count, percentage, color, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className="text-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all cursor-pointer group"
    >
      <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-r ${color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
        <span className="text-2xl font-bold text-white">{count}</span>
      </div>
      <div className="font-semibold text-gray-900 mb-1">{label}</div>
      <div className="text-2xl font-bold text-gray-900">{percentage}%</div>
      <div className="text-xs text-gray-500">of portfolio</div>
    </button>
  );
}

function ExecutiveMetricCard({ icon: Icon, title, value, subtitle, trend, trendValue, color }: any) {
  const TrendIcon = trend === 'up' ? ArrowUpRight : trend === 'down' ? ArrowDownRight : Minus;
  const trendColor = trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-gray-600';

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-4 hover:shadow-xl transition-all">
      <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${color} flex items-center justify-center mb-3`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div className="text-2xl font-bold text-gray-900 mb-1">{value}</div>
      <div className="text-sm font-medium text-gray-600 mb-2">{title}</div>
      <div className="text-xs text-gray-500 mb-2">{subtitle}</div>
      <div className={`flex items-center space-x-1 ${trendColor}`}>
        <TrendIcon className="w-4 h-4" />
        <span className="text-xs font-semibold">{trendValue}</span>
      </div>
    </div>
  );
}

function AttentionItem({ rank, partnerName, healthScore, revenueExposure, issue, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between p-3 bg-red-50 border-l-4 border-red-500 rounded-lg hover:bg-red-100 transition-colors group"
    >
      <div className="flex items-center space-x-3">
        <div className="w-6 h-6 rounded-full bg-red-500 text-white text-xs font-bold flex items-center justify-center">
          {rank}
        </div>
        <div className="text-left">
          <div className="font-semibold text-gray-900">{partnerName}</div>
          <div className="text-xs text-gray-600">{issue}</div>
        </div>
      </div>
      <div className="text-right">
        <div className="text-lg font-bold text-red-600">{healthScore}</div>
        <div className="text-xs text-gray-500">${(revenueExposure / 1000000).toFixed(1)}M</div>
      </div>
      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
    </button>
  );
}

function DriftAlert({ alert }: any) {
  const severityColor = alert.severity === 'high' ? 'border-red-500 bg-red-50' : 'border-yellow-500 bg-yellow-50';
  const textColor = alert.severity === 'high' ? 'text-red-800' : 'text-yellow-800';
  
  return (
    <div className={`p-3 border-l-4 rounded-lg ${severityColor}`}>
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <span className={`text-xs font-semibold px-2 py-1 rounded ${alert.severity === 'high' ? 'bg-red-200 text-red-800' : 'bg-yellow-200 text-yellow-800'}`}>
              {alert.type}
            </span>
            <span className="font-medium text-gray-900">{alert.partner}</span>
          </div>
          <div className={`text-sm ${textColor}`}>{alert.issue}</div>
        </div>
        <div className="text-right">
          <div className="text-xs text-gray-500">{alert.daysOpen} days</div>
        </div>
      </div>
    </div>
  );
}

function PartnershipTableRow({ partnership, onClick }: any) {
  const getHealthColor = (health: string) => {
    switch (health) {
      case 'healthy': return 'text-green-600 bg-green-50';
      case 'at-risk': return 'text-yellow-600 bg-yellow-50';
      case 'critical': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getTrendIcon = () => {
    const score = partnership.health_score || 0;
    if (score >= 80) return <TrendingUp className="w-4 h-4 text-green-600" />;
    if (score >= 60) return <Minus className="w-4 h-4 text-yellow-600" />;
    return <TrendingDown className="w-4 h-4 text-red-600" />;
  };

  return (
    <tr 
      onClick={onClick}
      className="hover:bg-gray-50 cursor-pointer transition-colors group"
    >
      <td className="px-6 py-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center">
            <span className="text-white font-semibold text-sm">{partnership.name.charAt(0)}</span>
          </div>
          <div>
            <div className="font-semibold text-gray-900">{partnership.name}</div>
            <div className="text-sm text-gray-600">{partnership.tier}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getHealthColor(partnership.health)}`}>
            {partnership.health}
          </span>
          <span className="text-sm font-semibold text-gray-900">{partnership.health_score}</span>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="text-sm font-semibold text-gray-900">
          ${((partnership.revenue || 0) / 1000000).toFixed(1)}M
        </div>
      </td>
      <td className="px-6 py-4">
        <span className="text-sm text-gray-700">{partnership.tier}</span>
      </td>
      <td className="px-6 py-4">
        <div className="text-sm text-gray-900">14 days ago</div>
        <div className="text-xs text-gray-500">Executive Review</div>
      </td>
      <td className="px-6 py-4">
        {getTrendIcon()}
      </td>
      <td className="px-6 py-4 text-right">
        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
      </td>
    </tr>
  );
}
