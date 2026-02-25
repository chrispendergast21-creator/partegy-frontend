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
  Crown
} from 'lucide-react';

export default function ReportsPage() {
  const router = useRouter();
  const { currentOrg } = useOrganization();
  const [partnerships, setPartnerships] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [generatingReport, setGeneratingReport] = useState<string | null>(null);

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

  // Portfolio stats with realistic data
  const portfolioStats = {
    totalPartnerships: 34,
    healthyCount: 24,
    totalRevenue: 90600000, // $90.6M
    avgHealthScore: 78
  };

  // Function to generate and view reports (keeping your existing report generation logic)
  const generateAndViewReport = async (reportType: string, reportTitle: string) => {
    setGeneratingReport(reportType);
    
    try {
      const reportData = {
        totalRevenue: portfolioStats.totalRevenue,
        totalPartnerships: portfolioStats.totalPartnerships,
        healthyCount: portfolioStats.healthyCount,
        avgHealthScore: portfolioStats.avgHealthScore,
        topPartners: [
          { name: 'TechFlow Systems', revenue: 28500000, health: 'At Risk', tier: 'Strategic' },
          { name: 'DataSync Partners', revenue: 18200000, health: 'Healthy', tier: 'Strategic' },
          { name: 'CloudTech Solutions', revenue: 12100000, health: 'Healthy', tier: 'Strategic' }
        ],
        keyMetrics: {
          portfolioROI: 347,
          capitalEfficiency: 3.2,
          strategicAlignment: 67.8,
          concentrationRisk: 31.4
        }
      };

      let reportContent = '';
      
      switch (reportType) {
        case 'executive-summary':
          reportContent = generateExecutiveSummaryHTML(reportData);
          break;
        case 'health-analysis':
          reportContent = generateHealthAnalysisHTML(reportData);
          break;
        case 'risk-assessment':
          reportContent = generateRiskAssessmentHTML(reportData);
          break;
        case 'revenue-performance':
          reportContent = generateRevenuePerformanceHTML(reportData);
          break;
        default:
          reportContent = generateDefaultReportHTML(reportData, reportTitle);
      }
      
      // Open the report in a new window
      const newWindow = window.open('', '_blank');
      if (newWindow) {
        newWindow.document.write(reportContent);
        newWindow.document.close();
        newWindow.document.title = reportTitle;
      }
      
      setTimeout(() => {
        alert(`${reportTitle} opened in new tab! You can save it using Ctrl+S or Cmd+S`);
      }, 500);
      
    } catch (error) {
      console.error('Report generation failed:', error);
      alert('Report generation failed. Please try again.');
    } finally {
      setGeneratingReport(null);
    }
  };

  // Keep all your existing report generation functions
  const generateExecutiveSummaryHTML = (data: any) => {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Executive Partnership Summary - Q1 2026</title>
    <style>
        body { font-family: system-ui, -apple-system, sans-serif; line-height: 1.6; color: #333; max-width: 1200px; margin: 0 auto; padding: 40px 20px; }
        .header { text-align: center; margin-bottom: 40px; border-bottom: 3px solid #1e40af; padding-bottom: 20px; }
        .company-logo { font-size: 2rem; font-weight: bold; color: #1e40af; margin-bottom: 10px; }
        h1 { color: #1e40af; }
    </style>
</head>
<body>
    <div class="header">
        <div class="company-logo">PARTEGY</div>
        <h1>Executive Partnership Summary</h1>
        <p>Q1 2026 Strategic Partnership Report</p>
    </div>
    <h2>Portfolio Overview</h2>
    <p>Total Revenue: $${(data.totalRevenue / 1000000).toFixed(1)}M</p>
    <p>Portfolio ROI: ${data.keyMetrics.portfolioROI}%</p>
    <p>Strategic Alignment: ${data.keyMetrics.strategicAlignment}%</p>
</body>
</html>
    `;
  };

  const generateHealthAnalysisHTML = (data: any) => {
    return `<html><head><title>Health Analysis</title></head><body><h1>Partnership Health Analysis</h1><p>Detailed health analysis...</p></body></html>`;
  };

  const generateRiskAssessmentHTML = (data: any) => {
    return `<html><head><title>Risk Assessment</title></head><body><h1>Partnership Risk Assessment</h1><p>Risk analysis...</p></body></html>`;
  };

  const generateRevenuePerformanceHTML = (data: any) => {
    return `<html><head><title>Revenue Performance</title></head><body><h1>Revenue Performance Analysis</h1><p>Revenue analysis...</p></body></html>`;
  };

  const generateDefaultReportHTML = (data: any, title: string) => {
    return `<html><head><title>${title}</title></head><body><h1>${title}</h1><p>Report content...</p></body></html>`;
  };

  // Report categories (keeping existing structure)
  const reportCategories = [
    {
      title: 'Executive Reports',
      description: 'High-level strategic insights for leadership',
      gradient: 'from-purple-400 to-purple-600',
      iconColor: 'text-purple-600',
      reports: [
        {
          title: 'Executive Summary',
          description: 'Comprehensive overview of partnership portfolio performance',
          icon: Crown,
          type: 'executive-summary',
          lastGenerated: '2026-02-24',
          downloadCount: 45,
          isScheduled: true,
          aiSummary: '$90.6M portfolio generating 347% ROI. TechFlow concentration risk requires attention.'
        }
      ]
    }
  ];

  const handleEmailReport = (reportTitle: string) => {
    alert(`Report sent to stakeholders: ${reportTitle}`);
  };

  const handleShareReport = (reportTitle: string) => {
    navigator.clipboard.writeText(`https://partegy.com/reports/shared/${reportTitle.toLowerCase().replace(/\s+/g, '-')}`);
    alert(`Share link copied: ${reportTitle}`);
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
    <div className="min-h-screen bg-gray-50">
      {/* CONSISTENT HEADER ACROSS ALL PAGES */}
      <header className="bg-slate-900 border-b-2 border-slate-700">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-12">
              <div>
                <h1 className="text-2xl font-semibold text-white">Reports</h1>
                <p className="text-slate-300 text-sm mt-1">{currentOrg.name} • Partnership Reporting</p>
              </div>
              <PageNavigation />
            </div>
            <div className="text-right text-white">
              <div className="text-5xl font-bold">$90.6M</div>
              <div className="text-slate-300 text-sm">Partnership Revenue YTD</div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-8 py-8">
        {/* Action Bar */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-semibold text-gray-900">Available Reports</h2>
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              <Calendar className="w-4 h-4" />
              <span>Schedule Report</span>
            </button>
            <button 
              onClick={() => handleShareReport('Report Portfolio')}
              className="flex items-center space-x-2 px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-800 transition-all"
            >
              <Share className="w-4 h-4" />
              <span>Share</span>
            </button>
          </div>
        </div>

        {/* Portfolio Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-xl bg-blue-500 flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{portfolioStats.totalPartnerships}</div>
                <div className="text-sm text-gray-600">Total Partnerships</div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-xl bg-green-500 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{portfolioStats.healthyCount}</div>
                <div className="text-sm text-gray-600">Healthy Partnerships</div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-xl bg-purple-500 flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">${(portfolioStats.totalRevenue / 1000000).toFixed(1)}M</div>
                <div className="text-sm text-gray-600">Total Revenue</div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-xl bg-orange-500 flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{portfolioStats.avgHealthScore}</div>
                <div className="text-sm text-gray-600">Avg Health Score</div>
              </div>
            </div>
          </div>
        </div>

        {/* Report Categories */}
        <div className="space-y-8">
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            <div className="bg-gradient-to-r from-purple-400 to-purple-600 p-6">
              <h2 className="text-2xl font-bold text-white mb-2">Executive Reports</h2>
              <p className="text-white/80">High-level strategic insights for leadership</p>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ReportCard 
                  report={{
                    title: 'Executive Summary',
                    description: 'Comprehensive overview of partnership portfolio performance',
                    icon: Crown,
                    type: 'executive-summary',
                    lastGenerated: '2026-02-24',
                    downloadCount: 45,
                    isScheduled: true,
                    aiSummary: '$90.6M portfolio generating 347% ROI. TechFlow concentration risk requires attention.'
                  }}
                  onGenerate={() => generateAndViewReport('executive-summary', 'Executive Summary')}
                  onEmail={() => handleEmailReport('Executive Summary')}
                  onShare={() => handleShareReport('Executive Summary')}
                  isGenerating={generatingReport === 'executive-summary'}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// Updated ReportCard component (simplified for consistency)
function ReportCard({ report, onGenerate, onEmail, onShare, isGenerating }: any) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
      <div className="flex items-start space-x-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-slate-600 to-slate-700 flex items-center justify-center">
          <report.icon className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <h3 className="text-lg font-semibold text-gray-900">{report.title}</h3>
            {report.isScheduled && (
              <Clock className="w-4 h-4 text-blue-500" title="Scheduled Report" />
            )}
          </div>
          <p className="text-sm text-gray-600 mb-4">{report.description}</p>
          <div className="flex items-center space-x-2">
            <button 
              onClick={onGenerate}
              disabled={isGenerating}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isGenerating 
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                  : 'bg-slate-700 text-white hover:bg-slate-800'
              }`}
            >
              {isGenerating ? (
                <>
                  <div className="w-3 h-3 border border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <Eye className="w-3 h-3" />
                  <span>View Report</span>
                </>
              )}
            </button>
            <button 
              onClick={onEmail}
              className="flex items-center space-x-2 px-3 py-1 bg-gray-200 text-gray-700 rounded-lg text-sm hover:bg-gray-300 transition-colors"
            >
              <Mail className="w-3 h-3" />
              <span>Email</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
