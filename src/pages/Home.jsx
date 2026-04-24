import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/ui/Card';
import { useAuth } from '../context/AuthContext';
import { 
  Scan, Activity, History, Sparkles, BarChart2, Wind, 
  Pill, Ban, Gauge, ClipboardList, HeartPulse, CloudSun, 
  AlertTriangle, Mic, Stethoscope, Bell, Video, Watch, Shield
} from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const firstName = user?.user_metadata?.first_name || user?.email?.split('@')[0] || 'User';

  const cards = [
    { id: '1', title: 'X-Ray Analysis', desc: 'Securely upload your chest scans', icon: Scan, path: '/xray', gradient: 'linear-gradient(135deg,#2B6CB0,#4299E1)' },
    { id: '2', title: 'Symptom Checker', desc: 'Analyze how you feel today', icon: Stethoscope, path: '/symptom-checker', gradient: 'linear-gradient(135deg,#319795,#4FD1C5)' },
    { id: '3', title: 'Medical History', desc: 'Review your past health records', icon: History, path: '/analytics', gradient: 'linear-gradient(135deg,#553C9A,#805AD5)' },
    { id: '4', title: 'AI Insights', desc: 'Smart recommendations from AI', icon: Sparkles, path: '/ai-insights', gradient: 'linear-gradient(135deg,#276749,#48BB78)' },
    { id: '5', title: 'Health Analytics', desc: 'Track your long-term progress', icon: BarChart2, path: '/analytics', gradient: 'linear-gradient(135deg,#086F83,#0BC5EA)' },
    { id: '6', title: 'Breathing Exer.', desc: 'Follow guided sessions', icon: Wind, path: '/breathing', gradient: 'linear-gradient(135deg,#2C5282,#63B3ED)' },
    { id: '7', title: 'Medications', desc: 'Manage your daily prescriptions', icon: Pill, path: '/medications', gradient: 'linear-gradient(135deg,#285E61,#81E6D9)' },
    { id: '8', title: 'Quit Smoking', desc: 'Support to help you stop', icon: Ban, path: '/chat', gradient: 'linear-gradient(135deg,#9C4221,#FC8181)' },
    { id: '9', title: 'Lung Capacity', desc: 'Monitor your breathing volume', icon: Gauge, path: '/analytics', gradient: 'linear-gradient(135deg,#2A4365,#4299E1)' },
    { id: '10', title: 'Cough Log', desc: 'Record daily cough frequency', icon: ClipboardList, path: '/cough-detect', gradient: 'linear-gradient(135deg,#702459,#F687B3)' },
    { id: '11', title: 'Recovery Plan', desc: 'Post-illness recovery tracking', icon: HeartPulse, path: '/recovery', gradient: 'linear-gradient(135deg,#1D4044,#4FD1C5)' },
    { id: '12', title: 'Air & Weather', desc: 'Local air quality alerts', icon: CloudSun, path: '/home', gradient: 'linear-gradient(135deg,#2A4365,#90CDF4)' },
    { id: '13', title: 'Allergy Risk', desc: 'Pollen and asthma triggers', icon: AlertTriangle, path: '/home', gradient: 'linear-gradient(135deg,#744210,#ECC94B)' },
    { id: '14', title: 'Voice Assistant', desc: 'Hands-free help & logging', icon: Mic, path: '/chat', gradient: 'linear-gradient(135deg,#1D4044,#319795)' },
    { id: '15', title: 'Cough Detect', desc: 'Real-time acoustic analysis', icon: Stethoscope, path: '/cough-detect', gradient: 'linear-gradient(135deg,#2B6CB0,#90CDF4)' },
    { id: '16', title: 'Early Warning', desc: 'Predictive health decline alerts', icon: Bell, path: '/analytics', gradient: 'linear-gradient(135deg,#742A2A,#E53E3E)' },
    { id: '17', title: 'Telemedicine', desc: 'Connect with specialists', icon: Video, path: '/telemedicine', gradient: 'linear-gradient(135deg,#2B6CB0,#4299E1)' },
    { id: '18', title: 'Wearable Sync', desc: 'Connect smartwatch data', icon: Watch, path: '/settings', gradient: 'linear-gradient(135deg,#1C4532,#68D391)' },
  ];

  return (
    <div className="animate-fade-in pb-12">
      {/* Header Greeting */}
      <div className="mb-10 mt-8">
        <h1 className="text-[28px] md:text-[32px] font-light text-text-primary tracking-tight mb-2">
          Good morning, {firstName} <span aria-hidden="true">👋</span>
        </h1>
        <p className="text-[15px] font-normal text-text-secondary">
          How are your lungs feeling today?
        </p>
      </div>

      {/* Quick Actions Grid area */}
      <div className="mb-6 flex items-center text-text-primary">
        <Shield size={20} className="mr-2 text-brand-blue-light" />
        <h2 className="text-[18px] font-medium tracking-tight">Quick Actions</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((card) => (
          <Card 
            key={card.id}
            title={card.title}
            description={card.desc}
            icon={card.icon}
            gradient={card.gradient}
            onClick={() => navigate(card.path)}
          />
        ))}
      </div>
    </div>
  );
}
