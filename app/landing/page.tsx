'use client';

import { useRouter } from 'next/navigation';
import { 
  Target, 
  BarChart3, 
  Users, 
  Zap, 
  Shield, 
  CheckCircle, 
  ArrowRight,
  TrendingUp,
  FileText,
  Plug,
  Eye,
  Lock
} from 'lucide-react';

export default function LandingPage() {
  const router = useRouter();

  const features = [
    {
      icon: Target,
      title: 'Multi-Dimensional Health Scoring',
      description: 'Track partnership health across 6 critical dimensions with AI-powered intelligence and human-in-the-loop overrides.',
      color: 'from-[#60a5fa] to-[#3b82f6]'
    },
    {
      icon: BarChart3,
      title: 'Executive Dashboards',
      description: 'Portfolio-level insights designed for decision-makers. Know where to worry and where to act in under 5 minutes.',
      color: 'from-[#60e1fa] to-[#22d3ee]'
    },
    {
      icon: Plug,
      title: 'Enterprise Integrations',
      description: 'Connect to Salesforce, Impartner, NetSuite, HubSpot, Slack, and Teams. Pull data from execution systems automatically.',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Shield,
      title: 'Role-Based Access Control',
      description: 'Asymmetric visibility ensures internal intelligence stays private while sharing execution data with partners.',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: TrendingUp,
      title: 'Predictive Analytics',
      description: 'Revenue forecasting, pipeline distribution, and trend analysis. Understand partnership trajectory before it becomes a problem.',
      color: 'from-orange-500 to-orange-600'
    },
    {
      icon: FileText,
      title: 'Bulk Onboarding',
      description: 'Import 250+ partnerships with team members and details via CSV. Auto-calculate health scores and assign managers.',
      color: 'from-pink-500 to-pink-600'
    }
  ];

  const useCases = [
    {
      role: 'Executives',
      icon: Eye,
      description: 'Portfolio overview, health distribution, risk concentration, and strategic drift alerts.',
      link: '/executive'
    },
    {
      role: 'Partnership Managers',
      icon: Users,
      description: 'Daily action queue, OKR tracking, document management, and AI-powered recommendations.',
      link: '/dashboard'
    },
    {
      role: 'Partners (External)',
      icon: Lock,
      description: 'Shared execution view with no internal intelligence visible. Track milestones and OKRs together.',
      link: '/portal/1'
    }
  ];

  const stats = [
    { value: '6', label: 'Health Dimensions', sublabel: 'Strategic to Commercial' },
    { value: '5', label: 'User Roles', sublabel: 'Granular Permissions' },
    { value: '6', label: 'Integrations', sublabel: 'CRM, PRM, ERP' },
    { value: '250+', label: 'Partnerships', sublabel: 'Bulk Import Ready' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <header className="relative overflow-hidden bg-gradient-to-br from-[#1e293b] via-[#334155] to-[#1e293b]">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]"></div>
        
        <nav className="relative border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-1">
                  <div className="w-10 h-10 bg-[#60a5fa] rounded"></div>
                  <div className="w-10 h-10 bg-[#60e1fa] rounded"></div>
                </div>
                <span className="text-2xl font-bold text-white">Partegy</span>
              </div>
              <button
                onClick={() => router.push('/dashboard')}
                className="px-6 py-2 bg-gradient-to-r from-[#60a5fa] to-[#60e1fa] text-white rounded-lg hover:opacity-90 font-medium"
              >
                View Demo
              </button>
            </div>
          </div>
        </nav>

        <div className="relative max-w-7xl mx-auto px-6 py-24 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6">
                <Zap className="w-4 h-4 text-[#60e1fa]" />
                <span className="text-sm text-white font-medium">Partnership Intelligence Platform</span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Strategic Intelligence for
                <span className="bg-gradient-to-r from-[#60a5fa] to-[#60e1fa] bg-clip-text text-transparent"> Partnership </span>
                Success
              </h1>
              
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                The intelligence layer that sits on top of your PRM and CRM. Transform partnership data into strategic insights with AI-powered health scoring and executive dashboards.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => router.push('/dashboard')}
                  className="px-8 py-4 bg-gradient-to-r from-[#60a5fa] to-[#60e1fa] text-white rounded-lg hover:opacity-90 font-semibold flex items-center justify-center space-x-2"
                >
                  <span>Explore Live Demo</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button
                  onClick={() => router.push('/onboarding')}
                  className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-lg hover:bg-white/20 font-semibold border border-white/20"
                >
                  Try Bulk Import
                </button>
              </div>
            </div>

            <div className="relative">
              <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-white/10 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 rounded-full bg-green-400"></div>
                      <span className="text-white font-medium">TechCorp Solutions</span>
                    </div>
                    <span className="text-white font-bold">82</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-white/10 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                      <span className="text-white font-medium">DataFlow Systems</span>
                    </div>
                    <span className="text-white font-bold">64</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-white/10 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 rounded-full bg-red-400"></div>
                      <span className="text-white font-medium">CloudScale Networks</span>
                    </div>
                    <span className="text-white font-bold">45</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-[#60a5fa] to-[#60e1fa] bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-lg font-semibold text-gray-900">{stat.label}</div>
                <div className="text-sm text-gray-600">{stat.sublabel}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need for Partnership Intelligence
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Partegy pulls data from your execution systems (Salesforce, Impartner, NetSuite) and adds the intelligence layer your team needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <div key={idx} className="bg-white rounded-xl border-2 border-gray-100 p-8 hover:border-[#60e1fa] hover:shadow-lg transition-all group">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Built for Every Role
            </h2>
            <p className="text-xl text-gray-600">
              Different views for different needs. All powered by the same intelligence.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {useCases.map((useCase, idx) => (
              <button
                key={idx}
                onClick={() => router.push(useCase.link)}
                className="bg-white rounded-xl p-8 border-2 border-gray-200 hover:border-[#60a5fa] hover:shadow-xl transition-all text-left group"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#60a5fa] to-[#60e1fa] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <useCase.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{useCase.role}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{useCase.description}</p>
                <div className="flex items-center text-[#60a5fa] font-semibold group-hover:gap-2 transition-all">
                  <span>View Demo</span>
                  <ArrowRight className="w-5 h-5" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Differentiators Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Not Another PRM.<br/>
                The <span className="bg-gradient-to-r from-[#60a5fa] to-[#60e1fa] bg-clip-text text-transparent">Intelligence Layer</span> You're Missing.
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Impartner manages execution. Salesforce tracks deals. Partegy provides the strategic intelligence that tells you <strong>what to do about it</strong>.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <CheckCircle className="w-6 h-6 text-[#60a5fa] flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold text-gray-900">Asymmetric Visibility</div>
                    <div className="text-gray-600">Partners see execution. You see intelligence. Trust maintained.</div>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <CheckCircle className="w-6 h-6 text-[#60a5fa] flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold text-gray-900">Human-in-the-Loop AI</div>
                    <div className="text-gray-600">AI recommends. Humans decide. Override scores with reasoning.</div>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <CheckCircle className="w-6 h-6 text-[#60a5fa] flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold text-gray-900">Built for Scale</div>
                    <div className="text-gray-600">Import 250+ partnerships. 6 integrations. Role-based access.</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#60a5fa] to-[#60e1fa] rounded-2xl p-12 text-white">
              <h3 className="text-2xl font-bold mb-6">The Stack</h3>
              <div className="space-y-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                  <div className="text-lg font-semibold mb-2">Partegy</div>
                  <div className="text-sm opacity-90">Intelligence & Strategy Layer</div>
                </div>
                <div className="flex items-center justify-center">
                  <ArrowRight className="w-6 h-6 rotate-90" />
                </div>
                <div className="space-y-3">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                    <div className="font-medium">Impartner (PRM)</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                    <div className="font-medium">Salesforce (CRM)</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                    <div className="font-medium">NetSuite (ERP)</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-[#1e293b] to-[#334155] relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]"></div>
        
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to See Partnership Intelligence in Action?
          </h2>
          <p className="text-xl text-gray-300 mb-10">
            Explore the full platform with real data. No signup required.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.push('/dashboard')}
              className="px-10 py-5 bg-gradient-to-r from-[#60a5fa] to-[#60e1fa] text-white rounded-lg hover:opacity-90 font-bold text-lg flex items-center justify-center space-x-2"
            >
              <span>Launch Live Demo</span>
              <ArrowRight className="w-6 h-6" />
            </button>
            <button
              onClick={() => router.push('/onboarding')}
              className="px-10 py-5 bg-white/10 backdrop-blur-sm text-white rounded-lg hover:bg-white/20 font-bold text-lg border border-white/20"
            >
              Try Bulk Import
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1e293b] border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-1">
                <div className="w-8 h-8 bg-[#60a5fa] rounded"></div>
                <div className="w-8 h-8 bg-[#60e1fa] rounded"></div>
              </div>
              <span className="text-xl font-bold text-white">Partegy</span>
            </div>
            <div className="text-sm text-gray-400">
              © 2026 Partegy. Partnership Intelligence Platform.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
