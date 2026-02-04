import { useEffect, useState } from 'react';
import axios from 'axios';

export interface User {
  id: number;
  email: string;
  name: string;
  role: string;
  is_internal: boolean;
  permissions: {
    view_dashboard: boolean;
    view_health_scores: boolean;
    view_recommendations: boolean;
    edit_execution: boolean;
    edit_strategy: boolean;
    override_health: boolean;
    approve_partner_updates: boolean;
    manage_users: boolean;
    view_shared_execution: boolean;
    edit_shared_execution: boolean;
  };
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/users/me');
      setUser(response.data);
    } catch (error) {
      console.error('Failed to load user:', error);
    } finally {
      setLoading(false);
    }
  };

  const hasPermission = (permission: keyof User['permissions']) => {
    return user?.permissions[permission] || false;
  };

  const isRole = (role: string) => {
    return user?.role === role;
  };

  return { user, loading, hasPermission, isRole };
}
