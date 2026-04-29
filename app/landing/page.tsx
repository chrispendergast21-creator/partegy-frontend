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
                The Governance Layer for Strategic Partnerships
              </h1>
              
              <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                CRMs track pipeline. PRMs track referrals. Partegy tracks the health and execution of the strategy itself. 
                Stop managing your most valuable assets in spreadsheets.
              </p>
              
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <button
                  onClick={handleWatchDemo}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-lg font-semibold text-lg flex items-center justify-center transition-all shadow-lg"
                >
                  <Play className="w-5 h-5 mr-2" />
                  See Partnership Intelligence Demo
                </button>
                <button
                  onClick={handleGetAudit}
                  className="border border-slate-600 hover:border-slate-500 text-slate-300 hover:text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all"
                >
                  Get Partnership Health Audit Sample
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
              Eliminate Institutional Amnesia
            </h2>
            <p className="text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
              When a Lead Alliance Manager leaves, the partnership shouldn't go dark. Partegy captures the 'why' behind every deal, preventing value leakage and ensuring continuity from day one of the new hire.
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
            <button
              onClick={handleGetAudit}
              className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all shadow-lg"
            >
              Get Partnership Health Audit Sample
            </button>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-slate-400 text-sm">
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4" />
              <span>SOC 2 Compliant</span>
            <div className="flex items-center space-x-2">
              <span className="text-slate-500 text-sm">Integrates with Enterprise Stack:</span>
              <div className="flex items-center space-x-3 opacity-60">
                <span className="text-xs text-slate-400 px-2 py-1 bg-slate-800 rounded">Workday</span>
                <span className="text-xs text-slate-400 px-2 py-1 bg-slate-800 rounded">SAP</span>
                <span className="text-xs text-slate-400 px-2 py-1 bg-slate-800 rounded">Oracle</span>
                <span className="text-xs text-slate-400 px-2 py-1 bg-slate-800 rounded">Salesforce</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4" />
              <span>Built on patented Partnership Intelligence technology</span>
            </div>
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
