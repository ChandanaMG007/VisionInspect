import React from 'react';
import {
  ShieldCheck,
  CheckCircle,
  AlertOctagon,
  AlertTriangle,
} from 'lucide-react';
import StatCard from '../../components/common/StatCard';
import LoadingState from '../../components/common/LoadingState';
import ErrorState from '../../components/common/ErrorState';
import QualityOverview from '../../components/dashboard/QualityOverview';
import SeverityDistribution from '../../components/dashboard/SeverityDistribution';
import TrendChart from '../../components/dashboard/TrendChart';
import { formatNumber, formatPercentage } from '../../utils/formatters';

export default function ReportsAnalyticsPage({
  stats,
  loading = false,
  error = null,
  onRefresh,
}) {
  if (loading) {
    return <LoadingState message="Loading inspection analytics..." />;
  }

  if (error) {
    return (
      <ErrorState
        title="Failed to load analytics"
        message={error}
        onRetry={onRefresh}
      />
    );
  }

  if (!stats) return null;

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-[#172A3A] tracking-tight">
          Reports & Analytics
        </h2>
        <p className="text-xs sm:text-sm text-[#64748B]">
          Quality control monitoring and inspection patterns
        </p>
      </div>

      {/* Summary: Total Inspections, Normal, Defective, Review Required */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Inspections"
          value={formatNumber(stats.totalInspections)}
          subtext="Total inspected products"
          icon={ShieldCheck}
          highlightColor="navy"
        />

        <StatCard
          title="Normal"
          value={formatNumber(stats.normalCount)}
          subtext={`${formatPercentage((stats.normalCount / stats.totalInspections) * 100)} of total`}
          icon={CheckCircle}
          highlightColor="green"
        />

        <StatCard
          title="Defective"
          value={formatNumber(stats.defectiveCount)}
          subtext={`${formatPercentage((stats.defectiveCount / stats.totalInspections) * 100)} of total`}
          icon={AlertOctagon}
          highlightColor="red"
        />

        <StatCard
          title="Review Required"
          value={formatNumber(stats.reviewCount)}
          subtext={`${formatPercentage((stats.reviewCount / stats.totalInspections) * 100)} of total`}
          icon={AlertTriangle}
          highlightColor="amber"
        />
      </div>

      {/* Visualizations: Inspection result distribution & Severity distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <QualityOverview stats={stats} />
        <SeverityDistribution />
      </div>

      {/* Inspection trends over time */}
      <div>
        <TrendChart />
      </div>
    </div>
  );
}
