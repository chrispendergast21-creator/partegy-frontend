'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useOrganization } from '@/lib/useOrganization';
import { API_URL } from '@/lib/api';
import { PageNavigation } from '@/components/PageNavigation';
import {
  TrendingUp,
  Building2,
  BarChart3,
  Target,
  Users,
  ArrowRight,
  Activity
} from 'lucide-react';

export default function DashboardPage() {
  const router = useRouter();
  const { currentOrg } = useOrganization();
  const [partnerships, setPartnerships] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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

  if (!currentOrg) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Building2 className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No Organization Selected</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* CONSISTENT HEADER ACROSS ALL PAGES */}
      <header className="bg-slate-900 border-b-2 border-slate-700">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-12">
              <div>
                <h1 className="text-2xl font-semibold text-white">Dashboard</h1>
                <p className="text-slate-300 text-sm mt-1">{currentOrg.name} • Partnership Overview</p>
              </div>
              <PageNavigation />
            </div>
            <div className="text-right text-white">
              <div className="text-5xl font-bold">$90.6M</div>
              <div className="text-slate-300 text-sm">Partnership Revenue YTD</div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-8 py-8 space-y-8">
        {/* Welcome Section */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Welcome to Partegy</h2>
          <p className="text-gray-600 mb-6">Your strategic partnership intelligence platform. Navigate to different sections to explore your partnership portfolio.</p>
          
          {/* Quick Navigation Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div 
              onClick={() => router.push('/partnerships')}
              className="p-6 border border-gray-200 rounded-xl hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-blue-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Partnerships</h3>
                  <p className="text-sm text-gray-600">Manage your partnership portfolio</p>
                </div>
              </div>
              <div className="flex items-center text-blue-600 text-sm font-medium">
                <span>View Partnerships</span>
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            <div 
              onClick={() => router.push('/analytics')}
              className="p-6 border border-gray-200 rounded-xl hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-purple-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Analytics</h3>
                  <p className="text-sm text-gray-600">Strategic insights and performance</p>
                </div>
              </div>
              <div className="flex items-center text-purple-600 text-sm font-medium">
                <span>View Analytics</span>
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            <div 
              onClick={() => router.push('/reports')}
              className="p-6 border border-gray-200 rounded-xl hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-green-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Activity className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Reports</h3>
                  <p className="text-sm text-gray-600">Generate and share reports</p>
                </div>
              </div>
              <div className="flex items-center text-green-600 text-sm font-medium">
                <span>View Reports</span>
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-xl bg-blue-500 flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">34</div>
                <div className="text-sm text-gray-600">Total Partnerships</div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-xl bg-green-500 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">$90.6M</div>
                <div className="text-sm text-gray-600">Total Revenue</div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-xl bg-purple-500 flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">347%</div>
                <div className="text-sm text-gray-600">Portfolio ROI</div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-xl bg-orange-500 flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">78</div>
                <div className="text-sm text-gray-600">Avg Health Score</div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <div className="flex-1">
                <div className="font-medium text-gray-900">New partnership onboarded: CloudEdge AI</div>
                <div className="text-sm text-gray-600">2 days ago</div>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 rounded-full bg-amber-500"></div>
              <div className="flex-1">
                <div className="font-medium text-gray-900">TechFlow Systems health score updated</div>
                <div className="text-sm text-gray-600">3 days ago</div>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              <div className="flex-1">
                <div className="font-medium text-gray-900">Q1 Executive Summary generated</div>
                <div className="text-sm text-gray-600">5 days ago</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
