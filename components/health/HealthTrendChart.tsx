'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, Calendar } from 'lucide-react';

interface TrendData {
  date: string;
  overall_score: number;
}

interface HealthTrendChartProps {
  partnershipId: number;
}

export default function HealthTrendChart({ partnershipId }: HealthTrendChartProps) {
  const [trendData, setTrendData] = useState<TrendData[]>([]);
  const [loading, setLoading] = useState(true);
  const [days, setDays] = useState(30);

  useEffect(() => {
    loadTrendData();
  }, [partnershipId, days]);

  const loadTrendData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/partnerships/${partnershipId}/health/trend?days=${days}`
      );
      setTrendData(response.data);
    } catch (error) {
      console.error('Failed to load trend data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (trendData.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center space-x-3 mb-4">
          <TrendingUp className="w-6 h-6 text-blue-600" />
          <h3 className="text-xl font-bold text-gray-900">Health Trend</h3>
        </div>
        <div className="text-center py-8 text-gray-500">
          <Calendar className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p>Not enough historical data yet</p>
          <p className="text-sm">Check back after more health calculations</p>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const chartData = trendData.map(item => ({
    date: formatDate(item.date),
    score: Math.round(parseFloat(item.overall_score as any))
  }));

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <TrendingUp className="w-6 h-6 text-blue-600" />
            <h3 className="text-xl font-bold text-gray-900">Health Trend</h3>
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={() => setDays(7)}
              className={`px-3 py-1 rounded text-sm ${
                days === 7 ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              7D
            </button>
            <button
              onClick={() => setDays(30)}
              className={`px-3 py-1 rounded text-sm ${
                days === 30 ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              30D
            </button>
            <button
              onClick={() => setDays(90)}
              className={`px-3 py-1 rounded text-sm ${
                days === 90 ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              90D
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="date" 
              tick={{ fontSize: 12 }}
            />
            <YAxis 
              domain={[0, 100]}
              tick={{ fontSize: 12 }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px'
              }}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="score" 
              name="Health Score"
              stroke="#2563eb" 
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
