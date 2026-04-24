import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, Calendar, FileText, ClipboardList, Package, 
  Settings, MessageSquare, ShieldCheck, Activity, 
  TrendingUp, Video, CreditCard, Bell, LogOut, Search,
  Plus, MoreVertical, UserCheck, Heart, Stethoscope, Zap
} from 'lucide-react';

export default function DoctorHome() {
  const CLINIC_STATS = [
    { label: 'Today\'s Patients', value: '12', icon: <UserCheck className="text-blue-400" />, trend: '+2 vs yesterday' },
    { label: 'Pending Reports', value: '08', icon: <ClipboardList className="text-amber-400" />, trend: 'High Priority' },
    { label: 'Consultation Fees', value: '₹4,500', icon: <CreditCard className="text-emerald-400" />, trend: '+15% this week' },
    { label: 'Critical Alerts', value: '02', icon: <Activity className="text-rose-400" />, trend: 'Action Required' }
  ];

  const QUICK_ACTIONS = [
    { id: 'ehr', title: 'Electronic Health Records', desc: 'Secure patient data storage', icon: <FileText />, color: 'blue' },
    { id: 'presc', title: 'Prescription Management', desc: 'Generate & track e-prescriptions', icon: <Stethoscope />, color: 'emerald' },
    { id: 'appt', title: 'Appointment Dashboard', desc: 'Schedule & manage visits', icon: <Calendar />, color: 'purple' },
    { id: 'tele', title: 'Telemedicine Portal', desc: 'Join virtual consultations', icon: <Video />, color: 'indigo' },
    { id: 'billing', title: 'Billing & Invoicing', desc: 'Revenue & fee management', icon: <CreditCard />, color: 'amber' },
    { id: 'inventory', title: 'Inventory Control', desc: 'Medicine & supplies tracking', icon: <Package />, color: 'rose' },
  ];

  return (
    <div className="min-h-screen bg-[#0a0c10] animate-fade-in pb-20 overflow-hidden relative">
      
      {/* ── BACKGROUND ACCENTS ── */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-600/5 rounded-full blur-[100px] pointer-events-none" />

      {/* ── HEADER ── */}
      <div className="px-8 py-10 flex justify-between items-end relative z-10">
        <div>
           <div className="flex items-center gap-3 mb-3">
              <div className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full flex items-center gap-2">
                 <ShieldCheck size={12} className="text-blue-400" />
                 <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Clinic Command Center</span>
              </div>
              <span className="text-[10px] text-text-muted font-bold uppercase tracking-widest">v2.4.0 Stable</span>
           </div>
           <h1 className="text-4xl font-black text-white tracking-tighter">Clinical Dashboard</h1>
           <p className="text-text-secondary text-sm font-medium mt-2">Welcome back, <span className="text-white">Dr. Rajesh Samana</span>. Your clinic is performing optimally.</p>
        </div>
        
        <div className="flex gap-4">
           <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
              <input 
                type="text" 
                placeholder="Find patient or record..." 
                className="bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-6 text-sm text-white focus:border-blue-500 outline-none transition-all w-[300px]"
              />
           </div>
           <button className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white relative">
              <Bell size={20} />
              <div className="absolute top-3 right-3 w-2 h-2 bg-rose-500 rounded-full border-2 border-[#0a0c10]" />
           </button>
           <button className="px-6 py-3 bg-white text-gray-900 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2 shadow-xl hover:scale-105 transition">
              <Plus size={16} /> New Entry
           </button>
        </div>
      </div>

      {/* ── CONTENT ── */}
      <div className="px-8 space-y-10 relative z-10">
        
        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-6">
           {CLINIC_STATS.map((stat, i) => (
             <div key={i} className="p-6 bg-white/[0.03] border border-white/5 rounded-[32px] hover:bg-white/[0.05] transition-all group">
                <div className="flex justify-between items-start mb-6">
                   <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/5 group-hover:scale-110 transition-transform">
                      {stat.icon}
                   </div>
                   <button className="text-text-muted hover:text-white transition"><MoreVertical size={18} /></button>
                </div>
                <h3 className="text-3xl font-black text-white tracking-tighter mb-1">{stat.value}</h3>
                <p className="text-[10px] text-text-muted font-bold uppercase tracking-[0.2em] mb-3">{stat.label}</p>
                <div className="flex items-center gap-2 text-[9px] font-black text-emerald-500 uppercase tracking-widest">
                   <TrendingUp size={12} /> {stat.trend}
                </div>
             </div>
           ))}
        </div>

        {/* Clinical Operations Hub */}
        <div className="grid grid-cols-3 gap-10">
           
           {/* Left Col: Operations */}
           <div className="col-span-2 space-y-8">
              <div>
                 <h3 className="text-xl font-black text-white tracking-tight mb-6 flex items-center gap-3">
                    <Zap className="text-blue-400" size={20} /> Clinic Management Hub
                 </h3>
                 <div className="grid grid-cols-2 gap-4">
                    {QUICK_ACTIONS.map((action) => (
                      <motion.div 
                        key={action.id}
                        whileHover={{ scale: 1.02, x: 5 }}
                        className="p-6 bg-card border border-border-subtle rounded-[32px] cursor-pointer hover:border-blue-500/30 transition-all flex items-center gap-6"
                      >
                         <div className={`w-14 h-14 rounded-2xl bg-${action.color}-500/10 flex items-center justify-center border border-${action.color}-500/20 text-${action.color}-400 shadow-lg`}>
                            {React.cloneElement(action.icon, { size: 24 })}
                         </div>
                         <div>
                            <h4 className="text-sm font-black text-white mb-1 uppercase tracking-wider">{action.title}</h4>
                            <p className="text-[11px] text-text-muted font-medium">{action.desc}</p>
                         </div>
                      </motion.div>
                    ))}
                 </div>
              </div>

              {/* Patient Feed */}
              <div className="p-8 bg-card border border-border-subtle rounded-[40px] shadow-3xl">
                 <div className="flex justify-between items-center mb-8">
                    <h3 className="text-lg font-bold text-white flex items-center gap-3"><Users size={20} className="text-emerald-500" /> Patient Queue</h3>
                    <button className="text-[10px] font-black text-blue-500 uppercase tracking-widest">View Schedule</button>
                 </div>
                 <div className="space-y-4">
                    {[
                      { name: 'Aditi Verma', time: '10:30 AM', type: 'Initial Screening', status: 'Waiting' },
                      { name: 'Karan Sharma', time: '11:15 AM', type: 'Post-XRay Followup', status: 'In Consultation' },
                      { name: 'Sonia Gupta', time: '12:00 PM', type: 'Asthma Management', status: 'Scheduled' },
                    ].map((p, i) => (
                      <div key={i} className="flex items-center justify-between p-5 bg-white/[0.03] border border-white/5 rounded-3xl hover:bg-white/[0.05] transition cursor-pointer">
                         <div className="flex items-center gap-5">
                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500/20 to-emerald-500/20 flex items-center justify-center text-white font-black text-xs">
                               {p.name.split(' ').map(n=>n[0]).join('')}
                            </div>
                            <div>
                               <p className="text-sm font-bold text-white">{p.name}</p>
                               <p className="text-[10px] text-text-muted mt-0.5">{p.type} • <span className="text-blue-400">{p.time}</span></p>
                            </div>
                         </div>
                         <div className={`px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest ${p.status === 'Waiting' ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' : p.status === 'In Consultation' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' : 'bg-white/5 text-text-muted'}`}>
                            {p.status}
                         </div>
                      </div>
                    ))}
                 </div>
              </div>
           </div>

           {/* Right Col: Comms & Analytics */}
           <div className="space-y-8">
              {/* Communication Hub */}
              <div className="p-8 bg-gradient-to-b from-blue-600/10 to-transparent border border-white/10 rounded-[40px] shadow-2xl">
                 <h3 className="text-base font-black text-white mb-8 flex items-center gap-3"><MessageSquare size={18} /> Communication Hub</h3>
                 <div className="space-y-6">
                    <div className="p-4 bg-white/5 rounded-2xl border border-white/5 flex items-center gap-4">
                       <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                          <MessageSquare size={18} />
                       </div>
                       <div className="flex-1">
                          <p className="text-[11px] font-bold text-white">Secure Messaging</p>
                          <p className="text-[9px] text-text-muted">3 Unread Conversations</p>
                       </div>
                       <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center text-[10px] font-black text-white">3</div>
                    </div>
                    
                    <div className="p-4 bg-white/5 rounded-2xl border border-white/5 flex items-center gap-4 opacity-60">
                       <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                          <Zap size={18} />
                       </div>
                       <div className="flex-1">
                          <p className="text-[11px] font-bold text-white">AI Assistant / FAQ</p>
                          <p className="text-[9px] text-text-muted">Automated Support Active</p>
                       </div>
                    </div>

                    <div className="pt-4 space-y-4">
                       <p className="text-[10px] text-text-muted font-black uppercase tracking-widest px-2">Follow-up Alerts</p>
                       {[1, 2].map(i => (
                         <div key={i} className="flex items-center gap-4 px-2">
                            <div className="w-2 h-2 rounded-full bg-blue-500" />
                            <p className="text-[11px] text-white/80 font-medium">Follow-up reminder sent to Patient #482</p>
                         </div>
                       ))}
                    </div>
                 </div>
              </div>

              {/* Security Status */}
              <div className="p-8 bg-card border border-border-subtle rounded-[40px]">
                 <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 border border-emerald-500/20">
                       <ShieldCheck size={24} />
                    </div>
                    <div>
                       <h4 className="text-sm font-black text-white tracking-tight uppercase">HIPAA Compliant</h4>
                       <p className="text-[9px] text-emerald-500 font-black uppercase tracking-widest">Data Secure & Encrypted</p>
                    </div>
                 </div>
                 <div className="space-y-3">
                    <div className="flex justify-between text-[10px] font-bold text-text-muted">
                       <span>Encryption Strength</span>
                       <span>AES-256</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                       <div className="h-full bg-emerald-500 w-[95%]" />
                    </div>
                 </div>
              </div>

              {/* Analytics Preview */}
              <div className="p-8 bg-card border border-border-subtle rounded-[40px] relative overflow-hidden group">
                 <div className="relative z-10">
                    <h3 className="text-base font-black text-white mb-2">Revenue Insights</h3>
                    <p className="text-[10px] text-text-muted font-bold uppercase tracking-widest mb-6">Patient Trends & Billing</p>
                    <div className="flex items-end gap-2 h-32">
                       {[40, 70, 45, 90, 65, 80, 55].map((h, i) => (
                         <motion.div 
                           key={i} 
                           initial={{ height: 0 }} 
                           animate={{ height: `${h}%` }}
                           className="flex-1 bg-gradient-to-t from-blue-600/40 to-blue-400 rounded-t-lg"
                         />
                       ))}
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
