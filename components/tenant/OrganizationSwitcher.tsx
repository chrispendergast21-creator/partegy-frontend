'use client';

import { useEffect, useState } from 'react';
import { useOrganization } from '@/lib/useOrganization';
import { Building2, ChevronDown, Check } from 'lucide-react';
import axios from 'axios';
import { API_URL } from '@/lib/api';

export default function OrganizationSwitcher() {
  const { currentOrg, organizations, setCurrentOrg, setOrganizations } = useOrganization();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrganizations();
  }, []);

  const loadOrganizations = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/tenants`);
      setOrganizations(response.data);
      
      // Set first org as default if none selected
      if (!currentOrg && response.data.length > 0) {
        setCurrentOrg(response.data[0]);
      }
    } catch (error) {
      console.error('Failed to load organizations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOrgChange = (org: any) => {
    setCurrentOrg(org);
    setIsOpen(false);
    // Reload the page to fetch new org data
    window.location.reload();
  };

  if (loading) {
    return (
      <div className="flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-lg animate-pulse">
        <Building2 className="w-5 h-5 text-gray-400" />
        <span className="text-sm text-gray-400">Loading...</span>
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
      >
        <Building2 className="w-5 h-5 text-[#60a5fa]" />
        <div className="text-left">
          <div className="text-sm font-medium text-gray-900">
            {currentOrg?.name || 'Select Organization'}
          </div>
          <div className="text-xs text-gray-500">
            {currentOrg?.partnership_count || 0} partnerships
          </div>
        </div>
        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-20">
            <div className="p-2">
              <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase">
                Organizations ({organizations.length})
              </div>
              {organizations.map((org) => (
                <button
                  key={org.id}
                  onClick={() => handleOrgChange(org)}
                  className={`w-full flex items-center justify-between px-3 py-3 rounded-lg hover:bg-gray-50 transition-colors ${
                    currentOrg?.id === org.id ? 'bg-blue-50' : ''
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      currentOrg?.id === org.id 
                        ? 'bg-gradient-to-r from-[#60a5fa] to-[#60e1fa]' 
                        : 'bg-gray-100'
                    }`}>
                      <Building2 className={`w-5 h-5 ${
                        currentOrg?.id === org.id ? 'text-white' : 'text-gray-600'
                      }`} />
                    </div>
                    <div className="text-left">
                      <div className="font-medium text-gray-900">{org.name}</div>
                      <div className="text-xs text-gray-500">
                        {org.partnership_count} partnerships • {org.user_count} users
                      </div>
                      <div className="text-xs text-gray-400 mt-0.5">
                        {org.subscription_tier}
                      </div>
                    </div>
                  </div>
                  {currentOrg?.id === org.id && (
                    <Check className="w-5 h-5 text-[#60a5fa]" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
