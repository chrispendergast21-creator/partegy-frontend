import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { type, data } = await request.json();
    
    // Generate different types of reports based on the request
    let reportContent = '';
    let filename = '';
    
    switch (type) {
      case 'executive-summary':
        reportContent = generateExecutiveSummaryContent(data);
        filename = 'executive-summary.html';
        break;
      case 'health-analysis':
        reportContent = generateHealthAnalysisContent(data);
        filename = 'health-analysis.html';
        break;
      case 'risk-assessment':
        reportContent = generateRiskAssessmentContent(data);
        filename = 'risk-assessment.html';
        break;
      default:
        reportContent = generateDefaultReportContent(data);
        filename = 'partnership-report.html';
    }
    
    // Return the HTML content for download
    return new NextResponse(reportContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/html',
        'Content-Disposition': `attachment; filename="${filename}"`
      }
    });
    
  } catch (error) {
    console.error('Report generation error:', error);
    return NextResponse.json({ error: 'Failed to generate report' }, { status: 500 });
  }
}

function generateExecutiveSummaryContent(data: any) {
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
        <div style="background: #fef2f2; border: 1px solid #fca5a5; border-radius: 8px; padding: 20px; margin: 20px 0;">
            <h3 style="color: #dc2626; margin-bottom: 15px;">🚨 Critical: TechFlow Systems Revenue Variance</h3>
            <p><strong>Issue:</strong> $3.4M shortfall vs. Q1 forecast (12% variance)</p>
            <p><strong>Impact:</strong> Represents 31.4% of partnership portfolio concentration</p>
            <p><strong>Recommendation:</strong> Immediate executive escalation and partnership review</p>
            <p><strong>Timeline:</strong> Action required within 3 business days</p>
        </div>
        
        <div style="background: #fffbeb; border: 1px solid #fbbf24; border-radius: 8px; padding: 20px; margin: 20px 0;">
            <h3 style="color: #92400e; margin-bottom: 15px;">⚡ High Priority: Executive Engagement Decline</h3>
            <p><strong>Issue:</strong> No C-level contact with DataSync Partners in 45 days</p>
            <p><strong>Impact:</strong> $18.2M relationship at risk of strategic drift</p>
            <p><strong>Recommendation:</strong> Schedule executive alignment meeting</p>
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
}

function generateHealthAnalysisContent(data: any) {
  return `
<!DOCTYPE html>
<html>
<head>
    <title>Partnership Health Analysis</title>
    <style>body { font-family: Arial, sans-serif; margin: 40px; }</style>
</head>
<body>
    <h1>Partnership Health Analysis</h1>
    <p>Detailed health dimension analysis would appear here...</p>
</body>
</html>
  `;
}

function generateRiskAssessmentContent(data: any) {
  return `
<!DOCTYPE html>
<html>
<head>
    <title>Partnership Risk Assessment</title>
    <style>body { font-family: Arial, sans-serif; margin: 40px; }</style>
</head>
<body>
    <h1>Partnership Risk Assessment</h1>
    <p>Comprehensive risk analysis would appear here...</p>
</body>
</html>
  `;
}

function generateDefaultReportContent(data: any) {
  return `
<!DOCTYPE html>
<html>
<head>
    <title>Partnership Report</title>
    <style>body { font-family: Arial, sans-serif; margin: 40px; }</style>
</head>
<body>
    <h1>Partnership Report</h1>
    <p>Report content would appear here...</p>
</body>
</html>
  `;
}
