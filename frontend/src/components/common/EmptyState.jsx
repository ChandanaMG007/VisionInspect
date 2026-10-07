import React from 'react';
import { SearchX, RotateCcw } from 'lucide-react';
import Button from './Button';

export default function EmptyState({
  icon: Icon = SearchX,
  title = 'No inspections found',
  message = 'No inspection records match the current filter or search criteria.',
  actionLabel,
  onAction,
  className = '',
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center py-14 px-4 text-center bg-white rounded-lg border border-[#E2E8F0] ${className}`}
    >
      <div className="w-12 h-12 rounded-full bg-[#F1F5F9] flex items-center justify-center text-[#64748B] mb-3">
        <Icon className="w-6 h-6" />
      </div>
      <h4 className="text-sm font-semibold text-[#172A3A]">
        {title}
      </h4>
      <p className="mt-1 max-w-sm text-xs text-[#64748B]">
        {message}
      </p>
      {actionLabel && onAction && (
        <div className="mt-4">
          <Button
            variant="outline"
            size="sm"
            icon={RotateCcw}
            onClick={onAction}
          >
            {actionLabel}
          </Button>
        </div>
      )}
    </div>
  );
}
