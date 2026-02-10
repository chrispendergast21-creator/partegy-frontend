'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useOrganization } from '@/lib/useOrganization';
import OrganizationSwitcher from '@/components/tenant/OrganizationSwitcher';
import { 
  Home, 
  Users, 
  BarChart3, 
  FileText, 
  Settings, 
  Bell, 
  Search,
  Calendar,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  Target,
  Zap,
  ChevronRight,
  Plus
} from 'lucide-react';
import { useAuth } from '@/lib/useAuth';
import { API_URL } from '@/lib/api';

interface QuickAction {
  icon: any;
  label: string;
  description: string;
  href: string;
  color: string;
}

interface Task {
  id: number;
  title: string;
  partnership: string;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
}

export default function WorkdayDashboard() {
  const router = useRouter();
  const { user } = useAuth();
  const { currentOrg } = useOrganization();
  const [greeting, setGreeting] = useState('');
  const [stats, setStats] = useState({
    myPartnerships: 0,
    tasksToday: 0,
    upcomingMeetings: 0,
    healthAlerts: 0
  });

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 18) setGreeting('Good afternoon');
    else setGreeting('Good evening');

    if (currentOrg) {
      loadDashboardData();
    }
  }, [currentOrg]);

  const loadDashboardData = async () => {
    if (!currentOrg) return;
    
    try {
      const response = await axios.get(`${API_URL}/api/partnerships?org_id=${currentOrg.id}`);
      setStats({
        myPartnerships: response.data.length,
        tasksToday: 5,
        upcomingMeetings: 3,
        healthAlerts: response.data.filter((p: any) => p.health_score < 60).length
      });
    } catch (error) {
      console.error('Failed to load dashboard:', error);
    }
  };

  const quickActions: QuickAction[] = [
    {
      icon: Plus,
      label: 'Add Partnership',
      description: 'Create a new partnership',
      href: '/partnerships/new',
      color: 'bg-[#60a5fa]'
    },
    {
      icon: FileText,
      label: 'Upload Document',
      description: 'Add partnership files',
      href: '/documents/upload',
      color: 'bg-[#60e1fa]'
    },
    {
      icon: Calendar,
      label: 'Schedule Review',
      description: 'Book partnership meeting',
      href: '/calendar',
      color: 'bg-[#60a5fa]'
    },
    {
      icon: BarChart3,
      label: 'View Analytics',
      description: 'See performance data',
      href: '/analytics',
      color: 'bg-[#60e1fa]'
    }
  ];

  const upcomingTasks: Task[] = [
    { id: 1, title: 'Review Q1 OKRs', partnership: 'TechCorp Solutions', dueDate: 'Today', priority: 'high' },
    { id: 2, title: 'Approve training materials', partnership: 'DataFlow Systems', dueDate: 'Tomorrow', priority: 'medium' },
    { id: 3, title: 'Update pipeline forecast', partnership: 'CloudScale Networks', dueDate: 'Feb 5', priority: 'low' }
  ];

  const recentActivity = [
    { type: 'health', message: 'TechCorp Solutions health improved to 82', time: '2 hours ago', icon: TrendingUp, color: 'text-green-600' },
    { type: 'alert', message: 'DataFlow Systems requires attention', time: '4 hours ago', icon: AlertCircle, color: 'text-yellow-600' },
    { type: 'complete', message: 'Q4 Business Review completed', time: '1 day ago', icon: CheckCircle, color: 'text-[#60a5fa]' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Top Navigation */}
      <nav className="bg-[#1e293b] border-b border-gray-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-1">
                  <div className="w-8 h-8 bg-[#60a5fa] rounded"></div>
                  <div className="w-8 h-8 bg-[#60e1fa] rounded"></div>
                </div>
                <span className="text-2xl font-bold text-white">Partegy</span>
              </div>
              
              <div className="hidden md:flex space-x-1">
                <NavLink href="/dashboard" active>Home</NavLink>
                <NavLink href="/partnerships">Partnerships</NavLink>
                <NavLink href="/analytics">Analytics</NavLink>
                <NavLink href="/reports">Reports</NavLink>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <OrganizationSwitcher />
              
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 w-64 bg-[#334155] border-0 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-[#60e1fa]"
                />
              </div>
              <button className="relative p-2 text-gray-300 hover:bg-[#334155] rounded-lg">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-[#60e1fa] rounded-full"></span>
              </button>
              <button className="p-2 text-gray-300 hover:bg-[#334155] rounded-lg">
                <Settings className="w-5 h-5" />
              </button>
              <div className="flex items-center space-x-3 pl-4 border-l border-gray-700">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#60a5fa] to-[#60e1fa] flex items-center justify-center">
                  <span className="text-sm font-semibold text-white">
                    {user?.name?.charAt(0) || 'U'}
                  </span>
                </div>
                <div className="hidden md:block">
                  <div className="text-sm font-medium text-white">{user?.name || 'User'}</div>
                  <div className="text-xs text-gray-400">{user?.role?.replace('_', ' ')}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Rest of dashboard content remains the same... */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {greeting}, {user?.name?.split(' ')[0] || 'there'} 👋
          </h1>
          <p className="text-gray-600">
            {currentOrg ? `Managing ${currentOrg.name}` : 'Select an organization to get started'}
          </p>
        </div>

        {!currentOrg ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <Building2 className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Organization Selected</h3>
            <p className="text-gray-600">Please select an organization from the dropdown above to continue.</p>
          </div>
        ) : (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <StatCard
                icon={Users}
                label="My Partnerships"
                value={stats.myPartnerships}
                change="+2 this week"
                color="partegy"
                onClick={() => router.push('/partnerships')}
              />
              <StatCard
                icon={CheckCircle}
                label="Tasks Today"
                value={stats.tasksToday}
                change="3 completed"
                color="green"
                onClick={() => router.push('/tasks')}
              />
              <StatCard
                icon={Calendar}
                label="Upcoming Meetings"
                value={stats.upcomingMeetings}
                change="Next in 2 hours"
                color="partegy"
                onClick={() => router.push('/calendar')}
              />
              <StatCard
                icon={AlertCircle}
                label="Health Alerts"
                value={stats.healthAlerts}
                change={stats.healthAlerts > 0 ? "Needs attention" : "All healthy"}
                color="orange"
                onClick={() => router.push('/partnerships?filter=at-risk')}
              />
            </div>

            {/* Quick Actions and other content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
                  <div className="grid grid-cols-2 gap-4">
                    {quickActions.map((action, idx) => (
                      <button
                        key={idx}
                        onClick={() => router.push(action.href)}
                        className="flex items-start space-x-4 p-4 rounded-lg border-2 border-gray-100 hover:border-[#60e1fa] hover:bg-cyan-50 transition-all group"
                      >
                        <div className={`${action.color} p-3 rounded-lg text-white group-hover:scale-110 transition-transform`}>
                          <action.icon className="w-5 h-5" />
                        </div>
                        <div className="text-left">
                          <div className="font-medium text-gray-900">{action.label}</div>
                          <div className="text-sm text-gray-500">{action.description}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-gradient-to-br from-[#60a5fa] to-[#60e1fa] rounded-xl shadow-sm p-6 text-white">
                  <div className="flex items-center space-x-2 mb-3">
                    <Zap className="w-5 h-5" />
                    <h3 className="font-semibold">Organization Stats</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm opacity-90">Total Partnerships</span>
                      <span className="text-2xl font-bold">{currentOrg.partnership_count}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm opacity-90">Team Members</span>
                      <span className="text-2xl font-bold">{currentOrg.user_count}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm opacity-90">Subscription</span>
                      <span className="text-sm font-semibold uppercase">{currentOrg.subscription_tier}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

function NavLink({ href, active, children }: any) {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push(href)}
      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
        active 
          ? 'bg-gradient-to-r from-[#60a5fa] to-[#60e1fa] text-white' 
          : 'text-gray-300 hover:bg-[#334155] hover:text-white'
      }`}
    >
      {children}
    </button>
  );
}

function StatCard({ icon: Icon, label, value, change, color, onClick }: any) {
  const colors = {
    'partegy': 'from-[#60a5fa] to-[#60e1fa]',
    green: 'from-green-500 to-green-600',
    orange: 'from-orange-500 to-orange-600'
  };

  return (
    <button
      onClick={onClick}
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all group"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${colors[color as keyof typeof colors]} flex items-center justify-center group-hover:scale-110 transition-transform`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
      <div className="text-3xl font-bold text-gray-900 mb-1">{value}</div>
      <div className="text-sm font-medium text-gray-600 mb-2">{label}</div>
      <div className="text-xs text-gray-500">{change}</div>
    </button>
  );
}
