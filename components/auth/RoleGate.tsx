'use client';

import { useAuth } from '@/lib/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface RoleGateProps {
  children: React.ReactNode;
  requiredPermission?: string;
  requiredRole?: string;
  fallbackUrl?: string;
}

export default function RoleGate({ 
  children, 
  requiredPermission, 
  requiredRole,
  fallbackUrl = '/home'
}: RoleGateProps) {
  const { user, loading, hasPermission, isRole } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      if (requiredPermission && !hasPermission(requiredPermission as any)) {
        router.push(fallbackUrl);
        return;
      }

      if (requiredRole && !isRole(requiredRole)) {
        router.push(fallbackUrl);
        return;
      }
    }
  }, [user, loading, requiredPermission, requiredRole]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-gray-600">Please log in</div>
      </div>
    );
  }

  if (requiredPermission && !hasPermission(requiredPermission as any)) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600">You don't have permission to view this page.</p>
          <button 
            onClick={() => router.push(fallbackUrl)}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  if (requiredRole && !isRole(requiredRole)) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600">This page is only available to {requiredRole}s.</p>
          <button 
            onClick={() => router.push(fallbackUrl)}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
