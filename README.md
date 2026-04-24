# LungDetect AI - Pulmonary Diagnostic System

LungDetect AI is a state-of-the-art pulmonary health monitoring and diagnostic application. It leverages a React-based frontend and a Django REST Framework backend to provide AI-assisted radiological analysis, symptom tracking, and health analytics.

## 🚀 Features

- **AI X-Ray Analysis**: Multi-model CNN ensemble for detecting pulmonary conditions like Pneumonia.
- **Symptom Checker**: Intelligent clinical engine for risk assessment based on patient symptoms.
- **Unified Dashboard**: Seamless navigation through health metrics, history, and AI insights.
- **Secure Auth**: Integrated with Supabase and Google OAuth for secure patient/doctor access.
- **Local API Proxy**: Vite-configured proxy to communicate with the Django backend.

## 🛠️ Technology Stack

- **Frontend**: React 18, Vite, Tailwind CSS, Framer Motion, Lucide React.
- **Backend**: Django, Django REST Framework, SQLite (Local), Supabase (Postgres).
- **Authentication**: Supabase Auth + JWT.

## 🏁 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [Python](https://www.python.org/) (v3.9+)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/LUNG-DETECTION.git
   cd LUNG-DETECTION
   ```

2. **Install Frontend dependencies**:
   ```bash
   npm install
   ```

3. **Set up Backend**:
   - Navigate to `backend` and create a virtual environment:
     ```bash
     cd backend
     python -m venv venv
     .\venv\Scripts\activate
     pip install -r requirements.txt (if available)
     ```

### Running Locally

We've provided a unified command to run both the frontend and backend concurrently:

```bash
npm run dev:all
```

- **Frontend**: [http://localhost:5174](http://localhost:5174)
- **Backend API**: [http://localhost:8000/api](http://localhost:8000/api)

## 📦 Project Structure

- `/src`: React frontend source code.
- `/backend`: Django backend source code.
- `/public`: Static assets for the frontend.
- `vite.config.js`: Vite configuration including the backend proxy.
- `/research`: Data analysis scripts for lung-specific datasets (e.g., Hugging Face `virtual10/lungs_cancer`).

## 🧪 Research & Data

The AI Doctor module is designed to provide insights aligned with clinical research datasets. You can explore our dataset analysis tools in the `/research` folder:
- **Dataset**: `virtual10/lungs_cancer` (Hugging Face)
- **Tool**: `python research/analyze_dataset.py`

## 📄 License

This project is for research and educational use only. Always consult a qualified physician for medical diagnosis.
