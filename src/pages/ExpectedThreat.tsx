
import React from 'react';
import ExpectedThreatViz from '@/components/ExpectedThreatViz';
import Navbar from '@/components/Navbar';

const ExpectedThreat = () => {
  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <Navbar />
      <div className="container mx-auto py-8 px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#0A1128] mb-2">Expected Threat (xT) Model</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Visualize the potential threat of each zone on the pitch using advanced Expected Threat (xT) models.
            xT measures the probability of scoring based on the location of possession and player actions.
          </p>
        </div>
        <ExpectedThreatViz />
      </div>
    </div>
  );
};

export default ExpectedThreat;
