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

// Default demo organization for showcase
const demoOrg: Organization = {
  id: 1,
  name: 'Demo Corporation',
  slug: 'demo-corp',
  subscription_tier: 'enterprise',
  user_count: 5,
  partnership_count: 100,
  max_partnerships: 1000,
  max_users: 50
};

export const useOrganization = create<OrganizationState>()(
  persist(
    (set) => ({
      currentOrg: demoOrg, // Default to demo org with 100 partnerships
      organizations: [demoOrg],
      setCurrentOrg: (org) => set({ currentOrg: org }),
      setOrganizations: (orgs) => set({ organizations: orgs }),
    }),
    {
      name: 'partegy-org-storage',
    }
  )
);
