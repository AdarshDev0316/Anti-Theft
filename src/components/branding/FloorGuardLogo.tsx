import React from 'react';

interface FloorGuardLogoProps {
  variant?: 'full' | 'icon' | 'compact';
  theme?: 'dark' | 'light';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const FloorGuardLogo: React.FC<FloorGuardLogoProps> = ({
  variant = 'full',
  theme = 'dark',
  size = 'md',
  className = '',
}) => {
  const isDark = theme === 'dark';

  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  const titleSizes = {
    sm: 'text-sm tracking-wider',
    md: 'text-lg tracking-wider',
    lg: 'text-2xl tracking-widest',
    xl: 'text-3xl tracking-widest',
  };

  const subtitleSizes = {
    sm: 'text-[9px] tracking-widest',
    md: 'text-[10px] tracking-widest',
    lg: 'text-xs tracking-widest',
    xl: 'text-sm tracking-widest',
  };

  const IconSVG = (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${iconSizes[size]} transition-transform duration-300 group-hover:scale-105 shrink-0`}
      aria-label="FLOOR GUARD Security Shield Emblem"
    >
      {/* Outer Protective Shield */}
      <path
        d="M32 4L54 13V29C54 44.5 44.5 56.5 32 60C19.5 56.5 10 44.5 10 29V13L32 4Z"
        fill={isDark ? '#101827' : '#F4F7FC'}
        stroke="#35E0D0"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />

      {/* Floor Mat Perspective Grid Lines */}
      <path d="M19 41L45 41" stroke={isDark ? '#29374B' : '#CBD5E1'} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M16 46L48 46" stroke={isDark ? '#29374B' : '#CBD5E1'} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M22 38L15 51" stroke={isDark ? '#29374B' : '#CBD5E1'} strokeWidth="1.5" />
      <path d="M28 38L25 52" stroke={isDark ? '#29374B' : '#CBD5E1'} strokeWidth="1.5" />
      <path d="M36 38L39 52" stroke={isDark ? '#29374B' : '#CBD5E1'} strokeWidth="1.5" />
      <path d="M42 38L49 51" stroke={isDark ? '#29374B' : '#CBD5E1'} strokeWidth="1.5" />

      {/* IoT Concentric Signal Waves */}
      <path
        d="M21 24C24 20 28 18 32 18C36 18 40 20 43 24"
        stroke="#438BFF"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.8"
      />
      <path
        d="M25 27C27 24.5 29.5 23 32 23C34.5 23 37 24.5 39 27"
        stroke="#35E0D0"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Footprint / Pressure Sensor Core */}
      <ellipse cx="32" cy="38" rx="4.5" ry="3.5" fill="#35E0D0" />
      <path
        d="M27 30.5C27 28 29.2 26.5 32 26.5C34.8 26.5 37 28 37 30.5C37 33 34.8 34 32 34C29.2 34 27 33 27 30.5Z"
        fill="#35E0D0"
      />

      {/* IoT Beacon Apex Node */}
      <circle cx="32" cy="13" r="2.5" fill="#35E0D0" />
      <circle cx="32" cy="13" r="1.2" fill="#FFFFFF" />
    </svg>
  );

  if (variant === 'icon') {
    return <div className={`inline-flex items-center ${className}`}>{IconSVG}</div>;
  }

  return (
    <div className={`inline-flex items-center gap-3 select-none group ${className}`}>
      {IconSVG}
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5 font-extrabold uppercase tracking-wider font-sans leading-tight">
          <span className={isDark ? 'text-white' : 'text-slate-900'} style={{ textShadow: isDark ? '0 0 20px rgba(53, 224, 208, 0.2)' : 'none' }}>
            FLOOR
          </span>
          <span className="text-cyan font-black">
            GUARD
          </span>
        </div>
        {variant === 'full' && (
          <span className={`${subtitleSizes[size]} font-mono font-semibold uppercase text-text-muted tracking-widest`}>
            IoT SMART MAT SECURITY
          </span>
        )}
      </div>
    </div>
  );
};
