import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, Calendar, FileText, ClipboardList, Package, 
  Settings, MessageSquare, ShieldCheck, Activity, 
  TrendingUp, Video, CreditCard, Bell, LogOut, Search,
  Plus, MoreVertical, UserCheck, Heart, Stethoscope, 
  Zap, PieChart, Shield, LayoutDashboard, Globe,
  Mail, Smartphone, BookOpen, Layers, Briefcase, Database,
  ArrowUpRight, Download, CheckCircle, Clock, AlertTriangle
} from 'lucide-react';

export default function DoctorHome() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const CLINIC_MENU = [
    {
      group: "Operations",
      items: [
        { id: 'dashboard', label: 'Command Center', icon: <LayoutDashboard size={18} /> },
        { id: 'appointments', label: 'Appointment Manager', icon: <Calendar size={18} /> },
        { id: 'ehr', label: 'Electronic Records', icon: <BookOpen size={18} /> },
      ]
    },
    {
      group: "Patient Care",
      items: [
        { id: 'telemedicine', label: 'Tele-Consultation', icon: <Video size={18} /> },
        { id: 'prescriptions', label: 'E-Prescription Hub', icon: <FileText size={18} /> },
        { id: 'reports', label: 'Lab Reports', icon: <Layers size={18} /> },
      ]
    },
    {
      group: "Administration",
      items: [
        { id: 'billing', label: 'Revenue & Billing', icon: <CreditCard size={18} /> },
        { id: 'inventory', label: 'Medical Inventory', icon: <Package size={18} /> },
        { id: 'staff', label: 'Staff Management', icon: <Briefcase size={18} /> },
        { id: 'analytics', label: 'Clinical Analytics', icon: <PieChart size={18} /> },
      ]
    },
    {
      group: "Communication",
      items: [
        { id: 'messaging', label: 'Secure Messaging', icon: <MessageSquare size={18} /> },
        { id: 'notifications', label: 'System Alerts', icon: <Bell size={18} /> },
      ]
    }
  ];

  return (
    <div className="flex h-screen bg-[#06080c] text-white overflow-hidden animate-fade-in font-sans">
      
      {/* ── CLINICAL SIDEBAR ── */}
      <aside className="w-[280px] border-r border-white/5 bg-[#0a0c10] flex flex-col z-50">
        <div className="p-8 mb-4">
           <div className="flex items-center gap-3 mb-1">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-600/20">
                 <ShieldCheck className="text-white" size={24} />
              </div>
              <div>
                 <h2 className="text-lg font-black tracking-tighter leading-none">Clinical</h2>
                 <p className="text-[10px] text-blue-400 font-bold uppercase tracking-widest mt-1">Command Center</p>
              </div>
           </div>
        </div>

        <nav className="flex-1 px-4 space-y-8 overflow-y-auto scrollbar-none pb-10">
           {CLINIC_MENU.map((group, idx) => (
             <div key={idx} className="space-y-1">
                <h3 className="px-4 text-[10px] text-white/30 font-black uppercase tracking-[0.2em] mb-3">{group.group}</h3>
                {group.items.map((item) => (
                  <button 
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full group flex items-center gap-3.5 px-4 py-3 rounded-2xl transition-all duration-300 ${activeTab === item.id ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/20' : 'text-white/50 hover:bg-white/5 hover:text-white'}`}
                  >
                     {item.icon}
                     <span className="text-xs font-bold tracking-tight">{item.label}</span>
                     {activeTab === item.id && <motion.div layoutId="activeInd" className="ml-auto w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_10px_#fff]" />}
                  </button>
                ))}
             </div>
           ))}
        </nav>

        <div className="p-6 border-t border-white/5 bg-black/20">
           <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center font-black text-xs">RS</div>
              <div>
                 <p className="text-xs font-bold text-white">Dr. Rajesh Samana</p>
                 <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest">Medical Director</p>
              </div>
           </div>
           <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 text-rose-400 hover:bg-rose-500/10 transition-all text-xs font-black uppercase tracking-widest">
              <LogOut size={16} /> Close Portal
           </button>
        </div>
      </aside>

      {/* ── WORKSPACE ── */}
      <main className="flex-1 flex flex-col overflow-y-auto bg-primary relative">
         
         {/* Top Navigation Bar */}
         <header className="h-[80px] px-10 border-b border-white/5 flex justify-between items-center bg-[#0a0c10]/40 backdrop-blur-3xl sticky top-0 z-40">
            <div className="flex items-center gap-6">
               <h2 className="text-xl font-black text-white tracking-tight uppercase tracking-[0.2em]">
                  {CLINIC_MENU.flatMap(g => g.items).find(i => i.id === activeTab)?.label}
               </h2>
               <div className="h-4 w-px bg-white/10" />
               <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_#10b981]" />
                  <span className="text-[10px] text-emerald-500 font-black uppercase tracking-widest">Live Clinical Engine</span>
               </div>
            </div>
            
            <div className="flex items-center gap-6">
               <div className="flex gap-2">
                  <button className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/5 text-white/60 hover:text-white transition-all"><Search size={18} /></button>
                  <button className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/5 text-white/60 hover:text-white transition-all relative">
                     <Bell size={18} />
                     <div className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-[#0a0c10]" />
                  </button>
               </div>
               <button className="px-6 py-3 bg-blue-600 text-white rounded-xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-blue-600/20 hover:scale-105 transition active:scale-95 flex items-center gap-2">
                  <Plus size={16} /> New Patient Entry
               </button>
            </div>
         </header>

         {/* Content Area */}
         <div className="p-10 space-y-10">
            <AnimatePresence mode="wait">
               <motion.div 
                 key={activeTab}
                 initial={{ opacity: 0, x: 20 }}
                 animate={{ opacity: 1, x: 0 }}
                 exit={{ opacity: 0, x: -20 }}
                 className="space-y-10"
               >
                  {activeTab === 'dashboard' ? (
                     <div className="space-y-10">
                        {/* Real-time Stats Grid */}
                        <div className="grid grid-cols-4 gap-6">
                           {[
                              { l: "Patients Today", v: "24", i: <Users className="text-blue-400" />, t: "+15% this week" },
                              { l: "Critical Cases", v: "03", i: <AlertTriangle className="text-rose-500" />, t: "Immediate Action" },
                              { l: "Revenue (MTD)", v: "₹1.2L", i: <TrendingUp className="text-emerald-500" />, t: "Target: ₹1.5L" },
                              { l: "Active Consults", v: "06", i: <Video className="text-blue-500" />, t: "Telemedicine Active" },
                           ].map((s, idx) => (
                              <div key={idx} className="p-6 bg-card border border-border-subtle rounded-[32px] shadow-2xl group hover:border-blue-500/30 transition-all">
                                 <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/5 mb-6 group-hover:scale-110 transition-transform">{s.i}</div>
                                 <h3 className="text-3xl font-black text-white tracking-tighter mb-1">{s.v}</h3>
                                 <p className="text-[10px] text-white/40 font-bold uppercase tracking-[0.2em] mb-4">{s.l}</p>
                                 <div className="flex items-center justify-between">
                                    <span className="text-[9px] font-black text-blue-400 uppercase tracking-widest">{s.t}</span>
                                    <ArrowUpRight size={14} className="text-white/20" />
                                 </div>
                              </div>
                           ))}
                        </div>

                        {/* Middle Section: Queue & Clinical Feed */}
                        <div className="grid grid-cols-12 gap-10">
                           {/* Patient Queue */}
                           <div className="col-span-8 p-8 bg-card border border-border-subtle rounded-[48px] shadow-3xl">
                              <div className="flex justify-between items-center mb-8">
                                 <div>
                                    <h3 className="text-xl font-black text-white tracking-tight">Active Clinical Queue</h3>
                                    <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest mt-1">Live Management • 4 Waiting</p>
                                 </div>
                                 <div className="flex gap-2">
                                    <button className="px-4 py-2 bg-white/5 border border-white/5 rounded-xl text-[10px] font-black uppercase tracking-widest text-white/60">History</button>
                                    <button className="px-4 py-2 bg-blue-600 rounded-xl text-[10px] font-black uppercase tracking-widest text-white">Full Queue</button>
                                 </div>
                              </div>
                              <div className="space-y-4">
                                 {[
                                    { name: 'Arjun Mehra', id: '#P-8821', time: '14:30', status: 'In Consultation', type: 'Post-Op' },
                                    { name: 'Priya Das', id: '#P-8845', time: '15:00', status: 'Waiting', type: 'Initial Screening' },
                                    { name: 'Suresh Raina', id: '#P-8890', time: '15:15', status: 'Waiting', type: 'X-Ray Review' },
                                    { name: 'Monica G.', id: '#P-8902', time: '15:45', status: 'Scheduled', type: 'Routine' },
                                 ].map((p, i) => (
                                    <div key={i} className="flex items-center justify-between p-5 bg-white/[0.02] border border-white/5 rounded-3xl hover:bg-white/[0.05] transition group cursor-pointer">
                                       <div className="flex items-center gap-6">
                                          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 flex items-center justify-center text-white font-black text-sm border border-white/5">{p.name[0]}</div>
                                          <div>
                                             <div className="flex items-center gap-3">
                                                <p className="text-sm font-black text-white tracking-tight">{p.name}</p>
                                                <span className="text-[9px] font-bold text-white/30 uppercase tracking-widest">{p.id}</span>
                                             </div>
                                             <p className="text-[11px] text-text-muted font-medium mt-0.5">{p.type} • Scheduled for {p.time}</p>
                                          </div>
                                       </div>
                                       <div className="flex items-center gap-6">
                                          <div className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest ${p.status === 'In Consultation' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' : p.status === 'Waiting' ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' : 'bg-white/5 text-white/40 border border-white/5'}`}>
                                             {p.status}
                                          </div>
                                          <button className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/40 hover:text-white transition"><MoreVertical size={18} /></button>
                                       </div>
                                    </div>
                                 ))}
                              </div>
                           </div>

                           {/* Right Sidebar: Quick Actions & Compliance */}
                           <div className="col-span-4 space-y-8">
                              <div className="p-8 bg-blue-600 border border-blue-500 rounded-[48px] shadow-[0_20px_50px_-15px_rgba(37,99,235,0.4)] relative overflow-hidden group">
                                 <div className="absolute top-[-20%] right-[-20%] w-[150px] h-[150px] bg-white/10 rounded-full blur-[40px] group-hover:scale-150 transition-transform duration-700" />
                                 <Zap size={28} className="text-white mb-6" />
                                 <h3 className="text-2xl font-black text-white tracking-tighter mb-2">Telemedicine Portal</h3>
                                 <p className="text-xs text-white/80 font-medium leading-relaxed mb-8">You have 2 virtual appointments waiting in the clinical lobby.</p>
                                 <button className="w-full py-4 bg-white text-blue-600 rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl hover:scale-[1.02] transition active:scale-95">Open Video Portal</button>
                              </div>

                              <div className="p-8 bg-card border border-border-subtle rounded-[48px]">
                                 <div className="flex items-center gap-4 mb-8">
                                    <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500">
                                       <ShieldCheck size={28} />
                                    </div>
                                    <div>
                                       <h4 className="text-sm font-black text-white uppercase tracking-wider">HIPAA Compliant</h4>
                                       <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest mt-0.5">Enterprise Security Active</p>
                                    </div>
                                 </div>
                                 <div className="space-y-4">
                                    <div className="flex justify-between text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">
                                       <span>System Health</span>
                                       <span>99.9% Optimal</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                       <motion.div initial={{ width: 0 }} animate={{ width: '99.9%' }} transition={{ duration: 2 }} className="h-full bg-emerald-500 shadow-[0_0_10px_#10b981]" />
                                    </div>
                                    <div className="flex items-center gap-3 pt-2">
                                       <CheckCircle size={12} className="text-emerald-500" />
                                       <span className="text-[9px] text-white/40 font-bold uppercase tracking-widest">End-to-End Encryption Enabled</span>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>

                        {/* Bottom Row: Recent Reports & Inventory */}
                        <div className="grid grid-cols-2 gap-10">
                           <div className="p-8 bg-card border border-border-subtle rounded-[48px]">
                              <h3 className="text-sm font-black text-white uppercase tracking-[0.2em] mb-8">Clinical Reports Pending</h3>
                              <div className="space-y-4">
                                 {[1, 2].map(i => (
                                    <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                                       <div className="flex items-center gap-4">
                                          <FileText className="text-blue-400" size={20} />
                                          <div>
                                             <p className="text-xs font-bold text-white">X-Ray Analysis - Patient #8841</p>
                                             <p className="text-[9px] text-white/30 font-bold uppercase mt-0.5">High Priority • Radiologist Review Needed</p>
                                          </div>
                                       </div>
                                       <button className="p-2.5 rounded-xl bg-white/5 text-white/40 hover:text-white transition"><Download size={16}/></button>
                                    </div>
                                 ))}
                              </div>
                           </div>
                           <div className="p-8 bg-card border border-border-subtle rounded-[48px]">
                              <h3 className="text-sm font-black text-white uppercase tracking-[0.2em] mb-8">Clinic Inventory Status</h3>
                              <div className="grid grid-cols-2 gap-4">
                                 {[
                                    { l: 'Antibiotics', v: '82%', c: 'text-emerald-500' },
                                    { l: 'Ventilator Masks', v: '12%', c: 'text-rose-500' }
                                 ].map((item, i) => (
                                    <div key={i} className="p-4 bg-white/5 rounded-2xl border border-white/5">
                                       <p className="text-[9px] text-white/30 font-black uppercase tracking-widest mb-1">{item.l}</p>
                                       <div className="flex items-end justify-between">
                                          <span className={`text-xl font-black ${item.c}`}>{item.v}</span>
                                          <span className="text-[8px] text-white/20 font-bold uppercase">Restock Hub</span>
                                       </div>
                                    </div>
                                 ))}
                              </div>
                           </div>
                        </div>
                     </div>
                  ) : (
                     <div className="flex flex-col items-center justify-center py-48 bg-card border border-dashed border-white/10 rounded-[56px] text-center">
                        <div className="w-24 h-24 rounded-[40px] bg-white/5 flex items-center justify-center text-white/10 mb-10 border border-white/10">
                           {CLINIC_MENU.flatMap(g => g.items).find(i => i.id === activeTab)?.icon}
                        </div>
                        <h2 className="text-3xl font-black text-white tracking-tighter mb-4">{CLINIC_MENU.flatMap(g => g.items).find(i => i.id === activeTab)?.label} Hub</h2>
                        <p className="text-base text-text-secondary max-w-[450px] leading-relaxed font-medium">
                           This specialized clinical module is synchronized with the LungDetect AI master records. 
                           Select a patient record to begin management.
                        </p>
                        <button className="mt-10 px-10 py-4 bg-blue-600 text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl shadow-2xl shadow-blue-600/20 hover:scale-105 transition active:scale-95 flex items-center gap-3">
                           <Plus size={16} /> New Record Entry
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
