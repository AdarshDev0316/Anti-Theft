import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  glow?: 'none' | 'cyan' | 'blue' | 'critical';
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  action?: React.ReactNode;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  glow = 'none',
  title,
  subtitle,
  action,
  padding = 'md',
}) => {
  const glowStyles = {
    none: 'border-border shadow-sm',
    cyan: 'border-cyan/40 shadow-lg shadow-cyan/5 ring-1 ring-cyan/20',
    blue: 'border-signal-blue/40 shadow-lg shadow-signal-blue/5 ring-1 ring-signal-blue/20',
    critical: 'border-state-critical/40 shadow-lg shadow-red-500/10 ring-1 ring-state-critical/30',
  };

  const paddingStyles = {
    none: '',
    sm: 'p-3',
    md: 'p-5',
    lg: 'p-7',
  };

  return (
    <div className={`bg-bg-card rounded-xl border ${glowStyles[glow]} transition-all duration-200 ${className}`}>
      {(title || action) && (
        <div className="flex items-center justify-between border-b border-border/60 px-5 py-4 gap-3">
          <div>
            {typeof title === 'string' ? (
              <h3 className="font-semibold text-text-primary text-base tracking-wide flex items-center gap-2">
                {title}
              </h3>
            ) : (
              title
            )}
            {subtitle && (
              <p className="text-xs text-text-secondary mt-0.5">{subtitle}</p>
            )}
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </div>
      )}
      <div className={paddingStyles[padding]}>{children}</div>
    </div>
  );
};
