/**
 * Centralized Mock Data Store for VisionInspect
 * 
 * IMPORTANT: All demonstration data is strictly centralized in this file.
 * Components consume this data through the API service layer (services/api.js).
 */

function generateSvgDataUri(svgString) {
  return `data:image/svg+xml;utf8,${encodeURIComponent(svgString.trim())}`;
}

// Visual specimen SVG representations for demonstration
const specimenOriginalSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <rect width="400" height="400" fill="#1C1E22"/>
  <defs>
    <radialGradient id="nut-metallic" cx="45%" cy="40%" r="50%">
      <stop offset="0%" stop-color="#94A3B8"/>
      <stop offset="60%" stop-color="#64748B"/>
      <stop offset="100%" stop-color="#334155"/>
    </radialGradient>
    <radialGradient id="hole-dark" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#090D12"/>
      <stop offset="85%" stop-color="#1E293B"/>
      <stop offset="100%" stop-color="#475569"/>
    </radialGradient>
  </defs>

  <!-- Hexagonal Nut Body -->
  <polygon points="200,45 330,120 330,280 200,355 70,280 70,120" 
           fill="url(#nut-metallic)" stroke="#CBD5E1" stroke-width="3" stroke-linejoin="round"/>
  
  <polygon points="200,60 315,127 315,273 200,340 85,273 85,127" 
           fill="none" stroke="#475569" stroke-width="2"/>
  
  <!-- Center Thread Hole -->
  <circle cx="200" cy="200" r="78" fill="url(#hole-dark)" stroke="#94A3B8" stroke-width="3"/>
  
  <!-- Internal Threads -->
  <circle cx="200" cy="200" r="70" fill="none" stroke="#64748B" stroke-width="1.5" stroke-dasharray="8 4"/>
  <circle cx="200" cy="200" r="62" fill="none" stroke="#94A3B8" stroke-width="1.5" stroke-dasharray="9 3"/>
  <circle cx="200" cy="200" r="54" fill="none" stroke="#64748B" stroke-width="1.5" stroke-dasharray="6 3"/>
  <circle cx="200" cy="200" r="46" fill="none" stroke="#94A3B8" stroke-width="1.5" stroke-dasharray="8 4"/>
  <circle cx="200" cy="200" r="38" fill="none" stroke="#475569" stroke-width="1.5"/>

  <!-- DEFECT: Inner Thread Radial Fracture & Crack -->
  <path d="M 235 240 Q 252 260 262 278" stroke="#0F172A" stroke-width="4.5" stroke-linecap="round"/>
  <path d="M 235 240 Q 252 260 262 278" stroke="#1E293B" stroke-width="2.5" stroke-linecap="round"/>
  <path d="M 246 252 Q 258 256 268 254" stroke="#0F172A" stroke-width="2.5" stroke-linecap="round"/>
  <circle cx="250" cy="256" r="3" fill="#E2E8F0"/>
  <circle cx="258" cy="268" r="2.5" fill="#E2E8F0"/>
