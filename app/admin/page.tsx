'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { API_URL } from '@/lib/api';
import { PageNavigation } from '@/components/PageNavigation';
import { Building2, Users, TrendingUp, Plus, Edit, Trash2, Search } from 'lucide-react';

interface Organization {
  id: number;
  name: string;
  slug: string;
  domain: string;
  subscription_tier: string;
  subscription_status: string;
  max_partnerships: number;
  max_users: number;
  user_count: number;
  partnership_count: number;
  created_at: string;
}

export default function AdminPanel() {
  const router = useRouter();
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTier, setFilterTier] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => { loadOrganizations(); }, []);

  const loadOrganizations = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/tenants`);
      setOrganizations(response.data);
    } catch (error) {
      console.error('Failed to load organizations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this organization? This will delete all associated data.')) return;
    try {
      await axios.delete(`${API_URL}/api/tenants/${id}`);
      loadOrganizations();
    } catch {
      alert('Failed to delete organization');
    }
  };

  const filteredOrgs = organizations.filter(org => {
    const matchesSearch = org.name.toLowerCase().includes(searchTerm.toLowerCase()) || org.slug.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTier = filterTier === 'all' || org.subscription_tier === filterTier;
    return matchesSearch && matchesTier;
  });

  const tierColors: Record<string, string> = {
    enterprise: 'bg-purple-500/20 text-purple-300',
    professional: 'bg-blue-500/20 text-blue-300',
    starter: 'bg-emerald-500/20 text-emerald-300',
    free: 'bg-slate-600 text-slate-300',
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <PageNavigation />
      <main className="max-w-7xl mx-auto px-8 py-8 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Admin Panel</h1>
            <p className="text-slate-400 mt-1">Manage organizations and tenants</p>
          </div>
          <button onClick={() => setShowCreateModal(true)} className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
            <Plus className="w-4 h-4" />
            <span>New Organization</span>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { icon: Building2, label: 'Total Organizations', value: organizations.length, color: 'bg-blue-500/20 text-blue-400' },
            { icon: Users, label: 'Total Users', value: organizations.reduce((s, o) => s + o.user_count, 0), color: 'bg-emerald-500/20 text-emerald-400' },
            { icon: TrendingUp, label: 'Total Partnerships', value: organizations.reduce((s, o) => s + o.partnership_count, 0), color: 'bg-purple-500/20 text-purple-400' },
            { icon: Building2, label: 'Enterprise Clients', value: organizations.filter(o => o.subscription_tier === 'enterprise').length, color: 'bg-orange-500/20 text-orange-400' },
          ].map((stat, idx) => (
            <div key={idx} className="bg-slate-900 border border-slate-700 rounded-xl p-6">
              <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center mb-4`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-slate-400 text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Search + Table */}
        <div className="bg-slate-900 border border-slate-700 rounded-xl overflow-hidden">
          <div className="p-6 border-b border-slate-700 flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input type="text" placeholder="Search organizations..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full bg-slate-800 border border-slate-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-slate-400 text-sm" />
            </div>
            <select value={filterTier} onChange={(e) => setFilterTier(e.target.value)}
              className="px-4 py-2 bg-slate-800 border border-slate-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
              <option value="all">All Tiers</option>
              <option value="free">Free</option>
              <option value="starter">Starter</option>
              <option value="professional">Professional</option>
              <option value="enterprise">Enterprise</option>
            </select>
          </div>
          <table className="min-w-full">
            <thead className="bg-slate-800">
              <tr>
                {['Organization', 'Subscription', 'Usage', 'Limits', 'Created', 'Actions'].map((h) => (
                  <th key={h} className={`px-6 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider ${h === 'Actions' ? 'text-right' : 'text-left'}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {loading ? (
                <tr><td colSpan={6} className="px-6 py-12 text-center text-slate-400">Loading organizations...</td></tr>
              ) : filteredOrgs.length === 0 ? (
                <tr><td colSpan={6} className="px-6 py-12 text-center text-slate-400">No organizations found</td></tr>
              ) : filteredOrgs.map((org) => (
                <tr key={org.id} className="hover:bg-slate-800 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                        <Building2 className="w-5 h-5 text-white" />
                      </div>
                      <div className="ml-4">
                        <div className="text-white font-medium">{org.name}</div>
                        <div className="text-slate-400 text-sm">{org.slug}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${tierColors[org.subscription_tier] || tierColors.free}`}>{org.subscription_tier}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-slate-300 text-sm">
                    <div>{org.partnership_count} partnerships</div>
                    <div className="text-slate-400">{org.user_count} users</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-slate-400 text-sm">
                    <div>{org.max_partnerships} partnerships max</div>
                    <div>{org.max_users} users max</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-slate-400 text-sm">{new Date(org.created_at).toLocaleDateString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <button onClick={() => router.push(`/admin/organizations/${org.id}`)} className="text-slate-400 hover:text-blue-400 mr-4 transition-colors"><Edit className="w-4 h-4" /></button>
                    <button onClick={() => handleDelete(org.id)} className="text-slate-400 hover:text-red-400 transition-colors"><Trash2 className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
