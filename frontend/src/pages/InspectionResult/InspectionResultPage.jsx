import React from 'react';
import { ArrowLeft, PlusCircle } from 'lucide-react';
import Button from '../../components/common/Button';
import LoadingState from '../../components/common/LoadingState';
import ErrorState from '../../components/common/ErrorState';
import EmptyState from '../../components/common/EmptyState';
import ImagePanel from '../../components/inspection/ImagePanel';
import InspectionSummary from '../../components/inspection/InspectionSummary';
import AnalysisDetails from '../../components/inspection/AnalysisDetails';
import RecommendationCard from '../../components/inspection/RecommendationCard';
import ExplainabilityCard from '../../components/inspection/ExplainabilityCard';

export default function InspectionResultPage({
  inspection,
  loading = false,
  error = null,
  onBack,
  onNavigate,
}) {
  if (loading) {
    return <LoadingState message="Loading inspection result..." />;
  }

  if (error) {
    return (
      <ErrorState
        title="Failed to load inspection result"
        message={error}
        onRetry={onBack}
      />
    );
  }

  if (!inspection) {
    return (
      <EmptyState
        title="No inspection selected"
        message="Select an inspection record to view the analysis."
        actionLabel="Go to Dashboard"
        onAction={() => onNavigate('dashboard')}
      />
    );
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Navigation bar */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          size="sm"
          icon={ArrowLeft}
          onClick={onBack}
          className="text-xs"
        >
          Back
        </Button>

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

      {/* 1. Inspection Summary */}
      <InspectionSummary record={inspection} />

      {/* 2. Visual Comparison: Original | Reconstructed | Heatmap (Highest Space Priority) */}
      <ImagePanel
        images={inspection.images}
        productId={inspection.productId}
        category={inspection.category}
        defectLocation={inspection.defectLocation}
        reconstructionError={inspection.reconstructionError}
      />

      {/* 3. Analysis Details */}
      <AnalysisDetails record={inspection} />

      {/* 4. Quality Recommendation */}
      <RecommendationCard
        recommendation={inspection.recommendation}
        onInspectNext={() => onNavigate('new-inspection')}
      />

      {/* 5. Explainability */}
      <ExplainabilityCard />
    </div>
  );
}
