'use client';

import { CheckCircle, AlertTriangle, XCircle } from 'lucide-react';

interface DimensionScore {
  dimension: string;
  score: number;
  state: string;
  explanation: string;
}

interface HealthDimensionCardProps {
  dimension: DimensionScore;
}

export default function HealthDimensionCard({ dimension }: HealthDimensionCardProps) {
  const getStateIcon = (state: string) => {
    switch (state) {
      case 'HEALTHY': return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'AT_RISK': return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      case 'CRITICAL': return <XCircle className="w-5 h-5 text-red-600" />;
      default: return <AlertTriangle className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStateColor = (state: string) => {
    switch (state) {
      case 'HEALTHY': return 'bg-green-50 border-green-200';
      case 'AT_RISK': return 'bg-yellow-50 border-yellow-200';
      case 'CRITICAL': return 'bg-red-50 border-red-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 75) return 'text-green-600';
    if (score >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  const formatDimensionName = (dim: string) => {
    return dim.split('_').map(word => 
      word.charAt(0) + word.slice(1).toLowerCase()
    ).join(' ');
  };

  return (
    <div className={`border rounded-lg p-4 ${getStateColor(dimension.state)}`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2">
          {getStateIcon(dimension.state)}
          <h4 className="font-semibold text-gray-900">
            {formatDimensionName(dimension.dimension)}
          </h4>
        </div>
        <span className={`text-2xl font-bold ${getScoreColor(dimension.score)}`}>
          {dimension.score}
        </span>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
        <div 
          className={`h-2 rounded-full ${
            dimension.score >= 75 ? 'bg-green-600' : 
            dimension.score >= 50 ? 'bg-yellow-600' : 
            'bg-red-600'
          }`}
          style={{ width: `${dimension.score}%` }}
        />
      </div>
      
      <p className="text-sm text-gray-700">{dimension.explanation}</p>
    </div>
  );
}
