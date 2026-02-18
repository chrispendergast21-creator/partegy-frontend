'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import { API_URL } from '@/lib/api';
import {
  ArrowLeft,
  Building2,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Calendar,
  Target,
  Users,
  FileText,
  BarChart3,
  Brain,
  Clock,
  Activity,
  CheckCircle,
  AlertCircle,
  Mail,
  Phone,
  Star,
  Zap,
  Edit,
  Share,
  Bell
} from 'lucide-react';

export default function PartnershipDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [partnership, setPartnership] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    loadPartnership();
  }, [params.id]);

  const loadPartnership = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/partnerships/${params.id}`);
      setPartnership(response.data);
    } catch (error) {
      console.error('Failed to load partnership:', error);
    } finally {
      setLoading(false);
    }
  };

  // Mock comprehensive data for tabs
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
    {
      name: 'John Smith',
      role: 'Partnership Director',
      email: 'john@partner.com',
      phone: '+1 (555) 123-4567',
      primary: true,
      engagement: 95,
      lastContact: '2 days ago',
      avatar: 'JS'
    },
    {
      name: 'Sarah Johnson',
      role: 'Account Manager',
      email: 'sarah@partner.com',
      phone: '+1 (555) 234-5678',
      primary: false,
      engagement: 87,
      lastContact: '1 week ago',
      avatar: 'SJ'
    },
    {
      name: 'Michael Chen',
      role: 'Technical Lead',
      email: 'michael@partner.com',
      phone: '+1 (555) 345-6789',
      primary: false,
      engagement: 72,
      lastContact: '3 days ago',
      avatar: 'MC'
    }
  ];

  const documents = [
    { name: 'Partnership Agreement 2026.pdf', type: 'Contract', size: '2.4 MB', date: '2026-01-15', status: 'Signed' },
    { name: 'Q1 Business Review Deck.pptx', type: 'Presentation', size: '15.8 MB', date: '2026-02-10', status: 'Final' },
    { name: 'Integration Roadmap.xlsx', type: 'Planning', size: '892 KB', date: '2026-02-05', status: 'Draft' },
    { name: 'Joint Marketing Plan.docx', type: 'Marketing', size: '3.2 MB', date: '2026-01-28', status: 'Approved' }
  ];

  const timeline = [
    {
      date: '2026-02-16',
      title: 'Q4 Business Review Completed',
      description: 'Quarterly performance review conducted with positive outcomes. Revenue targets exceeded by 12%.',
      type: 'milestone',
      impact: 'positive'
    },
    {
      date: '2026-02-15',
      title: 'Operational Score Declined',
      description: 'Operational excellence score dropped by 5 points due to delivery delays in the European region.',
      type: 'alert',
      impact: 'caution'
    },
    {
      date: '2026-02-13',
      title: 'New Integration Deployed',
      description: 'API v2.1 integration successfully deployed. Reduced response time by 40%.',
      type: 'achievement',
      impact: 'positive'
    },
    {
      date: '2026-02-10',
      title: 'Executive Alignment Meeting',
      description: 'Strategic planning session with C-level stakeholders. Approved expansion into APAC markets.',
      type: 'meeting',
      impact: 'neutral'
    }
  ];

  const aiInsights = [
    {
      type: 'opportunity',
      title: 'APAC Expansion Opportunity',
      description: 'AI analysis suggests 87% success probability for expanding into APAC markets based on current partnership performance and market conditions.',
      confidence: 87,
      priority: 'high',
      action: 'Schedule expansion strategy meeting'
    },
    {
      type: 'risk',
      title: 'Operational Risk Alert',
      description: 'Recent operational score decline indicates potential delivery bottlenecks. Historical data suggests proactive intervention needed.',
      confidence: 92,
      priority: 'medium',
      action: 'Review operational processes'
    },
    {
      type: 'optimization',
      title: 'Resource Allocation Optimization',
      description: 'Partnership showing signs of resource underutilization. AI recommends reallocating 15% more resources for optimal ROI.',
      confidence: 78,
      priority: 'low',
      action: 'Adjust resource allocation'
    }
  ];

  const getHealthColor = (health: string) => {
    switch (health) {
      case 'healthy': return 'from-green-400 to-green-600';
      case 'at-risk': return 'from-yellow-400 to-yellow-600';
      case 'critical': return 'from-red-400 to-red-600';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return TrendingUp;
      case 'down': return TrendingDown;
      default: return Clock;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return 'text-green-600';
      case 'down': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#60a5fa] to-[#60e1fa] flex items-center justify-center mb-4 animate-pulse">
            <Building2 className="w-8 h-8 text-white" />
          </div>
          <div className="text-xl font-semibold text-gray-900">Loading Partnership Details...</div>
        </div>
      </div>
    );
  }

  if (!partnership) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <div className="text-xl font-semibold text-gray-900">Partnership not found</div>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', name: 'Overview', icon: BarChart3, description: 'Key metrics and summary' },
    { id: 'health', name: 'Health Analysis', icon: Activity, description: '6-dimension health scoring' },
    { id: 'okrs', name: 'OKRs & Goals', icon: Target, description: 'Objectives and key results' },
    { id: 'stakeholders', name: 'Stakeholders', icon: Users, description: 'Team and contacts' },
    { id: 'documents', name: 'Documents', icon: FileText, description: 'Files and agreements' },
    { id: 'ai-insights', name: 'AI Insights', icon: Brain, description: 'Predictive analytics' },
    { id: 'timeline', name: 'Timeline', icon: Clock, description: 'Activity history' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#1e293b] via-[#334155] to-[#475569] border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push('/partnerships')}
                className="p-2 text-gray-300 hover:bg-white/10 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${getHealthColor(partnership.health)} flex items-center justify-center`}>
                <span className="text-2xl font-bold text-white">
                  {partnership.name.charAt(0)}
                </span>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-[#60a5fa] to-[#60e1fa] bg-clip-text text-transparent">
                  {partnership.name}
                </h1>
                <p className="text-gray-300 mt-1 flex items-center space-x-2">
                  <span>{partnership.partnership_type?.replace('_', ' ')}</span>
                  <span>•</span>
                  <span>{partnership.tier} Tier</span>
                  <span>•</span>
                  <span className="flex items-center space-x-1">
                    <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${getHealthColor(partnership.health)}`}></div>
                    <span className="capitalize">{partnership.health}</span>
                  </span>
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button className="flex items-center space-x-2 px-4 py-2 bg-white/10 backdrop-blur-sm text-white border border-white/20 rounded-lg hover:bg-white/20 transition-all">
                <Bell className="w-4 h-4" />
                <span>Follow</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 bg-white/10 backdrop-blur-sm text-white border border-white/20 rounded-lg hover:bg-white/20 transition-all">
                <Share className="w-4 h-4" />
                <span>Share</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-[#60a5fa] to-[#60e1fa] text-white rounded-lg hover:shadow-lg transition-all">
                <Edit className="w-4 h-4" />
                <span>Edit</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-8 py-8">
        {/* Health Score Banner */}
        <div className={`bg-gradient-to-r ${getHealthColor(partnership.health)} rounded-2xl shadow-xl p-8 mb-8 text-white`}>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-6xl font-bold mb-2">{partnership.health_score}</div>
              <div className="text-xl font-semibold uppercase tracking-wide mb-2">Overall Health Score</div>
              <p className="text-white/80 max-w-md">
                {partnership.strategic_objective}
              </p>
            </div>
            <div className="grid grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold mb-1">${((partnership.revenue || 0) / 1000000).toFixed(1)}M</div>
                <div className="text-white/80 text-sm">Annual Revenue</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-1">${((partnership.pipeline || 0) / 1000000).toFixed(1)}M</div>
                <div className="text-white/80 text-sm">Pipeline</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-1">{partnership.days_to_milestone}</div>
                <div className="text-white/80 text-sm">Days to Milestone</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-2 mb-8 overflow-x-auto">
          <div className="flex space-x-1 min-w-max">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-3 px-6 py-4 rounded-xl transition-all min-w-max ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-[#60a5fa] to-[#60e1fa] text-white shadow-lg'
                    : 'text-gray-600 hover:bg-white/50'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <div className="text-left">
                  <div className="font-medium">{tab.name}</div>
                  <div className={`text-xs ${activeTab === tab.id ? 'text-white/80' : 'text-gray-500'}`}>
                    {tab.description}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Partnership Overview</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-4">
                    <InfoItem label="Partnership Type" value={partnership.partnership_type?.replace('_', ' ')} />
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
            </div>
          )}

          {/* Health Analysis Tab */}
          {activeTab === 'health' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Health Dimension Analysis</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {healthDimensions.map((dimension, idx) => (
                  <HealthDimensionCard key={idx} dimension={dimension} />
                ))}
              </div>
            </div>
          )}

          {/* OKRs Tab */}
          {activeTab === 'okrs' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">OKRs & Strategic Goals</h2>
                <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-[#60a5fa] to-[#60e1fa] text-white rounded-lg">
                  <Target className="w-4 h-4" />
                  <span>Add OKR</span>
                </button>
              </div>
              <div className="space-y-6">
                {okrs.map((okr, idx) => (
                  <OKRCard key={idx} okr={okr} />
                ))}
              </div>
            </div>
          )}

          {/* Stakeholders Tab */}
          {activeTab === 'stakeholders' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Partnership Stakeholders</h2>
                <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-[#60a5fa] to-[#60e1fa] text-white rounded-lg">
                  <Users className="w-4 h-4" />
                  <span>Add Stakeholder</span>
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {stakeholders.map((stakeholder, idx) => (
                  <StakeholderCard key={idx} stakeholder={stakeholder} />
                ))}
              </div>
            </div>
          )}

          {/* Documents Tab */}
          {activeTab === 'documents' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Partnership Documents</h2>
                <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-[#60a5fa] to-[#60e1fa] text-white rounded-lg">
                  <FileText className="w-4 h-4" />
                  <span>Upload Document</span>
                </button>
              </div>
              <div className="space-y-4">
                {documents.map((doc, idx) => (
                  <DocumentItem key={idx} document={doc} />
                ))}
              </div>
            </div>
          )}

          {/* AI Insights Tab */}
          {activeTab === 'ai-insights' && (
            <div>
              <div className="bg-gradient-to-r from-[#60a5fa] to-[#60e1fa] rounded-xl p-6 mb-8 text-white">
                <div className="flex items-center space-x-3">
                  <Brain className="w-8 h-8" />
                  <div>
                    <h2 className="text-2xl font-bold">AI-Powered Partnership Intelligence</h2>
                    <p className="text-white/80">Advanced analysis based on partnership patterns and predictive modeling</p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {aiInsights.map((insight, idx) => (
                  <AIInsightCard key={idx} insight={insight} />
                ))}
              </div>
            </div>
          )}

          {/* Timeline Tab */}
          {activeTab === 'timeline' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Partnership Timeline</h2>
              <div className="space-y-6">
                {timeline.map((event, idx) => (
                  <TimelineEvent key={idx} event={event} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

// Component definitions
function InfoItem({ label, value }: any) {
  return (
    <div>
      <div className="text-sm text-gray-600 mb-1">{label}</div>
      <div className="font-semibold text-gray-900">{value}</div>
    </div>
  );
}

function HealthDimensionCard({ dimension }: any) {
  const TrendIcon = dimension.trend === 'up' ? TrendingUp : dimension.trend === 'down' ? TrendingDown : Clock;
  const trendColor = dimension.trend === 'up' ? 'text-green-600' : dimension.trend === 'down' ? 'text-red-600' : 'text-gray-600';

  return (
    <div className="p-6 bg-gray-50 rounded-xl">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{dimension.name}</h3>
        <div className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-gray-900">{dimension.score}</span>
          <TrendIcon className={`w-5 h-5 ${trendColor}`} />
        </div>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3 mb-3">
        <div
          className="h-3 rounded-full bg-gradient-to-r from-[#60a5fa] to-[#60e1fa] transition-all duration-700"
          style={{ width: `${dimension.score}%` }}
        ></div>
      </div>
      <p className="text-sm text-gray-600 mb-2">{dimension.description}</p>
      <p className="text-xs text-gray-500">{dimension.details}</p>
    </div>
  );
}

function OKRCard({ okr }: any) {
  return (
    <div className="border border-gray-200 rounded-xl p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{okr.objective}</h3>
          <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
            <span>Owner: {okr.owner}</span>
            <span>Due: {okr.dueDate}</span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-gray-900">{okr.progress}%</div>
          <div className="text-sm text-gray-600">Complete</div>
        </div>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
        <div
          className="h-2 rounded-full bg-gradient-to-r from-[#60a5fa] to-[#60e1fa]"
          style={{ width: `${okr.progress}%` }}
        ></div>
      </div>

      <div className="space-y-4">
        {okr.keyResults.map((kr: any, idx: number) => (
          <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <span className="text-sm text-gray-700">{kr.description}</span>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-semibold">
                {kr.current}{kr.unit === '$' ? '' : ' ' + kr.unit} / {kr.target}{kr.unit === '$' ? '' : ' ' + kr.unit}
              </span>
              <div className="w-16 bg-gray-200 rounded-full h-2">
                <div
                  className="h-2 rounded-full bg-green-500"
                  style={{ width: `${Math.min((kr.current / kr.target) * 100, 100)}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StakeholderCard({ stakeholder }: any) {
  return (
    <div className="p-6 bg-gray-50 rounded-xl">
      <div className="flex items-center space-x-4 mb-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#60a5fa] to-[#60e1fa] flex items-center justify-center">
          <span className="text-white font-semibold text-sm">{stakeholder.avatar}</span>
        </div>
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-gray-900">{stakeholder.name}</span>
            {stakeholder.primary && (
              <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">Primary</span>
            )}
          </div>
          <div className="text-sm text-gray-600">{stakeholder.role}</div>
        </div>
      </div>
      
      <div className="space-y-2 text-sm mb-4">
        <div className="flex items-center space-x-2 text-gray-600">
          <Mail className="w-4 h-4" />
          <span>{stakeholder.email}</span>
        </div>
        <div className="flex items-center space-x-2 text-gray-600">
          <Phone className="w-4 h-4" />
          <span>{stakeholder.phone}</span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-gray-200">
        <div>
          <div className="text-xs text-gray-500">Engagement</div>
          <div className="text-sm font-semibold text-gray-900">{stakeholder.engagement}%</div>
        </div>
        <div>
          <div className="text-xs text-gray-500">Last Contact</div>
          <div className="text-sm font-semibold text-gray-900">{stakeholder.lastContact}</div>
        </div>
      </div>
    </div>
  );
}

function DocumentItem({ document }: any) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Signed': return 'bg-green-100 text-green-800';
      case 'Final': return 'bg-blue-100 text-blue-800';
      case 'Approved': return 'bg-purple-100 text-purple-800';
      case 'Draft': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
      <div className="flex items-center space-x-4">
        <FileText className="w-8 h-8 text-[#60a5fa]" />
        <div>
          <div className="font-medium text-gray-900">{document.name}</div>
          <div className="text-sm text-gray-600 flex items-center space-x-2">
            <span>{document.type}</span>
            <span>•</span>
            <span>{document.size}</span>
            <span>•</span>
            <span>{document.date}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(document.status)}`}>
          {document.status}
        </span>
        <button className="p-2 text-gray-400 hover:text-[#60a5fa] rounded-lg hover:bg-white transition-colors">
          <FileText className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

function AIInsightCard({ insight }: any) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'from-red-400 to-red-600';
      case 'medium': return 'from-yellow-400 to-yellow-600';
      case 'low': return 'from-green-400 to-green-600';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${getPriorityColor(insight.priority)} flex items-center justify-center`}>
          <Zap className="w-6 h-6 text-white" />
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-600">Confidence</div>
          <div className="text-lg font-bold text-gray-900">{insight.confidence}%</div>
        </div>
      </div>
      
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{insight.title}</h3>
      <p className="text-gray-600 mb-4">{insight.description}</p>
      
      <div className="flex items-center justify-between">
        <span className={`px-3 py-1 rounded-full text-xs font-medium text-white bg-gradient-to-r ${getPriorityColor(insight.priority)}`}>
          {insight.priority.toUpperCase()} PRIORITY
        </span>
        <button className="text-[#60a5fa] hover:text-[#3b82f6] text-sm font-medium">
          {insight.action}
        </button>
      </div>
    </div>
  );
}

function TimelineEvent({ event }: any) {
  const getEventIcon = (type: string) => {
    switch (type) {
      case 'milestone': return CheckCircle;
      case 'alert': return AlertCircle;
      case 'achievement': return Star;
      case 'meeting': return Users;
      default: return Clock;
    }
  };

  const getEventColor = (impact: string) => {
    switch (impact) {
      case 'positive': return 'from-green-400 to-green-600';
      case 'caution': return 'from-yellow-400 to-yellow-600';
      case 'negative': return 'from-red-400 to-red-600';
      default: return 'from-blue-400 to-blue-600';
    }
  };

  const EventIcon = getEventIcon(event.type);

  return (
    <div className="flex items-start space-x-4">
      <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${getEventColor(event.impact)} flex items-center justify-center flex-shrink-0`}>
        <EventIcon className="w-5 h-5 text-white" />
      </div>
      <div className="flex-1">
        <div className="flex items-center space-x-2 mb-1">
          <h4 className="text-lg font-semibold text-gray-900">{event.title}</h4>
          <span className="text-sm text-gray-500">{event.date}</span>
        </div>
        <p className="text-gray-600">{event.description}</p>
      </div>
    </div>
  );
}
