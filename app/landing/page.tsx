'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowRight, CheckCircle, BarChart3, Shield, Brain, Activity,
  Users, Target, Monitor, Play
} from 'lucide-react';
import LeadCaptureModal from '../../components/LeadCaptureModal';

export default function LandingPage() {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'demo' | 'audit'>('demo');

  const handleWatchDemo = () => { setModalType('demo'); setModalOpen(true); };
  const handleGetAudit = () => { setModalType('audit'); setModalOpen(true); };

  return (
    <div className="min-h-screen bg-white">

      {/* NAV */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <img src="/partegy-logo.png" alt="Partegy" className="h-12 w-auto" />
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            {['Product', 'Solutions', 'Customers', 'Resources'].map(item => (
              <span key={item} className="text-gray-600 hover:text-gray-900 text-sm font-medium cursor-pointer transition-colors">{item}</span>
            ))}
          </nav>
          <div className="flex items-center space-x-3">
            <button onClick={handleWatchDemo}
              className="hidden sm:block text-sm font-medium px-4 py-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors">
              Sign In
            </button>
            <button onClick={handleWatchDemo}
              className="text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
              style={{backgroundColor: '#0B3D91'}}>
              Request Early Access
            </button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full text-sm font-medium mb-6 border"
              style={{backgroundColor: '#EFF6FF', borderColor: '#BFDBFE', color: '#1E40AF'}}>
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse inline-block"></span>
              <span>Now in early access — limited spots available</span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold leading-tight tracking-tight mb-6" style={{color: '#0B3D91'}}>
              Partnership governance,<br />built for executives.
            </h1>
            <p className="text-xl text-gray-500 leading-relaxed mb-10 max-w-2xl mx-auto">
              Partegy gives leadership teams consistent visibility across their partnership portfolio — health scoring, behavioral intelligence, and risk signals, all in one platform.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button onClick={handleWatchDemo}
                className="w-full sm:w-auto text-white font-semibold px-8 py-4 rounded-xl text-base transition-all shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                style={{backgroundColor: '#0B3D91'}}>
                <span>Request Early Access</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button onClick={handleWatchDemo}
                className="w-full sm:w-auto font-semibold px-8 py-4 rounded-xl text-base border-2 transition-all flex items-center justify-center space-x-2"
                style={{borderColor: '#0B3D91', color: '#0B3D91'}}>
                <Play className="w-4 h-4" />
                <span>Watch Demo</span>
              </button>
            </div>
          </div>

          {/* Dashboard screenshot */}
          <div className="relative max-w-5xl mx-auto">
            <div className="absolute inset-0 rounded-2xl blur-3xl opacity-10" style={{background: 'linear-gradient(135deg, #0B3D91, #2EC4D2)'}}></div>
            <div className="relative bg-white border border-gray-200 rounded-2xl shadow-2xl overflow-hidden">
              <div className="bg-gray-50 border-b border-gray-100 px-4 py-3 flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                <div className="ml-4 flex-1 bg-white rounded-md px-3 py-1 text-xs text-gray-400 border border-gray-200 max-w-xs">partegy.co/executive</div>
              </div>
              <img
                src="/partnership-dashboard1.png"
                alt="Partegy Executive Dashboard"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* LOGO STRIP */}
      <section className="py-12 border-y border-gray-100 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <p className="text-center text-sm font-medium text-gray-400 uppercase tracking-widest mb-8">Trusted by partnership teams at</p>
          <div className="flex flex-wrap items-center justify-center gap-12">
            {['Workday Impl Co', 'Enterprise Corp', 'Global Ventures', 'TechScale Inc', 'Alliance Group'].map(name => (
              <span key={name} className="text-gray-300 font-bold text-lg tracking-tight">{name}</span>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{color: '#0B3D91'}}>
              Partnerships drive revenue.<br />Most companies can't govern them.
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              Partner ecosystems have become a major growth engine — yet most organizations lack the infrastructure to manage them at scale.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { stat: '~28%', label: 'of company revenue from mature partnership programs', color: '#0B3D91' },
              { stat: '$80T', label: 'projected ecosystem economic activity by 2030', color: '#1E7EC8' },
              { stat: '36%', label: 'of organizations consistently measure ecosystem performance', color: '#2EC4D2' },
            ].map((item, idx) => (
              <div key={idx} className="text-center p-8 rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow">
                <div className="text-5xl font-black mb-3" style={{color: item.color}}>{item.stat}</div>
                <p className="text-gray-500 leading-relaxed">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES - alternating layout like Workday */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-24">

          {/* Feature 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-semibold mb-6 uppercase tracking-wide"
                style={{backgroundColor: '#EFF6FF', color: '#1E40AF'}}>
                <BarChart3 className="w-3.5 h-3.5" />
                <span>Health Scoring</span>
              </div>
              <h3 className="text-3xl font-bold mb-4" style={{color: '#0B3D91'}}>
                Give leadership answers, not spreadsheets.
              </h3>
              <p className="text-gray-500 text-lg leading-relaxed mb-6">
                Partegy's proprietary 6-dimension health score gives executives a single number that reflects the true state of each partnership — not just revenue, but engagement, alignment, risk, and execution velocity.
              </p>
              <ul className="space-y-3">
                {['6-dimension behavioral health scoring', 'Real-time portfolio risk matrix', 'Executive-ready dashboards'].map(item => (
                  <li key={item} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 flex-shrink-0" style={{color: '#2EC4D2'}} />
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
              <img src="/executive-dashboard.png" alt="Executive Dashboard" className="w-full h-auto" />
            </div>
          </div>

          {/* Feature 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 bg-white rounded-2xl border border-gray-200 shadow-lg p-8">
              <div className="space-y-4">
                {[
                  { signal: 'Executive engagement declined 47%', level: 'Critical', color: '#EF4444' },
                  { signal: '3 strategic initiatives stalled 30+ days', level: 'High', color: '#F59E0B' },
                  { signal: 'Relationship drift below baseline', level: 'Medium', color: '#6B7280' },
                  { signal: '41% pipeline on 2 partners', level: 'Critical', color: '#EF4444' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 rounded-xl border border-gray-100 bg-gray-50">
                    <span className="text-gray-700 text-sm font-medium">{item.signal}</span>
                    <span className="text-xs font-bold px-2 py-1 rounded-full text-white" style={{backgroundColor: item.color}}>{item.level}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-semibold mb-6 uppercase tracking-wide"
                style={{backgroundColor: '#FEF3C7', color: '#92400E'}}>
                <Brain className="w-3.5 h-3.5" />
                <span>Behavioral Intelligence</span>
              </div>
              <h3 className="text-3xl font-bold mb-4" style={{color: '#0B3D91'}}>
                Know what's at risk before it costs you.
              </h3>
              <p className="text-gray-500 text-lg leading-relaxed mb-6">
                Partegy's AI-powered early warning system detects engagement drift, stalled initiatives, and concentration risk — surfacing signals weeks before they become problems.
              </p>
              <ul className="space-y-3">
                {['AI-detected relationship signals', 'Proactive risk alerts', 'Predictive partnership intelligence'].map(item => (
                  <li key={item} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 flex-shrink-0" style={{color: '#2EC4D2'}} />
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-semibold mb-6 uppercase tracking-wide"
                style={{backgroundColor: '#F0FDF4', color: '#166534'}}>
                <Users className="w-3.5 h-3.5" />
                <span>Relationship Intelligence</span>
              </div>
              <h3 className="text-3xl font-bold mb-4" style={{color: '#0B3D91'}}>
                Map every relationship. Own every outcome.
              </h3>
              <p className="text-gray-500 text-lg leading-relaxed mb-6">
                Track who on your team owns each partner relationship, monitor engagement health, and get notified when relationships go cold — before it impacts revenue.
              </p>
              <ul className="space-y-3">
                {['Relationship owner mapping', 'Configurable notification cadences', 'Departed contact alerts'].map(item => (
                  <li key={item} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 flex-shrink-0" style={{color: '#2EC4D2'}} />
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-8">
              <div className="space-y-4">
                {[
                  { name: 'John Smith', role: 'Executive Sponsor', owner: 'Chris P.', health: 72, status: 'stale' },
                  { name: 'Sarah Johnson', role: 'Account Manager', owner: 'Amanda T.', health: 85, status: 'active' },
                  { name: 'Lisa Park', role: 'Marketing Manager', owner: 'Unassigned', health: 0, status: 'departed' },
                ].map((contact, idx) => (
                  <div key={idx} className={`flex items-center justify-between p-4 rounded-xl border ${contact.status === 'departed' ? 'border-red-100 bg-red-50' : 'border-gray-100 bg-gray-50'}`}>
                    <div>
                      <div className="font-semibold text-gray-800 text-sm">{contact.name}</div>
                      <div className="text-gray-400 text-xs">{contact.role} — owned by {contact.owner}</div>
                    </div>
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                      contact.status === 'active' ? 'bg-emerald-100 text-emerald-700' :
                      contact.status === 'stale' ? 'bg-amber-100 text-amber-700' :
                      'bg-red-100 text-red-600'
                    }`}>
                      {contact.status === 'departed' ? 'Departed' : contact.status === 'stale' ? 'Stale' : `${contact.health}%`}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CURRENT STACK ISN'T ENOUGH */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{color: '#0B3D91'}}>
              Why your current stack isn't enough
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">Your tools track transactions. Partegy governs relationships.</p>
          </div>
          <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
            {/* Header */}
            <div className="grid grid-cols-3 text-white text-sm font-semibold" style={{backgroundColor: '#0B3D91'}}>
              <div className="p-5 border-r border-white/20">System</div>
              <div className="p-5 border-r border-white/20">What it does</div>
              <div className="p-5 bg-red-700/30">What it misses</div>
            </div>
            {[
              { system: 'CRM', does: 'Pipeline & Revenue', misses: 'Strategic Alignment' },
              { system: 'PRM', does: 'Portals & Referrals', misses: 'Inter-org Governance' },
              { system: 'Spreadsheets', does: 'Manual Strategy', misses: 'Real-time Governance & AI' },
            ].map((row, idx) => (
              <div key={idx} className={`grid grid-cols-3 border-t border-gray-100 ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                <div className="p-5 border-r border-gray-100 font-semibold text-gray-800">{row.system}</div>
                <div className="p-5 border-r border-gray-100 text-gray-500">{row.does}</div>
                <div className="p-5 bg-red-50">
                  <span className="text-red-600 font-semibold">{row.misses}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24" style={{background: 'linear-gradient(135deg, #0B3D91 0%, #1E7EC8 60%, #2EC4D2 100%)'}}>
        <div className="max-w-3xl mx-auto px-6 sm:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
            See your ecosystem's true health.
          </h2>
          <p className="text-xl text-blue-100 mb-10 leading-relaxed">
            Get early access to see how Partegy helps leaders govern strategic partnerships like assets.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button onClick={handleWatchDemo}
              className="w-full sm:w-auto bg-white font-bold px-8 py-4 rounded-xl text-base transition-all hover:bg-blue-50 shadow-lg"
              style={{color: '#0B3D91'}}>
              Request Early Access
            </button>
            <button onClick={handleGetAudit}
              className="w-full sm:w-auto border-2 border-white/40 text-white font-semibold px-8 py-4 rounded-xl text-base transition-all hover:bg-white/10">
              Book a Live Session
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white border-t border-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center space-x-2">
              <img src="/partegy-logo.png" alt="Partegy" className="h-7 w-auto" />
              <span className="text-gray-300 ml-4 text-sm">© 2026 Partegy, Inc.</span>
            </div>
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <a href="/privacy" className="hover:text-gray-600 transition-colors">Privacy</a>
              <a href="/terms" className="hover:text-gray-600 transition-colors">Terms</a>
              <a href="/contact" className="hover:text-gray-600 transition-colors">Contact</a>
            </div>
            <div className="text-xs text-gray-300">Patent Pending</div>
          </div>
        </div>
      </footer>

      {modalOpen && (
        <LeadCaptureModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          type={modalType}
        />
      )}
    </div>
  );
}
