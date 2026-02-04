'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Plug, Check, X, Settings, RefreshCw, Calendar } from 'lucide-react';
import RoleGate from '@/components/auth/RoleGate';

interface Integration {
  id: string;
  type: string;
  name: string;
  description: string;
  enabled: boolean;
  sync_frequency: string;
  last_sync: string | null;
}

function IntegrationsContent() {
  const [integrations, setIntegrations] = useState<Integration[]>([]);
  const [loading, setLoading] = useState(true);
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [selectedType, setSelectedType] = useState<string>('');

  useEffect(() => {
    loadIntegrations();
  }, []);

  const loadIntegrations = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/integrations');
      setIntegrations(response.data);
    } catch (error) {
      console.error('Failed to load integrations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleConnect = async (type: string) => {
    setSelectedType(type);
    setShowConnectModal(true);
  };

  const handleToggle = async (id: string, currentState: boolean) => {
    try {
      await axios.patch(`http://localhost:3000/api/integrations/${id}`, {
        enabled: !currentState
      });
      loadIntegrations();
    } catch (error) {
      console.error('Failed to toggle integration:', error);
    }
  };

  const handleSync = async (id: string) => {
    try {
      await axios.post(`http://localhost:3000/api/integrations/${id}/sync`);
      alert('Sync started successfully');
      loadIntegrations();
    } catch (error) {
      console.error('Failed to sync:', error);
    }
  };

  const availableIntegrations = [
    {
      type: 'SALESFORCE',
      name: 'Salesforce',
      description: 'Sync partnerships from Salesforce Accounts and Opportunities',
      logo: '☁️',
      category: 'CRM'
    },
    {
      type: 'IMPARTNER',
      name: 'Impartner PRM',
      description: 'Pull partner data, deal registration, and training completion',
      logo: '🤝',
      category: 'PRM'
    },
    {
      type: 'NETSUITE',
      name: 'NetSuite',
      description: 'Sync customer and transaction data from NetSuite ERP',
      logo: '💼',
      category: 'ERP'
    },
    {
      type: 'HUBSPOT',
      name: 'HubSpot',
      description: 'Import companies, deals, and engagement data',
      logo: '🔶',
      category: 'CRM'
    },
    {
      type: 'SLACK',
      name: 'Slack',
      description: 'Track partnership engagement through Slack channels',
      logo: '💬',
      category: 'Communication'
    },
    {
      type: 'MICROSOFT_TEAMS',
      name: 'Microsoft Teams',
      description: 'Monitor partnership meetings and collaboration',
      logo: '👥',
      category: 'Communication'
    }
  ];

  const getIntegrationStatus = (type: string) => {
    return integrations.find(i => i.type === type);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center space-x-3">
            <Plug className="w-8 h-8 text-blue-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Integrations</h1>
              <p className="text-gray-600 mt-1">Connect Partegy to your existing systems</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {availableIntegrations.map((integration) => {
            const status = getIntegrationStatus(integration.type);
            const isConnected = status?.enabled;

            return (
              <div key={integration.type} className="bg-white rounded-lg shadow border border-gray-200">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="text-4xl">{integration.logo}</div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{integration.name}</h3>
                        <span className="text-xs text-gray-500">{integration.category}</span>
                      </div>
                    </div>
                    {isConnected && (
                      <span className="flex items-center space-x-1 px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded">
                        <Check className="w-3 h-3" />
                        <span>Connected</span>
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-gray-600 mb-4">{integration.description}</p>

                  {status && isConnected ? (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Sync Frequency</span>
                        <span className="font-medium text-gray-900">{status.sync_frequency}</span>
                      </div>
                      
                      {status.last_sync && (
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Last Synced</span>
                          <span className="font-medium text-gray-900">
                            {new Date(status.last_sync).toLocaleDateString()}
                          </span>
                        </div>
                      )}

                      <div className="flex space-x-2 pt-2">
                        <button
                          onClick={() => handleSync(status.id)}
                          className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700"
                        >
                          <RefreshCw className="w-4 h-4" />
                          <span>Sync Now</span>
                        </button>
                        <button
                          onClick={() => handleToggle(status.id, isConnected)}
                          className="px-4 py-2 bg-gray-100 text-gray-700 text-sm rounded-lg hover:bg-gray-200"
                        >
                          <Settings className="w-4 h-4" />
                        </button>
                      </div>

                      <button
                        onClick={() => handleToggle(status.id, isConnected)}
                        className="w-full text-sm text-red-600 hover:text-red-700"
                      >
                        Disconnect
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleConnect(integration.type)}
                      className="w-full px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700"
                    >
                      Connect {integration.name}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {showConnectModal && (
          <ConnectModal
            type={selectedType}
            onClose={() => setShowConnectModal(false)}
            onSuccess={() => {
              setShowConnectModal(false);
              loadIntegrations();
            }}
          />
        )}
      </main>
    </div>
  );
}

function ConnectModal({ type, onClose, onSuccess }: any) {
  const [credentials, setCredentials] = useState({
    client_id: '',
    client_secret: '',
    instance_url: '',
    api_key: ''
  });
  const [loading, setLoading] = useState(false);

  const handleConnect = async () => {
    setLoading(true);
    try {
      await axios.post('http://localhost:3000/api/integrations', {
        type,
        credentials
      });
      onSuccess();
    } catch (error) {
      console.error('Failed to connect:', error);
      alert('Failed to connect integration');
    } finally {
      setLoading(false);
    }
  };

  const getFields = () => {
    switch (type) {
      case 'SALESFORCE':
        return ['client_id', 'client_secret', 'instance_url'];
      case 'IMPARTNER':
        return ['api_key', 'instance_url'];
      case 'NETSUITE':
        return ['client_id', 'client_secret', 'account_id'];
      default:
        return ['api_key'];
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900">Connect {type}</h3>
        </div>
        
        <div className="p-6 space-y-4">
          {getFields().map(field => (
            <div key={field}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {field.replace('_', ' ').toUpperCase()}
              </label>
              <input
                type={field.includes('secret') ? 'password' : 'text'}
                value={credentials[field as keyof typeof credentials]}
                onChange={(e) => setCredentials({ ...credentials, [field]: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder={`Enter ${field.replace('_', ' ')}`}
              />
            </div>
          ))}

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              💡 <strong>OAuth Integration:</strong> In production, this would redirect to the provider's OAuth flow. 
              For demo purposes, you can enter credentials directly.
            </p>
          </div>
        </div>

        <div className="p-6 border-t border-gray-200 flex space-x-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            onClick={handleConnect}
            disabled={loading}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Connecting...' : 'Connect'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function IntegrationsPage() {
  return (
    <RoleGate requiredPermission="manage_integrations">
      <IntegrationsContent />
    </RoleGate>
  );
}
