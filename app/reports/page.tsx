'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useOrganization } from '@/lib/useOrganization';
import { API_URL } from '@/lib/api';
import { PageNavigation } from '@/components/PageNavigation';
import {
  FileText,
  Download,
  Eye,
  Mail,
  Share,
  Calendar,
  BarChart3,
  TrendingUp,
  Users,
  Target,
  AlertTriangle,
  Building2,
  Clock,
  Plus,
  Sparkles,
  CheckCircle,
  Crown
} from 'lucide-react';

export default function ReportsPage() {
  const router = useRouter();
  const { currentOrg } = useOrganization();
  const [partnerships, setPartnerships] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentOrg) {
      loadReportsData();
    }
  }, [currentOrg]);

  const loadReportsData = async () => {
    if (!currentOrg) return;
    
    try {
      const response = await axios.get(`${API_URL}/api/partnerships?org_id=${currentOrg.id}`);
      setPartnerships(response.data);
    } catch (error) {
      console.error('Failed to load reports data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!currentOrg) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <Building2 className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No Organization Selected</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header with Navigation */}
      <header className="bg-gradient-to-r from-[#1e293b] via-[#334155] to-[#475569] border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-6">
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-[#60a5fa] to-[#60e1fa] bg-clip-text text-transparent">
                  Reports
                </h1>
              </div>
              <PageNavigation />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-gray-300">{currentOrg.name} Partnership Reporting</p>
            
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors">
                <Calendar className="w-4 h-4" />
                <span>Schedule Report</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-[#60a5fa] to-[#60e1fa] text-white rounded-lg hover:shadow-lg transition-all">
                <Share className="w-4 h-4" />
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-8 py-8">
        {/* Portfolio Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">34</div>
                <div className="text-sm text-gray-600">Total Partnerships</div>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-green-400 to-green-600 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">24</div>
                <div className="text-sm text-gray-600">Healthy Partnerships</div>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-400 to-purple-600 flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">$90.6M</div>
                <div className="text-sm text-gray-600">Total Revenue</div>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-orange-400 to-orange-600 flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">78</div>
                <div className="text-sm text-gray-600">Avg Health Score</div>
              </div>
            </div>
          </div>
        </div>

        {/* Available Reports */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Reports</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
              <div className="flex items-center space-x-3 mb-4">
                <BarChart3 className="w-8 h-8 text-purple-600" />
                <h3 className="text-lg font-semibold text-gray-900">Executive Summary</h3>
              </div>
              <p className="text-sm text-gray-600 mb-4">Comprehensive overview of partnership portfolio performance</p>
              <div className="flex items-center space-x-2">
                <button className="flex items-center space-x-2 px-3 py-1 bg-blue-500 text-white rounded-lg text-sm">
                  <FileText className="w-3 h-3" />
                  <span>Generate</span>
                </button>
                <button className="flex items-center space-x-2 px-3 py-1 bg-gray-200 text-gray-700 rounded-lg text-sm">
                  <Mail className="w-3 h-3" />
                  <span>Email</span>
                </button>
              </div>
            </div>

            <div className="p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
              <div className="flex items-center space-x-3 mb-4">
                <TrendingUp className="w-8 h-8 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">Health Analysis</h3>
              </div>
              <p className="text-sm text-gray-600 mb-4">Deep dive into partnership health across all dimensions</p>
              <div className="flex items-center space-x-2">
                <button className="flex items-center space-x-2 px-3 py-1 bg-blue-500 text-white rounded-lg text-sm">
                  <FileText className="w-3 h-3" />
                  <span>Generate</span>
                </button>
                <button className="flex items-center space-x-2 px-3 py-1 bg-gray-200 text-gray-700 rounded-lg text-sm">
                  <Mail className="w-3 h-3" />
                  <span>Email</span>
                </button>
              </div>
            </div>

            <div className="p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
              <div className="flex items-center space-x-3 mb-4">
                <AlertTriangle className="w-8 h-8 text-orange-600" />
                <h3 className="text-lg font-semibold text-gray-900">Risk Assessment</h3>
              </div>
              <p className="text-sm text-gray-600 mb-4">Partnership risk analysis and mitigation recommendations</p>
              <div className="flex items-center space-x-2">
                <button className="flex items-center space-x-2 px-3 py-1 bg-blue-500 text-white rounded-lg text-sm">
                  <FileText className="w-3 h-3" />
                  <span>Generate</span>
                </button>
                <button className="flex items-center space-x-2 px-3 py-1 bg-gray-200 text-gray-700 rounded-lg text-sm">
                  <Mail className="w-3 h-3" />
                  <span>Email</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Reports */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Recent Reports</h2>
            <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-[#60a5fa] to-[#60e1fa] text-white rounded-lg hover:shadow-lg transition-all">
              <Plus className="w-4 h-4" />
              <span>Generate New</span>
            </button>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
              <div className="flex items-center space-x-4">
                <FileText className="w-8 h-8 text-[#60a5fa]" />
                <div>
                  <div className="font-medium text-gray-900">Q1 2026 Partnership Health Report</div>
                  <div className="text-sm text-gray-600">Executive Summary • 2.4 MB • Generated 2026-02-22</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-500">15 downloads</span>
                <button className="p-2 text-gray-400 hover:text-[#60a5fa] rounded-lg hover:bg-gray-100 transition-colors">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
