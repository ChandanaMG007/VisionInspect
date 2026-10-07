import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import Button from './Button';

export default function ErrorState({
  title = 'Unable to load inspection data',
  message = 'A network or processing issue occurred while communicating with the inspection service. Please try again.',
  onRetry,
  className = '',
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center py-14 px-6 text-center bg-white rounded-lg border border-[#FCA5A5] bg-red-50/20 ${className}`}
    >
      <div className="w-12 h-12 rounded-full bg-[#FEE2E2] flex items-center justify-center text-[#B91C1C] mb-3">
        <AlertTriangle className="w-6 h-6" />
      </div>
      <h4 className="text-base font-semibold text-[#172A3A]">
        {title}
      </h4>
      <p className="mt-1 max-w-md text-xs sm:text-sm text-[#64748B]">
        {message}
      </p>
      {onRetry && (
        <div className="mt-5">
          <Button
            variant="outline"
            size="sm"
            icon={RefreshCw}
            onClick={onRetry}
          >
            Retry Request
          </Button>
        </div>
      )}
    </div>
  );
}
