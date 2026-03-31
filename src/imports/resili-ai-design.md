Design a modern, enterprise-grade web application called Resili AI. The platform should support disaster management and business continuity using machine learning (CNN, Random Forest, XGBoost, SVM).

Overall Style: Use a dark theme with baby blue accents for highlights, buttons, and charts. Typography should be clean and professional (e.g., Inter or Roboto). Layout should be responsive, modular, and WCAG-compliant.

Navigation Bar (left sidebar):

Dashboard (overview of risk scores, alerts, continuity status)

Disaster Prediction (CNN image/sensor analysis, ML risk classification results)

Risk Monitoring (real-time feeds: environmental, cyber, operational, social media)

Continuity Planning (recommendations, intervention tracking, recovery workflows)

Reports & Analytics (downloadable reports, SHAP explainability visualizations)

Admin Settings (user roles: Admin, Continuity Manager, Analyst, Resilience Officer)

Dashboard Page:

Top bar with site name Resili AI, search, notifications, and user profile.

Main panel showing overall risk score (0–100 scale, color-coded: baby blue for low, yellow for moderate, red for high).

Cards for: Current Disaster Alerts, Business Continuity Status, Intervention Actions.

Graphs: ROC curves comparing CNN vs ML models, SHAP feature importance bar chart.

Disaster Prediction Page:

Upload section for satellite imagery, sensor data, or logs.

CNN output visualization (heatmaps, classification labels).

ML model comparison table (Random Forest, XGBoost, SVM) with accuracy, precision, recall, F1-score.

Risk classification results displayed as Low, Moderate, High with probability scores.

Risk Monitoring Page:

Real-time data feeds: environmental sensors, cybersecurity logs, operational metrics, social media signals.

Interactive charts showing disaster trends over time.

Alerts panel with severity levels and timestamps.

Continuity Planning Page:

Recommended interventions (e.g., backup activation, supply chain rerouting).

Workflow tracker showing recovery steps completed vs pending.

Role-based task assignments with progress indicators.

Reports & Analytics Page:

Downloadable PDF/Excel reports.

SHAP explainability dashboard showing top features influencing predictions.

Comparative performance charts for CNN and ML models.

Admin Settings Page:

User management (add/remove roles).

Security settings (JWT authentication, bcrypt password hashing).

System logs and audit trails.

Design Notes:

Use baby blue accents for buttons, highlights, and active states against the dark background.

Modular card components for flexibility.

Responsive layouts for desktop, tablet, and mobile.

Visual emphasis on risk scoring and intervention tracking.

Ensure dashboards are intuitive, with clear data visualization and minimal clutter.