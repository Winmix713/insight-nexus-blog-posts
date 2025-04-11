
import React, { useState } from 'react';
import FootballPitch from './FootballPitch';
import HeatMap from './HeatMap';
import { TeamSelector } from './TeamSelector';
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { BarChart2, Info, ArrowRightLeft } from 'lucide-react';

// Mock Expected Threat (xT) data
const mockXtData = {
  'Build-up': [
    [0.01, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01],
    [0.01, 0.01, 0.02, 0.02, 0.02, 0.02, 0.01, 0.01],
    [0.01, 0.02, 0.03, 0.04, 0.04, 0.03, 0.02, 0.01],
    [0.02, 0.03, 0.05, 0.07, 0.07, 0.05, 0.03, 0.02],
    [0.02, 0.04, 0.07, 0.10, 0.10, 0.07, 0.04, 0.02],
    [0.03, 0.06, 0.10, 0.15, 0.15, 0.10, 0.06, 0.03],
    [0.05, 0.10, 0.18, 0.25, 0.25, 0.18, 0.10, 0.05],
    [0.08, 0.15, 0.25, 0.35, 0.35, 0.25, 0.15, 0.08],
    [0.10, 0.20, 0.35, 0.45, 0.45, 0.35, 0.20, 0.10],
    [0.15, 0.30, 0.50, 0.60, 0.60, 0.50, 0.30, 0.15],
    [0.20, 0.40, 0.60, 0.70, 0.70, 0.60, 0.40, 0.20],
    [0.25, 0.45, 0.65, 0.75, 0.75, 0.65, 0.45, 0.25],
  ],
  'Possession': [
    [0.01, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01],
    [0.01, 0.02, 0.02, 0.03, 0.03, 0.02, 0.02, 0.01],
    [0.02, 0.03, 0.04, 0.05, 0.05, 0.04, 0.03, 0.02],
    [0.03, 0.04, 0.06, 0.08, 0.08, 0.06, 0.04, 0.03],
    [0.04, 0.06, 0.09, 0.12, 0.12, 0.09, 0.06, 0.04],
    [0.06, 0.09, 0.15, 0.20, 0.20, 0.15, 0.09, 0.06],
    [0.08, 0.15, 0.25, 0.35, 0.35, 0.25, 0.15, 0.08],
    [0.10, 0.20, 0.35, 0.45, 0.45, 0.35, 0.20, 0.10],
    [0.15, 0.30, 0.50, 0.60, 0.60, 0.50, 0.30, 0.15],
    [0.20, 0.40, 0.60, 0.70, 0.70, 0.60, 0.40, 0.20],
    [0.25, 0.50, 0.70, 0.80, 0.80, 0.70, 0.50, 0.25],
    [0.30, 0.60, 0.80, 0.95, 0.95, 0.80, 0.60, 0.30],
  ],
  'Final Third': [
    [0.01, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01],
    [0.01, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01],
    [0.01, 0.01, 0.02, 0.02, 0.02, 0.02, 0.01, 0.01],
    [0.01, 0.02, 0.03, 0.03, 0.03, 0.03, 0.02, 0.01],
    [0.02, 0.03, 0.04, 0.05, 0.05, 0.04, 0.03, 0.02],
    [0.03, 0.05, 0.08, 0.10, 0.10, 0.08, 0.05, 0.03],
    [0.05, 0.10, 0.15, 0.20, 0.20, 0.15, 0.10, 0.05],
    [0.10, 0.20, 0.30, 0.40, 0.40, 0.30, 0.20, 0.10],
    [0.20, 0.35, 0.50, 0.65, 0.65, 0.50, 0.35, 0.20],
    [0.35, 0.50, 0.70, 0.85, 0.85, 0.70, 0.50, 0.35],
    [0.50, 0.70, 0.85, 0.95, 0.95, 0.85, 0.70, 0.50],
    [0.65, 0.80, 0.95, 0.99, 0.99, 0.95, 0.80, 0.65],
  ],
};

