import React from 'react';
import { SEVERITY_DISTRIBUTION } from '../../data/mockData';
import { formatNumber, formatPercentage } from '../../utils/formatters';

export default function SeverityDistribution({ data = SEVERITY_DISTRIBUTION }) {
  return (
    <div className="bg-white rounded-lg border border-[#E2E8F0] p-5 shadow-xs">
      <div className="pb-3 border-b border-[#F1F5F9]">
        <h3 className="text-sm font-bold text-[#172A3A] uppercase tracking-wider">
          Severity Distribution
        </h3>
        <p className="text-xs text-[#64748B]">
          Distribution of anomaly severity across inspected products
        </p>
      </div>

      <div className="mt-4 space-y-3">
        {data.map((item) => (
          <div key={item.level} className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-[#172A3A] flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-xs"
                  style={{ backgroundColor: item.color }}
                />
                {item.level}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-[#64748B]">{formatNumber(item.count)}</span>
                <span className="font-semibold text-[#172A3A]">
                  ({formatPercentage(item.percentage)})
                </span>
              </div>
            </div>

            <div className="w-full h-2 rounded-full bg-[#F1F5F9] overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{
                  width: `${item.percentage}%`,
                  backgroundColor: item.color,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
