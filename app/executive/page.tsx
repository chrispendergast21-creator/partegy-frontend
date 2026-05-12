'use client';

import { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  DollarSign,
  Users,
  Target,
  Activity,
  Brain,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';
import { PageNavigation } from '@/components/PageNavigation';

interface Partnership {
  id: number;
  name: string;
  health_score: number;
  annual_revenue: number;
  status: string;
  tier: string;
}

// Sample data - same as tenant partnerships
const SAMPLE_PARTNERSHIPS: Partnership[] = [
  { id: 1, name: 'Acme Corporation', health_score: 92, annual_revenue: 5200000, status: 'Active', tier: 'Strategic' },
  { id: 2, name: 'Demo Partnership', health_score: 87, annual_revenue: 2500000, status: 'Active', tier: 'Strategic' },
  { id: 3, name: 'TechVenture Inc', health_score: 78, annual_revenue: 1800000, status: 'Active', tier: 'Growth' },
  { id: 4, name: 'Global Solutions Ltd', health_score: 95, annual_revenue: 4100000, status: 'Active', tier: 'Strategic' },
  { id: 5, name: 'Innovation Partners', health_score: 82, annual_revenue: 2200000, status: 'Active', tier: 'Strategic' },
  { id: 6, name: 'Enterprise Systems Co', health_score: 68, annual_revenue: 3500000, status: 'Active', tier: 'Growth' },
  { id: 7, name: 'Cloud Services Group', health_score: 88, annual_revenue: 2900000, status: 'Active', tier: 'Strategic' },
  { id: 8, name: 'Digital Dynamics', health_score: 91, annual_revenue: 1600000, status: 'Active', tier: 'Growth' },
  { id: 9, name: 'NextGen Technologies', health_score: 65, annual_revenue: 2800000, status: 'Active', tier: 'Growth' },
  { id: 10, name: 'Strategic Alliance Corp', health_score: 89, annual_revenue: 3700000, status: 'Active', tier: 'Strategic' },
  { id: 11, name: 'Platform Partners', health_score: 76, annual_revenue: 1900000, status: 'Active', tier: 'Transactional' },
  { id: 12, name: 'Integration Systems', health_score: 94, annual_revenue: 4500000, status: 'Active', tier: 'Strategic' },
  { id: 13, name: 'Market Leaders Inc', health_score: 72, annual_revenue: 2100000, status: 'Active', tier: 'Growth' },
  { id: 14, name: 'Channel Dynamics', health_score: 85, annual_revenue: 3200000, status: 'Active', tier: 'Strategic' },
  { id: 15, name: 'Growth Ventures', health_score: 79, annual_revenue: 1500000, status: 'Active', tier: 'Growth' },
];

export default function ExecutiveDashboard() {
  const [partnerships, setPartnerships] = useState<Partnership[]>(SAMPLE_PARTNERSHIPS);

  // Calculate metrics
  const totalRevenue = partnerships.reduce((sum, p) => sum + (p.annual_revenue || 0), 0);
  const avgHealthScore = partnerships.length > 0 
    ? Math.round(partnerships.reduce((sum, p) => sum + p.health_score, 0) / partnerships.length)
    : 0;
  const atRiskCount = partnerships.filter(p => p.health_score < 70).length;
  const strategicCount = partnerships.filter(p => p.tier === 'Strategic').length;

  const topPerformers = [...partnerships]
    .sort((a, b) => b.health_score - a.health_score)
    .slice(0, 5);

  const atRiskPartnerships = partnerships
    .filter(p => p.health_score < 70)
    .sort((a, b) => a.health_score - b.health_score);

  return (
    <div className="min-h-screen bg-slate-950">
      <PageNavigation />
      
      <div className="max-w-7xl mx-auto px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Executive Dashboard</h1>
              <p className="text-slate-400">Portfolio-level partnership intelligence</p>
            </div>
            <div className="flex items-center space-x-2">
              <Activity className="w-5 h-5 text-emerald-400 animate-pulse" />
              <span className="text-sm text-slate-400">Live Data</span>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Portfolio Value */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <DollarSign className="w-8 h-8 text-emerald-400" />
              <TrendingUp className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="text-3xl font-bold text-white mb-1">
              ${(totalRevenue / 1000000).toFixed(1)}M
            </div>
            <div className="text-slate-400 text-sm">Total Annual Revenue</div>
          </div>

          {/* Portfolio Health */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <Target className="w-8 h-8 text-blue-400" />
              <div className="text-blue-400 text-sm font-medium">AVG</div>
            </div>
            <div className="text-3xl font-bold text-white mb-1">{avgHealthScore}</div>
            <div className="text-slate-400 text-sm">Portfolio Health Score</div>
          </div>

          {/* At-Risk Partnerships */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <AlertTriangle className="w-8 h-8 text-red-400" />
              {atRiskCount > 0 && <TrendingDown className="w-5 h-5 text-red-400" />}
            </div>
            <div className="text-3xl font-bold text-white mb-1">{atRiskCount}</div>
            <div className="text-slate-400 text-sm">Require Attention</div>
          </div>

          {/* Strategic Partnerships */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <Users className="w-8 h-8 text-purple-400" />
              <CheckCircle className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="text-3xl font-bold text-white mb-1">{strategicCount}</div>
            <div className="text-slate-400 text-sm">Strategic Tier</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Top Performers */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Top Performing Partnerships</h2>
              <TrendingUp className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="space-y-4">
              {topPerformers.map((partnership) => (
                <Link 
                  key={partnership.id}
                  href={`/partnership/${partnership.id}`}
                  className="block bg-slate-800/50 border border-slate-700 rounded-lg p-4 hover:border-emerald-500 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="font-semibold text-white mb-1">{partnership.name}</div>
                      <div className="text-sm text-slate-400">
                        ${(partnership.annual_revenue / 1000000).toFixed(1)}M annual revenue
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="text-right">
                        <div className="text-2xl font-bold text-emerald-400">
                          {partnership.health_score}
                        </div>
                        <div className="text-xs text-slate-400">Health</div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-500" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* At-Risk Partnerships */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Partnerships Requiring Attention</h2>
              <AlertTriangle className="w-5 h-5 text-red-400" />
            </div>
            {atRiskPartnerships.length === 0 ? (
              <div className="text-center py-8">
                <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
                <div className="text-slate-400">All partnerships are healthy</div>
              </div>
            ) : (
              <div className="space-y-4">
                {atRiskPartnerships.slice(0, 5).map((partnership) => (
                  <Link 
                    key={partnership.id}
                    href={`/partnership/${partnership.id}`}
                    className="block bg-red-950/20 border border-red-900/50 rounded-lg p-4 hover:border-red-500 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="font-semibold text-white mb-1">{partnership.name}</div>
                        <div className="text-sm text-slate-400">
                          ${(partnership.annual_revenue / 1000000).toFixed(1)}M at risk
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="text-right">
                          <div className="text-2xl font-bold text-red-400">
                            {partnership.health_score}
                          </div>
                          <div className="text-xs text-slate-400">Health</div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-500" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* AI Insights Section */}
        <div className="mt-8 bg-gradient-to-r from-purple-950/30 to-blue-950/30 border border-purple-900/50 rounded-xl p-8">
          <div className="flex items-start space-x-4">
            <Brain className="w-8 h-8 text-purple-400 flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h3 className="text-xl font-bold text-white mb-3">Executive Insights</h3>
              <div className="space-y-3 text-slate-300">
                {atRiskCount > 0 && (
                  <p className="flex items-start space-x-2">
                    <AlertTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-white">{atRiskCount} partnerships</strong> are showing declining health scores and may require executive intervention to prevent revenue impact.
                    </span>
                  </p>
                )}
                <p className="flex items-start space-x-2">
                  <TrendingUp className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>
                    Portfolio health score of <strong className="text-white">{avgHealthScore}</strong> indicates strong overall partnership performance across your ecosystem.
                  </span>
                </p>
                <p className="flex items-start space-x-2">
                  <Target className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-white">{strategicCount} strategic partnerships</strong> represent your highest-value relationships and should receive priority resource allocation.
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Early Warning System - AI Insights */}
        <div className="mt-8 bg-gradient-to-r from-red-950/30 to-orange-950/30 border border-red-900/50 rounded-xl p-8">
          <div className="flex items-start space-x-4 mb-6">
            <AlertTriangle className="w-8 h-8 text-red-400 flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h3 className="text-xl font-bold text-white mb-2">Early Warning System</h3>
              <p className="text-slate-300 text-sm">AI-detected signals requiring executive attention</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Engagement Risk */}
            <div className="bg-red-950/40 border border-red-900/50 rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <TrendingDown className="w-5 h-5 text-red-400" />
                  <span className="font-semibold text-white text-sm">Engagement Risk</span>
                </div>
                <span className="text-red-400 text-xs font-bold uppercase bg-red-950 px-2 py-1 rounded">Critical</span>
              </div>
              <p className="text-slate-300 text-sm">
                <strong className="text-white">Executive participation has declined 47%</strong> over the past 90 days across strategic partnerships.
              </p>
            </div>

            {/* Initiative Risk */}
            <div className="bg-orange-950/40 border border-orange-900/50 rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Target className="w-5 h-5 text-orange-400" />
                  <span className="font-semibold text-white text-sm">Initiative Risk</span>
                </div>
                <span className="text-orange-400 text-xs font-bold uppercase bg-orange-950 px-2 py-1 rounded">High</span>
              </div>
              <p className="text-slate-300 text-sm">
                <strong className="text-white">Three strategic initiatives</strong> have missed milestone updates for 30+ days.
              </p>
            </div>

            {/* Relationship Drift */}
            <div className="bg-yellow-950/40 border border-yellow-900/50 rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Activity className="w-5 h-5 text-yellow-400" />
                  <span className="font-semibold text-white text-sm">Relationship Drift</span>
                </div>
                <span className="text-yellow-400 text-xs font-bold uppercase bg-yellow-950 px-2 py-1 rounded">Medium</span>
              </div>
              <p className="text-slate-300 text-sm">
                Partner engagement frequency is <strong className="text-white">trending below historical baseline</strong> across multiple relationships.
              </p>
            </div>

            {/* Concentration Risk */}
            <div className="bg-red-950/40 border border-red-900/50 rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-5 h-5 text-red-400" />
                  <span className="font-semibold text-white text-sm">Ecosystem Concentration Risk</span>
                </div>
                <span className="text-red-400 text-xs font-bold uppercase bg-red-950 px-2 py-1 rounded">Critical</span>
              </div>
              <p className="text-slate-300 text-sm">
                <strong className="text-white">41% of influenced pipeline</strong> depends on two partner relationships.
              </p>
            </div>
          </div>
        </div>

        {/* Partnership Risk Matrix - Signature Widget */}
        <div className="mt-8 bg-slate-900 border border-slate-800 rounded-xl p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Partnership Risk Matrix</h3>
              <p className="text-slate-400">Portfolio exposure mapped by health score and revenue impact</p>
            </div>
            <div className="flex items-center space-x-2 bg-purple-950/30 border border-purple-900/50 px-3 py-2 rounded-lg">
              <Brain className="w-5 h-5 text-purple-400" />
              <span className="text-purple-300 text-sm font-medium">AI-Powered</span>
            </div>
          </div>

          {/* Risk Matrix Grid */}
          <div className="relative bg-slate-950 rounded-xl p-8 border border-slate-700">
            {/* Y-axis label */}
            <div className="absolute -left-8 top-1/2 -translate-y-1/2 -rotate-90 text-slate-400 text-sm font-medium">
              Revenue Impact
            </div>
            
            {/* X-axis label */}
            <div className="text-center text-slate-400 text-sm font-medium mb-4">
              Partnership Health Score
            </div>

            {/* Matrix Grid */}
            <div className="grid grid-cols-3 gap-4 mb-4">
              {/* High Revenue / Low Health - CRITICAL */}
              <div className="bg-red-950/40 border-2 border-red-500 rounded-lg p-4 min-h-[120px] relative">
                <div className="absolute top-2 right-2 text-red-400 text-xs font-bold">CRITICAL</div>
                <div className="absolute bottom-2 left-2 right-2">
                  <div className="text-white font-semibold text-sm mb-1">Enterprise Systems Co</div>
                  <div className="text-slate-300 text-xs">$3.5M • Health: 68</div>
                </div>
              </div>

              {/* High Revenue / Medium Health - WATCH */}
              <div className="bg-yellow-950/40 border-2 border-yellow-600 rounded-lg p-4 min-h-[120px] relative">
                <div className="absolute top-2 right-2 text-yellow-400 text-xs font-bold">WATCH</div>
                <div className="absolute bottom-2 left-2 right-2">
                  <div className="text-white font-semibold text-sm mb-1">TechVenture Inc</div>
                  <div className="text-slate-300 text-xs">$1.8M • Health: 78</div>
                </div>
              </div>

              {/* High Revenue / High Health - STRONG */}
              <div className="bg-emerald-950/40 border-2 border-emerald-600 rounded-lg p-4 min-h-[120px] relative">
                <div className="absolute top-2 right-2 text-emerald-400 text-xs font-bold">STRONG</div>
                <div className="absolute bottom-2 left-2 right-2">
                  <div className="text-white font-semibold text-sm mb-1">Global Solutions Ltd</div>
                  <div className="text-slate-300 text-xs">$4.1M • Health: 95</div>
                </div>
              </div>

              {/* Medium Revenue / Low Health - HIGH RISK */}
              <div className="bg-orange-950/40 border-2 border-orange-500 rounded-lg p-4 min-h-[120px] relative">
                <div className="absolute top-2 right-2 text-orange-400 text-xs font-bold">HIGH RISK</div>
                <div className="absolute bottom-2 left-2 right-2">
                  <div className="text-white font-semibold text-sm mb-1">NextGen Tech</div>
                  <div className="text-slate-300 text-xs">$2.8M • Health: 65</div>
                </div>
              </div>

              {/* Medium Revenue / Medium Health - MONITOR */}
              <div className="bg-blue-950/40 border border-blue-700 rounded-lg p-4 min-h-[120px] relative">
                <div className="absolute top-2 right-2 text-blue-400 text-xs font-bold">MONITOR</div>
                <div className="absolute bottom-2 left-2 right-2">
                  <div className="text-white font-semibold text-sm mb-1">Innovation Partners</div>
                  <div className="text-slate-300 text-xs">$2.2M • Health: 82</div>
                </div>
              </div>

              {/* Medium Revenue / High Health - HEALTHY */}
              <div className="bg-emerald-950/40 border border-emerald-700 rounded-lg p-4 min-h-[120px] relative">
                <div className="absolute top-2 right-2 text-emerald-400 text-xs font-bold">HEALTHY</div>
                <div className="absolute bottom-2 left-2 right-2">
                  <div className="text-white font-semibold text-sm mb-1">Acme Corporation</div>
                  <div className="text-slate-300 text-xs">$5.2M • Health: 92</div>
                </div>
              </div>

              {/* Low Revenue cells - lighter styling */}
              <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-4 min-h-[120px]"></div>
              <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-4 min-h-[120px]"></div>
              <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-4 min-h-[120px]"></div>
            </div>

            {/* Legend */}
            <div className="flex items-center justify-center space-x-6 text-xs">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded"></div>
                <span className="text-slate-400">Critical Risk</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-orange-500 rounded"></div>
                <span className="text-slate-400">High Risk</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-yellow-600 rounded"></div>
                <span className="text-slate-400">Monitor</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-emerald-600 rounded"></div>
                <span className="text-slate-400">Healthy</span>
              </div>
            </div>
          </div>

          {/* Key Insight */}
          <div className="mt-4 p-4 bg-red-950/30 border border-red-900/50 rounded-lg">
            <p className="text-red-200 text-sm">
              <strong>Executive Action Required:</strong> $6.3M in revenue (15% of portfolio) is concentrated in partnerships with health scores below 70. Immediate intervention recommended.
            </p>
          </div>
        </div>

        {/* Strategic Roadmap */}
        <div className="mt-12 bg-gradient-to-r from-slate-900 to-slate-800 border border-slate-700 rounded-xl p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-3">Product Roadmap: What's Next</h2>
            <p className="text-slate-400">Strategic improvements that will transform Partegy into the executive decision intelligence platform for partnerships</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Executive Briefing Layer */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 hover:border-emerald-600 transition-colors">
              <div className="flex items-start space-x-3 mb-3">
                <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-bold flex-shrink-0">1</div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">Executive Briefing Layer</h3>
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="text-emerald-400 text-xs font-bold uppercase bg-emerald-950 px-2 py-1 rounded">Highest ROI</span>
                    <span className="text-slate-500 text-xs">Q2 2026</span>
                  </div>
                  <p className="text-slate-300 text-sm mb-3">
                    Daily AI-generated briefings that synthesize: portfolio health changes, emerging risks, recommended interventions, and strategic opportunities.
                  </p>
                  <p className="text-slate-400 text-xs italic">
                    "What changed overnight that I need to know about?"
                  </p>
                </div>
              </div>
            </div>

            {/* Behavioral/Predictive Signals */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 hover:border-purple-600 transition-colors">
              <div className="flex items-start space-x-3 mb-3">
                <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center text-white font-bold flex-shrink-0">2</div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">Predictive Partnership Intelligence</h3>
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="text-purple-400 text-xs font-bold uppercase bg-purple-950 px-2 py-1 rounded">Differentiation</span>
                    <span className="text-slate-500 text-xs">Q3 2026</span>
                  </div>
                  <p className="text-slate-300 text-sm mb-3">
                    Machine learning models that predict partnership failure probability 90 days in advance based on engagement patterns, initiative velocity, and stakeholder behavior.
                  </p>
                  <p className="text-slate-400 text-xs italic">
                    "Which partnerships are likely to fail before they actually do?"
                  </p>
                </div>
              </div>
            </div>

            {/* Risk & Impact Framing */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 hover:border-orange-600 transition-colors">
              <div className="flex items-start space-x-3 mb-3">
                <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center text-white font-bold flex-shrink-0">3</div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">Executive Risk Language</h3>
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="text-orange-400 text-xs font-bold uppercase bg-orange-950 px-2 py-1 rounded">CFO-Ready</span>
                    <span className="text-slate-500 text-xs">Q2 2026</span>
                  </div>
                  <p className="text-slate-300 text-sm mb-3">
                    Reframe all metrics in the language executives use for capital allocation decisions: exposure, concentration risk, velocity, strategic alignment, and growth potential.
                  </p>
                  <p className="text-slate-400 text-xs italic">
                    "How much revenue is at risk vs. how much opportunity are we missing?"
                  </p>
                </div>
              </div>
            </div>

            {/* Signature Visualization */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 hover:border-blue-600 transition-colors">
              <div className="flex items-start space-x-3 mb-3">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold flex-shrink-0">4</div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">Ecosystem Dependency Graph</h3>
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="text-blue-400 text-xs font-bold uppercase bg-blue-950 px-2 py-1 rounded">Demo Moment</span>
                    <span className="text-slate-500 text-xs">Q3 2026</span>
                  </div>
                  <p className="text-slate-300 text-sm mb-3">
                    Interactive network visualization showing how partnerships interconnect, where dependencies concentrate, and which relationships are critical paths to revenue.
                  </p>
                  <p className="text-slate-400 text-xs italic">
                    "If this partnership fails, what cascades?"
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-gradient-to-r from-blue-950/30 to-purple-950/30 border border-blue-900/50 rounded-lg">
            <div className="flex items-start space-x-3">
              <Target className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-blue-200 text-sm font-semibold mb-1">Strategic Vision</p>
                <p className="text-slate-300 text-sm">
                  These features transform Partegy from a partnership database into an executive decision intelligence platform — enabling proactive intervention before partnerships fail.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 flex justify-center space-x-4">
          <Link 
            href="/partnerships"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-all"
          >
            View All Partnerships
          </Link>
          <Link 
            href="/admin"
            className="border border-slate-700 hover:border-slate-600 text-slate-300 hover:text-white px-8 py-3 rounded-lg font-semibold transition-all"
          >
            Admin Settings
          </Link>
        </div>
      </div>
    </div>
  );
}
