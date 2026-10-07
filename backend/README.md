# VisionInspect - Backend (Planned Integration)

This directory is designated for the Flask REST API backend in future project stages.

### Planned Architecture:
- `app/routes/`: API route controllers (`/api/inspections`, `/api/analyze`, `/api/stats`, `/api/health`)
- `app/services/`: Business logic, OpenCV preprocessing caller, and model inference connector
- `app/models/`: SQLAlchemy / PostgreSQL ORM models
- `app/utils/`: Image conversion, error metrics, and response formatters
- `app.py`: Flask application factory and entry point
- `requirements.txt`: Python package dependencies (Flask, psycopg2-binary, numpy, etc.)

> **Current Stage Note:** The frontend currently runs autonomously via `frontend/src/services/api.js` with structured mock data matching the exact schema designed for this backend.
