import React from 'react';

export default function StatCard({
  title,
  value,
  subtext,
  icon: Icon,
  badge,
  trend, // { direction: 'up' | 'down' | 'neutral', label: string }
  highlightColor = 'teal', // 'teal', 'navy', 'amber', 'red', 'green'
  className = '',
}) {
  const accentBorderColors = {
    teal: 'border-l-[#176B68]',
    navy: 'border-l-[#172A3A]',
    amber: 'border-l-[#B45309]',
    red: 'border-l-[#B91C1C]',
    green: 'border-l-[#1E6B42]',
  };

  const iconBgColors = {
    teal: 'bg-[#EBF7EE] text-[#176B68]',
    navy: 'bg-[#EFF3F6] text-[#172A3A]',
    amber: 'bg-[#FEF3C7] text-[#B45309]',
    red: 'bg-[#FEE2E2] text-[#B91C1C]',
    green: 'bg-[#EDF7F1] text-[#1E6B42]',
  };

  return (
    <div
      className={`bg-white rounded-lg border border-[#E2E8F0] border-l-4 ${accentBorderColors[highlightColor] || 'border-l-[#176B68]'} p-4 sm:p-5 shadow-xs transition-shadow hover:shadow-sm ${className}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#64748B]">
            {title}
          </p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-2xl font-bold tracking-tight text-[#172A3A]">
              {value}
            </h3>
            {badge && <div>{badge}</div>}
          </div>
        </div>
        {Icon && (
          <div
            className={`p-2.5 rounded-md ${iconBgColors[highlightColor] || 'bg-[#EFF3F6] text-[#172A3A]'} shrink-0`}
          >
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      {(subtext || trend) && (
        <div className="mt-3 pt-2.5 border-t border-[#F1F5F9] flex items-center justify-between text-xs text-[#64748B]">
          {subtext && <span>{subtext}</span>}
          {trend && (
            <span
              className={`font-medium ${
                trend.direction === 'up'
                  ? 'text-[#1E6B42]'
                  : trend.direction === 'down'
                  ? 'text-[#B91C1C]'
                  : 'text-[#64748B]'
              }`}
            >
              {trend.label}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
