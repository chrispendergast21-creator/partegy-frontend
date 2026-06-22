'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Home, Briefcase, Settings, ChevronDown, BarChart3, FileText, Users, Shield, Plus, Search, X, Wrench, Menu } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://partnership-api-production.up.railway.app';

export function PageNavigation() {
  const pathname = usePathname();
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const toolsRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { href: '/home', label: 'Home', icon: Home },
    { href: '/executive', label: 'Dashboard', icon: BarChart3 },
    { href: '/partnerships', label: 'Partnerships', icon: Briefcase },
    { href: '/settings/integrations', label: 'Settings', icon: Settings },
  ];

  const toolsItems = [
    { href: '/analytics', label: 'Analytics', icon: BarChart3 },
    { href: '/reports', label: 'Reports', icon: FileText },
    { href: '/users', label: 'Users', icon: Users },
    { href: '/admin', label: 'Admin', icon: Shield },
    { href: '/partnerships/new', label: 'Add Partnership', icon: Plus },
  ];

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
      }
      if (toolsRef.current && !toolsRef.current.contains(e.target as Node)) {
        setToolsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setMobileSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      setSearchOpen(false);
      return;
    }

    const timeout = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE}/api/partnerships?search=${encodeURIComponent(query)}`);
        const data = await res.json();
        setResults(data.slice(0, 6));
        setSearchOpen(true);
      } catch {
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
        setSearchOpen(true);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [query]);

  const handleSelect = (id: number) => {
    router.push(`/partnership/${id}`);
    setQuery('');
    setSearchOpen(false);
    setMobileSearchOpen(false);
    setMobileMenuOpen(false);
  };

  const isToolsActive = toolsItems.some(t => pathname === t.href);
  const allMobileItems = [...navItems, ...toolsItems];

  return (
    <nav className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <div className="flex items-center space-x-2 py-4">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-emerald-400 rounded-sm"></div>
              <div className="w-2 h-2 bg-blue-400 rounded-sm"></div>
            </div>
            <span className="font-bold text-white text-lg">Partegy</span>
          </div>

          {/* ===== DESKTOP NAV (md and up) ===== */}
          <div className="hidden md:flex items-center space-x-1 flex-1 ml-6">
            {navItems.map(({ href, label, icon: Icon }) => (
              <Link key={href} href={href}
                className={`flex items-center space-x-2 px-4 py-4 border-b-2 transition-colors ${
                  pathname === href ? 'border-blue-500 text-white' : 'border-transparent text-slate-400 hover:text-white'
                }`}>
                <Icon className="w-4 h-4" />
                <span className="font-medium">{label}</span>
              </Link>
            ))}

            <div className="relative" ref={toolsRef}>
              <button onClick={() => setToolsOpen(!toolsOpen)}
                className={`flex items-center space-x-2 px-4 py-4 border-b-2 transition-colors ${
                  isToolsActive ? 'border-blue-500 text-white' : 'border-transparent text-slate-400 hover:text-white'
                }`}>
                <Wrench className="w-4 h-4" />
                <span className="font-medium">Tools</span>
                <ChevronDown className={`w-3 h-3 transition-transform ${toolsOpen ? 'rotate-180' : ''}`} />
              </button>

              {toolsOpen && (
                <div className="absolute left-0 top-14 w-52 bg-slate-800 border border-slate-700 rounded-xl shadow-2xl z-50 overflow-hidden">
                  {toolsItems.map(({ href, label, icon: Icon }) => (
                    <Link key={href} href={href} onClick={() => setToolsOpen(false)}
                      className={`flex items-center space-x-3 px-4 py-3 hover:bg-slate-700 transition-colors ${
                        pathname === href ? 'bg-slate-700 text-white' : 'text-slate-300'
                      }`}>
                      <Icon className="w-4 h-4 text-slate-400" />
                      <span className="text-sm font-medium">{label}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Desktop Search */}
          <div className="hidden md:block relative" ref={searchRef}>
            <div className="flex items-center bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 w-64 focus-within:border-blue-500 transition-colors">
              <Search className="w-4 h-4 text-slate-400 mr-2 flex-shrink-0" />
              <input type="text" placeholder="Search partnerships..." value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="bg-transparent text-white text-sm outline-none w-full placeholder-slate-400" />
              {query && (
                <button onClick={() => { setQuery(''); setSearchOpen(false); }}>
                  <X className="w-4 h-4 text-slate-400 hover:text-white" />
                </button>
              )}
            </div>

            {searchOpen && (
              <div className="absolute right-0 top-12 w-80 bg-slate-800 border border-slate-700 rounded-xl shadow-2xl z-50 overflow-hidden">
                {loading ? (
                  <div className="px-4 py-3 text-slate-400 text-sm">Searching...</div>
                ) : results.length > 0 ? (
                  results.map((p) => (
                    <button key={p.id} onClick={() => handleSelect(p.id)}
                      className="w-full px-4 py-3 flex items-center space-x-3 hover:bg-slate-700 transition-colors text-left">
                      <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                        {p.name.charAt(0)}
                      </div>
                      <div>
                        <div className="text-white text-sm font-medium">{p.name}</div>
                        {p.primary_contact && <div className="text-slate-400 text-xs">{p.primary_contact}</div>}
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="px-4 py-3 text-slate-400 text-sm">No partnerships found</div>
                )}
              </div>
            )}
          </div>

          {/* ===== MOBILE CONTROLS (below md) ===== */}
          <div className="flex md:hidden items-center space-x-1">
            <button onClick={() => setMobileSearchOpen(!mobileSearchOpen)} className="p-2 text-slate-300 hover:text-white" aria-label="Search">
              <Search className="w-5 h-5" />
            </button>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-slate-300 hover:text-white" aria-label="Menu">
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar (toggles below header) */}
        {mobileSearchOpen && (
          <div className="md:hidden pb-4">
            <div className="relative" ref={searchRef}>
              <div className="flex items-center bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 focus-within:border-blue-500 transition-colors">
                <Search className="w-4 h-4 text-slate-400 mr-2 flex-shrink-0" />
                <input type="text" placeholder="Search partnerships..." value={query} autoFocus
                  onChange={(e) => setQuery(e.target.value)}
                  className="bg-transparent text-white text-sm outline-none w-full placeholder-slate-400" />
                {query && (
                  <button onClick={() => { setQuery(''); setSearchOpen(false); }}>
                    <X className="w-4 h-4 text-slate-400 hover:text-white" />
                  </button>
                )}
              </div>
              {searchOpen && (
                <div className="mt-2 w-full bg-slate-800 border border-slate-700 rounded-xl shadow-2xl overflow-hidden">
                  {loading ? (
                    <div className="px-4 py-3 text-slate-400 text-sm">Searching...</div>
                  ) : results.length > 0 ? (
                    results.map((p) => (
                      <button key={p.id} onClick={() => handleSelect(p.id)}
                        className="w-full px-4 py-3 flex items-center space-x-3 hover:bg-slate-700 transition-colors text-left">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                          {p.name.charAt(0)}
                        </div>
                        <div>
                          <div className="text-white text-sm font-medium">{p.name}</div>
                          {p.primary_contact && <div className="text-slate-400 text-xs">{p.primary_contact}</div>}
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
        )}

        {/* Mobile Slide-down Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 border-t border-slate-800 pt-2">
            <div className="flex flex-col space-y-1">
              {navItems.map(({ href, label, icon: Icon }) => (
                <Link key={href} href={href} onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-colors ${
                    pathname === href ? 'bg-slate-800 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                  }`}>
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{label}</span>
                </Link>
              ))}

              <div className="px-3 py-2 mt-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">Tools</div>
              {toolsItems.map(({ href, label, icon: Icon }) => (
                <Link key={href} href={href} onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-colors ${
                    pathname === href ? 'bg-slate-800 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                  }`}>
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{label}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default PageNavigation;
