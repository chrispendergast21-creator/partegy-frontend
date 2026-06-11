'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { PageNavigation } from '@/components/PageNavigation';
import { AlertCircle, TrendingUp, Clock, CheckCircle, Calendar, Target, Users, Bell, Eye } from 'lucide-react';
import { API_URL } from '@/lib/api';

export default function HomePage() {
  const router = useRouter();
  const [partnerships, setPartnerships] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { loadHomeData(); }, []);

  const loadHomeData = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/partnerships`);
      setPartnerships(response.data.map((p: any) => ({
        ...p,
        health_state: p.health_score >= 75 ? 'HEALTHY' : p.health_score >= 50 ? 'AT_RISK' : 'CRITICAL'
      })));
    } catch {
      setPartnerships([
        { id: 1, name: 'Acme Corporation', health_score: 92, health_state: 'HEALTHY', days_to_milestone: 28, next_milestone: 'Q2 Business Review' },
        { id: 2, name: 'Apex Dynamics', health_score: 87, health_state: 'HEALTHY', days_to_milestone: 14, next_milestone: 'Executive Sync' },
        { id: 6, name: 'Enterprise Systems Co', health_score: 68, health_state: 'AT_RISK', days_to_milestone: 7, next_milestone: 'Health Review' },
        { id: 9, name: 'NextGen Technologies', health_score: 65, health_state: 'AT_RISK', days_to_milestone: 3, next_milestone: 'Urgent Review' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const atRisk = partnerships.filter(p => p.health_state === 'AT_RISK' || p.health_state === 'CRITICAL');
  const healthy = partnerships.filter(p => p.health_state === 'HEALTHY');
  const upcoming = [...partnerships].sort((a, b) => a.days_to_milestone - b.days_to_milestone).slice(0, 4);

  const getHealthColor = (state: string) => {
    switch (state) {
      case 'CRITICAL': return 'bg-red-500';
      case 'AT_RISK': return 'bg-amber-500';
      case 'HEALTHY': return 'bg-emerald-500';
      default: return 'bg-slate-500';
    }
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <PageNavigation />
      <main className="max-w-7xl mx-auto px-8 py-8 space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
          <p className="text-slate-400 mt-1">Here's what needs your attention today</p>
        </div>

        {/* Snapshot Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { label: 'Total Partnerships', value: partnerships.length, color: 'text-white' },
            { label: 'Healthy', value: healthy.length, color: 'text-emerald-400' },
            { label: 'At Risk', value: atRisk.length, color: 'text-amber-400' },
            { label: 'Critical', value: partnerships.filter(p => p.health_state === 'CRITICAL').length, color: 'text-red-400' },
          ].map((stat, idx) => (
            <div key={idx} className="bg-slate-900 border border-slate-700 rounded-xl p-6">
              <div className={`text-3xl font-bold ${stat.color}`}>{stat.value}</div>
              <div className="text-slate-400 text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Focus Today */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-slate-900 border border-slate-700 rounded-xl overflow-hidden">
              <div className="p-6 border-b border-slate-700 flex items-center space-x-3">
                <Target className="w-5 h-5 text-blue-400" />
                <h2 className="text-lg font-bold text-white">Your Focus Today</h2>
                {atRisk.length > 0 && <span className="px-2 py-1 bg-red-500/20 text-red-400 text-xs rounded-full">{atRisk.length} need attention</span>}
              </div>
              <div className="divide-y divide-slate-700">
                {atRisk.length === 0 ? (
                  <div className="p-8 text-center">
                    <CheckCircle className="w-12 h-12 mx-auto mb-3 text-emerald-400" />
                    <p className="text-slate-400">All caught up! No partnerships need attention.</p>
                  </div>
                ) : atRisk.map((p) => (
                  <button key={p.id} onClick={() => router.push(`/partnership/${p.id}`)}
                    className="w-full p-5 hover:bg-slate-800 transition-colors text-left flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`w-3 h-3 rounded-full ${getHealthColor(p.health_state)}`}></div>
                      <div>
                        <div className="text-white font-semibold">{p.name}</div>
                        <div className="text-slate-400 text-sm">Health score: {p.health_score} • {p.next_milestone} in {p.days_to_milestone} days</div>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-blue-600 text-white text-sm rounded-lg">Review</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-slate-900 border border-slate-700 rounded-xl overflow-hidden">
              <div className="p-6 border-b border-slate-700 flex items-center space-x-3">
                <Bell className="w-5 h-5 text-blue-400" />
                <h2 className="text-lg font-bold text-white">Recent Activity</h2>
              </div>
              <div className="divide-y divide-slate-700">
                {[
                  { name: 'Acme Corporation', action: 'Health score improved from 85 to 92', time: '2 hours ago' },
                  { name: 'Apex Dynamics', action: 'Q2 Business Review scheduled', time: '5 hours ago' },
                  { name: 'Enterprise Systems Co', action: 'Engagement score dropped 8 points', time: '1 day ago' },
                  { name: 'NextGen Technologies', action: 'Milestone deadline approaching', time: '1 day ago' },
                ].map((item, idx) => (
                  <div key={idx} className="p-5 flex items-center justify-between hover:bg-slate-800 transition-colors cursor-pointer">
                    <div>
                      <div className="text-white font-medium">{item.name}</div>
                      <div className="text-slate-400 text-sm mt-1">{item.action}</div>
                    </div>
                    <div className="text-slate-500 text-xs">{item.time}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Milestones */}
            <div className="bg-slate-900 border border-slate-700 rounded-xl overflow-hidden">
              <div className="p-6 border-b border-slate-700 flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-blue-400" />
                <h2 className="text-lg font-bold text-white">Upcoming Milestones</h2>
              </div>
              <div className="p-4 space-y-3">
                {upcoming.map((p) => (
                  <button key={p.id} onClick={() => router.push(`/partnership/${p.id}`)}
                    className="w-full text-left p-3 rounded-lg hover:bg-slate-800 border border-slate-700 transition-colors">
                    <div className="flex items-center space-x-3">
                      <Clock className={`w-4 h-4 ${p.days_to_milestone <= 7 ? 'text-red-400' : 'text-slate-400'}`} />
                      <div>
                        <div className="text-white text-sm font-medium">{p.name}</div>
                        <div className="text-slate-400 text-xs">{p.next_milestone} • {p.days_to_milestone} days</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 space-y-3">
              <h2 className="text-lg font-bold text-white mb-4">Quick Actions</h2>
              <button onClick={() => router.push('/executive')} className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors text-left flex items-center space-x-3">
                <TrendingUp className="w-4 h-4" /><span>Executive Dashboard</span>
              </button>
              <button onClick={() => router.push('/partnerships/new')} className="w-full px-4 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-sm font-medium transition-colors text-left flex items-center space-x-3 border border-slate-700">
                <Users className="w-4 h-4" /><span>Add Partnership</span>
              </button>
              <button onClick={() => router.push('/reports')} className="w-full px-4 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-sm font-medium transition-colors text-left flex items-center space-x-3 border border-slate-700">
                <Eye className="w-4 h-4" /><span>View Reports</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
