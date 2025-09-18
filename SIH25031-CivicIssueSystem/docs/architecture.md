---

## Branching Strategy

To ensure code stability and smooth collaboration, follow this branching strategy:

- **main**: Always stable. Only merge fully tested and reviewed features here.
- **feature branches**: Create a new branch for each feature or major fix. Examples:
	- `feature/mobile-reporting`
	- `feature/admin-dashboard`
	- `feature/analytics`

### Example Workflow

```sh
# Create and switch to a new feature branch
git checkout -b feature/mobile-reporting

# Work on your feature, then add and commit changes
git add .
git commit -m "Add mobile reporting feature"

# Push your branch to remote
git push origin feature/mobile-reporting

# When done, open a pull request to merge into main after review and testing
```

Repeat this process for each new feature or fix. Regularly pull updates from `main` to keep your branch up to date.
# System Architecture

## Overview

This document describes the architecture, ER diagram, and API endpoints for the Civic Issue System.

## Components
- Backend (API, DB models, controllers)
- Frontend (Mobile app, Web dashboard)

## ER Diagram

*(Insert ER diagram here)*

## API Endpoints

*(List API endpoints here)*

---

## Machine Learning Integration

### Purpose
Machine learning is used to enhance the Civic Issue System by automating issue categorization, prioritization, and providing insights from reported data.

### Components
- **ML Model Service:** A backend service (Python/Flask/FastAPI) for model inference.
- **Training Pipeline:** Scripts for data preprocessing, model training, and evaluation (in `scripts/` and `datasets/`).
- **Integration:** Backend calls ML service for predictions when a new issue is reported.

### Example Use Cases
- Automatic classification of issue type from user description or image
- Predicting issue urgency or priority
- Detecting duplicate or spam reports

### Data Flow
1. User submits a report (text/image)
2. Backend sends data to ML service
3. ML service returns prediction (category, priority, etc.)
4. Result is stored and used in workflow

### Deployment
- ML models are trained offline and deployed as REST API microservices
- Model artifacts and training scripts are stored in `scripts/` and `datasets/`

### Future Enhancements
- Feedback loop for continuous model improvement
- Advanced analytics and visualization
