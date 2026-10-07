import React from 'react';

export default function SectionHeader({
  title,
  subtitle,
  badge,
  action,
  className = '',
}) {
  return (
    <div
      className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E2E8F0] ${className}`}
    >
      <div>
        <div className="flex items-center gap-2.5">
          <h2 className="text-base sm:text-lg font-bold tracking-tight text-[#172A3A]">
            {title}
          </h2>
          {badge && <div>{badge}</div>}
        </div>
        {subtitle && (
          <p className="mt-0.5 text-xs sm:text-sm text-[#64748B]">
            {subtitle}
          </p>
        )}
      </div>

      {action && <div className="flex items-center gap-2 shrink-0">{action}</div>}
    </div>
  );
}
