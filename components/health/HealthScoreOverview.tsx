'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import HealthDimensionCard from './HealthDimensionCard';
import HealthScoreOverride from './HealthScoreOverride';
import { Activity } from 'lucide-react';

interface DimensionScore {
  dimension: string;
  score: number;
  state: string;
  explanation: string;
}

interface HealthData {
  overallScore: number;
  overallState: string;
  dimensions: DimensionScore[];
}

interface HealthScoreOverviewProps {
  partnershipId: number;
}

export default function HealthScoreOverview({ partnershipId }: HealthScoreOverviewProps) {
  const [healthData, setHealthData] = useState<HealthData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHealthData();
  }, [partnershipId]);

  const loadHealthData = () => {
    setLoading(true);
    axios.get(`http://localhost:3000/api/partnerships/${partnershipId}/health`)
      .then(response => setHealthData(response.data))
      .catch(error => console.error('Failed to load health data:', error))
      .finally(() => setLoading(false));
  };

  if (loading) {
    return <div className="bg-white rounded-lg shadow p-6">Loading...</div>;
  }

  if (!healthData) {
    return <div className="bg-white rounded-lg shadow p-6">Unable to load health data</div>;
  }

  const getOverallStateColor = (state: string) => {
    switch (state) {
      case 'HEALTHY': return 'text-green-600 bg-green-50';
      case 'AT_RISK': return 'text-yellow-600 bg-yellow-50';
      case 'CRITICAL': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Activity className="w-6 h-6 text-blue-600" />
            <h3 className="text-xl font-bold text-gray-900">Partnership Health</h3>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="text-sm text-gray-600">Overall Score</div>
              <div className="text-3xl font-bold text-gray-900">{healthData.overallScore}</div>
            </div>
            <span className={`px-4 py-2 rounded-full font-semibold ${getOverallStateColor(healthData.overallState)}`}>
              {healthData.overallState.replace('_', ' ')}
            </span>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Override Component */}
        <HealthScoreOverride 
          partnershipId={partnershipId}
          systemScore={healthData.overallScore}
          onOverrideSaved={loadHealthData}
        />

        {/* Dimensions */}
        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-4">Health Dimensions</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {healthData.dimensions.map((dimension) => (
              <HealthDimensionCard key={dimension.dimension} dimension={dimension} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
