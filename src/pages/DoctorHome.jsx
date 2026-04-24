import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/ui/Card';
import { useAuth } from '../context/AuthContext';
import { 
  Calendar, Users, UserCircle, History, FileSpreadsheet, 
  FileText, Video, CreditCard, Bell, LayoutDashboard, 
  BookOpen, ClipboardList, Receipt, Package, Briefcase, 
  PieChart, MessageSquare, Bot, Shield, Stethoscope
} from 'lucide-react';

export default function DoctorHome() {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const firstName = user?.user_metadata?.first_name || user?.email?.split('@')[0] || 'Doctor';

  const cards = [
    // 🩺 Patient-Facing Features
    { id: '1', title: 'Online Booking', desc: 'Manage appointment schedules', icon: Calendar, path: '/doctor-home', gradient: 'linear-gradient(135deg,#2B6CB0,#4299E1)' },
    { id: '2', title: 'Patient Accounts', desc: 'Manage secure patient logins', icon: Users, path: '/doctor-home', gradient: 'linear-gradient(135deg,#319795,#4FD1C5)' },
    { id: '3', title: 'Doctor Profiles', desc: 'Update qualifications & info', icon: UserCircle, path: '/doctor-home', gradient: 'linear-gradient(135deg,#553C9A,#805AD5)' },
    { id: '4', title: 'Medical History', desc: 'Access past visits & records', icon: History, path: '/doctor-home', gradient: 'linear-gradient(135deg,#276749,#48BB78)' },
    { id: '5', title: 'Lab Reports', desc: 'Downloadable test results', icon: FileSpreadsheet, path: '/doctor-home', gradient: 'linear-gradient(135deg,#086F83,#0BC5EA)' },
    { id: '6', title: 'E-Prescriptions', desc: 'Digital prescription management', icon: FileText, path: '/doctor-home', gradient: 'linear-gradient(135deg,#2C5282,#63B3ED)' },
    { id: '7', title: 'Telemedicine', desc: 'Virtual video consultations', icon: Video, path: '/telemedicine', gradient: 'linear-gradient(135deg,#285E61,#81E6D9)' },
    { id: '8', title: 'Payments', desc: 'Pay consultation fees online', icon: CreditCard, path: '/doctor-home', gradient: 'linear-gradient(135deg,#9C4221,#FC8181)' },
    { id: '9', title: 'Notifications', desc: 'Alerts for appointments', icon: Bell, path: '/doctor-home', gradient: 'linear-gradient(135deg,#2A4365,#4299E1)' },
    
    // 🏥 Clinic Management Features
    { id: '10', title: 'Appt. Dashboard', desc: 'Schedule & cancel visits', icon: LayoutDashboard, path: '/doctor-home', gradient: 'linear-gradient(135deg,#702459,#F687B3)' },
    { id: '11', title: 'EHR System', desc: 'Electronic health data storage', icon: BookOpen, path: '/doctor-home', gradient: 'linear-gradient(135deg,#1D4044,#4FD1C5)' },
    { id: '12', title: 'Prescription Sys.', desc: 'Clinical drug management', icon: ClipboardList, path: '/doctor-home', gradient: 'linear-gradient(135deg,#2A4365,#90CDF4)' },
    { id: '13', title: 'Invoicing', desc: 'Billing & revenue generation', icon: Receipt, path: '/doctor-home', gradient: 'linear-gradient(135deg,#744210,#ECC94B)' },
    { id: '14', title: 'Inventory', desc: 'Supplies & medicine tracking', icon: Package, path: '/doctor-home', gradient: 'linear-gradient(135deg,#1D4044,#319795)' },
    { id: '15', title: 'Staff Management', desc: 'Roles for clinic personnel', icon: Briefcase, path: '/doctor-home', gradient: 'linear-gradient(135deg,#2B6CB0,#90CDF4)' },
    { id: '16', title: 'Analytics', desc: 'Clinical revenue insights', icon: PieChart, path: '/doctor-home', gradient: 'linear-gradient(135deg,#742A2A,#E53E3E)' },
    
    // 💬 Communication & Security
    { id: '17', title: 'Secure Messaging', desc: 'Doctor-Patient encrypted chat', icon: MessageSquare, path: '/doctor-home', gradient: 'linear-gradient(135deg,#2B6CB0,#4299E1)' },
    { id: '18', title: 'Clinic Chatbots', desc: 'Automated basic support', icon: Bot, path: '/doctor-home', gradient: 'linear-gradient(135deg,#1C4532,#68D391)' },
  ];

  return (
    <div className="animate-fade-in pb-12">
      {/* Header Greeting */}
      <div className="mb-10 mt-8">
        <h1 className="text-[28px] md:text-[32px] font-light text-text-primary tracking-tight mb-2">
          Good morning, Dr. {firstName} <span aria-hidden="true">👨‍⚕️</span>
        </h1>
        <p className="text-[15px] font-normal text-text-secondary">
          Clinical Command Center • Your clinic is performing optimally.
        </p>
      </div>

      {/* Clinical Operations Hub area */}
      <div className="mb-6 flex items-center text-text-primary">
        <Shield size={20} className="mr-2 text-brand-blue-light" />
        <h2 className="text-[18px] font-medium tracking-tight uppercase tracking-widest text-[13px]">Clinical Operations Hub</h2>
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
