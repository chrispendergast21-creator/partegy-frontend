'use client';

import { useState } from 'react';
import { Upload, Download, FileSpreadsheet, Users, CheckCircle, AlertCircle } from 'lucide-react';
import axios from 'axios';

export default function OnboardingPage() {
  const [step, setStep] = useState<'upload' | 'mapping' | 'review' | 'complete'>('upload');
  const [file, setFile] = useState<File | null>(null);
  const [importData, setImportData] = useState<any[]>([]);
  const [importSummary, setImportSummary] = useState<any>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:3000/api/partnerships/import/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      setImportData(response.data.partnerships);
      setStep('mapping');
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Upload failed. Please check your file format.');
    } finally {
      setUploading(false);
    }
  };

  const handleImport = async () => {
    setUploading(true);
    try {
      const response = await axios.post('http://localhost:3000/api/partnerships/import/execute', {
        partnerships: importData
      });
      
      setImportSummary(response.data);
      setStep('complete');
    } catch (error) {
      console.error('Import failed:', error);
      alert('Import failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const downloadTemplate = () => {
    const csvContent = `Partnership Name,Tier,Partnership Type,Strategic Objective,Primary Contact Name,Primary Contact Email,Primary Contact Role,Revenue,Pipeline,Next Milestone,Days to Milestone
TechCorp Solutions,Strategic,STRATEGIC_ALLIANCE,Expand into enterprise market,John Smith,john@techcorp.com,Alliance Director,2500000,5000000,Q1 Business Review,45
DataFlow Partners,Growth,CO_SELL,Joint go-to-market in healthcare,Sarah Johnson,sarah@dataflow.com,Partner Manager,1800000,3500000,Product Launch,30`;

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'partnership_import_template.csv';
    a.click();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-[#1e293b] border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1">
              <div className="w-8 h-8 bg-[#60a5fa] rounded"></div>
              <div className="w-8 h-8 bg-[#60e1fa] rounded"></div>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Partnership Onboarding</h1>
              <p className="text-gray-400 mt-1">Import your existing partnerships and team</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <Step number={1} label="Upload Data" active={step === 'upload'} completed={['mapping', 'review', 'complete'].includes(step)} />
            <div className="flex-1 h-1 bg-gray-200 mx-4"></div>
            <Step number={2} label="Review & Map" active={step === 'mapping'} completed={['review', 'complete'].includes(step)} />
            <div className="flex-1 h-1 bg-gray-200 mx-4"></div>
            <Step number={3} label="Import" active={step === 'review'} completed={step === 'complete'} />
            <div className="flex-1 h-1 bg-gray-200 mx-4"></div>
            <Step number={4} label="Complete" active={step === 'complete'} completed={false} />
          </div>
        </div>

        {step === 'upload' && (
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Upload Partnership Data</h2>
              <p className="text-sm text-gray-600 mt-1">Import partnerships via CSV or Excel file</p>
            </div>

            <div className="p-6">
              <div className="bg-gradient-to-br from-[#60a5fa] to-[#60e1fa] bg-opacity-10 border border-blue-200 rounded-lg p-4 mb-6">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 text-[#60a5fa] flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-gray-900">First time importing?</h4>
                    <p className="text-sm text-gray-700 mt-1">Download our template CSV to see the required format and fields.</p>
                    <button
                      onClick={downloadTemplate}
                      className="mt-3 flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-[#60a5fa] to-[#60e1fa] text-white text-sm rounded-lg hover:opacity-90"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download Template CSV</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
                {file ? (
                  <div className="space-y-4">
                    <FileSpreadsheet className="w-16 h-16 mx-auto text-[#60a5fa]" />
                    <div>
                      <p className="font-medium text-gray-900">{file.name}</p>
                      <p className="text-sm text-gray-500">{(file.size / 1024).toFixed(1)} KB</p>
                    </div>
                    <div className="flex justify-center space-x-3">
                      <button
                        onClick={handleUpload}
                        disabled={uploading}
                        className="px-6 py-2 bg-gradient-to-r from-[#60a5fa] to-[#60e1fa] text-white rounded-lg hover:opacity-90 disabled:opacity-50"
                      >
                        {uploading ? 'Processing...' : 'Process File'}
                      </button>
                      <button
                        onClick={() => setFile(null)}
                        className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Upload className="w-16 h-16 mx-auto text-gray-400" />
                    <div>
                      <label htmlFor="file-upload" className="cursor-pointer">
                        <span className="bg-gradient-to-r from-[#60a5fa] to-[#60e1fa] bg-clip-text text-transparent font-medium">Choose a file</span>
                        <span className="text-gray-600"> or drag and drop</span>
                      </label>
                      <input
                        id="file-upload"
                        type="file"
                        accept=".csv,.xlsx,.xls"
                        onChange={handleFileSelect}
                        className="hidden"
                      />
                      <p className="text-sm text-gray-500 mt-2">CSV or Excel up to 10MB</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Partnerships</h4>
                  <p className="text-sm text-gray-600">Import up to 1,000 partnerships at once</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Team Members</h4>
                  <p className="text-sm text-gray-600">Automatically assign partner managers</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Health Scores</h4>
                  <p className="text-sm text-gray-600">Calculated automatically after import</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 'mapping' && (
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Review & Map Fields</h2>
              <p className="text-sm text-gray-600 mt-1">Found {importData.length} partnerships</p>
            </div>

            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tier</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Revenue</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {importData.slice(0, 5).map((partnership, idx) => (
                      <tr key={idx}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {partnership.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {partnership.tier}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {partnership.partnership_type}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {partnership.contact_name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          ${partnership.revenue?.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {importData.length > 5 && (
                <p className="text-sm text-gray-500 mt-4 text-center">
                  Showing 5 of {importData.length} partnerships
                </p>
              )}

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setStep('upload')}
                  className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                >
                  Back
                </button>
                <button
                  onClick={handleImport}
                  disabled={uploading}
                  className="px-6 py-2 bg-gradient-to-r from-[#60a5fa] to-[#60e1fa] text-white rounded-lg hover:opacity-90 disabled:opacity-50"
                >
                  {uploading ? 'Importing...' : `Import ${importData.length} Partnerships`}
                </button>
              </div>
            </div>
          </div>
        )}

        {step === 'complete' && importSummary && (
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-8 h-8 text-[#60a5fa]" />
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Import Complete!</h2>
                  <p className="text-sm text-gray-600 mt-1">Your partnerships have been imported successfully</p>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-lg p-4">
                  <div className="text-3xl font-bold text-green-900">{importSummary.imported}</div>
                  <div className="text-sm text-green-700 mt-1">Partnerships Imported</div>
                </div>
                <div className="bg-gradient-to-br from-[#60a5fa]/10 to-[#60e1fa]/10 border border-blue-200 rounded-lg p-4">
                  <div className="text-3xl font-bold bg-gradient-to-r from-[#60a5fa] to-[#60e1fa] bg-clip-text text-transparent">{importSummary.team_members}</div>
                  <div className="text-sm text-gray-700 mt-1">Team Members Created</div>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-lg p-4">
                  <div className="text-3xl font-bold text-purple-900">{importSummary.health_calculated}</div>
                  <div className="text-sm text-purple-700 mt-1">Health Scores Calculated</div>
                </div>
              </div>

              <div className="flex justify-center space-x-3">
                <button
                  onClick={() => window.location.href = '/dashboard'}
                  className="px-6 py-3 bg-gradient-to-r from-[#60a5fa] to-[#60e1fa] text-white rounded-lg hover:opacity-90"
                >
                  Go to Dashboard
                </button>
                <button
                  onClick={() => window.location.href = '/'}
                  className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                >
                  View Partnerships
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

function Step({ number, label, active, completed }: any) {
  return (
    <div className="flex flex-col items-center">
      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
        completed ? 'bg-gradient-to-r from-[#60a5fa] to-[#60e1fa] text-white' :
        active ? 'bg-gradient-to-r from-[#60a5fa] to-[#60e1fa] text-white' :
        'bg-gray-200 text-gray-600'
      }`}>
        {completed ? <CheckCircle className="w-6 h-6" /> : number}
      </div>
      <span className={`text-sm mt-2 ${active ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
        {label}
      </span>
    </div>
  );
}
