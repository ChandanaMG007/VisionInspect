import React from 'react';
import { Eye } from 'lucide-react';
import StatusBadge from './StatusBadge';
import { formatErrorMetric, formatTimestamp } from '../../utils/formatters';

export default function DataTable({
  records = [],
  onSelectInspection,
  showCategory = true,
  maxRows,
  className = '',
}) {
  const displayRecords = maxRows ? records.slice(0, maxRows) : records;

  return (
    <div className={`w-full overflow-hidden rounded-lg border border-[#E2E8F0] bg-white ${className}`}>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs sm:text-sm">
          <thead>
            <tr className="border-b border-[#E2E8F0] bg-[#F8FAFC] text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
              <th className="py-3 px-4 font-semibold">Product ID</th>
              {showCategory && <th className="py-3 px-4 font-semibold">Category</th>}
              <th className="py-3 px-4 font-semibold">Date</th>
              <th className="py-3 px-4 font-semibold">Result</th>
              <th className="py-3 px-4 font-semibold">Severity</th>
              <th className="py-3 px-4 font-semibold text-right">Reconstruction Error</th>
              <th className="py-3 px-4 font-semibold text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F1F5F9] text-[#172A3A]">
            {displayRecords.map((item) => {
              const isDefective = item.result === 'Defective';
              const isReview = item.result === 'Review Required';

              return (
                <tr
                  key={item.id}
                  onClick={() => onSelectInspection && onSelectInspection(item.id)}
                  className="hover:bg-[#F8FAFC] transition-colors cursor-pointer group"
                >
                  {/* Product ID */}
                  <td className="py-3 px-4 font-semibold text-[#172A3A] group-hover:text-[#176B68] whitespace-nowrap">
                    {item.productId}
                  </td>

                  {/* Category */}
                  {showCategory && (
                    <td className="py-3 px-4 text-[#475569] whitespace-nowrap">
                      {item.category}
                    </td>
                  )}

                  {/* Date */}
                  <td className="py-3 px-4 text-[#64748B] text-xs whitespace-nowrap">
                    {formatTimestamp(item.timestamp)}
                  </td>

                  {/* Result */}
                  <td className="py-3 px-4 whitespace-nowrap">
                    <StatusBadge value={item.result} type="result" size="sm" />
                  </td>

                  {/* Severity */}
                  <td className="py-3 px-4 whitespace-nowrap">
                    <StatusBadge value={item.severity} type="severity" size="sm" showDot={false} />
                  </td>

                  {/* Reconstruction Error */}
                  <td className="py-3 px-4 text-right whitespace-nowrap">
                    <span
                      className={`text-xs font-semibold ${
                        isDefective
                          ? 'text-[#B91C1C]'
                          : isReview
                          ? 'text-[#B45309]'
                          : 'text-[#1E6B42]'
                      }`}
                    >
                      {formatErrorMetric(item.reconstructionError, 4)}
                    </span>
                  </td>

                  {/* Action */}
                  <td className="py-3 px-4 text-center whitespace-nowrap">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onSelectInspection) onSelectInspection(item.id);
                      }}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-medium text-[#176B68] hover:text-[#0F4D4B] hover:bg-[#EBF7EE] transition-colors"
                      title="View inspection details"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Details</span>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
