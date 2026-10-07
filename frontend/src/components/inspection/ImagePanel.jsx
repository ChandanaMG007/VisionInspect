import React from 'react';

export default function ImagePanel({
  images,
  productId,
  category,
  defectLocation,
  reconstructionError,
}) {
  if (!images) return null;

  return (
    <div className="bg-white rounded-lg border border-[#E2E8F0] shadow-xs overflow-hidden">
      {/* Panel Header */}
      <div className="px-5 py-3.5 border-b border-[#E2E8F0] bg-[#F8FAFC]">
        <h3 className="text-sm font-bold text-[#172A3A] uppercase tracking-wider">
          Visual Comparison: Original Image vs Reconstructed Image vs Anomaly Heatmap
        </h3>
        <p className="text-xs text-[#64748B] mt-0.5">
          Side-by-side inspection to localize potential defects
        </p>
      </div>

      {/* Main Visual Display Area - High Space Priority (3-Up Large Cards) */}
      <div className="p-5 sm:p-6 bg-[#161D24]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* 1. ORIGINAL IMAGE */}
          <div className="flex flex-col rounded-lg border border-[#2D3748] bg-[#1C2530] overflow-hidden">
            <div className="px-3.5 py-2.5 bg-[#25303D] border-b border-[#2D3748] flex items-center justify-between">
              <span className="text-xs font-bold text-[#E2E8F0] uppercase tracking-wider">
                Original Image
              </span>
              <span className="text-[11px] text-[#94A3B8]">Input Specimen</span>
            </div>

            <div className="relative aspect-square w-full p-2 flex items-center justify-center bg-black/60">
              <img
                src={images.original}
                alt="Original product image"
                className="max-h-full max-w-full object-contain rounded"
              />
            </div>

            <div className="p-3 bg-[#1C2530] border-t border-[#2D3748] text-xs text-[#94A3B8]">
              <p className="truncate text-[#CBD5E1] font-medium">
                {productId} ({category})
              </p>
            </div>
          </div>

          {/* 2. RECONSTRUCTED IMAGE */}
          <div className="flex flex-col rounded-lg border border-[#2D3748] bg-[#1C2530] overflow-hidden">
            <div className="px-3.5 py-2.5 bg-[#25303D] border-b border-[#2D3748] flex items-center justify-between">
              <span className="text-xs font-bold text-[#A7F3D0] uppercase tracking-wider">
                Reconstructed Image
              </span>
              <span className="text-[11px] text-[#10B981]">CAE Output</span>
            </div>

            <div className="relative aspect-square w-full p-2 flex items-center justify-center bg-black/60">
              <img
                src={images.reconstructed}
                alt="Reconstructed product image"
                className="max-h-full max-w-full object-contain rounded"
              />
            </div>

            <div className="p-3 bg-[#1C2530] border-t border-[#2D3748] text-xs text-[#94A3B8]">
              <p className="text-[#CBD5E1]">Learned Normal Pattern</p>
            </div>
          </div>

          {/* 3. ANOMALY HEATMAP */}
          <div className="flex flex-col rounded-lg border border-[#2D3748] bg-[#1C2530] overflow-hidden">
            <div className="px-3.5 py-2.5 bg-[#25303D] border-b border-[#2D3748] flex items-center justify-between">
              <span className="text-xs font-bold text-[#FCA5A5] uppercase tracking-wider">
                Anomaly Heatmap
              </span>
              <span className="text-[11px] text-[#EF4444]">Error Residual</span>
            </div>

            <div className="relative aspect-square w-full p-2 flex items-center justify-center bg-black/60">
              <img
                src={images.heatmap}
                alt="Anomaly residual heatmap"
                className="max-h-full max-w-full object-contain rounded"
              />
            </div>

            <div className="p-3 bg-[#1C2530] border-t border-[#2D3748] text-xs text-[#94A3B8]">
              <p className="truncate text-[#CBD5E1]">
                Location: {defectLocation || 'Nominal'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Heatmap Legend */}
      <div className="px-5 py-2.5 bg-[#1C2530] border-t border-[#2D3748] flex items-center justify-between text-xs text-[#CBD5E1]">
        <div className="flex items-center gap-3">
          <span className="text-[11px] text-[#94A3B8]">Heatmap Intensity:</span>
          <div className="flex items-center gap-2">
            <div className="w-28 h-2.5 rounded-full bg-gradient-to-r from-[#000080] via-[#00FFCC] via-[#FFFF00] to-[#FF0000]" />
            <div className="flex justify-between w-28 text-[10px] text-[#94A3B8]">
              <span>Low</span>
              <span>High Error</span>
            </div>
          </div>
        </div>
        <span className="text-[11px] text-[#94A3B8]">
          Reconstruction Error: <strong className="text-white">{reconstructionError.toFixed(4)}</strong>
        </span>
      </div>
    </div>
  );
}
