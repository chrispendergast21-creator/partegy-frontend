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
                        (pathname.startsWith('/partnership/') && item.href === '/partnerships');
        
        return (
          <button
            key={item.name}
            onClick={() => router.push(item.href)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all font-semibold ${
              isActive
                ? 'bg-white/20 text-white border border-white/30'
                : 'text-gray-300 hover:bg-white/10 hover:text-white'
            }`}
          >
            <item.icon className="w-4 h-4" />
            <span className="hidden sm:inline">{item.name}</span>
          </button>
        );
      })}
    </div>
  );
}
