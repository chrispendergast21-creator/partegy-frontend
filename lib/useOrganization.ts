import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Organization {
  id: number;
  name: string;
  slug: string;
  subscription_tier: string;
  user_count: number;
  partnership_count: number;
  max_partnerships: number;
  max_users: number;
}

interface OrganizationState {
  currentOrg: Organization | null;
  organizations: Organization[];
  setCurrentOrg: (org: Organization) => void;
  setOrganizations: (orgs: Organization[]) => void;
}

export const useOrganization = create<OrganizationState>()(
  persist(
    (set) => ({
      currentOrg: null,
      organizations: [],
      setCurrentOrg: (org) => set({ currentOrg: org }),
      setOrganizations: (orgs) => set({ organizations: orgs }),
    }),
    {
      name: 'partegy-org-storage',
    }
  )
);
