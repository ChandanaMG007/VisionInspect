-- VisionInspect Industrial Quality Control Database Schema
-- Planned PostgreSQL Schema for Integration Phase

CREATE TABLE IF NOT EXISTS product_categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    tolerance_threshold NUMERIC(6, 4) NOT NULL DEFAULT 0.0250,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS inspections (
    id VARCHAR(50) PRIMARY KEY,
    product_id VARCHAR(50) NOT NULL,
    category_id INT REFERENCES product_categories(id),
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    result VARCHAR(20) NOT NULL CHECK (result IN ('Normal', 'Defective', 'Review Required')),
    severity VARCHAR(20) NOT NULL CHECK (severity IN ('None', 'Low', 'Medium', 'High')),
    severity_score NUMERIC(5, 4) NOT NULL,
    reconstruction_error NUMERIC(7, 5) NOT NULL,
    anomaly_score NUMERIC(5, 4) NOT NULL,
    defect_location VARCHAR(255),
    recommendation VARCHAR(20) NOT NULL CHECK (recommendation IN ('ACCEPT', 'REVIEW', 'REJECT')),
    original_image_path TEXT NOT NULL,
    reconstructed_image_path TEXT NOT NULL,
    heatmap_image_path TEXT NOT NULL,
    inspector_notes TEXT
);

CREATE INDEX idx_inspections_timestamp ON inspections(timestamp DESC);
CREATE INDEX idx_inspections_result ON inspections(result);
CREATE INDEX idx_inspections_product_id ON inspections(product_id);
