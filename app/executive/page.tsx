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

        {/* Strategic Roadmap */}
        <div className="mt-12 bg-slate-900 border border-slate-800 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Highest Impact Improvements</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Executive Briefing Layer */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
              <div className="flex items-start space-x-3 mb-3">
                <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-bold flex-shrink-0">1</div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">Executive Briefing Layer</h3>
                  <p className="text-emerald-400 text-sm font-semibold mb-2">Highest ROI improvement</p>
                  <p className="text-slate-300 text-sm">
                    AI-generated executive summaries that synthesize portfolio health, key risks, and recommended interventions into digestible insights.
                  </p>
                </div>
              </div>
            </div>

            {/* Behavioral/Predictive Signals */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
              <div className="flex items-start space-x-3 mb-3">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold flex-shrink-0">2</div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">Behavioral/Predictive Signals</h3>
                  <p className="text-purple-400 text-sm font-semibold mb-2">Signature differentiation</p>
                  <p className="text-slate-300 text-sm">
                    Pattern recognition that detects declining engagement, stalled initiatives, and risk indicators before they impact revenue.
                  </p>
                </div>
              </div>
            </div>

            {/* Risk & Impact Framing */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
              <div className="flex items-start space-x-3 mb-3">
                <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center text-white font-bold flex-shrink-0">3</div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">Risk & Impact Metrics</h3>
                  <p className="text-slate-400 text-sm mb-2">Executives think in:</p>
                  <ul className="text-slate-300 text-sm space-y-1">
                    <li className="flex items-center space-x-2">
                      <span className="text-red-400">•</span>
                      <span><strong>Exposure</strong> - Revenue at risk</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="text-emerald-400">•</span>
                      <span><strong>Growth</strong> - Expansion potential</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="text-yellow-400">•</span>
                      <span><strong>Concentration</strong> - Portfolio balance</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="text-blue-400">•</span>
                      <span><strong>Velocity</strong> - Time to value</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="text-purple-400">•</span>
                      <span><strong>Strategic outcomes</strong> - Goal alignment</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Signature Visualization */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
              <div className="flex items-start space-x-3 mb-3">
                <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center text-white font-bold flex-shrink-0">4</div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">Signature Visualization</h3>
                  <p className="text-blue-400 text-sm font-semibold mb-2">Create a "Partegy moment"</p>
                  <p className="text-slate-300 text-sm">
                    A proprietary partnership health matrix that instantly communicates portfolio status, risk concentration, and strategic alignment.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-950/30 border border-blue-900/50 rounded-lg">
            <p className="text-blue-200 text-sm">
              <strong>Strategic Priority:</strong> These improvements transform Partegy from a partnership tracking system into an executive decision intelligence platform.
            </p>
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
