
import React from 'react';
import TrackingDataViz from '@/components/TrackingDataViz';
import Navbar from '@/components/Navbar';
import { Activity } from 'lucide-react';

const TrackingData = () => {
  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <Navbar />
      <div className="container mx-auto py-8 px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#0A1128] mb-2">Server-Side Rendered Tracking Data</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Analyze player movements and team formations using high-performance server-side rendered tracking data.
            Visualize positional play, defensive structures, and attacking patterns in real-time.
          </p>
        </div>
        
        <div className="flex items-center gap-2 mb-6">
          <Activity size={20} className="text-[#0A1128]" />
          <h2 className="text-xl font-semibold">Movement Analysis</h2>
        </div>
        
        <TrackingDataViz />
      </div>
    </div>
  );
};

export default TrackingData;
