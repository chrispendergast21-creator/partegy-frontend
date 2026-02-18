'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useOrganization } from '@/lib/useOrganization';
import { API_URL } from '@/lib/api';
import {
  Search,
  Filter,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  Building2,
  DollarSign,
  Calendar,
  Users as UsersIcon,
  Download,
  Plus,
  CheckCircle,
  Clock,
  Target,
  Eye,
  Edit,
  MoreVertical
} from 'lucide-react';

export default function PartnershipsPage() {
  const router = useRouter();
  const { currentOrg } = useOrganization();
  const [partnerships, setPartnerships] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterHealth, setFilterHealth] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState<'name' | 'health' | 'revenue'>('health');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  useEffect(() => {
    if (currentOrg) {
      loadPartnerships();
    }
  }, [currentOrg]);

  const loadPartnerships = async () => {
    if (!currentOrg) return;
    
    try {
      const response = await axios.get(`${API_URL}/api/partnerships?org_id=${currentOrg.id}`);
      setPartnerships(response.data);
    } catch (error) {
      console.error('Failed to load partnerships:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredAndSorted = partnerships
    .filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           p.strategic_objective?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesHealth = filterHealth === 'all' || p.health === filterHealth;
      const matchesType = filterType === 'all' || p.partnership_type === filterType;
      return matchesSearch && matchesHealth && matchesType;
    })
    .sort((a, b) => {
      let comparison = 0;
      if (sortBy === 'name') {
        comparison = a.name.localeCompare(b.name);
      } else if (sortBy === 'health') {
        comparison = (a.health_score || 0) - (b.health_score || 0);
      } else if (sortBy === 'revenue') {
        comparison = (a.revenue || 0) - (b.revenue || 0);
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

  const stats = {
    total: partnerships.length,
    healthy: partnerships.filter(p => p.health === 'healthy').length,
    atRisk: partnerships.filter(p => p.health === 'at-risk').length,
    critical: partnerships.filter(p => p.health === 'critical').length,
    totalRevenue: partnerships.reduce((sum, p) => sum + (p.revenue || 0), 0),
    totalPipeline: partnerships.reduce((sum, p) => sum + (p.pipeline || 0), 0)
  };

  const getHealthColor = (health: string) => {
    switch (health) {
      case 'healthy': return 'from-emerald-400 to-emerald-600';
      case 'at-risk': return 'from-amber-400 to-amber-600';
      case 'critical': return 'from-red-400 to-red-600';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  const getHealthBadge = (health: string) => {
    const colors = {
      healthy: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      'at-risk': 'bg-amber-100 text-amber-800 border-amber-200',
      critical: 'bg-red-100 text-red-800 border-red-200'
    };
    return colors[health as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getTypeColor = (type: string) => {
    const colors = {
      'STRATEGIC_ALLIANCE': 'from-[#60a5fa] to-[#3b82f6]',
      'CO_SELL': 'from-[#60e1fa] to-[#06b6d4]',
      'REFERRAL': 'from-[#34d399] to-[#10b981]',
      'DELIVERY': 'from-[#a855f7] to-[#8b5cf6]'
    };
    return colors[type as keyof typeof colors] || 'from-gray-400 to-gray-600';
  };

  if (!currentOrg) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Building2 className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No Organization Selected</h2>
          <p className="text-gray-600">Please select an organization from the dashboard.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#1e293b] via-[#334155] to-[#475569] border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-[#60a5fa] to-[#60e1fa] bg-clip-text text-transparent">
                Partnership Portfolio
              </h1>
              <p className="text-gray-300 mt-1">{currentOrg.name} • {filteredAndSorted.length} of {partnerships.length} partnerships</p>
            </div>
            <button
              onClick={() => router.push('/partnerships/new')}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-[#60a5fa] to-[#60e1fa] text-white rounded-xl hover:shadow-lg transition-all"
            >
              <Plus className="w-5 h-5" />
              <span>Add Partnership</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={Building2}
            label="Total Partnerships"
            value={stats.total}
            color="from-[#60a5fa] to-[#60e1fa]"
            onClick={() => setFilterHealth('all')}
          />
          <StatCard
            icon={CheckCircle}
            label="Healthy"
            value={stats.healthy}
            sublabel={`${Math.round((stats.healthy / stats.total) * 100)}%`}
            color="from-emerald-500 to-emerald-600"
            onClick={() => setFilterHealth('healthy')}
          />
          <StatCard
            icon={DollarSign}
            label="Total Revenue"
            value={`$${(stats.totalRevenue / 1000000).toFixed(1)}M`}
            color="from-[#a855f7] to-[#8b5cf6]"
            onClick={() => setSortBy('revenue')}
          />
          <StatCard
            icon={Target}
            label="Pipeline"
            value={`$${(stats.totalPipeline / 1000000).toFixed(1)}M`}
            color="from-[#f59e0b] to-[#d97706]"
          />
        </div>

        {/* Filters */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search partnerships..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-3 w-full border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#60a5fa] focus:border-transparent bg-white/50"
              />
            </div>

            <select
              value={filterHealth}
              onChange={(e) => setFilterHealth(e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#60a5fa] focus:border-transparent bg-white/50"
            >
              <option value="all">All Health States</option>
              <option value="healthy">Healthy</option>
              <option value="at-risk">At Risk</option>
              <option value="critical">Critical</option>
            </select>

            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#60a5fa] focus:border-transparent bg-white/50"
            >
              <option value="all">All Types</option>
              <option value="STRATEGIC_ALLIANCE">Strategic Alliance</option>
              <option value="CO_SELL">Co-Sell</option>
              <option value="REFERRAL">Referral</option>
              <option value="DELIVERY">Delivery</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#60a5fa] focus:border-transparent bg-white/50"
            >
              <option value="health">Sort by Health</option>
              <option value="name">Sort by Name</option>
              <option value="revenue">Sort by Revenue</option>
            </select>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-3 rounded-xl transition-all ${viewMode === 'grid' ? 'bg-gradient-to-r from-[#60a5fa] to-[#60e1fa] text-white' : 'bg-white/50 text-gray-600 hover:bg-white'}`}
              >
                <Building2 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`p-3 rounded-xl transition-all ${viewMode === 'table' ? 'bg-gradient-to-r from-[#60a5fa] to-[#60e1fa] text-white' : 'bg-white/50 text-gray-600 hover:bg-white'}`}
              >
                <UsersIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Partnerships Display */}
        {loading ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-[#60a5fa] to-[#60e1fa] flex items-center justify-center">
              <Clock className="w-8 h-8 text-white animate-spin" />
            </div>
            <p className="text-gray-600">Loading partnerships...</p>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSorted.map((partnership) => (
              <PartnershipCard key={partnership.id} partnership={partnership} />
            ))}
          </div>
        ) : (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Partnership
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Type / Tier
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Health
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Revenue
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Next Milestone
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredAndSorted.map((partnership) => (
                    <tr
                      key={partnership.id}
                      onClick={() => router.push(`/partnership/${partnership.id}`)}
                      className="hover:bg-gradient-to-r hover:from-[#60a5fa]/5 hover:to-[#60e1fa]/5 cursor-pointer transition-all"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-4">
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getHealthColor(partnership.health)} flex items-center justify-center`}>
                            <span className="text-white font-bold text-sm">
                              {partnership.name.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-gray-900">{partnership.name}</div>
                            <div className="text-xs text-gray-500 max-w-xs truncate">
                              {partnership.strategic_objective}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium text-white bg-gradient-to-r ${getTypeColor(partnership.partnership_type)}`}>
                          {partnership.partnership_type?.replace('_', ' ')}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">{partnership.tier}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-3">
                          <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border ${getHealthBadge(partnership.health)}`}>
                            {partnership.health}
                          </span>
                          <span className="text-sm font-bold text-gray-900">{partnership.health_score}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-semibold text-gray-900">
                          ${((partnership.revenue || 0) / 1000000).toFixed(2)}M
                        </div>
                        <div className="text-xs text-gray-500">
                          Pipeline: ${((partnership.pipeline || 0) / 1000000).toFixed(2)}M
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{partnership.next_milestone}</div>
                        <div className="text-xs text-gray-500 flex items-center space-x-1">
                          <Calendar className="w-3 h-3" />
                          <span>{partnership.days_to_milestone} days</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="flex items-center space-x-2 justify-end">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              router.push(`/partnership/${partnership.id}`);
                            }}
                            className="p-2 text-gray-400 hover:text-[#60a5fa] rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={(e) => e.stopPropagation()}
                            className="p-2 text-gray-400 hover:text-[#60a5fa] rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Results Summary */}
        {!loading && (
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Showing {filteredAndSorted.length} of {partnerships.length} partnerships
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, sublabel, color, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 hover:shadow-2xl transition-all duration-300 group text-left"
    >
      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
        <Icon className="w-7 h-7 text-white" />
      </div>
      <div className="text-3xl font-bold text-gray-900 mb-1">{value}</div>
      <div className="text-sm font-medium text-gray-600 mb-2">{label}</div>
      {sublabel && (
        <div className="text-xs text-gray-500">{sublabel}</div>
      )}
    </button>
  );
}

function PartnershipCard({ partnership }: any) {
  const router = useRouter();
  
  const getHealthColor = (health: string) => {
    switch (health) {
      case 'healthy': return 'from-emerald-400 to-emerald-600';
      case 'at-risk': return 'from-amber-400 to-amber-600';
      case 'critical': return 'from-red-400 to-red-600';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  const getTypeColor = (type: string) => {
    const colors = {
      'STRATEGIC_ALLIANCE': 'from-[#60a5fa] to-[#3b82f6]',
      'CO_SELL': 'from-[#60e1fa] to-[#06b6d4]',
      'REFERRAL': 'from-[#34d399] to-[#10b981]',
      'DELIVERY': 'from-[#a855f7] to-[#8b5cf6]'
    };
    return colors[type as keyof typeof colors] || 'from-gray-400 to-gray-600';
  };

  return (
    <div 
      onClick={() => router.push(`/partnership/${partnership.id}`)}
      className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer group"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${getHealthColor(partnership.health)} flex items-center justify-center group-hover:scale-110 transition-transform`}>
          <span className="text-white font-bold text-lg">
            {partnership.name.charAt(0)}
          </span>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-gray-900">{partnership.health_score}</div>
          <div className="text-xs text-gray-500">Health Score</div>
        </div>
      </div>

      {/* Partnership Info */}
      <div className="mb-4">
        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[#60a5fa] transition-colors">
          {partnership.name}
        </h3>
        <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium text-white bg-gradient-to-r ${getTypeColor(partnership.partnership_type)} mb-2`}>
          {partnership.partnership_type?.replace('_', ' ')}
        </div>
        <p className="text-sm text-gray-600 line-clamp-2">
          {partnership.strategic_objective}
        </p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <div className="text-lg font-bold text-gray-900">
            ${((partnership.revenue || 0) / 1000000).toFixed(1)}M
          </div>
          <div className="text-xs text-gray-500">Revenue</div>
        </div>
        <div>
          <div className="text-lg font-bold text-gray-900">
            ${((partnership.pipeline || 0) / 1000000).toFixed(1)}M
          </div>
          <div className="text-xs text-gray-500">Pipeline</div>
        </div>
      </div>

      {/* Next Milestone */}
      <div className="border-t border-gray-200 pt-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-medium text-gray-900">{partnership.next_milestone}</div>
            <div className="text-xs text-gray-500">Next milestone</div>
          </div>
          <div className="flex items-center space-x-1 text-xs text-gray-500">
            <Calendar className="w-3 h-3" />
            <span>{partnership.days_to_milestone}d</span>
          </div>
        </div>
      </div>
    </div>
  );
}
