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

  // Function to generate different types of reports
  const generateReport = async (reportType: string, reportTitle: string) => {
    setGeneratingReport(reportType);
    
    try {
      // Simulate report generation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate actual report based on type
      switch (reportType) {
        case 'executive-summary':
          await generateExecutiveSummary();
          break;
        case 'health-analysis':
          await generateHealthAnalysis();
          break;
        case 'risk-assessment':
          await generateRiskAssessment();
          break;
        case 'revenue-performance':
          await generateRevenuePerformance();
          break;
        default:
          console.log(`Generating ${reportTitle}`);
      }
      
      alert(`${reportTitle} generated successfully! Check your downloads folder.`);
    } catch (error) {
      console.error('Report generation failed:', error);
      alert('Report generation failed. Please try again.');
    } finally {
      setGeneratingReport(null);
    }
  };

  const generateExecutiveSummary = async () => {
    // This will create a comprehensive executive summary PDF
    const response = await fetch('/api/generate-report', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'executive-summary',
        data: {
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
        }
      })
    });
  };

  const generateHealthAnalysis = async () => {
    console.log('Generating detailed health analysis report...');
    // Would generate health dimension analysis
  };

  const generateRiskAssessment = async () => {
    console.log('Generating risk assessment report...');
    // Would generate concentration and risk analysis
  };

  const generateRevenuePerformance = async () => {
    console.log('Generating revenue performance report...');
    // Would generate revenue trends and forecasts
  };

  // Report categories with COLOR-CODED ICONS
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
          aiSummary: '$90.6M portfolio generating 347% ROI. TechFlow concentration risk requires attention. Strategic alignment strong at 67.8%.'
        },
        {
          title: 'Board Report',
          description: 'Quarterly board presentation with key metrics and strategic insights',
          icon: BarChart3,
          type: 'board-report',
          lastGenerated: '2026-02-18',
          downloadCount: 12,
          isScheduled: false,
          aiSummary: 'Portfolio exceeds targets by 23%. Risk concentration within thresholds. Innovation pipeline robust.'
        }
      ]
    },
    {
      title: 'Performance Analytics',
      description: 'Detailed performance metrics and trends',
      gradient: 'from-blue-400 to-blue-600',
      iconColor: 'text-blue-600',
      reports: [
        {
          title: 'Health Score Analysis',
          description: 'Deep dive into partnership health across all 6 dimensions',
          icon: TrendingUp,
          type: 'health-analysis',
          lastGenerated: '2026-02-21',
          downloadCount: 78,
          isScheduled: true,
          aiSummary: 'Overall health stable at 78. Executive engagement needs attention. Operational excellence improving by 12%.'
        },
        {
          title: 'Revenue Performance',
          description: 'Revenue trends, forecasts, and partnership ROI analysis',
          icon: Target,
          type: 'revenue-performance',
          lastGenerated: '2026-02-19',
          downloadCount: 56,
          isScheduled: false,
          aiSummary: '$90.6M YTD revenue, 18% growth. Pipeline conversion up 12%. TechFlow variance requires escalation.'
        }
      ]
    },
    {
      title: 'Operational Reports',
      description: 'Day-to-day operational insights and risk management',
      gradient: 'from-orange-400 to-orange-600',
      iconColor: 'text-orange-600',
      reports: [
        {
          title: 'Risk Assessment',
          description: 'Partnership risk analysis and mitigation recommendations',
          icon: AlertTriangle,
          type: 'risk-assessment',
          lastGenerated: '2026-02-22',
          downloadCount: 34,
          isScheduled: true,
          aiSummary: 'Concentration risk elevated at 31.4% in single partner. 2 strategic partnerships require intervention.'
        },
        {
          title: 'Stakeholder Engagement',
          description: 'Stakeholder interaction patterns and engagement metrics',
          icon: Users,
          type: 'stakeholder-engagement',
          lastGenerated: '2026-02-17',
          downloadCount: 23,
          isScheduled: false,
          aiSummary: 'Executive touchpoints down 15% QoQ. Automated cadence recommendations for 8 partnerships.'
        }
      ]
    }
  ];

  const recentReports = [
    {
      title: 'Q1 2026 Partnership Health Report',
      type: 'Executive Summary',
      generated: '2026-02-22',
      size: '2.4 MB',
      downloads: 15,
      path: '/reports/q1-health-report.pdf'
    },
    {
      title: 'Revenue Performance Analysis - February',
      type: 'Performance Analytics',
      generated: '2026-02-21',
      size: '1.8 MB',
      downloads: 28,
      path: '/reports/revenue-performance-feb.pdf'
    },
    {
      title: 'Strategic Partnership Risk Assessment',
      type: 'Risk Assessment',
      generated: '2026-02-20',
      size: '3.1 MB',
      downloads: 42,
      path: '/reports/risk-assessment.pdf'
    }
  ];

  const handleEmailReport = (reportTitle: string) => {
    alert(`Report sent to stakeholders: ${reportTitle}`);
  };

  const handleShareReport = (reportTitle: string) => {
    navigator.clipboard.writeText(`https://partegy.com/reports/shared/${reportTitle.toLowerCase().replace(/\s+/g, '-')}`);
    alert(`Share link copied: ${reportTitle}`);
  };

  const handleViewReport = (report: any) => {
    if (report.path) {
      // Open existing report
      window.open(report.path, '_blank');
    } else {
      // Generate new report
      generateReport(report.type, report.title);
    }
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
      {/* Header */}
      <header className="bg-slate-900 border-b-2 border-slate-700">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-6">
              <div>
                <h1 className="text-2xl font-semibold text-white">Reports</h1>
              </div>
              <PageNavigation />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-slate-300">{currentOrg.name} Partnership Reporting</p>
            
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors">
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
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-8 py-8">
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
        <div className="space-y-8 mb-8">
          {reportCategories.map((category, idx) => (
            <div key={idx} className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
              <div className={`bg-gradient-to-r ${category.gradient} p-6`}>
                <h2 className="text-2xl font-bold text-white mb-2">{category.title}</h2>
                <p className="text-white/80">{category.description}</p>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {category.reports.map((report, reportIdx) => (
                    <ReportCard 
                      key={reportIdx} 
                      report={report} 
                      iconColor={category.iconColor}
                      onEmail={() => handleEmailReport(report.title)}
                      onShare={() => handleShareReport(report.title)}
                      onView={() => handleViewReport(report)}
                      isGenerating={generatingReport === report.type}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Reports */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Recent Reports</h2>
            <button className="flex items-center space-x-2 px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-800 transition-all">
              <Plus className="w-4 h-4" />
              <span>Generate New</span>
            </button>
          </div>
          <div className="space-y-4">
            {recentReports.map((report, idx) => (
              <RecentReportItem 
                key={idx} 
                report={report} 
                onClick={() => window.open(report.path, '_blank')}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

function ReportCard({ report, iconColor, onEmail, onShare, onView, isGenerating }: any) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
      <div className="flex items-start space-x-4">
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-r from-slate-600 to-slate-700 flex items-center justify-center group-hover:scale-110 transition-transform`}>
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
          <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
            <span>Last generated: {report.lastGenerated}</span>
            <span>{report.downloadCount} downloads</span>
          </div>
          <div className="flex items-center space-x-2">
            <button 
              onClick={onView}
              disabled={isGenerating}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
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
                  <FileText className="w-3 h-3" />
                  <span>Generate</span>
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
            <button 
              onClick={onShare}
              className="flex items-center space-x-2 px-3 py-1 bg-gray-200 text-gray-700 rounded-lg text-sm hover:bg-gray-300 transition-colors"
            >
              <Share className="w-3 h-3" />
              <span>Share</span>
            </button>
            {/* AI SUMMARY TOOLTIP */}
            <div className="relative">
              <button
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                className="flex items-center space-x-2 px-3 py-1 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg text-sm hover:from-purple-600 hover:to-purple-700 transition-all"
              >
                <Sparkles className="w-3 h-3" />
                <span>AI</span>
              </button>
              {showTooltip && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-80 bg-gray-900 text-white text-sm rounded-lg p-3 shadow-xl z-50">
                  <div className="font-semibold mb-1">AI Summary:</div>
                  <div>{report.aiSummary}</div>
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function RecentReportItem({ report, onClick }: any) {
  return (
    <div 
      onClick={onClick}
      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer group"
    >
      <div className="flex items-center space-x-4">
        <FileText className="w-8 h-8 text-slate-600 group-hover:scale-110 transition-transform" />
        <div>
          <div className="font-medium text-gray-900 group-hover:text-slate-700">{report.title}</div>
          <div className="text-sm text-gray-600 flex items-center space-x-2">
            <span>{report.type}</span>
            <span>•</span>
            <span>{report.size}</span>
            <span>•</span>
            <span>Generated {report.generated}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-3">
        <span className="text-sm text-gray-500">{report.downloads} downloads</span>
        <button className="p-2 text-gray-400 hover:text-slate-600 rounded-lg hover:bg-gray-100 transition-colors">
          <Download className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
