import React from 'react';
import { getRecommendationConfig } from '../../utils/formatters';
import { CheckCircle2, AlertTriangle, XCircle, ArrowRight } from 'lucide-react';
import Button from '../common/Button';

export default function RecommendationCard({
  recommendation = 'ACCEPT',
  onInspectNext,
}) {
  const config = getRecommendationConfig(recommendation);

  const getIcon = () => {
    switch (recommendation) {
      case 'ACCEPT':
        return <CheckCircle2 className="w-6 h-6 text-[#1E6B42]" />;
      case 'REVIEW':
        return <AlertTriangle className="w-6 h-6 text-[#B45309]" />;
      case 'REJECT':
        return <XCircle className="w-6 h-6 text-[#B91C1C]" />;
      default:
        return <CheckCircle2 className="w-6 h-6 text-[#64748B]" />;
    }
  };

  return (
    <div
      className={`rounded-lg border p-5 shadow-xs bg-white ${
        recommendation === 'REJECT'
          ? 'border-[#FCA5A5]'
          : recommendation === 'REVIEW'
          ? 'border-[#FDE68A]'
          : 'border-[#C6E7D2]'
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-[#F8FAFC] border border-[#E2E8F0] shrink-0">
            {getIcon()}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#64748B]">
                Quality Recommendation:
              </span>
              <span className={`text-base font-bold tracking-wide ${config.badgeText}`}>
                {config.label}
              </span>
            </div>
            <p className="text-xs text-[#475569] mt-0.5">
              {config.subtext}
            </p>
          </div>
        </div>

        {onInspectNext && (
          <div className="shrink-0">
            <Button
              variant="primary"
              size="sm"
              icon={ArrowRight}
              iconPosition="right"
              onClick={onInspectNext}
              className="text-xs font-semibold"
            >
              New Inspection
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
