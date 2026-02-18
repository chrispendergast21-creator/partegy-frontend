'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useOrganization } from '@/lib/useOrganization';
import { API_URL } from '@/lib/api';
import { 
  ArrowLeft, 
  Building2, 
  Save, 
  Users, 
  DollarSign, 
  Target, 
  Calendar,
  FileText,
  Plus,
  Trash2,
  CheckCircle
} from 'lucide-react';

export default function NewPartnershipPage() {
  const router = useRouter();
  const { currentOrg } = useOrganization();
  const [saving, setSaving] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    tier: 'Growth',
    partnership_type: 'CO_SELL',
    strategic_objective: '',
    revenue: '',
    pipeline: '',
    next_milestone: 'Quarterly Review',
    days_to_milestone: '30',
    status: 'active',
    lifecycle: 'growth'
  });

  const [stakeholders, setStakeholders] = useState([
    {
      name: '',
      role: 'Partnership Manager',
      email: '',
      phone: '',
      is_primary: true
    }
  ]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentOrg) return;

    setSaving(true);
    try {
      const partnershipData = {
        ...formData,
        revenue: parseFloat(formData.revenue) || 0,
        pipeline: parseFloat(formData.pipeline) || 0,
        days_to_milestone: parseInt(formData.days_to_milestone),
        organization_id: currentOrg.id,
        health: 'healthy',
        health_score: 75
      };

      const response = await axios.post(`${API_URL}/api/partnerships`, partnershipData);
      
      // Add stakeholders if any are filled out
      const validStakeholders = stakeholders.filter(s => s.name && s.email);
      for (const stakeholder of validStakeholders) {
        await axios.post(`${API_URL}/api/partnerships/${response.data.id}/stakeholders`, stakeholder);
      }

      router.push('/partnerships');
    } catch (error) {
      console.error('Failed to create partnership:', error);
      alert('Failed to create partnership');
    } finally {
      setSaving(false);
    }
  };

  const addStakeholder = () => {
    setStakeholders([...stakeholders, {
      name: '',
      role: 'Team Member',
      email: '',
      phone: '',
      is_primary: false
    }]);
  };

  const removeStakeholder = (index: number) => {
    setStakeholders(stakeholders.filter((_, i) => i !== index));
  };

  const updateStakeholder = (index: number, field: string, value: any) => {
    const updated = [...stakeholders];
    updated[index] = { ...updated[index], [field]: value };
    setStakeholders(updated);
  };

  if (!currentOrg) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <Building2 className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No Organization Selected</h2>
          <p className="text-gray-600">Please select an organization first.</p>
        </div>
      </div>
    );
  }

  const steps = [
    { id: 1, name: 'Basic Info', description: 'Partnership details' },
    { id: 2, name: 'Financial', description: 'Revenue & pipeline' },
    { id: 3, name: 'Stakeholders', description: 'Team contacts' },
    { id: 4, name: 'Strategy', description: 'Goals & milestones' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="bg-gradient-to-r from-[#1e293b] via-[#334155] to-[#475569] border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push('/partnerships')}
                className="p-2 text-gray-300 hover:bg-white/10 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-[#60a5fa] to-[#60e1fa] bg-clip-text text-transparent">
                  Create New Partnership
                </h1>
                <p className="text-gray-300 mt-1">{currentOrg.name}</p>
              </div>
            </div>
            <button
              onClick={handleSubmit}
              disabled={saving}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-[#60a5fa] to-[#60e1fa] text-white rounded-xl hover:shadow-lg transition-all disabled:opacity-50"
            >
              <Save className="w-5 h-5" />
              <span>{saving ? 'Creating...' : 'Create Partnership'}</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-8 py-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, idx) => (
              <div key={step.id} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm ${
                    currentStep >= step.id 
                      ? 'bg-gradient-to-r from-[#60a5fa] to-[#60e1fa] text-white' 
                      : 'bg-white border-2 border-gray-300 text-gray-400'
                  }`}>
                    {currentStep > step.id ? <CheckCircle className="w-6 h-6" /> : step.id}
                  </div>
                  <div className="mt-2 text-center">
                    <div className={`text-sm font-medium ${currentStep >= step.id ? 'text-gray-900' : 'text-gray-500'}`}>
                      {step.name}
                    </div>
                    <div className="text-xs text-gray-500">{step.description}</div>
                  </div>
                </div>
                {idx < steps.length - 1 && (
                  <div className={`flex-1 h-1 mx-8 rounded ${
                    currentStep > step.id ? 'bg-gradient-to-r from-[#60a5fa] to-[#60e1fa]' : 'bg-gray-200'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
            {/* Step 1: Basic Information */}
            {currentStep === 1 && (
              <div className="p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#60a5fa] to-[#60e1fa] flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Basic Information</h2>
                    <p className="text-gray-600">Essential partnership details</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Partnership Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#60a5fa] focus:border-transparent bg-white/50"
                      placeholder="Acme Corporation"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Partnership Type *
                    </label>
                    <select
                      value={formData.partnership_type}
                      onChange={(e) => setFormData({ ...formData, partnership_type: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#60a5fa] focus:border-transparent bg-white/50"
                    >
                      <option value="STRATEGIC_ALLIANCE">Strategic Alliance</option>
                      <option value="CO_SELL">Co-Sell</option>
                      <option value="REFERRAL">Referral</option>
                      <option value="DELIVERY">Delivery</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Partnership Tier *
                    </label>
                    <select
                      value={formData.tier}
                      onChange={(e) => setFormData({ ...formData, tier: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#60a5fa] focus:border-transparent bg-white/50"
                    >
                      <option value="Strategic">Strategic</option>
                      <option value="Growth">Growth</option>
                      <option value="Emerging">Emerging</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Strategic Objective
                    </label>
                    <textarea
                      value={formData.strategic_objective}
                      onChange={(e) => setFormData({ ...formData, strategic_objective: e.target.value })}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#60a5fa] focus:border-transparent bg-white/50"
                      placeholder="Describe the strategic goals and objectives for this partnership..."
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Financial Information */}
            {currentStep === 2 && (
              <div className="p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-green-400 to-green-600 flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Financial Information</h2>
                    <p className="text-gray-600">Revenue and pipeline projections</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Annual Revenue ($)
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                      <input
                        type="number"
                        value={formData.revenue}
                        onChange={(e) => setFormData({ ...formData, revenue: e.target.value })}
                        className="w-full pl-8 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#60a5fa] focus:border-transparent bg-white/50"
                        placeholder="1,000,000"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Expected annual revenue from this partnership</p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Pipeline Value ($)
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                      <input
                        type="number"
                        value={formData.pipeline}
                        onChange={(e) => setFormData({ ...formData, pipeline: e.target.value })}
                        className="w-full pl-8 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#60a5fa] focus:border-transparent bg-white/50"
                        placeholder="2,500,000"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Total potential pipeline opportunity</p>
                  </div>
                </div>

                <div className="mt-8 p-6 bg-gradient-to-r from-[#60a5fa]/10 to-[#60e1fa]/10 rounded-xl border border-[#60a5fa]/20">
                  <h3 className="font-semibold text-gray-900 mb-2">Revenue Projection</h3>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-[#60a5fa]">
                        ${formData.revenue ? (parseFloat(formData.revenue) / 1000000).toFixed(1) : '0'}M
                      </div>
                      <div className="text-sm text-gray-600">Annual Revenue</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-[#60e1fa]">
                        ${formData.pipeline ? (parseFloat(formData.pipeline) / 1000000).toFixed(1) : '0'}M
                      </div>
                      <div className="text-sm text-gray-600">Pipeline</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-600">
                        {formData.pipeline && formData.revenue ? 
                          ((parseFloat(formData.pipeline) / parseFloat(formData.revenue)) * 100).toFixed(0) : '0'}%
                      </div>
                      <div className="text-sm text-gray-600">Pipeline Ratio</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Stakeholders */}
            {currentStep === 3 && (
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-400 to-purple-600 flex items-center justify-center">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">Partnership Stakeholders</h2>
                      <p className="text-gray-600">Key contacts and team members</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={addStakeholder}
                    className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-[#60a5fa] to-[#60e1fa] text-white rounded-lg hover:shadow-lg transition-all"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Stakeholder</span>
                  </button>
                </div>

                <div className="space-y-6">
                  {stakeholders.map((stakeholder, index) => (
                    <div key={index} className="p-6 bg-gray-50 rounded-xl border border-gray-200">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-gray-900">
                          {stakeholder.is_primary ? 'Primary Contact' : `Stakeholder ${index + 1}`}
                        </h3>
                        {!stakeholder.is_primary && (
                          <button
                            type="button"
                            onClick={() => removeStakeholder(index)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Full Name
                          </label>
                          <input
                            type="text"
                            value={stakeholder.name}
                            onChange={(e) => updateStakeholder(index, 'name', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#60a5fa] focus:border-transparent"
                            placeholder="John Smith"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Role
                          </label>
                          <input
                            type="text"
                            value={stakeholder.role}
                            onChange={(e) => updateStakeholder(index, 'role', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#60a5fa] focus:border-transparent"
                            placeholder="Partnership Manager"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email
                          </label>
                          <input
                            type="email"
                            value={stakeholder.email}
                            onChange={(e) => updateStakeholder(index, 'email', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#60a5fa] focus:border-transparent"
                            placeholder="john@company.com"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Phone
                          </label>
                          <input
                            type="tel"
                            value={stakeholder.phone}
                            onChange={(e) => updateStakeholder(index, 'phone', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#60a5fa] focus:border-transparent"
                            placeholder="+1 (555) 123-4567"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4: Strategy & Milestones */}
            {currentStep === 4 && (
              <div className="p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-orange-400 to-orange-600 flex items-center justify-center">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Strategic Planning</h2>
                    <p className="text-gray-600">Goals, milestones, and timeline</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Next Milestone
                    </label>
                    <input
                      type="text"
                      value={formData.next_milestone}
                      onChange={(e) => setFormData({ ...formData, next_milestone: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#60a5fa] focus:border-transparent bg-white/50"
                      placeholder="Quarterly Business Review"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Days Until Milestone
                    </label>
                    <input
                      type="number"
                      value={formData.days_to_milestone}
                      onChange={(e) => setFormData({ ...formData, days_to_milestone: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#60a5fa] focus:border-transparent bg-white/50"
                      placeholder="30"
                    />
                  </div>
                </div>

                <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-green-100 rounded-xl border border-green-200">
                  <div className="flex items-center space-x-3 mb-4">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                    <h3 className="font-semibold text-green-900">Partnership Summary</h3>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <div className="text-sm text-green-700">Name</div>
                      <div className="font-semibold text-green-900">{formData.name || 'TBD'}</div>
                    </div>
                    <div>
                      <div className="text-sm text-green-700">Type</div>
                      <div className="font-semibold text-green-900">{formData.partnership_type.replace('_', ' ')}</div>
                    </div>
                    <div>
                      <div className="text-sm text-green-700">Tier</div>
                      <div className="font-semibold text-green-900">{formData.tier}</div>
                    </div>
                    <div>
                      <div className="text-sm text-green-700">Revenue</div>
                      <div className="font-semibold text-green-900">
                        ${formData.revenue ? (parseFloat(formData.revenue) / 1000000).toFixed(1) + 'M' : 'TBD'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="px-8 py-6 bg-gray-50 border-t border-gray-200 flex justify-between">
              <button
                type="button"
                onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                disabled={currentStep === 1}
                className="flex items-center space-x-2 px-6 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>
              
              {currentStep < 4 ? (
                <button
                  type="button"
                  onClick={() => setCurrentStep(Math.min(4, currentStep + 1))}
                  className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-[#60a5fa] to-[#60e1fa] text-white rounded-xl hover:shadow-lg transition-all"
                >
                  <span>Next</span>
                  <ArrowLeft className="w-4 h-4 rotate-180" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={saving}
                  className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:shadow-lg transition-all disabled:opacity-50"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>{saving ? 'Creating...' : 'Create Partnership'}</span>
                </button>
              )}
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}
