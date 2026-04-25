import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/ui/Card';
import { useAuth } from '../context/AuthContext';
import { 
  Calendar, Users, UserCircle, History, FileSpreadsheet, 
  FileText, Video, CreditCard, Bell, LayoutDashboard, 
  BookOpen, ClipboardList, Receipt, Package, Briefcase, 
  PieChart, MessageSquare, Bot, Shield, Stethoscope,
  Search, Plus, Activity, Heart, ShieldCheck
} from 'lucide-react';

export default function DoctorHome() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  
  const firstName = user?.user_metadata?.first_name || user?.email?.split('@')[0] || 'Doctor';

  const sections = [
    {
      title: "Patient-Facing Services",
      icon: <UserCircle size={18} className="text-blue-400" />,
      cards: [
        { id: '1', title: 'Online Booking', desc: 'Appointment schedules', icon: Calendar, path: '/doctor-booking', gradient: 'linear-gradient(135deg,#2B6CB0,#4299E1)' },
        { id: '2', title: 'Patient Registration', desc: 'Secure clinical accounts', icon: Users, path: '/doctor-patient-reg', gradient: 'linear-gradient(135deg,#319795,#4FD1C5)' },
        { id: '3', title: 'Doctor Profiles', desc: 'Credentials & Experience', icon: UserCircle, path: '/doctor-profiles', gradient: 'linear-gradient(135deg,#553C9A,#805AD5)' },
        { id: '4', title: 'Medical History', desc: 'Past visits & records', icon: History, path: '/doctor-home', gradient: 'linear-gradient(135deg,#276749,#48BB78)' },
        { id: '5', title: 'Lab Reports', desc: 'Downloadable results', icon: FileSpreadsheet, path: '/doctor-home', gradient: 'linear-gradient(135deg,#086F83,#0BC5EA)' },
        { id: '6', title: 'E-Prescriptions', desc: 'Digital prescriptions', icon: FileText, path: '/doctor-home', gradient: 'linear-gradient(135deg,#2C5282,#63B3ED)' },
        { id: '7', title: 'Telemedicine', desc: 'Virtual consultations', icon: Video, path: '/telemedicine', gradient: 'linear-gradient(135deg,#285E61,#81E6D9)' },
        { id: '8', title: 'Billing & Payments', desc: 'Collect fees online', icon: CreditCard, path: '/doctor-home', gradient: 'linear-gradient(135deg,#9C4221,#FC8181)' },
        { id: '9', title: 'Reminders', desc: 'Appointment alerts', icon: Bell, path: '/doctor-home', gradient: 'linear-gradient(135deg,#2A4365,#4299E1)' },
      ]
    },
    {
      title: "Clinic Management",
      icon: <LayoutDashboard size={18} className="text-emerald-400" />,
      cards: [
        { id: '10', title: 'Appt. Dashboard', desc: 'Manage visit schedule', icon: LayoutDashboard, path: '/doctor-schedule', gradient: 'linear-gradient(135deg,#702459,#F687B3)' },
        { id: '11', title: 'EHR System', desc: 'Electronic health storage', icon: BookOpen, path: '/doctor-home', gradient: 'linear-gradient(135deg,#1D4044,#4FD1C5)' },
        { id: '12', title: 'Prescription Sys.', desc: 'Digital management', icon: ClipboardList, path: '/doctor-home', gradient: 'linear-gradient(135deg,#2A4365,#90CDF4)' },
        { id: '13', title: 'Invoice Gen.', desc: 'Generate clinical bills', icon: Receipt, path: '/doctor-home', gradient: 'linear-gradient(135deg,#744210,#ECC94B)' },
        { id: '14', title: 'Inventory', desc: 'Medicine & supplies', icon: Package, path: '/doctor-home', gradient: 'linear-gradient(135deg,#1D4044,#319795)' },
        { id: '15', title: 'Staff Roster', desc: 'Personnel management', icon: Briefcase, path: '/doctor-home', gradient: 'linear-gradient(135deg,#2B6CB0,#90CDF4)' },
        { id: '16', title: 'Clinical Analytics', desc: 'Revenue & trends', icon: PieChart, path: '/doctor-home', gradient: 'linear-gradient(135deg,#742A2A,#E53E3E)' },
      ]
    },
    {
      title: "Communication & Security",
      icon: <ShieldCheck size={18} className="text-indigo-400" />,
      cards: [
        { id: '17', title: 'Secure Messaging', desc: 'Encrypted doctor-patient chat', icon: MessageSquare, path: '/doctor-home', gradient: 'linear-gradient(135deg,#2B6CB0,#4299E1)' },
        { id: '18', title: 'Clinical Bot', desc: 'Automated clinic support', icon: Bot, path: '/doctor-home', gradient: 'linear-gradient(135deg,#1C4532,#68D391)' },
        { id: '19', title: 'HIPAA Compliance', desc: 'Security status monitoring', icon: Shield, path: '/doctor-home', gradient: 'linear-gradient(135deg,#2A4365,#90CDF4)' },
      ]
    }
  ];

  return (
    <div className="animate-fade-in pb-20 px-4 md:px-0">
      
      {/* ── UNIFIED HEADER (MATCHING PATIENT HOME) ── */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 mt-8 gap-6">
        <div>
          <h1 className="text-[28px] md:text-[32px] font-light text-text-primary tracking-tight mb-2">
            Good morning, Dr. {firstName} <span aria-hidden="true">👨‍⚕️</span>
          </h1>
          <p className="text-[15px] font-normal text-text-secondary">
            Clinical Portal • Your clinic is performing optimally today.
          </p>
        </div>

        {/* Global Search Bar (Efficient) */}
        <div className="relative w-full md:w-[350px]">
           <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
           <input 
            type="text" 
            placeholder="Search clinical modules..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-blue-500/50 transition-all shadow-xl"
           />
        </div>
      </div>

      {/* ── QUICK STATS (EFFICIENT) ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
         {[
           { l: "Patients Today", v: "18", i: <Users size={16} />, c: "text-blue-400" },
           { l: "Revenue (MTD)", v: "₹1.2L", i: <Activity size={16} />, c: "text-emerald-400" },
           { l: "Pending Reports", v: "06", i: <ClipboardList size={16} />, c: "text-amber-400" },
           { l: "System Health", v: "Secure", i: <ShieldCheck size={16} />, c: "text-blue-400" },
         ].map((stat, i) => (
           <div key={i} className="p-4 bg-card border border-border-subtle rounded-[24px] flex items-center gap-4">
              <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center ${stat.c} border border-white/5`}>
                 {stat.i}
              </div>
              <div>
                 <p className="text-[9px] text-text-muted font-black uppercase tracking-widest">{stat.l}</p>
                 <p className="text-base font-black text-white">{stat.v}</p>
              </div>
           </div>
         ))}
      </div>

      {/* ── MODULAR SECTIONS ── */}
      <div className="space-y-12">
        {sections.map((section, idx) => {
          const filteredCards = section.cards.filter(c => 
            c.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
            c.desc.toLowerCase().includes(searchQuery.toLowerCase())
          );

          if (filteredCards.length === 0) return null;

          return (
            <div key={idx}>
              <div className="mb-6 flex items-center text-text-primary">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center mr-3 border border-white/5">
                   {section.icon}
                </div>
                <h2 className="text-[16px] font-bold tracking-tight uppercase tracking-widest text-white/60">{section.title}</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredCards.map((card) => (
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
        })}
      </div>
    </div>
  );
}
