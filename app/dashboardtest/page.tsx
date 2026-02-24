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
      return <div className="h-6 w-16 bg-gray-200 rounded animate-pulse"></div>;
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
      {/* Clean Header - Workday Style */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">Executive Partnership Cockpit</h1>
                <p className="text-sm text-gray-600 mt-1">{currentOrg.name} • Strategic Partnership Capital Allocation</p>
              </div>
              <PageNavigation />
            </div>
            <div className="text-right">
              {loading ? (
                <div className="space-y-1">
                  <div className="h-8 w-24 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
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

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Portfolio Performance Snapshot - Clean Workday Style */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Portfolio Performance Snapshot</h2>
              <p className="text-sm text-gray-600">Capital allocation generating top-quartile returns</p>
            </div>
            <div className="flex space-x-8">
              <div className="text-center">
                {loading ? (
                  <div className="h-8 w-12 bg-gray-200 rounded animate-pulse mx-auto mb-1"></div>
                ) : (
                  <div className="text-2xl font-semibold text-gray-900">{enterpriseMetrics.portfolioROI}%</div>
                )}
                <div className="text-sm text-gray-600">Portfolio ROI</div>
                <div className="text-xs text-gray-500">+89% vs portfolio avg</div>
              </div>
              <div className="text-center">
                {loading ? (
                  <div className="h-8 w-16 bg-gray-200 rounded animate-pulse mx-auto mb-1"></div>
                ) : (
                  <div className="text-2xl font-semibold text-gray-900">${enterpriseMetrics.capitalEfficiency}M</div>
                )}
                <div className="text-sm text-gray-600">Capital Efficiency</div>
                <div className="text-xs text-gray-500">Revenue per $1M invested</div>
              </div>
            </div>
          </div>
        </div>

        {/* Enterprise Impact Metrics - Flat Workday Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-base font-semibold text-gray-900 mb-4">Portfolio Enterprise Value</h3>
            <div className="space-y-4">
              <div className="border-l-4 border-green-500 pl-3">
                <div className="text-xl font-semibold text-gray-900">{formatRevenue(enterpriseMetrics.partnerRevenue)}</div>
                <div className="text-sm text-gray-600">Revenue Attributed to Partnerships</div>
                <div className="text-xs text-gray-500">YTD Performance</div>
                <div className="flex items-center mt-1">
                  <ArrowUpRight className="w-3 h-3 text-green-600 mr-1" />
                  <span className="text-xs text-green-600 font-medium">+18.5%</span>
                </div>
              </div>
              <div>
                <div className="text-lg font-semibold text-gray-900">{enterpriseMetrics.companyRevenuePercent}%</div>
                <div className="text-sm text-gray-600">of Total Company Revenue</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-base font-semibold text-gray-900 mb-4">Risk & Concentration</h3>
            <div className="space-y-3">
              <div className="text-sm font-medium text-gray-700">Top Revenue Concentrations</div>
              {enterpriseMetrics.topRevenueConcentrations.map((concentration, idx) => (
                <div key={idx} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-orange-400 mr-3"></div>
                    <span className="text-sm text-gray-900">{concentration.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">{concentration.percentage}%</div>
                    <div className="text-xs text-gray-500">${(concentration.revenue / 1000000).toFixed(1)}M</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-base font-semibold text-gray-900 mb-4">Strategic Alignment</h3>
            <div className="space-y-4">
              <div>
                <div className="text-xl font-semibold text-gray-900">{enterpriseMetrics.strategicAlignmentPercent}%</div>
                <div className="text-sm text-gray-600">Aligned to Priority Initiatives</div>
                <div className="text-xs text-gray-500">AI / Cloud / New Markets</div>
                <div className="flex items-center mt-1">
                  <ArrowUpRight className="w-3 h-3 text-green-600 mr-1" />
                  <span className="text-xs text-green-600 font-medium">+5.2pts</span>
                </div>
              </div>
              <div>
                <div className="text-lg font-semibold text-gray-900">{enterpriseMetrics.innovationIndex}</div>
                <div className="text-sm text-gray-600">Innovation Contribution Index</div>
                <div className="text-xs text-gray-500">vs 100 baseline</div>
              </div>
            </div>
          </div>
        </div>

        {/* Strategic Decisions - Clean Workday Style */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Strategic Decisions This Week</h2>
              <p className="text-sm text-gray-600">Executive action required</p>
            </div>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
              3 pending
            </span>
          </div>
          <div className="space-y-3">
            {strategicDecisions.map((decision, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex-1">
                  <div className="flex items-center">
                    <div className={`w-2 h-2 rounded-full mr-3 ${decision.urgency === 'high' ? 'bg-red-500' : decision.urgency === 'medium' ? 'bg-yellow-500' : 'bg-blue-500'}`}></div>
                    <h4 className="font-medium text-gray-900">{decision.title}</h4>
                  </div>
                  <p className="text-sm text-gray-600 mt-1 ml-5">{decision.detail}</p>
                  <div className="text-xs text-gray-500 mt-1 ml-5">{decision.daysOpen} days open</div>
                </div>
                <div className="flex items-center space-x-3">
                  <button className="px-4 py-2 text-sm font-medium text-blue-700 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors">
                    {decision.action}
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Strategic Allocation Matrix - Clean Grid */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Strategic Allocation Matrix</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 border border-gray-200 rounded-lg bg-purple-50">
              <div className="flex items-center mb-2">
                <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
                <h4 className="font-medium text-gray-900">Strategic Bet</h4>
              </div>
              <p className="text-sm text-gray-600 mb-3">Low Revenue • High Alignment</p>
              <div className="text-2xl font-semibold text-gray-900">{quadrantData.strategic}</div>
              <p className="text-sm text-gray-600">partnerships</p>
            </div>

            <div className="p-4 border border-gray-200 rounded-lg bg-green-50">
              <div className="flex items-center mb-2">
                <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                <h4 className="font-medium text-gray-900">Protect & Expand</h4>
              </div>
              <p className="text-sm text-gray-600 mb-3">High Revenue • High Alignment</p>
              <div className="text-2xl font-semibold text-gray-900">{quadrantData.protect}</div>
              <p className="text-sm text-gray-600">partnerships</p>
            </div>

            <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
              <div className="flex items-center mb-2">
                <div className="w-3 h-3 rounded-full bg-gray-500 mr-2"></div>
                <h4 className="font-medium text-gray-900">Exit / Deprioritize</h4>
              </div>
              <p className="text-sm text-gray-600 mb-3">Low Revenue • Low Alignment</p>
              <div className="text-2xl font-semibold text-gray-900">{quadrantData.exit}</div>
              <p className="text-sm text-gray-600">partnerships</p>
            </div>

            <div className="p-4 border border-gray-200 rounded-lg bg-blue-50">
              <div className="flex items-center mb-2">
                <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                <h4 className="font-medium text-gray-900">Financial Asset</h4>
              </div>
              <p className="text-sm text-gray-600 mb-3">High Revenue • Low Alignment</p>
              <div className="text-2xl font-semibold text-gray-900">{quadrantData.financial}</div>
              <p className="text-sm text-gray-600">partnerships</p>
            </div>
          </div>
        </div>

        {/* Capital Allocation Summary - Clean Table Style */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Capital Allocation Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center border-r border-gray-200 last:border-r-0">
              <div className="text-2xl font-semibold text-gray-900 mb-1">$485K</div>
              <div className="text-sm text-gray-600 mb-1">Investment per Partnership</div>
              <div className="text-xs text-gray-500">Average annual investment</div>
            </div>
            <div className="text-center border-r border-gray-200 last:border-r-0">
              <div className="text-2xl font-semibold text-gray-900 mb-1">23 FTEs</div>
              <div className="text-sm text-gray-600 mb-1">Headcount Allocation</div>
              <div className="text-xs text-gray-500">Partnership team size</div>
            </div>
            <div className="text-center border-r border-gray-200 last:border-r-0">
              <div className="text-2xl font-semibold text-gray-900 mb-1">347%</div>
              <div className="text-sm text-gray-600 mb-1">ROI Estimate</div>
              <div className="text-xs text-gray-500">Blended portfolio ROI</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-semibold text-gray-900 mb-1">$3.2M</div>
              <div className="text-sm text-gray-600 mb-1">Capital Efficiency</div>
              <div className="text-xs text-gray-500">Revenue per $1M invested</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
