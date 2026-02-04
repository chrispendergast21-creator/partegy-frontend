'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { FileText, Upload, Download, Trash2, Edit2, Search, Filter } from 'lucide-react';

interface Document {
  id: number;
  title: string;
  description: string;
  file_name: string;
  file_type: string;
  file_size: number;
  category: string;
  uploaded_by: string;
  uploaded_at: string;
  tags: string[];
}

interface DocumentManagerProps {
  partnershipId: number;
}

export default function DocumentManager({ partnershipId }: DocumentManagerProps) {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    file_name: '',
    file_type: 'pdf',
    file_size: 1024000,
    file_url: '#',
    category: 'contract',
    uploaded_by: 'Current User',
    tags: [] as string[]
  });

  useEffect(() => {
    loadDocuments();
  }, [partnershipId]);

  const loadDocuments = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/partnerships/${partnershipId}/documents`);
      setDocuments(response.data);
    } catch (error) {
      console.error('Failed to load documents:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(
        `http://localhost:3000/api/partnerships/${partnershipId}/documents`,
        formData
      );
      
      setShowUploadForm(false);
      setFormData({
        title: '',
        description: '',
        file_name: '',
        file_type: 'pdf',
        file_size: 1024000,
        file_url: '#',
        category: 'contract',
        uploaded_by: 'Current User',
        tags: []
      });
      loadDocuments();
    } catch (error) {
      console.error('Failed to upload document:', error);
    }
  };

  const handleDelete = async (docId: number) => {
    if (!confirm('Are you sure you want to delete this document?')) return;
    
    try {
      await axios.delete(`http://localhost:3000/api/partnerships/${partnershipId}/documents/${docId}`);
      loadDocuments();
    } catch (error) {
      console.error('Failed to delete document:', error);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'contract': return 'bg-purple-100 text-purple-800';
      case 'presentation': return 'bg-blue-100 text-blue-800';
      case 'report': return 'bg-green-100 text-green-800';
      case 'proposal': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', 'contract', 'presentation', 'report', 'proposal', 'other'];

  if (loading) {
    return <div className="bg-white rounded-lg shadow p-6">Loading documents...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <FileText className="w-6 h-6 text-blue-600" />
            <h3 className="text-xl font-bold text-gray-900">Documents</h3>
          </div>
          <button
            onClick={() => setShowUploadForm(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Upload className="w-4 h-4" />
            <span>Upload</span>
          </button>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search documents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="p-6">
        {showUploadForm && (
          <form onSubmit={handleUpload} className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold mb-4">Upload Document</h4>
            
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">File Name</label>
                  <input
                    type="text"
                    value={formData.file_name}
                    onChange={(e) => setFormData({ ...formData, file_name: e.target.value })}
                    placeholder="document.pdf"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="contract">Contract</option>
                    <option value="presentation">Presentation</option>
                    <option value="report">Report</option>
                    <option value="proposal">Proposal</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Upload
                </button>
                <button
                  type="button"
                  onClick={() => setShowUploadForm(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        )}

        {filteredDocuments.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <FileText className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p>No documents found</p>
            <p className="text-sm">Upload your first document to get started</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredDocuments.map((doc) => (
              <div key={doc.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                <div className="flex items-center space-x-4 flex-1">
                  <div className={`p-2 rounded ${getCategoryColor(doc.category)}`}>
                    <FileText className="w-5 h-5" />
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{doc.title}</h4>
                    <p className="text-sm text-gray-600">{doc.description}</p>
                    <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500">
                      <span>{doc.file_name}</span>
                      <span>{formatFileSize(doc.file_size)}</span>
                      <span>Uploaded {formatDate(doc.uploaded_at)}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button className="p-2 hover:bg-gray-100 rounded">
                    <Download className="w-4 h-4 text-gray-600" />
                  </button>
                  <button
                    onClick={() => handleDelete(doc.id)}
                    className="p-2 hover:bg-gray-100 rounded"
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
