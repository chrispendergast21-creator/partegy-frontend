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
  Monitor
} from 'lucide-react';
import LeadCaptureModal from '../../components/LeadCaptureModal';

export default function LandingPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'demo' | 'audit'>('demo');

  const handleWatchDemo = () => {
    setModalType('demo');
    setModalOpen(true);
  };

  const handleGetAudit = () => {
    setModalType('audit');
    setModalOpen(true);
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
              <span>See Partnership Intelligence Demo</span>
            </button>
          </div>
        </div>
      </header>

      {/* Compressed Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
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
                  See Partnership Intelligence Demo
                </button>
              </div>
            </div>

            {/* Dashboard Preview */}
            <div className="relative">
              <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-2xl p-8 shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                    <span className="text-slate-300 text-sm font-medium uppercase tracking-wider">LIVE GOVERNANCE</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Activity className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400 text-sm font-medium">REAL-TIME</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-emerald-900/20 border border-emerald-700/50 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300 font-medium">Strategic Health Score</span>
                      <span className="text-2xl font-bold text-emerald-400">87%</span>
                    </div>
                  </div>
                  <div className="bg-yellow-900/20 border border-yellow-700/50 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300 font-medium">Partnerships Requiring Attention</span>
                      <span className="text-2xl font-bold text-yellow-400">3</span>
                    </div>
                  </div>
                  <div className="bg-red-900/20 border border-red-700/50 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300 font-medium">At-Risk Revenue Identified</span>
                      <span className="text-2xl font-bold text-red-400">$4.2M</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Gap - Reality Check Table */}
      {/* Institutional Memory Hook */}
      <section className="py-16 bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center">
            <h2 className="text-2xl lg:text-3xl font-bold text-white mb-6 tracking-tight">
              Partnerships generate billions in revenue — but most companies can't govern them.
            </h2>
            <p className="text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed mb-12">
              Partner ecosystems have become a major growth engine for enterprise companies.
            </p>
            
            {/* Statistics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-12">
              <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl p-6 text-center">
                <div className="text-4xl font-bold text-emerald-400 mb-2">~28%</div>
                <div className="text-slate-300 text-sm">of company revenue from mature partnership programs</div>
              </div>
              <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl p-6 text-center">
                <div className="text-4xl font-bold text-blue-400 mb-2">$80T</div>
                <div className="text-slate-300 text-sm">projected ecosystem economic activity by 2030</div>
              </div>
              <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl p-6 text-center">
                <div className="text-4xl font-bold text-red-400 mb-2">36%</div>
                <div className="text-slate-300 text-sm">of organizations consistently measure ecosystem performance</div>
              </div>
            </div>
            
            <p className="text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Despite this scale, most companies still manage partnerships across disconnected systems.
            </p>
          </div>
        </div>
      </section>


      <section className="py-20 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-8 tracking-tight">
              Why your current stack isn't enough
            </h2>
          </div>
          
          <div className="bg-slate-900/20 border border-slate-700 rounded-2xl overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-3 bg-slate-800/50">
              <div className="p-6 border-r border-slate-700">
                <h3 className="text-lg font-bold text-white">System</h3>
              </div>
              <div className="p-6 border-r border-slate-700">
                <h3 className="text-lg font-bold text-white">What it does</h3>
              </div>
              <div className="p-6 bg-red-950/20">
                <h3 className="text-lg font-bold text-red-300">What it misses (The Partegy Gap)</h3>
              </div>
            </div>
            
            {/* CRM Row */}
            <div className="grid grid-cols-3 border-t border-slate-700">
              <div className="p-6 border-r border-slate-700">
                <div className="flex items-center space-x-3">
                  <Database className="w-6 h-6 text-slate-400" />
                  <span className="font-semibold text-white">CRM</span>
                </div>
              </div>
              <div className="p-6 border-r border-slate-700">
                <span className="text-slate-300">Pipeline & Revenue</span>
              </div>
              <div className="p-6 bg-red-950/10">
                <span className="text-red-200 font-bold">Strategic Alignment</span>
              </div>
            </div>
            
            {/* PRM Row */}
            <div className="grid grid-cols-3 border-t border-slate-700">
              <div className="p-6 border-r border-slate-700">
                <div className="flex items-center space-x-3">
                  <Users className="w-6 h-6 text-slate-400" />
                  <span className="font-semibold text-white">PRM</span>
                </div>
              </div>
              <div className="p-6 border-r border-slate-700">
                <span className="text-slate-300">Portals & Referrals</span>
              </div>
              <div className="p-6 bg-red-950/10">
                <span className="text-red-200 font-bold">Inter-organizational Governance</span>
              </div>
            </div>
            
            {/* Spreadsheets Row */}
            <div className="grid grid-cols-3 border-t border-slate-700">
              <div className="p-6 border-r border-slate-700">
                <div className="flex items-center space-x-3">
                  <FileText className="w-6 h-6 text-slate-400" />
                  <span className="font-semibold text-white">Spreadsheets</span>
                </div>
              </div>
              <div className="p-6 border-r border-slate-700">
                <span className="text-slate-300">Manual Strategy</span>
              </div>
              <div className="p-6 bg-red-950/10">
                <span className="text-red-200 font-bold">Real-time Governance & AI Insights</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Solution - Introduce Partegy */}
      <section className="py-20 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-8 tracking-tight">
              Finally, a platform to govern strategic partnerships
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-12">
              Partegy provides a structured system to manage partnership strategy, execution, and performance in one place.
            </p>
            <p className="text-3xl lg:text-4xl font-bold text-white mb-8 tracking-tight">
              How Partegy Works
            </p>
          </div>          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto mb-8">
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-8 relative">
              <div className="absolute -top-4 left-6 w-8 h-8 bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-sm">1</div>
              <h3 className="text-lg font-semibold text-white mb-3 mt-2">Define partnership strategy</h3>
              <p className="text-slate-300 text-sm">Capture strategic objectives, shared goals, and key initiatives for each partnership.</p>
            </div>
            
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-8 relative">
              <div className="absolute -top-4 left-6 w-8 h-8 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">2</div>
              <h3 className="text-lg font-semibold text-white mb-3 mt-2">Track execution</h3>
              <p className="text-slate-300 text-sm">Monitor progress across joint initiatives, milestones, and activities.</p>
            </div>
            
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-8 relative">
              <div className="absolute -top-4 left-6 w-8 h-8 bg-gradient-to-r from-purple-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">3</div>
              <h3 className="text-lg font-semibold text-white mb-3 mt-2">Measure partnership health</h3>
              <p className="text-slate-300 text-sm">Evaluate partnerships across multiple dimensions including performance, engagement, and strategic alignment.</p>
            </div>
            
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-8 relative">
              <div className="absolute -top-4 left-6 w-8 h-8 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm">4</div>
              <h3 className="text-lg font-semibold text-white mb-3 mt-2">Surface leadership insights</h3>
              <p className="text-slate-300 text-sm">Provide executives with portfolio-level insights into ecosystem performance and risk.</p>
            </div>
          </div>
          
          <p className="text-lg text-slate-300 text-center max-w-3xl mx-auto">
            This gives executives a complete view of their partnership portfolio.
          </p>
        </div>
      </section>


      {/* AI-Powered Insights */}
      <section className="py-20 border-t border-slate-800 bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-8 tracking-tight">
              Turn partnership data into actionable insight
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Partegy analyzes partnership activity, initiative progress, and revenue signals to surface insights that would otherwise remain hidden.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-8">
              <h3 className="text-lg font-semibold text-white mb-4">This helps leaders:</h3>
              <ul className="space-y-3 text-slate-300">
                <li className="flex items-start space-x-2"><span className="text-emerald-400 mt-1">•</span><span>Detect early partnership risk</span></li>
                <li className="flex items-start space-x-2"><span className="text-emerald-400 mt-1">•</span><span>Identify stalled initiatives</span></li>
                <li className="flex items-start space-x-2"><span className="text-emerald-400 mt-1">•</span><span>Understand where resources should be invested</span></li>
                <li className="flex items-start space-x-2"><span className="text-emerald-400 mt-1">•</span><span>Intervene before revenue impact occurs</span></li>
              </ul>
            </div>
            
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-8">
              <h3 className="text-lg font-semibold text-white mb-4">The platform surfaces signals such as:</h3>
              <ul className="space-y-3 text-slate-300">
                <li className="flex items-start space-x-2"><span className="text-red-400 mt-1">•</span><span>Declining partner engagement</span></li>
                <li className="flex items-start space-x-2"><span className="text-red-400 mt-1">•</span><span>Initiatives falling behind plan</span></li>
                <li className="flex items-start space-x-2"><span className="text-red-400 mt-1">•</span><span>Partnerships delivering lower-than-expected impact</span></li>
                <li className="flex items-start space-x-2"><span className="text-red-400 mt-1">•</span><span>Misalignment between strategy and execution</span></li>
              </ul>
            </div>
          </div>
          
          <p className="text-lg text-slate-400 text-center max-w-3xl mx-auto italic">
            AI surfaces insights, while leaders remain in control of decisions.
          </p>
        </div>
      </section>

      <section className="py-20 border-t border-slate-800 bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-8 tracking-tight">
              Give leadership the answers they're asking for
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-12">
              Partegy enables leadership teams to manage partnerships as a strategic portfolio.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-8">
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-6">
              <div className="text-emerald-400 font-semibold mb-2">Investment Decisions</div>
              <div className="text-slate-300 text-sm">Which partnerships deserve more investment</div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-6">
              <div className="text-blue-400 font-semibold mb-2">Initiative Performance</div>
              <div className="text-slate-300 text-sm">Which initiatives are delivering results</div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-6">
              <div className="text-purple-400 font-semibold mb-2">Risk Management</div>
              <div className="text-slate-300 text-sm">Which relationships require intervention</div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-6">
              <div className="text-orange-400 font-semibold mb-2">Resource Allocation</div>
              <div className="text-slate-300 text-sm">Where resources may be misallocated</div>
            </div>
          </div>
          
          <p className="text-lg text-slate-300 text-center max-w-3xl mx-auto">
            Instead of reacting to declining revenue, leadership can act proactively.
          </p>
        </div>
      </section>
      {/* Core 3 Benefits - Authoritative Content */}


      <section className="py-20 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Partnership Asset Management */}
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-emerald-400 to-blue-400 rounded-2xl flex items-center justify-center mx-auto mb-8">
                <Gauge className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-6">Partnership Asset Management</h3>
              <p className="text-slate-300 leading-relaxed mb-6">
                Stop managing $100M relationships in $0 spreadsheets. Our patented Partnership Intelligence system treats partnerships as structured, measurable, and enduring organizational assets.
              </p>
              <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-6">
                <div className="text-sm text-emerald-400 font-semibold mb-2">OUTCOME:</div>
                <div className="text-slate-300 text-sm">Revenue alone is a lagging indicator. We synthesize engagement density, execution velocity, and mutual value exchange into a single, patented predictive signal. Equip the CFO with the same visibility into partnership ROI that they have for R&D or Sales spend.</div>
              </div>
            </div>

            {/* Strategy-to-Execution Continuity */}
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl flex items-center justify-center mx-auto mb-8">
                <Target className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-6">Strategy-to-Execution Continuity</h3>
              <p className="text-slate-300 leading-relaxed mb-6">
                Most tools stop at the plan. Others stop at the task. Partegy is the only system that explicitly links high-level strategic intent to day-to-day outcomes.
              </p>
              <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-6">
                <div className="text-sm text-blue-400 font-semibold mb-2">OUTCOME:</div>
                <div className="text-slate-300 text-sm">Explicitly link strategic objectives to initiatives. Track intent → action → outcome in **The System of Record for Partnership State**.</div>
              </div>
            </div>

            {/* Executive-Level Intelligence */}
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl flex items-center justify-center mx-auto mb-8">
                <Brain className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-6">Executive-Level Intelligence</h3>
              <p className="text-slate-300 leading-relaxed mb-6">
                AI synthesizes partnership context to generate executive summaries, identify risks, and recommend interventions.
              </p>
              <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-6">
                <div className="text-sm text-purple-400 font-semibold mb-2">OUTCOME:</div>
                <div className="text-slate-300 text-sm">Get answers to "Should I worry?" and "Where should I intervene?" — enabling strategic capital reallocation based on partnership performance data.</div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Final CTA - Irresistible Offer */}
      <section className="py-20 bg-gradient-to-r from-slate-900 to-slate-800 border-t border-slate-700">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-8 tracking-tight">
            See your ecosystem's true health
          </h2>
          <p className="text-xl text-slate-300 mb-12 leading-relaxed">
            Get a sample Partnership Health Audit to see what governance looks like for your portfolio.
          </p>
          
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 justify-center mb-12">
            <button
              onClick={handleWatchDemo}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-lg font-semibold text-lg flex items-center justify-center transition-all shadow-lg"
            >
              <Play className="w-5 h-5 mr-2" />
              See Partnership Intelligence Demo
            </button>

            <p className="text-xl text-slate-300 mt-6 leading-relaxed">
              Patent Pending
           </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-800 py-16">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="flex space-x-1">
                <div className="w-3 h-3 bg-emerald-400 rounded-sm"></div>
                <div className="w-3 h-3 bg-blue-400 rounded-sm"></div>
              </div>
              <div className="text-xl font-bold text-white">Partegy</div>
            </div>
            <p className="text-slate-400 mb-8">
              The strategic governance layer for enterprise partnerships
            </p>
            <div className="flex space-x-6 justify-center text-slate-500 text-sm">
              <a href="/privacy" className="hover:text-slate-400 transition-colors">Privacy Policy</a>
              <a href="/terms" className="hover:text-slate-400 transition-colors">Terms of Service</a>
              <a href="/contact" className="hover:text-slate-400 transition-colors">Contact</a>
            </div>
          </div>
        </div>

      {/* Lead Capture Modal */}
      <LeadCaptureModal 
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        type={modalType}
      />
      </footer>
    </div>
  );
}
