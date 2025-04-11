
import React, { useState } from 'react';
import FootballPitch from './FootballPitch';
import { TeamSelector } from './TeamSelector';
import { Button } from '@/components/ui/button';
import { RefreshCw, Info } from 'lucide-react';

// Mock data
const MOCK_POSITIONS = [
  { id: 1, x: 10, y: 50, name: "Alisson", number: 1, position: "GK" },
  { id: 2, x: 25, y: 20, name: "Alexander-Arnold", number: 66, position: "RB" },
  { id: 3, x: 25, y: 40, name: "Van Dijk", number: 4, position: "CB" },
  { id: 4, x: 25, y: 60, name: "Konate", number: 5, position: "CB" },
  { id: 5, x: 25, y: 80, name: "Robertson", number: 26, position: "LB" },
  { id: 6, x: 45, y: 30, name: "Henderson", number: 14, position: "CM" },
  { id: 7, x: 45, y: 50, name: "Fabinho", number: 3, position: "DM" },
  { id: 8, x: 45, y: 70, name: "Thiago", number: 6, position: "CM" },
  { id: 9, x: 70, y: 20, name: "Salah", number: 11, position: "RW" },
  { id: 10, x: 70, y: 50, name: "Firmino", number: 9, position: "CF" },
  { id: 11, x: 70, y: 80, name: "Mane", number: 10, position: "LW" },
];

const MOCK_PASSES = [
  { from: 1, to: 2, weight: 15 },
  { from: 1, to: 3, weight: 12 },
  { from: 1, to: 4, weight: 10 },
  { from: 2, to: 6, weight: 20 },
  { from: 2, to: 9, weight: 18 },
  { from: 3, to: 6, weight: 15 },
  { from: 3, to: 7, weight: 22 },
  { from: 4, to: 7, weight: 16 },
  { from: 4, to: 5, weight: 12 },
  { from: 5, to: 8, weight: 18 },
  { from: 5, to: 11, weight: 25 },
  { from: 6, to: 9, weight: 15 },
  { from: 7, to: 6, weight: 12 },
  { from: 7, to: 8, weight: 10 },
  { from: 8, to: 11, weight: 16 },
  { from: 9, to: 10, weight: 20 },
  { from: 10, to: 11, weight: 14 },
  { from: 11, to: 8, weight: 12 },
];

// Find max pass weight for scaling
const maxWeight = Math.max(...MOCK_PASSES.map(pass => pass.weight));

const PassingNetworkViz = () => {
  const [selectedTeam, setSelectedTeam] = useState('Liverpool');
  const [showLabels, setShowLabels] = useState(true);
  const [highlightedPlayer, setHighlightedPlayer] = useState<number | null>(null);

  // Calculate pass line thickness based on weight
  const getLineWidth = (weight: number) => {
    return Math.max(1, Math.round((weight / maxWeight) * 6));
  };

  // Calculate node size based on number of passes
  const getNodeSize = (playerId: number) => {
    const passesInvolved = MOCK_PASSES.filter(
      pass => pass.from === playerId || pass.to === playerId
    ).length;
    return Math.max(22, passesInvolved * 4);
  };

  const isConnected = (playerId: number) => {
    return highlightedPlayer === null || 
           MOCK_PASSES.some(pass => 
             (pass.from === highlightedPlayer && pass.to === playerId) || 
             (pass.to === highlightedPlayer && pass.from === playerId)
           );
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-3">
          <div>
            <h2 className="text-xl font-bold text-[#0A1128]">Interactive Passing Network</h2>
            <p className="text-gray-600">Visualize passing connections between players</p>
          </div>
          <div className="flex items-center gap-3">
            <TeamSelector selectedTeam={selectedTeam} onSelectTeam={setSelectedTeam} />
            <Button 
              variant="outline"
              size="sm"
              onClick={() => setHighlightedPlayer(null)}
              className="flex items-center gap-1"
            >
              <RefreshCw size={16} />
              <span className="hidden sm:inline">Reset</span>
            </Button>
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
          {/* Pass lines */}
          {MOCK_PASSES.map((pass, index) => {
            const fromPlayer = MOCK_POSITIONS.find(p => p.id === pass.from);
            const toPlayer = MOCK_POSITIONS.find(p => p.id === pass.to);
            
            if (!fromPlayer || !toPlayer) return null;
            
            const isHighlighted = highlightedPlayer === null || 
                                 pass.from === highlightedPlayer || 
                                 pass.to === highlightedPlayer;
            
            return (
              <svg key={index} className="absolute inset-0 w-full h-full pointer-events-none">
                <line
                  x1={`${fromPlayer.x}%`}
                  y1={`${fromPlayer.y}%`}
                  x2={`${toPlayer.x}%`}
                  y2={`${toPlayer.y}%`}
                  stroke={isHighlighted ? "#00A6FB" : "#00A6FB50"}
                  strokeWidth={getLineWidth(pass.weight)}
                  strokeOpacity={isHighlighted ? 0.8 : 0.3}
                />
              </svg>
            );
          })}
          
          {/* Player nodes */}
          {MOCK_POSITIONS.map(player => {
            const nodeSize = getNodeSize(player.id);
            const connected = isConnected(player.id);
            
            return (
              <div
                key={player.id}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full 
                          transition-all duration-300 cursor-pointer z-10
                          ${connected ? 'opacity-100' : 'opacity-40'}`}
                style={{
                  left: `${player.x}%`,
                  top: `${player.y}%`,
                  width: `${nodeSize}px`,
                  height: `${nodeSize}px`,
                  backgroundColor: highlightedPlayer === player.id ? '#FF6700' : '#00A6FB',
                }}
                onClick={() => setHighlightedPlayer(player.id === highlightedPlayer ? null : player.id)}
              >
                <span className="text-xs text-white font-bold">{player.number}</span>
              </div>
            );
          })}
          
          {/* Player labels */}
          {showLabels && MOCK_POSITIONS.map(player => (
            <div
              key={`label-${player.id}`}
              className={`absolute text-xs bg-black/70 text-white px-1 py-0.5 rounded whitespace-nowrap transform -translate-x-1/2
                        transition-opacity duration-300 
                        ${isConnected(player.id) ? 'opacity-100' : 'opacity-40'}`}
              style={{
                left: `${player.x}%`,
                top: `${player.y + 5}%`,
              }}
            >
              {player.name}
            </div>
          ))}
        </FootballPitch>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-4">
        <h3 className="font-semibold mb-2">How to use:</h3>
        <ul className="list-disc pl-6 text-sm text-gray-700 space-y-1">
          <li>Click on a player to highlight their passing connections</li>
          <li>The size of each circle represents the player's involvement in the passing network</li>
          <li>Thicker lines indicate a higher volume of passes between players</li>
          <li>Use the team selector to change the displayed team</li>
          <li>Toggle labels to see player names</li>
        </ul>
      </div>
    </div>
  );
};

export default PassingNetworkViz;