const ExpectedThreatViz = () => {
  const [selectedTeam, setSelectedTeam] = useState('Liverpool');
  const [showLabels, setShowLabels] = useState(true);
  const [phaseOfPlay, setPhaseOfPlay] = useState('Possession');
  const [viewMode, setViewMode] = useState('heatmap');

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-3">
          <div>
            <h2 className="text-xl font-bold text-[#0A1128]">Expected Threat (xT) Model</h2>
            <p className="text-gray-600">Visualize pitch zones with goal probability values</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <TeamSelector selectedTeam={selectedTeam} onSelectTeam={setSelectedTeam} />
            
            <Select value={phaseOfPlay} onValueChange={setPhaseOfPlay}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Phase of Play" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Build-up">Build-up</SelectItem>
                <SelectItem value="Possession">Possession</SelectItem>
                <SelectItem value="Final Third">Final Third</SelectItem>
              </SelectContent>
            </Select>
            
            <div className="flex">
              <Button 
                variant={viewMode === 'heatmap' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setViewMode('heatmap')}
                className="rounded-r-none"
              >
                <BarChart2 size={16} className="mr-1" />
                Heatmap
              </Button>
              <Button 
                variant={viewMode === 'grid' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setViewMode('grid')}
                className="rounded-l-none"
              >
                <ArrowRightLeft size={16} className="mr-1" />
                Grid
              </Button>
            </div>
            
            <Button 
              variant="outline"
              size="sm"
              onClick={() => setShowLabels(!showLabels)}
              className="flex items-center gap-1"
            >
              <Info size={16} />
              <span className="hidden sm:inline">{showLabels ? 'Hide' : 'Show'} Labels</span>
            </Button>
          </div>
        </div>

        <FootballPitch showLabels={showLabels}>
          {viewMode === 'heatmap' ? (
            <HeatMap 
              data={mockXtData[phaseOfPlay as keyof typeof mockXtData]} 
              colorScale={['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']}
              opacity={0.7}
            />
          ) : (
            <div className="absolute inset-0 grid grid-cols-8 grid-rows-12">
              {mockXtData[phaseOfPlay as keyof typeof mockXtData].map((row, rowIndex) => (
                row.map((value, colIndex) => (
                  <div 
                    key={`${rowIndex}-${colIndex}`} 
                    className="border border-white/30 flex items-center justify-center"
                  >
                    {showLabels && (
                      <span className="text-[0.6rem] font-mono bg-black/70 text-white px-1 rounded">
                        {value.toFixed(2)}
                      </span>
                    )}
                  </div>
                ))
              ))}
            </div>
          )}
        </FootballPitch>
        
        <div className="mt-4 flex justify-center">
          <div className="flex items-center">
            <span className="text-xs text-gray-600 mr-2">Low xT</span>
            <div className="flex h-4">
              {['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026'].map((color, i) => (
                <div 
                  key={i} 
                  className="w-5 h-4" 
                  style={{ backgroundColor: color }}
                ></div>
              ))}
            </div>
            <span className="text-xs text-gray-600 ml-2">High xT</span>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-4">
        <h3 className="font-semibold mb-2">What is Expected Threat (xT)?</h3>
        <p className="text-sm text-gray-700 mb-3">
          Expected Threat (xT) is a framework that assigns a value to each location on the pitch based on how likely a team is to score from that position. It helps quantify the effectiveness of actions that don't directly lead to shots.
        </p>
        
        <h3 className="font-semibold mb-2">How to use this visualization:</h3>
        <ul className="list-disc pl-6 text-sm text-gray-700 space-y-1">
          <li>Select different phases of play to see how xT values change across the pitch</li>
          <li>Switch between heatmap and grid views for different perspectives</li>
          <li>The color gradient represents the probability of scoring from each zone</li>
          <li>Redder areas indicate higher scoring probability</li>
          <li>Toggle labels to see numerical xT values (grid view)</li>
        </ul>
      </div>
    </div>
  );
};

export default ExpectedThreatViz;
