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
            <button
              onClick={handleWatchDemo}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium text-sm transition-all flex items-center space-x-2 border border-blue-500"
            >
              <Monitor className="w-4 h-4" />
              <span>Executive Demo</span>
            </button>
          </div>
        </div>
      </header>

      {/* Section 1 - Hero */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center space-x-2 bg-slate-800/50 border border-slate-700 rounded-full px-4 py-2 mb-8">
                <Shield className="w-4 h-4 text-emerald-400" />
                <span className="text-slate-300 text-sm font-medium">Enterprise Partnership Governance</span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight tracking-tight">
                Partnerships drive growth. But they're rarely governed like strategic assets.
              </h1>
              
              <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                Partegy gives leaders visibility into partnership performance, strategy execution, and ecosystem health — so they know where to invest and when to intervene.
              </p>
              
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <button
                  onClick={handleWatchDemo}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-lg font-semibold text-lg flex items-center justify-center transition-all shadow-lg"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Watch the Executive Demo
                </button>
                <button
                  onClick={handleScheduleConversation}
                  className="border border-slate-600 hover:border-slate-500 text-slate-300 hover:text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all"
                >
                  Schedule a Strategy Conversation
                </button>
              </div>

              <p className="text-slate-400 mt-6 text-sm">
                Partegy is the governance platform for strategic partnerships.
              </p>
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
                
                <div className="mb-6">
                  <div className="text-4xl lg:text-5xl font-bold text-white mb-2 transition-all duration-500">
                    {metrics[currentMetric].value}
                  </div>
                  <div className="text-slate-400 text-sm">
                    {metrics[currentMetric].label}
                  </div>
                </div>

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

      {/* Section 3 - The Governance Gap */}
      <section className="py-20 bg-slate-900 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-8 tracking-tight">
              The partnership governance gap
            </h2>
            <p className="text-xl text-slate-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              Partnerships are treated as critical growth engines — but rarely managed with the same discipline as other strategic assets.
            </p>
            
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl p-8 mb-12">
              <h3 className="text-2xl font-bold text-white mb-8">Executives often struggle to answer key questions:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-lg text-slate-300">Which partnerships are actually performing?</span>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-lg text-slate-300">Which initiatives are driving results?</span>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-lg text-slate-300">Where should we invest more resources?</span>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-lg text-slate-300">Which partnerships are at risk?</span>
                </div>
              </div>
            </div>
            
            <p className="text-xl text-slate-300 leading-relaxed">
              Without a system to govern partnerships, leadership lacks the insight needed to manage their ecosystem effectively.
            </p>
          </div>
        </div>
      </section>

      {/* Section 4 - The Solution */}
      <section className="py-20 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-8 tracking-tight">
              Finally, a platform to govern strategic partnerships
            </h2>
            <p className="text-xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Partegy provides a structured system to manage partnership strategy, execution, and performance in one place.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h3 className="text-2xl font-bold text-white mb-8">It allows organizations to:</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <CheckCircle className="w-6 h-6 text-emerald-400 mt-1 flex-shrink-0" />
                  <span className="text-lg text-slate-300">define partnership strategy and objectives</span>
                </div>
                <div className="flex items-start space-x-4">
                  <CheckCircle className="w-6 h-6 text-emerald-400 mt-1 flex-shrink-0" />
                  <span className="text-lg text-slate-300">track joint initiatives and progress</span>
                </div>
                <div className="flex items-start space-x-4">
                  <CheckCircle className="w-6 h-6 text-emerald-400 mt-1 flex-shrink-0" />
                  <span className="text-lg text-slate-300">measure partnership health</span>
                </div>
                <div className="flex items-start space-x-4">
                  <CheckCircle className="w-6 h-6 text-emerald-400 mt-1 flex-shrink-0" />
                  <span className="text-lg text-slate-300">surface insights for leadership</span>
                </div>
              </div>
              <p className="text-xl font-bold text-white mt-8">
                This gives executives a complete view of their partnership portfolio.
              </p>
            </div>
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl p-8">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-white mb-4">Partnership Portfolio Command</h3>
                <div className="w-2 h-2 bg-emerald-400 rounded-full mx-auto mb-4 animate-pulse"></div>
              </div>
              <div className="space-y-4">
                <div className="bg-slate-900/50 border border-slate-600 rounded-lg p-3">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 text-sm">Strategic Health Score</span>
                    <span className="text-emerald-400 font-bold">87%</span>
                  </div>
                </div>
                <div className="bg-slate-900/50 border border-slate-600 rounded-lg p-3">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 text-sm">Active Partnerships</span>
                    <span className="text-white font-bold">34</span>
                  </div>
                </div>
                <div className="bg-slate-900/50 border border-slate-600 rounded-lg p-3">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 text-sm">Portfolio ROI</span>
                    <span className="text-emerald-400 font-bold">347%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5 - AI-Powered Insights */}
      <section className="py-20 bg-slate-900 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-8 tracking-tight">
              Turn partnership data into actionable insight
            </h2>
            <p className="text-xl text-slate-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              Partegy analyzes partnership activity, initiative progress, and revenue signals to surface insights that would otherwise remain hidden.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h3 className="text-2xl font-bold text-white mb-8">This helps leaders:</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <Brain className="w-6 h-6 text-blue-400 mt-1 flex-shrink-0" />
                  <span className="text-lg text-slate-300">detect early partnership risk</span>
                </div>
                <div className="flex items-start space-x-4">
                  <Brain className="w-6 h-6 text-blue-400 mt-1 flex-shrink-0" />
                  <span className="text-lg text-slate-300">identify stalled initiatives</span>
                </div>
                <div className="flex items-start space-x-4">
                  <Brain className="w-6 h-6 text-blue-400 mt-1 flex-shrink-0" />
                  <span className="text-lg text-slate-300">understand where resources should be invested</span>
                </div>
                <div className="flex items-start space-x-4">
                  <Brain className="w-6 h-6 text-blue-400 mt-1 flex-shrink-0" />
                  <span className="text-lg text-slate-300">intervene before revenue impact occurs</span>
                </div>
              </div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-white mb-6">Example AI Insights</h3>
              <div className="space-y-4">
                <div className="p-4 bg-red-900/20 border border-red-700/50 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-slate-300">declining partner engagement</span>
                  </div>
                </div>
                <div className="p-4 bg-yellow-900/20 border border-yellow-700/50 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-slate-300">initiatives falling behind plan</span>
                  </div>
                </div>
                <div className="p-4 bg-orange-900/20 border border-orange-700/50 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-slate-300">partnerships delivering lower-than-expected impact</span>
                  </div>
                </div>
                <div className="p-4 bg-blue-900/20 border border-blue-700/50 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <Eye className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-slate-300">misalignment between strategy and execution</span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-slate-400 mt-6 italic">
                AI surfaces insights, while leaders remain in control of decisions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6 - How the Platform Works */}
      <section className="py-20 border-t border-slate-800">
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
                <h3 className="text-xl font-bold text-white mb-4">Define partnership strategy</h3>
                <p className="text-slate-300 text-sm">Capture strategic objectives, shared goals, and key initiatives for each partnership.</p>
              </div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center mx-auto mb-6">
                <Activity className="w-8 h-8 text-white" />
              </div>
              <div className="bg-slate-900/20 border border-slate-700 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">Track execution</h3>
                <p className="text-slate-300 text-sm">Monitor progress across joint initiatives, milestones, and activities.</p>
              </div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-6">
                <Gauge className="w-8 h-8 text-white" />
              </div>
              <div className="bg-slate-900/20 border border-slate-700 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">Measure partnership health</h3>
                <p className="text-slate-300 text-sm">Evaluate partnerships across multiple dimensions including performance, engagement, and strategic alignment.</p>
              </div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-red-400 rounded-full flex items-center justify-center mx-auto mb-6">
                <Eye className="w-8 h-8 text-white" />
              </div>
              <div className="bg-slate-900/20 border border-slate-700 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">Surface leadership insights</h3>
                <p className="text-slate-300 text-sm">Provide executives with portfolio-level insights into ecosystem performance and risk.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 7 - Executive Value */}
      <section className="py-20 bg-slate-900 border-t border-slate-800">
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

      {/* Section 8 - Closing Statement */}
      <section className="py-20 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center">
            <p className="text-2xl lg:text-3xl font-bold text-white mb-8 leading-relaxed max-w-4xl mx-auto">
              Partnerships have become one of the most important drivers of enterprise growth.
              They deserve the same governance and visibility as any other strategic asset.
            </p>
            <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-emerald-400/10 to-blue-400/10 border border-emerald-400/30 rounded-full px-8 py-4">
              <div className="flex space-x-1">
                <div className="w-3 h-3 bg-emerald-400 rounded-sm"></div>
                <div className="w-3 h-3 bg-blue-400 rounded-sm"></div>
              </div>
              <span className="text-2xl font-bold text-white tracking-tight">Partegy — governing partnerships as strategic assets.</span>
            </div>
          </div>
        </div>
      </section>

      {/* Section 9 - Final CTA */}
      <section className="py-20 bg-gradient-to-r from-slate-900 to-slate-800 border-t border-slate-700">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-12 tracking-tight">
            Bring clarity and control to your partnership ecosystem
          </h2>
          
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 justify-center mb-12">
            <button
              onClick={handleWatchDemo}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-lg font-semibold text-lg flex items-center justify-center transition-all shadow-lg"
            >
              <Play className="w-5 h-5 mr-2" />
              Watch the Executive Demo
            </button>
            <button
              onClick={handleScheduleConversation}
              className="border border-slate-600 hover:border-slate-500 text-slate-300 hover:text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all"
            >
              Schedule a Strategy Conversation
            </button>
          </div>
          
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
