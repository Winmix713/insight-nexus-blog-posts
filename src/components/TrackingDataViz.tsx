
import React, { useState, useEffect } from 'react';
import FootballPitch from './FootballPitch';
import { TeamSelector } from './TeamSelector';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Play, Pause, SkipBack, SkipForward, Info } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

// Mock tracking data for animation
const generateFrames = (frames = 100) => {
  const homeTeam = [
    { id: 1, position: "GK", number: 1 },
    { id: 2, position: "RB", number: 2 },
    { id: 3, position: "CB", number: 5 },
    { id: 4, position: "CB", number: 6 },
    { id: 5, position: "LB", number: 3 },
    { id: 6, position: "CM", number: 8 },
    { id: 7, position: "CM", number: 4 },
    { id: 8, position: "CAM", number: 10 },
    { id: 9, position: "RW", number: 7 },
    { id: 10, position: "ST", number: 9 },
    { id: 11, position: "LW", number: 11 }
  ];

  const awayTeam = [
    { id: 12, position: "GK", number: 1 },
    { id: 13, position: "RB", number: 2 },
    { id: 14, position: "CB", number: 5 },
    { id: 15, position: "CB", number: 6 },
    { id: 16, position: "LB", number: 3 },
    { id: 17, position: "CM", number: 8 },
    { id: 18, position: "CM", number: 4 },
    { id: 19, position: "CAM", number: 10 },
    { id: 20, position: "RW", number: 7 },
    { id: 21, position: "ST", number: 9 },
    { id: 22, position: "LW", number: 11 }
  ];

  // Starting positions
  const initialPositions = {
    home: [
      { x: 10, y: 50 },    // GK
      { x: 25, y: 20 },    // RB
      { x: 25, y: 40 },    // CB
      { x: 25, y: 60 },    // CB
      { x: 25, y: 80 },    // LB
      { x: 45, y: 35 },    // CM
      { x: 45, y: 65 },    // CM
      { x: 60, y: 50 },    // CAM
      { x: 70, y: 25 },    // RW
      { x: 75, y: 50 },    // ST
      { x: 70, y: 75 }     // LW
    ],
    away: [
      { x: 90, y: 50 },    // GK
      { x: 75, y: 80 },    // RB
      { x: 75, y: 60 },    // CB
      { x: 75, y: 40 },    // CB
      { x: 75, y: 20 },    // LB
      { x: 55, y: 65 },    // CM
      { x: 55, y: 35 },    // CM
      { x: 40, y: 50 },    // CAM
      { x: 30, y: 75 },    // RW
      { x: 25, y: 50 },    // ST
      { x: 30, y: 25 }     // LW
    ],
    ball: { x: 50, y: 50 }
  };

  // Generate animation frames with subtle movements
  const result = [];
  let currentPositions = JSON.parse(JSON.stringify(initialPositions));
  
  for (let i = 0; i < frames; i++) {
    // Update positions with slight random movements
    const homePositions = currentPositions.home.map(pos => ({
      x: Math.max(5, Math.min(95, pos.x + (Math.random() * 4 - 2))),
      y: Math.max(5, Math.min(95, pos.y + (Math.random() * 4 - 2)))
    }));
    
    const awayPositions = currentPositions.away.map(pos => ({
      x: Math.max(5, Math.min(95, pos.x + (Math.random() * 4 - 2))),
      y: Math.max(5, Math.min(95, pos.y + (Math.random() * 4 - 2)))
    }));
    
    // Update ball position more dynamically
    const ballPos = {
      x: Math.max(5, Math.min(95, currentPositions.ball.x + (Math.random() * 6 - 3))),
      y: Math.max(5, Math.min(95, currentPositions.ball.y + (Math.random() * 6 - 3)))
    };
    
    // Save the current frame
    result.push({
      timestamp: i,
      home: homeTeam.map((player, idx) => ({
        ...player,
        x: homePositions[idx].x,
        y: homePositions[idx].y
      })),
      away: awayTeam.map((player, idx) => ({
        ...player,
        x: awayPositions[idx].x,
        y: awayPositions[idx].y
      })),
      ball: ballPos
    });
    
    // Update for next frame
    currentPositions = {
      home: homePositions,
      away: awayPositions,
      ball: ballPos
    };
  }
  
  return result;
};

const TRACKING_DATA = generateFrames(200);

