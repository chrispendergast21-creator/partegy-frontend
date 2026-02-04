'use client';

import { useEffect, useState } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { DollarSign, Target, Activity } from 'lucide-react';

interface AnalyticsProps {
  partnershipId: number;
}

export default function AdvancedAnalytics({ partnershipId }: AnalyticsProps) {
  const [loading, setLoading] = useState(true);

  const revenueData = [
    { month: 'Jan', actual: 180000, forecast: 200000 },
    { month: 'Feb', actual: 220000, forecast: 230000 },
    { month: 'Mar', actual: 250000, forecast: 240000 },
    { month: 'Apr', actual: 280000, forecast: 270000 },
    { month: 'May', actual: 320000, forecast: 300000 },
    { month: 'Jun', actual: 0, forecast: 350000 },
  ];

  const pipelineData = [
    { stage: 'Qualified', value: 2400000 },
    { stage: 'Proposal', value: 1800000 },
    { stage: 'Negotiation', value: 1200000 },
    { stage: 'Closed Won', value: 800000 },
  ];

  const engagementData = [
    { week: 'Week 1', meetings: 5, emails: 12 },
    { week: 'Week 2', meetings: 8, emails: 15 },
    { week: 'Week 3', meetings: 6, emails: 10 },
    { week: 'Week 4', meetings: 9, emails: 18 },
  ];

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

  useEffect(() => {
    setLoading(false);
  }, [partnershipId]);

  if (loading) {
    return <div className="bg-white rounded-lg shadow p-6">Loading analytics...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <DollarSign className="w-6 h-6 text-green-600" />
            <h3 className="text-xl font-bold text-gray-900">Revenue Trend & Forecast</h3>
          </div>
        </div>
        <div className="p-6">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => `$${(value as number).toLocaleString()}`} />
              <Legend />
              <Line type="monotone" dataKey="actual" name="Actual Revenue" stroke="#10b981" strokeWidth={2} />
              <Line type="monotone" dataKey="forecast" name="Forecast" stroke="#3b82f6" strokeWidth={2} strokeDasharray="5 5" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <Target className="w-6 h-6 text-purple-600" />
              <h3 className="text-xl font-bold text-gray-900">Pipeline Distribution</h3>
            </div>
          </div>
          <div className="p-6">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pipelineData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pipelineData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `$${(value as number).toLocaleString()}`} />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {pipelineData.map((item, index) => (
                <div key={item.stage} className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }}></div>
                  <span className="text-sm text-gray-600">{item.stage}: ${(item.value / 1000000).toFixed(1)}M</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <Activity className="w-6 h-6 text-blue-600" />
              <h3 className="text-xl font-bold text-gray-900">Engagement Activity</h3>
            </div>
          </div>
          <div className="p-6">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={engagementData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="meetings" name="Meetings" fill="#3b82f6" />
                <Bar dataKey="emails" name="Emails" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4">
          <div className="text-sm text-green-600 font-medium mb-1">Revenue Growth</div>
          <div className="text-2xl font-bold text-green-900">+23%</div>
          <div className="text-xs text-green-600 mt-1">vs last quarter</div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4">
          <div className="text-sm text-blue-600 font-medium mb-1">Win Rate</div>
          <div className="text-2xl font-bold text-blue-900">67%</div>
          <div className="text-xs text-blue-600 mt-1">closed deals</div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4">
          <div className="text-sm text-purple-600 font-medium mb-1">Avg Deal Size</div>
          <div className="text-2xl font-bold text-purple-900">$45K</div>
          <div className="text-xs text-purple-600 mt-1">per opportunity</div>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-4">
          <div className="text-sm text-orange-600 font-medium mb-1">Sales Cycle</div>
          <div className="text-2xl font-bold text-orange-900">45d</div>
          <div className="text-xs text-orange-600 mt-1">average length</div>
        </div>
      </div>
    </div>
  );
}
