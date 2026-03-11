'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Building2,
  BarChart3,
  Users,
  Shield,
  Zap,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Star,
  Globe,
  Target,
  Play,
  Calendar,
  FileText,
  AlertTriangle,
  Eye,
  Brain,
  Gauge,
  Activity,
  Database,
  Link,
  GitBranch,
  Monitor,
  Layers,
  LineChart
} from 'lucide-react';

export default function LandingPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [currentMetric, setCurrentMetric] = useState(0);

  // Animated metrics for the hero dashboard
  const metrics = [
    { value: '$90.6M', label: 'Portfolio Value YTD' },
    { value: '87%', label: 'Strategic Alignment' },
    { value: '$4.2M', label: 'At-Risk Revenue Found' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMetric((prev) => (prev + 1) % metrics.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleWatchDemo = () => {
    router.push('/dashboard');
  };

  const handleScheduleConversation = () => {
    alert('Redirecting to calendar booking...');
  };

  const handleDemoRequest = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Thanks! We'll contact ${email} to schedule your executive demo.`);
    setEmail('');
  };

  // System integrations for connectivity map
  const systemIntegrations = [
    { name: 'Salesforce', icon: Database },
    { name: 'Workday', icon: Users },
    { name: 'Oracle', icon: Building2 },
    { name: 'SAP', icon: Layers },
    { name: 'HubSpot', icon: Activity }
  ];

  // Governance features with micro-dashboards
  const governanceFeatures = [
    {
      title: 'State vs Transaction Intelligence',
      subtitle: 'Partnership Health Beyond Deal Flow',
      description: 'Distinguish between transaction velocity (CRM) and partnership state (strategic health, alignment, execution)',
      metrics: { transactionVel: '↗ 23%', partnershipHealth: '67%', strategicAlignment: '87%' },
      status: 'healthy'
    },
    {
      title: 'Proactive Intervention Engine',
      subtitle: 'Act Before Revenue Impact',
      description: 'AI-powered early warning system that identifies strategic drift before it impacts revenue performance',
      metrics: { riskSignals: '3 Active', interventionTime: '12 days', successRate: '89%' },
      status: 'warning'
    },
    {
      title: 'Portfolio Performance Command',
      subtitle: 'Executive-Grade Partnership Intelligence',
      description: 'Real-time governance dashboard with portfolio-level insights, capital allocation optimization, and resource management',
      metrics: { portfolioROI: '347%', capitalEfficiency: '$3.2M', activePartnerships: '34' },
      status: 'excellent'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900" style={{backgroundColor: '#0B0E14'}}>
      {/* Executive Header */}
      <header className="border-b border-slate-700/50 backdrop-blur-sm bg-slate-900/80">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex space-x-1">
                <div className="w-3 h-3 bg-emerald-400 rounded-sm"></div>
                <div className="w-3 h-3 bg-blue-400 rounded-sm"></div>
              </div>
              <div className="text-xl font-bold text-white tracking-tight">Partegy</div>
            </div>
            <div className="flex items-center space-x-8">
              <nav className="hidden md:flex items-center space-x-8">
                <a href="#governance" className="text-slate-300 hover:text-white transition-colors text-sm font-medium">Governance</a>
                <a href="#intelligence" className="text-slate-300 hover:text-white transition-colors text-sm font-medium">Intelligence</a>
                <a href="#enterprise" className="text-slate-300 hover:text-white transition-colors text-sm font-medium">Enterprise</a>
              </nav>
              <button
                onClick={handleWatchDemo}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium text-sm transition-all flex items-center space-x-2 border border-blue-500"
              >
                <Monitor className="w-4 h-4" />
                <span>Executive Demo</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section - The Executive Cockpit */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center space-x-2 bg-slate-800/50 border border-slate-700 rounded-full px-4 py-2 mb-8">
                <Shield className="w-4 h-4 text-emerald-400" />
                <span className="text-slate-300 text-sm font-medium">Enterprise Partnership Governance</span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight tracking-tight">
                The Strategic Governance Layer for Enterprise Partnerships
              </h1>
              
              <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                Stop managing $100M+ ecosystems in spreadsheets. Partegy sits above your CRM and ERP to turn 
                operational data into executive-grade partnership intelligence.
              </p>
              
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <button
                  onClick={handleWatchDemo}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-lg font-semibold text-lg flex items-center justify-center transition-all shadow-lg"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Watch Executive Demo
                </button>
                <button
                  onClick={handleScheduleConversation}
                  className="border border-slate-600 hover:border-slate-500 text-slate-300 hover:text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all"
                >
                  Schedule Strategy Session
                </button>
              </div>
            </div>

            {/* Executive Dashboard Card */}
            <div className="relative">
              <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-2xl p-8 shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                    <span className="text-slate-300 text-sm font-medium uppercase tracking-wider">PORTFOLIO COMMAND CENTER</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Activity className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400 text-sm font-medium">LIVE</span>
                  </div>
                </div>
                
                {/* Large Metric Display */}
                <div className="mb-6">
                  <div className="text-4xl lg:text-5xl font-bold text-white mb-2 transition-all duration-500">
                    {metrics[currentMetric].value}
                  </div>
                  <div className="text-slate-400 text-sm">
                    {metrics[currentMetric].label}
                  </div>
                </div>

                {/* Risk Signals */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-slate-900/50 border border-slate-600 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 text-xs uppercase tracking-wider">RISK SIGNALS</span>
                      <AlertTriangle className="w-4 h-4 text-red-400" />
                    </div>
                    <div className="text-2xl font-bold text-red-400 mt-2">3</div>
                  </div>
                  <div className="bg-slate-900/50 border border-slate-600 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 text-xs uppercase tracking-wider">STRATEGIC FIT</span>
                      <Gauge className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div className="text-2xl font-bold text-emerald-400 mt-2">87%</div>
                  </div>
                </div>

                {/* Portfolio Health Bar */}
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Portfolio Health Index</span>
                    <span className="text-emerald-400 font-medium">Strong</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-emerald-400 to-blue-400 h-2 rounded-full" style={{width: '78%'}}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 - The Problem */}
      <section className="py-20 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-8 tracking-tight">
              Partnerships generate billions in revenue — but most companies can't govern them.
            </h2>
            <div className="max-w-4xl mx-auto text-xl text-slate-300 leading-relaxed space-y-6">
              <p>Partner ecosystems have become a major growth engine for enterprise companies.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-12">
                <div className="text-center">
                  <div className="text-4xl font-bold text-emerald-400 mb-2">~28%</div>
                  <div className="text-slate-400">of company revenue from mature partnership programs</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-emerald-400 mb-2">$80T</div>
                  <div className="text-slate-400">projected ecosystem economic activity by 2030</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-red-400 mb-2">36%</div>
                  <div className="text-slate-400">of organizations consistently measure ecosystem performance</div>
                </div>
              </div>
              
              <p>Despite this scale, most companies still manage partnerships across disconnected systems.</p>
            </div>
          </div>
          
          {/* Visual Problem Illustration */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-slate-800/30 backdrop-blur border border-slate-700 rounded-2xl p-8 text-center">
              <Database className="w-12 h-12 mx-auto mb-4 text-slate-400" />
              <h3 className="text-xl font-bold text-white mb-4">CRM</h3>
              <p className="text-slate-300">Tracks deals and pipeline.</p>
            </div>
            <div className="bg-slate-800/30 backdrop-blur border border-slate-700 rounded-2xl p-8 text-center">
              <Users className="w-12 h-12 mx-auto mb-4 text-slate-400" />
              <h3 className="text-xl font-bold text-white mb-4">PRM</h3>
              <p className="text-slate-300">Tracks partner referrals and sourced revenue.</p>
            </div>
            <div className="bg-slate-800/30 backdrop-blur border border-slate-700 rounded-2xl p-8 text-center">
              <FileText className="w-12 h-12 mx-auto mb-4 text-slate-400" />
              <h3 className="text-xl font-bold text-white mb-4">Spreadsheets & Slides</h3>
              <p className="text-slate-300">Track partnership strategy and initiatives.</p>
            </div>
          </div>
          
          <div className="bg-red-900/20 border border-red-700/50 rounded-2xl p-8">
            <div className="flex items-start space-x-4">
              <AlertTriangle className="w-8 h-8 text-red-400 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold text-white mb-4">None of these systems provide a complete view of:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-slate-300 mb-6">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                    <span>partnership health</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                    <span>strategic alignment</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                    <span>execution progress</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                    <span>ecosystem performance</span>
                  </div>
                </div>
                <p className="text-xl font-bold text-white">
                  Leadership lacks visibility into where partnership investments are working — and where they are not.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* System of Record Stack Section */}
      <section id="governance" className="py-20 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6 tracking-tight">
              The Intelligence Layer Above Your Enterprise Stack
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              We don't replace your systems of record. We make them intelligible for partnership decisions.
            </p>
          </div>

          {/* Connectivity Map */}
          <div className="relative max-w-4xl mx-auto">
            {/* Top Layer - Partegy */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center bg-gradient-to-r from-blue-600/20 to-emerald-600/20 border border-blue-500/50 rounded-2xl px-8 py-6 backdrop-blur-sm">
                <div className="flex items-center space-x-4">
                  <div className="flex space-x-1">
                    <div className="w-4 h-4 bg-emerald-400 rounded"></div>
                    <div className="w-4 h-4 bg-blue-400 rounded"></div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-white">Partegy Governance Engine</div>
                    <div className="text-sm text-slate-300">Executive Partnership Intelligence</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Connection Lines */}
            <div className="flex justify-center mb-8">
              <div className="w-px h-12 bg-gradient-to-b from-blue-400 to-transparent"></div>
            </div>

            {/* Bottom Layer - Systems */}
            <div className="grid grid-cols-3 lg:grid-cols-5 gap-6">
              {systemIntegrations.map((system, index) => (
                <div key={index} className="text-center">
                  <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:border-slate-600 transition-all group">
                    <system.icon className="w-8 h-8 text-slate-400 group-hover:text-slate-300 mx-auto mb-3" />
                    <div className="text-sm font-medium text-slate-300">{system.name}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-8">
              <p className="text-slate-400 text-sm">
                Seamlessly integrates with your existing enterprise systems
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 - The Problem */}
      <section className="py-20 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-8 tracking-tight">
              Partnerships generate billions in revenue — but most companies can't govern them.
            </h2>
            <div className="max-w-4xl mx-auto text-xl text-slate-300 leading-relaxed space-y-6">
              <p>Partner ecosystems have become a major growth engine for enterprise companies.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-12">
                <div className="text-center">
                  <div className="text-4xl font-bold text-emerald-400 mb-2">~28%</div>
                  <div className="text-slate-400">of company revenue from mature partnership programs</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-emerald-400 mb-2">$80T</div>
                  <div className="text-slate-400">projected ecosystem economic activity by 2030</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-red-400 mb-2">36%</div>
                  <div className="text-slate-400">of organizations consistently measure ecosystem performance</div>
                </div>
              </div>
              
              <p>Despite this scale, most companies still manage partnerships across disconnected systems.</p>
            </div>
          </div>
          
          {/* Visual Problem Illustration */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-slate-800/30 backdrop-blur border border-slate-700 rounded-2xl p-8 text-center">
              <Database className="w-12 h-12 mx-auto mb-4 text-slate-400" />
              <h3 className="text-xl font-bold text-white mb-4">CRM</h3>
              <p className="text-slate-300">Tracks deals and pipeline.</p>
            </div>
            <div className="bg-slate-800/30 backdrop-blur border border-slate-700 rounded-2xl p-8 text-center">
              <Users className="w-12 h-12 mx-auto mb-4 text-slate-400" />
              <h3 className="text-xl font-bold text-white mb-4">PRM</h3>
              <p className="text-slate-300">Tracks partner referrals and sourced revenue.</p>
            </div>
            <div className="bg-slate-800/30 backdrop-blur border border-slate-700 rounded-2xl p-8 text-center">
              <FileText className="w-12 h-12 mx-auto mb-4 text-slate-400" />
              <h3 className="text-xl font-bold text-white mb-4">Spreadsheets & Slides</h3>
              <p className="text-slate-300">Track partnership strategy and initiatives.</p>
            </div>
          </div>
          
          <div className="bg-red-900/20 border border-red-700/50 rounded-2xl p-8">
            <div className="flex items-start space-x-4">
              <AlertTriangle className="w-8 h-8 text-red-400 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold text-white mb-4">None of these systems provide a complete view of:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-slate-300 mb-6">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                    <span>partnership health</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                    <span>strategic alignment</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                    <span>execution progress</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                    <span>ecosystem performance</span>
                  </div>
                </div>
                <p className="text-xl font-bold text-white">
                  Leadership lacks visibility into where partnership investments are working — and where they are not.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Governance Features - Micro Dashboards */}
      <section id="intelligence" className="py-20">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6 tracking-tight">
              Executive-Grade Partnership Intelligence
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Real-time governance capabilities that transform operational data into strategic insights.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {governanceFeatures.map((feature, index) => (
              <div key={index} className="bg-slate-800/30 backdrop-blur border border-slate-700 rounded-2xl p-8 hover:border-slate-600 transition-all group">
                {/* Feature Header */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-3 h-3 rounded-full ${
                      feature.status === 'excellent' ? 'bg-emerald-400' : 
                      feature.status === 'warning' ? 'bg-yellow-400' : 'bg-blue-400'
                    }`}></div>
                    <span className="text-xs text-slate-500 uppercase tracking-wider">LIVE METRICS</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                  <div className="text-sm text-slate-400 mb-4">{feature.subtitle}</div>
                </div>

                {/* Mini Dashboard */}
                <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4 mb-6">
                  <div className="grid grid-cols-1 gap-3">
                    {Object.entries(feature.metrics).map(([key, value], metricIndex) => (
                      <div key={metricIndex} className="flex justify-between items-center">
                        <span className="text-xs text-slate-400 capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </span>
                        <span className="text-sm font-bold text-white">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <p className="text-slate-300 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 2 - The Problem */}
      <section className="py-20 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-8 tracking-tight">
              Partnerships generate billions in revenue — but most companies can't govern them.
            </h2>
            <div className="max-w-4xl mx-auto text-xl text-slate-300 leading-relaxed space-y-6">
              <p>Partner ecosystems have become a major growth engine for enterprise companies.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-12">
                <div className="text-center">
                  <div className="text-4xl font-bold text-emerald-400 mb-2">~28%</div>
                  <div className="text-slate-400">of company revenue from mature partnership programs</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-emerald-400 mb-2">$80T</div>
                  <div className="text-slate-400">projected ecosystem economic activity by 2030</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-red-400 mb-2">36%</div>
                  <div className="text-slate-400">of organizations consistently measure ecosystem performance</div>
                </div>
              </div>
              
              <p>Despite this scale, most companies still manage partnerships across disconnected systems.</p>
            </div>
          </div>
          
          {/* Visual Problem Illustration */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-slate-800/30 backdrop-blur border border-slate-700 rounded-2xl p-8 text-center">
              <Database className="w-12 h-12 mx-auto mb-4 text-slate-400" />
              <h3 className="text-xl font-bold text-white mb-4">CRM</h3>
              <p className="text-slate-300">Tracks deals and pipeline.</p>
            </div>
            <div className="bg-slate-800/30 backdrop-blur border border-slate-700 rounded-2xl p-8 text-center">
              <Users className="w-12 h-12 mx-auto mb-4 text-slate-400" />
              <h3 className="text-xl font-bold text-white mb-4">PRM</h3>
              <p className="text-slate-300">Tracks partner referrals and sourced revenue.</p>
            </div>
            <div className="bg-slate-800/30 backdrop-blur border border-slate-700 rounded-2xl p-8 text-center">
              <FileText className="w-12 h-12 mx-auto mb-4 text-slate-400" />
              <h3 className="text-xl font-bold text-white mb-4">Spreadsheets & Slides</h3>
              <p className="text-slate-300">Track partnership strategy and initiatives.</p>
            </div>
          </div>
          
          <div className="bg-red-900/20 border border-red-700/50 rounded-2xl p-8">
            <div className="flex items-start space-x-4">
              <AlertTriangle className="w-8 h-8 text-red-400 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold text-white mb-4">None of these systems provide a complete view of:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-slate-300 mb-6">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                    <span>partnership health</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                    <span>strategic alignment</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                    <span>execution progress</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                    <span>ecosystem performance</span>
                  </div>
                </div>
                <p className="text-xl font-bold text-white">
                  Leadership lacks visibility into where partnership investments are working — and where they are not.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6 - How the Platform Works */}
      <section id="workflow" className="py-20 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6 tracking-tight">
              How Partegy works
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-400 to-blue-400 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="w-8 h-8 text-white" />
              </div>
              <div className="bg-slate-900/20 border border-slate-700 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">Step 1: Define partnership strategy</h3>
                <p className="text-slate-300 text-sm">Capture strategic objectives, shared goals, and key initiatives for each partnership.</p>
              </div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center mx-auto mb-6">
                <Activity className="w-8 h-8 text-white" />
              </div>
              <div className="bg-slate-900/20 border border-slate-700 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">Step 2: Track execution</h3>
                <p className="text-slate-300 text-sm">Monitor progress across joint initiatives, milestones, and activities.</p>
              </div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-6">
                <Gauge className="w-8 h-8 text-white" />
              </div>
              <div className="bg-slate-900/20 border border-slate-700 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">Step 3: Measure partnership health</h3>
                <p className="text-slate-300 text-sm">Evaluate partnerships across multiple dimensions including performance, engagement, and strategic alignment.</p>
              </div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-red-400 rounded-full flex items-center justify-center mx-auto mb-6">
                <Eye className="w-8 h-8 text-white" />
              </div>
              <div className="bg-slate-900/20 border border-slate-700 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">Step 4: Surface leadership insights</h3>
                <p className="text-slate-300 text-sm">Provide executives with portfolio-level insights into ecosystem performance and risk.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Section 7 - Executive Value */}
      <section className="py-20 bg-gradient-to-r from-slate-900 to-slate-800 border-t border-slate-700">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-8 tracking-tight">
              Give leadership the answers they're asking for
            </h2>
            <p className="text-xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Partegy enables leadership teams to manage partnerships as a strategic portfolio.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h3 className="text-2xl font-bold text-white mb-8">Executives gain clarity on:</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <CheckCircle className="w-6 h-6 text-emerald-400 mt-1 flex-shrink-0" />
                  <span className="text-lg text-slate-300">which partnerships deserve more investment</span>
                </div>
                <div className="flex items-start space-x-4">
                  <CheckCircle className="w-6 h-6 text-emerald-400 mt-1 flex-shrink-0" />
                  <span className="text-lg text-slate-300">which initiatives are delivering results</span>
                </div>
                <div className="flex items-start space-x-4">
                  <CheckCircle className="w-6 h-6 text-emerald-400 mt-1 flex-shrink-0" />
                  <span className="text-lg text-slate-300">which relationships require intervention</span>
                </div>
                <div className="flex items-start space-x-4">
                  <CheckCircle className="w-6 h-6 text-emerald-400 mt-1 flex-shrink-0" />
                  <span className="text-lg text-slate-300">where resources may be misallocated</span>
                </div>
              </div>
              <p className="text-xl font-bold text-white mt-8">
                Instead of reacting to declining revenue, leadership can act proactively.
              </p>
            </div>
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-white mb-6">Executive Command Dashboard</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-emerald-900/20 border border-emerald-700/50 rounded-lg">
                  <span className="text-sm font-medium text-slate-300">Investment-Ready Partnerships</span>
                  <span className="text-lg font-bold text-emerald-400">8</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-yellow-900/20 border border-yellow-700/50 rounded-lg">
                  <span className="text-sm font-medium text-slate-300">Partnerships Requiring Attention</span>
                  <span className="text-lg font-bold text-yellow-400">3</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-red-900/20 border border-red-700/50 rounded-lg">
                  <span className="text-sm font-medium text-slate-300">At-Risk Revenue</span>
                  <span className="text-lg font-bold text-red-400">$3.4M</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-900/20 border border-blue-700/50 rounded-lg">
                  <span className="text-sm font-medium text-slate-300">Strategic Alignment Score</span>
                  <span className="text-lg font-bold text-blue-400">87%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 - The Problem */}
      <section className="py-20 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-8 tracking-tight">
              Partnerships generate billions in revenue — but most companies can't govern them.
            </h2>
            <div className="max-w-4xl mx-auto text-xl text-slate-300 leading-relaxed space-y-6">
              <p>Partner ecosystems have become a major growth engine for enterprise companies.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-12">
                <div className="text-center">
                  <div className="text-4xl font-bold text-emerald-400 mb-2">~28%</div>
                  <div className="text-slate-400">of company revenue from mature partnership programs</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-emerald-400 mb-2">$80T</div>
                  <div className="text-slate-400">projected ecosystem economic activity by 2030</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-red-400 mb-2">36%</div>
                  <div className="text-slate-400">of organizations consistently measure ecosystem performance</div>
                </div>
              </div>
              
              <p>Despite this scale, most companies still manage partnerships across disconnected systems.</p>
            </div>
          </div>
          
          {/* Visual Problem Illustration */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-slate-800/30 backdrop-blur border border-slate-700 rounded-2xl p-8 text-center">
              <Database className="w-12 h-12 mx-auto mb-4 text-slate-400" />
              <h3 className="text-xl font-bold text-white mb-4">CRM</h3>
              <p className="text-slate-300">Tracks deals and pipeline.</p>
            </div>
            <div className="bg-slate-800/30 backdrop-blur border border-slate-700 rounded-2xl p-8 text-center">
              <Users className="w-12 h-12 mx-auto mb-4 text-slate-400" />
              <h3 className="text-xl font-bold text-white mb-4">PRM</h3>
              <p className="text-slate-300">Tracks partner referrals and sourced revenue.</p>
            </div>
            <div className="bg-slate-800/30 backdrop-blur border border-slate-700 rounded-2xl p-8 text-center">
              <FileText className="w-12 h-12 mx-auto mb-4 text-slate-400" />
              <h3 className="text-xl font-bold text-white mb-4">Spreadsheets & Slides</h3>
              <p className="text-slate-300">Track partnership strategy and initiatives.</p>
            </div>
          </div>
          
          <div className="bg-red-900/20 border border-red-700/50 rounded-2xl p-8">
            <div className="flex items-start space-x-4">
              <AlertTriangle className="w-8 h-8 text-red-400 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold text-white mb-4">None of these systems provide a complete view of:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-slate-300 mb-6">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                    <span>partnership health</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                    <span>strategic alignment</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                    <span>execution progress</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                    <span>ecosystem performance</span>
                  </div>
                </div>
                <p className="text-xl font-bold text-white">
                  Leadership lacks visibility into where partnership investments are working — and where they are not.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar - Data Ecosystem */}
      <section className="py-16 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center">
            <p className="text-slate-400 text-sm uppercase tracking-wider mb-8">
              INTEGRATES WITH YOUR EXISTING ENTERPRISE STACK
            </p>
            <div className="flex items-center justify-center space-x-12 opacity-60">
              <div className="text-slate-500 font-semibold">Salesforce</div>
              <div className="text-slate-500 font-semibold">Workday</div>
              <div className="text-slate-500 font-semibold">Oracle</div>
              <div className="text-slate-500 font-semibold">SAP</div>
              <div className="text-slate-500 font-semibold">Microsoft</div>
              <div className="text-slate-500 font-semibold">HubSpot</div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 - The Problem */}
      <section className="py-20 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-8 tracking-tight">
              Partnerships generate billions in revenue — but most companies can't govern them.
            </h2>
            <div className="max-w-4xl mx-auto text-xl text-slate-300 leading-relaxed space-y-6">
              <p>Partner ecosystems have become a major growth engine for enterprise companies.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-12">
                <div className="text-center">
                  <div className="text-4xl font-bold text-emerald-400 mb-2">~28%</div>
                  <div className="text-slate-400">of company revenue from mature partnership programs</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-emerald-400 mb-2">$80T</div>
                  <div className="text-slate-400">projected ecosystem economic activity by 2030</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-red-400 mb-2">36%</div>
                  <div className="text-slate-400">of organizations consistently measure ecosystem performance</div>
                </div>
              </div>
              
              <p>Despite this scale, most companies still manage partnerships across disconnected systems.</p>
            </div>
          </div>
          
          {/* Visual Problem Illustration */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-slate-800/30 backdrop-blur border border-slate-700 rounded-2xl p-8 text-center">
              <Database className="w-12 h-12 mx-auto mb-4 text-slate-400" />
              <h3 className="text-xl font-bold text-white mb-4">CRM</h3>
              <p className="text-slate-300">Tracks deals and pipeline.</p>
            </div>
            <div className="bg-slate-800/30 backdrop-blur border border-slate-700 rounded-2xl p-8 text-center">
              <Users className="w-12 h-12 mx-auto mb-4 text-slate-400" />
              <h3 className="text-xl font-bold text-white mb-4">PRM</h3>
              <p className="text-slate-300">Tracks partner referrals and sourced revenue.</p>
            </div>
            <div className="bg-slate-800/30 backdrop-blur border border-slate-700 rounded-2xl p-8 text-center">
              <FileText className="w-12 h-12 mx-auto mb-4 text-slate-400" />
              <h3 className="text-xl font-bold text-white mb-4">Spreadsheets & Slides</h3>
              <p className="text-slate-300">Track partnership strategy and initiatives.</p>
            </div>
          </div>
          
          <div className="bg-red-900/20 border border-red-700/50 rounded-2xl p-8">
            <div className="flex items-start space-x-4">
              <AlertTriangle className="w-8 h-8 text-red-400 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold text-white mb-4">None of these systems provide a complete view of:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-slate-300 mb-6">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                    <span>partnership health</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                    <span>strategic alignment</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                    <span>execution progress</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                    <span>ecosystem performance</span>
                  </div>
                </div>
                <p className="text-xl font-bold text-white">
                  Leadership lacks visibility into where partnership investments are working — and where they are not.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Executive CTA */}
      <section className="py-20 bg-gradient-to-r from-slate-900 to-slate-800 border-t border-slate-700">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-8 tracking-tight">
            Transform Partnership Data into Executive Intelligence
          </h2>
          <p className="text-xl text-slate-300 mb-12 leading-relaxed">
            Schedule a personalized demo to see how Partegy creates the governance layer your partnership portfolio needs.
          </p>
          
          <form onSubmit={handleDemoRequest} className="max-w-md mx-auto mb-8">
            <div className="flex space-x-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your corporate email"
                className="flex-1 px-6 py-4 rounded-lg bg-slate-800 border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-all flex items-center"
              >
                <Monitor className="w-4 h-4 mr-2" />
                Demo
              </button>
            </div>
          </form>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-slate-400 text-sm">
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4" />
              <span>SOC 2 Compliant</span>
            </div>
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4" />
              <span>15-Minute Setup</span>
            </div>
            <div className="flex items-center space-x-2">
              <Globe className="w-4 h-4" />
              <span>Enterprise SSO</span>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 - The Problem */}
      <section className="py-20 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-8 tracking-tight">
              Partnerships generate billions in revenue — but most companies can't govern them.
            </h2>
            <div className="max-w-4xl mx-auto text-xl text-slate-300 leading-relaxed space-y-6">
              <p>Partner ecosystems have become a major growth engine for enterprise companies.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-12">
                <div className="text-center">
                  <div className="text-4xl font-bold text-emerald-400 mb-2">~28%</div>
                  <div className="text-slate-400">of company revenue from mature partnership programs</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-emerald-400 mb-2">$80T</div>
                  <div className="text-slate-400">projected ecosystem economic activity by 2030</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-red-400 mb-2">36%</div>
                  <div className="text-slate-400">of organizations consistently measure ecosystem performance</div>
                </div>
              </div>
              
              <p>Despite this scale, most companies still manage partnerships across disconnected systems.</p>
            </div>
          </div>
          
          {/* Visual Problem Illustration */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-slate-800/30 backdrop-blur border border-slate-700 rounded-2xl p-8 text-center">
              <Database className="w-12 h-12 mx-auto mb-4 text-slate-400" />
              <h3 className="text-xl font-bold text-white mb-4">CRM</h3>
              <p className="text-slate-300">Tracks deals and pipeline.</p>
            </div>
            <div className="bg-slate-800/30 backdrop-blur border border-slate-700 rounded-2xl p-8 text-center">
              <Users className="w-12 h-12 mx-auto mb-4 text-slate-400" />
              <h3 className="text-xl font-bold text-white mb-4">PRM</h3>
              <p className="text-slate-300">Tracks partner referrals and sourced revenue.</p>
            </div>
            <div className="bg-slate-800/30 backdrop-blur border border-slate-700 rounded-2xl p-8 text-center">
              <FileText className="w-12 h-12 mx-auto mb-4 text-slate-400" />
              <h3 className="text-xl font-bold text-white mb-4">Spreadsheets & Slides</h3>
              <p className="text-slate-300">Track partnership strategy and initiatives.</p>
            </div>
          </div>
          
          <div className="bg-red-900/20 border border-red-700/50 rounded-2xl p-8">
            <div className="flex items-start space-x-4">
              <AlertTriangle className="w-8 h-8 text-red-400 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold text-white mb-4">None of these systems provide a complete view of:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-slate-300 mb-6">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                    <span>partnership health</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                    <span>strategic alignment</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                    <span>execution progress</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                    <span>ecosystem performance</span>
                  </div>
                </div>
                <p className="text-xl font-bold text-white">
                  Leadership lacks visibility into where partnership investments are working — and where they are not.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-800 py-16">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="flex space-x-1">
                  <div className="w-3 h-3 bg-emerald-400 rounded-sm"></div>
                  <div className="w-3 h-3 bg-blue-400 rounded-sm"></div>
                </div>
                <div className="text-xl font-bold text-white">Partegy</div>
              </div>
              <p className="text-slate-400 leading-relaxed mb-6 text-sm">
                The strategic governance layer for enterprise partnerships
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">Platform</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">Governance Engine</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">Intelligence Layer</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">Integrations</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">Security</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">Enterprise</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">Implementation</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">Training</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">Support</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">Professional Services</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">About</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">Leadership</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">Careers</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">Contact</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between">
            <p className="text-slate-500 text-sm">
              © 2026 Partegy. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 sm:mt-0">
              <a href="#" className="text-slate-500 hover:text-slate-400 text-sm transition-colors">Privacy Policy</a>
              <a href="#" className="text-slate-500 hover:text-slate-400 text-sm transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
