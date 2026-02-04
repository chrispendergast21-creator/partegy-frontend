'use client';

import { useAuth } from '@/lib/useAuth';

interface CanProps {
  permission?: string;
  role?: string;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export default function Can({ permission, role, children, fallback = null }: CanProps) {
  const { user, hasPermission, isRole } = useAuth();

  if (!user) return <>{fallback}</>;

  if (permission && !hasPermission(permission as any)) {
    return <>{fallback}</>;
  }

  if (role && !isRole(role)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