</svg>`;

const specimenReconstructedSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <rect width="400" height="400" fill="#1C1E22"/>
  <defs>
    <radialGradient id="nut-recon" cx="45%" cy="40%" r="50%">
      <stop offset="0%" stop-color="#94A3B8"/>
      <stop offset="60%" stop-color="#64748B"/>
      <stop offset="100%" stop-color="#334155"/>
    </radialGradient>
    <radialGradient id="hole-recon" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#090D12"/>
      <stop offset="85%" stop-color="#1E293B"/>
      <stop offset="100%" stop-color="#475569"/>
    </radialGradient>
  </defs>

  <!-- Reconstructed Nut (Normal Learned Pattern - defect absent) -->
  <polygon points="200,45 330,120 330,280 200,355 70,280 70,120" 
           fill="url(#nut-recon)" stroke="#CBD5E1" stroke-width="2.8" stroke-linejoin="round"/>
  
  <polygon points="200,60 315,127 315,273 200,340 85,273 85,127" 
           fill="none" stroke="#475569" stroke-width="2"/>
  
  <circle cx="200" cy="200" r="78" fill="url(#hole-recon)" stroke="#94A3B8" stroke-width="3"/>
  
  <circle cx="200" cy="200" r="70" fill="none" stroke="#64748B" stroke-width="1.5" stroke-dasharray="8 4"/>
  <circle cx="200" cy="200" r="62" fill="none" stroke="#94A3B8" stroke-width="1.5" stroke-dasharray="9 3"/>
  <circle cx="200" cy="200" r="54" fill="none" stroke="#64748B" stroke-width="1.5" stroke-dasharray="6 3"/>
  <circle cx="200" cy="200" r="46" fill="none" stroke="#94A3B8" stroke-width="1.5" stroke-dasharray="8 4"/>
  <circle cx="200" cy="200" r="38" fill="none" stroke="#475569" stroke-width="1.5"/>
</svg>`;

const specimenHeatmapSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <!-- Base blue represents 0 residual -->
  <rect width="400" height="400" fill="#000080"/>
  
  <defs>
    <filter id="jet-blur" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="14"/>
    </filter>
    <radialGradient id="anomaly-hotspot" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#FF0000" stop-opacity="0.95"/>
      <stop offset="35%" stop-color="#FF5500" stop-opacity="0.9"/>
      <stop offset="65%" stop-color="#FFFF00" stop-opacity="0.75"/>
      <stop offset="85%" stop-color="#00FFCC" stop-opacity="0.5"/>
      <stop offset="100%" stop-color="#000080" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <!-- Localized anomaly intensity cluster -->
  <g filter="url(#jet-blur)">
    <circle cx="254" cy="262" r="54" fill="url(#anomaly-hotspot)"/>
    <ellipse cx="248" cy="254" rx="38" ry="24" fill="#FF0000" opacity="0.9"/>
    <ellipse cx="260" cy="272" rx="26" ry="18" fill="#FFFF00" opacity="0.8"/>
  </g>

  <!-- Localization indicator box -->
  <rect x="220" y="225" width="70" height="70" fill="none" stroke="#FF4444" stroke-width="1.5" stroke-dasharray="4 2"/>
