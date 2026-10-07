import React from 'react';
import { Search, RotateCcw } from 'lucide-react';
import Button from '../common/Button';

export default function HistoryFilterBar({
  search,
  onSearchChange,
  resultFilter,
  onResultFilterChange,
  severityFilter,
  onSeverityFilterChange,
  categoryFilter,
  onCategoryFilterChange,
  onResetFilters,
  totalRecords = 0,
  filteredCount = 0,
}) {
  const categories = [
    'All',
    'Metal Nut',
    'Bottle',
    'Transistor (PCB)',
    'Tile',
    'Capsule',
    'Cable',
    'Screw',
    'Wood',
  ];

  const results = ['All', 'Normal', 'Defective', 'Review Required'];
  const severities = ['All', 'None', 'Low', 'Medium', 'High'];

  const hasActiveFilters =
    search.trim() !== '' ||
    resultFilter !== 'All' ||
    severityFilter !== 'All' ||
    categoryFilter !== 'All';

  return (
    <div className="bg-white rounded-lg border border-[#E2E8F0] p-4 shadow-xs space-y-3">
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#94A3B8] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by Product ID, Category, or defect location..."
            className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-white border border-[#CBD5E1] rounded-md focus:outline-none focus:ring-1 focus:ring-[#176B68] focus:border-[#176B68]"
          />
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {/* Category Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-[#64748B] font-semibold text-[11px]">
              Category:
            </span>
            <select
              value={categoryFilter}
              onChange={(e) => onCategoryFilterChange(e.target.value)}
              className="py-1.5 pl-2 pr-6 text-xs bg-white border border-[#CBD5E1] rounded-md focus:outline-none focus:ring-1 focus:ring-[#176B68]"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Result Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-[#64748B] font-semibold text-[11px]">
              Result:
            </span>
            <select
              value={resultFilter}
              onChange={(e) => onResultFilterChange(e.target.value)}
              className="py-1.5 pl-2 pr-6 text-xs bg-white border border-[#CBD5E1] rounded-md focus:outline-none focus:ring-1 focus:ring-[#176B68]"
            >
              {results.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>

          {/* Severity Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-[#64748B] font-semibold text-[11px]">
              Severity:
            </span>
            <select
              value={severityFilter}
              onChange={(e) => onSeverityFilterChange(e.target.value)}
              className="py-1.5 pl-2 pr-6 text-xs bg-white border border-[#CBD5E1] rounded-md focus:outline-none focus:ring-1 focus:ring-[#176B68]"
            >
              {severities.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* Reset Filters */}
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              icon={RotateCcw}
              onClick={onResetFilters}
              className="text-xs text-[#B91C1C] hover:bg-red-50"
            >
              Reset
            </Button>
          )}
        </div>
      </div>

      {/* Record Counter */}
      <div className="flex items-center justify-between pt-2 border-t border-[#F1F5F9] text-[11px] text-[#64748B]">
        <span>
          Showing <strong className="text-[#172A3A]">{filteredCount}</strong> of{' '}
          <strong className="text-[#172A3A]">{totalRecords}</strong> records
        </span>
      </div>
    </div>
  );
}
