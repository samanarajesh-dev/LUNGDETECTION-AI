import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar as CalendarIcon, Clock, User, MessageSquare, 
  ChevronLeft, Search, Filter, MoreVertical, CheckCircle2,
  AlertCircle, Phone, Video, MapPin, X
} from 'lucide-react';

export default function DoctorSchedule() {
  const [filter, setFilter] = useState('All');

  const APPOINTMENTS = [
    {
      id: 1,
      patient: "Aditi Verma",
      time: "10:30 AM",
      date: "Today",
      type: "Initial Screening",
      status: "Confirmed",
      doctor: "Dr. Rajesh Samana",
      avatar: "AV"
    },
    {
      id: 2,
      patient: "Karan Sharma",
      time: "11:15 AM",
      date: "Today",
      type: "Post-XRay Followup",
      status: "In Progress",
      doctor: "Dr. Sarah Mitchell",
      avatar: "KS"
    },
    {
      id: 3,
      patient: "Sonia Gupta",
      time: "12:00 PM",
      date: "Today",
      type: "Asthma Management",
      status: "Waiting",
      doctor: "Dr. Rajesh Samana",
      avatar: "SG"
    },
    {
      id: 4,
      patient: "Rahul Dixit",
      time: "02:30 PM",
      date: "Tomorrow",
      type: "Diagnostic Review",
      status: "Scheduled",
      doctor: "Dr. James Wilson",
      avatar: "RD"
    }
  ];

  const filteredAppointments = filter === 'All' 
    ? APPOINTMENTS 
    : APPOINTMENTS.filter(a => a.status === filter);

  return (
    <div className="min-h-[calc(100vh-64px)] bg-primary animate-fade-in pb-20 overflow-hidden relative">
      
      {/* ── HEADER ── */}
      <div className="px-6 py-8 border-b border-white/5 bg-[#0a0c10]/40 backdrop-blur-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-6">
           <button 
            onClick={() => window.history.back()} 
            className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all shadow-xl"
           >
             <ChevronLeft size={24} className="text-white" />
           </button>
           <div>
              <div className="flex items-center gap-2 mb-1">
                 <CalendarIcon size={14} className="text-blue-400" />
                 <span className="text-[10px] text-blue-400 font-black uppercase tracking-widest">Clinical Schedule</span>
              </div>
              <h1 className="text-2xl font-black text-white tracking-tighter">My Appointments</h1>
           </div>
        </div>

        <div className="flex gap-3">
           <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={16} />
              <input 
                type="text" 
                placeholder="Search schedule..." 
                className="bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-xs text-white outline-none focus:border-blue-500 transition-all w-[200px]"
              />
           </div>
           <button className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-white/60 flex items-center gap-2">
              <Filter size={14} /> Filter
           </button>
        </div>
      </div>

      <div className="max-w-[1000px] mx-auto px-6 pt-10">
        
        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
           {[
             { label: 'Total Today', value: '12', color: 'text-blue-400' },
             { label: 'Pending', value: '04', color: 'text-amber-400' },
             { label: 'Completed', value: '06', color: 'text-emerald-400' },
             { label: 'Canceled', value: '02', color: 'text-rose-400' }
           ].map((s, i) => (
             <div key={i} className="p-5 bg-card border border-border-subtle rounded-3xl">
                <p className="text-[9px] text-text-muted font-black uppercase tracking-widest mb-1">{s.label}</p>
                <p className={`text-2xl font-black ${s.color}`}>{s.v || s.value}</p>
             </div>
           ))}
        </div>

        {/* Schedule List */}
        <div className="space-y-4">
           {filteredAppointments.map((apt, idx) => (
             <motion.div 
               key={apt.id}
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: idx * 0.05 }}
               className="group p-6 bg-card border border-border-subtle rounded-[32px] hover:border-blue-500/30 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden"
             >
               {/* Accent Line */}
               <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${apt.status === 'In Progress' ? 'bg-blue-500' : apt.status === 'Confirmed' ? 'bg-emerald-500' : 'bg-white/10'}`} />

               <div className="flex items-center gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500/10 to-indigo-500/10 flex items-center justify-center text-white font-black text-sm border border-white/5 shadow-inner">
                     {apt.avatar}
                  </div>
                  <div>
                     <div className="flex items-center gap-3 mb-1">
                        <h4 className="text-base font-black text-white tracking-tight">{apt.patient}</h4>
                        <div className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest border ${apt.status === 'In Progress' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' : apt.status === 'Confirmed' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-white/5 text-white/40 border-white/10'}`}>
                           {apt.status}
                        </div>
                     </div>
                     <p className="text-xs text-text-muted font-medium flex items-center gap-2">
                        <Clock size={12} className="text-blue-400" /> <span className="text-white font-bold">{apt.time}</span> • {apt.type}
                     </p>
                  </div>
               </div>

               <div className="flex items-center gap-4">
                  <div className="text-right hidden md:block">
                     <p className="text-[10px] text-text-muted font-black uppercase tracking-widest">Specialist</p>
                     <p className="text-xs font-bold text-white">{apt.doctor}</p>
                  </div>
                  <div className="flex gap-2">
                     <button className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white transition group-hover:bg-blue-600 group-hover:border-blue-500 group-hover:text-white">
                        <Video size={18} />
                     </button>
                     <button className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white transition">
                        <MessageSquare size={18} />
                     </button>
                     <button className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white transition">
                        <MoreVertical size={18} />
                     </button>
                  </div>
               </div>
             </motion.div>
           ))}
        </div>

        {filteredAppointments.length === 0 && (
           <div className="text-center py-20 bg-card border border-dashed border-white/10 rounded-[40px]">
              <AlertCircle size={40} className="text-white/10 mx-auto mb-4" />
              <p className="text-sm text-text-muted font-medium">No appointments found for the selected filter.</p>
           </div>
        )}
      </div>
    </div>
  );
}
