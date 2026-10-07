import React from 'react';
import { ArrowDown, Cpu, Database, Layers } from 'lucide-react';
import { SYSTEM_INFO_DATA } from '../../data/mockData';

export default function SystemInformationPage() {
  const { about, workflow, aiApproach, dataset, techStack } = SYSTEM_INFO_DATA;

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* 1. About VisionInspect */}
      <div className="bg-white rounded-lg border border-[#E2E8F0] p-6 shadow-xs space-y-3">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#176B68]" />
          <span className="text-xs font-bold text-[#176B68] uppercase tracking-wider">
            Project Overview
          </span>
        </div>

        <h2 className="text-xl font-bold text-[#172A3A] tracking-tight">
          {about.title}
        </h2>
        <h3 className="text-sm font-semibold text-[#176B68]">
          {about.subtitle}
        </h3>

        <p className="text-xs sm:text-sm text-[#475569] leading-relaxed pt-1">
          {about.description}
        </p>
      </div>

      {/* 2. Inspection Workflow */}
      <div className="bg-white rounded-lg border border-[#E2E8F0] p-6 shadow-xs space-y-4">
        <div className="pb-3 border-b border-[#F1F5F9]">
          <h3 className="text-sm font-bold text-[#172A3A] uppercase tracking-wider">
            Inspection Workflow
          </h3>
          <p className="text-xs text-[#64748B]">
            Conceptual pipeline from image acquisition to quality recommendation
          </p>
        </div>

        <div className="space-y-2 pt-1 max-w-2xl mx-auto">
          {workflow.map((item, index) => (
            <div key={item.step}>
              <div className="flex items-center justify-between p-3.5 rounded-md bg-[#F8FAFC] border border-[#E2E8F0]">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#172A3A] text-white flex items-center justify-center text-xs font-bold shrink-0">
                    {item.step}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#172A3A]">
                      {item.name}
                    </h4>
                    <p className="text-[11px] text-[#64748B]">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>

              {index < workflow.length - 1 && (
                <div className="flex justify-center my-1">
                  <ArrowDown className="w-4 h-4 text-[#94A3B8]" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 3. AI Approach & Dataset */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* AI Approach */}
        <div className="bg-white rounded-lg border border-[#E2E8F0] p-6 shadow-xs space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-[#F1F5F9]">
            <Cpu className="w-4 h-4 text-[#176B68]" />
            <h3 className="text-sm font-bold text-[#172A3A] uppercase tracking-wider">
              AI Approach
            </h3>
          </div>

          <p className="text-xs text-[#475569] leading-relaxed">
            {aiApproach.description}
          </p>
          <div className="p-3 bg-[#F8FAFC] rounded border border-[#E2E8F0] text-xs text-[#172A3A] space-y-1">
            <p><strong>Architecture:</strong> {aiApproach.modelType}</p>
            <p><strong>Training Paradigm:</strong> {aiApproach.paradigm}</p>
          </div>
        </div>

        {/* Dataset */}
        <div className="bg-white rounded-lg border border-[#E2E8F0] p-6 shadow-xs space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-[#F1F5F9]">
            <Database className="w-4 h-4 text-[#176B68]" />
            <h3 className="text-sm font-bold text-[#172A3A] uppercase tracking-wider">
              Dataset
            </h3>
          </div>

          <p className="text-xs text-[#475569] leading-relaxed">
            {dataset.description}
          </p>
          <div className="p-3 bg-[#F8FAFC] rounded border border-[#E2E8F0] text-xs text-[#172A3A]">
            <p><strong>Benchmark:</strong> {dataset.name}</p>
          </div>
        </div>
      </div>

      {/* 4. Technology Stack */}
      <div className="bg-white rounded-lg border border-[#E2E8F0] p-6 shadow-xs space-y-4">
        <div className="pb-3 border-b border-[#F1F5F9]">
          <h3 className="text-sm font-bold text-[#172A3A] uppercase tracking-wider">
            Intended Technology Stack
          </h3>
          <p className="text-xs text-[#64748B]">
            Planned architecture for future backend, AI, and database integration
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
          {/* Frontend */}
          <div className="p-3.5 rounded-md bg-[#F8FAFC] border border-[#E2E8F0] space-y-1.5">
            <span className="font-bold text-[#172A3A] uppercase tracking-wider block">
              Frontend
            </span>
            <ul className="text-[#475569] space-y-0.5">
              {techStack.frontend.map((t) => (
                <li key={t}>• {t}</li>
              ))}
            </ul>
          </div>

          {/* Backend */}
          <div className="p-3.5 rounded-md bg-[#F8FAFC] border border-[#E2E8F0] space-y-1.5">
            <span className="font-bold text-[#172A3A] uppercase tracking-wider block">
              Backend
            </span>
            <ul className="text-[#475569] space-y-0.5">
              {techStack.backend.map((t) => (
                <li key={t}>• {t}</li>
              ))}
            </ul>
          </div>

          {/* AI/ML */}
          <div className="p-3.5 rounded-md bg-[#F8FAFC] border border-[#E2E8F0] space-y-1.5">
            <span className="font-bold text-[#172A3A] uppercase tracking-wider block">
              AI / ML
            </span>
            <ul className="text-[#475569] space-y-0.5">
              {techStack.aiMl.map((t) => (
                <li key={t}>• {t}</li>
              ))}
            </ul>
          </div>

          {/* Computer Vision */}
          <div className="p-3.5 rounded-md bg-[#F8FAFC] border border-[#E2E8F0] space-y-1.5">
            <span className="font-bold text-[#172A3A] uppercase tracking-wider block">
              Computer Vision
            </span>
            <ul className="text-[#475569] space-y-0.5">
              {techStack.computerVision.map((t) => (
                <li key={t}>• {t}</li>
              ))}
            </ul>
          </div>

          {/* Visualization */}
          <div className="p-3.5 rounded-md bg-[#F8FAFC] border border-[#E2E8F0] space-y-1.5">
            <span className="font-bold text-[#172A3A] uppercase tracking-wider block">
              Visualization
            </span>
            <ul className="text-[#475569] space-y-0.5">
              {techStack.visualization.map((t) => (
                <li key={t}>• {t}</li>
              ))}
            </ul>
          </div>

          {/* Database */}
          <div className="p-3.5 rounded-md bg-[#F8FAFC] border border-[#E2E8F0] space-y-1.5">
            <span className="font-bold text-[#172A3A] uppercase tracking-wider block">
              Database
            </span>
            <ul className="text-[#475569] space-y-0.5">
              {techStack.database.map((t) => (
                <li key={t}>• {t}</li>
              ))}
            </ul>
          </div>
        </div>

        <p className="text-[11px] text-[#64748B] pt-2 border-t border-[#F1F5F9] italic">
          Note: These represent the intended final architecture. The current stage implements only the React.js frontend prototype.
        </p>
      </div>
    </div>
  );
}
