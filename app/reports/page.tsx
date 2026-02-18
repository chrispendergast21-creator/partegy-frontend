'use client';

import { useOrganization } from '@/lib/useOrganization';
import { Building2, FileText, Download, TrendingUp } from 'lucide-react';

export default function ReportsPage() {
  const { currentOrg } = useOrganization();

  if (!currentOrg) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Building2 className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No Organization Selected</h2>
        </div>
      </div>
    );
  }

  const reports = [
    { title: 'Executive Summary', description: 'High-level partnership overview', icon: TrendingUp },
    { title: 'Health Score Report', description: 'Detailed health analysis', icon: FileText },
    { title: 'Revenue Performance', description: 'Financial performance metrics', icon: FileText },
    { title: 'Quarterly Review', description: 'Comprehensive quarterly report', icon: FileText }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-[#1e293b] border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div>
            <h1 className="text-3xl font-bold text-white">Reports</h1>
            <p className="text-gray-400 mt-1">{currentOrg.name}</p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reports.map((report, idx) => (
            <div key={idx} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-4">
                <report.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{report.title}</h3>
              <p className="text-sm text-gray-600 mb-4">{report.description}</p>
              <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-gradient-to-r from-[#60a5fa] to-[#60e1fa] text-white rounded-lg hover:opacity-90">
                <Download className="w-4 h-4" />
                <span>Generate</span>
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
