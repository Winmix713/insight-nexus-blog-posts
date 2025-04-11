
import React from 'react';

type HeatMapProps = {
  data: number[][];
  colorScale?: string[];
  opacity?: number;
  className?: string;
};

const HeatMap: React.FC<HeatMapProps> = ({ 
  data, 
  colorScale = ['#0571b0', '#92c5de', '#f7f7f7', '#f4a582', '#ca0020'],
  opacity = 0.7,
  className = ""
}) => {
  // Default to a 12x8 grid if data is not properly formatted
  const rows = data.length || 12;
  const cols = (data[0]?.length || 8);
  
  // Find min and max values for scaling
  let minValue = Number.MAX_VALUE;
  let maxValue = Number.MIN_VALUE;
  
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const value = data[i]?.[j] || 0;
      minValue = Math.min(minValue, value);
      maxValue = Math.max(maxValue, value);
    }
  }
  
  // Normalize and get color
  const getColor = (value: number) => {
    if (minValue === maxValue) return colorScale[Math.floor(colorScale.length / 2)];
    
    const normalizedValue = (value - minValue) / (maxValue - minValue);
    const index = Math.min(Math.floor(normalizedValue * (colorScale.length - 1)), colorScale.length - 1);
    return colorScale[index];
  };
  
  return (
    <div className={`absolute inset-0 ${className}`} style={{ opacity }}>
      <div className="grid h-full w-full" style={{ 
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        gridTemplateColumns: `repeat(${cols}, 1fr)`
      }}>
        {Array.from({ length: rows }).map((_, rowIndex) => (
          Array.from({ length: cols }).map((_, colIndex) => {
            const value = data[rowIndex]?.[colIndex] || 0;
            return (
              <div
                key={`${rowIndex}-${colIndex}`}
                style={{ 
                  backgroundColor: getColor(value),
                }}
                className="w-full h-full"
              />
            );
          })
        ))}
      </div>
    </div>
  );
};

export default HeatMap;
