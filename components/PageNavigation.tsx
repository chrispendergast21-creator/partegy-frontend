'use client';

import { useRouter, usePathname } from 'next/navigation';
import { 
  Home, 
  Building2, 
  BarChart3, 
  FileText
} from 'lucide-react';

const navigationItems = [
  { name: 'Home', href: '/dashboard', icon: Home },
  { name: 'Partnerships', href: '/partnerships', icon: Building2 },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Reports', href: '/reports', icon: FileText },
];

export function PageNavigation() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="flex items-center space-x-1">
      {navigationItems.map((item) => {
        const isActive = pathname === item.href || 
                        (pathname.startsWith('/partnership/') && item.href === '/partnerships') ||
                        (pathname === '/dashboardtest' && item.href === '/dashboard');
        
        return (
          <button
            key={item.name}
            onClick={() => router.push(item.href)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all font-medium text-sm ${
              isActive
                ? 'text-white bg-white/20 font-semibold'
                : 'text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <item.icon className="w-4 h-4" />
            <span>{item.name}</span>
          </button>
        );
      })}
    </div>
  );
}
