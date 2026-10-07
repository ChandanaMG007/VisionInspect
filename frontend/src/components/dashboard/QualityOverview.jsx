import React from 'react';
import { formatNumber, formatPercentage } from '../../utils/formatters';

export default function QualityOverview({ stats }) {
  if (!stats) return null;

  const total = stats.totalInspections || 1;
  const normalPct = (stats.normalCount / total) * 100;
  const defectivePct = (stats.defectiveCount / total) * 100;
  const reviewPct = (stats.reviewCount / total) * 100;

  return (
    <div className="bg-white rounded-lg border border-[#E2E8F0] p-5 shadow-xs">
      <div className="pb-3 border-b border-[#F1F5F9]">
        <h3 className="text-sm font-bold text-[#172A3A] uppercase tracking-wider">
          Inspection Results Distribution
        </h3>
        <p className="text-xs text-[#64748B]">
          Distribution across {formatNumber(stats.totalInspections)} total inspections
        </p>
      </div>

      {/* Segmented Distribution Bar */}
      <div className="mt-4">
        <div className="w-full h-3.5 rounded-full overflow-hidden flex bg-[#E2E8F0]">
          <div
            style={{ width: `${normalPct}%` }}
            className="bg-[#1E6B42] transition-all duration-300"
            title={`Normal: ${formatPercentage(normalPct)}`}
          />
          <div
            style={{ width: `${reviewPct}%` }}
            className="bg-[#B45309] transition-all duration-300"
            title={`Review Required: ${formatPercentage(reviewPct)}`}
          />
          <div
            style={{ width: `${defectivePct}%` }}
            className="bg-[#B91C1C] transition-all duration-300"
            title={`Defective: ${formatPercentage(defectivePct)}`}
          />
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4 pt-3 border-t border-[#F1F5F9]">
        {/* Normal */}
        <div className="p-3 rounded-md bg-[#EDF7F1]/60 border border-[#C6E7D2]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#1E6B42] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#1E6B42]" />
              Normal
            </span>
            <span className="text-xs font-semibold text-[#1E6B42]">
              {formatPercentage(normalPct)}
            </span>
          </div>
          <p className="text-xl font-bold text-[#1E6B42] mt-1">
            {formatNumber(stats.normalCount)}
          </p>
        </div>

        {/* Review Required */}
        <div className="p-3 rounded-md bg-[#FEF3C7]/60 border border-[#FDE68A]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#B45309] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#B45309]" />
              Review Required
            </span>
            <span className="text-xs font-semibold text-[#B45309]">
              {formatPercentage(reviewPct)}
            </span>
          </div>
          <p className="text-xl font-bold text-[#B45309] mt-1">
            {formatNumber(stats.reviewCount)}
          </p>
        </div>

        {/* Defective */}
        <div className="p-3 rounded-md bg-[#FEE2E2]/60 border border-[#FECACA]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#B91C1C] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#B91C1C]" />
              Defective
            </span>
            <span className="text-xs font-semibold text-[#B91C1C]">
              {formatPercentage(defectivePct)}
            </span>
          </div>
          <p className="text-xl font-bold text-[#B91C1C] mt-1">
            {formatNumber(stats.defectiveCount)}
          </p>
        </div>
      </div>
    </div>
  );
}
