import React from 'react';
import { QUALITY_TRENDS } from '../../data/mockData';

export default function TrendChart({ data = QUALITY_TRENDS, className = '' }) {
  const maxTotal = Math.max(...data.map((d) => d.total), 180);
  const chartHeight = 150;
  const chartWidth = 520;
  const paddingX = 40;
  const paddingY = 20;

  const innerWidth = chartWidth - paddingX * 2;
  const innerHeight = chartHeight - paddingY * 2;
  const stepX = innerWidth / (data.length - 1);

  // Calculate points for throughput lines
  const totalPoints = data.map((d, i) => {
    const x = paddingX + i * stepX;
    const y = paddingY + innerHeight - (d.total / maxTotal) * innerHeight;
    return { x, y, ...d };
  });

  const normalPoints = data.map((d, i) => {
    const x = paddingX + i * stepX;
    const y = paddingY + innerHeight - (d.normal / maxTotal) * innerHeight;
    return { x, y, ...d };
  });

  const defectivePoints = data.map((d, i) => {
    const x = paddingX + i * stepX;
    const y = paddingY + innerHeight - (d.defective / maxTotal) * innerHeight;
    return { x, y, ...d };
  });

  const pointsToPath = (pts) =>
    pts.reduce((acc, curr, idx) => (idx === 0 ? `M ${curr.x} ${curr.y}` : `${acc} L ${curr.x} ${curr.y}`), '');

  return (
    <div className={`bg-white rounded-lg border border-[#E2E8F0] p-5 shadow-xs ${className}`}>
      <div className="pb-3 border-b border-[#F1F5F9]">
        <h3 className="text-sm font-bold text-[#172A3A] uppercase tracking-wider">
          Inspection Trends Over Time
        </h3>
        <p className="text-xs text-[#64748B]">
          Daily volume of inspected, normal, and defective products
        </p>
      </div>

      {/* SVG Inspection Trend Chart */}
      <div className="mt-4 w-full overflow-x-auto">
        <svg
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          className="w-full h-40 select-none"
        >
          {/* Grid lines */}
          <line
            x1={paddingX}
            y1={paddingY}
            x2={chartWidth - paddingX}
            y2={paddingY}
            stroke="#F1F5F9"
            strokeWidth="1"
          />
          <line
            x1={paddingX}
            y1={paddingY + innerHeight / 2}
            x2={chartWidth - paddingX}
            y2={paddingY + innerHeight / 2}
            stroke="#F1F5F9"
            strokeWidth="1"
          />
          <line
            x1={paddingX}
            y1={paddingY + innerHeight}
            x2={chartWidth - paddingX}
            y2={paddingY + innerHeight}
            stroke="#E2E8F0"
            strokeWidth="1"
          />

          {/* Total Line */}
          <path
            d={pointsToPath(totalPoints)}
            fill="none"
            stroke="#172A3A"
            strokeWidth="2"
          />

          {/* Normal Units Line */}
          <path
            d={pointsToPath(normalPoints)}
            fill="none"
            stroke="#1E6B42"
            strokeWidth="2"
          />

          {/* Defective Units Line */}
          <path
            d={pointsToPath(defectivePoints)}
            fill="none"
            stroke="#B91C1C"
            strokeWidth="2"
          />

          {/* Data points for Total */}
          {totalPoints.map((pt, i) => (
            <g key={i}>
              <circle cx={pt.x} cy={pt.y} r="3" fill="#172A3A" stroke="#FFFFFF" strokeWidth="1" />
              <text
                x={pt.x}
                y={pt.y - 6}
                fill="#172A3A"
                fontSize="9"
                fontWeight="600"
                textAnchor="middle"
              >
                {pt.total}
              </text>
            </g>
          ))}

          {/* X Axis Date Labels */}
          {data.map((d, i) => (
            <text
              key={i}
              x={paddingX + i * stepX}
              y={chartHeight - 4}
              fill="#64748B"
              fontSize="10"
              textAnchor="middle"
            >
              {d.date}
            </text>
          ))}
        </svg>
      </div>

      {/* Legend */}
      <div className="mt-3 pt-2.5 border-t border-[#F1F5F9] flex items-center gap-4 text-xs text-[#64748B]">
        <span className="flex items-center gap-1.5 font-medium text-[#172A3A]">
          <span className="w-3 h-1 bg-[#172A3A] rounded-xs inline-block" /> Total Inspections
        </span>
        <span className="flex items-center gap-1.5 font-medium text-[#1E6B42]">
          <span className="w-3 h-1 bg-[#1E6B42] rounded-xs inline-block" /> Normal
        </span>
        <span className="flex items-center gap-1.5 font-medium text-[#B91C1C]">
          <span className="w-3 h-1 bg-[#B91C1C] rounded-xs inline-block" /> Defective
        </span>
      </div>
    </div>
  );
}
