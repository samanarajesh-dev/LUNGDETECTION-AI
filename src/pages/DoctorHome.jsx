import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, Users, UserCircle, History, FileSpreadsheet, 
  FileText, Video, CreditCard, Bell, LayoutDashboard, 
  BookOpen, ClipboardList, Receipt, Package, Briefcase, 
  PieChart, MessageSquare, Bot, Shield, Stethoscope,
  Search, Plus, Activity, Heart, ShieldCheck, Zap,
  ArrowRight, Sparkles, TrendingUp, Monitor
} from 'lucide-react';

// Enhanced Premium Card Component
const PremiumCard = ({ title, description, icon: Icon, gradient, onClick, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.05, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
    whileHover={{ y: -8, scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className="group relative cursor-pointer"
  >
    {/* Animated Border Glow */}
    <div className="absolute -inset-[1px] bg-gradient-to-r from-white/0 via-white/20 to-white/0 rounded-[32px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    
    <div className="relative h-full p-8 bg-[#0a0c12]/80 backdrop-blur-3xl border border-white/5 rounded-[32px] shadow-2xl overflow-hidden">
       {/* Background Accent */}
       <div 
        className="absolute -right-10 -top-10 w-32 h-32 blur-[60px] opacity-20 transition-all duration-700 group-hover:opacity-40 group-hover:scale-150" 
        style={{ background: gradient }}
       />

       <div className="flex flex-col h-full relative z-10">
          <div 
            className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-2xl transition-transform duration-500 group-hover:scale-110 border border-white/10"
            style={{ background: gradient }}
          >
             <Icon size={28} className="text-white drop-shadow-lg" />
          </div>

          <div className="flex-1">
             <h3 className="text-lg font-black text-white tracking-tight mb-2 group-hover:text-blue-400 transition-colors">
                {title}
             </h3>
             <p className="text-[13px] text-white/40 font-medium leading-relaxed">
                {description}
             </p>
          </div>

          <div className="mt-8 flex items-center gap-2 text-[10px] font-black text-white/20 uppercase tracking-[0.2em] group-hover:text-white/60 transition-colors">
             Explore Module <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
          </div>
       </div>
    </div>
  </motion.div>
);

export default function DoctorHome() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  
  const sections = [
    {
      title: "Patient-Facing Services",
      icon: <UserCircle size={18} className="text-blue-400" />,
      cards: [
        { id: '1', title: 'Online Booking', desc: 'Enterprise-grade appointment scheduling & management', icon: Calendar, path: '/doctor-booking', gradient: 'linear-gradient(135deg,#2563eb,#4f46e5)' },
        { id: '2', title: 'Patient Registration', desc: 'Secure clinical onboarding & digital record setup', icon: Users, path: '/doctor-patient-reg', gradient: 'linear-gradient(135deg,#059669,#10b981)' },
        { id: '3', title: 'Doctor Profiles', desc: 'Professional credentials & specialist network info', icon: UserCircle, path: '/doctor-profiles', gradient: 'linear-gradient(135deg,#7c3aed,#8b5cf6)' },
        { id: '4', title: 'Medical History', desc: 'Deep-dive into longitudinal patient health records', icon: History, path: '/doctor-home', gradient: 'linear-gradient(135deg,#0d9488,#14b8a6)' },
        { id: '5', title: 'Lab Reports Hub', desc: 'Review, approve & distribute clinical test results', icon: FileSpreadsheet, path: '/doctor-home', gradient: 'linear-gradient(135deg,#0891b2,#06b6d4)' },
        { id: '6', title: 'E-Prescription Sys.', desc: 'High-precision digital drug & dose management', icon: FileText, path: '/doctor-home', gradient: 'linear-gradient(135deg,#2563eb,#60a5fa)' },
      ]
    },
    {
      title: "Clinic Management",
      icon: <Monitor size={18} className="text-emerald-400" />,
      cards: [
        { id: '10', title: 'Schedule Dashboard', desc: 'Full-spectrum clinical queue & visit management', icon: LayoutDashboard, path: '/doctor-schedule', gradient: 'linear-gradient(135deg,#be185d,#db2777)' },
        { id: '11', title: 'EHR Master System', desc: 'Secure enterprise storage for health informatics', icon: BookOpen, path: '/doctor-home', gradient: 'linear-gradient(135deg,#155e75,#0891b2)' },
        { id: '12', title: 'Pharmacy Inventory', desc: 'Real-time tracking of medicine & medical supplies', icon: Package, path: '/doctor-home', gradient: 'linear-gradient(135deg,#b45309,#d97706)' },
        { id: '13', title: 'Revenue & Invoicing', desc: 'Clinical billing, insurance & revenue generation', icon: Receipt, path: '/doctor-home', gradient: 'linear-gradient(135deg,#4338ca,#4f46e5)' },
        { id: '14', title: 'Staff Roster Hub', desc: 'Role management for nurses, staff & clinicians', icon: Briefcase, path: '/doctor-home', gradient: 'linear-gradient(135deg,#1e40af,#3b82f6)' },
        { id: '15', title: 'Analytics Center', desc: 'Deep data insights into clinical performance', icon: PieChart, path: '/doctor-home', gradient: 'linear-gradient(135deg,#7f1d1d,#dc2626)' },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#06080c] animate-fade-in pb-32">
      
      {/* ── AMBIENT BACKGROUND GLOWS ── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
         <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px]" />
         <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/10 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        
        {/* ── ULTIMATE HEADER ── */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-20 mt-16 gap-10">
          <div>
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3 mb-4"
            >
               <span className="px-4 py-1.5 bg-blue-600/10 border border-blue-500/20 rounded-full text-[11px] font-black text-blue-400 uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(37,99,235,0.1)]">Clinical Operations Center</span>
               <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_#10b981]" />
                  <span className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest">Master Node Active</span>
               </div>
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-[40px] md:text-[56px] font-black text-white tracking-tighter leading-[0.9] mb-4"
            >
              Welcome back, <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Dr. Rajesh Samana</span>
            </motion.h1>
            <p className="text-base text-white/40 font-medium max-w-[500px]">
              Your clinical network is operating at 99.9% efficiency. 24 patients scheduled for today’s pulmonary screening.
            </p>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="w-full lg:w-auto flex flex-col md:flex-row items-center gap-6"
          >
             {/* Dynamic Search */}
             <div className="relative group w-full md:w-[400px]">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                   <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-hover:text-blue-400 transition-colors" size={20} />
                   <input 
                    type="text" 
                    placeholder="Command search clinical modules..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-[#0a0c12]/60 backdrop-blur-2xl border border-white/5 rounded-2xl py-5 pl-14 pr-6 text-sm text-white focus:outline-none focus:border-blue-500/30 transition-all shadow-2xl"
                   />
                </div>
             </div>
             
             <div className="flex items-center gap-4">
                <button className="h-[60px] px-8 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-[0_20px_40px_-10px_rgba(37,99,235,0.4)] hover:scale-105 transition active:scale-95 flex items-center gap-3">
                   <Plus size={20} /> New Admission
                </button>
             </div>
          </motion.div>
        </div>

        {/* ── REAL-TIME ANALYTICS BAR (PREMIUM) ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
           {[
             { l: "Patients On-Site", v: "24", i: <Users size={20} />, c: "from-blue-600/20 to-transparent", t: "↑ 12% vs last week" },
             { l: "Critical Alerts", v: "02", i: <AlertTriangle size={20} />, c: "from-rose-600/20 to-transparent", t: "Immediate review needed" },
             { l: "Clinical Efficiency", v: "98%", i: <Zap size={20} />, c: "from-emerald-600/20 to-transparent", t: "Optimal performance" },
             { l: "Revenue Trend", v: "₹4.8L", i: <TrendingUp size={20} />, c: "from-indigo-600/20 to-transparent", t: "Q2 target: 85% achieved" },
           ].map((stat, i) => (
             <motion.div 
               key={i} 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.3 + (i * 0.1) }}
               className="p-8 bg-[#0a0c12]/40 backdrop-blur-2xl border border-white/5 rounded-[40px] relative overflow-hidden group hover:border-white/10 transition-all shadow-xl"
             >
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.c} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
                <div className="relative z-10">
                   <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white/40 mb-6 group-hover:scale-110 transition-transform">
                      {stat.i}
                   </div>
                   <h3 className="text-4xl font-black text-white tracking-tighter mb-1">{stat.v}</h3>
                   <p className="text-[11px] text-white/30 font-black uppercase tracking-[0.2em] mb-4">{stat.l}</p>
                   <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500/40" />
                      <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">{stat.t}</span>
                   </div>
                </div>
             </motion.div>
           ))}
        </div>

        {/* ── MODULAR CORE ── */}
        <div className="space-y-24">
          {sections.map((section, idx) => {
            const filteredCards = section.cards.filter(c => 
              c.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
              c.desc.toLowerCase().includes(searchQuery.toLowerCase())
            );

            if (filteredCards.length === 0) return null;

            return (
              <div key={idx} className="relative">
                <div className="mb-10 flex items-center gap-4">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                  <div className="flex items-center gap-3 px-6">
                     <span className="text-[14px] font-black uppercase tracking-[0.4em] text-white/60">{section.title}</span>
                  </div>
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredCards.map((card, cidx) => (
                    <PremiumCard 
                      key={card.id}
                      index={cidx}
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

        {/* ── SECURITY FOOTER ── */}
        <div className="mt-40 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10 opacity-40">
           <div className="flex items-center gap-10">
              <div className="flex items-center gap-3">
                 <Shield size={16} className="text-emerald-500" />
                 <span className="text-[11px] font-black text-white uppercase tracking-widest">HIPAA Enterprise Compliant</span>
              </div>
              <div className="flex items-center gap-3">
                 <Shield size={16} className="text-blue-500" />
                 <span className="text-[11px] font-black text-white uppercase tracking-widest">AES-256 Quantum Secure</span>
              </div>
           </div>
           <div className="flex items-center gap-3 text-[11px] font-black text-white uppercase tracking-widest">
              <Sparkles size={16} className="text-amber-400" /> Powered by LungDetect Clinical AI
           </div>
        </div>
      </div>
    </div>
  );
}

// Missing icon from imports fix
function AlertTriangle(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </svg>
  )
}
