'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { Target, TrendingUp, Calendar, AlertCircle } from 'lucide-react';

interface Partnership {
  id: number;
  name: string;
  tier: string;
  revenue: number;
  revenue_change: number;
  pipeline: number;
  next_milestone: string;
  days_to_milestone: number;
  strategic_objective: string;
}

interface OKR {
  id: number;
  title: string;
  description: string;
  target_value: number;
  current_value: number;
  status: string;
}

export default function PartnerPortal() {
  const params = useParams();
  const partnershipId = params.id as string;
  
  const [partnership, setPartnership] = useState<Partnership | null>(null);
  const [okrs, setOkrs] = useState<OKR[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPortalData();
  }, [partnershipId]);

  const loadPortalData = async () => {
    try {
      const partnershipRes = await axios.get(`http://localhost:3000/api/partnerships`);
      const found = partnershipRes.data.find((p: any) => p.id === parseInt(partnershipId));
      setPartnership(found);

      const okrsRes = await axios.get(`http://localhost:3000/api/partnerships/${partnershipId}/okrs`);
      setOkrs(okrsRes.data);
    } catch (error) {
      console.error('Failed to load portal data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getProgress = (current: number, target: number) => {
    if (target === 0) return 0;
    return Math.min(100, Math.round((current / target) * 100));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on_track': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'at_risk': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!partnership) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-gray-600">Partnership not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">{partnership.name}</h1>
          <p className="text-gray-600 mt-1">Partner Portal</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Partnership Tier</span>
              <Target className="w-5 h-5 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{partnership.tier}</div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Next Milestone</span>
              <Calendar className="w-5 h-5 text-purple-600" />
            </div>
            <div className="text-lg font-semibold text-gray-900">{partnership.next_milestone}</div>
            <div className="text-sm text-gray-600 mt-1">{partnership.days_to_milestone} days</div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Active OKRs</span>
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{okrs.length}</div>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-blue-900 mb-2">Strategic Objective</h3>
              <p className="text-blue-800">{partnership.strategic_objective}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow mb-8">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Shared Goals & OKRs</h2>
          </div>
          <div className="p-6">
            {okrs.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No shared OKRs yet</p>
            ) : (
              <div className="space-y-4">
                {okrs.map((okr) => (
                  <div key={okr.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{okr.title}</h4>
                        {okr.description && (
                          <p className="text-sm text-gray-600 mt-1">{okr.description}</p>
                        )}
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(okr.status)}`}>
                        {okr.status.replace('_', ' ')}
                      </span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Progress</span>
                        <span className="font-semibold">
                          {okr.current_value} / {okr.target_value} ({getProgress(okr.current_value, okr.target_value)}%)
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${getProgress(okr.current_value, okr.target_value)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="bg-gray-100 border border-gray-200 rounded-lg p-4 text-center">
          <p className="text-sm text-gray-600">
            📊 This portal shows shared execution data. Internal metrics and health scores are not visible to partners.
          </p>
        </div>
      </main>
    </div>
  );
}
