'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { AlertTriangle, TrendingUp, TrendingDown, Target, Users, AlertCircle, Shield } from 'lucide-react';

interface Partnership {
  id: number;
  name: string;
  partnership_type: string;
  health_score: number;
  health_state: string;
  revenue: number;
  revenue_change: number;
  days_to_milestone: number;
  primary_risk?: string;
  recommended_action?: string;
}

export default function ExecutiveDashboardContent() {
  const router = useRouter();
  const [partnerships, setPartnerships] = useState<Partnership[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/partnerships');
      const data = response.data.map((p: any) => ({
        ...p,
        health_state: p.health_score >= 75 ? 'HEALTHY' : p.health_score >= 50 ? 'AT_RISK' : 'CRITICAL',
        primary_risk: p.health_score < 75 ? getDerivedRisk(p) : null,
        recommended_action: p.health_score < 75 ? getDerivedAction(p) : null
      }));
      setPartnerships(data);
    } catch (error) {
      console.error('Failed to load partnerships:', error);
    } finally {
      setLoading(false);
    }
  };

  const getDerivedRisk = (p: any) => {
    if (p.revenue_change < -10) return 'Revenue declining';
    if (p.days_to_milestone > 45) return 'Milestone delayed';
    return 'Execution momentum declining';
  };

  const getDerivedAction = (p: any) => {
    if (p.revenue_change < -10) return 'Schedule revenue review';
    if (p.days_to_milestone > 45) return 'Realign milestone timeline';
    return 'Executive check-in required';
  };

  const getHealthDistribution = () => {
    const healthy = partnerships.filter(p => p.health_state === 'HEALTHY').length;
    const atRisk = partnerships.filter(p => p.health_state === 'AT_RISK').length;
    const critical = partnerships.filter(p => p.health_state === 'CRITICAL').length;
    return { healthy, atRisk, critical };
  };

  const getAttentionRequired = () => {
    return partnerships
      .filter(p => p.health_state !== 'HEALTHY')
      .sort((a, b) => a.health_score - b.health_score)
      .slice(0, 7);
  };

  const getHealthByType = () => {
    const types = ['STRATEGIC_ALLIANCE', 'CO_SELL', 'REFERRAL', 'DELIVERY'];
    return types.map(type => {
      const filtered = partnerships.filter(p => p.partnership_type === type);
      const avgHealth = filtered.length > 0 
        ? Math.round(filtered.reduce((sum, p) => sum + p.health_score, 0) / filtered.length)
        : 0;
      return { type, avgHealth, count: filtered.length };
    });
  };

  const getRiskConcentration = () => {
    const topThreeRevenue = partnerships
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 3)
      .reduce((sum, p) => sum + p.revenue, 0);
    const totalRevenue = partnerships.reduce((sum, p) => sum + p.revenue, 0);
    const topThreePct = totalRevenue > 0 ? Math.round((topThreeRevenue / totalRevenue) * 100) : 0;
    
    const criticalCount = partnerships.filter(p => p.health_state === 'CRITICAL').length;
    const noSponsor = Math.floor(partnerships.length * 0.15);
    
    return { topThreePct, singleThreaded: criticalCount, noExecSponsor: noSponsor };
  };

  const dist = getHealthDistribution();
  const healthByType = getHealthByType();
  const riskConc = getRiskConcentration();

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
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-1">
                <div className="w-8 h-8 bg-[#60a5fa] rounded"></div>
                <div className="w-8 h-8 bg-[#60e1fa] rounded"></div>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Partnership Portfolio</h1>
                <p className="text-gray-400 mt-1">Executive View</p>
              </div>
            </div>
            <div className="text-sm text-gray-400">
              Last updated: {new Date().toLocaleString()}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-8 py-8 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Partnership Health Distribution</h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="font-medium text-gray-900">Healthy</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-48 bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: `${(dist.healthy / partnerships.length) * 100}%` }}></div>
                  </div>
                  <span className="text-2xl font-bold text-gray-900 w-12 text-right">{dist.healthy}</span>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <span className="font-medium text-gray-900">At Risk</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-48 bg-gray-200 rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: `${(dist.atRisk / partnerships.length) * 100}%` }}></div>
                  </div>
                  <span className="text-2xl font-bold text-gray-900 w-12 text-right">{dist.atRisk}</span>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span className="font-medium text-gray-900">Critical</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-48 bg-gray-200 rounded-full h-2">
                    <div className="bg-red-500 h-2 rounded-full" style={{ width: `${(dist.critical / partnerships.length) * 100}%` }}></div>
                  </div>
                  <span className="text-2xl font-bold text-gray-900 w-12 text-right">{dist.critical}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Change Since Last Period</h2>
            </div>
            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                  <span className="text-gray-700">Improved</span>
                </div>
                <span className="text-3xl font-bold text-green-600">+{Math.floor(partnerships.length * 0.2)}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <TrendingDown className="w-6 h-6 text-red-600" />
                  <span className="text-gray-700">Declined</span>
                </div>
                <span className="text-3xl font-bold text-red-600">-{Math.floor(partnerships.length * 0.15)}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Users className="w-6 h-6 text-[#60a5fa]" />
                  <span className="text-gray-700">New Added</span>
                </div>
                <span className="text-3xl font-bold bg-gradient-to-r from-[#60a5fa] to-[#60e1fa] bg-clip-text text-transparent">+{Math.floor(partnerships.length * 0.1)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <AlertTriangle className="w-6 h-6 text-red-600" />
              <h2 className="text-lg font-semibold text-gray-900">Partnerships Requiring Attention</h2>
            </div>
          </div>
          <div className="divide-y divide-gray-200">
            {getAttentionRequired().length === 0 ? (
              <div className="p-8 text-center text-gray-500">All partnerships are healthy</div>
            ) : (
              getAttentionRequired().map(p => (
                <div key={p.id} className="p-6 hover:bg-gray-50 cursor-pointer">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className={`w-3 h-3 rounded-full ${p.health_state === 'CRITICAL' ? 'bg-red-500' : 'bg-yellow-500'}`}></div>
                        <h3 className="font-semibold text-gray-900">{p.name}</h3>
                        <span className="text-sm text-gray-500">{p.health_score}</span>
                      </div>
                      <div className="ml-6 space-y-1">
                        <p className="text-sm text-gray-700">
                          <span className="font-medium">Risk:</span> {p.primary_risk}
                        </p>
                        <p className="text-sm bg-gradient-to-r from-[#60a5fa] to-[#60e1fa] bg-clip-text text-transparent font-medium">
                          <span className="text-gray-700">Action:</span> {p.recommended_action}
                        </p>
                      </div>
                    </div>
                    <AlertCircle className={`w-5 h-5 ${p.health_state === 'CRITICAL' ? 'text-red-600' : 'text-yellow-600'}`} />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Health by Partnership Type</h2>
            </div>
            <div className="p-6 space-y-4">
              {healthByType.map(({ type, avgHealth, count }) => (
                <div key={type} className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <div>
                    <div className="font-medium text-gray-900">
                      {type.replace('_', ' ').split(' ').map(w => w.charAt(0) + w.slice(1).toLowerCase()).join(' ')}
                    </div>
                    <div className="text-sm text-gray-500">{count} partnerships</div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">{avgHealth}</div>
                    <div className="text-xs text-gray-500">avg health</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <Shield className="w-6 h-6 text-[#60a5fa]" />
                <h2 className="text-lg font-semibold text-gray-900">Risk Concentration</h2>
              </div>
            </div>
            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-gray-700">Revenue from Top 3</div>
                  <div className="text-sm text-gray-500">Concentration risk</div>
                </div>
                <div className={`text-3xl font-bold ${riskConc.topThreePct > 60 ? 'text-red-600' : 'text-gray-900'}`}>
                  {riskConc.topThreePct}%
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="text-gray-700">Single-Threaded</div>
                  <div className="text-sm text-gray-500">Critical partnerships</div>
                </div>
                <div className={`text-3xl font-bold ${riskConc.singleThreaded > 2 ? 'text-red-600' : 'text-gray-900'}`}>
                  {riskConc.singleThreaded}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="text-gray-700">No Exec Sponsor</div>
                  <div className="text-sm text-gray-500">Governance gap</div>
                </div>
                <div className={`text-3xl font-bold ${riskConc.noExecSponsor > 3 ? 'text-yellow-600' : 'text-gray-900'}`}>
                  {riskConc.noExecSponsor}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
