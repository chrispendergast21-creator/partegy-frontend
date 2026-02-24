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
  AlertTriangle,
  Target,
  Crown,
  Zap,
  Shield,
  Building2,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  ChevronRight,
  Eye,
  Users,
  BarChart3,
  PieChart,
  Globe,
  AlertCircle
} from 'lucide-react';

export default function ExecutiveCockpitPage() {
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
      setTimeout(() => setLoading(false), 1500);
    } catch (error) {
      console.error('Failed to load data:', error);
      setTimeout(() => setLoading(false), 1500);
    }
  };

  // REALISTIC ENTERPRISE DATA
  const realisticPartnerData = [
    { name: 'TechFlow Systems', revenue: 28500000, health: 'at-risk', tier: 'Strategic' },
    { name: 'DataSync Partners', revenue: 18200000, health: 'healthy', tier: 'Strategic' },
    { name: 'CloudTech Solutions', revenue: 12100000, health: 'healthy', tier: 'Strategic' },
    { name: 'InnovateCorp', revenue: 8900000, health: 'healthy', tier: 'Growth' },
    { name: 'GlobalTech Inc', revenue: 7200000, health: 'healthy', tier: 'Strategic' },
    { name: 'FutureSoft Alliance', revenue: 6400000, health: 'watchlist', tier: 'Growth' },
    { name: 'NextGen Partners', revenue: 5100000, health: 'healthy', tier: 'Growth' },
    { name: 'QuantumEdge Corp', revenue: 4200000, health: 'healthy', tier: 'Strategic' }
  ];

  const totalRealisticRevenue = realisticPartnerData.reduce((sum, p) => sum + p.revenue, 0);

  const enterpriseMetrics = {
    partnerRevenue: totalRealisticRevenue,
    companyRevenuePercent: 23.4,
    pipelineInfluenced: totalRealisticRevenue * 3.2,
    forecastVariance: -12.3,
    topRevenueConcentrations: [
      { name: 'TechFlow Systems', revenue: 28500000, percentage: 31.4 },
      { name: 'DataSync Partners', revenue: 18200000, percentage: 20.1 },
      { name: 'CloudTech Solutions', revenue: 12100000, percentage: 13.4 }
    ],
    atRiskStrategic: realisticPartnerData.filter(p => p.tier === 'Strategic' && p.health === 'at-risk').length,
    portfolioRiskScore: 72,
    strategicAlignmentPercent: 67.8,
    innovationIndex: 142,
    emergingPartners: 3,
    portfolioROI: 347,
    capitalEfficiency: 3.2
  };

  const strategicDecisions = [
    {
      type: 'revenue_variance',
      title: 'Revenue variance of -12% with TechFlow Systems',
      impact: '$3.4M shortfall',
      riskExposure: 'High',
      recommendation: 'Escalate',
      urgency: 'critical',
      daysOpen: 3,
      isPrimary: true
    },
    {
      type: 'acquisition_candidate',
      title: 'Acquisition candidate emerging (CloudEdge AI)',
      impact: 'Strategic expansion opportunity',
      riskExposure: 'Low',
      recommendation: 'Acquire',
      urgency: 'high',
      daysOpen: 21,
      isPrimary: true
    }
  ];

  const formatRevenue = (amount: number) => {
    if (loading) {
      return <div className="animate-pulse bg-gray-300 rounded w-20 h-8"></div>;
    }
    if (isNaN(amount) || amount === null || amount === undefined) {
      return '$0.0M';
    }
    return `$${(amount / 1000000).toFixed(1)}M`;
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
      <header className="bg-gradient-to-r from-[#1e293b] via-[#334155] to-[#475569] border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-[#60a5fa] to-[#60e1fa] bg-clip-text text-transparent">
                  🧭 Executive Partnership Cockpit
                </h1>
                <p className="text-gray-300 text-lg mt-1">Strategic Partnership Capital Allocation • {currentOrg.name}</p>
              </div>
              <PageNavigation />
            </div>
            <div className="text-right text-white">
              {loading ? (
                <div className="space-y-2">
                  <div className="h-12 w-32 bg-gray-600 rounded animate-pulse"></div>
                  <div className="h-4 w-40 bg-gray-600 rounded animate-pulse"></div>
                </div>
              ) : (
                <>
                  <div className="text-6xl font-bold">{formatRevenue(enterpriseMetrics.partnerRevenue)}</div>
                  <div className="text-lg">Partnership Revenue YTD</div>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-8 py-8">
        {/* Capital Allocation Snapshot */}
        <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-2xl shadow-xl p-6 mb-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">💎 Portfolio Performance Snapshot</h2>
              <p className="text-emerald-100">Capital allocation generating top-quartile returns</p>
            </div>
            <div className="grid grid-cols-2 gap-8 text-center">
              <div>
                {loading ? (
                  <div className="h-10 w-16 bg-emerald-400 rounded animate-pulse mx-auto"></div>
                ) : (
                  <div className="text-4xl font-bold">{enterpriseMetrics.portfolioROI}%</div>
                )}
                <div className="text-emerald-100">Portfolio ROI</div>
                <div className="text-xs text-emerald-200">+89% vs portfolio avg</div>
              </div>
              <div>
                {loading ? (
                  <div className="h-10 w-20 bg-emerald-400 rounded animate-pulse mx-auto"></div>
                ) : (
                  <div className="text-4xl font-bold">${enterpriseMetrics.capitalEfficiency}M</div>
                )}
                <div className="text-emerald-100">Capital Efficiency</div>
                <div className="text-xs text-emerald-200">Revenue per $1M invested</div>
              </div>
            </div>
          </div>
        </div>

        {/* Enterprise Impact Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-green-400 to-green-600 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Portfolio Enterprise Value</h2>
            </div>
            <div className="space-y-4">
              <div>
                <div className="text-2xl font-bold text-gray-900">{formatRevenue(enterpriseMetrics.partnerRevenue)}</div>
                <div className="text-sm font-medium text-gray-700">Revenue Attributed to Partnerships</div>
                <div className="text-xs text-gray-500">YTD Performance</div>
                <div className="flex items-center space-x-1 mt-1 text-green-600">
                  <ArrowUpRight className="w-3 h-3" />
                  <span className="text-xs font-semibold">+18.5%</span>
                </div>
              </div>
            </div>
            <div className="mt-4 p-3 bg-green-50 rounded-lg">
              <div className="text-sm font-semibold text-green-800">✅ Partnerships are materially moving enterprise growth</div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-red-400 to-red-600 flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Risk & Concentration</h2>
            </div>
            <div className="space-y-3 mb-4">
              <div className="text-sm font-medium text-gray-700 mb-2">Top 3 Revenue Concentrations</div>
              {enterpriseMetrics.topRevenueConcentrations.map((concentration, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-red-400 to-red-600 text-white text-xs font-bold flex items-center justify-center">
                      {idx + 1}
                    </div>
                    <div className="text-sm font-medium text-gray-900">{concentration.name}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-gray-900">{concentration.percentage}%</div>
                    <div className="text-xs text-gray-500">${(concentration.revenue / 1000000).toFixed(1)}M</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 bg-red-50 rounded-lg">
              <div className="text-sm font-semibold text-red-800">⚠️ Concentration risk exceeds enterprise threshold</div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Strategic Alignment</h2>
            </div>
            <div className="space-y-4">
              <div>
                <div className="text-2xl font-bold text-gray-900">{enterpriseMetrics.strategicAlignmentPercent}%</div>
                <div className="text-sm font-medium text-gray-700">% Aligned to Priority Initiatives</div>
                <div className="text-xs text-gray-500">AI / Cloud / New Markets</div>
                <div className="flex items-center space-x-1 mt-1 text-green-600">
                  <ArrowUpRight className="w-3 h-3" />
                  <span className="text-xs font-semibold">+5.2pts</span>
                </div>
              </div>
            </div>
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <div className="text-sm font-semibold text-blue-800">🎯 Strong strategic alignment supporting 3-year growth</div>
            </div>
          </div>
        </div>

        {/* Strategic Decisions This Week */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
            <h2 className="text-2xl font-bold text-gray-900">🚨 Strategic Decisions This Week</h2>
            <span className="px-3 py-1 bg-red-100 text-red-800 text-sm rounded-full font-medium">Executive Action Required</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {strategicDecisions.map((decision, idx) => (
              <div key={idx} className="border-l-4 border-red-500 bg-red-50 rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-2">{decision.title}</h3>
                    <div className="space-y-1 text-sm">
                      <div><strong>Enterprise Impact:</strong> {decision.impact}</div>
                      <div><strong>Risk Exposure:</strong> {decision.riskExposure}</div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500">{decision.daysOpen} days open</div>
                </div>
                <div className="flex items-center justify-between">
                  <button className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-semibold hover:bg-red-700 transition-all shadow-lg transform hover:scale-105">
                    {decision.recommendation}
                  </button>
                  <button className="flex items-center space-x-2 px-3 py-1 bg-gray-200 text-gray-700 rounded-lg text-sm hover:bg-gray-300 transition-colors">
                    <Eye className="w-3 h-3" />
                    <span>Review</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Strategic Allocation Matrix */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">🧩 Strategic Allocation Matrix</h2>
          <div className="grid grid-cols-2 gap-4 h-96">
            <div className="bg-gradient-to-br from-purple-100 to-purple-200 border-2 border-purple-300 rounded-xl p-6 flex flex-col">
              <div className="flex items-center space-x-2 mb-3">
                <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                <h3 className="text-lg font-bold text-purple-900">Strategic Bet</h3>
              </div>
              <p className="text-sm text-purple-700 mb-4">Low Revenue • High Alignment</p>
              <div className="text-2xl font-bold text-purple-900 mb-2">12</div>
              <p className="text-sm text-purple-700">partnerships</p>
              <div className="mt-auto pt-4 border-t border-purple-300">
                <p className="text-xs font-medium text-purple-800">Invest for future value</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-100 to-green-200 border-2 border-green-300 rounded-xl p-6 flex flex-col">
              <div className="flex items-center space-x-2 mb-3">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <h3 className="text-lg font-bold text-green-900">Protect & Expand</h3>
              </div>
              <p className="text-sm text-green-700 mb-4">High Revenue • High Alignment</p>
              <div className="text-2xl font-bold text-green-900 mb-2">8</div>
              <p className="text-sm text-green-700">partnerships</p>
              <div className="mt-auto pt-4 border-t border-green-300">
                <p className="text-xs font-medium text-green-800">Double down on investment</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-100 to-gray-200 border-2 border-gray-300 rounded-xl p-6 flex flex-col">
              <div className="flex items-center space-x-2 mb-3">
                <div className="w-3 h-3 rounded-full bg-gray-500"></div>
                <h3 className="text-lg font-bold text-gray-900">Exit / Deprioritize</h3>
              </div>
              <p className="text-sm text-gray-700 mb-4">Low Revenue • Low Alignment</p>
              <div className="text-2xl font-bold text-gray-900 mb-2">8</div>
              <p className="text-sm text-gray-700">partnerships</p>
              <div className="mt-auto pt-4 border-t border-gray-300">
                <p className="text-xs font-medium text-gray-800">Consider divestiture</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-100 to-blue-200 border-2 border-blue-300 rounded-xl p-6 flex flex-col">
              <div className="flex items-center space-x-2 mb-3">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <h3 className="text-lg font-bold text-blue-900">Financial Asset</h3>
              </div>
              <p className="text-sm text-blue-700 mb-4">High Revenue • Low Alignment</p>
              <div className="text-2xl font-bold text-blue-900 mb-2">6</div>
              <p className="text-sm text-blue-700">partnerships</p>
              <div className="mt-auto pt-4 border-t border-blue-300">
                <p className="text-xs font-medium text-blue-800">Optimize for efficiency</p>
              </div>
            </div>
          </div>
        </div>

        {/* Capital Allocation Summary */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl shadow-xl border border-slate-700 p-8 text-white">
          <h2 className="text-2xl font-bold mb-6">📊 Capital Allocation Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">$485K</div>
              <div className="text-sm font-medium text-gray-300 mb-1">Investment per Partnership</div>
              <div className="text-xs text-gray-400 mb-2">Average annual investment</div>
              <div className="text-xs text-blue-400 font-medium">+12% vs industry</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">23 FTEs</div>
              <div className="text-sm font-medium text-gray-300 mb-1">Headcount Allocation</div>
              <div className="text-xs text-gray-400 mb-2">Partnership team size</div>
              <div className="text-xs text-blue-400 font-medium">1.2 FTE per $10M revenue</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">347%</div>
              <div className="text-sm font-medium text-gray-300 mb-1">ROI Estimate</div>
              <div className="text-xs text-gray-400 mb-2">Blended portfolio ROI</div>
              <div className="text-xs text-blue-400 font-medium">+89% vs portfolio avg</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">$3.2M</div>
              <div className="text-sm font-medium text-gray-300 mb-1">Capital Efficiency</div>
              <div className="text-xs text-gray-400 mb-2">Revenue per $1M invested</div>
              <div className="text-xs text-blue-400 font-medium">Top quartile performance</div>
            </div>
          </div>
          <div className="mt-6 p-4 bg-white/10 rounded-lg">
            <div className="text-lg font-semibold">Executive Summary: Partnership capital allocation is generating top-quartile returns with manageable concentration risk.</div>
          </div>
        </div>
      </main>
    </div>
  );
}
