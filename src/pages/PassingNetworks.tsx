
import React from 'react';
import PassingNetworkViz from '@/components/PassingNetworkViz';
import Navbar from '@/components/Navbar';
import { TrendingUp } from 'lucide-react';

const PassingNetworks = () => {
  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <Navbar />
      <div className="container mx-auto py-8 px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#0A1128] mb-2">Interactive Passing Networks</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore the connections between players on the pitch through detailed passing network visualizations.
            Understand team structures, key passing channels, and player importance in build-up play.
          </p>
        </div>
        
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp size={20} className="text-[#0A1128]" />
          <h2 className="text-xl font-semibold">Network Analysis</h2>
        </div>
        
        <PassingNetworkViz />
      </div>
    </div>
  );
};

export default PassingNetworks;
