/**
 * Industrial UI formatting helpers for VisionInspect
 */

export function formatNumber(num) {
  if (num === null || num === undefined) return '--';
  return new Intl.NumberFormat('en-US').format(num);
}

export function formatPercentage(val, decimals = 1) {
  if (val === null || val === undefined) return '--%';
  return `${Number(val).toFixed(decimals)}%`;
}

export function formatErrorMetric(val, precision = 4) {
  if (val === null || val === undefined) return '0.0000';
  return Number(val).toFixed(precision);
}

export function formatTimestamp(dateStr) {
  if (!dateStr) return '--';
  try {
    const d = new Date(dateStr);
    return d.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
  } catch {
    return dateStr;
  }
}

/**
 * Returns color classes and badge styling for inspection results
 */
export function getResultBadgeConfig(result) {
  switch (result) {
    case 'Normal':
      return {
        label: 'Normal',
        textColor: 'text-[#1E6B42]',
        bgColor: 'bg-[#EDF7F1]',
        borderColor: 'border-[#C6E7D2]',
        dotColor: 'bg-[#1E6B42]',
      };
    case 'Review Required':
      return {
        label: 'Review Required',
        textColor: 'text-[#B45309]',
        bgColor: 'bg-[#FEF3C7]',
        borderColor: 'border-[#FDE68A]',
        dotColor: 'bg-[#B45309]',
      };
    case 'Defective':
      return {
        label: 'Defective',
        textColor: 'text-[#B91C1C]',
        bgColor: 'bg-[#FEE2E2]',
        borderColor: 'border-[#FECACA]',
        dotColor: 'bg-[#B91C1C]',
      };
    default:
      return {
        label: result || 'Unknown',
        textColor: 'text-[#475569]',
        bgColor: 'bg-[#F1F5F9]',
        borderColor: 'border-[#CBD5E1]',
        dotColor: 'bg-[#64748B]',
      };
  }
}

/**
 * Returns badge styling for severity levels
 */
export function getSeverityBadgeConfig(severity) {
  switch (severity) {
    case 'None':
      return {
        label: 'None',
        textColor: 'text-[#1E6B42]',
        bgColor: 'bg-[#EDF7F1]',
        borderColor: 'border-[#C6E7D2]',
      };
    case 'Low':
      return {
        label: 'Low',
        textColor: 'text-[#2B6CB0]',
        bgColor: 'bg-[#EBF8FF]',
        borderColor: 'border-[#BEE3F8]',
      };
    case 'Medium':
      return {
        label: 'Medium',
        textColor: 'text-[#B45309]',
        bgColor: 'bg-[#FEF3C7]',
        borderColor: 'border-[#FDE68A]',
      };
    case 'High':
      return {
        label: 'High',
        textColor: 'text-[#B91C1C]',
        bgColor: 'bg-[#FEE2E2]',
        borderColor: 'border-[#FECACA]',
      };
    default:
      return {
        label: severity || 'N/A',
        textColor: 'text-[#475569]',
        bgColor: 'bg-[#F1F5F9]',
        borderColor: 'border-[#CBD5E1]',
      };
  }
}

/**
 * Returns recommendation styling
 */
export function getRecommendationConfig(recommendation) {
  switch (recommendation) {
    case 'ACCEPT':
      return {
        label: 'ACCEPT',
        subtext: 'Product meets quality standards. Accept for production.',
        color: '#1E6B42',
        badgeBg: 'bg-[#EDF7F1]',
        badgeText: 'text-[#1E6B42]',
        badgeBorder: 'border-[#C6E7D2]',
      };
    case 'REVIEW':
      return {
        label: 'REVIEW',
        subtext: 'Reconstruction difference requires manual inspection.',
        color: '#B45309',
        badgeBg: 'bg-[#FEF3C7]',
        badgeText: 'text-[#B45309]',
        badgeBorder: 'border-[#FDE68A]',
      };
    case 'REJECT':
      return {
        label: 'REJECT',
        subtext: 'High reconstruction error indicates defect. Reject product.',
        color: '#B91C1C',
        badgeBg: 'bg-[#FEE2E2]',
        badgeText: 'text-[#B91C1C]',
        badgeBorder: 'border-[#FECACA]',
      };
    default:
      return {
        label: recommendation || 'PENDING',
        subtext: 'Inspection pending evaluation.',
        color: '#475569',
        badgeBg: 'bg-[#F1F5F9]',
        badgeText: 'text-[#475569]',
        badgeBorder: 'border-[#CBD5E1]',
      };
  }
}
