'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { PageNavigation } from '@/components/PageNavigation';
import { Plug, Check, RefreshCw, Settings, X } from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://partnership-api-production.up.railway.app';

const availableIntegrations = [
  { type: 'SALESFORCE', name: 'Salesforce', description: 'Sync partnerships from Salesforce Accounts and Opportunities', logo: '☁️', category: 'CRM' },
  { type: 'IMPARTNER', name: 'Impartner PRM', description: 'Pull partner data, deal registration, and training completion', logo: '🤝', category: 'PRM' },
  { type: 'NETSUITE', name: 'NetSuite', description: 'Sync customer and transaction data from NetSuite ERP', logo: '💼', category: 'ERP' },
  { type: 'HUBSPOT', name: 'HubSpot', description: 'Import companies, deals, and engagement data', logo: '🔶', category: 'CRM' },
  { type: 'SLACK', name: 'Slack', description: 'Track partnership engagement through Slack channels', logo: '💬', category: 'Communication' },
  { type: 'MICROSOFT_TEAMS', name: 'Microsoft Teams', description: 'Monitor partnership meetings and collaboration', logo: '👥', category: 'Communication' },
];

export default function IntegrationsPage() {
  const [integrations, setIntegrations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [selectedType, setSelectedType] = useState('');

  useEffect(() => { loadIntegrations(); }, []);

  const loadIntegrations = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/integrations`);
      setIntegrations(response.data);
    } catch {
      setIntegrations([]);
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = async (id: string, currentState: boolean) => {
    try {
      await axios.patch(`${API_URL}/api/integrations/${id}`, { enabled: !currentState });
      loadIntegrations();
    } catch { console.error('Failed to toggle'); }
  };

  const handleSync = async (id: string) => {
    try {
      await axios.post(`${API_URL}/api/integrations/${id}/sync`);
      alert('Sync started!');
      loadIntegrations();
    } catch { console.error('Failed to sync'); }
  };

  const getStatus = (type: string) => integrations.find(i => i.type === type);

  const connectedCount = availableIntegrations.filter(i => getStatus(i.type)?.enabled).length;

  return (
    <div className="min-h-screen bg-slate-950">
      <PageNavigation />
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">Integrations</h1>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">Connect Partegy to your existing systems</p>
          </div>
          <div className="bg-slate-900 border border-slate-700 rounded-xl px-6 py-3 text-center self-start sm:self-auto">
            <div className="text-2xl font-bold text-white">{connectedCount}/{availableIntegrations.length}</div>
            <div className="text-slate-400 text-sm">Connected</div>
          </div>
        </div>

        {/* Categories */}
        {['CRM', 'PRM', 'ERP', 'Communication'].map(category => {
          const categoryIntegrations = availableIntegrations.filter(i => i.category === category);
          return (
            <div key={category}>
              <h2 className="text-lg font-semibold text-slate-300 mb-4">{category}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryIntegrations.map(integration => {
                  const status = getStatus(integration.type);
                  const isConnected = status?.enabled;
                  return (
                    <div key={integration.type} className={`bg-slate-900 border rounded-xl p-6 transition-colors ${isConnected ? 'border-emerald-500/30' : 'border-slate-700'}`}>
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="text-3xl">{integration.logo}</div>
                          <div>
                            <h3 className="text-white font-semibold">{integration.name}</h3>
                            <span className="text-slate-500 text-xs">{integration.category}</span>
                          </div>
                        </div>
                        {isConnected && (
                          <span className="flex items-center space-x-1 px-2 py-1 bg-emerald-500/20 text-emerald-300 text-xs rounded-full">
                            <Check className="w-3 h-3" /><span>Connected</span>
                          </span>
                        )}
                      </div>
                      <p className="text-slate-400 text-sm mb-6">{integration.description}</p>
                      {isConnected ? (
                        <div className="space-y-3">
                          {status?.last_sync && (
                            <div className="flex justify-between text-sm">
                              <span className="text-slate-400">Last synced</span>
                              <span className="text-white">{new Date(status.last_sync).toLocaleDateString()}</span>
                            </div>
                          )}
                          <div className="flex space-x-2">
                            <button onClick={() => handleSync(status.id)} className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors">
                              <RefreshCw className="w-3 h-3" /><span>Sync Now</span>
                            </button>
                            <button onClick={() => handleToggle(status.id, isConnected)} className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm rounded-lg transition-colors">
                              <Settings className="w-4 h-4" />
                            </button>
                          </div>
                          <button onClick={() => handleToggle(status.id, isConnected)} className="w-full text-sm text-red-400 hover:text-red-300 transition-colors">
                            Disconnect
                          </button>
                        </div>
                      ) : (
                        <button onClick={() => { setSelectedType(integration.type); setShowConnectModal(true); }}
                          className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors">
                          Connect {integration.name}
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </main>

      {showConnectModal && (
        <ConnectModal type={selectedType} onClose={() => setShowConnectModal(false)} onSuccess={() => { setShowConnectModal(false); loadIntegrations(); }} />
      )}
    </div>
  );
}

function ConnectModal({ type, onClose, onSuccess }: any) {
  const [credentials, setCredentials] = useState({ client_id: '', client_secret: '', instance_url: '', api_key: '' });
  const [loading, setLoading] = useState(false);

  const getFields = () => {
    switch (type) {
      case 'SALESFORCE': return ['client_id', 'client_secret', 'instance_url'];
      case 'IMPARTNER': return ['api_key', 'instance_url'];
      case 'NETSUITE': return ['client_id', 'client_secret'];
      default: return ['api_key'];
    }
  };

  const handleConnect = async () => {
    setLoading(true);
    try {
      await axios.post(`${API_URL}/api/integrations`, { type, credentials });
      onSuccess();
    } catch {
      alert('Failed to connect. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-slate-900 border border-slate-700 rounded-xl max-w-md w-full mx-4">
        <div className="p-6 border-b border-slate-700 flex items-center justify-between">
          <h3 className="text-xl font-bold text-white">Connect {type}</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
        </div>
        <div className="p-6 space-y-4">
          {getFields().map(field => (
            <div key={field}>
              <label className="block text-sm font-medium text-slate-300 mb-2">{field.replace(/_/g, ' ').toUpperCase()}</label>
              <input type={field.includes('secret') ? 'password' : 'text'}
                value={credentials[field as keyof typeof credentials]}
                onChange={(e) => setCredentials({ ...credentials, [field]: e.target.value })}
                className="w-full px-4 py-2 bg-slate-800 border border-slate-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={`Enter ${field.replace(/_/g, ' ')}`} />
            </div>
          ))}
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
            <p className="text-blue-300 text-sm">In production, this would redirect to the provider's OAuth flow.</p>
          </div>
        </div>
        <div className="p-6 border-t border-slate-700 flex space-x-3">
          <button onClick={onClose} className="flex-1 px-4 py-2 bg-slate-800 border border-slate-600 text-slate-300 rounded-lg hover:bg-slate-700">Cancel</button>
          <button onClick={handleConnect} disabled={loading} className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg disabled:opacity-50">
            {loading ? 'Connecting...' : 'Connect'}
          </button>
        </div>
      </div>
    </div>
  );
}
