'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useOrganization } from '@/lib/useOrganization';
import { API_URL } from '@/lib/api';
import {
  FileText,
  Download,
  Calendar,
  Building2,
  Filter,
  TrendingUp,
  AlertCircle,
  DollarSign,
  Users,
  Clock,
  Eye,
  Share,
  Mail,
  BarChart3,
  PieChart,
  Target
} from 'lucide-react';

export default function ReportsPage() {
  const router = useRouter();
  const { currentOrg } = useOrganization();
  const [partnerships, setPartnerships] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentOrg) {
      loadData();
    }
  }, [currentOrg]);

  const loadData = async () => {
    if (!currentOrg) return;
    
    try {
      const response = await axios.get(`${API_URL}/api/partnerships?org_id=${currentOrg.id}`);
      setPartnerships(response.data);
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  };

  const reportCategories = [
    {
      id: 1,
      category: 'Executive Reports',
      description: 'High-level insights for leadership',
      gradient: 'from-[#60a5fa] to-[#3b82f6]',
      reports: [
        {
          title: 'Executive Summary',
          description: 'Comprehensive partnership portfolio overview',
          icon: TrendingUp,
          lastGenerated: '2 hours ago',
          downloadCount: 45,
          available: true
        },
        {
          title: 'Board Report',
          description: 'Quarterly partnership performance for board meetings',
          icon: Building2,
          lastGenerated: '1 week ago',
          downloadCount: 12,
          available: true
        }
      ]
    },
    {
      id: 2,
      category: 'Performance Analytics',
      description: 'Detailed performance and health analysis',
      gradient: 'from-[#10b981] to-[#059669]',
      reports: [
        {
          title: 'Health Score Analysis',
          description: 'Deep dive into partnership health across all dimensions',
          icon: AlertCircle,
          lastGenerated: '4 hours ago',
          downloadCount: 28,
          available: true
        },
        {
          title: 'Revenue Performance',
          description: 'Financial performance analysis and trends',
          icon: DollarSign,
          lastGenerated: '1 day ago',
          downloadCount: 34,
          available: true
        }
      ]
    },
    {
      id: 3,
      category: 'Operational Reports',
      description: 'Day-to-day operational insights',
      gradient: 'from-[#a855f7] to-[#7c3aed]',
      reports: [
        {
          title: 'Risk Assessment',
          description: 'Identification and analysis of at-risk partnerships',
          icon: AlertCircle,
          lastGenerated: '6 hours ago',
          downloadCount: 19,
          available: true
        },
        {
          title: 'Stakeholder Engagement',
          description: 'Analysis of stakeholder activity and engagement levels',
          icon: Users,
          lastGenerated: '3 days ago',
          downloadCount: 23,
          available: true
        }
      ]
    }
  ];

  const recentReports = [
    {
      title: 'Q1 2026 Executive Summary',
      type: 'Executive Summary',
      date: 'Feb 16, 2026',
      downloads: 12,
      size: '2.4 MB',
      format: 'PDF'
    },
    {
      title: 'Partnership Health Analysis - February',
      type: 'Health Analysis',
      date: 'Feb 15, 2026',
      downloads: 8,
      size: '1.8 MB',
      format: 'PDF'
    },
    {
      title: 'Revenue Performance Report',
      type: 'Financial',
      date: 'Feb 12, 2026',
      downloads: 15,
      size: '3.1 MB',
      format: 'PDF'
    },
    {
      title: 'At-Risk Partnerships Assessment',
      type: 'Risk Analysis',
      date: 'Feb 10, 2026',
      downloads: 6,
      size: '1.5 MB',
      format: 'PDF'
    }
  ];

  const stats = {
    totalPartnerships: partnerships.length,
    totalRevenue: partnerships.reduce((sum, p) => sum + (p.revenue || 0), 0),
    avgHealth: partnerships.length > 0 
      ? Math.round(partnerships.reduce((sum, p) => sum + (p.health_score || 0), 0) / partnerships.length)
      : 0,
    atRisk: partnerships.filter(p => p.health === 'at-risk' || p.health === 'critical').length
  };

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="bg-gradient-to-r from-[#1e293b] via-[#334155] to-[#475569] border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-[#60a5fa] to-[#60e1fa] bg-clip-text text-transparent">
                Partnership Reports
              </h1>
              <p className="text-gray-300 mt-1">{currentOrg.name} • Generate and download insights</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-[#60a5fa] to-[#60e1fa] text-white rounded-xl hover:shadow-lg transition-all">
                <Calendar className="w-5 h-5" />
                <span>Schedule Report</span>
              </button>
              <button className="flex items-center space-x-2 px-6 py-3 bg-white/10 backdrop-blur-sm text-white border border-white/20 rounded-xl hover:bg-white/20 transition-all">
                <Share className="w-5 h-5" />
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-8 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={Building2}
            label="Total Partnerships"
            value={stats.totalPartnerships}
            gradient="from-[#60a5fa] to-[#3b82f6]"
          />
          <StatCard
            icon={DollarSign}
            label="Total Revenue"
            value={`$${(stats.totalRevenue / 1000000).toFixed(1)}M`}
            gradient="from-[#10b981] to-[#059669]"
          />
          <StatCard
            icon={TrendingUp}
            label="Avg Health Score"
            value={stats.avgHealth}
            gradient="from-[#a855f7] to-[#7c3aed]"
          />
          <StatCard
            icon={AlertCircle}
            label="At Risk"
            value={stats.atRisk}
            gradient="from-[#f59e0b] to-[#d97706]"
          />
        </div>

        {/* Report Categories */}
        <div className="space-y-8 mb-8">
          {reportCategories.map((category) => (
            <div key={category.id} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
              <div className={`bg-gradient-to-r ${category.gradient} px-8 py-6`}>
                <h2 className="text-xl font-bold text-white mb-2">{category.category}</h2>
                <p className="text-white/80">{category.description}</p>
              </div>
              
              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {category.reports.map((report, idx) => (
                    <ReportCard key={idx} report={report} />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Reports */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-[#60a5fa] to-[#60e1fa] flex items-center justify-center">
                <Clock className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Recent Reports</h2>
                <p className="text-sm text-gray-600">Previously generated reports available for download</p>
              </div>
            </div>
            <button className="text-[#60a5fa] hover:text-[#3b82f6] font-medium text-sm">
              View Archive
            </button>
          </div>

          <div className="space-y-4">
            {recentReports.map((report, idx) => (
              <RecentReportItem key={idx} report={report} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, gradient }: any) {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 hover:shadow-2xl transition-all duration-300 group">
      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
        <Icon className="w-7 h-7 text-white" />
      </div>
      <div className="text-3xl font-bold text-gray-900 mb-1">{value}</div>
      <div className="text-sm font-medium text-gray-600">{label}</div>
    </div>
  );
}

function ReportCard({ report }: any) {
  const Icon = report.icon;
  
  return (
    <div className="group bg-white rounded-xl border-2 border-gray-100 p-6 hover:border-[#60a5fa] hover:shadow-lg transition-all duration-300">
      <div className="flex items-start space-x-4">
        <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-[#60a5fa] to-[#60e1fa] flex items-center justify-center group-hover:scale-110 transition-transform">
          <Icon className="w-6 h-6 text-white" />
        </div>
        
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-900 mb-2">{report.title}</h3>
          <p className="text-sm text-gray-600 mb-4">{report.description}</p>
          
          <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
            <div className="flex items-center space-x-4">
              <span>Last: {report.lastGenerated}</span>
              <span>•</span>
              <span>{report.downloadCount} downloads</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              disabled={!report.available}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-[#60a5fa] to-[#60e1fa] text-white rounded-lg hover:shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Download className="w-4 h-4" />
              <span>Generate</span>
            </button>
            <button className="p-2 text-gray-400 hover:text-[#60a5fa] rounded-lg hover:bg-gray-50 transition-colors">
              <Eye className="w-4 h-4" />
            </button>
            <button className="p-2 text-gray-400 hover:text-[#60a5fa] rounded-lg hover:bg-gray-50 transition-colors">
              <Mail className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function RecentReportItem({ report }: any) {
  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-100 hover:border-[#60a5fa] hover:shadow-md transition-all group">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-gray-100 to-gray-200 flex items-center justify-center group-hover:from-[#60a5fa]/20 group-hover:to-[#60e1fa]/20 transition-all">
          <FileText className="w-6 h-6 text-gray-600 group-hover:text-[#60a5fa]" />
        </div>
        <div>
          <div className="text-sm font-semibold text-gray-900">{report.title}</div>
          <div className="text-xs text-gray-500 flex items-center space-x-2">
            <span>{report.type}</span>
            <span>•</span>
            <span>{report.date}</span>
            <span>•</span>
            <span>{report.size}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="text-xs text-gray-500">
          {report.downloads} downloads
        </div>
        <div className="flex items-center space-x-2">
          <button className="p-2 text-gray-400 hover:text-[#60a5fa] rounded-lg hover:bg-gray-50 transition-colors">
            <Eye className="w-4 h-4" />
          </button>
          <button className="p-2 text-gray-400 hover:text-[#60a5fa] rounded-lg hover:bg-gray-50 transition-colors">
            <Download className="w-4 h-4" />
          </button>
          <button className="p-2 text-gray-400 hover:text-[#60a5fa] rounded-lg hover:bg-gray-50 transition-colors">
            <Share className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
