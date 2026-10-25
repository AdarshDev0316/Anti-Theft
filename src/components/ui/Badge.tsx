import React from 'react';

export type BadgeVariant =
  | 'cyan'
  | 'blue'
  | 'success'
  | 'warning'
  | 'critical'
  | 'neutral'
  | 'outline';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: 'sm' | 'md';
  pulse?: boolean;
  className?: string;
  icon?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'cyan',
  size = 'md',
  pulse = false,
  className = '',
  icon,
}) => {
  const sizeStyles = {
    sm: 'text-[10px] px-2 py-0.5 font-mono font-medium',
    md: 'text-xs px-2.5 py-1 font-mono font-semibold',
  };

  const variantStyles = {
    cyan: 'bg-cyan/15 text-cyan border border-cyan/30',
    blue: 'bg-signal-blue/15 text-signal-blue border border-signal-blue/30',
    success: 'bg-state-success/15 text-state-success border border-state-success/30',
    warning: 'bg-state-warning/15 text-state-warning border border-state-warning/30',
    critical: 'bg-state-critical/15 text-state-critical border border-state-critical/30',
    neutral: 'bg-bg-elevated text-text-secondary border border-border',
    outline: 'bg-transparent text-text-primary border border-border',
  };

  const pulseColors = {
    cyan: 'bg-cyan',
    blue: 'bg-signal-blue',
    success: 'bg-state-success',
    warning: 'bg-state-warning',
    critical: 'bg-state-critical',
    neutral: 'bg-text-secondary',
    outline: 'bg-cyan',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full select-none uppercase tracking-wider ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
    >
      {pulse && (
        <span className="relative flex h-2 w-2">
          <span
            className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${pulseColors[variant]}`}
          />
          <span className={`relative inline-flex rounded-full h-2 w-2 ${pulseColors[variant]}`} />
        </span>
      )}
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </span>
  );
};
