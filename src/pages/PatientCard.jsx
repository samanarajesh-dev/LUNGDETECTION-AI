import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, ShieldCheck, QrCode, User, Droplets, 
  Calendar, Phone, Mail, MapPin, Download, Share2,
  Heart, Activity, Zap, CheckCircle2
} from 'lucide-react';

export default function PatientCard() {
  const navigate = useNavigate();

  // Mock data for the card
  const patient = {
    id: "LD-882104",
    firstName: "Aditi",
    lastName: "Verma",
    dob: "14 May 1992",
    gender: "Female",
    bloodGroup: "O+",
    email: "aditi.v@example.com",
    phone: "+91 98765 43210",
    address: "B-42, Clinical Heights, New Delhi",
    registeredOn: "25 Apr 2024",
    status: "Verified",
    primaryDoctor: "Dr. Rajesh Samana"
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-primary animate-fade-in pb-20 overflow-hidden relative">
      
      {/* ── HEADER ── */}
      <div className="px-6 py-8 flex items-center justify-between border-b border-white/5 bg-[#0a0c10]/40 backdrop-blur-xl">
        <div className="flex items-center gap-6">
           <button 
            onClick={() => window.history.back()} 
            className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all shadow-xl"
           >
             <ChevronLeft size={24} className="text-white" />
           </button>
           <div>
              <div className="flex items-center gap-2 mb-1">
                 <ShieldCheck size={14} className="text-emerald-400" />
                 <span className="text-[10px] text-emerald-400 font-black uppercase tracking-widest">Digital Health Identity</span>
              </div>
              <h1 className="text-2xl font-black text-white tracking-tighter">Patient Medical Card</h1>
           </div>
        </div>
        <div className="flex gap-3">
           <button className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-white/60 flex items-center gap-2 hover:text-white hover:bg-white/10 transition">
              <Download size={16} /> Save as PDF
           </button>
           <button className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-white/60 flex items-center gap-2 hover:text-white hover:bg-white/10 transition">
              <Share2 size={16} /> Share
           </button>
        </div>
      </div>

      <div className="max-w-[900px] mx-auto px-6 pt-12 grid grid-cols-1 md:grid-cols-12 gap-10">
        
        {/* ── LEFT: THE CARD ── */}
        <div className="md:col-span-7">
           <motion.div 
            initial={{ rotateY: -20, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="w-full aspect-[1.6/1] bg-gradient-to-br from-indigo-900 via-[#0a0c10] to-blue-900 rounded-[48px] p-8 relative overflow-hidden shadow-[0_40px_100px_-20px_rgba(30,58,138,0.4)] border border-white/10"
           >
              {/* Card Decoration */}
              <div className="absolute top-0 right-0 w-[60%] h-full bg-gradient-to-l from-white/5 to-transparent skew-x-[-20deg] pointer-events-none" />
              <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-blue-500/10 rounded-full blur-[60px]" />

              <div className="relative z-10 h-full flex flex-col justify-between">
                 <div className="flex justify-between items-start">
                    <div className="flex items-center gap-4">
                       <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center border border-white/10">
                          <Heart className="text-rose-500 fill-rose-500" size={24} />
                       </div>
                       <div>
                          <h3 className="text-lg font-black text-white tracking-tighter">LungDetect AI</h3>
                          <p className="text-[9px] text-white/40 font-bold uppercase tracking-widest">Medical Identity Card</p>
                       </div>
                    </div>
                    <div className="px-3 py-1 bg-emerald-500/20 rounded-full border border-emerald-500/30 flex items-center gap-2">
                       <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                       <span className="text-[9px] text-emerald-400 font-black uppercase tracking-widest">{patient.status}</span>
                    </div>
                 </div>

                 <div className="flex items-end justify-between">
                    <div>
                       <h2 className="text-3xl font-black text-white tracking-tighter mb-1">{patient.firstName} {patient.lastName}</h2>
                       <div className="flex gap-4">
                          <div>
                             <p className="text-[8px] text-white/30 font-black uppercase tracking-widest">Patient ID</p>
                             <p className="text-sm font-black text-blue-400 tracking-tighter">{patient.id}</p>
                          </div>
                          <div>
                             <p className="text-[8px] text-white/30 font-black uppercase tracking-widest">Blood Group</p>
                             <p className="text-sm font-black text-rose-400 tracking-tighter">{patient.bloodGroup}</p>
                          </div>
                          <div>
                             <p className="text-[8px] text-white/30 font-black uppercase tracking-widest">DOB</p>
                             <p className="text-sm font-black text-white/80 tracking-tighter">{patient.dob}</p>
                          </div>
                       </div>
                    </div>
                    
                    <div className="p-3 bg-white rounded-3xl shadow-2xl">
                       <QrCode size={64} className="text-[#0a0c10]" />
                    </div>
                 </div>
              </div>
           </motion.div>

           <div className="mt-12 grid grid-cols-2 gap-4">
              {[
                { label: 'Registered On', value: patient.registeredOn, icon: <Calendar size={16}/> },
                { label: 'Primary Specialist', value: patient.primaryDoctor, icon: <Stethoscope size={16}/> },
                { label: 'Emergency Contact', value: patient.phone, icon: <Phone size={16}/> },
                { label: 'Clinical Site', value: 'Apollo Hospital, Delhi', icon: <MapPin size={16}/> },
              ].map((s, i) => (
                <div key={i} className="p-6 bg-card border border-border-subtle rounded-[32px] flex items-center gap-5">
                   <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-blue-400 border border-white/5">
                      {s.icon}
                   </div>
                   <div>
                      <p className="text-[9px] text-text-muted font-black uppercase tracking-widest mb-1">{s.label}</p>
                      <p className="text-xs font-bold text-white tracking-tight">{s.value}</p>
                   </div>
                </div>
              ))}
           </div>
        </div>

        {/* ── RIGHT: INFO & ACTIONS ── */}
        <div className="md:col-span-5 space-y-8">
           <div className="p-8 bg-card border border-border-subtle rounded-[48px] shadow-3xl">
              <h3 className="text-sm font-black text-white uppercase tracking-[0.2em] mb-8">Personal Information</h3>
              <div className="space-y-6">
                 <div className="flex items-center gap-5">
                    <Mail size={18} className="text-text-muted" />
                    <div>
                       <p className="text-[9px] text-text-muted font-black uppercase tracking-widest">Email Address</p>
                       <p className="text-sm font-bold text-white">{patient.email}</p>
                    </div>
                 </div>
                 <div className="flex items-center gap-5">
                    <Phone size={18} className="text-text-muted" />
                    <div>
                       <p className="text-[9px] text-text-muted font-black uppercase tracking-widest">Mobile Number</p>
                       <p className="text-sm font-bold text-white">{patient.phone}</p>
                    </div>
                 </div>
                 <div className="flex items-center gap-5">
                    <MapPin size={18} className="text-text-muted" />
                    <div>
                       <p className="text-[9px] text-text-muted font-black uppercase tracking-widest">Residential Address</p>
                       <p className="text-sm font-bold text-white leading-relaxed">{patient.address}</p>
                    </div>
                 </div>
              </div>
           </div>

           <div className="p-8 bg-gradient-to-br from-emerald-500/10 to-transparent border border-emerald-500/20 rounded-[48px]">
              <div className="flex items-center gap-4 mb-6">
                 <div className="w-12 h-12 rounded-2xl bg-emerald-500 flex items-center justify-center shadow-lg">
                    <Activity size={24} className="text-white" />
                 </div>
                 <div>
                    <h4 className="text-sm font-black text-white uppercase tracking-wider">Health Vitals</h4>
                    <p className="text-[9px] text-emerald-500 font-black uppercase tracking-widest">Sync Active</p>
                 </div>
              </div>
              <div className="space-y-4">
                 <div className="flex justify-between items-center text-xs font-bold">
                    <span className="text-white/60">Profile Completeness</span>
                    <span className="text-emerald-500">92%</span>
                 </div>
                 <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: '92%' }} className="h-full bg-emerald-500 shadow-[0_0_10px_#10b981]" />
                 </div>
                 <p className="text-[10px] text-text-muted leading-relaxed font-medium pt-2">
                    Digital identity verified. Patient records are fully synchronized across the clinical network.
                 </p>
              </div>
           </div>

           <button 
             onClick={() => navigate('/doctor-home')}
             className="w-full py-5 bg-white text-gray-900 rounded-[28px] font-black text-xs uppercase tracking-[0.2em] shadow-2xl hover:scale-[1.02] transition active:scale-95 flex items-center justify-center gap-3"
           >
              <CheckCircle2 size={18} /> Done & Close
           </button>
        </div>

      </div>

      {/* Security Footer */}
      <div className="mt-20 flex items-center justify-center gap-6 opacity-30">
         <div className="flex items-center gap-2">
            <ShieldCheck size={14} className="text-emerald-500" />
            <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Encrypted Health Record</span>
         </div>
      </div>
    </div>
  );
}
