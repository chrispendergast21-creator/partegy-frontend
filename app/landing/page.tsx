'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, CheckCircle, BarChart3, Shield, Brain, Activity, Users, Target, Monitor, Play } from 'lucide-react';
import LeadCaptureModal from '../../components/LeadCaptureModal';

export default function LandingPage() {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'demo' | 'audit'>('demo');

  const handleRequestAccess = () => { setModalType('demo'); setModalOpen(true); };
  const handleWatchDemo = () => { setModalType('demo'); setModalOpen(true); };
  const handleBookSession = () => { setModalType('audit'); setModalOpen(true); };

  return (
    <div className="min-h-screen bg-white">

      {/* NAV */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <img src="/partegy-logo.png" alt="Partegy" className="h-12 w-auto" />
          </div>
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-600">
            <a href="#platform" className="hover:text-gray-900 transition-colors">Platform</a>
            <a href="#why-partegy" className="hover:text-gray-900 transition-colors">Why Partegy</a>
            <a href="#intelligence" className="hover:text-gray-900 transition-colors">Partnership Intelligence</a>
          </nav>
          <div className="flex items-center">
            <button onClick={handleRequestAccess}
              className="text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
              style={{backgroundColor: '#0B3D91'}}>
              Request Early Access
            </button>
          </div>
        </div>
      </header>

      {/* SECTION 1 — HERO */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6 uppercase tracking-widest"
              style={{backgroundColor: '#EFF6FF', color: '#1E40AF'}}>
              <span>Introducing Partnership Intelligence</span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold leading-tight tracking-tight mb-6" style={{color: '#0B3D91'}}>
              Know which partnerships are worth investing in.
            </h1>
            <p className="text-xl text-gray-500 leading-relaxed mb-10 max-w-2xl mx-auto">
              Your partnerships are strategic business assets. Partegy combines multidimensional partnership health scoring, strategic execution tracking, and AI-driven intelligence to help leaders understand performance, identify emerging risks, and make better decisions about where to invest, intervene, and prioritize.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <button onClick={handleRequestAccess}
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
            <p className="text-sm font-semibold tracking-widest uppercase text-gray-400">Measure. Govern. Optimize.</p>
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
              <img src="/partnership-dashboard1.png" alt="Partegy Partnership Dashboard" className="w-full h-auto" />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 — THE PROBLEM */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6" style={{color: '#0B3D91'}}>
                Partnerships drive growth. But do you really know which ones are delivering value?
              </h2>
              <p className="text-lg text-gray-500 leading-relaxed mb-6">
                Organizations invest significant time, resources, and capital into strategic partnerships. Yet many leadership teams lack a consistent, objective way to understand how those relationships are actually performing.
              </p>
              <p className="text-base text-gray-500 italic mb-8">Revenue and pipeline reveal commercial outcomes, but they don't tell the full story.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {[
                  { q: 'Are your partnerships strategically aligned?', a: 'A relationship can generate revenue while drifting away from the priorities that made it strategically important.' },
                  { q: 'Are your joint business plans translating into execution?', a: 'Shared goals mean little without accountability, measurable progress, and follow-through.' },
                  { q: 'Can you identify risk before performance declines?', a: 'Disengagement, stalled initiatives, and shifting priorities can go unnoticed until they affect business outcomes.' },
                  { q: 'Do you know where to focus your next investment?', a: 'Without a complete view of partnership health, leaders are left making resource allocation decisions with incomplete information.' },
                ].map((item, idx) => (
                  <div key={idx} className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                    <p className="font-semibold text-gray-900 mb-2 text-sm">{item.q}</p>
                    <p className="text-gray-500 text-sm leading-relaxed">{item.a}</p>
                  </div>
                ))}
              </div>
              <p className="text-lg font-semibold" style={{color: '#0B3D91'}}>
                You can't optimize what you can't objectively evaluate.
              </p>
            </div>
            <div className="relative">
              <div className="absolute inset-0 rounded-2xl blur-2xl opacity-10" style={{background: 'linear-gradient(135deg, #0B3D91, #2EC4D2)'}}></div>
              <div className="relative bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden">
                <div className="bg-gray-50 border-b border-gray-100 px-4 py-2.5 flex items-center space-x-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400"></div>
                </div>
                <img src="/partnership-dashboard1.png" alt="Partnership Detail View" className="w-full h-auto" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — INTRODUCING THE CATEGORY */}
      <section id="intelligence" className="py-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 text-center">
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6 uppercase tracking-widest"
            style={{backgroundColor: '#EFF6FF', color: '#1E40AF'}}>
            <span>A New Approach to Strategic Partnerships</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{color: '#0B3D91'}}>Introducing Partnership Intelligence.</h2>
          <p className="text-xl text-gray-500 mb-4 max-w-2xl mx-auto">The intelligence behind better partnership decisions.</p>
          <p className="text-gray-500 leading-relaxed max-w-3xl mx-auto mb-16">
            Partnership Intelligence brings together the strategic, commercial, operational, and relational dimensions of a partnership to create a more complete understanding of its health, performance, and potential. Partegy turns fragmented information and subjective assessments into structured intelligence that helps organizations make better decisions about their strategic relationships.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              { label: 'Measure', icon: BarChart3, desc: 'Understand the health of every strategic relationship.', detail: 'Evaluate partnership health across six interconnected dimensions to understand not only how a relationship is performing, but what is driving its performance.' },
              { label: 'Govern', icon: Target, desc: 'Turn partnership strategy into measurable execution.', detail: 'Connect joint business plans, shared priorities, initiatives, and milestones to ongoing accountability and execution.' },
              { label: 'Optimize', icon: Brain, desc: 'Know where to focus and what to do next.', detail: 'Use AI-driven insights, risk alerts, and actionable recommendations to identify relationships requiring attention and opportunities for improvement.' },
            ].map((item, idx) => (
              <div key={idx} className="text-center p-8 rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4" style={{backgroundColor: '#EFF6FF'}}>
                  <item.icon className="w-6 h-6" style={{color: '#0B3D91'}} />
                </div>
                <h3 className="text-xl font-bold mb-2" style={{color: '#0B3D91'}}>{item.label}</h3>
                <p className="font-medium text-gray-700 mb-3">{item.desc}</p>
                <p className="text-gray-500 text-sm leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>
          <p className="text-gray-500 italic">From partnership visibility to partnership intelligence. From intelligence to action.</p>
        </div>
      </section>

      {/* SECTION 4 — PARTNERSHIP HEALTH SCORING */}
      <section id="platform" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold mb-6 uppercase tracking-wide"
                style={{backgroundColor: '#EFF6FF', color: '#1E40AF'}}>
                Measure What Matters
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{color: '#0B3D91'}}>
                Partnership performance is more than a revenue number.
              </h2>
              <p className="text-lg font-semibold text-gray-700 mb-2">Six dimensions. One connected view of partnership health.</p>
              <p className="text-gray-500 leading-relaxed mb-8">
                Traditional metrics tell you what happened. Partegy helps you understand the broader factors influencing partnership performance. Our six-dimensional Partnership Health Framework evaluates:
              </p>
              <div className="space-y-4">
                {[
                  { name: 'Strategic Alignment', desc: 'Are both organizations aligned on shared objectives, priorities, and long-term strategic value?' },
                  { name: 'Execution Momentum', desc: 'Are joint initiatives, commitments, and milestones progressing as planned?' },
                  { name: 'Commercial Impact', desc: 'Is the partnership contributing meaningful commercial value and business outcomes?' },
                  { name: 'Engagement Cadence', desc: 'Are the right stakeholders consistently engaged and maintaining productive relationships?' },
                  { name: 'Enablement Readiness', desc: 'Do teams have the knowledge, resources, and support needed to execute effectively?' },
                  { name: 'Risk Exposure', desc: 'What emerging threats, dependencies, or vulnerabilities could undermine partnership success?' },
                ].map((dim, idx) => (
                  <div key={idx} className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{color: '#2EC4D2'}} />
                    <div>
                      <span className="font-semibold text-gray-800">{dim.name}</span>
                      <span className="text-gray-500"> — {dim.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-gray-500 text-sm mt-8 italic">
                Partegy brings these dimensions together into structured health intelligence, helping leadership teams evaluate relationships consistently, understand performance drivers, and identify areas requiring attention.
              </p>
            </div>
            <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
              <img src="/executive-dashboard.png" alt="Partnership Health Dashboard" className="w-full h-auto" />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5 — STRATEGIC GOVERNANCE */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 relative">
              <div className="absolute inset-0 rounded-2xl blur-2xl opacity-10" style={{background: 'linear-gradient(135deg, #0B3D91, #2EC4D2)'}}></div>
              <div className="relative bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden">
                <div className="bg-gray-50 border-b border-gray-100 px-4 py-2.5 flex items-center space-x-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400"></div>
                </div>
                <img src="/partner-view.png" alt="Partner Portal View" className="w-full h-auto" />
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold mb-6 uppercase tracking-wide"
                style={{backgroundColor: '#F0FDF4', color: '#166534'}}>
                Govern What Drives Results
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{color: '#0B3D91'}}>
                Stop letting partnership strategy live in forgotten business plans.
              </h2>
              <p className="text-gray-500 leading-relaxed mb-6">
                Strategic partnerships begin with shared ambition. But too often, joint business plans are created, reviewed periodically, and disconnected from day-to-day execution. Partegy brings partnership strategy and execution together.
              </p>
              <div className="space-y-3 mb-6">
                {[
                  { step: 'Align on what matters.', desc: 'Establish shared strategic objectives and define the priorities that will drive partnership success.' },
                  { step: 'Turn priorities into action.', desc: 'Translate business plans into initiatives, milestones, commitments, and measurable outcomes.' },
                  { step: 'Maintain accountability.', desc: 'Track progress, identify stalled activities, and keep teams focused on shared objectives.' },
                  { step: 'Connect execution to partnership health.', desc: 'Understand how progress against strategic commitments contributes to the broader health of the relationship.' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-white text-xs font-bold mt-0.5" style={{backgroundColor: '#0B3D91'}}>{idx + 1}</div>
                    <div>
                      <span className="font-semibold text-gray-800 text-sm">{item.step}</span>
                      <span className="text-gray-500 text-sm"> {item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-gray-700 font-semibold italic text-sm">
                Partnership strategy shouldn't be an annual exercise. It should be a continuously managed business priority.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6 — AI-DRIVEN INTELLIGENCE */}
      <section id="intelligence-detail" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold mb-6 uppercase tracking-wide"
                style={{backgroundColor: '#FEF3C7', color: '#92400E'}}>
                Optimize with Intelligence
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{color: '#0B3D91'}}>
                Don't just measure partnership health. Know what to do about it.
              </h2>
              <p className="text-gray-500 leading-relaxed mb-6">
                A partnership health score is only valuable if it helps your organization make better decisions. Partegy combines health assessments, execution signals, and AI-driven analysis to surface insights that help teams act before problems escalate.
              </p>
              <div className="space-y-4 mb-8">
                {[
                  { title: 'Identify emerging risks.', desc: 'Detect warning signs across partnership health and execution that may require intervention.' },
                  { title: 'Understand what is driving performance.', desc: 'Look beyond an overall score to identify the strategic, commercial, operational, and relational factors influencing a partnership.' },
                  { title: 'Prioritize the right actions.', desc: 'Use automated recommendations to help teams focus on the issues and opportunities that matter.' },
                  { title: 'Make more informed investment decisions.', desc: 'Give leadership greater context when deciding which relationships to develop, where to intervene, and how to prioritize attention and resources.' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{color: '#2EC4D2'}} />
                    <div>
                      <span className="font-semibold text-gray-800">{item.title}</span>
                      <span className="text-gray-500"> {item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-gray-700 italic">Less time interpreting fragmented information. More time making informed decisions.</p>
            </div>
            <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-8">
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
          </div>
        </div>
      </section>

      {/* SECTION 7 — EXECUTIVE PORTFOLIO INTELLIGENCE */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold mb-6 uppercase tracking-widest"
                style={{backgroundColor: '#EFF6FF', color: '#1E40AF'}}>
                The Executive View
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{color: '#0B3D91'}}>Your partnership portfolio. Finally, a clearer picture.</h2>
              <p className="text-gray-500 leading-relaxed mb-8">
                Every strategic partnership represents an investment of organizational time, resources, and opportunity. Partegy helps leadership teams move beyond individual relationship updates to understand the health and performance of their partnership portfolio.
              </p>
              <div className="space-y-4 mb-8">
                {[
                  { q: 'Which partnerships are performing well?', a: 'Identify relationships demonstrating strong health, execution, and strategic alignment.' },
                  { q: 'Which partnerships need intervention?', a: 'Surface relationships experiencing declining health, execution challenges, or emerging risks.' },
                  { q: 'Where are opportunities being overlooked?', a: 'Recognize partnerships with promising strategic potential that may require additional attention.' },
                  { q: 'Where should we focus our resources?', a: 'Use a more complete understanding of partnership performance to inform portfolio priorities and investment discussions.' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{color: '#2EC4D2'}} />
                    <div>
                      <span className="font-semibold text-gray-800 text-sm">{item.q}</span>
                      <span className="text-gray-500 text-sm"> {item.a}</span>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-gray-700 font-semibold italic text-sm">Better partnership intelligence leads to more intentional partnership investments.</p>
            </div>
            <div className="relative">
              <div className="absolute inset-0 rounded-2xl blur-2xl opacity-10" style={{background: 'linear-gradient(135deg, #0B3D91, #2EC4D2)'}}></div>
              <div className="relative bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden">
                <div className="bg-gray-50 border-b border-gray-100 px-4 py-2.5 flex items-center space-x-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400"></div>
                </div>
                <img src="/portfolio-view.png" alt="Executive Portfolio Dashboard" className="w-full h-auto" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8 — WHY PARTEGY */}
      <section id="why-partegy" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold mb-6 uppercase tracking-widest"
              style={{backgroundColor: '#EFF6FF', color: '#1E40AF'}}>
              Beyond Traditional Partner Management
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{color: '#0B3D91'}}>
              Your existing systems capture activity. Partegy connects the bigger picture.
            </h2>
          </div>
          <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm mb-12">
            <div className="grid grid-cols-3 text-white text-sm font-semibold" style={{backgroundColor: '#0B3D91'}}>
              <div className="p-5 border-r border-white/20">System</div>
              <div className="p-5 border-r border-white/20">What it does</div>
              <div className="p-5">What it misses</div>
            </div>
            {[
              { system: 'CRM', does: 'Track opportunities, pipeline, and revenue.', misses: 'Strategic alignment, execution, engagement, readiness, and risk.' },
              { system: 'PRM', does: 'Manage partner programs, engagement, and channel operations.', misses: 'Inter-org governance and strategic relationship health.' },
              { system: 'BI Tools', does: 'Analyze and report on available data.', misses: 'Connecting commercial outcomes with the full picture of partnership health.' },
            ].map((row, idx) => (
              <div key={idx} className={`grid grid-cols-3 border-t border-gray-100 ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                <div className="p-5 border-r border-gray-100 font-semibold text-gray-800">{row.system}</div>
                <div className="p-5 border-r border-gray-100 text-gray-500 text-sm">{row.does}</div>
                <div className="p-5 text-gray-500 text-sm">{row.misses}</div>
              </div>
            ))}
          </div>
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-gray-500 leading-relaxed mb-8">
              Partegy is purpose-built for that challenge. Rather than treating partnerships solely as channels for transactions or collections of activities, Partegy provides a dedicated framework for evaluating, governing, and improving the strategic relationship itself.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left mb-8">
              {[
                'Multidimensional partnership health scoring',
                'Joint strategic planning and execution governance',
                'AI-driven risk identification and recommendations',
                'Executive-level partnership portfolio visibility',
              ].map((item, idx) => (
                <div key={idx} className="flex items-center space-x-3 bg-white rounded-xl border border-gray-100 p-4">
                  <CheckCircle className="w-5 h-5 flex-shrink-0" style={{color: '#2EC4D2'}} />
                  <span className="text-gray-700 text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>
            <p className="text-gray-700 font-semibold italic">Not another place to store partnership information. A better way to turn it into intelligence.</p>
          </div>
        </div>
      </section>

      {/* SECTION 9 — BUILT FOR PARTNERSHIP DECISION-MAKERS */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{color: '#0B3D91'}}>
              The right intelligence for every level of your organization.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                role: 'For CEOs, CROs, and CFOs',
                headline: 'Make better strategic investment decisions.',
                desc: 'Gain a more complete understanding of partnership performance, risk, and strategic value to inform portfolio priorities and resource allocation.',
                icon: Monitor,
              },
              {
                role: 'For Partnership Executives',
                headline: 'Manage your portfolio with greater confidence.',
                desc: 'Move beyond subjective relationship updates with consistent health measurement, structured governance, and actionable insights.',
                icon: Target,
              },
              {
                role: 'For Partnership Teams',
                headline: 'Turn strategic priorities into measurable progress.',
                desc: 'Align stakeholders, track commitments, manage joint initiatives, and identify issues requiring attention.',
                icon: Users,
              },
            ].map((item, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{backgroundColor: '#EFF6FF'}}>
                  <item.icon className="w-6 h-6" style={{color: '#0B3D91'}} />
                </div>
                <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{color: '#1E40AF'}}>{item.role}</p>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{item.headline}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 10 — FINAL CTA */}
      <section className="py-24" style={{background: 'linear-gradient(135deg, #0B3D91 0%, #1E7EC8 60%, #2EC4D2 100%)'}}>
        <div className="max-w-3xl mx-auto px-6 sm:px-8 text-center">
          <div className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold mb-6 uppercase tracking-widest bg-white/20 text-white">
            Partnership Intelligence Starts Here
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
            Know where to invest. Know when to intervene. Know what comes next.
          </h2>
          <p className="text-xl text-blue-100 mb-10 leading-relaxed">
            Your strategic partnerships deserve more than fragmented data, disconnected plans, and subjective assessments. Partegy brings partnership health, strategic execution, and AI-driven intelligence together so your organization can manage its most important relationships with greater clarity and confidence.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button onClick={handleRequestAccess}
              className="w-full sm:w-auto bg-white font-bold px-8 py-4 rounded-xl text-base transition-all hover:bg-blue-50 shadow-lg"
              style={{color: '#0B3D91'}}>
              Request Early Access
            </button>
            <button onClick={handleBookSession}
              className="w-full sm:w-auto border-2 border-white/40 text-white font-semibold px-8 py-4 rounded-xl text-base transition-all hover:bg-white/10">
              Book a Live Session
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white border-t border-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-8">
            <div className="flex items-center space-x-3">
              <img src="/partegy-logo.png" alt="Partegy" className="h-7 w-auto" />
              <span className="text-sm text-gray-500 font-medium">Partnership Intelligence. Measure. Govern. Optimize.</span>
            </div>
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <a href="#platform" className="hover:text-gray-600 transition-colors">Platform</a>
              <a href="#intelligence" className="hover:text-gray-600 transition-colors">Partnership Intelligence</a>
              <a href="/contact" className="hover:text-gray-600 transition-colors">Contact</a>
              <a href="/privacy" className="hover:text-gray-600 transition-colors">Privacy</a>
              <a href="/terms" className="hover:text-gray-600 transition-colors">Terms</a>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-6 border-t border-gray-100">
            <p className="text-xs text-gray-400">© 2026 Partegy, Inc. Partnership Intelligence for Strategic Business Relationships.</p>
            <p className="text-xs text-gray-400">Patent Pending</p>
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
