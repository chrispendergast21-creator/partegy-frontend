'use client';

import { AlertTriangle, TrendingUp, Shield, XCircle } from 'lucide-react';

interface Risk {
  id: number;
  type: string;
  severity: string;
  description: string;
  mitigation: string;
  status: string;
}

interface RiskAssessmentProps {
  risks: Risk[];
}

export default function RiskAssessment({ risks }: RiskAssessmentProps) {
  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'high': return <XCircle className="w-5 h-5" />;
      case 'medium': return <AlertTriangle className="w-5 h-5" />;
      case 'low': return <Shield className="w-5 h-5" />;
      default: return <AlertTriangle className="w-5 h-5" />;
    }
  };

  const activeRisks = risks.filter(r => r.status === 'active');
  const criticalRisks = activeRisks.filter(r => r.severity.toLowerCase() === 'high');

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Risk Assessment</h3>
        <div className="flex items-center space-x-4 text-sm">
          <span className="text-gray-600">
            <span className="font-semibold text-red-600">{criticalRisks.length}</span> Critical
          </span>
          <span className="text-gray-600">
            <span className="font-semibold">{activeRisks.length}</span> Total Active
          </span>
        </div>
      </div>

      {activeRisks.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <Shield className="w-12 h-12 mx-auto mb-3 text-green-500" />
          <p>No active risks identified</p>
        </div>
      ) : (
        <div className="space-y-4">
          {activeRisks.map((risk) => (
            <div
              key={risk.id}
              className={`border rounded-lg p-4 ${getSeverityColor(risk.severity)}`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-2">
                  {getSeverityIcon(risk.severity)}
                  <span className="font-semibold">{risk.type}</span>
                </div>
                <span className="text-xs font-medium px-2 py-1 rounded uppercase">
                  {risk.severity}
                </span>
              </div>
              
              <p className="text-sm mb-3">{risk.description}</p>
              
              {risk.mitigation && (
                <div className="bg-white bg-opacity-50 rounded p-3">
                  <p className="text-xs font-medium mb-1">Mitigation Strategy:</p>
                  <p className="text-sm">{risk.mitigation}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
