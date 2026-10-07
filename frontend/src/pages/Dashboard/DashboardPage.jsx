import React from 'react';
import {
  ShieldCheck,
  CheckCircle,
  AlertOctagon,
  AlertTriangle,
  ArrowRight,
} from 'lucide-react';
import StatCard from '../../components/common/StatCard';
import SectionHeader from '../../components/common/SectionHeader';
import DataTable from '../../components/common/DataTable';
import Button from '../../components/common/Button';
import LoadingState from '../../components/common/LoadingState';
import ErrorState from '../../components/common/ErrorState';
import EmptyState from '../../components/common/EmptyState';
import QualityOverview from '../../components/dashboard/QualityOverview';
import SeverityDistribution from '../../components/dashboard/SeverityDistribution';
import TrendChart from '../../components/dashboard/TrendChart';
import { formatNumber, formatPercentage } from '../../utils/formatters';

export default function DashboardPage({
  stats,
  recentRecords,
  loading = false,
  error = null,
  onNavigate,
  onSelectInspection,
  onRefresh,
}) {
  if (loading) {
    return <LoadingState message="Loading inspection telemetry and quality metrics..." />;
  }

  if (error) {
    return (
      <ErrorState
        title="Failed to load dashboard metrics"
        message={error}
        onRetry={onRefresh}
      />
    );
  }

  if (!stats) {
    return <EmptyState title="No dashboard data available" onAction={onRefresh} actionLabel="Reload" />;
  }

  const total = stats.totalInspections || 1;

  return (
    <div className="space-y-6">
      

      {/* 4 Summary Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Inspections */}
        <StatCard
          title="Total Inspections"
          value={formatNumber(stats.totalInspections)}
          subtext="Total processed products"
          icon={ShieldCheck}
          highlightColor="navy"
        />

        {/* Normal */}
        <StatCard
          title="Normal"
          value={formatNumber(stats.normalCount)}
          subtext={`${formatPercentage((stats.normalCount / total) * 100)} of total`}
          icon={CheckCircle}
          highlightColor="green"
        />

        {/* Defective */}
        <StatCard
          title="Defective"
          value={formatNumber(stats.defectiveCount)}
          subtext={`${formatPercentage((stats.defectiveCount / total) * 100)} of total`}
          icon={AlertOctagon}
          highlightColor="red"
        />

        {/* Review Required */}
        <StatCard
          title="Review Required"
          value={formatNumber(stats.reviewCount)}
          subtext={`${formatPercentage((stats.reviewCount / total) * 100)} of total`}
          icon={AlertTriangle}
          highlightColor="amber"
        />
      </div>

      {/* Visual Quality Statistics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <QualityOverview stats={stats} />
        <SeverityDistribution />
      </div>

      {/* 7-Day Trend Chart */}
      <div>
        <TrendChart />
      </div>

      {/* Recent Inspections Table Section */}
      <div className="space-y-3">
        <SectionHeader
          title="Recent Inspections"
          subtitle="Latest verified product inspections"
          action={
            <Button
              variant="outline"
              size="sm"
              icon={ArrowRight}
              iconPosition="right"
              onClick={() => onNavigate('history')}
            >
              View Full History
            </Button>
          }
        />

        {recentRecords && recentRecords.length > 0 ? (
          <DataTable
            records={recentRecords}
            maxRows={6}
            onSelectInspection={onSelectInspection}
          />
        ) : (
          <EmptyState
            title="No recent inspections recorded"
            message="Run a new inspection to populate telemetry."
            actionLabel="Start Inspection"
            onAction={() => onNavigate('new-inspection')}
          />
        )}
      </div>
    </div>
  );
}
