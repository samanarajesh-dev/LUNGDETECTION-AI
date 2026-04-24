import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/ui/Card';
import { useAuth } from '../context/AuthContext';
import { 
  Calendar, Users, UserCircle, History, FileSpreadsheet, 
  FileText, Video, CreditCard, Bell, LayoutDashboard, 
  BookOpen, ClipboardList, Receipt, Package, Briefcase, 
  PieChart, MessageSquare, Bot, Shield, Stethoscope, 
  Search, Plus, Activity
} from 'lucide-react';

export default function DoctorHome() {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const firstName = user?.user_metadata?.first_name || user?.email?.split('@')[0] || 'Doctor';

  const cards = [
    // 🩺 Administrative & Patient Management
    { id: '1', title: 'Appointment Booking', desc: 'Manage & schedule visits', icon: Calendar, path: '/doctor-home', gradient: 'linear-gradient(135deg,#1A365D,#2B6CB0)' },
    { id: '2', title: 'Patient Registration', desc: 'Secure clinical account setup', icon: Users, path: '/doctor-home', gradient: 'linear-gradient(135deg,#285E61,#319795)' },
    { id: '3', title: 'Doctor Profiles', desc: 'Qualifications & Specializations', icon: UserCircle, path: '/doctor-home', gradient: 'linear-gradient(135deg,#44337A,#553C9A)' },
    { id: '4', title: 'Medical History', desc: 'Access clinical patient records', icon: History, path: '/doctor-home', gradient: 'linear-gradient(135deg,#22543D,#276749)' },
    { id: '5', title: 'Lab Reports Hub', desc: 'Review & approve test results', icon: FileSpreadsheet, path: '/doctor-home', gradient: 'linear-gradient(135deg,#0E7490,#0891B2)' },
    { id: '6', title: 'E-Prescription Sys.', desc: 'Digital drug & dose management', icon: FileText, path: '/doctor-home', gradient: 'linear-gradient(135deg,#2A4365,#2C5282)' },
    { id: '7', title: 'Tele-Consultation', desc: 'Virtual video appointments', icon: Video, path: '/telemedicine', gradient: 'linear-gradient(135deg,#234E52,#285E61)' },
    { id: '8', title: 'Billing & Payments', desc: 'Consultation fee & revenue tracking', icon: CreditCard, path: '/doctor-home', gradient: 'linear-gradient(135deg,#7B341E,#9C4221)' },
    { id: '9', title: 'Clinical Alerts', desc: 'Real-time patient notifications', icon: Bell, path: '/doctor-home', gradient: 'linear-gradient(135deg,#1A365D,#2A4365)' },
    
    // 🏥 Clinic Management (Admin Side)
    { id: '10', title: 'Management Dashboard', desc: 'Overall clinic operations overview', icon: LayoutDashboard, path: '/doctor-home', gradient: 'linear-gradient(135deg,#5B21B6,#7C3AED)' },
    { id: '11', title: 'EHR Master System', desc: 'Enterprise patient data storage', icon: BookOpen, path: '/doctor-home', gradient: 'linear-gradient(135deg,#064E3B,#059669)' },
    { id: '12', title: 'Pharmacy Inventory', desc: 'Medicines & supplies tracking', icon: Package, path: '/doctor-home', gradient: 'linear-gradient(135deg,#7C2D12,#D97706)' },
    { id: '13', title: 'Invoice Generation', desc: 'Professional billing & receipts', icon: Receipt, path: '/doctor-home', gradient: 'linear-gradient(135deg,#312E81,#4F46E5)' },
    { id: '14', title: 'Staff Roster', desc: 'Nurses & receptionist management', icon: Briefcase, path: '/doctor-home', gradient: 'linear-gradient(135deg,#1E3A8A,#2563EB)' },
    { id: '15', title: 'Clinical Analytics', desc: 'Revenue & patient trend insights', icon: PieChart, path: '/doctor-home', gradient: 'linear-gradient(135deg,#4C1D95,#7C3AED)' },
    
    // 💬 Communication & Compliance
    { id: '16', title: 'Secure Messaging', desc: 'Doctor-Patient encrypted gateway', icon: MessageSquare, path: '/doctor-home', gradient: 'linear-gradient(135deg,#1A365D,#3182CE)' },
    { id: '17', title: 'Clinic Chatbots', desc: 'Automated 24/7 basic support', icon: Bot, path: '/doctor-home', gradient: 'linear-gradient(135deg,#064E3B,#10B981)' },
    { id: '18', title: 'HIPAA Compliance', desc: 'Security & encryption monitoring', icon: Shield, path: '/doctor-home', gradient: 'linear-gradient(135deg,#7F1D1D,#DC2626)' },
  ];

  return (
    <div className="animate-fade-in pb-12 bg-primary min-h-screen px-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 mt-8 gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
             <span className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-[10px] font-black text-blue-400 uppercase tracking-widest">Clinical Portal</span>
             <span className="text-[10px] text-text-muted font-bold uppercase tracking-widest">ID: {user?.id?.slice(0,8) || 'DOC-882'}</span>
          </div>
          <h1 className="text-[32px] font-black text-text-primary tracking-tighter">
            Welcome, Dr. {firstName} <span aria-hidden="true">👨‍⚕️</span>
          </h1>
          <p className="text-[14px] font-medium text-text-secondary mt-1">
             Medical Director • LungDetect Clinical Network
          </p>
        </div>

        <div className="flex items-center gap-3">
           <div className="bg-card border border-border-subtle rounded-2xl p-4 flex items-center gap-4 shadow-xl">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 border border-emerald-500/20">
                 <Activity size={20} />
              </div>
              <div>
                 <p className="text-[10px] text-text-muted font-bold uppercase tracking-widest">Clinic Status</p>
                 <p className="text-sm font-black text-white">System Optimal</p>
              </div>
           </div>
           <button className="h-14 w-14 rounded-2xl bg-white text-gray-900 flex items-center justify-center shadow-xl hover:scale-105 transition active:scale-95">
              <Plus size={24} />
           </button>
        </div>
      </div>

      {/* Clinical Command Center area */}
      <div className="mb-8 flex items-center text-text-primary">
        <Stethoscope size={20} className="mr-3 text-blue-400" />
        <h2 className="text-[13px] font-black uppercase tracking-[0.3em] text-white/60">Clinical Command Center</h2>
      </div>

      {/* Grid of Clinical Modules */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
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

      {/* Security Footer */}
      <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 opacity-60">
         <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
               <Shield size={14} className="text-emerald-500" />
               <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">HIPAA Compliant</span>
            </div>
            <div className="flex items-center gap-2">
               <Shield size={14} className="text-blue-500" />
               <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">AES-256 Encrypted</span>
            </div>
         </div>
         <p className="text-[10px] font-medium text-text-muted">© 2024 LungDetect AI Healthcare Solutions</p>
      </div>
    </div>
  );
}
