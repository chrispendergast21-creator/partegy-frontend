'use client';

import RoleGate from '@/components/auth/RoleGate';
import ExecutiveDashboardContent from './content';

export default function ExecutiveDashboardPage() {
  return (
    <RoleGate requiredPermission="view_dashboard">
      <ExecutiveDashboardContent />
    </RoleGate>
  );
}