const TrackingDataViz = () => {
  const [selectedTeam, setSelectedTeam] = useState('Liverpool');
  const [showLabels, setShowLabels] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [showHeatmap, setShowHeatmap] = useState(false);
  
  const totalFrames = TRACKING_DATA.length;
  
  // Animation control
  useEffect(() => {
    let intervalId: number | null = null;
    
    if (isPlaying) {
      intervalId = window.setInterval(() => {
        setCurrentFrame(prev => {
          const next = prev + 1;
          if (next >= totalFrames) {
            setIsPlaying(false);
            return 0;
          }
          return next;
        });
      }, 100);
    }
    
    return () => {
      if (intervalId !== null) clearInterval(intervalId);
    };
  }, [isPlaying, totalFrames]);
  
  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };
  
  const handleSliderChange = (value: number[]) => {
    setCurrentFrame(value[0]);
    if (isPlaying) setIsPlaying(false);
  };
  
  const jumpToStart = () => {
    setCurrentFrame(0);
    if (isPlaying) setIsPlaying(false);
  };
  
  const jumpToEnd = () => {
    setCurrentFrame(totalFrames - 1);
    if (isPlaying) setIsPlaying(false);
  };
  
  const currentData = TRACKING_DATA[currentFrame];
  
  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-3">
          <div>
            <h2 className="text-xl font-bold text-[#0A1128]">Player Tracking Visualization</h2>
            <p className="text-gray-600">Analyze player positions and movement patterns</p>
          </div>
          <div className="flex items-center gap-3">
            <TeamSelector selectedTeam={selectedTeam} onSelectTeam={setSelectedTeam} />
            
            <Button 
              variant="outline"
              size="sm"
              onClick={() => setShowLabels(!showLabels)}
              className="flex items-center gap-1"
            >
              <Info size={16} />
              <span className="hidden sm:inline">{showLabels ? 'Hide' : 'Show'} Numbers</span>
            </Button>
            
            <Button
              variant={showHeatmap ? "default" : "outline"}
              size="sm"
              onClick={() => setShowHeatmap(!showHeatmap)}
            >
              {showHeatmap ? "Hide Heatmap" : "Show Heatmap"}
            </Button>
          </div>
        </div>

        <FootballPitch showLabels={false}>
          {/* Players and Ball */}
          {currentData && (
            <>
              {/* Home team players */}
              {currentData.home.map(player => (
                <div
                  key={`home-${player.id}`}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full bg-[#FF6700] border-2 border-white z-10 transition-all duration-100"
                  style={{
                    left: `${player.x}%`,
                    top: `${player.y}%`,
                    width: '16px',
                    height: '16px',
                  }}
                >
                  {showLabels && (
                    <span className="text-[0.6rem] text-white font-bold">{player.number}</span>
                  )}
                </div>
              ))}
              
              {/* Away team players */}
              {currentData.away.map(player => (
                <div
                  key={`away-${player.id}`}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full bg-[#00A6FB] border-2 border-white z-10 transition-all duration-100"
                  style={{
                    left: `${player.x}%`,
                    top: `${player.y}%`,
                    width: '16px',
                    height: '16px',
                  }}
                >
                  {showLabels && (
                    <span className="text-[0.6rem] text-white font-bold">{player.number}</span>
                  )}
                </div>
              ))}
              
              {/* Ball */}
              <div
                className="absolute transform -translate-x-1/2 -translate-y-1/2 rounded-full bg-white border border-gray-400 shadow-md z-20 transition-all duration-100"
                style={{
                  left: `${currentData.ball.x}%`,
                  top: `${currentData.ball.y}%`,
                  width: '10px',
                  height: '10px',
                }}
              ></div>
              
              {/* Heat map overlay (if enabled) */}
              {showHeatmap && (
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-transparent to-orange-500/20 pointer-events-none"></div>
              )}
            </>
          )}
        </FootballPitch>
        
        {/* Playback controls */}
        <div className="mt-4 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button 
                size="icon"
                variant="outline"
                onClick={jumpToStart}
              >
                <SkipBack size={16} />
              </Button>
              
              <Button
                size="icon"
                variant={isPlaying ? "default" : "outline"}
                onClick={handlePlayPause}
              >
                {isPlaying ? <Pause size={16} /> : <Play size={16} />}
              </Button>
              
              <Button 
                size="icon"
                variant="outline"
                onClick={jumpToEnd}
              >
                <SkipForward size={16} />
              </Button>
            </div>
            
            <div className="flex items-center gap-2">
              <Badge variant="secondary">
                Frame {currentFrame + 1}/{totalFrames}
              </Badge>
              
              <Badge variant="outline">
                {selectedTeam === 'Liverpool' ? 'LIV' : 'MCI'} vs {selectedTeam === 'Liverpool' ? 'MCI' : 'LIV'}
              </Badge>
            </div>
          </div>
          
          <Slider 
            value={[currentFrame]} 
            min={0} 
            max={totalFrames - 1} 
            step={1}
            onValueChange={handleSliderChange}
            className="w-full"
          />
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-4">
        <h3 className="font-semibold mb-2">About Server-Side Rendered (SSR) Tracking Data:</h3>
        <p className="text-sm text-gray-700 mb-3">
          This visualization demonstrates how player tracking data can be efficiently rendered and animated using server-side rendering techniques. The real implementation would use actual tracking data from sports analytics providers.
        </p>
        
        <h3 className="font-semibold mb-2">How to use:</h3>
        <ul className="list-disc pl-6 text-sm text-gray-700 space-y-1">
          <li>Use the play/pause button to animate player movements</li>
          <li>Drag the slider to view specific frames in the sequence</li>
          <li>Toggle player numbers for better identification</li>
          <li>Enable the heatmap to see team positioning tendencies</li>
          <li>Orange dots represent the home team, blue dots represent the away team</li>
          <li>The white ball shows the current position of the ball</li>
        </ul>
      </div>
    </div>
  );
};

export default TrackingDataViz;
