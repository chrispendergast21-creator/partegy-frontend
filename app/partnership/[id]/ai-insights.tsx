'use client';

import { useState } from 'react';
import {
  Brain,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  Target,
  DollarSign,
  Users,
  Clock,
  Zap,
  BarChart3,
  PieChart,
  Activity,
  CheckCircle,
  XCircle,
  Info
} from 'lucide-react';

export function AIInsightsDetailed({ partnership }: any) {
  const [selectedModel, setSelectedModel] = useState('comprehensive');
  const [timeHorizon, setTimeHorizon] = useState('90d');

  // AI Model Components
  const aiModels = {
    comprehensive: {
      name: 'Comprehensive Partnership Intelligence',
      description: 'Multi-dimensional analysis combining health scoring, predictive modeling, and behavioral patterns',
      confidence: 94,
      lastTrained: '2026-02-15',
      dataPoints: 847562,
      algorithms: ['Random Forest', 'Neural Networks', 'Time Series Analysis', 'NLP Sentiment'],
      features: [
        'Partnership Health Prediction',
        'Revenue Forecasting',
        'Risk Assessment',
        'Stakeholder Engagement Analysis',
        'Market Opportunity Detection',
        'Operational Efficiency Scoring'
      ]
    },
    predictive: {
      name: 'Predictive Revenue Model',
      description: 'Advanced forecasting for partnership revenue and pipeline opportunities',
      confidence: 89,
      lastTrained: '2026-02-12',
      dataPoints: 234156,
      algorithms: ['LSTM Networks', 'ARIMA', 'Prophet', 'Gradient Boosting'],
      features: [
        'Revenue Forecasting',
        'Pipeline Probability',
        'Seasonal Trend Analysis',
        'Market Condition Impact'
      ]
    },
    behavioral: {
      name: 'Behavioral Analysis Engine',
      description: 'Stakeholder engagement patterns and communication analysis',
      confidence: 87,
      lastTrained: '2026-02-10',
      dataPoints: 156789,
      algorithms: ['NLP Transformers', 'Sentiment Analysis', 'Pattern Recognition'],
      features: [
        'Stakeholder Sentiment',
        'Communication Frequency Analysis',
        'Engagement Quality Scoring',
        'Relationship Strength Metrics'
      ]
    }
  };

  // Comprehensive AI Insights
  const insights = {
    opportunities: [
      {
        id: 'apac_expansion',
        title: 'APAC Market Expansion Opportunity',
        description: 'AI analysis indicates 87% success probability for expanding into APAC markets based on current partnership performance, market conditions, and competitive landscape.',
        confidence: 87,
        priority: 'high',
        potentialImpact: '$4.2M additional revenue over 18 months',
        timeframe: '3-6 months',
        actionItems: [
          'Schedule expansion strategy meeting with APAC team',
          'Conduct market readiness assessment',
          'Identify key APAC partners and distributors',
          'Develop localization strategy'
        ],
        riskFactors: [
          'Regulatory compliance requirements',
          'Currency fluctuation exposure',
          'Competition from local players'
        ],
        dataSource: 'Market analysis of 450+ similar partnerships',
        modelUsed: 'Market Expansion Predictor v2.1'
      },
      {
        id: 'upsell_potential',
        title: 'Premium Tier Upgrade Opportunity',
        description: 'Partnership shows strong indicators for upgrading to Premium tier based on usage patterns, engagement levels, and revenue performance.',
        confidence: 92,
        priority: 'high',
        potentialImpact: '35% revenue increase ($1.8M annually)',
        timeframe: '1-2 months',
        actionItems: [
          'Present premium tier benefits analysis',
          'Schedule strategic planning session',
          'Prepare custom pricing proposal',
          'Highlight advanced feature value'
        ],
        riskFactors: [
          'Budget approval process',
          'Internal stakeholder alignment',
          'Competitive pricing pressure'
        ],
        dataSource: 'Analysis of 200+ tier upgrade patterns',
        modelUsed: 'Upsell Probability Engine v1.8'
      }
    ],
    risks: [
      {
        id: 'operational_decline',
        title: 'Operational Performance Risk Alert',
        description: 'Recent 5-point decline in operational excellence score indicates potential delivery bottlenecks. Historical data suggests proactive intervention needed within 30 days.',
        confidence: 92,
        priority: 'medium',
        potentialImpact: '15-25% revenue at risk ($800K-$1.3M)',
        timeframe: 'Immediate',
        actionItems: [
          'Conduct operational process review',
          'Identify delivery bottlenecks',
          'Implement process optimization',
          'Schedule weekly check-ins'
        ],
        riskFactors: [
          'Resource allocation constraints',
          'Technical integration challenges',
          'Stakeholder availability'
        ],
        dataSource: 'Operational performance tracking across 300+ partnerships',
        modelUsed: 'Risk Prediction Algorithm v3.2'
      }
    ],
    optimizations: [
      {
        id: 'resource_allocation',
        title: 'Resource Allocation Optimization',
        description: 'AI recommends reallocating 15% more technical resources to this partnership for optimal ROI based on performance indicators and capacity analysis.',
        confidence: 78,
        priority: 'low',
        potentialImpact: '12% efficiency improvement',
        timeframe: '2-4 weeks',
        actionItems: [
          'Analyze current resource utilization',
          'Identify available capacity',
          'Propose resource reallocation plan',
          'Monitor performance impact'
        ],
        riskFactors: [
          'Impact on other partnerships',
          'Team capacity constraints',
          'Budget implications'
        ],
        dataSource: 'Resource optimization across 180+ partnerships',
        modelUsed: 'Resource Optimization Engine v2.3'
      }
    ],
    predictions: [
      {
        id: 'health_forecast',
        title: '90-Day Health Score Forecast',
        description: 'Predicted health trajectory based on current trends and intervention scenarios.',
        confidence: 89,
        currentScore: partnership.health_score,
        predictions: {
          noAction: { score: 78, trend: 'declining' },
          minimalAction: { score: 82, trend: 'stable' },
          proactiveAction: { score: 89, trend: 'improving' }
        },
        keyFactors: [
          'Operational excellence improvement',
          'Stakeholder engagement maintenance',
          'Revenue performance sustainability'
        ]
      },
      {
        id: 'revenue_forecast',
        title: 'Revenue Projection (Next 12 Months)',
        description: 'AI-powered revenue forecasting with confidence intervals.',
        confidence: 85,
        projections: [
          { month: 'Mar 2026', conservative: 890000, likely: 1200000, optimistic: 1450000 },
          { month: 'Jun 2026', conservative: 920000, likely: 1350000, optimistic: 1600000 },
          { month: 'Sep 2026', conservative: 980000, likely: 1400000, optimistic: 1750000 },
          { month: 'Dec 2026', conservative: 1100000, likely: 1500000, optimistic: 1900000 }
        ]
      }
    ]
  };

  // Model Performance Metrics
  const modelPerformance = {
    accuracy: {
      healthPrediction: 94.2,
      revenueForecast: 89.7,
      riskAssessment: 91.5,
      opportunityDetection: 87.3
    },
    dataQuality: {
      completeness: 96.8,
      accuracy: 94.1,
      timeliness: 98.2,
      relevance: 92.4
    },
    modelVersions: {
      current: 'v3.2.1',
      lastUpdate: '2026-02-15',
      nextUpdate: '2026-03-01',
      improvements: [
        'Enhanced NLP sentiment analysis',
        'Improved market trend integration',
        'Better stakeholder behavior modeling'
      ]
    }
  };

  return (
    <div className="space-y-8">
      {/* AI Model Overview */}
      <div className="bg-gradient-to-r from-[#60a5fa] to-[#60e1fa] rounded-xl p-6 text-white">
        <div className="flex items-center space-x-3 mb-4">
          <Brain className="w-8 h-8" />
          <div>
            <h2 className="text-2xl font-bold">Partnership Intelligence AI</h2>
            <p className="text-white/80">Advanced machine learning models analyzing 850K+ data points</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <div className="text-2xl font-bold">94%</div>
            <div className="text-sm text-white/80">Overall Model Confidence</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <div className="text-2xl font-bold">847K+</div>
            <div className="text-sm text-white/80">Training Data Points</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <div className="text-2xl font-bold">6</div>
            <div className="text-sm text-white/80">Active AI Models</div>
          </div>
        </div>
      </div>

      {/* Model Selection */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Model Details</h3>
        <div className="flex space-x-4 mb-6">
          {Object.entries(aiModels).map(([key, model]) => (
            <button
              key={key}
              onClick={() => setSelectedModel(key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedModel === key
                  ? 'bg-gradient-to-r from-[#60a5fa] to-[#60e1fa] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {model.name.split(' ')[0]} {model.name.split(' ')[1]}
            </button>
          ))}
        </div>

        {/* Model Details */}
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">{aiModels[selectedModel as keyof typeof aiModels].name}</h4>
              <p className="text-gray-600 mb-4">{aiModels[selectedModel as keyof typeof aiModels].description}</p>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Confidence Level</span>
                  <span className="text-sm font-semibold">{aiModels[selectedModel as keyof typeof aiModels].confidence}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Last Trained</span>
                  <span className="text-sm font-semibold">{aiModels[selectedModel as keyof typeof aiModels].lastTrained}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Training Data Points</span>
                  <span className="text-sm font-semibold">{aiModels[selectedModel as keyof typeof aiModels].dataPoints.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div>
              <h5 className="font-semibold text-gray-900 mb-2">Algorithms Used</h5>
              <div className="space-y-1 mb-4">
                {aiModels[selectedModel as keyof typeof aiModels].algorithms.map((algo, idx) => (
                  <span key={idx} className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mr-2">
                    {algo}
                  </span>
                ))}
              </div>
              
              <h5 className="font-semibold text-gray-900 mb-2">Features</h5>
              <div className="space-y-1">
                {aiModels[selectedModel as keyof typeof aiModels].features.map((feature, idx) => (
                  <div key={idx} className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Opportunities */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">🎯 Growth Opportunities</h3>
        {insights.opportunities.map((opportunity) => (
          <DetailedInsightCard key={opportunity.id} insight={opportunity} type="opportunity" />
        ))}
      </div>

      {/* Risks */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">⚠️ Risk Alerts</h3>
        {insights.risks.map((risk) => (
          <DetailedInsightCard key={risk.id} insight={risk} type="risk" />
        ))}
      </div>

      {/* Optimizations */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">⚡ Optimization Recommendations</h3>
        {insights.optimizations.map((optimization) => (
          <DetailedInsightCard key={optimization.id} insight={optimization} type="optimization" />
        ))}
      </div>

      {/* Predictions */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">🔮 AI Predictions</h3>
        {insights.predictions.map((prediction) => (
          <PredictionCard key={prediction.id} prediction={prediction} />
        ))}
      </div>

      {/* Model Performance */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">🎯 Model Performance Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Prediction Accuracy</h4>
            {Object.entries(modelPerformance.accuracy).map(([metric, value]) => (
              <div key={metric} className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600 capitalize">{metric.replace(/([A-Z])/g, ' $1')}</span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div
                      className="h-2 rounded-full bg-green-500"
                      style={{ width: `${value}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">{value}%</span>
                </div>
              </div>
            ))}
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Data Quality</h4>
            {Object.entries(modelPerformance.dataQuality).map(([metric, value]) => (
              <div key={metric} className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600 capitalize">{metric}</span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div
                      className="h-2 rounded-full bg-blue-500"
                      style={{ width: `${value}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">{value}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailedInsightCard({ insight, type }: any) {
  const [expanded, setExpanded] = useState(false);
  
  const getTypeConfig = (type: string) => {
    switch (type) {
      case 'opportunity':
        return { icon: Target, color: 'from-green-400 to-green-600', bgColor: 'bg-green-50', textColor: 'text-green-800' };
      case 'risk':
        return { icon: AlertCircle, color: 'from-red-400 to-red-600', bgColor: 'bg-red-50', textColor: 'text-red-800' };
      case 'optimization':
        return { icon: Zap, color: 'from-yellow-400 to-yellow-600', bgColor: 'bg-yellow-50', textColor: 'text-yellow-800' };
      default:
        return { icon: Info, color: 'from-blue-400 to-blue-600', bgColor: 'bg-blue-50', textColor: 'text-blue-800' };
    }
  };

  const config = getTypeConfig(type);
  const Icon = config.icon;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start space-x-4">
          <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${config.color} flex items-center justify-center`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h4 className="text-lg font-semibold text-gray-900 mb-2">{insight.title}</h4>
            <p className="text-gray-600 mb-3">{insight.description}</p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div className={`${config.bgColor} p-3 rounded-lg`}>
                <div className="text-sm text-gray-600">Confidence</div>
                <div className={`text-lg font-bold ${config.textColor}`}>{insight.confidence}%</div>
              </div>
              <div className={`${config.bgColor} p-3 rounded-lg`}>
                <div className="text-sm text-gray-600">Priority</div>
                <div className={`text-sm font-semibold ${config.textColor} uppercase`}>{insight.priority}</div>
              </div>
              <div className={`${config.bgColor} p-3 rounded-lg`}>
                <div className="text-sm text-gray-600">Timeframe</div>
                <div className="text-sm font-semibold text-gray-900">{insight.timeframe}</div>
              </div>
              <div className={`${config.bgColor} p-3 rounded-lg`}>
                <div className="text-sm text-gray-600">Impact</div>
                <div className="text-sm font-semibold text-gray-900">{insight.potentialImpact}</div>
              </div>
            </div>
          </div>
        </div>
        
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          {expanded ? <XCircle className="w-5 h-5" /> : <Info className="w-5 h-5" />}
        </button>
      </div>

      {expanded && (
        <div className="border-t border-gray-200 pt-4 space-y-4">
          <div>
            <h5 className="font-semibold text-gray-900 mb-2">Action Items</h5>
            <div className="space-y-1">
              {insight.actionItems.map((item: string, idx: number) => (
                <div key={idx} className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h5 className="font-semibold text-gray-900 mb-2">Risk Factors</h5>
            <div className="space-y-1">
              {insight.riskFactors.map((factor: string, idx: number) => (
                <div key={idx} className="flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 text-yellow-600" />
                  <span className="text-sm text-gray-700">{factor}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-gray-500">
            <div>
              <span className="font-medium">Data Source:</span> {insight.dataSource}
            </div>
            <div>
              <span className="font-medium">Model:</span> {insight.modelUsed}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function PredictionCard({ prediction }: any) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-start space-x-4 mb-4">
        <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-purple-400 to-purple-600 flex items-center justify-center">
          <BarChart3 className="w-6 h-6 text-white" />
        </div>
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-2">{prediction.title}</h4>
          <p className="text-gray-600 mb-3">{prediction.description}</p>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Model Confidence:</span>
            <span className="text-sm font-semibold text-gray-900">{prediction.confidence}%</span>
          </div>
        </div>
      </div>

      {prediction.predictions && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {Object.entries(prediction.predictions).map(([scenario, data]: [string, any]) => (
            <div key={scenario} className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600 mb-1 capitalize">{scenario.replace(/([A-Z])/g, ' $1')}</div>
              <div className="text-2xl font-bold text-gray-900">{data.score}</div>
              <div className={`text-xs ${
                data.trend === 'improving' ? 'text-green-600' : 
                data.trend === 'declining' ? 'text-red-600' : 'text-gray-600'
              }`}>
                {data.trend}
              </div>
            </div>
          ))}
        </div>
      )}

      {prediction.projections && (
        <div className="space-y-3">
          <h5 className="font-semibold text-gray-900">Revenue Projections</h5>
          {prediction.projections.map((proj: any, idx: number) => (
            <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="font-medium text-gray-900">{proj.month}</span>
              <div className="flex items-center space-x-4 text-sm">
                <div className="text-center">
                  <div className="text-gray-600">Conservative</div>
                  <div className="font-semibold">${(proj.conservative / 1000).toFixed(0)}K</div>
                </div>
                <div className="text-center">
                  <div className="text-gray-600">Likely</div>
                  <div className="font-semibold text-blue-600">${(proj.likely / 1000).toFixed(0)}K</div>
                </div>
                <div className="text-center">
                  <div className="text-gray-600">Optimistic</div>
                  <div className="font-semibold text-green-600">${(proj.optimistic / 1000).toFixed(0)}K</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
