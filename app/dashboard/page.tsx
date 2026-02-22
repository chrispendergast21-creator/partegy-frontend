'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useOrganization } from '@/lib/useOrganization';
import { API_URL } from '@/lib/api';
import {
  Building2,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Clock,
  Users,
  Target,
  Calendar,
  Search,
  Plus,
  FileText,
  MessageSquare,
  ArrowRight,
  X,
  Check,
  Eye,
  Activity,
  Zap,
  Bell,
  ChevronRight,
  BarChart3,
  Minus,
  UserCheck
} from 'lucide-react';

// Mock user role - in real app, get from auth context
const USER_ROLE = 'alliances_manager'; // 'executive', 'alliances_manager', 'partner'

export default function DashboardPage() {
  const router = useRouter();
  const { currentOrg } = useOrganization();
  const [partnerships, setPartnerships] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [dismissedRecommendations, setDismissedRecommendations] = useState<number[]>([]);

  useEffect(() => {
    if (currentOrg) {
      loadDashboardData();
    }
  }, [currentOrg]);

  const loadDashboardData = async () => {
    if (!currentOrg) return;
    
    try {
      const response = await axios.get(`${API_URL}/api/partnerships?org_id=${currentOrg.id}`);
      setPartnerships(response.data);
    } catch (error) {
      console.error('Failed to load partnerships:', error);
    } finally {
      setLoading(false);
    }
  };

  // Role-based data calculations
  const getPersonalizedData = () => {
    const myPartnerships = USER_ROLE === 'executive' ? partnerships : partnerships.slice(0, 15); // Mock: some are "mine"
    const attentionNeeded = partnerships.filter(p => p.health === 'at-risk' || p.health === 'critical');
    const healthChanges = partnerships.filter(p => (p.health_score || 0) < 70); // Mock recent changes
    
    return {
      myActive: myPartnerships.length,
      needsAttention: attentionNeeded.length,
      overdueInitiatives: 3, // Mock
      healthChanges: healthChanges.length,
      myPartnerships: myPartnerships.slice(0, 10),
      attentionPartnerships: attentionNeeded.slice(0, 5)
    };
  };

  const personalizedData = getPersonalizedData();

  // AI Recommendations
  const getRecommendations = () => {
    const base = [
      {
        id: 1,
        type: 'executive_check',
        title: 'Schedule executive check-in with TechFlow Systems',
        reason: 'Health score declined 15 points in past 30 days',
        urgency: 'high',
        partner: 'TechFlow Systems',
        action: 'Schedule Meeting'
      },
      {
        id: 2,
        type: 'okr_review',
        title: 'Review declining OKR progress for DataSync Partners',
        reason: 'Q1 revenue milestone 25% behind target',
        urgency: 'medium',
        partner: 'DataSync Partners',
        action: 'Review Progress'
      },
      {
        id: 3,
        type: 'revenue_misalignment',
        title: 'Revenue misalignment detected with CloudTech Solutions',
        reason: 'Expected $2M but tracking at $1.2M for Q1',
        urgency: 'high',
        partner: 'CloudTech Solutions',
        action: 'Investigate Gap'
      },
      {
        id: 4,
        type: 'engagement_decline',
        title: 'Stakeholder engagement dropping with InnovateCorp',
        reason: 'Last executive interaction was 45 days ago',
        urgency: 'medium',
        partner: 'InnovateCorp',
        action: 'Reach Out'
      },
      {
        id: 5,
        type: 'opportunity',
        title: 'Expansion opportunity with Global Systems Inc',
        reason: 'Health score increased 20 points, showing growth potential',
        urgency: 'low',
        partner: 'Global Systems Inc',
        action: 'Explore Expansion'
      }
    ];

    return base.filter(rec => !dismissedRecommendations.includes(rec.id));
  };

  const recommendations = getRecommendations();

  const dismissRecommendation = (id: number) => {
    setDismissedRecommendations([...dismissedRecommendations, id]);
  };

  const confirmRecommendation = (id: number) => {
    // In real app, would create task/calendar event
    alert('Recommendation confirmed! Task created.');
    dismissRecommendation(id);
  };

  // Recent Activity Feed
  const recentActivity = [
    {
      type: 'health_change',
      partner: 'TechFlow Systems',
      description: 'Health score decreased from 78 to 65',
      timestamp: '2 hours ago',
      icon: TrendingDown,
      color: 'text-red-600'
    },
    {
      type: 'initiative_update',
      partner: 'DataSync Partners',
      description: 'Q1 Joint Marketing Initiative marked complete',
      timestamp: '5 hours ago',
      icon: CheckCircle,
      color: 'text-green-600'
    },
    {
      type: 'executive_note',
      partner: 'CloudTech Solutions',
      description: 'Executive note added from quarterly review',
      timestamp: '1 day ago',
      icon: MessageSquare,
      color: 'text-blue-600'
    },
    {
      type: 'okr_created',
      partner: 'InnovateCorp',
      description: 'New OKR: "Increase co-sell revenue by 40%"',
      timestamp: '2 days ago',
      icon: Target,
      color: 'text-purple-600'
    }
  ];

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

  const renderRoleBasedContent = () => {
    switch (USER_ROLE) {
      case 'executive':
        return <ExecutiveView />;
      case 'partner':
        return <PartnerView />;
      default:
        return <AlliancesManagerView />;
    }
  };

  function ExecutiveView() {
    const portfolioHealth = partnerships.length > 0 
      ? Math.round(partnerships.reduce((sum, p) => sum + (p.health_score || 0), 0) / partnerships.length)
      : 0;
    
    const totalRevenue = partnerships.reduce((sum, p) => sum + (p.revenue || 0), 0);
    const topRiskPartnerships = partnerships
      .filter(p => p.health === 'critical' || p.health === 'at-risk')
      .sort((a, b) => (b.revenue || 0) - (a.revenue || 0))
      .slice(0, 5);

    return (
      <>
        {/* Executive Portfolio Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <PersonalizedCard
            icon={BarChart3}
            title="Portfolio Health"
            value={`${portfolioHealth}/100`}
            trend="up"
            trendValue="+3pts"
            color="from-purple-400 to-purple-600"
            onClick={() => router.push('/executive')}
          />
          <PersonalizedCard
            icon={Building2}
            title="Total Partnerships"
            value={partnerships.length.toString()}
            trend="stable"
            trendValue="—"
            color="from-blue-400 to-blue-600"
            onClick={() => router.push('/partnerships')}
          />
          <PersonalizedCard
            icon={AlertTriangle}
            title="High Priority Alerts"
            value={topRiskPartnerships.length.toString()}
            trend="down"
            trendValue="-2"
            color="from-red-400 to-red-600"
            onClick={() => {}}
          />
          <PersonalizedCard
            icon={TrendingUp}
            title="Portfolio Revenue"
            value={`$${(totalRevenue / 1000000).toFixed(1)}M`}
            trend="up"
            trendValue="+18%"
            color="from-green-400 to-green-600"
            onClick={() => {}}
          />
        </div>

        {/* Executive Alerts */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">High-Priority Alerts</h2>
          <div className="grid grid-cols-1 gap-4">
            {recommendations.slice(0, 3).map((rec) => (
              <ExecutiveAlert key={rec.id} recommendation={rec} />
            ))}
          </div>
        </div>

        {/* Top Risk Partnerships */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Top 5 Partnerships by Risk</h2>
            <button 
              onClick={() => router.push('/executive')}
              className="flex items-center space-x-2 text-[#60a5fa] hover:text-[#3b82f6] font-medium"
            >
              <span>View Executive Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-3">
            {topRiskPartnerships.map((partnership, idx) => (
              <div 
                key={partnership.id}
                onClick={() => router.push(`/partnership/${partnership.id}`)}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-red-400 to-red-600 flex items-center justify-center text-white font-semibold text-sm">
                    {partnership.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{partnership.name}</div>
                    <div className="text-sm text-gray-600">Health: {partnership.health_score}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-gray-900">${((partnership.revenue || 0) / 1000000).toFixed(1)}M</div>
                  <div className="text-sm text-red-600">Risk Exposure</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }

  function AlliancesManagerView() {
    return (
      <>
        {/* 1️⃣ Personalized Snapshot */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <PersonalizedCard
            icon={Building2}
            title="My Active Partnerships"
            value={personalizedData.myActive.toString()}
            trend="stable"
            trendValue="—"
            color="from-blue-400 to-blue-600"
            onClick={() => router.push('/partnerships')}
          />
          <PersonalizedCard
            icon={AlertTriangle}
            title="Need My Attention"
            value={personalizedData.needsAttention.toString()}
            trend="up"
            trendValue="+2"
            color="from-orange-400 to-orange-600"
            onClick={() => {}}
          />
          <PersonalizedCard
            icon={Clock}
            title="Overdue Initiatives"
            value={personalizedData.overdueInitiatives.toString()}
            trend="down"
            trendValue="-1"
            color="from-red-400 to-red-600"
            onClick={() => {}}
          />
          <PersonalizedCard
            icon={TrendingUp}
            title="Health Changes"
            value={personalizedData.healthChanges.toString()}
            trend="up"
            trendValue="Since last login"
            color="from-green-400 to-green-600"
            onClick={() => {}}
          />
        </div>

        {/* 2️⃣ AI Recommendations */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <Zap className="w-6 h-6 text-[#60a5fa]" />
            <h2 className="text-2xl font-bold text-gray-900">Recommended Actions</h2>
            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-medium">AI-Powered</span>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {recommendations.map((recommendation) => (
              <RecommendationCard 
                key={recommendation.id} 
                recommendation={recommendation}
                onConfirm={() => confirmRecommendation(recommendation.id)}
                onDismiss={() => dismissRecommendation(recommendation.id)}
              />
            ))}
          </div>
        </div>

        {/* 3️⃣ My Partnerships List */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">My Partnerships</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Partner</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Health</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Trend</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Next Milestone</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Last Updated</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {personalizedData.myPartnerships.map((partnership) => (
                  <tr 
                    key={partnership.id}
                    onClick={() => router.push(`/partnership/${partnership.id}`)}
                    className="hover:bg-gray-50 cursor-pointer"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center text-white font-semibold text-sm">
                          {partnership.name.charAt(0)}
                        </div>
                        <span className="font-medium text-gray-900">{partnership.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm font-semibold text-gray-900">{partnership.health_score}</span>
                    </td>
                    <td className="px-4 py-3">
                      {partnership.health_score >= 80 ? (
                        <TrendingUp className="w-4 h-4 text-green-600" />
                      ) : partnership.health_score >= 60 ? (
                        <Minus className="w-4 h-4 text-yellow-600" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-red-600" />
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm text-gray-700">{partnership.next_milestone}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm text-gray-500">2 days ago</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  }

  function PartnerView() {
    // External partner portal view
    const sharedInitiatives = [
      { name: 'Q1 Co-Marketing Campaign', status: 'In Progress', dueDate: '2026-03-15' },
      { name: 'Joint Product Integration', status: 'Planning', dueDate: '2026-04-01' },
      { name: 'Executive Business Review', status: 'Completed', dueDate: '2026-02-10' }
    ];

    return (
      <div className="space-y-8">
        {/* Partner Welcome */}
        <div className="bg-gradient-to-r from-[#60a5fa] to-[#60e1fa] rounded-2xl shadow-xl p-8 text-white">
          <h1 className="text-3xl font-bold mb-2">Welcome to the Partnership Portal</h1>
          <p className="text-white/80">Collaborate on shared initiatives and track joint progress</p>
        </div>

        {/* Shared Initiatives */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Shared Initiatives</h2>
          <div className="space-y-3">
            {sharedInitiatives.map((initiative, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-semibold text-gray-900">{initiative.name}</div>
                  <div className="text-sm text-gray-600">Due: {initiative.dueDate}</div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  initiative.status === 'Completed' ? 'bg-green-100 text-green-800' :
                  initiative.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {initiative.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Next Joint Milestones */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Upcoming Milestones</h2>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
              <Calendar className="w-5 h-5 text-blue-600" />
              <div>
                <div className="font-medium text-gray-900">Q2 Business Review</div>
                <div className="text-sm text-gray-600">March 30, 2026</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header with Quick Actions */}
      <header className="bg-gradient-to-r from-[#1e293b] via-[#334155] to-[#475569] border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-[#60a5fa] to-[#60e1fa] bg-clip-text text-transparent">
                {USER_ROLE === 'executive' ? 'Executive Dashboard' : 
                 USER_ROLE === 'partner' ? 'Partnership Portal' : 
                 'Partnership Dashboard'}
              </h1>
              <p className="text-gray-300 mt-1">
                Welcome back! Here's what needs your attention.
              </p>
            </div>

            {/* 5️⃣ Quick Actions */}
            <div className="flex items-center space-x-4">
              {/* Global Search */}
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search partnerships..."
                  className="pl-10 pr-4 py-2 bg-white/10 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#60a5fa]"
                />
              </div>

              {/* Quick Action Buttons */}
              {USER_ROLE !== 'partner' && (
                <>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors">
                    <Target className="w-4 h-4" />
                    <span className="hidden md:inline">Add Initiative</span>
                  </button>
                  <button 
                    onClick={() => router.push('/partnerships/new')}
                    className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-[#60a5fa] to-[#60e1fa] text-white rounded-lg hover:shadow-lg transition-all"
                  >
                    <Plus className="w-4 h-4" />
                    <span className="hidden md:inline">New Partnership</span>
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors">
                    <UserCheck className="w-4 h-4" />
                    <span className="hidden md:inline">Log Interaction</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-8 py-8">
        {/* Role-based content */}
        {renderRoleBasedContent()}

        {/* 4️⃣ Recent Activity Feed (All Roles) */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivity.map((activity, idx) => (
              <div key={idx} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <activity.icon className={`w-5 h-5 ${activity.color} flex-shrink-0 mt-0.5`} />
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{activity.partner}</div>
                  <div className="text-sm text-gray-600">{activity.description}</div>
                  <div className="text-xs text-gray-500 mt-1">{activity.timestamp}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

// Component Definitions
function PersonalizedCard({ icon: Icon, title, value, trend, trendValue, color, onClick }: any) {
  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus;
  const trendColor = trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-gray-600';

  return (
    <button
      onClick={onClick}
      className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 hover:shadow-xl transition-all duration-300 text-left group"
    >
      <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div className="text-3xl font-bold text-gray-900 mb-1">{value}</div>
      <div className="text-sm font-medium text-gray-600 mb-2">{title}</div>
      <div className={`flex items-center space-x-1 ${trendColor}`}>
        <TrendIcon className="w-4 h-4" />
        <span className="text-xs font-medium">{trendValue}</span>
      </div>
    </button>
  );
}

function RecommendationCard({ recommendation, onConfirm, onDismiss }: any) {
  const urgencyColor = recommendation.urgency === 'high' ? 'border-l-red-500 bg-red-50' : 
                      recommendation.urgency === 'medium' ? 'border-l-yellow-500 bg-yellow-50' : 
                      'border-l-blue-500 bg-blue-50';

  return (
    <div className={`border-l-4 rounded-lg p-4 ${urgencyColor}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <Zap className="w-4 h-4 text-[#60a5fa]" />
            <span className={`text-xs font-semibold px-2 py-1 rounded ${
              recommendation.urgency === 'high' ? 'bg-red-200 text-red-800' :
              recommendation.urgency === 'medium' ? 'bg-yellow-200 text-yellow-800' :
              'bg-blue-200 text-blue-800'
            }`}>
              {recommendation.urgency.toUpperCase()} PRIORITY
            </span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">{recommendation.title}</h3>
          <p className="text-sm text-gray-600 mb-3">{recommendation.reason}</p>
          <div className="flex items-center space-x-3">
            <button
              onClick={onConfirm}
              className="flex items-center space-x-2 px-3 py-1 bg-[#60a5fa] text-white rounded-lg text-sm hover:bg-[#3b82f6] transition-colors"
            >
              <Check className="w-3 h-3" />
              <span>{recommendation.action}</span>
            </button>
            <button
              onClick={onDismiss}
              className="flex items-center space-x-2 px-3 py-1 bg-gray-200 text-gray-700 rounded-lg text-sm hover:bg-gray-300 transition-colors"
            >
              <X className="w-3 h-3" />
              <span>Dismiss</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ExecutiveAlert({ recommendation }: any) {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-4">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
            <AlertTriangle className={`w-4 h-4 ${
              recommendation.urgency === 'high' ? 'text-red-600' : 'text-yellow-600'
            }`} />
            <span className="font-semibold text-gray-900">{recommendation.partner}</span>
          </div>
          <p className="text-sm text-gray-600">{recommendation.reason}</p>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 bg-[#60a5fa] text-white rounded-lg hover:bg-[#3b82f6] transition-colors">
          <Eye className="w-4 h-4" />
          <span>Review</span>
        </button>
      </div>
    </div>
  );
}
