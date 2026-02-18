'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useOrganization } from '@/lib/useOrganization';
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
  Plus,
  Building2
} from 'lucide-react';
import { useAuth } from '@/lib/useAuth';
import { API_URL } from '@/lib/api';

export default function WorkdayDashboard() {
  const router = useRouter();
  const { currentOrg } = useOrganization();
  const [greeting, setGreeting] = useState('');
  const [partnerships, setPartnerships] = useState([]);
  const [stats, setStats] = useState({
    myPartnerships: 0,
    tasksToday: 5,
    upcomingMeetings: 3,
    healthAlerts: 0,
    totalRevenue: 0,
    avgHealth: 0
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
      const data = response.data;
      setPartnerships(data);
      
      setStats({
        myPartnerships: data.length,
        tasksToday: 5,
        upcomingMeetings: 3,
        healthAlerts: data.filter((p: any) => p.health_score < 60).length,
        totalRevenue: data.reduce((sum: number, p: any) => sum + (p.revenue || 0), 0),
        avgHealth: data.length > 0 ? Math.round(data.reduce((sum: number, p: any) => sum + (p.health_score || 0), 0) / data.length) : 0
      });
    } catch (error) {
      console.error('Failed to load dashboard:', error);
    }
  };

  const quickActions = [
    {
      icon: Plus,
      label: 'Add Partnership',
      description: 'Create a new partnership',
      href: '/partnerships/new',
      color: 'bg-gradient-to-r from-[#60a5fa] to-[#60e1fa]'
    },
    {
      icon: FileText,
      label: 'Upload Document',
      description: 'Add partnership files',
      href: '/documents/upload',
      color: 'bg-gradient-to-r from-[#60e1fa] to-[#34d399]'
    },
    {
      icon: Calendar,
      label: 'Schedule Review',
      description: 'Book partnership meeting',
      href: '/calendar',
      color: 'bg-gradient-to-r from-[#60a5fa] to-[#a855f7]'
    },
    {
      icon: BarChart3,
      label: 'View Analytics',
      description: 'See performance data',
      href: '/analytics',
      color: 'bg-gradient-to-r from-[#34d399] to-[#60e1fa]'
    }
  ];

  const recentActivity = [
    { type: 'health', message: `${partnerships[0]?.name || 'TechCorp'} health improved to 82`, time: '2 hours ago', icon: TrendingUp, color: 'text-green-600' },
    { type: 'alert', message: `${partnerships[1]?.name || 'DataFlow'} requires attention`, time: '4 hours ago', icon: AlertCircle, color: 'text-yellow-600' },
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
                  <div className="w-8 h-8 bg-gradient-to-r from-[#60a5fa] to-[#60e1fa] rounded"></div>
                  <div className="w-8 h-8 bg-gradient-to-r from-[#60e1fa] to-[#34d399] rounded"></div>
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-[#60a5fa] to-[#60e1fa] bg-clip-text text-transparent">Partegy</span>
              </div>
              
              <div className="hidden md:flex space-x-1">
                <NavLink href="/dashboard" active>Home</NavLink>
                <NavLink href="/partnerships">Partnerships</NavLink>
                <NavLink href="/analytics">Analytics</NavLink>
                <NavLink href="/reports">Reports</NavLink>
              </div>
            </div>

            <div className="flex items-center space-x-4">
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
                <span className="absolute top-1 right-1 w-2 h-2 bg-gradient-to-r from-[#60e1fa] to-[#34d399] rounded-full"></span>
              </button>
              <button className="p-2 text-gray-300 hover:bg-[#334155] rounded-lg">
                <Settings className="w-5 h-5" />
              </button>
              <div className="flex items-center space-x-3 pl-4 border-l border-gray-700">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#60a5fa] to-[#60e1fa] flex items-center justify-center">
                  <span className="text-sm font-semibold text-white">U</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {greeting} 👋
          </h1>
          <p className="text-gray-600">
            {currentOrg ? `Managing ${currentOrg.name} - ${stats.myPartnerships} partnerships` : 'Welcome to Partegy'}
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={Users}
            label="My Partnerships"
            value={stats.myPartnerships}
            change="+2 this week"
            gradient="from-[#60a5fa] to-[#60e1fa]"
            onClick={() => router.push('/partnerships')}
          />
          <StatCard
            icon={CheckCircle}
            label="Tasks Today"
            value={stats.tasksToday}
            change="3 completed"
            gradient="from-[#34d399] to-[#10b981]"
            onClick={() => router.push('/tasks')}
          />
          <StatCard
            icon={TrendingUp}
            label="Avg Health"
            value={stats.avgHealth}
            change={`${stats.healthAlerts} at risk`}
            gradient="from-[#a855f7] to-[#8b5cf6]"
            onClick={() => router.push('/analytics')}
          />
          <StatCard
            icon={Target}
            label="Revenue"
            value={`$${(stats.totalRevenue / 1000000).toFixed(1)}M`}
            change="+12% vs last quarter"
            gradient="from-[#f59e0b] to-[#d97706]"
            onClick={() => router.push('/reports')}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quick Actions */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-4">
                {quickActions.map((action, idx) => (
                  <button
                    key={idx}
                    onClick={() => router.push(action.href)}
                    className="flex items-start space-x-4 p-4 rounded-lg border-2 border-gray-100 hover:border-[#60e1fa] hover:bg-gradient-to-r hover:from-[#60e1fa]/5 hover:to-[#34d399]/5 transition-all group"
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

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-[#60a5fa] via-[#60e1fa] to-[#34d399] rounded-xl shadow-sm p-6 text-white">
              <div className="flex items-center space-x-2 mb-3">
                <Zap className="w-5 h-5" />
                <h3 className="font-semibold">Organization Stats</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm opacity-90">Total Partnerships</span>
                  <span className="text-2xl font-bold">{currentOrg?.partnership_count || stats.myPartnerships}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm opacity-90">Avg Health Score</span>
                  <span className="text-2xl font-bold">{stats.avgHealth}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm opacity-90">Revenue</span>
                  <span className="text-lg font-semibold">${(stats.totalRevenue / 1000000).toFixed(1)}M</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-3">
                {recentActivity.map((item, idx) => (
                  <div key={idx} className="flex items-start space-x-3">
                    <item.icon className={`w-5 h-5 ${item.color} flex-shrink-0 mt-0.5`} />
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900">{item.message}</div>
                      <div className="text-xs text-gray-500">{item.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
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

function StatCard({ icon: Icon, label, value, change, gradient, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all group text-left"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${gradient} flex items-center justify-center group-hover:scale-110 transition-transform`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
      <div className="text-3xl font-bold text-gray-900 mb-1">{value}</div>
      <div className="text-sm font-medium text-gray-600 mb-2">{label}</div>
      <div className="text-xs text-gray-500">{change}</div>
    </button>
  );
}
