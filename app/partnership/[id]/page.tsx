'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { PageNavigation } from '@/components/PageNavigation';
import {
  ArrowLeft, Building2, TrendingUp, TrendingDown, DollarSign,
  Calendar, Target, Users, FileText, BarChart3, Brain, Clock,
  Activity, CheckCircle, AlertCircle, Mail, Phone, Edit, Share, Bell
} from 'lucide-react';

export default function PartnershipDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [partnership, setPartnership] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => { loadPartnership(); }, [params.id]);

  const loadPartnership = async () => {
    try {
      setPartnership({
        id: params.id,
        name: "Apex Dynamics",
        health: "healthy",
        health_score: 87,
        partnership_type: "strategic",
        tier: "Strategic",
        status: "Active",
        lifecycle: "Growth",
        revenue: 2500000,
        pipeline: 1800000,
        next_milestone: "Q2 Business Review",
        days_to_milestone: 28,
        strategic_objective: "Partnership demonstrates expansion readiness based on sustained initiative success"
      });
    } finally {
      setLoading(false);
    }
  };

  const healthDimensions = [
    { name: 'Executive Engagement', score: 85, trend: 'up', description: 'Strong C-level relationships and strategic alignment', details: 'Last executive meeting: 2 days ago. Next strategic review: March 15.' },
    { name: 'Value Delivered', score: 78, trend: 'up', description: 'Consistent value creation and mutual benefits', details: 'ROI achieved: 145%. Customer satisfaction: 92%.' },
    { name: 'Revenue Performance', score: 92, trend: 'up', description: 'Exceeding revenue targets and growth metrics', details: 'Q1 target exceeded by 15%. YoY growth: 28%.' },
    { name: 'Operational Excellence', score: 71, trend: 'down', description: 'Some operational challenges need attention', details: 'Recent delivery delays. SLA compliance: 87%.' },
    { name: 'Innovation & Growth', score: 65, trend: 'stable', description: 'Moderate innovation pipeline and expansion', details: '3 joint initiatives in pipeline. R&D collaboration active.' },
    { name: 'Risk & Compliance', score: 88, trend: 'up', description: 'Strong compliance and low risk profile', details: 'All compliance checks passed. Risk score: Low.' }
  ];

  const okrs = [
    {
      objective: 'Expand Market Reach in EMEA',
      keyResults: [
        { description: 'Generate $2M in EMEA revenue', target: 2000000, current: 1650000, unit: '$' },
        { description: 'Onboard 15 new EMEA customers', target: 15, current: 12, unit: 'customers' },
        { description: 'Establish 3 regional partnerships', target: 3, current: 2, unit: 'partnerships' }
      ],
      progress: 78,
      owner: 'Sarah Johnson',
      dueDate: '2026-03-31'
    },
    {
      objective: 'Enhance Product Integration',
      keyResults: [
        { description: 'Complete API v3 integration', target: 100, current: 85, unit: '%' },
        { description: 'Reduce integration time by 50%', target: 50, current: 35, unit: '%' },
        { description: 'Achieve 99.9% uptime SLA', target: 99.9, current: 99.7, unit: '%' }
      ],
      progress: 86,
      owner: 'Michael Chen',
      dueDate: '2026-02-28'
    }
  ];

  const stakeholders = [
    { name: 'John Smith', role: 'Partnership Director', email: 'john@apexdynamics.com', phone: '+1 (555) 123-4567', primary: true, engagement: 95, lastContact: '2 days ago' },
    { name: 'Sarah Johnson', role: 'Account Manager', email: 'sarah@apexdynamics.com', phone: '+1 (555) 234-5678', primary: false, engagement: 87, lastContact: '1 week ago' },
    { name: 'Michael Chen', role: 'Technical Lead', email: 'michael@apexdynamics.com', phone: '+1 (555) 345-6789', primary: false, engagement: 72, lastContact: '3 days ago' }
  ];

  const documents = [
    { name: 'Partnership Agreement 2026.pdf', type: 'Contract', size: '2.4 MB', date: '2026-01-15', status: 'Signed' },
    { name: 'Q1 Business Review Deck.pptx', type: 'Presentation', size: '15.8 MB', date: '2026-02-10', status: 'Final' },
    { name: 'Integration Roadmap.xlsx', type: 'Planning', size: '892 KB', date: '2026-02-05', status: 'Draft' },
    { name: 'Joint Marketing Plan.docx', type: 'Marketing', size: '3.2 MB', date: '2026-01-28', status: 'Approved' }
  ];

  const getHealthColor = (health: string) => {
    switch (health) {
      case 'healthy': return 'from-green-400 to-green-600';
      case 'at-risk': return 'from-yellow-400 to-yellow-600';
      case 'critical': return 'from-red-400 to-red-600';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  const tabs = [
    { id: 'overview', name: 'Overview', icon: BarChart3, description: 'Key metrics and summary' },
    { id: 'health', name: 'Health Analysis', icon: Activity, description: '6-dimension health scoring' },
    { id: 'okrs', name: 'OKRs & Goals', icon: Target, description: 'Objectives and key results' },
    { id: 'stakeholders', name: 'Stakeholders', icon: Users, description: 'Team and contacts' },
    { id: 'sales', name: 'Sales', icon: FileText, description: 'Resources and positioning' },
    { id: 'documents', name: 'Documents', icon: FileText, description: 'Files and agreements' },
    { id: 'ai-insights', name: 'AI Insights', icon: Brain, description: 'Predictive analytics' },
  ];

  if (loading) return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="text-white text-xl">Loading...</div>
    </div>
  );

  if (!partnership) return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="text-white text-xl">Partnership not found</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-950">
      <PageNavigation />

      <main className="max-w-7xl mx-auto px-8 py-8">
        {/* Back + Title */}
        <div className="flex items-center space-x-4 mb-8">
          <button onClick={() => router.push('/partnerships')} className="p-2 text-slate-400 hover:bg-slate-800 rounded-lg transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getHealthColor(partnership.health)} flex items-center justify-center`}>
            <span className="text-xl font-bold text-white">{partnership.name.charAt(0)}</span>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">{partnership.name}</h1>
            <p className="text-slate-400 mt-1">{partnership.partnership_type} • {partnership.tier} Tier • <span className="text-emerald-400 capitalize">{partnership.health}</span></p>
          </div>
          <div className="ml-auto flex items-center space-x-3">
            <button className="flex items-center space-x-2 px-4 py-2 bg-slate-800 border border-slate-700 text-slate-300 rounded-lg hover:bg-slate-700 transition-colors">
              <Bell className="w-4 h-4" /><span>Follow</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-slate-800 border border-slate-700 text-slate-300 rounded-lg hover:bg-slate-700 transition-colors">
              <Share className="w-4 h-4" /><span>Share</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
              <Edit className="w-4 h-4" /><span>Edit</span>
            </button>
          </div>
        </div>

        {/* Health Score Banner */}
        <div className={`bg-gradient-to-r ${getHealthColor(partnership.health)} rounded-2xl p-8 mb-8 text-white`}>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-6xl font-bold mb-2">{partnership.health_score}</div>
              <div className="text-xl font-semibold uppercase tracking-wide mb-2">Overall Health Score</div>
              <p className="text-white/80 max-w-md">{partnership.strategic_objective}</p>
            </div>
            <div className="grid grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold">${((partnership.revenue || 0) / 1000000).toFixed(1)}M</div>
                <div className="text-white/80 text-sm">Annual Revenue</div>
              </div>
              <div>
                <div className="text-3xl font-bold">${((partnership.pipeline || 0) / 1000000).toFixed(1)}M</div>
                <div className="text-white/80 text-sm">Pipeline</div>
              </div>
              <div>
                <div className="text-3xl font-bold">{partnership.days_to_milestone}</div>
                <div className="text-white/80 text-sm">Days to Milestone</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-slate-900 border border-slate-700 rounded-xl p-2 mb-8 overflow-x-auto">
          <div className="flex space-x-1 min-w-max">
            {tabs.map((tab) => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-3 px-5 py-3 rounded-lg transition-all min-w-max ${
                  activeTab === tab.id ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}>
                <tab.icon className="w-4 h-4" />
                <div className="text-left">
                  <div className="font-medium text-sm">{tab.name}</div>
                  <div className={`text-xs ${activeTab === tab.id ? 'text-blue-200' : 'text-slate-500'}`}>{tab.description}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-slate-900 border border-slate-700 rounded-xl p-8">

          {/* OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <h2 className="text-2xl font-bold text-white">Partnership Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <InfoItem label="Partnership Type" value={partnership.partnership_type} />
                  <InfoItem label="Tier" value={partnership.tier} />
                  <InfoItem label="Status" value={partnership.status} />
                </div>
                <div className="space-y-4">
                  <InfoItem label="Lifecycle" value={partnership.lifecycle} />
                  <InfoItem label="Next Milestone" value={partnership.next_milestone} />
                  <InfoItem label="Days to Milestone" value={`${partnership.days_to_milestone} days`} />
                </div>
                <div className="space-y-4">
                  <InfoItem label="Revenue" value={`$${((partnership.revenue || 0) / 1000000).toFixed(1)}M`} />
                  <InfoItem label="Pipeline" value={`$${((partnership.pipeline || 0) / 1000000).toFixed(1)}M`} />
                  <InfoItem label="Health Score" value={`${partnership.health_score}/100`} />
                </div>
              </div>
            </div>
          )}

          {/* HEALTH ANALYSIS */}
          {activeTab === 'health' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white">6-Dimension Health Analysis</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {healthDimensions.map((dim) => (
                  <div key={dim.name} className="bg-slate-800 border border-slate-700 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-white font-semibold">{dim.name}</h3>
                      <div className="flex items-center space-x-2">
                        {dim.trend === 'up' && <TrendingUp className="w-4 h-4 text-emerald-400" />}
                        {dim.trend === 'down' && <TrendingDown className="w-4 h-4 text-red-400" />}
                        {dim.trend === 'stable' && <Clock className="w-4 h-4 text-slate-400" />}
                        <span className={`text-2xl font-bold ${dim.score >= 80 ? 'text-emerald-400' : dim.score >= 65 ? 'text-amber-400' : 'text-red-400'}`}>
                          {dim.score}
                        </span>
                      </div>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2 mb-3">
                      <div
                        className={`h-2 rounded-full ${dim.score >= 80 ? 'bg-emerald-400' : dim.score >= 65 ? 'bg-amber-400' : 'bg-red-400'}`}
                        style={{ width: `${dim.score}%` }}
                      ></div>
                    </div>
                    <p className="text-slate-400 text-sm mb-2">{dim.description}</p>
                    <p className="text-slate-500 text-xs">{dim.details}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* OKRs */}
          {activeTab === 'okrs' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">OKRs & Goals</h2>
                <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm">
                  <Target className="w-4 h-4" /><span>Add OKR</span>
                </button>
              </div>
              {okrs.map((okr, idx) => (
                <div key={idx} className="bg-slate-800 border border-slate-700 rounded-xl p-6">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h3 className="text-white font-bold text-lg">{okr.objective}</h3>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-slate-400">
                        <span>Owner: {okr.owner}</span>
                        <span>Due: {okr.dueDate}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-2xl font-bold ${okr.progress >= 80 ? 'text-emerald-400' : okr.progress >= 60 ? 'text-amber-400' : 'text-red-400'}`}>
                        {okr.progress}%
                      </div>
                      <div className="text-slate-400 text-sm">Overall Progress</div>
                    </div>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2 mb-6">
                    <div className={`h-2 rounded-full ${okr.progress >= 80 ? 'bg-emerald-400' : okr.progress >= 60 ? 'bg-amber-400' : 'bg-red-400'}`}
                      style={{ width: `${okr.progress}%` }}></div>
                  </div>
                  <div className="space-y-4">
                    {okr.keyResults.map((kr, kIdx) => {
                      const pct = Math.min(100, (kr.current / kr.target) * 100);
                      return (
                        <div key={kIdx} className="bg-slate-700/50 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-slate-300 text-sm">{kr.description}</span>
                            <span className="text-white font-semibold text-sm">
                              {kr.unit === '$' ? `$${(kr.current / 1000000).toFixed(1)}M / $${(kr.target / 1000000).toFixed(1)}M` : `${kr.current} / ${kr.target} ${kr.unit}`}
                            </span>
                          </div>
                          <div className="w-full bg-slate-600 rounded-full h-1.5">
                            <div className="h-1.5 rounded-full bg-blue-400" style={{ width: `${pct}%` }}></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* STAKEHOLDERS */}
          {activeTab === 'stakeholders' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">Stakeholders</h2>
                <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm">
                  <Users className="w-4 h-4" /><span>Add Stakeholder</span>
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {stakeholders.map((s, idx) => (
                  <div key={idx} className="bg-slate-800 border border-slate-700 rounded-xl p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold">{s.name.split(' ').map((n: string) => n[0]).join('')}</span>
                        </div>
                        <div>
                          <div className="text-white font-semibold">{s.name}</div>
                          <div className="text-slate-400 text-sm">{s.role}</div>
                        </div>
                      </div>
                      {s.primary && <span className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full">Primary</span>}
                    </div>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center space-x-2 text-slate-400 text-sm">
                        <Mail className="w-4 h-4" /><span>{s.email}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-slate-400 text-sm">
                        <Phone className="w-4 h-4" /><span>{s.phone}</span>
                      </div>
                    </div>
                    <div className="border-t border-slate-700 pt-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-slate-400 text-sm">Engagement</span>
                        <span className={`font-semibold text-sm ${s.engagement >= 80 ? 'text-emerald-400' : s.engagement >= 60 ? 'text-amber-400' : 'text-red-400'}`}>{s.engagement}%</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-1.5 mb-3">
                        <div className={`h-1.5 rounded-full ${s.engagement >= 80 ? 'bg-emerald-400' : s.engagement >= 60 ? 'bg-amber-400' : 'bg-red-400'}`}
                          style={{ width: `${s.engagement}%` }}></div>
                      </div>
                      <div className="text-slate-500 text-xs">Last contact: {s.lastContact}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SALES */}
          {activeTab === 'sales' && (
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">Sales Resources</h2>
              </div>

              {/* Company Overview */}
              <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <Target className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg">Company Overview</h3>
                    <p className="text-slate-400 text-sm">What you need to know before a call</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-slate-700/50 rounded-lg p-4"><div className="text-slate-400 text-xs uppercase tracking-wide mb-1">Industry</div><div className="text-white font-medium">Enterprise Technology</div></div>
                  <div className="bg-slate-700/50 rounded-lg p-4"><div className="text-slate-400 text-xs uppercase tracking-wide mb-1">Company Size</div><div className="text-white font-medium">500-1,000 employees</div></div>
                  <div className="bg-slate-700/50 rounded-lg p-4"><div className="text-slate-400 text-xs uppercase tracking-wide mb-1">HQ</div><div className="text-white font-medium">San Francisco, CA</div></div>
                  <div className="bg-slate-700/50 rounded-lg p-4"><div className="text-slate-400 text-xs uppercase tracking-wide mb-1">Target Market</div><div className="text-white font-medium">Mid-market and Enterprise</div></div>
                </div>
              </div>

              {/* Positioning */}
              <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg">How to Position Partegy</h3>
                    <p className="text-slate-400 text-sm">Tailored messaging for this partner</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="border border-blue-500/30 bg-blue-950/20 rounded-xl p-4">
                    <div className="text-xs font-bold uppercase tracking-wide text-slate-400 mb-2">Elevator Pitch</div>
                    <p className="text-slate-300 text-sm leading-relaxed">Partegy gives your partnership team a single governance layer — health scoring, behavioral signals, and executive-level visibility — so nothing falls through the cracks and leadership always knows what is at risk.</p>
                  </div>
                  <div className="border border-amber-500/30 bg-amber-950/20 rounded-xl p-4">
                    <div className="text-xs font-bold uppercase tracking-wide text-slate-400 mb-2">Their Pain Points</div>
                    <p className="text-slate-300 text-sm leading-relaxed">Partners at this tier typically struggle with inconsistent QBR preparation, lack of exec visibility into partnership health, and no early warning system before relationships go cold.</p>
                  </div>
                  <div className="border border-emerald-500/30 bg-emerald-950/20 rounded-xl p-4">
                    <div className="text-xs font-bold uppercase tracking-wide text-slate-400 mb-2">Key Value Props</div>
                    <p className="text-slate-300 text-sm leading-relaxed">Proprietary health scoring across 6 dimensions, AI-powered early warning signals, executive risk matrix, and behavioral intelligence — all in one governed platform.</p>
                  </div>
                  <div className="border border-purple-500/30 bg-purple-950/20 rounded-xl p-4">
                    <div className="text-xs font-bold uppercase tracking-wide text-slate-400 mb-2">Objection Handling</div>
                    <p className="text-slate-300 text-sm leading-relaxed">We already use Salesforce/HubSpot — Partegy governs partnerships, not pipeline. CRMs track revenue, not relationship health, executive engagement, or strategic alignment.</p>
                  </div>
                </div>
              </div>

              {/* Marketing PDFs */}
              <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg">Marketing Materials</h3>
                    <p className="text-slate-400 text-sm">PDFs and decks ready to share</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="bg-slate-700/50 border border-slate-600 rounded-xl p-4 flex items-center justify-between hover:border-blue-500 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-lg bg-red-500/20 text-red-400 flex items-center justify-center text-xs font-bold">PDF</div>
                      <div><div className="text-white font-medium text-sm">Partegy One-Pager.pdf</div><div className="text-slate-400 text-xs mt-0.5">High-level overview for executive intro meetings</div></div>
                    </div>
                    <Download className="w-4 h-4 text-slate-400 hover:text-white" />
                  </div>
                  <div className="bg-slate-700/50 border border-slate-600 rounded-xl p-4 flex items-center justify-between hover:border-blue-500 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-lg bg-red-500/20 text-red-400 flex items-center justify-center text-xs font-bold">PDF</div>
                      <div><div className="text-white font-medium text-sm">Partnership Governance Overview.pdf</div><div className="text-slate-400 text-xs mt-0.5">Deep dive into how Partegy governs partnerships</div></div>
                    </div>
                    <Download className="w-4 h-4 text-slate-400 hover:text-white" />
                  </div>
                  <div className="bg-slate-700/50 border border-slate-600 rounded-xl p-4 flex items-center justify-between hover:border-blue-500 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center text-xs font-bold">PPT</div>
                      <div><div className="text-white font-medium text-sm">Executive Demo Deck.pptx</div><div className="text-slate-400 text-xs mt-0.5">Slide deck for live demos with leadership</div></div>
                    </div>
                    <Download className="w-4 h-4 text-slate-400 hover:text-white" />
                  </div>
                  <div className="bg-slate-700/50 border border-slate-600 rounded-xl p-4 flex items-center justify-between hover:border-blue-500 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-lg bg-red-500/20 text-red-400 flex items-center justify-center text-xs font-bold">PDF</div>
                      <div><div className="text-white font-medium text-sm">Competitive Comparison.pdf</div><div className="text-slate-400 text-xs mt-0.5">How Partegy compares to CRM, PRM, and spreadsheets</div></div>
                    </div>
                    <Download className="w-4 h-4 text-slate-400 hover:text-white" />
                  </div>
                </div>
              </div>

              {/* Useful Links */}
              <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
                <h3 className="text-white font-bold text-lg mb-4">Useful Links</h3>
                <div className="space-y-3">
                  <a href="https://partegy.co/landing" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-colors group">
                    <span className="text-slate-300 text-sm group-hover:text-white">Partegy Landing Page</span>
                    <ArrowLeft className="w-4 h-4 text-slate-500 rotate-180 group-hover:text-blue-400" />
                  </a>
                  <a href="#" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-colors group">
                    <span className="text-slate-300 text-sm group-hover:text-white">Partner Website</span>
                    <ArrowLeft className="w-4 h-4 text-slate-500 rotate-180 group-hover:text-blue-400" />
                  </a>
                  <a href="#" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-colors group">
                    <span className="text-slate-300 text-sm group-hover:text-white">LinkedIn Company Page</span>
                    <ArrowLeft className="w-4 h-4 text-slate-500 rotate-180 group-hover:text-blue-400" />
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* DOCUMENTS */}
          {activeTab === 'documents' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">Documents</h2>
                <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm">
                  <FileText className="w-4 h-4" /><span>Upload Document</span>
                </button>
              </div>
              <div className="space-y-3">
                {documents.map((doc, idx) => (
                  <div key={idx} className="bg-slate-800 border border-slate-700 rounded-xl p-5 flex items-center justify-between hover:border-blue-500 transition-colors cursor-pointer">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                        <FileText className="w-5 h-5 text-blue-400" />
                      </div>
                      <div>
                        <div className="text-white font-medium">{doc.name}</div>
                        <div className="text-slate-400 text-sm">{doc.type} • {doc.size} • {doc.date}</div>
                      </div>
                    </div>
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      doc.status === 'Signed' ? 'bg-emerald-500/20 text-emerald-300' :
                      doc.status === 'Final' ? 'bg-blue-500/20 text-blue-300' :
                      doc.status === 'Draft' ? 'bg-amber-500/20 text-amber-300' :
                      'bg-purple-500/20 text-purple-300'
                    }`}>{doc.status}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* AI INSIGHTS */}
          {activeTab === 'ai-insights' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white">AI Insights</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-800 border border-blue-500/30 rounded-xl p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                      <Brain className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <div className="text-white font-semibold">Predictive Health Score</div>
                      <div className="text-slate-400 text-sm">30-day forecast</div>
                    </div>
                  </div>
                  <div className="text-4xl font-bold text-blue-400 mb-2">91</div>
                  <p className="text-slate-400 text-sm">Based on current engagement trends and revenue trajectory, health score is projected to improve by 4 points over the next 30 days.</p>
                </div>

                <div className="bg-slate-800 border border-emerald-500/30 rounded-xl p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                      <div className="text-white font-semibold">Expansion Signal</div>
                      <div className="text-slate-400 text-sm">Growth opportunity detected</div>
                    </div>
                  </div>
                  <div className="text-4xl font-bold text-emerald-400 mb-2">High</div>
                  <p className="text-slate-400 text-sm">This partnership shows strong indicators for expansion into APAC markets based on engagement patterns and revenue growth velocity.</p>
                </div>

                <div className="bg-slate-800 border border-amber-500/30 rounded-xl p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-amber-500/20 rounded-lg flex items-center justify-center">
                      <AlertCircle className="w-5 h-5 text-amber-400" />
                    </div>
                    <div>
                      <div className="text-white font-semibold">Risk Detection</div>
                      <div className="text-slate-400 text-sm">Early warning signals</div>
                    </div>
                  </div>
                  <div className="text-4xl font-bold text-amber-400 mb-2">Low</div>
                  <p className="text-slate-400 text-sm">Operational excellence score declined 5 points. Monitor delivery SLAs in European region to prevent further deterioration.</p>
                </div>

                <div className="bg-slate-800 border border-purple-500/30 rounded-xl p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <div className="text-white font-semibold">Recommended Actions</div>
                      <div className="text-slate-400 text-sm">AI-generated playbook</div>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {['Schedule executive alignment call before Q2 review', 'Address EU delivery delays within 2 weeks', 'Propose APAC expansion roadmap in next QBR'].map((action, i) => (
                      <li key={i} className="flex items-start space-x-2 text-sm text-slate-300">
                        <CheckCircle className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                        <span>{action}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function InfoItem({ label, value }: any) {
  return (
    <div>
      <div className="text-sm text-slate-400 mb-1">{label}</div>
      <div className="font-semibold text-white capitalize">{value}</div>
    </div>
  );
}
