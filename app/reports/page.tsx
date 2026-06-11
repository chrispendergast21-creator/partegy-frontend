'use client';

import { useEffect, useState } from 'react';
import { useOrganization } from '@/lib/useOrganization';
import { API_URL } from '@/lib/api';
import { PageNavigation } from '@/components/PageNavigation';
import { FileText, Eye, Mail, Share, Calendar, BarChart3, TrendingUp, Building2, Target, Crown, Clock, AlertTriangle } from 'lucide-react';
import axios from 'axios';

export default function ReportsPage() {
  const { currentOrg } = useOrganization();
  const [generatingReport, setGeneratingReport] = useState<string | null>(null);

  const portfolioStats = {
    totalPartnerships: 34,
    healthyCount: 24,
    totalRevenue: 90600000,
    avgHealthScore: 78
  };

  const reports = [
    { title: 'Executive Summary', description: 'Comprehensive overview of partnership portfolio performance', icon: Crown, type: 'executive-summary', lastGenerated: '2026-02-24', isScheduled: true },
    { title: 'Health Analysis', description: '6-dimension health scoring across all partnerships', icon: BarChart3, type: 'health-analysis', lastGenerated: '2026-02-20', isScheduled: false },
    { title: 'Risk Assessment', description: 'Concentration risk, at-risk partnerships, and early warnings', icon: AlertTriangle, type: 'risk-assessment', lastGenerated: '2026-02-18', isScheduled: true },
    { title: 'Revenue Performance', description: 'Revenue attribution, pipeline, and growth trends', icon: TrendingUp, type: 'revenue-performance', lastGenerated: '2026-02-15', isScheduled: false },
  ];

  const generateReport = (type: string, title: string) => {
    setGeneratingReport(type);
    setTimeout(() => {
      alert(`${title} generated! In production this would open a full PDF report.`);
      setGeneratingReport(null);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <PageNavigation />
      <main className="max-w-7xl mx-auto px-8 py-8 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Reports</h1>
            <p className="text-slate-400 mt-1">Generate and share partnership intelligence reports</p>
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
            <Calendar className="w-4 h-4" />
            <span>Schedule Report</span>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { icon: Building2, value: portfolioStats.totalPartnerships, label: 'Total Partnerships', color: 'bg-blue-500/20 text-blue-400' },
            { icon: TrendingUp, value: portfolioStats.healthyCount, label: 'Healthy Partnerships', color: 'bg-emerald-500/20 text-emerald-400' },
            { icon: BarChart3, value: `$${(portfolioStats.totalRevenue / 1000000).toFixed(1)}M`, label: 'Total Revenue', color: 'bg-purple-500/20 text-purple-400' },
            { icon: Target, value: portfolioStats.avgHealthScore, label: 'Avg Health Score', color: 'bg-orange-500/20 text-orange-400' },
          ].map((stat, idx) => (
            <div key={idx} className="bg-slate-900 border border-slate-700 rounded-xl p-6">
              <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center mb-4`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-slate-400 text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Reports Grid */}
        <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-6">Available Reports</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reports.map((report) => (
              <div key={report.type} className="bg-slate-800 border border-slate-700 rounded-xl p-6 hover:border-blue-500 transition-colors">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                    <report.icon className="w-6 h-6 text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="text-white font-semibold">{report.title}</h3>
                      {report.isScheduled && <Clock className="w-4 h-4 text-blue-400" />}
                    </div>
                    <p className="text-slate-400 text-sm mb-4">{report.description}</p>
                    <div className="text-slate-500 text-xs mb-4">Last generated: {report.lastGenerated}</div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => generateReport(report.type, report.title)}
                        disabled={generatingReport === report.type}
                        className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors disabled:opacity-50"
                      >
                        {generatingReport === report.type ? (
                          <><div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin"></div><span>Generating...</span></>
                        ) : (
                          <><Eye className="w-3 h-3" /><span>View Report</span></>
                        )}
                      </button>
                      <button className="flex items-center space-x-2 px-3 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 text-sm rounded-lg transition-colors">
                        <Mail className="w-3 h-3" />
                        <span>Email</span>
                      </button>
                      <button className="flex items-center space-x-2 px-3 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 text-sm rounded-lg transition-colors">
                        <Share className="w-3 h-3" />
                        <span>Share</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
