'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const response = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });

    if (response.ok) {
      const from = searchParams.get('from') || '/home';
      router.push(from);
    } else {
      setError('Incorrect password');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center space-x-2 mb-8">
          <div className="flex space-x-1">
            <div className="w-3 h-3 bg-emerald-400 rounded-sm"></div>
            <div className="w-3 h-3 bg-blue-400 rounded-sm"></div>
          </div>
          <span className="font-bold text-white text-2xl">Partegy</span>
        </div>

        <div className="bg-slate-900 border border-slate-700 rounded-2xl p-8">
          <h1 className="text-2xl font-bold text-white mb-2">Welcome back</h1>
          <p className="text-slate-400 mb-8">Enter your password to access the platform</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-slate-800 border border-slate-600 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-slate-500"
                placeholder="Enter password"
                autoFocus
              />
            </div>

            {error && (
              <div className="px-4 py-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !password}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-colors disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>
        </div>

        <p className="text-center text-slate-500 text-sm mt-6">
          <a href="/landing" className="hover:text-slate-300 transition-colors">
            Back to landing page
          </a>
        </p>
      </div>
    </div>
  );
}
