import React from 'react';
import StatusBadge from '../common/StatusBadge';
import { formatTimestamp, formatErrorMetric } from '../../utils/formatters';
import { Calendar } from 'lucide-react';

export default function InspectionSummary({ record }) {
  if (!record) return null;

  return (
    <div className="bg-white rounded-lg border border-[#E2E8F0] p-5 shadow-xs">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Left: Product & Inspection Date */}
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-[#176B68] bg-[#EBF7EE] px-2 py-0.5 rounded border border-[#C6E7D2]">
              {record.id}
            </span>
            <span className="text-xs text-[#64748B] flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {formatTimestamp(record.timestamp)}
            </span>
          </div>

          <div className="flex items-baseline gap-3">
            <h2 className="text-2xl font-bold text-[#172A3A]">
              {record.productId}
            </h2>
            <span className="text-xs font-medium text-[#64748B] px-2.5 py-0.5 bg-[#F1F5F9] rounded-md border border-[#E2E8F0]">
              {record.category}
            </span>
          </div>
        </div>

        {/* Right: Overall Result, Severity, Anomaly Score / Error */}
        <div className="flex flex-wrap items-center gap-4">
          {/* Result */}
          <div className="flex flex-col items-end">
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#64748B] mb-1">
              Result
            </span>
            <StatusBadge value={record.result} type="result" size="lg" />
          </div>

          {/* Severity */}
          <div className="flex flex-col items-end border-l border-[#E2E8F0] pl-4">
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#64748B] mb-1">
              Severity
            </span>
            <StatusBadge value={record.severity} type="severity" size="lg" showDot={false} />
          </div>

          {/* Reconstruction Error */}
          <div className="flex flex-col items-end border-l border-[#E2E8F0] pl-4">
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#64748B] mb-1">
              Reconstruction Error
            </span>
            <span
              className={`text-base font-bold ${
                record.result === 'Defective'
                  ? 'text-[#B91C1C]'
                  : record.result === 'Review Required'
                  ? 'text-[#B45309]'
                  : 'text-[#1E6B42]'
              }`}
            >
              {formatErrorMetric(record.reconstructionError, 4)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
