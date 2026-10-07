import React from 'react';
import { Loader2 } from 'lucide-react';

export default function LoadingState({
  message = 'Loading inspection data...',
  subtext = 'Connecting to inspection pipeline service',
  className = '',
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center py-16 px-4 text-center bg-white rounded-lg border border-[#E2E8F0] ${className}`}
    >
      <div className="relative mb-4">
        <div className="w-12 h-12 rounded-full border-2 border-[#E2E8F0] border-t-[#176B68] animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2.5 h-2.5 rounded-full bg-[#172A3A]" />
        </div>
      </div>
      <h4 className="text-sm font-semibold text-[#172A3A] tracking-tight">
        {message}
      </h4>
      {subtext && (
        <p className="mt-1 text-xs text-[#64748B] font-mono">
          {subtext}
        </p>
      )}
    </div>
  );
}
