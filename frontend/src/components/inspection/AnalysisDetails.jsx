import React from 'react';
import StatusBadge from '../common/StatusBadge';
import { formatErrorMetric } from '../../utils/formatters';

export default function AnalysisDetails({ record }) {
  if (!record) return null;

  return (
    <div className="bg-white rounded-lg border border-[#E2E8F0] p-5 shadow-xs space-y-4">
      <div className="pb-3 border-b border-[#F1F5F9]">
        <h3 className="text-sm font-bold text-[#172A3A] uppercase tracking-wider">
          Analysis Details
        </h3>
        <p className="text-xs text-[#64748B]">
          Quantitative inspection measurements and defect parameters
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* 1. Reconstruction Error */}
        <div className="p-3.5 rounded-md bg-[#F8FAFC] border border-[#E2E8F0] space-y-1">
          <span className="text-[11px] font-semibold text-[#64748B] uppercase tracking-wider block">
            Reconstruction Error
          </span>
          <p className="text-lg font-bold text-[#172A3A]">
            {formatErrorMetric(record.reconstructionError, 4)}
          </p>
        </div>

        {/* 2. Anomaly Score */}
        <div className="p-3.5 rounded-md bg-[#F8FAFC] border border-[#E2E8F0] space-y-1">
          <span className="text-[11px] font-semibold text-[#64748B] uppercase tracking-wider block">
            Anomaly Score
          </span>
          <p className="text-lg font-bold text-[#172A3A]">
            {record.anomalyScore ? record.anomalyScore.toFixed(3) : '0.000'}
          </p>
        </div>

        {/* 3. Defect Location */}
        <div className="p-3.5 rounded-md bg-[#F8FAFC] border border-[#E2E8F0] space-y-1 sm:col-span-2 lg:col-span-1">
          <span className="text-[11px] font-semibold text-[#64748B] uppercase tracking-wider block">
            Defect Location
          </span>
          <p className="text-xs font-semibold text-[#172A3A] truncate">
            {record.defectLocation || 'Nominal / None'}
          </p>
        </div>

        {/* 4. Severity */}
        <div className="p-3.5 rounded-md bg-[#F8FAFC] border border-[#E2E8F0] space-y-1">
          <span className="text-[11px] font-semibold text-[#64748B] uppercase tracking-wider block">
            Severity
          </span>
          <div>
            <StatusBadge value={record.severity} type="severity" size="sm" showDot={false} />
          </div>
        </div>

        {/* 5. Inspection Result */}
        <div className="p-3.5 rounded-md bg-[#F8FAFC] border border-[#E2E8F0] space-y-1">
          <span className="text-[11px] font-semibold text-[#64748B] uppercase tracking-wider block">
            Inspection Result
          </span>
          <div>
            <StatusBadge value={record.result} type="result" size="sm" />
          </div>
        </div>
      </div>
    </div>
  );
}
