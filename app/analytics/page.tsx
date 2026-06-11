'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useOrganization } from '@/lib/useOrganization';
import { API_URL } from '@/lib/api';
import { PageNavigation } from '@/components/PageNavigation';
import { TrendingUp, ArrowUpRight, Eye, Building2, DollarSign, Target, BarChart3 } from 'lucide-react';

export default function AnalyticsPage() {
  const { currentOrg } = useOrganization();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentOrg) setTimeout(() => setLoading(false), 800);
  }, [currentOrg]);

  const enterpriseMetrics = {
    partnerRevenue: 90600000,
    portfolioROI: 347,
    capitalEfficiency: 3.2,
    strategicAlignmentPercent: 67.8,
    innovationIndex: 142,
    companyRevenuePercent: 23.4,
    topRevenueConcentrations: [
      { name: 'TechFlow Systems', revenue: 28500000, percentage: 31.4 },
      { name: 'DataSync Partners', revenue: 18200000, percentage: 20.1 },
      { name: 'CloudTech Solutions', revenue: 12100000, percentage: 13.4 }
    ]
  };

  const strategicDecisions = [
    { title: 'Revenue variance detected with TechFlow Systems', detail: '$3.4M shortfall vs. forecast', action: 'Escalate', urgency: 'high', daysOpen: 3 },
    { title: 'Executive engagement decline in DataSync relationship', detail: 'No C-level contact in 45 days', action: 'Schedule Meeting', urgency: 'medium', daysOpen: 8 },
    { title: 'Acquisition opportunity identified', detail: 'CloudEdge AI strategic fit analysis complete', action: 'Review Proposal', urgency: 'low', daysOpen: 21 }
  ];

  return (
    <div className="min-h-screen bg-slate-950">
      <PageNavigation />
      <main className="max-w-7xl mx-auto px-8 py-8 space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Analytics</h1>
          <p className="text-slate-400 mt-1">Partnership intelligence & strategic analysis</p>
        </div>

        {/* Top Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">
            <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center mb-4">
              <DollarSign className="w-6 h-6 text-blue-400" />
            </div>
            <div className="text-3xl font-bold text-white">${(enterpriseMetrics.partnerRevenue / 1000000).toFixed(1)}M</div>
            <div className="text-slate-400 text-sm mt-1">Partnership Revenue YTD</div>
            <div className="flex items-center mt-2">
              <ArrowUpRight className="w-4 h-4 text-emerald-400 mr-1" />
              <span className="text-emerald-400 text-sm">+18.5%</span>
            </div>
          </div>
          <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">
            <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6 text-purple-400" />
            </div>
            <div className="text-3xl font-bold text-white">{enterpriseMetrics.portfolioROI}%</div>
            <div className="text-slate-400 text-sm mt-1">Portfolio ROI</div>
            <div className="flex items-center mt-2">
              <ArrowUpRight className="w-4 h-4 text-emerald-400 mr-1" />
              <span className="text-emerald-400 text-sm">+89% vs avg</span>
            </div>
          </div>
          <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center mb-4">
              <Target className="w-6 h-6 text-emerald-400" />
            </div>
            <div className="text-3xl font-bold text-white">{enterpriseMetrics.strategicAlignmentPercent}%</div>
            <div className="text-slate-400 text-sm mt-1">Strategic Alignment</div>
            <div className="flex items-center mt-2">
              <ArrowUpRight className="w-4 h-4 text-emerald-400 mr-1" />
              <span className="text-emerald-400 text-sm">+5.2pts</span>
            </div>
          </div>
          <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">
            <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center mb-4">
              <BarChart3 className="w-6 h-6 text-orange-400" />
            </div>
            <div className="text-3xl font-bold text-white">${enterpriseMetrics.capitalEfficiency}M</div>
            <div className="text-slate-400 text-sm mt-1">Capital Efficiency</div>
            <div className="flex items-center mt-2">
              <ArrowUpRight className="w-4 h-4 text-emerald-400 mr-1" />
              <span className="text-emerald-400 text-sm">Top quartile</span>
            </div>
          </div>
        </div>

        {/* Risk & Strategic Decisions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-6">Risk & Concentration</h2>
            <div className="space-y-4">
              {enterpriseMetrics.topRevenueConcentrations.map((c, idx) => (
                <div key={idx} className="flex items-center justify-between py-3 border-b border-slate-700 last:border-0">
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-amber-400 mr-3"></div>
                    <span className="text-white text-sm font-medium">{c.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-white text-sm font-semibold">{c.percentage}%</div>
                    <div className="text-slate-400 text-xs">${(c.revenue / 1000000).toFixed(1)}M</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-6">Strategic Allocation Matrix</h2>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Strategic Bet', sub: 'Low Revenue • High Alignment', count: 12, color: 'bg-purple-500/20 border-purple-500/30' },
                { label: 'Protect & Expand', sub: 'High Revenue • High Alignment', count: 8, color: 'bg-emerald-500/20 border-emerald-500/30' },
                { label: 'Exit / Deprioritize', sub: 'Low Revenue • Low Alignment', count: 8, color: 'bg-slate-700 border-slate-600' },
                { label: 'Financial Asset', sub: 'High Revenue • Low Alignment', count: 6, color: 'bg-blue-500/20 border-blue-500/30' },
              ].map((item, idx) => (
                <div key={idx} className={`p-4 rounded-xl border ${item.color}`}>
                  <div className="text-white font-semibold text-sm mb-1">{item.label}</div>
                  <div className="text-slate-400 text-xs mb-3">{item.sub}</div>
                  <div className="text-2xl font-bold text-white">{item.count}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Strategic Decisions */}
        <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Strategic Decisions This Week</h2>
            <span className="px-3 py-1 bg-red-500/20 text-red-400 text-xs font-medium rounded-full">3 pending</span>
          </div>
          <div className="space-y-4">
            {strategicDecisions.map((d, idx) => (
              <div key={idx} className={`border-l-4 ${d.urgency === 'high' ? 'border-red-500' : d.urgency === 'medium' ? 'border-amber-400' : 'border-blue-400'} pl-6 py-4 bg-slate-800 rounded-r-xl flex items-center justify-between`}>
                <div>
                  <h4 className="font-semibold text-white mb-1">{d.title}</h4>
                  <p className="text-slate-400 text-sm">{d.detail}</p>
                  <div className="text-slate-500 text-xs mt-1">{d.daysOpen} days open</div>
                </div>
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg ml-6 flex-shrink-0 transition-colors">
                  {d.action}
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
