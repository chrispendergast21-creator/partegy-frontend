'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Target, Plus, Edit2, Trash2, CheckCircle, Clock, XCircle } from 'lucide-react';

interface OKR {
  id: number;
  title: string;
  description: string;
  target_value: number;
  current_value: number;
  status: string;
  last_review_date: string;
}

interface OKRManagerProps {
  partnershipId: number;
}

export default function OKRManager({ partnershipId }: OKRManagerProps) {
  const [okrs, setOkrs] = useState<OKR[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingOkr, setEditingOkr] = useState<OKR | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    target_value: 0,
    current_value: 0,
    status: 'not_started'
  });

  useEffect(() => {
    loadOKRs();
  }, [partnershipId]);

  const loadOKRs = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/partnerships/${partnershipId}/okrs`);
      setOkrs(response.data);
    } catch (error) {
      console.error('Failed to load OKRs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingOkr) {
        await axios.put(
          `http://localhost:3000/api/partnerships/${partnershipId}/okrs/${editingOkr.id}`,
          formData
        );
      } else {
        await axios.post(
          `http://localhost:3000/api/partnerships/${partnershipId}/okrs`,
          formData
        );
      }
      
      setShowAddForm(false);
      setEditingOkr(null);
      setFormData({ title: '', description: '', target_value: 0, current_value: 0, status: 'not_started' });
      loadOKRs();
    } catch (error) {
      console.error('Failed to save OKR:', error);
    }
  };

  const handleEdit = (okr: OKR) => {
    setEditingOkr(okr);
    setFormData({
      title: okr.title,
      description: okr.description,
      target_value: okr.target_value,
      current_value: okr.current_value,
      status: okr.status
    });
    setShowAddForm(true);
  };

  const handleDelete = async (okrId: number) => {
    if (!confirm('Are you sure you want to delete this OKR?')) return;
    
    try {
      await axios.delete(`http://localhost:3000/api/partnerships/${partnershipId}/okrs/${okrId}`);
      loadOKRs();
    } catch (error) {
      console.error('Failed to delete OKR:', error);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'on_track': return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'at_risk': return <Clock className="w-5 h-5 text-yellow-600" />;
      case 'off_track': return <XCircle className="w-5 h-5 text-red-600" />;
      default: return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on_track': return 'bg-green-50 border-green-200';
      case 'at_risk': return 'bg-yellow-50 border-yellow-200';
      case 'off_track': return 'bg-red-50 border-red-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  const getProgress = (current: number, target: number) => {
    if (target === 0) return 0;
    return Math.min(100, Math.round((current / target) * 100));
  };

  if (loading) {
    return <div className="bg-white rounded-lg shadow p-6">Loading OKRs...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Target className="w-6 h-6 text-blue-600" />
            <h3 className="text-xl font-bold text-gray-900">OKRs & Goals</h3>
          </div>
          <button
            onClick={() => {
              setShowAddForm(true);
              setEditingOkr(null);
              setFormData({ title: '', description: '', target_value: 0, current_value: 0, status: 'not_started' });
            }}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-4 h-4" />
            <span>Add OKR</span>
          </button>
        </div>
      </div>

      <div className="p-6">
        {showAddForm && (
          <form onSubmit={handleSubmit} className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold mb-4">{editingOkr ? 'Edit OKR' : 'New OKR'}</h4>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  rows={2}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Target Value</label>
                  <input
                    type="number"
                    value={formData.target_value}
                    onChange={(e) => setFormData({ ...formData, target_value: parseFloat(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Current Value</label>
                  <input
                    type="number"
                    value={formData.current_value}
                    onChange={(e) => setFormData({ ...formData, current_value: parseFloat(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="not_started">Not Started</option>
                  <option value="on_track">On Track</option>
                  <option value="at_risk">At Risk</option>
                  <option value="off_track">Off Track</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              <div className="flex space-x-3">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  {editingOkr ? 'Update' : 'Create'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddForm(false);
                    setEditingOkr(null);
                  }}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        )}

        {okrs.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Target className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p>No OKRs defined yet</p>
            <p className="text-sm">Add your first OKR to track partnership goals</p>
          </div>
        ) : (
          <div className="space-y-4">
            {okrs.map((okr) => (
              <div key={okr.id} className={`border rounded-lg p-4 ${getStatusColor(okr.status)}`}>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start space-x-3 flex-1">
                    {getStatusIcon(okr.status)}
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{okr.title}</h4>
                      {okr.description && (
                        <p className="text-sm text-gray-600 mt-1">{okr.description}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleEdit(okr)}
                      className="p-2 hover:bg-white rounded"
                    >
                      <Edit2 className="w-4 h-4 text-gray-600" />
                    </button>
                    <button
                      onClick={() => handleDelete(okr.id)}
                      className="p-2 hover:bg-white rounded"
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-semibold">
                      {okr.current_value} / {okr.target_value} ({getProgress(okr.current_value, okr.target_value)}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${getProgress(okr.current_value, okr.target_value)}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
