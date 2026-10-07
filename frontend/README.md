# VisionInspect - Industrial Frontend UI

**Explainable AI-Based Intelligent Visual Inspection System for Industrial Quality Control**  
*3rd-Year Major Engineering Project*

---

## 1. Overview

VisionInspect is an industrial visual inspection user interface engineered for quality-control automation. It is designed to evaluate product images using an unsupervised Convolutional Autoencoder (CAE) trained on the MVTec Anomaly Detection benchmark dataset.

The interface adheres strictly to high-precision engineering software standards (Siemens, Keyence, Cognex) prioritizing readability, data clarity, and explainable AI insights.

---

## 2. Key Pages & Features

1. **Dashboard Overview (`/dashboard`)**:
   - High-level KPI Stat Cards: Total Inspections, Normal (Passed), Defective (Rejected), Review Required.
   - Result Ratio distribution bar and First-Pass Yield (FPY) metrics.
   - Graded Anomaly Severity Distribution (None, Low, Medium, High).
   - 7-Day Quality & Throughput Trends (interactive toggle between Volume and MSE Drift).
   - Filterable Recent Inspections data table with quick "Details" access.

2. **New Product Inspection (`/new-inspection`)**:
   - Specimen metadata intake (Product Serial/Batch ID, Product Category).
   - Pre-calibrated MVTec test specimen presets for 1-click testing (Metal Nut with thread crack, Bottle with chipped rim, PCB with solder bridge, Ceramic Tile defect-free).
   - Drag-and-drop file upload zone with instant image preview.
   - Industrial AI execution modal simulating the 5-stage pipeline with progress feedback.

3. **Inspection Result & Explainability (`/inspection-result`)**:
   - **Primary Visual Outputs (High Space Priority)**:
     - **Original Input Image**: High-resolution optical capture.
     - **CAE Reconstructed Image**: Restored defect-free representation.
     - **Anomaly Heatmap**: Pixel-wise residual $|I_{orig} - I_{recon}|$ rendered in calibrated JET colormap.
   - **Interactive View Modes**: Side-by-side (3-up) and Heatmap Overlay with dynamic opacity slider (0–100%).
   - **Quantitative Analysis Details**: Reconstruction Error (MSE), Anomaly Score, Tolerance Threshold, Defect Location Coordinates.
   - **Quality Recommendation**: Industrial disposition cards (ACCEPT / REVIEW / REJECT).
   - **Explainable AI Section**: 6-step breakdown explaining the science behind autoencoder residual detection.

4. **Inspection History Audit Trail (`/history`)**:
   - Searchable and multi-attribute filterable log (by ID, Category, Result, Severity).
   - Sortable columns with color-coded status badges.
   - Direct CSV log export utility.

5. **Reports & Quality Analytics (`/reports`)**:
   - Production capability metrics (First Pass Yield, Defect Rejection Rate, Operator Triage Rate).
   - Defect rate distribution matrix across MVTec product categories.
   - Timeframe range filtering (Today, Last 7 Days, Last 30 Days).

6. **System Information & Architecture (`/system-info`)**:
   - Project purpose and background.
   - End-to-end 7-step inspection workflow diagram.
   - Convolutional Autoencoder mathematics and one-class anomaly detection formulation.
   - MVTec AD dataset specifications.
   - Comprehensive Technology Stack Matrix (Active Frontend vs Planned Backend / AI / Database).

7. **UI State Evaluation Switcher (Header)**:
   - Allows reviewers and evaluators to preview the UI across **Nominal (Normal)**, **Loading State**, and **Error State** seamlessly.

---

## 3. Design System & Palette

- **Primary**: Deep Navy `#172A3A`
- **Secondary**: Deep Teal `#176B68`
- **Background**: Warm/light off-white `#F5F7F4`
- **Panels/Cards**: Pure White `#FFFFFF` with subtle borders `#E2E8F0`
- **Status Indicators**:
  - Normal (Passed): `#1E6B42` (Bg: `#EDF7F1`, Border: `#C6E7D2`)
  - Review Required: `#B45309` (Bg: `#FEF3C7`, Border: `#FDE68A`)
  - Defective (Rejected): `#B91C1C` (Bg: `#FEE2E2`, Border: `#FECACA`)
- **Typography**: Inter (Google Fonts) with JetBrains Mono for data metrics

---

## 4. Architecture & Future Backend Integration

All mock data is centralized in `src/data/mockData.js` and exposed solely through asynchronous services in `src/services/api.js`.

### Zero-Redesign Backend Guarantee:
To connect the live Flask REST API, PostgreSQL database, and TensorFlow model later:
1. Open `src/services/api.js`.
2. Set `USE_MOCK_API = false` and update `API_BASE_URL = 'http://127.0.0.1:5000/api'`.
3. **No UI components or page views will require modification.**

---

## 5. Development & Running

### Requirements
- Node.js (v18+ or v20+)
- npm

### Installation
```bash
cd frontend
npm install
```

### Start Development Server
```bash
npm run dev
```

### Production Build
```bash
npm run build
```
