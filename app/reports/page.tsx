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

  // Function to generate and view reports
  const generateAndViewReport = async (reportType: string, reportTitle: string) => {
    setGeneratingReport(reportType);
    
    try {
      // Generate the report content
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
      
      // Show success message
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

  // Report generation functions
  const generateExecutiveSummaryHTML = (data: any) => {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Executive Partnership Summary - Q1 2026</title>
    <style>
        body {
            font-family: system-ui, -apple-system, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 1200px;
            margin: 0 auto;
            padding: 40px 20px;
            background: #fff;
        }
        .header {
            text-align: center;
            margin-bottom: 40px;
            border-bottom: 3px solid #1e40af;
            padding-bottom: 20px;
        }
        .company-logo {
            font-size: 2rem;
            font-weight: bold;
            color: #1e40af;
            margin-bottom: 10px;
        }
        h1 {
            color: #1e40af;
            margin-bottom: 10px;
        }
        .subtitle {
            color: #666;
            font-size: 1.1rem;
        }
        .metrics-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin: 30px 0;
        }
        .metric-card {
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            padding: 20px;
            text-align: center;
        }
        .metric-value {
            font-size: 2.5rem;
            font-weight: bold;
            color: #1e40af;
            margin-bottom: 5px;
        }
        .metric-label {
            color: #666;
            font-size: 0.9rem;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        .metric-trend {
            color: #059669;
            font-size: 0.85rem;
            margin-top: 5px;
        }
        .section {
            margin: 40px 0;
        }
        .section-title {
            color: #1e40af;
            font-size: 1.4rem;
            margin-bottom: 20px;
            border-left: 4px solid #1e40af;
            padding-left: 15px;
        }
        .partner-table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
        }
        .partner-table th,
        .partner-table td {
            text-align: left;
            padding: 12px;
            border-bottom: 1px solid #e2e8f0;
        }
        .partner-table th {
            background: #f8fafc;
            font-weight: 600;
            color: #475569;
            text-transform: uppercase;
            font-size: 0.85rem;
            letter-spacing: 0.5px;
        }
        .health-at-risk {
            color: #dc2626;
            font-weight: 600;
        }
        .health-healthy {
            color: #059669;
            font-weight: 600;
        }
        .tier-strategic {
            background: #dbeafe;
            color: #1e40af;
            padding: 2px 8px;
            border-radius: 4px;
            font-size: 0.8rem;
            font-weight: 500;
        }
        .key-insights {
            background: #fefce8;
            border: 1px solid #facc15;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
        }
        .key-insights h3 {
            color: #92400e;
            margin-bottom: 15px;
        }
        .insight-item {
            margin-bottom: 10px;
            padding-left: 20px;
            position: relative;
        }
        .insight-item:before {
            content: "▶";
            position: absolute;
            left: 0;
            color: #92400e;
        }
        .critical-alert {
            background: #fef2f2;
            border: 1px solid #fca5a5;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
        }
        .critical-alert h3 {
            color: #dc2626;
            margin-bottom: 15px;
        }
        .high-priority {
            background: #fffbeb;
            border: 1px solid #fbbf24;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
        }
        .high-priority h3 {
            color: #92400e;
            margin-bottom: 15px;
        }
        .footer {
            margin-top: 60px;
            padding-top: 20px;
            border-top: 1px solid #e2e8f0;
            text-align: center;
            color: #666;
            font-size: 0.9rem;
        }
        .generated-date {
            color: #999;
            font-size: 0.8rem;
        }
        @media print {
            body { margin: 0; padding: 20px; }
            .header { page-break-after: avoid; }
        }
    </style>
</head>
<body>
    <div class="header">
        <div class="company-logo">PARTEGY</div>
        <h1>Executive Partnership Summary</h1>
        <div class="subtitle">Q1 2026 Strategic Partnership Capital Allocation Report</div>
        <div class="generated-date">Generated on ${new Date().toLocaleDateString()}</div>
    </div>

    <div class="metrics-grid">
        <div class="metric-card">
            <div class="metric-value">$${(data.totalRevenue / 1000000).toFixed(1)}M</div>
            <div class="metric-label">Partnership Revenue</div>
            <div class="metric-trend">↗ +18.5% YoY</div>
        </div>
        <div class="metric-card">
            <div class="metric-value">${data.keyMetrics.portfolioROI}%</div>
            <div class="metric-label">Portfolio ROI</div>
            <div class="metric-trend">↗ +89% vs portfolio avg</div>
        </div>
        <div class="metric-card">
            <div class="metric-value">${data.totalPartnerships}</div>
            <div class="metric-label">Active Partnerships</div>
            <div class="metric-trend">↗ +8 new this quarter</div>
        </div>
        <div class="metric-card">
            <div class="metric-value">${data.keyMetrics.strategicAlignment}%</div>
            <div class="metric-label">Strategic Alignment</div>
            <div class="metric-trend">↗ +5.2pts improvement</div>
        </div>
    </div>

    <div class="section">
        <h2 class="section-title">Top Strategic Partners</h2>
        <table class="partner-table">
            <thead>
                <tr>
                    <th>Partner Name</th>
                    <th>Annual Revenue</th>
                    <th>Health Status</th>
                    <th>Tier</th>
                    <th>Portfolio %</th>
                </tr>
            </thead>
            <tbody>
                ${data.topPartners.map((partner: any) => `
                    <tr>
                        <td><strong>${partner.name}</strong></td>
                        <td>$${(partner.revenue / 1000000).toFixed(1)}M</td>
                        <td class="${partner.health === 'At Risk' ? 'health-at-risk' : 'health-healthy'}">${partner.health}</td>
                        <td><span class="tier-strategic">${partner.tier}</span></td>
                        <td>${((partner.revenue / data.totalRevenue) * 100).toFixed(1)}%</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    </div>

    <div class="key-insights">
        <h3>🎯 Key Strategic Insights</h3>
        <div class="insight-item">Partnership revenue represents ${((data.totalRevenue / 386000000) * 100).toFixed(1)}% of total company revenue, demonstrating material enterprise impact</div>
        <div class="insight-item">Portfolio ROI of ${data.keyMetrics.portfolioROI}% significantly exceeds industry benchmarks and internal targets</div>
        <div class="insight-item">Concentration risk at ${data.keyMetrics.concentrationRisk}% requires executive attention and diversification strategy</div>
        <div class="insight-item">Strategic alignment score of ${data.keyMetrics.strategicAlignment}% shows strong correlation with AI/Cloud initiatives</div>
    </div>

    <div class="section">
        <h2 class="section-title">Executive Actions Required</h2>
        <div class="critical-alert">
            <h3>🚨 Critical: TechFlow Systems Revenue Variance</h3>
            <p><strong>Issue:</strong> $3.4M shortfall vs. Q1 forecast (12% variance)</p>
            <p><strong>Impact:</strong> Represents 31.4% of partnership portfolio concentration</p>
            <p><strong>Recommendation:</strong> Immediate executive escalation and partnership review</p>
            <p><strong>Timeline:</strong> Action required within 3 business days</p>
        </div>
        
        <div class="high-priority">
            <h3>⚡ High Priority: Executive Engagement Decline</h3>
            <p><strong>Issue:</strong> No C-level contact with DataSync Partners in 45 days</p>
            <p><strong>Impact:</strong> $18.2M relationship at risk of strategic drift</p>
            <p><strong>Recommendation:</strong> Schedule executive alignment meeting</p>
        </div>
    </div>

    <div class="section">
        <h2 class="section-title">Strategic Allocation Matrix</h2>
        <div class="metrics-grid">
            <div class="metric-card">
                <div class="metric-value">8</div>
                <div class="metric-label">Protect & Expand</div>
                <div style="font-size: 0.8rem; color: #666; margin-top: 5px;">High Revenue • High Alignment</div>
            </div>
            <div class="metric-card">
                <div class="metric-value">12</div>
                <div class="metric-label">Strategic Bet</div>
                <div style="font-size: 0.8rem; color: #666; margin-top: 5px;">Low Revenue • High Alignment</div>
            </div>
            <div class="metric-card">
                <div class="metric-value">6</div>
                <div class="metric-label">Financial Asset</div>
                <div style="font-size: 0.8rem; color: #666; margin-top: 5px;">High Revenue • Low Alignment</div>
            </div>
            <div class="metric-card">
                <div class="metric-value">8</div>
                <div class="metric-label">Exit / Deprioritize</div>
                <div style="font-size: 0.8rem; color: #666; margin-top: 5px;">Low Revenue • Low Alignment</div>
            </div>
        </div>
    </div>

    <div class="section">
        <h2 class="section-title">Capital Allocation Summary</h2>
        <div class="metrics-grid">
            <div class="metric-card">
                <div class="metric-value">$485K</div>
                <div class="metric-label">Avg Investment per Partnership</div>
            </div>
            <div class="metric-card">
                <div class="metric-value">23</div>
                <div class="metric-label">FTE Allocation</div>
            </div>
            <div class="metric-card">
                <div class="metric-value">$${data.keyMetrics.capitalEfficiency}M</div>
                <div class="metric-label">Capital Efficiency</div>
            </div>
            <div class="metric-card">
                <div class="metric-value">${data.keyMetrics.portfolioROI}%</div>
                <div class="metric-label">Portfolio ROI</div>
            </div>
        </div>
    </div>

    <div class="footer">
        <p><strong>PARTEGY Executive Partnership Cockpit</strong></p>
        <p>Strategic Partnership Capital Allocation Platform</p>
        <p style="margin-top: 10px; font-size: 0.8rem;">This report contains confidential and proprietary information. Distribution is restricted to authorized personnel only.</p>
    </div>
</body>
</html>
    `;
  };

  const generateHealthAnalysisHTML = (data: any) => {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Partnership Health Analysis - Q1 2026</title>
    <style>
        body { font-family: system-ui, sans-serif; margin: 40px; line-height: 1.6; color: #333; }
        .header { text-align: center; margin-bottom: 40px; border-bottom: 3px solid #1e40af; padding-bottom: 20px; }
        .company-logo { font-size: 2rem; font-weight: bold; color: #1e40af; margin-bottom: 10px; }
        h1 { color: #1e40af; }
        .health-dimension { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; margin: 20px 0; }
        .score { font-size: 2rem; font-weight: bold; color: #1e40af; }
    </style>
</head>
<body>
    <div class="header">
        <div class="company-logo">PARTEGY</div>
        <h1>Partnership Health Analysis</h1>
        <p>Comprehensive 6-Dimension Health Assessment</p>
    </div>

    <div class="health-dimension">
        <h3>Executive Engagement</h3>
        <div class="score">85/100</div>
        <p>Strong C-level relationships across portfolio. TechFlow requires attention.</p>
    </div>

    <div class="health-dimension">
        <h3>Value Delivered</h3>
        <div class="score">78/100</div>
        <p>Consistent value delivery with room for improvement in measurement.</p>
    </div>

    <div class="health-dimension">
        <h3>Revenue Performance</h3>
        <div class="score">92/100</div>
        <p>Exceeding revenue targets across most strategic partnerships.</p>
    </div>

    <div class="health-dimension">
        <h3>Operational Excellence</h3>
        <div class="score">71/100</div>
        <p>Process improvements needed in stakeholder communication.</p>
    </div>

    <div class="health-dimension">
        <h3>Innovation & Growth</h3>
        <div class="score">65/100</div>
        <p>Limited innovation pipeline. Opportunity for joint R&D initiatives.</p>
    </div>

    <div class="health-dimension">
        <h3>Risk & Compliance</h3>
        <div class="score">88/100</div>
        <p>Strong compliance posture with effective risk management.</p>
    </div>
</body>
</html>
    `;
  };

  const generateRiskAssessmentHTML = (data: any) => {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Partnership Risk Assessment - Q1 2026</title>
    <style>
        body { font-family: system-ui, sans-serif; margin: 40px; line-height: 1.6; color: #333; }
        .header { text-align: center; margin-bottom: 40px; border-bottom: 3px solid #dc2626; padding-bottom: 20px; }
        .company-logo { font-size: 2rem; font-weight: bold; color: #dc2626; margin-bottom: 10px; }
        .risk-high { background: #fef2f2; border: 1px solid #fca5a5; border-radius: 8px; padding: 20px; margin: 20px 0; }
        .risk-medium { background: #fffbeb; border: 1px solid #fbbf24; border-radius: 8px; padding: 20px; margin: 20px 0; }
        .risk-low { background: #f0f9ff; border: 1px solid #38bdf8; border-radius: 8px; padding: 20px; margin: 20px 0; }
    </style>
</head>
<body>
    <div class="header">
        <div class="company-logo">PARTEGY</div>
        <h1>Partnership Risk Assessment</h1>
        <p>Comprehensive Risk Analysis & Mitigation Strategies</p>
    </div>

    <div class="risk-high">
        <h3>🔴 High Risk: Revenue Concentration</h3>
        <p><strong>Risk:</strong> 31.4% of portfolio revenue concentrated in TechFlow Systems</p>
        <p><strong>Impact:</strong> Single point of failure could affect $28.5M in annual revenue</p>
        <p><strong>Mitigation:</strong> Diversification strategy and backup partner identification</p>
    </div>

    <div class="risk-medium">
        <h3>🟡 Medium Risk: Executive Engagement Gaps</h3>
        <p><strong>Risk:</strong> Declining C-level touchpoints across 3 strategic partnerships</p>
        <p><strong>Impact:</strong> Potential for strategic drift and relationship deterioration</p>
        <p><strong>Mitigation:</strong> Implement systematic executive engagement calendar</p>
    </div>

    <div class="risk-low">
        <h3>🟢 Low Risk: Compliance Posture</h3>
        <p><strong>Assessment:</strong> Strong compliance across all partnership agreements</p>
        <p><strong>Status:</strong> All partnerships meeting regulatory requirements</p>
        <p><strong>Recommendation:</strong> Maintain current compliance processes</p>
    </div>

    <h2>Risk Matrix Summary</h2>
    <p>Overall Portfolio Risk Score: <strong>72/100</strong></p>
    <p>Risk tolerance is within acceptable enterprise thresholds with specific attention required on concentration risk.</p>
</body>
</html>
    `;
  };

  const generateRevenuePerformanceHTML = (data: any) => {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Revenue Performance Analysis - Q1 2026</title>
    <style>
        body { font-family: system-ui, sans-serif; margin: 40px; line-height: 1.6; color: #333; }
        .header { text-align: center; margin-bottom: 40px; border-bottom: 3px solid #059669; padding-bottom: 20px; }
        .company-logo { font-size: 2rem; font-weight: bold; color: #059669; margin-bottom: 10px; }
        .revenue-card { background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 20px; margin: 20px 0; text-align: center; }
        .revenue-value { font-size: 2.5rem; font-weight: bold; color: #059669; }
    </style>
</head>
<body>
    <div class="header">
        <div class="company-logo">PARTEGY</div>
        <h1>Revenue Performance Analysis</h1>
        <p>YTD Revenue Trends & Partnership ROI Analysis</p>
    </div>

    <div class="revenue-card">
        <div class="revenue-value">$90.6M</div>
        <p>Total Partnership Revenue YTD</p>
        <p style="color: #059669;">↗ +18.5% Year-over-Year Growth</p>
    </div>

    <div class="revenue-card">
        <div class="revenue-value">347%</div>
        <p>Portfolio ROI</p>
        <p style="color: #059669;">↗ +89% vs Portfolio Average</p>
    </div>

    <div class="revenue-card">
        <div class="revenue-value">$289M</div>
        <p>Influenced Pipeline</p>
        <p style="color: #059669;">↗ 3.2x Revenue Multiple</p>
    </div>

    <h2>Top Revenue Contributors</h2>
    <ul>
        <li>TechFlow Systems: $28.5M (31.4% of portfolio)</li>
        <li>DataSync Partners: $18.2M (20.1% of portfolio)</li>
        <li>CloudTech Solutions: $12.1M (13.4% of portfolio)</li>
    </ul>

    <h2>Performance vs Forecast</h2>
    <p>Portfolio is tracking 12% below H2 target due to TechFlow variance. Overall performance remains strong with significant ROI generation.</p>
</body>
</html>
    `;
  };

  const generateDefaultReportHTML = (data: any, title: string) => {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>${title}</title>
    <style>
        body { font-family: system-ui, sans-serif; margin: 40px; line-height: 1.6; color: #333; }
        .header { text-align: center; margin-bottom: 40px; border-bottom: 3px solid #1e40af; padding-bottom: 20px; }
        .company-logo { font-size: 2rem; font-weight: bold; color: #1e40af; margin-bottom: 10px; }
    </style>
</head>
<body>
    <div class="header">
        <div class="company-logo">PARTEGY</div>
        <h1>${title}</h1>
        <p>Generated on ${new Date().toLocaleDateString()}</p>
    </div>
    <p>This ${title.toLowerCase()} contains detailed analysis of your partnership portfolio.</p>
    <p>Report content and insights would appear here based on your current partnership data.</p>
</body>
</html>
    `;
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

  const handleEmailReport = (reportTitle: string) => {
    alert(`Report sent to stakeholders: ${reportTitle}`);
  };

  const handleShareReport = (reportTitle: string) => {
    navigator.clipboard.writeText(`https://partegy.com/reports/shared/${reportTitle.toLowerCase().replace(/\s+/g, '-')}`);
    alert(`Share link copied: ${reportTitle}`);
  };

  // Rest of component remains the same...
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
        <div className="space-y-8">
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
                      onGenerate={() => generateAndViewReport(report.type, report.title)}
                      onEmail={() => handleEmailReport(report.title)}
                      onShare={() => handleShareReport(report.title)}
                      isGenerating={generatingReport === report.type}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

// Updated ReportCard component
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
          <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
            <span>Last generated: {report.lastGenerated}</span>
            <span>{report.downloadCount} downloads</span>
          </div>
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
            <button 
              onClick={onShare}
              className="flex items-center space-x-2 px-3 py-1 bg-gray-200 text-gray-700 rounded-lg text-sm hover:bg-gray-300 transition-colors"
            >
              <Share className="w-3 h-3" />
              <span>Share</span>
            </button>
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
