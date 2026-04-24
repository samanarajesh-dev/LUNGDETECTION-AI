import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Video, Calendar, MessageSquare, Phone, User, Clock, 
  Star, ShieldCheck, ChevronRight, Search, Filter,
  MoreHorizontal, X, Mic, MicOff, VideoOff, 
  Activity, Award, CheckCircle2, MapPin, Zap, ChevronLeft,
  Stethoscope, Heart, AlertCircle
} from 'lucide-react';

export default function Telemedicine() {
  const [phase, setPhase] = useState('intake'); // intake | specialists | call
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isCalling, setIsCalling] = useState(false);

  const DOCTORS = [
    {
      id: 1,
      name: "Dr. Sarah Mitchell",
      specialty: "Senior Pulmonologist",
      rating: 4.9,
      reviews: 124,
      image: "https://images.unsplash.com/photo-1559839734-2b71f1536783?q=80&w=200&h=200&auto=format&fit=crop",
      availability: "Available Now",
      experience: "12 Years",
      location: "Mayo Clinic, MN",
      bio: "Specializing in chronic lung diseases, asthma management, and early detection of pulmonary nodules."
    },
    {
      id: 2,
      name: "Dr. James Wilson",
      specialty: "Thoracic Specialist",
      rating: 4.8,
      reviews: 89,
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=200&h=200&auto=format&fit=crop",
      availability: "Tomorrow, 10:00 AM",
      experience: "15 Years",
      location: "Cleveland Clinic, OH",
      bio: "Expert in interventional pulmonology and advanced diagnostic bronchoscopy."
    }
  ];

  const INTAKE_OPTIONS = [
    { id: 'urgent', title: 'Urgent Consultation', desc: 'Connect within 10 minutes', icon: <Zap className="text-amber-400" /> },
    { id: 'opinion', title: 'Second Opinion', desc: 'Expert review of your scans', icon: <Stethoscope className="text-blue-400" /> },
    { id: 'followup', title: 'Routine Follow-up', desc: 'Ongoing care management', icon: <Calendar className="text-emerald-400" /> },
  ];

  return (
    <div className="flex flex-col h-full animate-fade-in relative min-h-[calc(100vh-64px)] bg-primary overflow-hidden">
      
      {/* ── UNIFIED GLOBAL HEADER ── */}
      <div className="px-6 py-6 bg-card border-b border-border-subtle flex items-center justify-between backdrop-blur-xl">
        <div className="flex items-center gap-5">
          <button 
            onClick={() => phase === 'specialists' ? setPhase('intake') : window.history.back()} 
            className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all"
          >
            <ChevronLeft size={20} className="text-white" />
          </button>
          <div>
            <h1 className="text-xl font-black text-white tracking-tight">Telemedicine</h1>
            <div className="flex items-center gap-2">
               <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
               <p className="text-[10px] text-text-muted font-bold uppercase tracking-[0.2em]">Live Specialist Network</p>
            </div>
          </div>
        </div>
        
        {phase === 'specialists' && (
           <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-2xl border border-white/5">
              <ShieldCheck size={14} className="text-emerald-500" />
              <span className="text-[10px] text-white/60 font-bold uppercase tracking-widest">Verified Doctors Only</span>
           </div>
        )}
      </div>

      {/* ── CONTENT AREA ── */}
      <div className="flex-1 overflow-y-auto pb-40 flex flex-col pt-8 scrollbar-none">
        
        <AnimatePresence mode="wait">
          {phase === 'intake' ? (
            <motion.div 
              key="intake"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex-1 flex flex-col max-w-[600px] mx-auto w-full px-6 space-y-12"
            >
              <div className="text-center space-y-4">
                 <h2 className="text-3xl font-black text-white tracking-tighter">How can we help you today?</h2>
                 <p className="text-sm text-text-secondary font-medium">Select a service to match with the right specialist.</p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                 {INTAKE_OPTIONS.map((opt) => (
                   <button 
                    key={opt.id}
                    onClick={() => setPhase('specialists')}
                    className="group p-6 bg-card border border-border-subtle rounded-[32px] text-left hover:border-brand-blue/50 transition-all shadow-xl hover:scale-[1.02]"
                   >
                     <div className="flex items-center gap-6">
                        <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-white/10 transition">
                           {opt.icon}
                        </div>
                        <div>
                           <h4 className="text-base font-bold text-white mb-1">{opt.title}</h4>
                           <p className="text-xs text-text-muted font-medium">{opt.desc}</p>
                        </div>
                        <ChevronRight className="ml-auto text-white/20 group-hover:text-brand-blue transition" size={20} />
                     </div>
                   </button>
                 ))}
              </div>

              <div className="p-6 bg-white/5 rounded-[32px] border border-white/10 flex items-start gap-4">
                 <AlertCircle className="text-brand-blue shrink-0" size={20} />
                 <p className="text-[11px] text-text-secondary leading-relaxed font-medium">
                    In case of a life-threatening emergency, please do not use telemedicine. Call your local emergency services immediately.
                 </p>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="specialists"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="px-6 space-y-8 max-w-[1000px] mx-auto w-full"
            >
              {/* Specialist Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {DOCTORS.map((doc) => (
                  <div 
                    key={doc.id}
                    className="p-6 bg-card border border-border-subtle rounded-[40px] shadow-2xl relative overflow-hidden group"
                  >
                    <div className="flex gap-6">
                      <img src={doc.image} alt="" className="w-24 h-24 rounded-3xl object-cover border-4 border-white/5" />
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="text-lg font-black text-white tracking-tight">{doc.name}</h4>
                            <p className="text-xs text-brand-blue font-bold uppercase tracking-wider">{doc.specialty}</p>
                          </div>
                          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500/10 rounded-xl">
                            <Star size={12} className="text-amber-500 fill-amber-500" />
                            <span className="text-xs font-black text-amber-500">{doc.rating}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 mt-4">
                           <div className="flex items-center gap-2">
                              <Clock size={14} className="text-text-muted" />
                              <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">{doc.availability}</span>
                           </div>
                        </div>
                      </div>
                    </div>
                    
                    <p className="mt-6 text-xs text-text-secondary leading-relaxed font-medium line-clamp-2">
                       {doc.bio}
                    </p>

                    <div className="mt-8 flex gap-3">
                       <button 
                        onClick={() => {
                          setSelectedDoctor(doc);
                          setIsCalling(true);
                        }}
                        className="flex-1 py-4 bg-brand-blue text-white font-black text-[10px] uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-brand-blue/20 hover:scale-[1.02] transition flex items-center justify-center gap-2"
                       >
                          <Video size={16} /> Consult Now
                       </button>
                       <button className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition">
                          <MessageSquare size={18} />
                       </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── VIDEO CALL OVERLAY ── */}
      <AnimatePresence>
        {isCalling && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black flex flex-col items-center justify-center p-6"
          >
            <div className="w-full h-full max-w-[1200px] rounded-[56px] bg-[#111] overflow-hidden relative shadow-3xl border border-white/5">
               <img src="https://images.unsplash.com/photo-1559839734-2b71f1536783?q=80&w=1200&h=800&auto=format&fit=crop" alt="" className="w-full h-full object-cover opacity-60" />
               <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
               
               {/* UI Controls */}
               <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex items-center gap-8 px-12 py-8 bg-white/5 backdrop-blur-3xl rounded-[48px] border border-white/10 shadow-3xl">
                  <button className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all"><Mic size={28} /></button>
                  <button className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all"><VideoOff size={28} /></button>
                  <button 
                    onClick={() => setIsCalling(false)}
                    className="w-24 h-16 rounded-[32px] bg-rose-500 flex items-center justify-center text-white hover:bg-rose-600 transition-all shadow-2xl shadow-rose-500/40"
                  >
                     <Phone size={28} className="rotate-[135deg]" />
                  </button>
                  <button className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all"><MessageSquare size={28} /></button>
                  <button className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all"><MoreHorizontal size={28} /></button>
               </div>

               {/* Doctor Label */}
               <div className="absolute top-12 left-12 flex items-center gap-4 p-5 bg-black/40 backdrop-blur-2xl rounded-3xl border border-white/10">
                  <div className="w-12 h-12 rounded-2xl border-2 border-emerald-500 overflow-hidden">
                     <img src="https://images.unsplash.com/photo-1559839734-2b71f1536783?q=80&w=60&h=60&auto=format&fit=crop" alt="" />
                  </div>
                  <div>
                     <p className="text-base font-black text-white tracking-tight">Dr. Sarah Mitchell</p>
                     <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-[0.2em]">Secure Call Active</p>
                  </div>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
