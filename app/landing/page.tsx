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
    <div className="min-h-screen bg-white">
      {/* Executive Header */}
      <header className="border-b border-gray-200 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4 sm:py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex space-x-1">
                <div className="w-3 h-3 bg-emerald-400 rounded-sm"></div>
                <div className="w-3 h-3 bg-blue-400 rounded-sm"></div>
              </div>
              <div className="text-xl font-bold tracking-tight" style={{color: "#0B3D91"}}>Partegy</div>
            </div>
            <button
              onClick={handleWatchDemo}
              className="text-white px-3 py-2 sm:px-6 sm:py-3 rounded-lg font-medium text-xs sm:text-sm transition-all flex items-center space-x-1.5 sm:space-x-2 whitespace-nowrap" style={{backgroundColor: "#0B3D91"}}
            >
              <Monitor className="w-3.5 h-3.5 sm:w-4 sm:h-4 hidden sm:block" />
              <span>Request Early Access</span>
            </button>
          </div>
        </div>
      </header>

      {/* Compressed Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight tracking-tight" style={{color: "#0B3D91"}}>
                Partnerships drive growth. But they're rarely governed like strategic assets.
              </h1>
              
              <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                Partegy helps organizations govern strategic partnerships using proprietary health scoring, behavioral intelligence, and executive-level ecosystem visibility.
              </p>
              
              <p className="text-lg text-gray-500 mb-8 leading-relaxed">
                Gain consistent visibility across strategic, referral, and co-sell partnerships — including execution quality, ecosystem risk, engagement trends, and resource allocation.
              </p>
              
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <button
                  onClick={handleWatchDemo}
                  className="text-white px-8 py-4 rounded-lg font-semibold text-lg flex items-center justify-center transition-all shadow-lg" style={{backgroundColor: "#0B3D91"}}
                >
                  <Play className="w-5 h-5 mr-2" />
                  Request Early Access
                </button>
              </div>
            </div>

            {/* Dashboard Preview - Static */}
            <div className="relative">
              <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-2xl transform scale-110">
                <img 
                  src="/partnership-dashboard1.png" 
                  alt="Partegy Partnership Dashboard showing health score, revenue, and key metrics"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Gap - Reality Check Table */}
      {/* Institutional Memory Hook */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6 tracking-tight">
              Partnerships generate billions in revenue — but most companies can't govern them.
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed mb-12">
              Partner ecosystems have become a major growth engine for enterprise companies.
            </p>
            
            {/* Statistics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-12">
              <div className="bg-gray-50/50 backdrop-blur border border-gray-200 rounded-2xl p-6 text-center">
                <div className="text-4xl font-bold mb-2" style={{color: "#0B3D91"}}>~28%</div>
                <div className="text-gray-600 text-sm">of company revenue from mature partnership programs</div>
              </div>
              <div className="bg-gray-50/50 backdrop-blur border border-gray-200 rounded-2xl p-6 text-center">
                <div className="text-4xl font-bold mb-2" style={{color: "#1E7EC8"}}>$80T</div>
                <div className="text-gray-600 text-sm">projected ecosystem economic activity by 2030</div>
              </div>
              <div className="bg-gray-50/50 backdrop-blur border border-gray-200 rounded-2xl p-6 text-center">
                <div className="text-4xl font-bold text-red-500 mb-2">36%</div>
                <div className="text-gray-600 text-sm">of organizations consistently measure ecosystem performance</div>
              </div>
            </div>
            
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Despite this scale, most companies still manage partnerships across disconnected systems.
            </p>
          </div>
        </div>
      </section>


      <section className="py-20 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8 tracking-tight">
              Why your current stack isn't enough
            </h2>
          </div>
          
          <div className="border border-gray-200 rounded-2xl overflow-hidden">
            {/* Table Header - hidden on mobile, cards have their own labels instead */}
            <div className="hidden md:grid grid-cols-3" style={{backgroundColor: "#0B3D91"}}>
              <div className="p-6 border-r border-gray-200">
                <h3 className="text-lg font-bold text-white">System</h3>
              </div>
              <div className="p-6 border-r border-gray-200">
                <h3 className="text-lg font-bold text-white">What it does</h3>
              </div>
              <div className="p-6 bg-red-50">
                <h3 className="text-lg font-bold text-red-600">What it misses (The Partegy Gap)</h3>
              </div>
            </div>
            
            {/* CRM Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 border-t border-gray-200">
              <div className="p-4 md:p-6 border-r-0 md:border-r border-gray-200">
                <div className="flex items-center space-x-3">
                  <Database className="w-5 h-5 md:w-6 md:h-6 text-gray-500" />
                  <span className="font-semibold text-gray-900">CRM</span>
                </div>
              </div>
              <div className="p-4 md:p-6 border-r-0 md:border-r border-gray-200 pl-4 md:pl-6">
                <span className="text-gray-400 text-xs uppercase tracking-wide md:hidden block mb-1">What it does</span>
                <span className="text-gray-600">Pipeline & Revenue</span>
              </div>
              <div className="p-4 md:p-6 bg-red-50">
                <span className="text-red-500 text-xs uppercase tracking-wide md:hidden block mb-1">What it misses</span>
                <span className="text-red-600 font-bold">Strategic Alignment</span>
              </div>
            </div>
            
            {/* PRM Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 border-t border-gray-200">
              <div className="p-4 md:p-6 border-r-0 md:border-r border-gray-200">
                <div className="flex items-center space-x-3">
                  <Users className="w-5 h-5 md:w-6 md:h-6 text-gray-500" />
                  <span className="font-semibold text-gray-900">PRM</span>
                </div>
              </div>
              <div className="p-4 md:p-6 border-r-0 md:border-r border-gray-200 pl-4 md:pl-6">
                <span className="text-gray-400 text-xs uppercase tracking-wide md:hidden block mb-1">What it does</span>
                <span className="text-gray-600">Portals & Referrals</span>
              </div>
              <div className="p-4 md:p-6 bg-red-50">
                <span className="text-red-500 text-xs uppercase tracking-wide md:hidden block mb-1">What it misses</span>
                <span className="text-red-600 font-bold">Inter-organizational Governance</span>
              </div>
            </div>
            
            {/* Spreadsheets Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 border-t border-gray-200">
              <div className="p-4 md:p-6 border-r-0 md:border-r border-gray-200">
                <div className="flex items-center space-x-3">
                  <FileText className="w-5 h-5 md:w-6 md:h-6 text-gray-500" />
                  <span className="font-semibold text-gray-900">Spreadsheets</span>
                </div>
              </div>
              <div className="p-4 md:p-6 border-r-0 md:border-r border-gray-200 pl-4 md:pl-6">
                <span className="text-gray-400 text-xs uppercase tracking-wide md:hidden block mb-1">What it does</span>
                <span className="text-gray-600">Manual Strategy</span>
              </div>
              <div className="p-4 md:p-6 bg-red-50">
                <span className="text-red-500 text-xs uppercase tracking-wide md:hidden block mb-1">What it misses</span>
                <span className="text-red-600 font-bold">Real-time Governance & AI Insights</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Solution - Introduce Partegy */}
      <section className="py-20 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8 tracking-tight">
              Finally, a platform to govern strategic partnerships
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-12">
              Partegy provides a structured system to manage partnership strategy, execution, and performance in one place.
            </p>
            <p className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8 tracking-tight">
              How Partegy Works
            </p>
          </div>          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto mb-8">
            <div className="bg-gray-50/50 backdrop-blur border border-gray-200 rounded-xl p-8 relative">
              <div className="absolute -top-4 left-6 w-8 h-8 bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full flex items-center justify-center font-bold text-gray-900 text-sm">1</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3 mt-2">Define partnership strategy</h3>
              <p className="text-gray-600 text-sm">Capture strategic objectives, shared goals, and key initiatives for each partnership.</p>
            </div>
            
            <div className="bg-gray-50/50 backdrop-blur border border-gray-200 rounded-xl p-8 relative">
              <div className="absolute -top-4 left-6 w-8 h-8 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full flex items-center justify-center font-bold text-gray-900 text-sm">2</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3 mt-2">Track execution</h3>
              <p className="text-gray-600 text-sm">Monitor progress across joint initiatives, milestones, and activities.</p>
            </div>
            
            <div className="bg-gray-50/50 backdrop-blur border border-gray-200 rounded-xl p-8 relative">
              <div className="absolute -top-4 left-6 w-8 h-8 bg-gradient-to-r from-purple-400 to-purple-500 rounded-full flex items-center justify-center font-bold text-gray-900 text-sm">3</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3 mt-2">Measure partnership health</h3>
              <p className="text-gray-600 text-sm">Evaluate partnerships across multiple dimensions including performance, engagement, and strategic alignment.</p>
            </div>
            
            <div className="bg-gray-50/50 backdrop-blur border border-gray-200 rounded-xl p-8 relative">
              <div className="absolute -top-4 left-6 w-8 h-8 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full flex items-center justify-center font-bold text-gray-900 text-sm">4</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3 mt-2">Surface leadership insights</h3>
              <p className="text-gray-600 text-sm">Provide executives with portfolio-level insights into ecosystem performance and risk.</p>
            </div>
          </div>
          
          <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto">
            This gives executives a complete view of their partnership portfolio.
          </p>
        </div>
      </section>


      {/* AI-Powered Insights */}
      <section className="py-20 border-t border-gray-100 bg-gray-50">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8 tracking-tight">
              Turn partnership data into actionable insight
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Partegy analyzes partnership activity, initiative progress, and revenue signals to surface insights that would otherwise remain hidden.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
            <div className="bg-gray-50/50 backdrop-blur border border-gray-200 rounded-xl p-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">This helps leaders:</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start space-x-2"><span className="text-emerald-400 mt-1">•</span><span>Detect early partnership risk</span></li>
                <li className="flex items-start space-x-2"><span className="text-emerald-400 mt-1">•</span><span>Identify stalled initiatives</span></li>
                <li className="flex items-start space-x-2"><span className="text-emerald-400 mt-1">•</span><span>Understand where resources should be invested</span></li>
                <li className="flex items-start space-x-2"><span className="text-emerald-400 mt-1">•</span><span>Intervene before revenue impact occurs</span></li>
              </ul>
            </div>
            
            <div className="bg-gray-50/50 backdrop-blur border border-gray-200 rounded-xl p-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">The platform surfaces signals such as:</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start space-x-2"><span className="text-red-400 mt-1">•</span><span>Declining partner engagement</span></li>
                <li className="flex items-start space-x-2"><span className="text-red-400 mt-1">•</span><span>Initiatives falling behind plan</span></li>
                <li className="flex items-start space-x-2"><span className="text-red-400 mt-1">•</span><span>Partnerships delivering lower-than-expected impact</span></li>
                <li className="flex items-start space-x-2"><span className="text-red-400 mt-1">•</span><span>Misalignment between strategy and execution</span></li>
              </ul>
            </div>
          </div>
          
          <p className="text-lg text-gray-500 text-center max-w-3xl mx-auto italic">
            AI surfaces insights, while leaders remain in control of decisions.
          </p>
        </div>
      </section>

      <section className="py-20 border-t border-gray-100 bg-gray-50">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8 tracking-tight">
              Give leadership the answers they're asking for
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-12">
              Partegy enables leadership teams to manage partnerships as a strategic portfolio.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-8">
            <div className="bg-gray-50/50 backdrop-blur border border-gray-200 rounded-xl p-6">
              <div className="text-emerald-400 font-semibold mb-2">Investment Decisions</div>
              <div className="text-gray-600 text-sm">Which partnerships deserve more investment</div>
            </div>
            <div className="bg-gray-50/50 backdrop-blur border border-gray-200 rounded-xl p-6">
              <div className="text-blue-400 font-semibold mb-2">Initiative Performance</div>
              <div className="text-gray-600 text-sm">Which initiatives are delivering results</div>
            </div>
            <div className="bg-gray-50/50 backdrop-blur border border-gray-200 rounded-xl p-6">
              <div className="text-purple-400 font-semibold mb-2">Risk Management</div>
              <div className="text-gray-600 text-sm">Which relationships require intervention</div>
            </div>
            <div className="bg-gray-50/50 backdrop-blur border border-gray-200 rounded-xl p-6">
              <div className="text-orange-400 font-semibold mb-2">Resource Allocation</div>
              <div className="text-gray-600 text-sm">Where resources may be misallocated</div>
            </div>
          </div>
          
          <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-12">
            Instead of reacting to declining revenue, leadership can act proactively.
          </p>
          
          {/* Executive Dashboard Preview */}
          <div className="max-w-5xl mx-auto mt-16">
            <div className="bg-gray-50/50 backdrop-blur-xl border border-gray-200 rounded-2xl overflow-hidden shadow-2xl">
              <div className="relative h-[600px] overflow-hidden">
                <div className="animate-slow-scroll">
                  <img 
                    src="/executive-dashboard.png" 
                    alt="Partegy Executive Dashboard showing portfolio metrics, risk matrix, and AI insights"
                    className="w-full h-auto"
                  />
                </div>
                {/* Gradient overlays for fade effect */}
                <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-slate-900/80 to-transparent pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-slate-900/80 to-transparent pointer-events-none"></div>
              </div>
              
              {/* Live indicator */}
              <div className="absolute top-4 right-4 flex items-center space-x-2 bg-slate-900/90 backdrop-blur px-3 py-2 rounded-lg border border-gray-200">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                <span className="text-gray-600 text-sm font-medium">LIVE EXECUTIVE VIEW</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Core 3 Benefits - Authoritative Content */}


      <section className="py-20 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Partnership Asset Management */}
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-emerald-400 to-blue-400 rounded-2xl flex items-center justify-center mx-auto mb-8">
                <Gauge className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Partnership Asset Management</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Stop managing $100M relationships in $0 spreadsheets. Our patented Partnership Intelligence system treats partnerships as structured, measurable, and enduring organizational assets.
              </p>
              <div className="bg-gray-50/30 border border-gray-200 rounded-xl p-6">
                <div className="text-sm text-emerald-400 font-semibold mb-2">OUTCOME:</div>
                <div className="text-gray-600 text-sm">Revenue alone is a lagging indicator. We synthesize engagement density, execution velocity, and mutual value exchange into a single, proprietary predictive signal. Equip the CFO with the same visibility into partnership ROI that they have for R&D or Sales spend.</div>
              </div>
            </div>

            {/* Strategy-to-Execution Continuity */}
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl flex items-center justify-center mx-auto mb-8">
                <Target className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Strategy-to-Execution Continuity</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Most tools stop at the plan. Others stop at the task. Partegy is the only system that explicitly links high-level strategic intent to day-to-day outcomes.
              </p>
              <div className="bg-gray-50/30 border border-gray-200 rounded-xl p-6">
                <div className="text-sm text-blue-400 font-semibold mb-2">OUTCOME:</div>
                <div className="text-gray-600 text-sm">Explicitly link strategic objectives to initiatives. Track intent → action → outcome in **The System of Record for Partnership State**.</div>
              </div>
            </div>

            {/* Executive-Level Intelligence */}
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl flex items-center justify-center mx-auto mb-8">
                <Brain className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Executive-Level Intelligence</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                AI synthesizes partnership context to generate executive summaries, identify risks, and recommend interventions.
              </p>
              <div className="bg-gray-50/30 border border-gray-200 rounded-xl p-6">
                <div className="text-sm text-purple-400 font-semibold mb-2">OUTCOME:</div>
                <div className="text-gray-600 text-sm">Get answers to "Should I worry?" and "Where should I intervene?" — enabling strategic capital reallocation based on partnership performance data.</div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Final CTA - Irresistible Offer */}
      <section className="py-20 bg-gradient-to-r from-slate-900 to-slate-800 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8 tracking-tight">
            See your ecosystem's true health
          </h2>
          <p className="text-xl text-gray-600 mb-12 leading-relaxed">
            Get early access to how Partegy helps leaders govern strategic partnerships like assets.
          </p>
          
          <div className="flex justify-center mb-12">
            <button
              onClick={handleGetAudit}
              className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white px-8 py-4 rounded-lg font-semibold text-lg flex items-center justify-center transition-all shadow-lg"
            >
              Request Early Access
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="flex space-x-1">
                <div className="w-3 h-3 bg-emerald-400 rounded-sm"></div>
                <div className="w-3 h-3 bg-blue-400 rounded-sm"></div>
              </div>
              <div className="text-xl font-bold text-white">Partegy</div>
            </div>
            
            <div className="flex items-center justify-center mb-4">
              <span className="text-gray-400 text-xs font-medium tracking-wider uppercase border border-gray-100 px-3 py-1.5 rounded-md bg-slate-900/40">
                Patent Pending
              </span>
            </div>
            
            <p className="text-gray-500 mb-8">
              The strategic governance layer for enterprise partnerships
            </p>
            <div className="flex space-x-6 justify-center text-gray-400 text-sm">
              <a href="/privacy" className="hover:text-gray-500 transition-colors">Privacy Policy</a>
              <a href="/terms" className="hover:text-gray-500 transition-colors">Terms of Service</a>
              <a href="/contact" className="hover:text-gray-500 transition-colors">Contact</a>
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
