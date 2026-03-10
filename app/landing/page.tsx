'use client';

import { useState } from 'react';
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
  Brain
} from 'lucide-react';

export default function LandingPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');

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

  const features = [
    {
      icon: BarChart3,
      title: 'CRM',
      description: 'Tracks deals and pipeline.'
    },
    {
      icon: Users,
      title: 'PRM',
      description: 'Tracks partner referrals and sourced revenue.'
    },
    {
      icon: FileText,
      title: 'Spreadsheets & Slides',
      description: 'Track partnership strategy and initiatives.'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'VP of Partnerships',
      company: 'TechFlow Systems',
      content: 'Partegy transformed how we manage our $90M partnership portfolio. The governance insights give us visibility we never had before.',
      rating: 5
    },
    {
      name: 'Marcus Rodriguez',
      role: 'Chief Revenue Officer',
      company: 'DataSync Partners',
      content: 'Finally, a platform to govern partnerships as strategic assets. Clear visibility into what partnerships are actually performing.',
      rating: 5
    },
    {
      name: 'Lisa Thompson',
      role: 'Director of Alliances',
      company: 'CloudTech Solutions',
      content: 'Partegy helps us answer the questions leadership is asking - where to invest and which partnerships need intervention.',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-400 to-cyan-400 flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-gray-900">Partegy</div>
            </div>
            <div className="flex items-center space-x-6">
              <nav className="hidden md:flex items-center space-x-8">
                <a href="#features" className="text-gray-600 hover:text-gray-900">Features</a>
                <a href="#testimonials" className="text-gray-600 hover:text-gray-900">Testimonials</a>
                <a href="#contact" className="text-gray-600 hover:text-gray-900">Contact</a>
              </nav>
              <button
                onClick={handleWatchDemo}
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors font-medium flex items-center space-x-2"
              >
                <Play className="w-4 h-4" />
                <span>Watch the Executive Demo</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-400 via-cyan-400 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Partnerships drive growth. But they're rarely governed like strategic assets.
              </h1>
              <p className="text-xl lg:text-2xl mb-8 text-blue-100 leading-relaxed">
                Partegy gives leaders visibility into partnership performance, strategy execution, and ecosystem health — 
                so they know where to invest and when to intervene.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <button
                  onClick={handleWatchDemo}
                  className="bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-gray-50 transition-colors font-semibold text-lg flex items-center justify-center"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Watch the Executive Demo
                </button>
                <button 
                  onClick={handleScheduleConversation}
                  className="border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-blue-600 transition-colors font-semibold text-lg"
                >
                  Schedule a Strategy Conversation
                </button>
              </div>
              <div className="mt-8 flex items-center space-x-6 text-blue-200 text-sm">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>15-minute demo</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>No obligation</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>Custom walkthrough</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white/10 backdrop-blur rounded-xl p-8">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-blue-200 text-sm font-medium">PORTFOLIO PERFORMANCE</span>
                    <span className="text-green-400 text-sm font-medium">↗ +18.5%</span>
                  </div>
                  <div className="text-4xl font-bold">$90.6M</div>
                  <div className="text-blue-200">Partnership Revenue YTD</div>
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-blue-400">
                    <div>
                      <div className="text-2xl font-bold">347%</div>
                      <div className="text-blue-200 text-sm">Portfolio ROI</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">67.8%</div>
                      <div className="text-blue-200 text-sm">Strategic Alignment</div>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-center text-blue-200 text-lg font-medium mt-4">
                Partegy is the governance platform for strategic partnerships.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Now "The Problem" */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Partnerships generate billions in revenue — but most companies can't govern them.
            </h2>
            <div className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed space-y-4">
              <p>Partner ecosystems have become a major growth engine for enterprise companies.</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-12">
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">~28%</div>
                  <div className="text-gray-600">of company revenue from mature partnership programs</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">$80T</div>
                  <div className="text-gray-600">projected ecosystem economic activity by 2030</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-red-600 mb-2">36%</div>
                  <div className="text-gray-600">of organizations consistently measure ecosystem performance</div>
                </div>
              </div>
              <p>Despite this scale, most companies still manage partnerships across disconnected systems.</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-blue-400 to-cyan-400 flex items-center justify-center mb-6">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="bg-red-50 border border-red-200 rounded-xl p-8">
            <div className="flex items-start space-x-4">
              <AlertTriangle className="w-8 h-8 text-red-600 mt-1" />
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">None of these systems provide a complete view of:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600 mb-6">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span>partnership health</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span>strategic alignment</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span>execution progress</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span>ecosystem performance</span>
                  </div>
                </div>
                <p className="text-xl font-semibold text-gray-900">
                  Leadership lacks visibility into where partnership investments are working — and where they are not.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ROI Section - Now "The Governance Gap" */}
      <section className="py-24 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-8">The partnership governance gap</h2>
            <p className="text-xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              Partnerships are treated as critical growth engines — but rarely managed with the same discipline as other strategic assets.
            </p>
            
            <div className="bg-gray-800 rounded-xl p-8 mb-12">
              <h3 className="text-2xl font-semibold mb-8">Executives often struggle to answer key questions:</h3>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <CheckCircle className="w-6 h-6 text-yellow-400" />
                  <span className="text-lg">Which partnerships are actually performing?</span>
                </div>
                <div className="flex items-center space-x-4">
                  <CheckCircle className="w-6 h-6 text-yellow-400" />
                  <span className="text-lg">Which initiatives are driving results?</span>
                </div>
                <div className="flex items-center space-x-4">
                  <CheckCircle className="w-6 h-6 text-yellow-400" />
                  <span className="text-lg">Where should we invest more resources?</span>
                </div>
                <div className="flex items-center space-x-4">
                  <CheckCircle className="w-6 h-6 text-yellow-400" />
                  <span className="text-lg">Which partnerships are at risk?</span>
                </div>
              </div>
            </div>

            <p className="text-xl text-gray-300 leading-relaxed">
              Without a system to govern partnerships, leadership lacks the insight needed to manage their ecosystem effectively.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="bg-white text-gray-900 rounded-xl p-8 shadow-2xl">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-4">Finally, a platform to govern strategic partnerships</h3>
                <p className="text-gray-600">Partegy provides a structured system to manage partnership strategy, execution, and performance in one place.</p>
              </div>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Define partnership strategy and objectives</span>
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Track joint initiatives and progress</span>
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Measure partnership health</span>
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Surface insights for leadership</span>
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold mb-8">
                Turn partnership data into actionable insight
              </h2>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Partegy analyzes partnership activity, initiative progress, and revenue signals to surface insights that would otherwise remain hidden.
              </p>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <Brain className="w-6 h-6 text-cyan-400" />
                  <span className="text-lg">Detect early partnership risk</span>
                </div>
                <div className="flex items-center space-x-4">
                  <Brain className="w-6 h-6 text-cyan-400" />
                  <span className="text-lg">Identify stalled initiatives</span>
                </div>
                <div className="flex items-center space-x-4">
                  <Brain className="w-6 h-6 text-cyan-400" />
                  <span className="text-lg">Understand where resources should be invested</span>
                </div>
                <div className="flex items-center space-x-4">
                  <Brain className="w-6 h-6 text-cyan-400" />
                  <span className="text-lg">Intervene before revenue impact occurs</span>
                </div>
              </div>
              <div className="mt-8">
                <button
                  onClick={handleWatchDemo}
                  className="bg-cyan-400 text-blue-900 px-8 py-4 rounded-lg hover:bg-cyan-300 transition-colors font-semibold text-lg flex items-center"
                >
                  <Play className="w-5 h-5 mr-2" />
                  See It In Action
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Give leadership the answers they're asking for
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Partegy enables leadership teams to manage partnerships as a strategic portfolio.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-8">
                <div className="flex items-center space-x-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed italic">
                  "{testimonial.content}"
                </p>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-gray-600 text-sm">{testimonial.role}</div>
                  <div className="text-blue-600 text-sm font-medium">{testimonial.company}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-2xl lg:text-3xl font-medium mb-8 leading-relaxed">
            Partnerships have become one of the most important drivers of enterprise growth.
          </p>
          <p className="text-xl lg:text-2xl mb-12 text-blue-100">
            They deserve the same governance and visibility as any other strategic asset.
          </p>
          <div className="text-3xl lg:text-4xl font-bold mb-12">
            Partegy — governing partnerships as strategic assets.
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold mb-12">
            Bring clarity and control to your partnership ecosystem
          </h2>
          
          <form onSubmit={handleDemoRequest} className="max-w-md mx-auto mb-8">
            <div className="flex space-x-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your work email"
                className="flex-1 px-6 py-4 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
                required
              />
              <button
                type="submit"
                className="bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-gray-50 transition-colors font-semibold flex items-center"
              >
                <Play className="w-4 h-4 mr-2" />
                Watch the Executive Demo
              </button>
            </div>
          </form>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-blue-200">
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5" />
              <span>Enterprise Security</span>
            </div>
            <div className="flex items-center space-x-2">
              <Zap className="w-5 h-5" />
              <span>15-Minute Demo</span>
            </div>
            <div className="flex items-center space-x-2">
              <Globe className="w-5 h-5" />
              <span>Custom Walkthrough</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-400 to-cyan-400 flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-white" />
                </div>
                <div className="text-xl font-bold text-white">Partegy</div>
              </div>
              <p className="text-gray-400 leading-relaxed mb-6">
                Governing partnerships as strategic assets
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">Product</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Platform</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Leadership</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Best Practices</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Case Studies</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between">
            <p className="text-gray-400 text-sm">
              © 2026 Partegy. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 sm:mt-0">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
