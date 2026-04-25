import React from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Home from './pages/Home';
import Chat from './pages/Chat';
import XRay from './pages/XRay';
import SymptomChecker from './pages/SymptomChecker';
import Breathing from './pages/Breathing';
import MedicalHistory from './pages/MedicalHistory';
import AIInsights from './pages/AIInsights';
import RecoveryPlan from './pages/RecoveryPlan';
import Medications from './pages/Medications';
import Telemedicine from './pages/Telemedicine';
import DoctorHome from './pages/DoctorHome';
import DoctorBooking from './pages/DoctorBooking';
import DoctorSchedule from './pages/DoctorSchedule';
import DoctorPatientReg from './pages/DoctorPatientReg';
import PageWrapper from './components/layout/PageWrapper';

// Simple placeholder for unimplemented dash routes
const Placeholder = ({ title }) => (
  <div className="flex flex-col items-center justify-center h-[50vh] animate-fade-in">
    <h1 className="text-2xl font-heading font-medium tracking-tight mb-4">{title}</h1>
    <p className="text-text-secondary text-sm">This page is under construction.</p>
  </div>
);

// Protected Route Wrapper
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;
  return <PageWrapper>{children}</PageWrapper>;
};

const router = createBrowserRouter([
  { path: '/', element: <Navigate to="/landing" replace /> },
  { path: '/landing', element: <Landing /> },
  { path: '/login', element: <Login /> },
  { path: '/home', element: <ProtectedRoute><Home /></ProtectedRoute> },
  { path: '/chat', element: <ProtectedRoute><Chat /></ProtectedRoute> },
  { path: '/xray', element: <ProtectedRoute><XRay /></ProtectedRoute> },
  { path: '/symptom-checker', element: <ProtectedRoute><SymptomChecker /></ProtectedRoute> },
  { path: '/ai-insights', element: <ProtectedRoute><AIInsights /></ProtectedRoute> },
  { path: '/recovery', element: <ProtectedRoute><RecoveryPlan /></ProtectedRoute> },
  { path: '/cough-detect', element: <ProtectedRoute><Placeholder title="Cough Detect" /></ProtectedRoute> },
  { path: '/breathing', element: <ProtectedRoute><Breathing /></ProtectedRoute> },
  { path: '/analytics', element: <ProtectedRoute><MedicalHistory /></ProtectedRoute> },
  { path: '/doctor-home', element: <ProtectedRoute><DoctorHome /></ProtectedRoute> },
  { path: '/doctor-booking', element: <ProtectedRoute><DoctorBooking /></ProtectedRoute> },
  { path: '/doctor-schedule', element: <ProtectedRoute><DoctorSchedule /></ProtectedRoute> },
  { path: '/doctor-patient-reg', element: <ProtectedRoute><DoctorPatientReg /></ProtectedRoute> },
  { path: '/telemedicine', element: <ProtectedRoute><Telemedicine /></ProtectedRoute> },
  { path: '/hospitals', element: <ProtectedRoute><Placeholder title="Nearby Hospitals" /></ProtectedRoute> },
  { path: '/medications', element: <ProtectedRoute><Medications /></ProtectedRoute> },
  { path: '/settings', element: <ProtectedRoute><Placeholder title="Settings" /></ProtectedRoute> }
]);

export default function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}
