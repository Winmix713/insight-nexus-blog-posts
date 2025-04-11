
import React from 'react';

type FootballPitchProps = {
  children?: React.ReactNode;
  className?: string;
  showLabels?: boolean;
};

const FootballPitch: React.FC<FootballPitchProps> = ({ 
  children, 
  className = "",
  showLabels = false
}) => {
  return (
    <div className={`relative w-full h-0 pb-[62%] bg-[#3c7a3e] rounded-lg overflow-hidden shadow-lg ${className}`}>
      {/* Field lines */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Outer border */}
        <div className="absolute w-[98%] h-[96%] border-2 border-white"></div>
        
        {/* Halfway line */}
        <div className="absolute w-[98%] h-0 border-t-2 border-white top-1/2 transform -translate-y-1/2"></div>
        
        {/* Center circle */}
        <div className="absolute w-[20%] h-[30%] rounded-full border-2 border-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
        
        {/* Center dot */}
        <div className="absolute w-[1%] h-[1.5%] rounded-full bg-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
        
        {/* Left penalty area */}
        <div className="absolute w-[16%] h-[40%] border-2 border-white left-[1%] top-1/2 transform -translate-y-1/2"></div>
        
        {/* Right penalty area */}
        <div className="absolute w-[16%] h-[40%] border-2 border-white right-[1%] top-1/2 transform -translate-y-1/2"></div>
        
        {/* Left goal */}
        <div className="absolute w-[2%] h-[12%] border-2 border-white left-0 top-1/2 transform -translate-y-1/2"></div>
        
        {/* Right goal */}
        <div className="absolute w-[2%] h-[12%] border-2 border-white right-0 top-1/2 transform -translate-y-1/2"></div>

        {showLabels && (
          <>
            <div className="absolute bottom-2 left-2 bg-black/50 text-white px-2 py-1 rounded text-xs">Defensive Third</div>
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-2 py-1 rounded text-xs">Middle Third</div>
            <div className="absolute bottom-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-xs">Attacking Third</div>
          </>
        )}
      </div>
      
      {children}
    </div>
  );
};

export default FootballPitch;
