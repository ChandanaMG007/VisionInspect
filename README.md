# VisionInspect

**Explainable AI-Based Intelligent Visual Inspection System for Industrial Quality Control**

VisionInspect is an industrial visual inspection platform designed to detect manufacturing defects in product images using an unsupervised Convolutional Autoencoder (CAE) trained on the MVTec Anomaly Detection benchmark dataset.

---

## System Architecture

```text
Product Image ──> Preprocessing ──> Convolutional Autoencoder ──> Reconstruction
                                                 │
                                                 ▼
Quality Recommendation <── Severity Estimation <── Anomaly Heatmap <── Reconstruction Error
```

## Directory Structure

```text
VisionInspect/
├── frontend/          # React.js Professional Industrial UI (Active Stage)
├── backend/           # Flask REST API (Future Stage)
├── ai/                # TensorFlow/Keras CAE Models & Inference (Future Stage)
├── database/          # PostgreSQL Schemas & Migrations (Future Stage)
└── docs/              # System Architecture & Specifications
```

## Running the Frontend

```bash
cd frontend
npm install
npm run dev
```
