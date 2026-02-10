'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { API_URL } from '@/lib/api';
import { 
  Building2, 
  Users, 
  TrendingUp, 
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  Download
} from 'lucide-react';

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

  useEffect(() => {
    loadOrganizations();
  }, []);

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

  const filteredOrgs = organizations.filter(org => {
    const matchesSearch = org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         org.slug.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTier = filterTier === 'all' || org.subscription_tier === filterTier;
    return matchesSearch && matchesTier;
  });

  const stats = {
    totalOrgs: organizations.length,
    totalUsers: organizations.reduce((sum, org) => sum + org.user_count, 0),
    totalPartnerships: organizations.reduce((sum, org) => sum + org.partnership_count, 0),
    enterpriseOrgs: organizations.filter(o => o.subscription_tier === 'enterprise').length
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#1e293b] border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-1">
                <div className="w-8 h-8 bg-[#60a5fa] rounded"></div>
                <div className="w-8 h-8 bg-[#60e1fa] rounded"></div>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Admin Panel</h1>
                <p className="text-gray-400 mt-1">Manage organizations and tenants</p>
              </div>
            </div>
            <button
              onClick={() => router.push('/dashboard')}
              className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={Building2}
            label="Total Organizations"
            value={stats.totalOrgs}
            color="bg-gradient-to-r from-[#60a5fa] to-[#60e1fa]"
          />
          <StatCard
            icon={Users}
            label="Total Users"
            value={stats.totalUsers}
            color="bg-gradient-to-r from-green-500 to-green-600"
          />
          <StatCard
            icon={TrendingUp}
            label="Total Partnerships"
            value={stats.totalPartnerships}
            color="bg-gradient-to-r from-purple-500 to-purple-600"
          />
          <StatCard
            icon={Building2}
            label="Enterprise Clients"
            value={stats.enterpriseOrgs}
            color="bg-gradient-to-r from-orange-500 to-orange-600"
          />
        </div>

        {/* Controls */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="relative flex-1 md:w-96">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search organizations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#60a5fa] focus:border-transparent"
                />
              </div>
              
              <select
                value={filterTier}
                onChange={(e) => setFilterTier(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#60a5fa] focus:border-transparent"
              >
                <option value="all">All Tiers</option>
                <option value="free">Free</option>
                <option value="starter">Starter</option>
                <option value="professional">Professional</option>
                <option value="enterprise">Enterprise</option>
              </select>
            </div>

            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-[#60a5fa] to-[#60e1fa] text-white rounded-lg hover:opacity-90"
            >
              <Plus className="w-5 h-5" />
              <span>New Organization</span>
            </button>
          </div>
        </div>

        {/* Organizations Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Organization
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subscription
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Usage
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Limits
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    Loading organizations...
                  </td>
                </tr>
              ) : filteredOrgs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    No organizations found
                  </td>
                </tr>
              ) : (
                filteredOrgs.map((org) => (
                  <tr key={org.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-r from-[#60a5fa] to-[#60e1fa] rounded-lg flex items-center justify-center">
                          <Building2 className="w-5 h-5 text-white" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{org.name}</div>
                          <div className="text-sm text-gray-500">{org.slug}</div>
                          {org.domain && (
                            <div className="text-xs text-gray-400">{org.domain}</div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        org.subscription_tier === 'enterprise' ? 'bg-purple-100 text-purple-800' :
                        org.subscription_tier === 'professional' ? 'bg-blue-100 text-blue-800' :
                        org.subscription_tier === 'starter' ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {org.subscription_tier}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{org.partnership_count} partnerships</div>
                      <div className="text-sm text-gray-500">{org.user_count} users</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {org.max_partnerships} partnerships max
                      </div>
                      <div className="text-sm text-gray-500">
                        {org.max_users} users max
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(org.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => router.push(`/admin/organizations/${org.id}`)}
                        className="text-[#60a5fa] hover:text-[#60e1fa] mr-4"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(org.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>

      {/* Create Organization Modal */}
      {showCreateModal && (
        <CreateOrgModal
          onClose={() => setShowCreateModal(false)}
          onSuccess={() => {
            setShowCreateModal(false);
            loadOrganizations();
          }}
        />
      )}
    </div>
  );

  async function handleDelete(id: number) {
    if (!confirm('Are you sure you want to delete this organization? This will delete all associated data.')) {
      return;
    }

    try {
      await axios.delete(`${API_URL}/api/tenants/${id}`);
      loadOrganizations();
    } catch (error) {
      console.error('Failed to delete organization:', error);
      alert('Failed to delete organization');
    }
  }
}

function StatCard({ icon: Icon, label, value, color }: any) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-lg ${color} flex items-center justify-center`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
      <div className="text-3xl font-bold text-gray-900 mb-1">{value}</div>
      <div className="text-sm font-medium text-gray-600">{label}</div>
    </div>
  );
}

function CreateOrgModal({ onClose, onSuccess }: any) {
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    domain: '',
    subscription_tier: 'free',
    max_partnerships: 50,
    max_users: 5
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await axios.post(`${API_URL}/api/tenants`, formData);
      onSuccess();
    } catch (error) {
      console.error('Failed to create organization:', error);
      alert('Failed to create organization. Slug may already exist.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleNameChange = (name: string) => {
    setFormData({
      ...formData,
      name,
      slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Create New Organization</h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Organization Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => handleNameChange(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#60a5fa] focus:border-transparent"
              placeholder="Acme Corporation"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Slug (URL identifier) *
            </label>
            <input
              type="text"
              required
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#60a5fa] focus:border-transparent"
              placeholder="acme-corporation"
            />
            <p className="text-xs text-gray-500 mt-1">Used in URLs and must be unique</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Custom Domain (optional)
            </label>
            <input
              type="text"
              value={formData.domain}
              onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#60a5fa] focus:border-transparent"
              placeholder="acme.partegy.com"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subscription Tier
              </label>
              <select
                value={formData.subscription_tier}
                onChange={(e) => setFormData({ ...formData, subscription_tier: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#60a5fa] focus:border-transparent"
              >
                <option value="free">Free</option>
                <option value="starter">Starter</option>
                <option value="professional">Professional</option>
                <option value="enterprise">Enterprise</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Max Partnerships
              </label>
              <input
                type="number"
                value={formData.max_partnerships}
                onChange={(e) => setFormData({ ...formData, max_partnerships: parseInt(e.target.value) })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#60a5fa] focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Max Users
            </label>
            <input
              type="number"
              value={formData.max_users}
              onChange={(e) => setFormData({ ...formData, max_users: parseInt(e.target.value) })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#60a5fa] focus:border-transparent"
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-2 bg-gradient-to-r from-[#60a5fa] to-[#60e1fa] text-white rounded-lg hover:opacity-90 disabled:opacity-50"
            >
              {submitting ? 'Creating...' : 'Create Organization'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
