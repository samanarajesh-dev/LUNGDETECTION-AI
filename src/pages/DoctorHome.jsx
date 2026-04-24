import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, Calendar, FileText, ClipboardList, Package, 
  Settings, MessageSquare, ShieldCheck, Activity, 
  TrendingUp, Video, CreditCard, Bell, LogOut, Search,
  Plus, MoreVertical, UserCheck, Heart, Stethoscope, 
  Zap, PieChart, Shield, LayoutDashboard, Globe,
  Mail, Smartphone, BookOpen, Layers, Briefcase, Database
} from 'lucide-react';

export default function DoctorHome() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const MENU_GROUPS = [
    {
      group: "Patient-Facing Services",
      items: [
        { id: 'booking', label: 'Online Booking', icon: <Calendar size={18} />, desc: 'Appointment schedule' },
        { id: 'profiles', label: 'Doctor Profiles', icon: <UserCheck size={18} />, desc: 'Qualifications & Info' },
        { id: 'history', label: 'Medical History', icon: <Database size={18} />, desc: 'Past visits & records' },
        { id: 'reports', label: 'Lab Reports', icon: <Layers size={18} />, desc: 'Downloadable results' },
        { id: 'epresc', label: 'E-Prescriptions', icon: <FileText size={18} />, desc: 'Digital prescriptions' },
        { id: 'tele', label: 'Telemedicine', icon: <Video size={18} />, desc: 'Virtual consultations' },
        { id: 'billing', label: 'Billing & Payments', icon: <CreditCard size={18} />, desc: 'Online fee collection' },
        { id: 'notify', label: 'Notifications', icon: <Bell size={18} />, desc: 'Reminders & Alerts' },
      ]
    },
    {
      group: "Clinic Management",
      items: [
        { id: 'dashboard', label: 'Operations Dashboard', icon: <LayoutDashboard size={18} />, desc: 'Daily clinic overview' },
        { id: 'ehr', label: 'EHR System', icon: <BookOpen size={18} />, desc: 'Electronic health data' },
        { id: 'inventory', label: 'Inventory', icon: <Package size={18} />, desc: 'Medicine & Supplies' },
        { id: 'staff', label: 'Staff Management', icon: <Briefcase size={18} />, desc: 'Roles & Permissions' },
        { id: 'analytics', label: 'Analytics Hub', icon: <PieChart size={18} />, desc: 'Revenue & Trends' },
      ]
    },
    {
      group: "Communication & Security",
      items: [
        { id: 'comms', label: 'Secure Messaging', icon: <MessageSquare size={18} />, desc: 'Doctor-Patient Chat' },
        { id: 'security', label: 'Security & Compliance', icon: <Shield size={18} />, desc: 'HIPAA & Encryption' },
      ]
    }
  ];

  return (
    <div className="flex h-screen bg-[#06080c] text-white overflow-hidden animate-fade-in">
      
      {/* ── DOCTOR SIDEBAR ── */}
      <aside className="w-[300px] border-r border-white/5 bg-[#0a0c10] flex flex-col pt-8 pb-6 overflow-y-auto scrollbar-none">
        <div className="px-8 mb-10 flex items-center gap-3">
           <div className="w-10 h-10 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/20">
              <ShieldCheck className="text-white" size={24} />
           </div>
           <div>
              <h2 className="text-lg font-black tracking-tighter">Clinical Portal</h2>
              <p className="text-[10px] text-blue-400 font-bold uppercase tracking-widest">Enterprise Edition</p>
           </div>
        </div>

        <nav className="flex-1 px-4 space-y-8">
           {MENU_GROUPS.map((group, gIdx) => (
             <div key={gIdx} className="space-y-2">
                <h3 className="px-4 text-[10px] text-text-muted font-black uppercase tracking-[0.2em] mb-4">{group.group}</h3>
                {group.items.map((item) => (
                  <button 
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full group flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 ${activeTab === item.id ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/20' : 'text-text-muted hover:bg-white/5 hover:text-white'}`}
                  >
                     <div className={`transition-transform duration-300 ${activeTab === item.id ? 'scale-110' : 'group-hover:scale-110'}`}>
                        {item.icon}
                     </div>
                     <div className="text-left">
                        <p className="text-xs font-bold tracking-tight">{item.label}</p>
                        <p className={`text-[9px] font-medium opacity-60 ${activeTab === item.id ? 'text-white' : ''}`}>{item.desc}</p>
                     </div>
                  </button>
                ))}
             </div>
           ))}
        </nav>

        <div className="px-4 pt-8">
           <button className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl bg-white/5 border border-white/5 text-text-muted hover:text-white hover:bg-white/10 transition-all">
              <LogOut size={18} />
              <span className="text-xs font-bold">Close Session</span>
           </button>
        </div>
      </aside>

      {/* ── MAIN WORKSPACE ── */}
      <main className="flex-1 flex flex-col overflow-y-auto bg-primary">
         
         {/* Top Bar */}
         <header className="h-[80px] px-10 border-b border-white/5 flex justify-between items-center bg-[#0a0c10]/50 backdrop-blur-xl">
            <div>
               <h2 className="text-lg font-black text-white tracking-tight uppercase tracking-widest">
                  {MENU_GROUPS.flatMap(g => g.items).find(i => i.id === activeTab)?.label}
               </h2>
            </div>
            
            <div className="flex items-center gap-8">
               <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] text-emerald-500 font-black uppercase tracking-widest">System Online</span>
               </div>
               
               <div className="flex items-center gap-4">
                  <div className="text-right">
                     <p className="text-xs font-black text-white tracking-tight">Dr. Rajesh Samana</p>
                     <p className="text-[9px] text-text-muted font-bold uppercase tracking-widest">Chief Pulmonologist</p>
                  </div>
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 border border-white/10 flex items-center justify-center font-black text-xs shadow-lg">
                     RS
                  </div>
               </div>
            </div>
         </header>

         {/* Content Area */}
         <div className="p-10 flex-1">
            <AnimatePresence mode="wait">
               <motion.div 
                 key={activeTab}
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0, y: -10 }}
                 className="space-y-10"
               >
                  {activeTab === 'dashboard' ? (
                     <div className="space-y-10">
                        {/* Stats Overview */}
                        <div className="grid grid-cols-4 gap-6">
                           {[
                              { l: "Today's Consults", v: "18", i: <UserCheck className="text-blue-400" />, t: "+4 from yesterday" },
                              { l: "Revenue (Today)", v: "₹8,450", i: <CreditCard className="text-emerald-400" />, t: "Target: ₹10,000" },
                              { l: "Inventory Status", v: "Optimal", i: <Package className="text-amber-400" />, t: "2 items low stock" },
                              { l: "System Security", v: "Secure", i: <ShieldCheck className="text-blue-400" />, t: "AES-256 Active" },
                           ].map((s, idx) => (
                              <div key={idx} className="p-6 bg-card border border-border-subtle rounded-[32px] shadow-2xl">
                                 <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/5 mb-4">{s.i}</div>
                                 <h3 className="text-2xl font-black text-white tracking-tighter mb-1">{s.v}</h3>
                                 <p className="text-[10px] text-text-muted font-bold uppercase tracking-widest mb-3">{s.l}</p>
                                 <div className="text-[9px] font-black text-blue-400 uppercase tracking-widest opacity-60">{s.t}</div>
                              </div>
                           ))}
                        </div>

                        {/* Middle Section */}
                        <div className="grid grid-cols-3 gap-10">
                           <div className="col-span-2 space-y-6">
                              <div className="p-8 bg-card border border-border-subtle rounded-[40px]">
                                 <div className="flex justify-between items-center mb-8">
                                    <h3 className="text-sm font-black text-white uppercase tracking-widest">Active Patient Queue</h3>
                                    <button className="px-4 py-2 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-xl">Manage Queue</button>
                                 </div>
                                 <div className="space-y-4">
                                    {[
                                       { name: 'Arjun Mehra', time: '14:30', status: 'In Consultation', type: 'Post-Op' },
                                       { name: 'Priya Das', time: '15:00', status: 'Waiting', type: 'Initial' },
                                       { name: 'Suresh Raina', time: '15:15', status: 'Waiting', type: 'Emergency' },
                                    ].map((p, i) => (
                                       <div key={i} className="flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded-3xl hover:bg-white/10 transition cursor-pointer">
                                          <div className="flex items-center gap-4">
                                             <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 font-bold text-xs">{p.name[0]}</div>
                                             <div>
                                                <p className="text-xs font-bold text-white">{p.name}</p>
                                                <p className="text-[9px] text-text-muted uppercase tracking-widest mt-0.5">{p.type} • {p.time}</p>
                                             </div>
                                          </div>
                                          <div className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${p.status === 'In Consultation' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'}`}>
                                             {p.status}
                                          </div>
                                       </div>
                                    ))}
                                 </div>
                              </div>
                           </div>

                           <div className="space-y-6">
                              <div className="p-8 bg-blue-600 border border-blue-500 rounded-[40px] shadow-3xl shadow-blue-600/20">
                                 <Zap size={24} className="text-white mb-6" />
                                 <h3 className="text-xl font-black text-white tracking-tight mb-2">Telemedicine Active</h3>
                                 <p className="text-xs text-white/80 font-medium leading-relaxed mb-6">You have 2 virtual appointments scheduled for the next hour.</p>
                                 <button className="w-full py-4 bg-white text-blue-600 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl">Go to Portal</button>
                              </div>
                              
                              <div className="p-8 bg-card border border-border-subtle rounded-[40px]">
                                 <h4 className="text-[10px] text-text-muted font-black uppercase tracking-widest mb-6">Clinic Security Status</h4>
                                 <div className="flex items-center gap-4 mb-6">
                                    <ShieldCheck size={20} className="text-emerald-500" />
                                    <div>
                                       <p className="text-xs font-bold text-white">HIPAA Compliant</p>
                                       <p className="text-[9px] text-text-muted">Last Audit: Today, 08:00</p>
                                    </div>
                                 </div>
                                 <div className="flex items-center gap-4">
                                    <Layers size={20} className="text-blue-500" />
                                    <div>
                                       <p className="text-xs font-bold text-white">End-to-End Encryption</p>
                                       <p className="text-[9px] text-text-muted">AES-256 Standard Active</p>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  ) : (
                     <div className="flex flex-col items-center justify-center py-40 bg-card border border-dashed border-white/10 rounded-[40px] text-center">
                        <div className="w-20 h-20 rounded-[32px] bg-white/5 flex items-center justify-center text-white/20 mb-8 border border-white/10">
                           {MENU_GROUPS.flatMap(g => g.items).find(i => i.id === activeTab)?.icon}
                        </div>
                        <h2 className="text-2xl font-black text-white tracking-tighter mb-4">{MENU_GROUPS.flatMap(g => g.items).find(i => i.id === activeTab)?.label} Module</h2>
                        <p className="text-sm text-text-secondary max-w-[400px] leading-relaxed">
                           This clinical module is currently operational and processing live clinic data. 
                           Select a specific patient record to begin management.
                        </p>
                        <button className="mt-8 px-8 py-3.5 bg-blue-600 text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-blue-600/20 hover:scale-105 transition active:scale-95">
                           Initialize Module
                        </button>
                     </div>
                  )}
               </motion.div>
            </AnimatePresence>
         </div>
      </main>
    </div>
  );
}
