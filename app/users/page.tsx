'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '@/lib/api';
import { PageNavigation } from '@/components/PageNavigation';
import { Users, Search, UserPlus, Crown, Eye, Edit, Trash2 } from 'lucide-react';

interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  role: 'admin' | 'member' | 'viewer';
  status: 'active' | 'pending' | 'suspended';
  last_login: string | null;
  created_at: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showInviteModal, setShowInviteModal] = useState(false);

  useEffect(() => { loadUsers(); }, []);

  const loadUsers = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/users`);
      setUsers(response.data);
    } catch {
      setUsers([
        { id: 1, email: 'john@company.com', first_name: 'John', last_name: 'Smith', role: 'admin', status: 'active', last_login: '2026-03-22T10:30:00Z', created_at: '2026-01-15T09:00:00Z' },
        { id: 2, email: 'sarah@company.com', first_name: 'Sarah', last_name: 'Johnson', role: 'member', status: 'active', last_login: '2026-03-21T14:20:00Z', created_at: '2026-02-01T11:15:00Z' },
        { id: 3, email: 'mike@company.com', first_name: 'Mike', last_name: 'Chen', role: 'viewer', status: 'pending', last_login: null, created_at: '2026-03-20T16:45:00Z' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter(u =>
    u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    `${u.first_name} ${u.last_name}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const roleColors: Record<string, string> = {
    admin: 'bg-purple-500/20 text-purple-300',
    member: 'bg-blue-500/20 text-blue-300',
    viewer: 'bg-slate-600 text-slate-300',
  };

  const statusColors: Record<string, string> = {
    active: 'bg-emerald-500/20 text-emerald-300',
    pending: 'bg-amber-500/20 text-amber-300',
    suspended: 'bg-red-500/20 text-red-300',
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <PageNavigation />
      <main className="max-w-7xl mx-auto px-8 py-8 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Team Management</h1>
            <p className="text-slate-400 mt-1">Manage users and permissions</p>
          </div>
          <button
            onClick={() => setShowInviteModal(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            <UserPlus className="w-4 h-4" />
            <span>Invite User</span>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">
            <div className="text-2xl font-bold text-white">{users.length}</div>
            <div className="text-slate-400 text-sm mt-1">Total Users</div>
          </div>
          <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">
            <div className="text-2xl font-bold text-white">{users.filter(u => u.status === 'active').length}</div>
            <div className="text-slate-400 text-sm mt-1">Active</div>
          </div>
          <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">
            <div className="text-2xl font-bold text-white">{users.filter(u => u.status === 'pending').length}</div>
            <div className="text-slate-400 text-sm mt-1">Pending Invites</div>
          </div>
        </div>

        {/* Search + Table */}
        <div className="bg-slate-900 border border-slate-700 rounded-xl overflow-hidden">
          <div className="p-6 border-b border-slate-700">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search users by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full bg-slate-800 border border-slate-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-slate-400 text-sm"
              />
            </div>
          </div>
          <table className="min-w-full">
            <thead className="bg-slate-800">
              <tr>
                {['User', 'Role', 'Status', 'Last Login', 'Actions'].map((h) => (
                  <th key={h} className={`px-6 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider ${h === 'Actions' ? 'text-right' : 'text-left'}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {loading ? (
                <tr><td colSpan={5} className="px-6 py-12 text-center text-slate-400">Loading users...</td></tr>
              ) : filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-slate-800 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">{user.first_name[0]}{user.last_name[0]}</span>
                      </div>
                      <div className="ml-4">
                        <div className="text-white font-medium">{user.first_name} {user.last_name}</div>
                        <div className="text-slate-400 text-sm">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${roleColors[user.role]}`}>{user.role}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${statusColors[user.status]}`}>{user.status}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-slate-400 text-sm">
                    {user.last_login ? new Date(user.last_login).toLocaleDateString() : 'Never'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <button className="text-slate-400 hover:text-blue-400 mr-4 transition-colors"><Edit className="w-4 h-4" /></button>
                    <button className="text-slate-400 hover:text-red-400 transition-colors"><Trash2 className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {showInviteModal && (
        <InviteModal onClose={() => setShowInviteModal(false)} onSuccess={() => { setShowInviteModal(false); loadUsers(); }} />
      )}
    </div>
  );
}

function InviteModal({ onClose, onSuccess }: any) {
  const [formData, setFormData] = useState({ email: '', role: 'member', message: '' });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await axios.post(`${API_URL}/api/users/invite`, formData);
      alert('Invitation sent!');
      onSuccess();
    } catch {
      alert('Failed to send invitation');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-slate-900 border border-slate-700 rounded-xl max-w-md w-full mx-4">
        <div className="p-6 border-b border-slate-700">
          <h2 className="text-xl font-bold text-white">Invite New User</h2>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Email Address *</label>
            <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2 bg-slate-800 border border-slate-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="user@company.com" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Role</label>
            <select value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="w-full px-4 py-2 bg-slate-800 border border-slate-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="viewer">Viewer - Can view partnerships</option>
              <option value="member">Member - Can edit partnerships</option>
              <option value="admin">Admin - Full access</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Message (optional)</label>
            <textarea value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} rows={3}
              className="w-full px-4 py-2 bg-slate-800 border border-slate-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Welcome to our partnership team!" />
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 border border-slate-600 text-slate-300 rounded-lg hover:bg-slate-800">Cancel</button>
            <button type="submit" disabled={submitting} className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg disabled:opacity-50">
              {submitting ? 'Sending...' : 'Send Invitation'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
