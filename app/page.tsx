'use client';

import { useState } from 'react';
import { ArrowRight, Play, CheckCircle } from 'lucide-react';
import LeadCaptureModal from '../components/LeadCaptureModal';

export default function LandingPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'demo' | 'audit'>('demo');

  const handleRequestAccess = () => { setModalType('demo'); setModalOpen(true); };
  const handleWatchDemo = () => { setModalType('demo'); setModalOpen(true); };
  const handleBookSession = () => { setModalType('audit'); setModalOpen(true); };

  return (
    <div className="min-h-screen bg-white" style={{fontFamily: 'Inter, system-ui, sans-serif'}}>

      {/* NAVIGATION */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 py-4 flex items-center justify-between">
          <img src="/partegy-logo.png" alt="Partegy" className="h-10 w-auto" />
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-600">
            <a href="#platform" className="hover:text-gray-900 transition-colors">Platform</a>
            <a href="#why-partegy" className="hover:text-gray-900 transition-colors">Why Partegy</a>
            <a href="#intelligence" className="hover:text-gray-900 transition-colors">Partnership Intelligence</a>
          </nav>
          <button onClick={handleRequestAccess}
            className="text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-opacity hover:opacity-90"
            style={{backgroundColor: '#0B3D91'}}>
            Request Early Access
          </button>
        </div>
      </header>

      {/* SECTION 1 — HERO */}
      <section className="pt-20 pb-16 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <div className="max-w-3xl mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest mb-5" style={{color: '#0B3D91'}}>
              Introducing Partnership Intelligence
            </p>
            <h1 className="text-5xl sm:text-6xl font-bold leading-[1.1] tracking-tight mb-6" style={{color: '#0B1F4B'}}>
              Know which partnerships are worth investing in.
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed mb-8 max-w-2xl">
              Your partnerships are strategic business assets. Partegy combines multidimensional partnership health scoring, strategic execution tracking, and AI-driven intelligence to help leaders understand performance, identify emerging risks, and make better decisions about where to invest, intervene, and prioritize.
            </p>
            <div className="flex flex-col sm:flex-row items-start gap-3 mb-10">
              <button onClick={handleRequestAccess}
                className="flex items-center space-x-2 text-white font-semibold px-6 py-3 rounded-lg transition-opacity hover:opacity-90"
                style={{backgroundColor: '#0B3D91'}}>
                <span>Request Early Access</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button onClick={handleWatchDemo}
                className="flex items-center space-x-2 font-semibold px-6 py-3 rounded-lg border transition-colors hover:bg-gray-50"
                style={{borderColor: '#D1D5DB', color: '#374151'}}>
                <Play className="w-4 h-4" />
                <span>Watch Demo</span>
              </button>
            </div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">Measure. Govern. Optimize.</p>
          </div>

          {/* Suggested visual: executive portfolio dashboard */}
          <div className="rounded-2xl border border-gray-200 shadow-xl overflow-hidden bg-white">
            <div className="border-b border-gray-100 px-5 py-3 bg-gray-50 flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <div className="w-3 h-3 rounded-full bg-amber-400"></div>
              <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
              <span className="ml-3 text-xs text-gray-400">partegy.co/executive</span>
            </div>
            <img src="/portfolio-view.png" alt="Partegy executive portfolio dashboard" className="w-full h-auto" />
          </div>
        </div>
      </section>

      {/* SECTION 2 — THE PROBLEM */}
      <section className="py-20 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <div className="max-w-3xl">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 leading-tight" style={{color: '#0B1F4B'}}>
              Partnerships drive growth. But do you really know which ones are delivering value?
            </h2>
            <p className="text-lg text-gray-500 leading-relaxed mb-8">
              Organizations invest significant time, resources, and capital into strategic partnerships. Yet many leadership teams lack a consistent, objective way to understand how those relationships are actually performing.
            </p>
            <p className="text-gray-400 italic mb-10">
              Revenue and pipeline reveal commercial outcomes, but they don't tell the full story.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-12">
              {[
                {
                  q: 'Are your partnerships strategically aligned?',
                  a: 'A relationship can generate revenue while drifting away from the priorities that made it strategically important.',
                },
                {
                  q: 'Are your joint business plans translating into execution?',
                  a: 'Shared goals mean little without accountability, measurable progress, and follow-through.',
                },
                {
                  q: 'Can you identify risk before performance declines?',
                  a: 'Disengagement, stalled initiatives, and shifting priorities can go unnoticed until they affect business outcomes.',
                },
                {
                  q: 'Do you know where to focus your next investment?',
                  a: 'Without a complete view of partnership health, leaders are left making resource allocation decisions with incomplete information.',
                },
              ].map((item, idx) => (
                <div key={idx} className="p-6 rounded-xl border border-gray-200 bg-white">
                  <p className="font-semibold text-gray-900 mb-2 text-sm leading-snug">{item.q}</p>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
            <p className="text-xl font-bold" style={{color: '#0B3D91'}}>
              You can't optimize what you can't objectively evaluate.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3 — INTRODUCING THE CATEGORY */}
      <section id="intelligence" className="py-20 border-b border-gray-100 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest mb-5" style={{color: '#0B3D91'}}>
            A New Approach to Strategic Partnerships
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 leading-tight" style={{color: '#0B1F4B'}}>
                Introducing Partnership Intelligence.
              </h2>
              <p className="text-lg font-medium text-gray-700 mb-5">The intelligence behind better partnership decisions.</p>
              <p className="text-gray-500 leading-relaxed mb-5">
                Partnership Intelligence brings together the strategic, commercial, operational, and relational dimensions of a partnership to create a more complete understanding of its health, performance, and potential.
              </p>
              <p className="text-gray-500 leading-relaxed mb-8">
                Partegy turns fragmented information and subjective assessments into structured intelligence that helps organizations make better decisions about their strategic relationships.
              </p>
              <p className="text-sm italic text-gray-400">
                From partnership visibility to partnership intelligence. From intelligence to action.
              </p>
            </div>
            <div className="space-y-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">Three connected pillars</p>
              {[
                {
                  label: 'Measure',
                  headline: 'Understand the health of every strategic relationship.',
                  body: 'Evaluate partnership health across six interconnected dimensions to understand not only how a relationship is performing, but what is driving its performance.',
                },
                {
                  label: 'Govern',
                  headline: 'Turn partnership strategy into measurable execution.',
                  body: 'Connect joint business plans, shared priorities, initiatives, and milestones to ongoing accountability and execution.',
                },
                {
                  label: 'Optimize',
                  headline: 'Know where to focus and what to do next.',
                  body: 'Use AI-driven insights, risk alerts, and actionable recommendations to identify relationships requiring attention and opportunities for improvement.',
                },
              ].map((p, idx) => (
                <div key={idx} className="flex items-start space-x-4">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-white text-xs font-bold" style={{backgroundColor: '#0B3D91'}}>
                    {idx + 1}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 mb-1">{p.label} — <span className="font-medium text-gray-700">{p.headline}</span></p>
                    <p className="text-gray-500 text-sm leading-relaxed">{p.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 — PARTNERSHIP HEALTH SCORING */}
      <section id="platform" className="py-20 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest mb-5" style={{color: '#0B3D91'}}>
            Measure What Matters
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 leading-tight" style={{color: '#0B1F4B'}}>
                Partnership performance is more than a revenue number.
              </h2>
              <p className="text-lg font-medium text-gray-700 mb-3">Six dimensions. One connected view of partnership health.</p>
              <p className="text-gray-500 leading-relaxed mb-8">
                Traditional metrics tell you what happened. Partegy helps you understand the broader factors influencing partnership performance.
              </p>
              <p className="text-sm font-semibold text-gray-700 mb-5">Our six-dimensional Partnership Health Framework evaluates:</p>
              <div className="space-y-5">
                {[
                  { name: 'Strategic Alignment', desc: 'Are both organizations aligned on shared objectives, priorities, and long-term strategic value?' },
                  { name: 'Execution Momentum', desc: 'Are joint initiatives, commitments, and milestones progressing as planned?' },
                  { name: 'Commercial Impact', desc: 'Is the partnership contributing meaningful commercial value and business outcomes?' },
                  { name: 'Engagement Cadence', desc: 'Are the right stakeholders consistently engaged and maintaining productive relationships?' },
                  { name: 'Enablement Readiness', desc: 'Do teams have the knowledge, resources, and support needed to execute effectively?' },
                  { name: 'Risk Exposure', desc: 'What emerging threats, dependencies, or vulnerabilities could undermine partnership success?' },
                ].map((dim, idx) => (
                  <div key={idx} className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{color: '#0B3D91'}} />
                    <div>
                      <span className="font-semibold text-gray-900 text-sm">{dim.name}</span>
                      <span className="text-gray-500 text-sm"> — {dim.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-gray-500 text-sm leading-relaxed mt-8 pt-8 border-t border-gray-100">
                Partegy brings these dimensions together into structured health intelligence, helping leadership teams evaluate relationships consistently, understand performance drivers, and identify areas requiring attention.
              </p>
            </div>

            {/* Suggested visual: six-dimensional health visualization */}
            <div className="rounded-2xl border border-gray-200 shadow-lg overflow-hidden bg-white sticky top-24">
              <div className="border-b border-gray-100 px-5 py-3 bg-gray-50 flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                <span className="ml-3 text-xs text-gray-400">partegy.co/partnerships/acme</span>
              </div>
              <img src="/partnership-dashboard1.png" alt="Six-dimensional partnership health" className="w-full h-auto" />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5 — STRATEGIC GOVERNANCE */}
      <section className="py-20 border-b border-gray-100 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest mb-5" style={{color: '#0B3D91'}}>
            Govern What Drives Results
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Suggested visual: joint business plan */}
            <div className="rounded-2xl border border-gray-200 shadow-lg overflow-hidden bg-white">
              <div className="border-b border-gray-100 px-5 py-3 bg-gray-50 flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                <span className="ml-3 text-xs text-gray-400">partegy.co/partnerships/acme/plan</span>
              </div>
              <img src="/partner-view.png" alt="Joint business plan execution" className="w-full h-auto" />
            </div>

            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 leading-tight" style={{color: '#0B1F4B'}}>
                Stop letting partnership strategy live in forgotten business plans.
              </h2>
              <p className="text-gray-500 leading-relaxed mb-5">
                Strategic partnerships begin with shared ambition. But too often, joint business plans are created, reviewed periodically, and disconnected from day-to-day execution.
              </p>
              <p className="font-semibold text-gray-800 mb-8">Partegy brings partnership strategy and execution together.</p>
              <div className="space-y-6">
                {[
                  { step: 'Align on what matters.', desc: 'Establish shared strategic objectives and define the priorities that will drive partnership success.' },
                  { step: 'Turn priorities into action.', desc: 'Translate business plans into initiatives, milestones, commitments, and measurable outcomes.' },
                  { step: 'Maintain accountability.', desc: 'Track progress, identify stalled activities, and keep teams focused on shared objectives.' },
                  { step: 'Connect execution to partnership health.', desc: 'Understand how progress against strategic commitments contributes to the broader health of the relationship.' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start space-x-4">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-white text-xs font-bold" style={{backgroundColor: '#0B3D91'}}>{idx + 1}</div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm mb-1">{item.step}</p>
                      <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-sm italic text-gray-500 mt-8 pt-8 border-t border-gray-200">
                Partnership strategy shouldn't be an annual exercise. It should be a continuously managed business priority.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6 — AI-DRIVEN INTELLIGENCE */}
      <section id="intelligence-detail" className="py-20 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest mb-5" style={{color: '#0B3D91'}}>
            Optimize with Intelligence
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 leading-tight" style={{color: '#0B1F4B'}}>
                Don't just measure partnership health. Know what to do about it.
              </h2>
              <p className="text-gray-500 leading-relaxed mb-5">
                A partnership health score is only valuable if it helps your organization make better decisions.
              </p>
              <p className="text-gray-500 leading-relaxed mb-8">
                Partegy combines health assessments, execution signals, and AI-driven analysis to surface insights that help teams act before problems escalate.
              </p>
              <div className="space-y-6">
                {[
                  { title: 'Identify emerging risks.', desc: 'Detect warning signs across partnership health and execution that may require intervention.' },
                  { title: 'Understand what is driving performance.', desc: 'Look beyond an overall score to identify the strategic, commercial, operational, and relational factors influencing a partnership.' },
                  { title: 'Prioritize the right actions.', desc: 'Use automated recommendations to help teams focus on the issues and opportunities that matter.' },
                  { title: 'Make more informed investment decisions.', desc: 'Give leadership greater context when deciding which relationships to develop, where to intervene, and how to prioritize attention and resources.' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{color: '#0B3D91'}} />
                    <div>
                      <span className="font-semibold text-gray-900 text-sm">{item.title}</span>
                      <span className="text-gray-500 text-sm"> {item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-sm italic text-gray-500 mt-8 pt-8 border-t border-gray-100">
                Less time interpreting fragmented information. More time making informed decisions.
              </p>
            </div>

            {/* Suggested visual: intelligence panel with risk alerts */}
            <div className="rounded-2xl border border-gray-200 shadow-lg overflow-hidden bg-white sticky top-24">
              <div className="border-b border-gray-100 px-5 py-3 bg-gray-50 flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                <span className="ml-3 text-xs text-gray-400">partegy.co/sales</span>
              </div>
              <img src="/executive-dashboard.png" alt="Partnership intelligence panel" className="w-full h-auto" />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7 — EXECUTIVE PORTFOLIO INTELLIGENCE */}
      <section className="py-20 border-b border-gray-100 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest mb-5" style={{color: '#0B3D91'}}>
            The Executive View
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 leading-tight" style={{color: '#0B1F4B'}}>
            Your partnership portfolio. Finally, a clearer picture.
          </h2>
          <p className="text-lg text-gray-500 leading-relaxed mb-5 max-w-2xl">
            Every strategic partnership represents an investment of organizational time, resources, and opportunity.
          </p>
          <p className="text-gray-500 leading-relaxed mb-12 max-w-2xl">
            Partegy helps leadership teams move beyond individual relationship updates to understand the health and performance of their partnership portfolio.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
            {[
              { q: 'Which partnerships are performing well?', a: 'Identify relationships demonstrating strong health, execution, and strategic alignment.' },
              { q: 'Which partnerships need intervention?', a: 'Surface relationships experiencing declining health, execution challenges, or emerging risks.' },
              { q: 'Where are opportunities being overlooked?', a: 'Recognize partnerships with promising strategic potential that may require additional attention.' },
              { q: 'Where should we focus our resources?', a: 'Use a more complete understanding of partnership performance to inform portfolio priorities and investment discussions.' },
            ].map((item, idx) => (
              <div key={idx} className="p-6 rounded-xl border border-gray-200 bg-white">
                <p className="font-semibold text-gray-900 mb-2 text-sm">{item.q}</p>
                <p className="text-gray-500 text-sm leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
          <p className="text-sm italic text-gray-500">
            Better partnership intelligence leads to more intentional partnership investments.
          </p>
        </div>
      </section>

      {/* SECTION 8 — WHY PARTEGY */}
      <section id="why-partegy" className="py-20 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest mb-5" style={{color: '#0B3D91'}}>
            Beyond Traditional Partner Management
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 leading-tight max-w-2xl" style={{color: '#0B1F4B'}}>
            Your existing systems capture activity. Partegy connects the bigger picture.
          </h2>
          <div className="space-y-3 mb-8 max-w-2xl">
            <p className="text-gray-500">CRM platforms help organizations track opportunities, pipeline, and revenue.</p>
            <p className="text-gray-500">PRM platforms help organizations manage partner programs, engagement, and channel operations.</p>
            <p className="text-gray-500">Business intelligence tools help organizations analyze and report on available data.</p>
          </div>
          <p className="text-gray-500 mb-3 max-w-2xl">These capabilities are valuable. But evaluating the strategic health of a partnership requires connecting commercial outcomes with alignment, execution, engagement, readiness, and risk.</p>
          <p className="font-semibold text-gray-800 mb-8">Partegy is purpose-built for that challenge.</p>
          <p className="text-gray-500 mb-8 max-w-2xl">Rather than treating partnerships solely as channels for transactions or collections of activities, Partegy provides a dedicated framework for evaluating, governing, and improving the strategic relationship itself.</p>

          <p className="text-sm font-semibold text-gray-700 mb-5">One connected approach:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10 max-w-2xl">
            {[
              'Multidimensional partnership health scoring',
              'Joint strategic planning and execution governance',
              'AI-driven risk identification and recommendations',
              'Executive-level partnership portfolio visibility',
            ].map((item, idx) => (
              <div key={idx} className="flex items-center space-x-3 p-4 rounded-lg border border-gray-200 bg-white">
                <CheckCircle className="w-5 h-5 flex-shrink-0" style={{color: '#0B3D91'}} />
                <span className="text-gray-700 text-sm font-medium">{item}</span>
              </div>
            ))}
          </div>
          <p className="text-sm italic text-gray-500">
            Not another place to store partnership information. A better way to turn it into intelligence.
          </p>
        </div>
      </section>

      {/* SECTION 9 — BUILT FOR PARTNERSHIP DECISION-MAKERS */}
      <section className="py-20 border-b border-gray-100 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold mb-12 leading-tight" style={{color: '#0B1F4B'}}>
            The right intelligence for every level of your organization.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                role: 'For CEOs, CROs, and CFOs',
                headline: 'Make better strategic investment decisions.',
                desc: 'Gain a more complete understanding of partnership performance, risk, and strategic value to inform portfolio priorities and resource allocation.',
              },
              {
                role: 'For Partnership Executives',
                headline: 'Manage your portfolio with greater confidence.',
                desc: 'Move beyond subjective relationship updates with consistent health measurement, structured governance, and actionable insights.',
              },
              {
                role: 'For Partnership Teams',
                headline: 'Turn strategic priorities into measurable progress.',
                desc: 'Align stakeholders, track commitments, manage joint initiatives, and identify issues requiring attention.',
              },
            ].map((item, idx) => (
              <div key={idx} className="p-8 rounded-2xl border border-gray-200 bg-white">
                <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{color: '#0B3D91'}}>{item.role}</p>
                <p className="font-bold text-gray-900 text-lg mb-3 leading-snug">{item.headline}</p>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 10 — FINAL CTA */}
      <section className="py-24" style={{backgroundColor: '#0B3D91'}}>
        <div className="max-w-3xl mx-auto px-6 sm:px-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-300 mb-6">
            Partnership Intelligence Starts Here
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
            Know where to invest. Know when to intervene. Know what comes next.
          </h2>
          <p className="text-lg text-blue-200 mb-10 leading-relaxed">
            Your strategic partnerships deserve more than fragmented data, disconnected plans, and subjective assessments. Partegy brings partnership health, strategic execution, and AI-driven intelligence together so your organization can manage its most important relationships with greater clarity and confidence.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button onClick={handleRequestAccess}
              className="w-full sm:w-auto bg-white font-bold px-8 py-4 rounded-lg text-base transition-all hover:bg-blue-50"
              style={{color: '#0B3D91'}}>
              Request Early Access
            </button>
            <button onClick={handleBookSession}
              className="w-full sm:w-auto border border-blue-400 text-white font-semibold px-8 py-4 rounded-lg text-base transition-all hover:bg-blue-800">
              Book a Live Session
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white border-t border-gray-100 py-12">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 mb-8">
            <div>
              <img src="/partegy-logo.png" alt="Partegy" className="h-8 w-auto mb-3" />
              <p className="text-sm text-gray-500">Partnership Intelligence for Strategic Business Relationships.</p>
            </div>
            <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm text-gray-400">
              <a href="#platform" className="hover:text-gray-600 transition-colors">Platform</a>
              <a href="#intelligence" className="hover:text-gray-600 transition-colors">Partnership Intelligence</a>
              <a href="/contact" className="hover:text-gray-600 transition-colors">Contact</a>
              <a href="/privacy" className="hover:text-gray-600 transition-colors">Privacy</a>
              <a href="/terms" className="hover:text-gray-600 transition-colors">Terms</a>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pt-8 border-t border-gray-100">
            <p className="text-xs text-gray-400">© 2026 Partegy, Inc.</p>
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
