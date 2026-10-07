import React, { useState, useMemo } from 'react';
import { PlusCircle } from 'lucide-react';
import Button from '../../components/common/Button';
import DataTable from '../../components/common/DataTable';
import EmptyState from '../../components/common/EmptyState';
import LoadingState from '../../components/common/LoadingState';
import ErrorState from '../../components/common/ErrorState';
import HistoryFilterBar from '../../components/history/HistoryFilterBar';

export default function InspectionHistoryPage({
  records = [],
  loading = false,
  error = null,
  onSelectInspection,
  onNavigate,
  onRefresh,
}) {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [resultFilter, setResultFilter] = useState('All');
  const [severityFilter, setSeverityFilter] = useState('All');

  const filteredRecords = useMemo(() => {
    return records.filter((item) => {
      // Search term
      if (search.trim() !== '') {
        const term = search.toLowerCase().trim();
        const matchesTerm =
          item.id.toLowerCase().includes(term) ||
          item.productId.toLowerCase().includes(term) ||
          item.category.toLowerCase().includes(term) ||
          (item.defectLocation && item.defectLocation.toLowerCase().includes(term));
        if (!matchesTerm) return false;
      }

      // Category
      if (categoryFilter !== 'All' && item.category !== categoryFilter) {
        return false;
      }

      // Result
      if (resultFilter !== 'All' && item.result !== resultFilter) {
        return false;
      }

      // Severity
      if (severityFilter !== 'All' && item.severity !== severityFilter) {
        return false;
      }

      return true;
    });
  }, [records, search, categoryFilter, resultFilter, severityFilter]);

  const handleResetFilters = () => {
    setSearch('');
    setCategoryFilter('All');
    setResultFilter('All');
    setSeverityFilter('All');
  };

  if (loading) {
    return <LoadingState message="Loading inspection log..." />;
  }

  if (error) {
    return (
      <ErrorState
        title="Failed to load inspection history"
        message={error}
        onRetry={onRefresh}
      />
    );
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-[#172A3A] tracking-tight">
            Inspection History
          </h2>
          <p className="text-xs sm:text-sm text-[#64748B]">
            Searchable log of previous product inspections
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="secondary"
            size="sm"
            icon={PlusCircle}
            onClick={() => onNavigate('new-inspection')}
            className="text-xs font-semibold"
          >
            New Inspection
          </Button>
        </div>
      </div>

      {/* Filter Bar */}
      <HistoryFilterBar
        search={search}
        onSearchChange={setSearch}
        categoryFilter={categoryFilter}
        onCategoryFilterChange={setCategoryFilter}
        resultFilter={resultFilter}
        onResultFilterChange={setResultFilter}
        severityFilter={severityFilter}
        onSeverityFilterChange={setSeverityFilter}
        onResetFilters={handleResetFilters}
        totalRecords={records.length}
        filteredCount={filteredRecords.length}
      />

      {/* Table or Empty State */}
      {filteredRecords.length > 0 ? (
        <DataTable
          records={filteredRecords}
          showCategory={true}
          onSelectInspection={onSelectInspection}
        />
      ) : (
        <EmptyState
          title="No inspections found"
          message="No inspection records match the current filter or search criteria."
          actionLabel="Reset Filters"
          onAction={handleResetFilters}
        />
      )}
    </div>
  );
}
