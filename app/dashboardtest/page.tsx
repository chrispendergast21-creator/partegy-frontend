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
      <div className="min-h-screen" style={{ backgroundColor: 'var(--color-bg-app)' }}>
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <Building2 className="w-12 h-12 mx-auto mb-4" style={{ color: 'var(--color-text-tertiary)' }} />
            <h2 className="text-xl font-semibold" style={{ color: 'var(--color-text-primary)' }}>No Organization Selected</h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-bg-app)' }}>
      {/* DARK EXECUTIVE HEADER - $50M ARR Feel */}
      <div style={{ backgroundColor: 'var(--color-brand-primary)' }} className="border-b-4" style={{ borderBottomColor: '#1E40AF' }}>
        <div style={{ maxWidth: 'var(--layout-max-width)', padding: '0 var(--layout-padding-horizontal)' }} className="mx-auto py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center" style={{ gap: 'var(--space-6)' }}>
              <div>
                <h1 className="text-white font-semibold" style={{ fontSize: 'var(--font-size-h1)', letterSpacing: '-0.2px' }}>
                  Executive Partnership Cockpit
                </h1>
                <p className="text-blue-200 text-sm mt-1">{currentOrg.name} • Strategic Partnership Capital Allocation</p>
              </div>
              <PageNavigation />
            </div>
            <div className="text-right text-white">
              {loading ? (
                <div className="space-y-2">
                  <div className="h-12 w-32 bg-blue-700 rounded animate-pulse"></div>
                  <div className="h-4 w-40 bg-blue-700 rounded animate-pulse"></div>
                </div>
              ) : (
                <>
                  <div className="text-kpi-primary text-white">{formatRevenue(enterpriseMetrics.partnerRevenue)}</div>
                  <div className="text-blue-200 text-sm">Partnership Revenue YTD</div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <main style={{ maxWidth: 'var(--layout-max-width)', padding: `var(--space-5) var(--layout-padding-horizontal)` }} className="mx-auto space-y-8">
        {/* PORTFOLIO PERFORMANCE SNAPSHOT - COMMAND CENTER */}
        <div className="card-default card-highlight" style={{ backgroundColor: 'var(--color-bg-subtle)', padding: 'var(--space-4)' }}>
          <div className="flex items-start justify-between" style={{ marginBottom: 'var(--space-4)' }}>
            <div>
              <h2 className="section-title">Portfolio Performance Snapshot</h2>
              <div className="section-underline"></div>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-body)' }}>
                Capital allocation generating top-quartile returns
              </p>
            </div>
            <div className="flex" style={{ gap: 'var(--space-6)' }}>
              <div className="text-center">
                {loading ? (
                  <div className="h-12 w-20 bg-gray-200 rounded animate-pulse mx-auto mb-2"></div>
                ) : (
                  <div>
                    <div className="text-kpi-primary">{enterpriseMetrics.portfolioROI}%</div>
                    <div className="flex items-center justify-center mt-1">
                      <ArrowUpRight className="w-4 h-4 delta-positive mr-1" />
                      <span className="delta-positive text-sm">+89% vs avg</span>
                    </div>
                  </div>
                )}
                <div className="text-kpi-label mt-2">Portfolio ROI</div>
              </div>
              <div className="text-center">
                {loading ? (
                  <div className="h-12 w-24 bg-gray-200 rounded animate-pulse mx-auto mb-2"></div>
                ) : (
                  <div>
                    <div className="text-kpi-primary">${enterpriseMetrics.capitalEfficiency}M</div>
                    <div className="flex items-center justify-center mt-1">
                      <ArrowUpRight className="w-4 h-4 delta-positive mr-1" />
                      <span className="delta-positive text-sm">Top quartile</span>
                    </div>
                  </div>
                )}
                <div className="text-kpi-label mt-2">Capital Efficiency</div>
              </div>
            </div>
          </div>
        </div>

        {/* ENTERPRISE IMPACT METRICS - INCREASED DATA CONTRAST */}
        <div className="grid grid-cols-1 lg:grid-cols-3" style={{ gap: 'var(--space-3)' }}>
          <div className="card-default hover-lift">
            <h3 className="section-title" style={{ marginBottom: 'var(--space-3)' }}>Portfolio Enterprise Value</h3>
            <div style={{ marginBottom: 'var(--space-4)' }}>
              <div className="text-kpi-secondary" style={{ marginBottom: 'var(--space-1)' }}>{formatRevenue(enterpriseMetrics.partnerRevenue)}</div>
              <div style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-body)', marginBottom: 'var(--space-1)' }}>
                Revenue Attributed to Partnerships
              </div>
              <div style={{ color: 'var(--color-text-tertiary)', fontSize: 'var(--font-size-caption)' }}>YTD Performance</div>
              <div className="flex items-center mt-2">
                <ArrowUpRight className="w-4 h-4 delta-positive mr-1" />
                <span className="delta-positive text-sm">+18.5%</span>
              </div>
            </div>
            <div style={{ paddingTop: 'var(--space-2)', borderTop: `1px solid var(--color-border-subtle)` }}>
              <div className="text-xl font-semibold" style={{ color: 'var(--color-text-primary)', marginBottom: 'var(--space-1)' }}>
                {enterpriseMetrics.companyRevenuePercent}%
              </div>
              <div style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-body)' }}>
                of Total Company Revenue
              </div>
            </div>
          </div>

          <div className="card-default hover-lift">
            <h3 className="section-title" style={{ marginBottom: 'var(--space-3)' }}>Risk & Concentration</h3>
            <div style={{ marginBottom: 'var(--space-3)' }}>
              <div style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-caption)', fontWeight: 600, marginBottom: 'var(--space-2)' }}>
                TOP REVENUE CONCENTRATIONS
              </div>
              {enterpriseMetrics.topRevenueConcentrations.map((concentration, idx) => (
                <div key={idx} className="flex items-center justify-between py-2" style={{ borderBottom: idx < 2 ? `1px solid var(--color-border-subtle)` : 'none' }}>
                  <div className="flex items-center">
                    <div 
                      className="w-2 h-2 rounded-full mr-3"
                      style={{ backgroundColor: 'var(--color-warning)' }}
                    ></div>
                    <span style={{ color: 'var(--color-text-primary)', fontSize: 'var(--font-size-body)', fontWeight: 500 }}>
                      {concentration.name}
                    </span>
                  </div>
                  <div className="text-right">
                    <div style={{ color: 'var(--color-text-primary)', fontSize: 'var(--font-size-body)', fontWeight: 600 }}>
                      {concentration.percentage}%
                    </div>
                    <div style={{ color: 'var(--color-text-tertiary)', fontSize: 'var(--font-size-caption)' }}>
                      ${(concentration.revenue / 1000000).toFixed(1)}M
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card-default hover-lift">
            <h3 className="section-title" style={{ marginBottom: 'var(--space-3)' }}>Strategic Alignment</h3>
            <div style={{ marginBottom: 'var(--space-4)' }}>
              <div className="text-kpi-secondary" style={{ marginBottom: 'var(--space-1)' }}>
                {enterpriseMetrics.strategicAlignmentPercent}%
              </div>
              <div style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-body)', marginBottom: 'var(--space-1)' }}>
                Aligned to Priority Initiatives
              </div>
              <div style={{ color: 'var(--color-text-tertiary)', fontSize: 'var(--font-size-caption)' }}>AI / Cloud / New Markets</div>
              <div className="flex items-center mt-2">
                <ArrowUpRight className="w-4 h-4 delta-positive mr-1" />
                <span className="delta-positive text-sm">+5.2pts</span>
              </div>
            </div>
            <div style={{ paddingTop: 'var(--space-2)', borderTop: `1px solid var(--color-border-subtle)` }}>
              <div className="text-xl font-semibold" style={{ color: 'var(--color-text-primary)', marginBottom: 'var(--space-1)' }}>
                {enterpriseMetrics.innovationIndex}
              </div>
              <div style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-body)' }}>
                Innovation Contribution Index
              </div>
            </div>
          </div>
        </div>

        {/* STRATEGIC DECISIONS - ELEVATED COMMAND CENTER */}
        <div className="card-strategic brand-accent-subtle">
          <div className="flex items-start justify-between" style={{ marginBottom: 'var(--space-4)' }}>
            <div>
              <h2 className="section-title">Strategic Decisions This Week</h2>
              <div className="section-underline"></div>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-body)' }}>Executive action required</p>
            </div>
            <span 
              className="inline-flex items-center px-3 py-1 rounded text-xs font-medium"
              style={{ backgroundColor: 'var(--color-danger-subtle)', color: 'var(--color-danger)' }}
            >
              3 pending
            </span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            {strategicDecisions.map((decision, idx) => (
              <div 
                key={idx} 
                className="hover-lift"
                style={{
                  borderLeft: `4px solid ${decision.urgency === 'high' ? 'var(--color-brand-primary)' : decision.urgency === 'medium' ? 'var(--color-warning)' : 'var(--color-text-tertiary)'}`,
                  padding: 'var(--space-2)',
                  backgroundColor: 'var(--color-bg-card)',
                  border: `1px solid var(--color-border-subtle)`,
                  borderRadius: 'var(--radius-md)'
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 style={{ color: 'var(--color-text-primary)', fontSize: 'var(--font-size-body)', fontWeight: 600, marginBottom: 'var(--space-1)' }}>
                      {decision.title}
                    </h4>
                    <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-caption)', marginBottom: 'var(--space-1)' }}>
                      {decision.detail}
                    </p>
                    <div style={{ color: 'var(--color-text-tertiary)', fontSize: 'var(--font-size-caption)' }}>
                      {decision.daysOpen} days open
                    </div>
                  </div>
                  <div className="flex items-center" style={{ gap: 'var(--space-2)', marginLeft: 'var(--space-3)' }}>
                    <button 
                      className="brand-accent-bg brand-accent-hover hover-lift px-4 py-2 text-sm font-medium text-white rounded transition-all"
                    >
                      {decision.action}
                    </button>
                    <button 
                      className="p-2 rounded transition-colors"
                      style={{ color: 'var(--color-text-tertiary)' }}
                      onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-brand-primary)'}
                      onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-tertiary)'}
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* STRATEGIC ALLOCATION MATRIX - SUBTLE TINTS */}
        <div className="card-default">
          <div style={{ marginBottom: 'var(--space-4)' }}>
            <h2 className="section-title">Strategic Allocation Matrix</h2>
            <div className="section-underline"></div>
          </div>
          <div className="grid grid-cols-2" style={{ gap: 'var(--space-3)' }}>
            <div 
              className="matrix-strategic-bet hover-lift"
              style={{
                padding: 'var(--space-3)',
                border: `1px solid var(--color-border-subtle)`,
                borderRadius: 'var(--radius-md)'
              }}
            >
              <div className="flex items-center" style={{ marginBottom: 'var(--space-2)' }}>
                <div className="w-3 h-3 rounded-full mr-3 brand-accent-bg"></div>
                <h4 style={{ color: 'var(--color-text-primary)', fontSize: 'var(--font-size-body)', fontWeight: 600 }}>Strategic Bet</h4>
              </div>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-caption)', marginBottom: 'var(--space-2)' }}>
                Low Revenue • High Alignment
              </p>
              <div className="text-kpi-secondary" style={{ marginBottom: 'var(--space-1)' }}>12</div>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-caption)' }}>partnerships</p>
            </div>

            <div 
              className="matrix-protect-expand hover-lift"
              style={{
                padding: 'var(--space-3)',
                border: `1px solid var(--color-border-subtle)`,
                borderRadius: 'var(--radius-md)'
              }}
            >
              <div className="flex items-center" style={{ marginBottom: 'var(--space-2)' }}>
                <div className="w-3 h-3 rounded-full mr-3 brand-accent-bg"></div>
                <h4 style={{ color: 'var(--color-text-primary)', fontSize: 'var(--font-size-body)', fontWeight: 600 }}>Protect & Expand</h4>
              </div>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-caption)', marginBottom: 'var(--space-2)' }}>
                High Revenue • High Alignment
              </p>
              <div className="text-kpi-secondary" style={{ marginBottom: 'var(--space-1)' }}>8</div>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-caption)' }}>partnerships</p>
            </div>

            <div 
              className="matrix-exit hover-lift"
              style={{
                padding: 'var(--space-3)',
                border: `1px solid var(--color-border-subtle)`,
                borderRadius: 'var(--radius-md)'
              }}
            >
              <div className="flex items-center" style={{ marginBottom: 'var(--space-2)' }}>
                <div className="w-3 h-3 rounded-full mr-3 brand-accent-bg"></div>
                <h4 style={{ color: 'var(--color-text-primary)', fontSize: 'var(--font-size-body)', fontWeight: 600 }}>Exit / Deprioritize</h4>
              </div>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-caption)', marginBottom: 'var(--space-2)' }}>
                Low Revenue • Low Alignment
              </p>
              <div className="text-kpi-secondary" style={{ marginBottom: 'var(--space-1)' }}>8</div>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-caption)' }}>partnerships</p>
            </div>

            <div 
              className="matrix-financial-asset hover-lift"
              style={{
                padding: 'var(--space-3)',
                border: `1px solid var(--color-border-subtle)`,
                borderRadius: 'var(--radius-md)'
              }}
            >
              <div className="flex items-center" style={{ marginBottom: 'var(--space-2)' }}>
                <div className="w-3 h-3 rounded-full mr-3 brand-accent-bg"></div>
                <h4 style={{ color: 'var(--color-text-primary)', fontSize: 'var(--font-size-body)', fontWeight: 600 }}>Financial Asset</h4>
              </div>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-caption)', marginBottom: 'var(--space-2)' }}>
                High Revenue • Low Alignment
              </p>
              <div className="text-kpi-secondary" style={{ marginBottom: 'var(--space-1)' }}>6</div>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-caption)' }}>partnerships</p>
            </div>
          </div>
        </div>

        {/* CAPITAL ALLOCATION SUMMARY - INCREASED DENSITY */}
        <div className="card-default">
          <div style={{ marginBottom: 'var(--space-3)' }}>
            <h2 className="section-title">Capital Allocation Summary</h2>
            <div className="section-underline"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4" style={{ gap: 'var(--space-4)' }}>
            <div className="text-center" style={{ borderRight: `1px solid var(--color-border-subtle)`, paddingRight: 'var(--space-4)' }}>
              <div className="text-kxi-secondary" style={{ marginBottom: 'var(--space-1)' }}>$485K</div>
              <div style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-body)', fontWeight: 500, marginBottom: 'var(--space-1)' }}>
                Investment per Partnership
              </div>
              <div style={{ color: 'var(--color-text-tertiary)', fontSize: 'var(--font-size-caption)' }}>Average annual investment</div>
            </div>
            <div className="text-center" style={{ borderRight: `1px solid var(--color-border-subtle)`, paddingRight: 'var(--space-4)' }}>
              <div className="text-kpi-secondary" style={{ marginBottom: 'var(--space-1)' }}>23 FTEs</div>
              <div style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-body)', fontWeight: 500, marginBottom: 'var(--space-1)' }}>
                Headcount Allocation
              </div>
              <div style={{ color: 'var(--color-text-tertiary)', fontSize: 'var(--font-size-caption)' }}>Partnership team size</div>
            </div>
            <div className="text-center" style={{ borderRight: `1px solid var(--color-border-subtle)`, paddingRight: 'var(--space-4)' }}>
              <div className="text-kpi-secondary" style={{ marginBottom: 'var(--space-1)' }}>347%</div>
              <div style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-body)', fontWeight: 500, marginBottom: 'var(--space-1)' }}>
                ROI Estimate
              </div>
              <div style={{ color: 'var(--color-text-tertiary)', fontSize: 'var(--font-size-caption)' }}>Blended portfolio ROI</div>
            </div>
            <div className="text-center">
              <div className="text-kpi-secondary" style={{ marginBottom: 'var(--space-1)' }}>$3.2M</div>
              <div style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-body)', fontWeight: 500, marginBottom: 'var(--space-1)' }}>
                Capital Efficiency
              </div>
              <div style={{ color: 'var(--color-text-tertiary)', fontSize: 'var(--font-size-caption)' }}>Revenue per $1M invested</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
