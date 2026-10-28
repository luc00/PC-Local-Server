import React, { useState } from 'react';
import serverIconImg from '../assets/server-icon.png';
import { SERVER_ICON_BASE64 } from '../constants/assets.ts';

interface ServerIconProps {
  className?: string;
  alt?: string;
}

export const ServerIcon: React.FC<ServerIconProps> = ({ 
  className = "h-full w-full object-contain",
  alt = "Server Rack AI"
}) => {
  const [sourceIndex, setSourceIndex] = useState<number>(0);

  // Fallback chain:
  // 0: Vite-bundled asset with dynamic base URL (/PC-Local-Server/assets/...)
  // 1: Base64 data URI (embedded in JS bundle)
  // 2: Relative public path
  // 3: Fallback inline SVG
  const sources = [
    serverIconImg,
    SERVER_ICON_BASE64,
    `${import.meta.env.BASE_URL}server-icon.png`,
    './server-icon.png',
  ];

  const handleError = () => {
    if (sourceIndex < sources.length - 1) {
      setSourceIndex(prev => prev + 1);
    } else {
      // Mark as final fallback
      setSourceIndex(99);
    }
  };

  if (sourceIndex === 99) {
    // Beautiful, sharp SVG server rack illustration that cannot fail
    return (
      <svg 
        viewBox="0 0 64 80" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-label={alt}
      >
        {/* Cabinet frame */}
        <rect x="8" y="4" width="48" height="72" rx="3" fill="#1C1A17" stroke="#3D352B" strokeWidth="2" />
        <rect x="12" y="8" width="40" height="64" rx="2" fill="#282420" stroke="#4A3F33" strokeWidth="1" />
        {/* Glass door reflection */}
        <path d="M14 10 L38 10 L24 70 L14 70 Z" fill="white" fillOpacity="0.06" />
        {/* Rack units */}
        {[14, 21, 28, 35, 42, 49, 56, 63].map((y) => (
          <g key={y}>
            <rect x="15" y={y} width="34" height="5" rx="0.5" fill="#151311" stroke="#332B22" strokeWidth="0.5" />
            <circle cx="18" cy={y + 2.5} r="1" fill="#3B82F6" />
            <circle cx="22" cy={y + 2.5} r="1" fill="#10B981" />
            <circle cx="26" cy={y + 2.5} r="1" fill="#3B82F6" />
            <line x1="32" y1={y + 2.5} x2="45" y2={y + 2.5} stroke="#3D352B" strokeWidth="1" strokeDasharray="1 1" />
          </g>
        ))}
      </svg>
    );
  }

  return (
    <img 
      src={sources[sourceIndex]} 
      alt={alt} 
      className={className}
      onError={handleError}
      loading="eager"
    />
  );
};
