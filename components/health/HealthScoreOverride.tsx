'use client';

import { useState } from 'react';
import axios from 'axios';
import { Edit3, Save, X, AlertCircle } from 'lucide-react';

interface HealthScoreOverrideProps {
  partnershipId: number;
  systemScore: number;
  currentOverride?: {
    confirmedScore: number;
    overrideReason: string;
  };
  onOverrideSaved: () => void;
}

export default function HealthScoreOverride({ 
  partnershipId, 
  systemScore, 
  currentOverride,
  onOverrideSaved 
}: HealthScoreOverrideProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [confirmedScore, setConfirmedScore] = useState(currentOverride?.confirmedScore || systemScore);
  const [overrideReason, setOverrideReason] = useState(currentOverride?.overrideReason || '');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!overrideReason.trim()) {
      alert('Please provide a reason for the override');
      return;
    }

    setSaving(true);
    try {
      await axios.post(
        `http://localhost:3000/api/partnerships/${partnershipId}/health/override`,
        {
          systemScore,
          confirmedScore,
          overrideReason,
          overriddenBy: 'Current User' // You can add real user info later
        }
      );
      
      setIsEditing(false);
      onOverrideSaved();
    } catch (error) {
      console.error('Failed to save override:', error);
      alert('Failed to save override');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setConfirmedScore(currentOverride?.confirmedScore || systemScore);
    setOverrideReason(currentOverride?.overrideReason || '');
    setIsEditing(false);
  };

  const scoreDifference = confirmedScore - systemScore;

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2">
          <AlertCircle className="w-5 h-5 text-blue-600" />
          <h4 className="font-semibold text-gray-900">Human Override</h4>
        </div>
        
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-700"
          >
            <Edit3 className="w-4 h-4" />
            <span>Adjust Score</span>
          </button>
        )}
      </div>

      {!isEditing && !currentOverride && (
        <p className="text-sm text-gray-600">
          The system calculated score is {systemScore}. You can override this if you have additional context.
        </p>
      )}

      {!isEditing && currentOverride && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">System Score:</span>
            <span className="font-semibold">{systemScore}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Confirmed Score:</span>
            <span className="font-semibold text-blue-600">{currentOverride.confirmedScore}</span>
          </div>
          <div className="pt-2 border-t border-blue-200">
            <p className="text-xs text-gray-600 mb-1">Reason:</p>
            <p className="text-sm text-gray-900">{currentOverride.overrideReason}</p>
          </div>
        </div>
      )}

      {isEditing && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Adjusted Score (System: {systemScore})
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={confirmedScore}
              onChange={(e) => setConfirmedScore(parseInt(e.target.value))}
              className="w-full"
            />
            <div className="flex items-center justify-between mt-2">
              <span className="text-2xl font-bold text-blue-600">{confirmedScore}</span>
              {scoreDifference !== 0 && (
                <span className={`text-sm font-medium ${scoreDifference > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {scoreDifference > 0 ? '+' : ''}{scoreDifference} from system
                </span>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Reason for Override *
            </label>
            <textarea
              value={overrideReason}
              onChange={(e) => setOverrideReason(e.target.value)}
              placeholder="Explain why you're adjusting the score..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              rows={3}
              required
            />
          </div>

          <div className="flex space-x-2">
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? 'Saving...' : 'Save Override'}</span>
            </button>
            <button
              onClick={handleCancel}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
            >
              <X className="w-4 h-4" />
              <span>Cancel</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
