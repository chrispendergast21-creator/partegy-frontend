'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowRight,
  CheckCircle,
  TrendingUp,
  TrendingDown,
  Shield,
  Zap,
  Globe,
  Users,
  BarChart3,
  Target,
  Brain,
  DollarSign,
  AlertCircle,
  Star,
  Play,
  ExternalLink,
  ChevronDown,
  Menu,
  X,
  Eye,
  ClipboardList,
  Mail
} from 'lucide-react';

export default function LandingPage() {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [evaluationModalOpen, setEvaluationModalOpen] = useState(false);
  const [demoForm, setDemoForm] = useState({ name: '', company: '', role: '', email: '' });
  const [evaluationForm, setEvaluationForm] = useState({ name: '', company: '', role: '', email: '' });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDemoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Demo request:', demoForm);
    alert('Thank you! We\'ll contact you within 24 hours to schedule your executive demo.');
    setDemoModalOpen(false);
    setDemoForm({ name: '', company: '', role: '', email: '' });
  };

  const handleEvaluationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Evaluation request:', evaluationForm);
    alert('Thank you! Our partnership intelligence team will contact you within 24 hours.');
    setEvaluationModalOpen(false);
    setEvaluationForm({ name: '', company: '', role: '', email: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-slate-900/95 backdrop-blur-lg border-b border-slate-700/50' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-1">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-cyan-400 rounded"></div>
                <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-emerald-400 rounded"></div>
              </div>
              <span className="text-2xl font-bold text-white">
                Partegy
              </span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <a href="#solutions" className="text-slate-300 hover:text-white transition-colors">Solutions</a>
              <a href="#platform" className="text-slate-300 hover:text-white transition-colors">Platform</a>
              <a href="#customers" className="text-slate-300 hover:text-white transition-colors">Customers</a>
              <a href="#pricing" className="text-slate-300 hover:text-white transition-colors">Pricing</a>
              <button 
                onClick={() => router.push('/login')}
                className="px-4 py-2 text-slate-300 hover:text-white transition-colors"
              >
                Sign In
              </button>
              <button 
                onClick={() => setEvaluationModalOpen(true)}
                className="px-6 py-2 bg-gradient-to-r from-blue-500 to-emerald-500 text-white rounded-lg hover:shadow-lg transition-all"
              >
                Request Evaluation
              </button>
            </div>

            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden mt-4 py-4 border-t border-slate-700">
              <div className="flex flex-col space-y-4">
                <a href="#solutions" className="text-slate-300 hover:text-white transition-colors">Solutions</a>
                <a href="#platform" className="text-slate-300 hover:text-white transition-colors">Platform</a>
                <a href="#customers" className="text-slate-300 hover:text-white transition-colors">customers</a>
                <a href="#pricing" className="text-slate-300 hover:text-white transition-colors">Pricing</a>
                <button onClick={() => router.push('/login')} className="text-left text-slate-300 hover:text-white transition-colors">Sign In</button>
                <button onClick={() => setEvaluationModalOpen(true)} className="text-left px-6 py-2 bg-gradient-to-r from-blue-500 to-emerald-500 text-white rounded-lg w-fit">Request Evaluation</button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-full mb-8">
            <Zap className="w-4 h-4 text-emerald-400 mr-2" />
            <span className="text-sm text-slate-300">Patent Pending AI-Powered Partnership Intelligence</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
            <span className="bg-gradient-to-r from-blue-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              Strategic Partnerships
            </span>
            <br />
            <span className="text-white">Governed as Assets</span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-4xl mx-auto leading-relaxed">
            Transform how your organization governs and executes strategic partnerships with the first 
            cloud-based governance platform designed specifically for inter-organizational collaboration.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6 mb-12">
            <button 
              onClick={() => setDemoModalOpen(true)}
              className="group flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-emerald-500 text-white rounded-xl text-lg font-semibold hover:shadow-2xl hover:scale-105 transition-all"
            >
              <Eye className="w-5 h-5" />
              <span>Watch the Executive Demo</span>
            </button>
            <button 
              onClick={() => setEvaluationModalOpen(true)}
              className="flex items-center space-x-3 px-8 py-4 bg-slate-800/50 border border-slate-700 text-white rounded-xl text-lg font-semibold hover:bg-slate-700/50 transition-all"
            >
              <ClipboardList className="w-5 h-5" />
              <span>Evaluate your Partnership Portfolio</span>
            </button>
          </div>
        </div>

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="py-20 px-6 bg-slate-800/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              The <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">$2.3 Trillion Problem</span>
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Despite their strategic importance, partnerships are managed through fragmented tools, 
              informal processes, and siloed systems, resulting in massive value leakage.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ProblemCard
              icon={AlertCircle}
              stat="85%"
              title="of enterprises struggle"
              description="to effectively manage and optimize their partnership portfolios"
              color="from-red-400 to-red-600"
            />
            <ProblemCard
              icon={TrendingDown}
              stat="60%"
              title="of partnerships underperform"
              description="due to lack of data-driven insights and proactive management"
              color="from-orange-400 to-orange-600"
            />
            <ProblemCard
              icon={DollarSign}
              stat="15-30%"
              title="potential revenue lost"
              description="from partnerships due to manual processes and reactive management"
              color="from-yellow-400 to-yellow-600"
            />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
              Partnership-Scaled Pricing
            </span>
          </h2>
          <p className="text-xl text-slate-300 mb-4 max-w-4xl mx-auto">
            Partegy's pricing scales with the number of partnerships governed, reflecting the 
            operational complexity and financial risk under management.
          </p>
          <p className="text-lg text-slate-400 mb-12">
            This aligns our value directly with the scope of strategic partnerships rather than user count.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <PricingTier
              tier="Growth"
              partnerships="Up to 25"
              price="$30k"
              popular={false}
            />
            <PricingTier
              tier="Scale"
              partnerships="26-75"
              price="$60k"
              popular={true}
            />
            <PricingTier
              tier="Enterprise"
              partnerships="76-200"
              price="$120k"
              popular={false}
            />
            <PricingTier
              tier="Global"
              partnerships="200+"
              price="$250k+"
              popular={false}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-600 via-emerald-600 to-cyan-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Transform Your Partnership Intelligence
          </h2>
          <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6">
            <button 
              onClick={() => setDemoModalOpen(true)}
              className="group flex items-center space-x-3 px-8 py-4 bg-white text-blue-600 rounded-xl text-lg font-semibold hover:shadow-2xl hover:scale-105 transition-all"
            >
              <Eye className="w-5 h-5" />
              <span>Watch the Executive Demo</span>
            </button>
            <button 
              onClick={() => setEvaluationModalOpen(true)}
              className="flex items-center space-x-3 px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl text-lg font-semibold hover:bg-white hover:text-blue-600 transition-all"
            >
              <ClipboardList className="w-5 h-5" />
              <span>Evaluate your Partnership Portfolio</span>
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-slate-900 border-t border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="flex items-center space-x-1">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-cyan-400 rounded"></div>
                <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-emerald-400 rounded"></div>
              </div>
              <span className="text-2xl font-bold text-white">
                Partegy
              </span>
            </div>
            <div className="flex items-center space-x-6 text-slate-400 text-sm">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
              <span>© 2026 Partegy, Inc.</span>
              <span>•</span>
              <span className="text-xs">Patent Pending</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Demo Modal */}
      {demoModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-2xl p-8 max-w-md w-full border border-slate-700">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white">Executive Demo Request</h3>
              <button onClick={() => setDemoModalOpen(false)}>
                <X className="w-6 h-6 text-slate-400 hover:text-white" />
              </button>
            </div>
            <form onSubmit={handleDemoSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Full Name *</label>
                <input
                  type="text"
                  required
                  value={demoForm.name}
                  onChange={(e) => setDemoForm({...demoForm, name: e.target.value})}
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
                  placeholder="John Smith"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Company *</label>
                <input
                  type="text"
                  required
                  value={demoForm.company}
                  onChange={(e) => setDemoForm({...demoForm, company: e.target.value})}
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
                  placeholder="Acme Corporation"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Role *</label>
                <input
                  type="text"
                  required
                  value={demoForm.role}
                  onChange={(e) => setDemoForm({...demoForm, role: e.target.value})}
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
                  placeholder="VP of Partnerships"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Email *</label>
                <input
                  type="email"
                  required
                  value={demoForm.email}
                  onChange={(e) => setDemoForm({...demoForm, email: e.target.value})}
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
                  placeholder="john@acme.com"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-blue-500 to-emerald-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
              >
                Watch Executive Demo
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Evaluation Modal */}
      {evaluationModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-2xl p-8 max-w-md w-full border border-slate-700">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white">Partnership Portfolio Evaluation</h3>
              <button onClick={() => setEvaluationModalOpen(false)}>
                <X className="w-6 h-6 text-slate-400 hover:text-white" />
              </button>
            </div>
            <form onSubmit={handleEvaluationSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Full Name *</label>
                <input
                  type="text"
                  required
                  value={evaluationForm.name}
                  onChange={(e) => setEvaluationForm({...evaluationForm, name: e.target.value})}
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
                  placeholder="Jane Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Company *</label>
                <input
                  type="text"
                  required
                  value={evaluationForm.company}
                  onChange={(e) => setEvaluationForm({...evaluationForm, company: e.target.value})}
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
                  placeholder="Tech Solutions Inc"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Role *</label>
                <input
                  type="text"
                  required
                  value={evaluationForm.role}
                  onChange={(e) => setEvaluationForm({...evaluationForm, role: e.target.value})}
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
                  placeholder="Director of Strategic Partnerships"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Email *</label>
                <input
                  type="email"
                  required
                  value={evaluationForm.email}
                  onChange={(e) => setEvaluationForm({...evaluationForm, email: e.target.value})}
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
                  placeholder="jane@techsolutions.com"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-blue-500 to-emerald-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
              >
                Request Portfolio Evaluation
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function ProblemCard({ icon: Icon, stat, title, description, color }: any) {
  return (
    <div className="text-center p-8 bg-slate-900/50 rounded-2xl border border-slate-700">
      <div className={`w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r ${color} flex items-center justify-center`}>
        <Icon className="w-8 h-8 text-white" />
      </div>
      <div className={`text-4xl font-bold mb-2 bg-gradient-to-r ${color} bg-clip-text text-transparent`}>
        {stat}
      </div>
      <div className="text-lg font-semibold text-white mb-2">{title}</div>
      <div className="text-slate-400">{description}</div>
    </div>
  );
}

function PricingTier({ tier, partnerships, price, popular }: any) {
  return (
    <div className={`relative p-6 rounded-2xl border-2 ${
      popular 
        ? 'border-emerald-400 bg-gradient-to-br from-slate-800 to-emerald-900/20 scale-105' 
        : 'border-slate-700 bg-slate-900/50'
    } hover:border-emerald-400/50 transition-all duration-300`}>
      {popular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <div className="bg-gradient-to-r from-emerald-400 to-cyan-400 text-slate-900 px-3 py-1 rounded-full text-xs font-bold">
            MOST POPULAR
          </div>
        </div>
      )}
      <div className="text-center">
        <h3 className="text-xl font-bold text-white mb-2">{tier}</h3>
        <div className="text-sm text-slate-400 mb-3">{partnerships} partnerships</div>
        <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent mb-1">
          {price}
        </div>
      </div>
    </div>
  );
}
