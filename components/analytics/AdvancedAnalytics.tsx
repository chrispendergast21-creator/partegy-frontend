'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

interface AdvancedAnalyticsProps {
  partnerships: any[];
}

export default function AdvancedAnalytics({ partnerships }: AdvancedAnalyticsProps) {
  const typeDistribution = [
    { name: 'Strategic Alliance', value: partnerships.filter(p => p.partnership_type === 'STRATEGIC_ALLIANCE').length },
    { name: 'Co-Sell', value: partnerships.filter(p => p.partnership_type === 'CO_SELL').length },
    { name: 'Referral', value: partnerships.filter(p => p.partnership_type === 'REFERRAL').length },
    { name: 'Delivery', value: partnerships.filter(p => p.partnership_type === 'DELIVERY').length }
  ].filter(item => item.value > 0);

  const revenueByType = [
    { 
      type: 'Strategic Alliance', 
      revenue: partnerships.filter(p => p.partnership_type === 'STRATEGIC_ALLIANCE').reduce((sum, p) => sum + (p.revenue || 0), 0) / 1000000
    },
    { 
      type: 'Co-Sell', 
      revenue: partnerships.filter(p => p.partnership_type === 'CO_SELL').reduce((sum, p) => sum + (p.revenue || 0), 0) / 1000000
    },
    { 
      type: 'Referral', 
      revenue: partnerships.filter(p => p.partnership_type === 'REFERRAL').reduce((sum, p) => sum + (p.revenue || 0), 0) / 1000000
    },
    { 
      type: 'Delivery', 
      revenue: partnerships.filter(p => p.partnership_type === 'DELIVERY').reduce((sum, p) => sum + (p.revenue || 0), 0) / 1000000
    }
  ].filter(item => item.revenue > 0);

  const COLORS = ['#60a5fa', '#60e1fa', '#34d399', '#f59e0b'];

  const totalRevenue = partnerships.reduce((sum, p) => sum + (p.revenue || 0), 0);
  const totalPipeline = partnerships.reduce((sum, p) => sum + (p.pipeline || 0), 0);
  const avgHealthScore = partnerships.length > 0 
    ? Math.round(partnerships.reduce((sum, p) => sum + (p.health_score || 0), 0) / partnerships.length)
    : 0;

  const renderLabel = (entry: any) => {
    const percent = entry.percent || 0;
    return `${entry.name} ${(percent * 100).toFixed(0)}%`;
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm text-gray-600 mb-2">Total Revenue</div>
          <div className="text-3xl font-bold bg-gradient-to-r from-[#60a5fa] to-[#60e1fa] bg-clip-text text-transparent">
            ${(totalRevenue / 1000000).toFixed(1)}M
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm text-gray-600 mb-2">Total Pipeline</div>
          <div className="text-3xl font-bold text-gray-900">
            ${(totalPipeline / 1000000).toFixed(1)}M
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm text-gray-600 mb-2">Avg Health Score</div>
          <div className="text-3xl font-bold text-gray-900">{avgHealthScore}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Partnership Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={typeDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {typeDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue by Type ($M)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueByType}>
              <XAxis dataKey="type" angle={-45} textAnchor="end" height={100} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" fill="#60a5fa" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
