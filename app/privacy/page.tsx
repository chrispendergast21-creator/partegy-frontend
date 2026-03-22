'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

export default function PrivacyPolicyPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900" style={{backgroundColor: '#0B0E14'}}>
      {/* Header */}
      <header className="border-b border-slate-700/50 backdrop-blur-sm bg-slate-900/80">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => router.push('/landing')}
              className="p-2 text-gray-300 hover:bg-white/10 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div className="flex items-center space-x-4">
              <div className="flex space-x-1">
                <div className="w-3 h-3 bg-emerald-400 rounded-sm"></div>
                <div className="w-3 h-3 bg-blue-400 rounded-sm"></div>
              </div>
              <div className="text-xl font-bold text-white tracking-tight">Partegy</div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-8 py-16">
        <h1 className="text-4xl font-bold text-white mb-8">Privacy Policy</h1>
        
        <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl p-8 space-y-8 text-slate-300">
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Information We Collect</h2>
            <p className="leading-relaxed">
              We collect information you provide directly to us, such as when you request a demo, contact us, or use our services. This may include your name, email address, phone number, company information, and any other information you choose to provide.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4">How We Use Your Information</h2>
            <p className="leading-relaxed">
              We use the information we collect to provide, maintain, and improve our services, respond to your requests, send you technical notices and support messages, and communicate with you about products, services, and promotional offers.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Information Sharing</h2>
            <p className="leading-relaxed">
              We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy. We may share your information with trusted service providers who assist us in operating our platform.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Data Security</h2>
            <p className="leading-relaxed">
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. Our platform is SOC 2 compliant and follows industry-standard security practices.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
            <p className="leading-relaxed">
              If you have any questions about this Privacy Policy, please contact us at privacy@partegy.com or through our contact page.
            </p>
          </div>

          <div className="text-sm text-slate-400">
            <p>Last updated: March 2026</p>
          </div>
        </div>
      </div>
    </div>
  );
}
