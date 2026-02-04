'use client';

import { Calendar, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';

interface TimelineEvent {
  id: string;
  date: Date;
  title: string;
  description: string;
  type: 'milestone' | 'meeting' | 'deliverable' | 'review';
  status: 'completed' | 'upcoming' | 'overdue';
}

interface PartnershipTimelineProps {
  events: TimelineEvent[];
}

export default function PartnershipTimeline({ events }: PartnershipTimelineProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'upcoming': return <Clock className="w-5 h-5 text-blue-500" />;
      case 'overdue': return <AlertCircle className="w-5 h-5 text-red-500" />;
      default: return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'milestone': return 'bg-purple-100 text-purple-800';
      case 'meeting': return 'bg-blue-100 text-blue-800';
      case 'deliverable': return 'bg-green-100 text-green-800';
      case 'review': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Partnership Timeline</h3>
        <Calendar className="w-5 h-5 text-gray-400" />
      </div>

      <div className="relative">
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
        
        <div className="space-y-6">
          {events.map((event, index) => (
            <div key={event.id} className="relative flex items-start space-x-4">
              <div className="relative z-10 flex-shrink-0">
                {getStatusIcon(event.status)}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <span className={`text-xs font-medium px-2 py-1 rounded ${getTypeColor(event.type)}`}>
                    {event.type}
                  </span>
                  <span className="text-sm text-gray-500">
                    {format(new Date(event.date), 'MMM dd, yyyy')}
                  </span>
                </div>
                
                <h4 className="text-sm font-semibold text-gray-900 mb-1">
                  {event.title}
                </h4>
                
                <p className="text-sm text-gray-600">
                  {event.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
