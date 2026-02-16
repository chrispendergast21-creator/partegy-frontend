'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useOrganization } from '@/lib/useOrganization';
import { API_URL } from '@/lib/api';
import { ArrowLeft, Building2, Save } from 'lucide-react';

export default function NewPartnershipPage() {
  const router = useRouter();
  const { currentOrg } = useOrganization();
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    tier: 'Growth',
    partnership_type: 'CO_SELL',
    strategic_objective: '',
    revenue: '',
    pipeline: '',
    next_milestone: 'Quarterly Review',
    days_to_milestone: '30'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      await axios.post(`${API_URL}/api/partnerships`, {
        ...formData,
        revenue: parseFloat(formData.revenue) || 0,
        pipeline: parseFloat(formData.pipeline) || 0,
        days_to_milestone: parseInt(formData.days_to_milestone),
        organization_id: currentOrg?.id
      });

      router.push('/partnerships');
    } catch (error) {
      console.error('Failed to create partnership:', error);
      alert('Failed to create partnership');
    } finally {
      setSaving(false);
    }
  };

  if (!currentOrg) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Building2 className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No Organization Selected</h2>
          <p className="text-gray-600">Please select an organization first.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-[#1e293b] border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push('/partnerships')}
                className="p-2 text-gray-300 hover:bg-gray-700 rounded-lg"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-3xl font-bold text-white">Add Partnership</h1>
                <p className="text-gray-400 mt-1">{currentOrg.name}</p>
              </div>
            </div>
            <button
              onClick={handleSubmit}
              disabled={saving}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-[#60a5fa] to-[#60e1fa] text-white rounded-lg hover:opacity-90 disabled:opacity-50"
            >
              <Save className="w-5 h-5" />
              <span>{saving ? 'Saving...' : 'Save Partnership'}</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-8 py-8">
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="space-y-6">
            {/* Basic Information */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Basic Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Partnership Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#60a5fa] focus:border-transparent"
                    placeholder="Acme Corporation"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Partnership Type *
                  </label>
                  <select
                    value={formData.partnership_type}
                    onChange={(e) => setFormData({ ...formData, partnership_type: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#60a5fa] focus:border-transparent"
                  >
                    <option value="STRATEGIC_ALLIANCE">Strategic Alliance</option>
                    <option value="CO_SELL">Co-Sell</option>
                    <option value="REFERRAL">Referral</option>
                    <option value="DELIVERY">Delivery</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tier *
                  </label>
                  <select
                    value={formData.tier}
                    onChange={(e) => setFormData({ ...formData, tier: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#60a5fa] focus:border-transparent"
                  >
                    <option value="Strategic">Strategic</option>
                    <option value="Growth">Growth</option>
                    <option value="Emerging">Emerging</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Strategic Objective
                  </label>
                  <textarea
                    value={formData.strategic_objective}
                    onChange={(e) => setFormData({ ...formData, strategic_objective: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#60a5fa] focus:border-transparent"
                    placeholder="Describe the strategic goals and objectives for this partnership..."
                  />
                </div>
              </div>
            </div>

            {/* Financial Information */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Financial Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Annual Revenue ($)
                  </label>
                  <input
                    type="number"
                    value={formData.revenue}
                    onChange={(e) => setFormData({ ...formData, revenue: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#60a5fa] focus:border-transparent"
                    placeholder="1000000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pipeline Value ($)
                  </label>
                  <input
                    type="number"
                    value={formData.pipeline}
                    onChange={(e) => setFormData({ ...formData, pipeline: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#60a5fa] focus:border-transparent"
                    placeholder="2500000"
                  />
                </div>
              </div>
            </div>

            {/* Milestones */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Next Milestone</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Milestone
                  </label>
                  <input
                    type="text"
                    value={formData.next_milestone}
                    onChange={(e) => setFormData({ ...formData, next_milestone: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#60a5fa] focus:border-transparent"
                    placeholder="Quarterly Business Review"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Days Until Milestone
                  </label>
                  <input
                    type="number"
                    value={formData.days_to_milestone}
                    onChange={(e) => setFormData({ ...formData, days_to_milestone: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#60a5fa] focus:border-transparent"
                    placeholder="30"
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => router.push('/partnerships')}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="px-6 py-2 bg-gradient-to-r from-[#60a5fa] to-[#60e1fa] text-white rounded-lg hover:opacity-90 disabled:opacity-50"
              >
                {saving ? 'Creating...' : 'Create Partnership'}
              </button>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}
