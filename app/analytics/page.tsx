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

export default function AnalyticsPage() {
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
      setTimeout(() => setLoading(false), 800);
    } catch (error) {
      console.error('Failed to load data:', error);
      setTimeout(() => setLoading(false), 800);
    }
  };

  // REALISTIC ENTERPRISE DATA
  const realisticPartnerData = [
    { name: 'TechFlow Systems', revenue: 28500000, health: 'at-risk', tier: 'Strategic' },
    { name: 'DataSync Partners', revenue: 18200000, health: 'healthy', tier: 'Strategic' },
    { name: 'CloudTech Solutions', revenue: 12100000, health: 'healthy', tier: 'Strategic' },
    { name: 'InnovateCorp', revenue: 8900000, health: 'healthy', tier: 'Growth' },
    { name: 'GlobalTech Inc', revenue: 7200000, health: 'healthy', tier: 'Strategic' }
  ];

  const totalRealisticRevenue = realisticPartnerData.reduce((sum, p) => sum + p.revenue, 0);

  const enterpriseMetrics = {
    partnerRevenue: totalRealisticRevenue,
    companyRevenuePercent: 23.4,
    portfolioROI: 347,
    capitalEfficiency: 3.2,
    topRevenueConcentrations: [
      { name: 'TechFlow Systems', revenue: 28500000, percentage: 31.4 },
      { name: 'DataSync Partners', revenue: 18200000, percentage: 20.1 },
      { name: 'CloudTech Solutions', revenue: 12100000, percentage: 13.4 }
    ],
    strategicAlignmentPercent: 67.8,
    innovationIndex: 142
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

  const formatRevenue = (amount: number) => {
    if (loading) {
      return <div className="h-10 w-24 bg-gray-200 rounded animate-pulse"></div>;
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
          <h2 className="text-xl font-semibold text-gray-900">No Organization Selected</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* DARK EXECUTIVE HEADER */}
      <header className="bg-slate-900 border-b-2 border-slate-700">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-12">
              <div>
                <h1 className="text-2xl font-semibold text-white">Analytics</h1>
                <p className="text-slate-300 text-sm mt-1">{currentOrg.name} • Partnership Intelligence & Strategic Analysis</p>
              </div>
              <PageNavigation />
            </div>
            <div className="text-right text-white">
              {loading ? (
                <div className="space-y-2">
                  <div className="h-12 w-32 bg-slate-700 rounded animate-pulse"></div>
                  <div className="h-4 w-40 bg-slate-700 rounded animate-pulse"></div>
                </div>
              ) : (
                <>
                  <div className="text-5xl font-bold">{formatRevenue(enterpriseMetrics.partnerRevenue)}</div>
                  <div className="text-slate-300 text-sm">Partnership Revenue YTD</div>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-8 py-8 space-y-8">
        {/* PORTFOLIO PERFORMANCE SNAPSHOT - COMMAND CENTER */}
        <div className="bg-slate-100 border border-gray-200 rounded-xl shadow-sm p-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Portfolio Performance Snapshot</h2>
              <div className="h-0.5 w-20 bg-slate-700 mb-3"></div>
              <p className="text-gray-600 text-sm">Capital allocation generating top-quartile returns</p>
            </div>
            <div className="flex space-x-12">
              <div className="text-center">
                {loading ? (
                  <div className="h-12 w-20 bg-gray-200 rounded animate-pulse mx-auto mb-2"></div>
                ) : (
                  <div>
                    <div className="text-4xl font-bold text-gray-900 mb-1">{enterpriseMetrics.portfolioROI}%</div>
                    <div className="flex items-center justify-center">
                      <ArrowUpRight className="w-4 h-4 text-green-600 mr-1" />
                      <span className="text-green-600 text-sm font-medium">+89% vs avg</span>
                    </div>
                  </div>
                )}
                <div className="text-xs font-medium text-gray-600 uppercase tracking-wide mt-2">Portfolio ROI</div>
              </div>
              <div className="text-center">
                {loading ? (
                  <div className="h-12 w-24 bg-gray-200 rounded animate-pulse mx-auto mb-2"></div>
                ) : (
                  <div>
                    <div className="text-4xl font-bold text-gray-900 mb-1">${enterpriseMetrics.capitalEfficiency}M</div>
                    <div className="flex items-center justify-center">
                      <ArrowUpRight className="w-4 h-4 text-green-600 mr-1" />
                      <span className="text-green-600 text-sm font-medium">Top quartile</span>
                    </div>
                  </div>
                )}
                <div className="text-xs font-medium text-gray-600 uppercase tracking-wide mt-2">Capital Efficiency</div>
              </div>
            </div>
          </div>
        </div>

        {/* ENTERPRISE IMPACT METRICS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Portfolio Enterprise Value</h3>
            <div className="mb-6">
              <div className="text-3xl font-bold text-gray-900 mb-2">{formatRevenue(enterpriseMetrics.partnerRevenue)}</div>
              <div className="text-sm font-medium text-gray-600 mb-1">Revenue Attributed to Partnerships</div>
              <div className="text-xs text-gray-500 mb-2">YTD Performance</div>
              <div className="flex items-center">
                <ArrowUpRight className="w-4 h-4 text-green-600 mr-1" />
                <span className="text-green-600 text-sm font-medium">+18.5%</span>
              </div>
            </div>
            <div className="pt-4 border-t border-gray-200">
              <div className="text-xl font-semibold text-gray-900 mb-1">{enterpriseMetrics.companyRevenuePercent}%</div>
              <div className="text-sm font-medium text-gray-600">of Total Company Revenue</div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Risk & Concentration</h3>
            <div className="mb-4">
              <div className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-3">Top Revenue Concentrations</div>
              {enterpriseMetrics.topRevenueConcentrations.map((concentration, idx) => (
                <div key={idx} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-amber-500 mr-3"></div>
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

          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Strategic Alignment</h3>
            <div className="mb-6">
              <div className="text-3xl font-bold text-gray-900 mb-2">{enterpriseMetrics.strategicAlignmentPercent}%</div>
              <div className="text-sm font-medium text-gray-600 mb-1">Aligned to Priority Initiatives</div>
              <div className="text-xs text-gray-500 mb-2">AI / Cloud / New Markets</div>
              <div className="flex items-center">
                <ArrowUpRight className="w-4 h-4 text-green-600 mr-1" />
                <span className="text-green-600 text-sm font-medium">+5.2pts</span>
              </div>
            </div>
            <div className="pt-4 border-t border-gray-200">
              <div className="text-xl font-semibold text-gray-900 mb-1">{enterpriseMetrics.innovationIndex}</div>
              <div className="text-sm font-medium text-gray-600">Innovation Contribution Index</div>
            </div>
          </div>
        </div>

        {/* STRATEGIC DECISIONS */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl shadow-lg p-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Strategic Decisions This Week</h2>
              <div className="h-0.5 w-20 bg-slate-700 mb-3"></div>
              <p className="text-gray-600 text-sm">Executive action required</p>
            </div>
            <span className="inline-flex items-center px-3 py-1 rounded-md text-xs font-medium bg-red-100 text-red-800">
              3 pending
            </span>
          </div>
          <div className="space-y-4">
            {strategicDecisions.map((decision, idx) => (
              <div 
                key={idx} 
                className={`border-l-4 ${decision.urgency === 'high' ? 'border-slate-700' : decision.urgency === 'medium' ? 'border-amber-400' : 'border-blue-400'} pl-6 py-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-1">{decision.title}</h4>
                    <p className="text-sm text-gray-600 mb-2">{decision.detail}</p>
                    <div className="text-xs text-gray-500">{decision.daysOpen} days open</div>
                  </div>
                  <div className="flex items-center space-x-3 ml-6">
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

        {/* STRATEGIC ALLOCATION MATRIX */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-8">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Strategic Allocation Matrix</h2>
            <div className="h-0.5 w-20 bg-slate-700"></div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="p-6 border border-gray-200 rounded-xl bg-purple-50 hover:shadow-md transition-shadow">
              <div className="flex items-center mb-3">
                <div className="w-3 h-3 rounded-full bg-slate-700 mr-3"></div>
                <h4 className="font-semibold text-gray-900">Strategic Bet</h4>
              </div>
              <p className="text-sm text-gray-600 mb-4">Low Revenue • High Alignment</p>
              <div className="text-3xl font-bold text-gray-900 mb-1">12</div>
              <p className="text-sm text-gray-600">partnerships</p>
            </div>

            <div className="p-6 border border-gray-200 rounded-xl bg-green-50 hover:shadow-md transition-shadow">
              <div className="flex items-center mb-3">
                <div className="w-3 h-3 rounded-full bg-slate-700 mr-3"></div>
                <h4 className="font-semibold text-gray-900">Protect & Expand</h4>
              </div>
              <p className="text-sm text-gray-600 mb-4">High Revenue • High Alignment</p>
              <div className="text-3xl font-bold text-gray-900 mb-1">8</div>
              <p className="text-sm text-gray-600">partnerships</p>
            </div>

            <div className="p-6 border border-gray-200 rounded-xl bg-gray-50 hover:shadow-md transition-shadow">
              <div className="flex items-center mb-3">
                <div className="w-3 h-3 rounded-full bg-slate-700 mr-3"></div>
                <h4 className="font-semibold text-gray-900">Exit / Deprioritize</h4>
              </div>
              <p className="text-sm text-gray-600 mb-4">Low Revenue • Low Alignment</p>
              <div className="text-3xl font-bold text-gray-900 mb-1">8</div>
              <p className="text-sm text-gray-600">partnerships</p>
            </div>

            <div className="p-6 border border-gray-200 rounded-xl bg-blue-50 hover:shadow-md transition-shadow">
              <div className="flex items-center mb-3">
                <div className="w-3 h-3 rounded-full bg-slate-700 mr-3"></div>
                <h4 className="font-semibold text-gray-900">Financial Asset</h4>
              </div>
              <p className="text-sm text-gray-600 mb-4">High Revenue • Low Alignment</p>
              <div className="text-3xl font-bold text-gray-900 mb-1">6</div>
              <p className="text-sm text-gray-600">partnerships</p>
            </div>
          </div>
        </div>

        {/* CAPITAL ALLOCATION SUMMARY */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-8">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Capital Allocation Summary</h2>
            <div className="h-0.5 w-20 bg-slate-700"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center border-r border-gray-200 last:border-r-0 pr-8 last:pr-0">
              <div className="text-2xl font-semibold text-gray-900 mb-2">$485K</div>
              <div className="text-sm font-medium text-gray-600 mb-1">Investment per Partnership</div>
              <div className="text-xs text-gray-500">Average annual investment</div>
            </div>
            <div className="text-center border-r border-gray-200 last:border-r-0 pr-8 last:pr-0">
              <div className="text-2xl font-semibold text-gray-900 mb-2">23 FTEs</div>
              <div className="text-sm font-medium text-gray-600 mb-1">Headcount Allocation</div>
              <div className="text-xs text-gray-500">Partnership team size</div>
            </div>
            <div className="text-center border-r border-gray-200 last:border-r-0 pr-8 last:pr-0">
              <div className="text-2xl font-semibold text-gray-900 mb-2">347%</div>
              <div className="text-sm font-medium text-gray-600 mb-1">ROI Estimate</div>
              <div className="text-xs text-gray-500">Blended portfolio ROI</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-semibold text-gray-900 mb-2">$3.2M</div>
              <div className="text-sm font-medium text-gray-600 mb-1">Capital Efficiency</div>
              <div className="text-xs text-gray-500">Revenue per $1M invested</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
