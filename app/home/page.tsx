'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { 
  AlertCircle, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  Calendar,
  Target,
  Users,
  Bell,
  Eye
} from 'lucide-react';

interface Partnership {
  id: number;
  name: string;
  health_score: number;
  health_state: string;
  partnership_type: string;
  days_to_milestone: number;
  next_milestone: string;
}

interface ActionItem {
  type: 'ACTION' | 'CHANGE' | 'RECOMMENDATION' | 'DEADLINE';
  partnership_id: number;
  partnership_name: string;
  priority: number;
  summary: string;
  timestamp: Date;
  cta: string;
  health_state?: string;
}

export default function HomePage() {
  const router = useRouter();
  const [partnerships, setPartnerships] = useState<Partnership[]>([]);
  const [actionItems, setActionItems] = useState<ActionItem[]>([]);
  const [recentChanges, setRecentChanges] = useState<ActionItem[]>([]);
  const [recommendations, setRecommendations] = useState<ActionItem[]>([]);
  const [deadlines, setDeadlines] = useState<ActionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [userRole] = useState('partner_manager');

  useEffect(() => {
    loadHomeData();
  }, []);

  const loadHomeData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/partnerships');
      const data = response.data.map((p: any) => ({
        ...p,
        health_state: p.health_score >= 75 ? 'HEALTHY' : p.health_score >= 50 ? 'AT_RISK' : 'CRITICAL'
      }));
      setPartnerships(data);
      
      const actions: ActionItem[] = data
        .filter((p: Partnership) => p.health_state !== 'HEALTHY')
        .sort((a: Partnership, b: Partnership) => a.health_score - b.health_score)
        .slice(0, 5)
        .map((p: Partnership) => ({
          type: 'ACTION' as const,
          partnership_id: p.id,
          partnership_name: p.name,
          priority: p.health_state === 'CRITICAL' ? 1 : 2,
          summary: p.days_to_milestone > 45 ? 'Execution stalled 21 days' : 'Health deteriorating',
          timestamp: new Date(),
          cta: 'Review',
          health_state: p.health_state
        }));
      setActionItems(actions);

      const changes: ActionItem[] = data.slice(0, 4).map((p: Partnership, i: number) => ({
        type: 'CHANGE' as const,
        partnership_id: p.id,
        partnership_name: p.name,
        priority: 3,
        summary: i % 2 === 0 ? 'Health improved from At Risk to Healthy' : 'Partner submitted Q1 update',
        timestamp: new Date(Date.now() - Math.random() * 86400000 * 3),
        cta: 'View',
        health_state: p.health_state
      }));
      setRecentChanges(changes);

      const recs: ActionItem[] = data
        .filter((p: Partnership) => p.health_state === 'AT_RISK')
        .slice(0, 3)
        .map((p: Partnership) => ({
          type: 'RECOMMENDATION' as const,
          partnership_id: p.id,
          partnership_name: p.name,
          priority: 2,
          summary: 'Recommend scheduling executive alignment call',
          timestamp: new Date(),
          cta: 'Confirm'
        }));
      setRecommendations(recs);

      const dueItems: ActionItem[] = data.slice(0, 3).map((p: Partnership) => ({
        type: 'DEADLINE' as const,
        partnership_id: p.id,
        partnership_name: p.name,
        priority: p.days_to_milestone < 7 ? 1 : 3,
        summary: `${p.next_milestone} due in ${p.days_to_milestone} days`,
        timestamp: new Date(Date.now() + p.days_to_milestone * 86400000),
        cta: 'View'
      }));
      setDeadlines(dueItems);

    } catch (error) {
      console.error('Failed to load home data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleItemClick = (partnershipId: number) => {
    router.push(`/partnership/${partnershipId}`);
  };

  const handleConfirmRecommendation = async (item: ActionItem) => {
    alert(`Confirmed recommendation for ${item.partnership_name}`);
    setRecommendations(recommendations.filter(r => r.partnership_id !== item.partnership_id));
  };

  const getHealthColor = (state?: string) => {
    switch (state) {
      case 'CRITICAL': return 'bg-red-500';
      case 'AT_RISK': return 'bg-yellow-500';
      case 'HEALTHY': return 'bg-green-500';
      default: return 'bg-gray-400';
    }
  };

  const getMyPartnershipsSnapshot = () => {
    const total = partnerships.length;
    const healthy = partnerships.filter(p => p.health_state === 'HEALTHY').length;
    const atRisk = partnerships.filter(p => p.health_state === 'AT_RISK').length;
    const critical = partnerships.filter(p => p.health_state === 'CRITICAL').length;
    
    const byType = partnerships.reduce((acc, p) => {
      acc[p.partnership_type] = (acc[p.partnership_type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return { total, healthy, atRisk, critical, byType };
  };

  const snapshot = getMyPartnershipsSnapshot();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-[#1e293b] border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1">
              <div className="w-8 h-8 bg-[#60a5fa] rounded"></div>
              <div className="w-8 h-8 bg-[#60e1fa] rounded"></div>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
              <p className="text-gray-400 mt-1">Here's what needs your attention</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center space-x-3">
                  <Target className="w-6 h-6 text-[#60a5fa]" />
                  <h2 className="text-xl font-bold text-gray-900">Your Focus Today</h2>
                </div>
              </div>
              <div className="divide-y divide-gray-200">
                {actionItems.length === 0 ? (
                  <div className="p-8 text-center text-gray-500">
                    <CheckCircle className="w-12 h-12 mx-auto mb-3 text-green-500" />
                    <p>All caught up! No partnerships need attention.</p>
                  </div>
                ) : (
                  actionItems.map((item) => (
                    <button
                      key={item.partnership_id}
                      onClick={() => handleItemClick(item.partnership_id)}
                      className="w-full p-6 hover:bg-gray-50 transition-colors text-left"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4 flex-1">
                          <div className={`w-3 h-3 rounded-full mt-1 ${getHealthColor(item.health_state)}`}></div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900">{item.partnership_name}</h3>
                            <p className="text-sm text-gray-600 mt-1">{item.summary}</p>
                          </div>
                        </div>
                        <span className="px-3 py-1 bg-gradient-to-r from-[#60a5fa] to-[#60e1fa] text-white text-sm font-medium rounded">
                          {item.cta}
                        </span>
                      </div>
                    </button>
                  ))
                )}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center space-x-3">
                  <Bell className="w-6 h-6 text-[#60e1fa]" />
                  <h2 className="text-xl font-bold text-gray-900">What Changed</h2>
                </div>
              </div>
              <div className="divide-y divide-gray-200">
                {recentChanges.map((item, idx) => (
                  <button
                    key={`${item.partnership_id}-${idx}`}
                    onClick={() => handleItemClick(item.partnership_id)}
                    className="w-full p-6 hover:bg-gray-50 transition-colors text-left"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-semibold text-gray-900">{item.partnership_name}</span>
                          <span className="text-xs text-gray-500">
                            {new Date(item.timestamp).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">{item.summary}</p>
                      </div>
                      <Eye className="w-5 h-5 text-gray-400" />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#60a5fa] to-[#60e1fa] border border-blue-200 rounded-lg shadow">
              <div className="p-6 border-b border-white/20">
                <div className="flex items-center space-x-3">
                  <AlertCircle className="w-6 h-6 text-white" />
                  <h2 className="text-xl font-bold text-white">Recommendations</h2>
                </div>
              </div>
              <div className="p-6 space-y-4">
                {recommendations.map((item) => (
                  <div key={item.partnership_id} className="bg-white rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{item.partnership_name}</h4>
                        <p className="text-sm text-gray-600 mt-1">{item.summary}</p>
                      </div>
                    </div>
                    <div className="flex space-x-3">
                      <button
                        onClick={() => handleConfirmRecommendation(item)}
                        className="px-4 py-2 bg-gradient-to-r from-[#60a5fa] to-[#60e1fa] text-white text-sm rounded-lg hover:opacity-90"
                      >
                        Confirm
                      </button>
                      <button
                        onClick={() => handleItemClick(item.partnership_id)}
                        className="px-4 py-2 bg-white border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50"
                      >
                        Review
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center space-x-3">
                  <Users className="w-6 h-6 text-[#60a5fa]" />
                  <h2 className="text-lg font-semibold text-gray-900">My Partnerships</h2>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <div className="text-sm text-gray-600 mb-1">Total Partnerships</div>
                  <div className="text-3xl font-bold text-gray-900">{snapshot.total}</div>
                </div>

                <div className="border-t border-gray-200 pt-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span className="text-sm text-gray-700">Healthy</span>
                    </div>
                    <span className="text-lg font-semibold text-gray-900">{snapshot.healthy}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <span className="text-sm text-gray-700">At Risk</span>
                    </div>
                    <span className="text-lg font-semibold text-gray-900">{snapshot.atRisk}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <span className="text-sm text-gray-700">Critical</span>
                    </div>
                    <span className="text-lg font-semibold text-gray-900">{snapshot.critical}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center space-x-3">
                  <Calendar className="w-6 h-6 text-[#60e1fa]" />
                  <h2 className="text-lg font-semibold text-gray-900">Upcoming</h2>
                </div>
              </div>
              <div className="p-6 space-y-4">
                {deadlines.map((item) => (
                  <button
                    key={item.partnership_id}
                    onClick={() => handleItemClick(item.partnership_id)}
                    className="w-full text-left p-3 rounded-lg hover:bg-gray-50 border border-gray-200"
                  >
                    <div className="flex items-start space-x-3">
                      <Clock className={`w-5 h-5 mt-0.5 ${item.priority === 1 ? 'text-red-600' : 'text-gray-400'}`} />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 text-sm">{item.partnership_name}</h4>
                        <p className="text-xs text-gray-600 mt-1">{item.summary}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => router.push('/executive')}
              className="w-full bg-gradient-to-r from-[#60a5fa] to-[#60e1fa] text-white rounded-lg shadow p-6 hover:opacity-90 transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="text-left">
                  <div className="text-sm font-medium">Executive View</div>
                  <div className="text-xs opacity-90 mt-1">Portfolio overview</div>
                </div>
                <TrendingUp className="w-6 h-6" />
              </div>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
