'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Home, Users, Settings, Shield, Briefcase, Search, X } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://partnership-api-production.up.railway.app';

export function PageNavigation() {
  const pathname = usePathname();
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { href: '/executive', label: 'Home', icon: Home },
    { href: '/partnerships', label: 'Partnerships', icon: Briefcase },
    { href: '/users', label: 'Users', icon: Users },
    { href: '/settings/integrations', label: 'Settings', icon: Settings },
    { href: '/admin', label: 'Admin', icon: Shield },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Search as user types
  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    const timeout = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE}/api/partnerships?search=${encodeURIComponent(query)}`);
        const data = await res.json();
        setResults(data.slice(0, 6));
        setIsOpen(true);
      } catch (err) {
        // Fallback: filter from sample data
        const sample = [
          { id: 1, name: 'Acme Corporation', primary_contact: 'John Smith' },
          { id: 2, name: 'Apex Dynamics', primary_contact: 'Sarah Johnson' },
          { id: 6, name: 'Enterprise Systems Co', primary_contact: 'Mike Chen' },
          { id: 9, name: 'NextGen Technologies', primary_contact: 'Lisa Park' },
        ];
        const filtered = sample.filter(p =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.primary_contact.toLowerCase().includes(query.toLowerCase())
        );
        setResults(filtered);
        setIsOpen(true);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [query]);

  const handleSelect = (id: number) => {
    router.push(`/partnership/${id}`);
    setQuery('');
    setIsOpen(false);
  };

  return (
    <nav className="bg-slate-900 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2 py-4 border-r border-slate-800 pr-8">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-emerald-400 rounded-sm"></div>
                <div className="w-2 h-2 bg-blue-400 rounded-sm"></div>
              </div>
              <span className="font-bold text-white text-lg">Partegy</span>
            </div>

            {navItems.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className={`flex items-center space-x-2 px-4 py-4 border-b-2 transition-colors ${
                  pathname === href
                    ? 'border-blue-500 text-white'
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="font-medium">{label}</span>
              </Link>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative" ref={searchRef}>
            <div className="flex items-center bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 w-64 focus-within:border-blue-500 transition-colors">
              <Search className="w-4 h-4 text-slate-400 mr-2 flex-shrink-0" />
              <input
                type="text"
                placeholder="Search partnerships..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="bg-transparent text-white text-sm outline-none w-full placeholder-slate-400"
              />
              {query && (
                <button onClick={() => { setQuery(''); setIsOpen(false); }}>
                  <X className="w-4 h-4 text-slate-400 hover:text-white" />
                </button>
              )}
            </div>

            {/* Dropdown Results */}
            {isOpen && (
              <div className="absolute right-0 top-12 w-80 bg-slate-800 border border-slate-700 rounded-xl shadow-2xl z-50 overflow-hidden">
                {loading ? (
                  <div className="px-4 py-3 text-slate-400 text-sm">Searching...</div>
                ) : results.length > 0 ? (
                  results.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => handleSelect(p.id)}
                      className="w-full px-4 py-3 flex items-center space-x-3 hover:bg-slate-700 transition-colors text-left"
                    >
                      <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                        {p.name.charAt(0)}
                      </div>
                      <div>
                        <div className="text-white text-sm font-medium">{p.name}</div>
                        {p.primary_contact && (
                          <div className="text-slate-400 text-xs">{p.primary_contact}</div>
                        )}
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="px-4 py-3 text-slate-400 text-sm">No partnerships found</div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default PageNavigation;
