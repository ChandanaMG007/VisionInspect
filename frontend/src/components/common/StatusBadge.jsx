import React from 'react';
import { getResultBadgeConfig, getSeverityBadgeConfig } from '../../utils/formatters';

export default function StatusBadge({
  value,
  type = 'result', // 'result' or 'severity'
  size = 'md',
  showDot = true,
  className = '',
}) {
  const config =
    type === 'severity'
      ? getSeverityBadgeConfig(value)
      : getResultBadgeConfig(value);

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5 font-medium',
    md: 'text-xs px-2.5 py-1 font-semibold',
    lg: 'text-sm px-3 py-1 font-semibold',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border ${config.bgColor} ${config.textColor} ${config.borderColor} ${sizeClasses[size]} ${className}`}
    >
      {showDot && config.dotColor && (
        <span className={`w-1.5 h-1.5 rounded-full ${config.dotColor} shrink-0`} />
      )}
      <span className="tracking-tight">{config.label}</span>
    </span>
  );
}