</svg>`;

export const SAMPLE_IMAGES = {
  original: generateSvgDataUri(specimenOriginalSvg),
  reconstructed: generateSvgDataUri(specimenReconstructedSvg),
  heatmap: generateSvgDataUri(specimenHeatmapSvg),
};

/**
 * Dashboard Summary Statistics
 */
export const DASHBOARD_STATS = {
  totalInspections: 1482,
  normalCount: 1298,
  defectiveCount: 126,
  reviewCount: 58,
};

/**
 * Inspection Records Audit Trail
 */
export const INSPECTION_RECORDS = [
  {
    id: 'INS-001',
    productId: 'MNT-9042',
    category: 'Metal Nut',
    timestamp: '2026-10-03 21:42:15',
    result: 'Defective',
    severity: 'High',
    reconstructionError: 0.0842,
    anomalyScore: 0.842,
    defectLocation: 'Inner Thread Radial Fracture, Sector B-4',
    recommendation: 'REJECT',
    images: SAMPLE_IMAGES,
  },
  {
    id: 'INS-002',
    productId: 'BTL-3109',
    category: 'Bottle',
    timestamp: '2026-10-03 21:18:04',
    result: 'Defective',
    severity: 'Medium',
    reconstructionError: 0.0712,
    anomalyScore: 0.712,
    defectLocation: 'Upper Finish / Lip Chipping',
    recommendation: 'REJECT',
    images: SAMPLE_IMAGES,
  },
  {
    id: 'INS-003',
    productId: 'PCB-1082',
    category: 'Transistor (PCB)',
    timestamp: '2026-10-03 20:55:40',
    result: 'Review Required',
    severity: 'Medium',
    reconstructionError: 0.0482,
    anomalyScore: 0.482,
    defectLocation: 'Pin 2-3 Solder Bridge',
    recommendation: 'REVIEW',
    images: SAMPLE_IMAGES,
  },
  {
    id: 'INS-004',
    productId: 'TIL-0104',
    category: 'Tile',
    timestamp: '2026-10-03 20:31:12',
    result: 'Normal',
    severity: 'None',
    reconstructionError: 0.0091,
    anomalyScore: 0.091,
    defectLocation: 'Defect-free',
    recommendation: 'ACCEPT',
    images: SAMPLE_IMAGES,
  },
  {
    id: 'INS-005',
    productId: 'CAP-4022',
    category: 'Capsule',
    timestamp: '2026-10-03 20:10:48',
    result: 'Normal',
    severity: 'None',
    reconstructionError: 0.0114,
    anomalyScore: 0.114,
    defectLocation: 'Defect-free',
    recommendation: 'ACCEPT',
    images: SAMPLE_IMAGES,
  },
  {
    id: 'INS-006',
    productId: 'CBL-7714',
    category: 'Cable',
    timestamp: '2026-10-03 19:44:22',
    result: 'Defective',
    severity: 'High',
    reconstructionError: 0.0915,
    anomalyScore: 0.915,
    defectLocation: 'Outer Sheath Cut',
    recommendation: 'REJECT',
    images: SAMPLE_IMAGES,
  },
  {
    id: 'INS-007',
    productId: 'MNT-9041',
    category: 'Metal Nut',
    timestamp: '2026-10-03 19:15:09',
    result: 'Normal',
    severity: 'None',
    reconstructionError: 0.0128,
    anomalyScore: 0.128,
    defectLocation: 'Defect-free',
    recommendation: 'ACCEPT',
    images: SAMPLE_IMAGES,
  },
  {
    id: 'INS-008',
    productId: 'BTL-3108',
    category: 'Bottle',
    timestamp: '2026-10-03 18:50:33',
    result: 'Review Required',
    severity: 'Low',
    reconstructionError: 0.0298,
    anomalyScore: 0.298,
    defectLocation: 'Base Contamination / Slight Residue',
    recommendation: 'REVIEW',
    images: SAMPLE_IMAGES,
  },
  {
    id: 'INS-009',
    productId: 'SCR-5521',
    category: 'Screw',
    timestamp: '2026-10-03 18:22:15',
    result: 'Normal',
    severity: 'None',
    reconstructionError: 0.0084,
    anomalyScore: 0.084,
    defectLocation: 'Defect-free',
    recommendation: 'ACCEPT',
    images: SAMPLE_IMAGES,
  },
  {
    id: 'INS-010',
    productId: 'WOD-1290',
    category: 'Wood',
    timestamp: '2026-10-03 17:58:49',
    result: 'Defective',
    severity: 'Medium',
    reconstructionError: 0.0634,
    anomalyScore: 0.634,
    defectLocation: 'Grain Surface Void',
    recommendation: 'REJECT',
    images: SAMPLE_IMAGES,
  },
  {
    id: 'INS-011',
    productId: 'PCB-1081',
    category: 'Transistor (PCB)',
    timestamp: '2026-10-03 17:30:11',
    result: 'Normal',
    severity: 'None',
    reconstructionError: 0.0102,
    anomalyScore: 0.102,
    defectLocation: 'Defect-free',
    recommendation: 'ACCEPT',
    images: SAMPLE_IMAGES,
  },
  {
    id: 'INS-012',
    productId: 'MNT-9040',
    category: 'Metal Nut',
    timestamp: '2026-10-03 17:02:44',
    result: 'Review Required',
    severity: 'Low',
    reconstructionError: 0.0315,
    anomalyScore: 0.315,
    defectLocation: 'Surface Discoloration Spot',
    recommendation: 'REVIEW',
    images: SAMPLE_IMAGES,
  },
];

/**
 * Recent Inspection Trends (Quality Statistics)
 */
export const QUALITY_TRENDS = [
  { date: 'Sep 27', total: 112, normal: 99, defective: 9, review: 4 },
  { date: 'Sep 28', total: 135, normal: 119, defective: 11, review: 5 },
  { date: 'Sep 29', total: 140, normal: 124, defective: 10, review: 6 },
  { date: 'Sep 30', total: 128, normal: 114, defective: 9, review: 5 },
  { date: 'Oct 01', total: 152, normal: 133, defective: 13, review: 6 },
  { date: 'Oct 02', total: 164, normal: 144, defective: 14, review: 6 },
  { date: 'Oct 03', total: 146, normal: 128, defective: 12, review: 6 },
];

/**
 * Severity Distribution Data
 */
export const SEVERITY_DISTRIBUTION = [
  { level: 'None (Normal)', count: 1298, percentage: 87.6, color: '#1E6B42' },
  { level: 'Low', count: 58, percentage: 3.9, color: '#2B6CB0' },
  { level: 'Medium', count: 71, percentage: 4.8, color: '#B45309' },
  { level: 'High', count: 55, percentage: 3.7, color: '#B91C1C' },
];

/**
 * System Information Data
 */
export const SYSTEM_INFO_DATA = {
  about: {
    title: 'VisionInspect',
    subtitle: 'Explainable AI-Based Intelligent Visual Inspection System for Industrial Quality Control',
    description: 'VisionInspect is an industrial visual inspection system designed to identify manufacturing defects in product images. By utilizing an unsupervised Convolutional Autoencoder (CAE) trained exclusively on defect-free product images, the system learns normal physical patterns. When an anomalous image is presented, the model fails to reconstruct the defect, producing a high reconstruction error residual that localizes the flaw on an anomaly heatmap and drives automated quality recommendations.',
  },
  workflow: [
    { step: 1, name: 'Image Acquisition', description: 'Capture high-resolution industrial product image under controlled lighting.' },
    { step: 2, name: 'Preprocessing', description: 'Resize image, normalize pixel intensity ranges, and remove noise.' },
    { step: 3, name: 'Autoencoder', description: 'Compress image through convolutional encoder and reconstruct nominal representation.' },
    { step: 4, name: 'Reconstruction Error', description: 'Compute pixel-wise difference between original and reconstructed images.' },
    { step: 5, name: 'Anomaly Heatmap', description: 'Generate colorized heatmap indicating the spatial location and intensity of defects.' },
    { step: 6, name: 'Severity Estimation', description: 'Calculate defect magnitude and evaluate against tolerance thresholds.' },
    { step: 7, name: 'Quality Recommendation', description: 'Produce quality disposition verdict: ACCEPT, REVIEW, or REJECT.' },
  ],
  aiApproach: {
    modelType: 'Convolutional Autoencoder (CAE)',
    paradigm: 'Unsupervised Anomaly Detection',
    description: 'The system uses a convolutional autoencoder trained primarily on defect-free images to learn normal product characteristics. Because defects are absent during training, the autoencoder cannot reconstruct anomalous features, exposing them directly through pixel-level reconstruction error.',
  },
  dataset: {
    name: 'MVTec AD (MVTec Anomaly Detection)',
    description: 'Industry-standard benchmark dataset for visual inspection containing high-resolution real-world images across industrial categories with diverse defect variations.',
  },
  techStack: {
    frontend: ['React.js', 'HTML5', 'CSS3', 'JavaScript'],
    backend: ['Python', 'Flask'],
    aiMl: ['TensorFlow/Keras', 'Convolutional Autoencoder'],
    computerVision: ['OpenCV'],
    visualization: ['Matplotlib'],
    database: ['PostgreSQL'],
  },
};
