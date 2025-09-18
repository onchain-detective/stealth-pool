import React from 'react';

export const Logo = ({ className = "w-8 h-8" }: { className?: string }) => {
  return (
    <div className={`${className} relative`}>
      <svg
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Outer encrypted layer */}
        <rect
          x="2"
          y="6"
          width="28"
          height="20"
          rx="4"
          stroke="url(#gradient1)"
          strokeWidth="1.5"
          fill="none"
          className="animate-glow"
        />
        
        {/* Middle hidden layer */}
        <rect
          x="5"
          y="9"
          width="22"
          height="14"
          rx="3"
          stroke="url(#gradient2)"
          strokeWidth="1.2"
          fill="hsl(var(--encrypted-layer))"
          opacity="0.7"
        />
        
        {/* Inner core - the actual liquidity */}
        <circle
          cx="16"
          cy="16"
          r="4"
          fill="url(#gradientCore)"
          className="animate-pulse"
        />
        
        {/* Privacy dots pattern */}
        <g opacity="0.6">
          <circle cx="10" cy="12" r="0.8" fill="hsl(var(--glow-primary))"/>
          <circle cx="22" cy="12" r="0.8" fill="hsl(var(--glow-primary))"/>
          <circle cx="10" cy="20" r="0.8" fill="hsl(var(--glow-secondary))"/>
          <circle cx="22" cy="20" r="0.8" fill="hsl(var(--glow-secondary))"/>
        </g>
        
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--glow-primary))"/>
            <stop offset="100%" stopColor="hsl(var(--glow-secondary))"/>
          </linearGradient>
          
          <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--glow-secondary))"/>
            <stop offset="100%" stopColor="hsl(var(--glow-primary))"/>
          </linearGradient>
          
          <radialGradient id="gradientCore" cx="50%" cy="50%">
            <stop offset="0%" stopColor="hsl(var(--glow-primary))"/>
            <stop offset="100%" stopColor="hsl(var(--glow-secondary))"/>
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
};