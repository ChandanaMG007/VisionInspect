/**
 * VisionInspect API Service Layer
 * 
 * Provides centralized data access for the frontend.
 * Currently serves structured mock data for demonstration.
 * 
 * In future stages, this service will be connected to:
 * React -> Flask Backend -> AI / Autoencoder -> PostgreSQL
 * without requiring any UI component redesign.
 */

import {
  DASHBOARD_STATS,
  INSPECTION_RECORDS,
  QUALITY_TRENDS,
  SEVERITY_DISTRIBUTION,
  SYSTEM_INFO_DATA,
  SAMPLE_IMAGES,
} from '../data/mockData';

export const USE_MOCK_API = true;
export const API_BASE_URL = 'http://127.0.0.1:5000/api';

const simulateDelay = (ms = 200) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Fetch high-level inspection statistics for the dashboard
 */
export async function getDashboardStats() {
  if (!USE_MOCK_API) {
    const res = await fetch(`${API_BASE_URL}/dashboard/stats`);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return await res.json();
  }

  await simulateDelay(150);
  return { ...DASHBOARD_STATS };
}

/**
 * Fetch inspection history records with search and filter parameters
 */
export async function getInspectionRecords(filters = {}) {
  if (!USE_MOCK_API) {
    const query = new URLSearchParams(filters).toString();
    const res = await fetch(`${API_BASE_URL}/inspections?${query}`);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return await res.json();
  }

  await simulateDelay(180);

  let filtered = [...INSPECTION_RECORDS];

  // Search filter
  if (filters.search && filters.search.trim() !== '') {
    const term = filters.search.toLowerCase().trim();
    filtered = filtered.filter(
      (r) =>
        r.id.toLowerCase().includes(term) ||
        r.productId.toLowerCase().includes(term) ||
        r.category.toLowerCase().includes(term) ||
        (r.defectLocation && r.defectLocation.toLowerCase().includes(term))
    );
  }

  // Result filter (Normal, Defective, Review Required)
  if (filters.result && filters.result !== 'All') {
    filtered = filtered.filter((r) => r.result === filters.result);
  }

  // Severity filter (None, Low, Medium, High)
  if (filters.severity && filters.severity !== 'All') {
    filtered = filtered.filter((r) => r.severity === filters.severity);
  }

  // Category filter
  if (filters.category && filters.category !== 'All') {
    filtered = filtered.filter((r) => r.category === filters.category);
  }

  return {
    records: filtered,
    total: filtered.length,
  };
}

/**
 * Fetch detailed inspection data by ID
 */
export async function getInspectionById(id) {
  if (!USE_MOCK_API) {
    const res = await fetch(`${API_BASE_URL}/inspections/${id}`);
    if (!res.ok) throw new Error(`Inspection ${id} not found.`);
    return await res.json();
  }

  await simulateDelay(150);
  const found = INSPECTION_RECORDS.find((r) => r.id === id);
  return found ? { ...found } : { ...INSPECTION_RECORDS[0] };
}

/**
 * Submit a product image for inspection demonstration
 * Simple frontend demo behavior: short preparation delay, then delivers mock result.
 */
export async function submitInspection(payload) {
  if (!USE_MOCK_API) {
    const formData = new FormData();
    formData.append('product_id', payload.productId);
    formData.append('category', payload.category);
    if (payload.imageFile) {
      formData.append('image', payload.imageFile);
    }
    const res = await fetch(`${API_BASE_URL}/inspect`, {
      method: 'POST',
      body: formData,
    });
    if (!res.ok) throw new Error(`Inspection failed: ${res.statusText}`);
    return await res.json();
  }

  // Simple frontend demo delay (no fake AI simulation)
  await simulateDelay(600);

  const now = new Date();
  const timestamp = now.toISOString().replace('T', ' ').substring(0, 19);
  const generatedId = `INS-${String(INSPECTION_RECORDS.length + 1).padStart(3, '0')}`;

  const mockResult = {
    id: generatedId,
    productId: payload.productId || 'PRD-001',
    category: payload.category || 'Metal Nut',
    timestamp: timestamp,
    result: 'Defective',
    severity: 'High',
    reconstructionError: 0.0842,
    anomalyScore: 0.842,
    defectLocation: 'Inner Thread Radial Fracture, Sector B-4',
    recommendation: 'REJECT',
    images: {
      original: payload.imageUri || SAMPLE_IMAGES.original,
      reconstructed: SAMPLE_IMAGES.reconstructed,
      heatmap: SAMPLE_IMAGES.heatmap,
    },
  };

  INSPECTION_RECORDS.unshift(mockResult);
  DASHBOARD_STATS.defectiveCount++;
  DASHBOARD_STATS.totalInspections++;

  return mockResult;
}

/**
 * Fetch analytics trends and breakdowns
 */
export async function getAnalyticsData() {
  if (!USE_MOCK_API) {
    const res = await fetch(`${API_BASE_URL}/analytics`);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return await res.json();
  }

  await simulateDelay(150);
  return {
    stats: { ...DASHBOARD_STATS },
    trends: [...QUALITY_TRENDS],
    severityDistribution: [...SEVERITY_DISTRIBUTION],
  };
}

/**
 * Fetch system information documentation
 */
export async function getSystemInfo() {
  if (!USE_MOCK_API) {
    const res = await fetch(`${API_BASE_URL}/system/info`);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return await res.json();
  }

  await simulateDelay(100);
  return { ...SYSTEM_INFO_DATA };
}
