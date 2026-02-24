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
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  Building2
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
      setTimeout(() => setLoading(false), 1000);
    } catch (error) {
      console.error('Failed to load data:', error);
      setTimeout(() => setLoading(false), 1000);
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
      title: 'Revenue variance detected with TechFlow Systems',
      detail: '$3.4M shortfall vs. forecast',
      action: 'Escalate',
      urgency: 'high',
      daysOpen: 3
    },
    {
      title: 'Executive engagement decline in DataSync relationship',
      detail: 'No C-level contact in 45 days',
      action: 'Schedule Meeting',
      urgency: 'medium',
      daysOpen: 8
    },
    {
      title: 'Acquisition opportunity identified',
      detail: 'CloudEdge AI strategic fit analysis complete',
      action: 'Review Proposal',
      urgency: 'low',
      daysOpen: 21
    }
  ];

  const quadrantData = {
    protect: 8,
    financial: 6,
    strategic: 12,
    exit: 8
  };

  const formatRevenue = (amount: number) => {
    if (loading) {
      return <div className="h-7 w-20 bg-gray-200 rounded animate-pulse"></div>;
    }
    if (isNaN(amount) || amount === null || amount === undefined) {
      return '$0.0M';
    }
    return `$${(amount / 1000000).toFixed(1)}M`;
  };

  if (!currentOrg) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Building2 className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">No Organization Selected</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Strategic Brand Header Band - ONLY PLACE WITH GRADIENT */}
      <div className="bg-gradient-to-r from-slate-700 via-slate-600 to-indigo-700 h-1"></div>
      
      {/* Clean Enterprise Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-12">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">Executive Partnership Cockpit</h1>
                <div className="flex items-center mt-2">
                  <div className="h-px w-16 bg-slate-600 mr-3"></div>
                  <p className="text-sm text-gray-600">{currentOrg.name} • Strategic Partnership Capital Allocation</p>
                </div>
              </div>
              <PageNavigation />
            </div>
            <div className="text-right">
              {loading ? (
                <div className="space-y-2">
                  <div className="h-9 w-28 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 w-36 bg-gray-200 rounded animate-pulse"></div>
                </div>
              ) : (
                <>
                  <div className="text-3xl font-semibold text-gray-900">{formatRevenue(enterpriseMetrics.partnerRevenue)}</div>
                  <div className="text-sm text-gray-600">Partnership Revenue YTD</div>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-8 py-10 space-y-10">
        {/* Portfolio Performance Snapshot */}
        <div className="bg-white rounded-xl border border-gray-200 p-8">
          <div className="flex items-start justify-between mb-8">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Portfolio Performance Snapshot</h2>
              <div className="h-px w-24 bg-slate-600 mb-3"></div>
              <p className="text-sm text-gray-600">Capital allocation generating top-quartile returns</p>
            </div>
            <div className="flex space-x-12">
              <div className="text-center">
                {loading ? (
                  <div className="h-9 w-16 bg-gray-200 rounded animate-pulse mx-auto mb-2"></div>
                ) : (
                  <div className="text-3xl font-semibold text-gray-900 mb-1">{enterpriseMetrics.portfolioROI}%</div>
                )}
                <div className="text-sm font-medium text-gray-700">Portfolio ROI</div>
                <div className="text-xs text-gray-500">+89% vs portfolio avg</div>
              </div>
              <div className="text-center">
                {loading ? (
                  <div className="h-9 w-20 bg-gray-200 rounded animate-pulse mx-auto mb-2"></div>
                ) : (
                  <div className="text-3xl font-semibold text-gray-900 mb-1">${enterpriseMetrics.capitalEfficiency}M</div>
                )}
                <div className="text-sm font-medium text-gray-700">Capital Efficiency</div>
                <div className="text-xs text-gray-500">Revenue per $1M invested</div>
              </div>
            </div>
          </div>
        </div>

        {/* Enterprise Impact Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl border border-gray-200 p-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Portfolio Enterprise Value</h3>
            <div className="space-y-6">
              <div className="border-l-3 border-slate-600 pl-4">
                <div className="text-2xl font-semibold text-gray-900 mb-1">{formatRevenue(enterpriseMetrics.partnerRevenue)}</div>
                <div className="text-sm font-medium text-gray-700">Revenue Attributed to Partnerships</div>
                <div className="text-xs text-gray-500">YTD Performance</div>
                <div className="flex items-center mt-2">
                  <ArrowUpRight className="w-4 h-4 text-green-600 mr-1" />
                  <span className="text-sm text-green-600 font-medium">+18.5%</span>
                </div>
              </div>
              <div className="pt-4">
                <div className="text-xl font-semibold text-gray-900 mb-1">{enterpriseMetrics.companyRevenuePercent}%</div>
                <div className="text-sm font-medium text-gray-700">of Total Company Revenue</div>
                <div className="text-xs text-gray-500">Material enterprise contribution</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Risk & Concentration</h3>
            <div className="space-y-4">
              <div className="text-sm font-semibold text-gray-800">Top Revenue Concentrations</div>
              {enterpriseMetrics.topRevenueConcentrations.map((concentration, idx) => (
                <div key={idx} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-amber-500 mr-4"></div>
                    <span className="text-sm font-medium text-gray-900">{concentration.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-gray-900">{concentration.percentage}%</div>
                    <div className="text-xs text-gray-500">${(concentration.revenue / 1000000).toFixed(1)}M</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Strategic Alignment</h3>
            <div className="space-y-6">
              <div className="border-l-3 border-slate-600 pl-4">
                <div className="text-2xl font-semibold text-gray-900 mb-1">{enterpriseMetrics.strategicAlignmentPercent}%</div>
                <div className="text-sm font-medium text-gray-700">Aligned to Priority Initiatives</div>
                <div className="text-xs text-gray-500">AI / Cloud / New Markets</div>
                <div className="flex items-center mt-2">
                  <ArrowUpRight className="w-4 h-4 text-green-600 mr-1" />
                  <span className="text-sm text-green-600 font-medium">+5.2pts</span>
                </div>
              </div>
              <div className="pt-4">
                <div className="text-xl font-semibold text-gray-900 mb-1">{enterpriseMetrics.innovationIndex}</div>
                <div className="text-sm font-medium text-gray-700">Innovation Contribution Index</div>
                <div className="text-xs text-gray-500">vs 100 baseline</div>
              </div>
            </div>
          </div>
        </div>

        {/* Strategic Decisions - BRAND LEFT BORDERS */}
        <div className="bg-white rounded-xl border border-gray-200 p-8">
          <div className="flex items-start justify-between mb-8">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Strategic Decisions This Week</h2>
              <div className="h-px w-24 bg-slate-600 mb-3"></div>
              <p className="text-sm text-gray-600">Executive action required</p>
            </div>
            <span className="inline-flex items-center px-3 py-1 rounded-md text-xs font-medium bg-red-50 text-red-700">
              3 pending
            </span>
          </div>
          <div className="space-y-4">
            {strategicDecisions.map((decision, idx) => (
              <div key={idx} className={`border-l-4 ${decision.urgency === 'high' ? 'border-slate-600' : decision.urgency === 'medium' ? 'border-amber-400' : 'border-blue-400'} pl-6 py-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors`}>
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-start">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">{decision.title}</h4>
                        <p className="text-sm text-gray-600 mb-2">{decision.detail}</p>
                        <div className="text-xs text-gray-500">{decision.daysOpen} days open</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 ml-6">
                    <button className="px-4 py-2 text-sm font-medium text-white bg-slate-700 rounded-lg hover:bg-slate-800 transition-colors">
                      {decision.action}
                    </button>
                    <button className="p-2 text-gray-400 hover:text-slate-600 transition-colors">
                      <Eye className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Strategic Allocation Matrix */}
        <div className="bg-white rounded-xl border border-gray-200 p-8">
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Strategic Allocation Matrix</h2>
            <div className="h-px w-24 bg-slate-600"></div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="p-6 border border-gray-200 rounded-xl bg-purple-50">
              <div className="flex items-center mb-3">
                <div className="w-3 h-3 rounded-full bg-slate-600 mr-3"></div>
                <h4 className="font-semibold text-gray-900">Strategic Bet</h4>
              </div>
              <p className="text-sm text-gray-600 mb-4">Low Revenue • High Alignment</p>
              <div className="text-3xl font-semibold text-gray-900 mb-1">{quadrantData.strategic}</div>
              <p className="text-sm text-gray-600">partnerships</p>
            </div>

            <div className="p-6 border border-gray-200 rounded-xl bg-green-50">
              <div className="flex items-center mb-3">
                <div className="w-3 h-3 rounded-full bg-slate-600 mr-3"></div>
                <h4 className="font-semibold text-gray-900">Protect & Expand</h4>
              </div>
              <p className="text-sm text-gray-600 mb-4">High Revenue • High Alignment</p>
              <div className="text-3xl font-semibold text-gray-900 mb-1">{quadrantData.protect}</div>
              <p className="text-sm text-gray-600">partnerships</p>
            </div>

            <div className="p-6 border border-gray-200 rounded-xl bg-gray-50">
              <div className="flex items-center mb-3">
                <div className="w-3 h-3 rounded-full bg-slate-600 mr-3"></div>
                <h4 className="font-semibold text-gray-900">Exit / Deprioritize</h4>
              </div>
              <p className="text-sm text-gray-600 mb-4">Low Revenue • Low Alignment</p>
              <div className="text-3xl font-semibold text-gray-900 mb-1">{quadrantData.exit}</div>
              <p className="text-sm text-gray-600">partnerships</p>
            </div>

            <div className="p-6 border border-gray-200 rounded-xl bg-blue-50">
              <div className="flex items-center mb-3">
                <div className="w-3 h-3 rounded-full bg-slate-600 mr-3"></div>
                <h4 className="font-semibold text-gray-900">Financial Asset</h4>
              </div>
              <p className="text-sm text-gray-600 mb-4">High Revenue • Low Alignment</p>
              <div className="text-3xl font-semibold text-gray-900 mb-1">{quadrantData.financial}</div>
              <p className="text-sm text-gray-600">partnerships</p>
            </div>
          </div>
        </div>

        {/* Capital Allocation Summary */}
        <div className="bg-white rounded-xl border border-gray-200 p-8">
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Capital Allocation Summary</h2>
            <div className="h-px w-24 bg-slate-600"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center border-r border-gray-200 last:border-r-0 pr-8 last:pr-0">
              <div className="text-2xl font-semibold text-gray-900 mb-2">$485K</div>
              <div className="text-sm font-medium text-gray-700 mb-1">Investment per Partnership</div>
              <div className="text-xs text-gray-500">Average annual investment</div>
            </div>
            <div className="text-center border-r border-gray-200 last:border-r-0 pr-8 last:pr-0">
              <div className="text-2xl font-semibold text-gray-900 mb-2">23 FTEs</div>
              <div className="text-sm font-medium text-gray-700 mb-1">Headcount Allocation</div>
              <div className="text-xs text-gray-500">Partnership team size</div>
            </div>
            <div className="text-center border-r border-gray-200 last:border-r-0 pr-8 last:pr-0">
              <div className="text-2xl font-semibold text-gray-900 mb-2">347%</div>
              <div className="text-sm font-medium text-gray-700 mb-1">ROI Estimate</div>
              <div className="text-xs text-gray-500">Blended portfolio ROI</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-semibold text-gray-900 mb-2">$3.2M</div>
              <div className="text-sm font-medium text-gray-700 mb-1">Capital Efficiency</div>
              <div className="text-xs text-gray-500">Revenue per $1M invested</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
