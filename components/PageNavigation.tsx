'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Users, Settings, Shield, TrendingUp } from 'lucide-react';

export function PageNavigation() {
  const pathname = usePathname();

  const navItems = [
    { href: '/partnerships', label: 'Partnerships', icon: Home },
    { href: '/executive', label: 'Executive', icon: TrendingUp },
    { href: '/users', label: 'Users', icon: Users },
    { href: '/settings/integrations', label: 'Settings', icon: Settings },
    { href: '/admin', label: 'Admin', icon: Shield },
  ];

  return (
    <nav className="bg-slate-900 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-6">
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
      </div>
    </nav>
  );
}

export default PageNavigation;
