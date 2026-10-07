import React from 'react';
import { HelpCircle } from 'lucide-react';

export default function ExplainabilityCard() {
  const steps = [
    {
      num: 1,
      title: 'Normal Pattern Learning',
      desc: 'The autoencoder learns normal product patterns from defect-free images.',
    },
    {
      num: 2,
      title: 'Image Reconstruction',
      desc: 'The input image is reconstructed according to learned normal characteristics.',
    },
    {
      num: 3,
      title: 'Image Comparison',
      desc: 'The original and reconstructed images are compared to calculate pixel-level differences.',
    },
    {
      num: 4,
      title: 'Anomaly Identification',
      desc: 'High reconstruction-error regions indicate possible anomalous or defective regions.',
    },
    {
      num: 5,
      title: 'Severity Estimation',
      desc: 'The anomaly region and error magnitude contribute to severity estimation.',
    },
    {
      num: 6,
      title: 'Quality Recommendation',
      desc: 'A final quality recommendation (ACCEPT, REVIEW, or REJECT) is generated.',
    },
  ];

  return (
    <div className="bg-white rounded-lg border border-[#E2E8F0] p-5 shadow-xs space-y-4">
      <div className="flex items-center gap-2 pb-3 border-b border-[#F1F5F9]">
        <HelpCircle className="w-4 h-4 text-[#176B68]" />
        <h3 className="text-sm font-bold text-[#172A3A] uppercase tracking-wider">
          Explainability (How the Result Was Produced)
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {steps.map((step) => (
          <div
            key={step.num}
            className="p-3.5 rounded-md bg-[#F8FAFC] border border-[#E2E8F0] flex items-start gap-3"
          >
            <div className="w-6 h-6 rounded-full bg-[#172A3A] text-white flex items-center justify-center text-xs font-bold shrink-0">
              {step.num}
            </div>
            <div className="space-y-0.5">
              <h4 className="text-xs font-bold text-[#172A3A]">
                {step.title}
              </h4>
              <p className="text-[11px] text-[#64748B] leading-relaxed">
                {step.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
