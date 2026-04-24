import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Video, Calendar, MessageSquare, Phone, User, Clock, 
  Star, ShieldCheck, ChevronRight, Search, Filter,
  MoreHorizontal, X, Mic, MicOff, VideoOff, EndCall, 
  Activity, Award, CheckCircle2, MapPin
} from 'lucide-react';

export default function Telemedicine() {
  const [activeTab, setActiveTab] = useState('specialists');
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
    },
    {
      id: 3,
      name: "Dr. Elena Rodriguez",
      specialty: "Pediatric Pulmonologist",
      rating: 5.0,
      reviews: 215,
      image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=200&h=200&auto=format&fit=crop",
      availability: "Available Now",
      experience: "8 Years",
      location: "Stanford Health, CA",
      bio: "Dedicated to pediatric respiratory health, cystic fibrosis research, and childhood asthma."
    }
  ];

  return (
    <div className="min-h-screen bg-primary animate-fade-in pb-20">
      
      {/* ── HEADER ── */}
      <div className="px-6 pt-12 pb-8">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-4xl font-black text-white tracking-tighter mb-2">Telemedicine</h1>
            <p className="text-text-secondary text-sm font-medium">Connect with top pulmonologists globally.</p>
          </div>
          <div className="flex gap-3">
             <button className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition">
                <Calendar size={20} />
             </button>
             <button className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition">
                <MessageSquare size={20} />
             </button>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
            <input 
              type="text" 
              placeholder="Search specialists, specialties, or clinics..." 
              className="w-full bg-card border border-border-subtle rounded-2xl py-4 pl-12 pr-4 text-sm text-white focus:border-brand-blue outline-none transition shadow-lg"
            />
          </div>
          <button className="w-14 h-14 rounded-2xl bg-card border border-border-subtle flex items-center justify-center text-white hover:border-brand-blue transition">
            <Filter size={18} />
          </button>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="px-6 space-y-8">
        
        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4">
           {[
             { l: 'Total Consultations', v: '24', i: <Video className="text-blue-400" /> },
             { l: 'Verified Doctors', v: '150+', i: <ShieldCheck className="text-emerald-400" /> },
             { l: 'Average Wait Time', v: '8m', i: <Clock className="text-amber-400" /> }
           ].map((stat, i) => (
             <div key={i} className="p-4 bg-card border border-border-subtle rounded-3xl">
                <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center mb-3">{stat.i}</div>
                <p className="text-xl font-black text-white">{stat.v}</p>
                <p className="text-[10px] text-text-muted font-bold uppercase tracking-wider">{stat.l}</p>
             </div>
           ))}
        </div>

        {/* Specialists List */}
        <div className="space-y-4">
          <div className="flex justify-between items-center px-2">
            <h3 className="text-lg font-bold text-white tracking-tight">Top Specialists</h3>
            <button className="text-[10px] font-black text-brand-blue uppercase tracking-widest">View All</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {DOCTORS.map((doc) => (
              <motion.div 
                key={doc.id}
                whileHover={{ scale: 1.01 }}
                className="group p-5 bg-card border border-border-subtle rounded-[32px] hover:border-brand-blue/50 transition-all cursor-pointer relative overflow-hidden shadow-xl"
                onClick={() => setSelectedDoctor(doc)}
              >
                <div className="flex gap-5 relative z-10">
                  <div className="relative">
                    <img src={doc.image} alt={doc.name} className="w-20 h-20 rounded-2xl object-cover border-2 border-white/5" />
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-4 border-primary flex items-center justify-center">
                       <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-base font-bold text-white">{doc.name}</h4>
                        <p className="text-xs text-text-muted font-medium mb-2">{doc.specialty}</p>
                      </div>
                      <div className="flex items-center gap-1 px-2 py-1 bg-amber-500/10 rounded-lg">
                        <Star size={10} className="text-amber-500 fill-amber-500" />
                        <span className="text-[10px] font-black text-amber-500">{doc.rating}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 mt-3">
                      <div className="flex items-center gap-1.5">
                        <Award size={14} className="text-brand-blue" />
                        <span className="text-[10px] font-bold text-text-secondary">{doc.experience} Exp.</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin size={14} className="text-rose-400" />
                        <span className="text-[10px] font-bold text-text-secondary">USA</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-5 border-t border-white/5 flex items-center justify-between">
                   <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-500" />
                      <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">{doc.availability}</span>
                   </div>
                   <button className="px-4 py-2 bg-brand-blue rounded-xl text-white text-[10px] font-black uppercase tracking-widest shadow-lg shadow-brand-blue/20">
                      Consult Now
                   </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="p-6 bg-card border border-border-subtle rounded-[32px] shadow-xl">
           <h3 className="text-sm font-bold text-white mb-6 flex items-center gap-2">
              <Activity size={16} className="text-brand-blue" />
              Recent Consultations
           </h3>
           <div className="space-y-4">
              {[1, 2].map(i => (
                <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                   <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-brand-blue/10 flex items-center justify-center text-brand-blue">
                         <Video size={18} />
                      </div>
                      <div>
                         <p className="text-xs font-bold text-white">Consultation with Dr. Sarah Mitchell</p>
                         <p className="text-[10px] text-text-muted mt-0.5">April 12, 2024 • 15:30</p>
                      </div>
                   </div>
                   <button className="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition">
                      <MoreHorizontal size={16} className="text-text-muted" />
                   </button>
                </div>
              ))}
           </div>
        </div>
      </div>

      {/* ── DOCTOR DETAIL MODAL ── */}
      <AnimatePresence>
        {selectedDoctor && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              className="bg-card border border-white/10 w-full max-w-[600px] rounded-[40px] overflow-hidden shadow-3xl"
            >
              <div className="relative h-48 overflow-hidden">
                <img src={selectedDoctor.image} alt="" className="w-full h-full object-cover blur-sm opacity-30" />
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                <button 
                  onClick={() => setSelectedDoctor(null)}
                  className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition backdrop-blur-xl"
                >
                  <X size={20} />
                </button>
                <div className="absolute bottom-0 left-8 flex items-end gap-6 translate-y-1/2">
                  <img src={selectedDoctor.image} alt="" className="w-32 h-32 rounded-3xl border-8 border-card object-cover" />
                  <div className="pb-4">
                    <h2 className="text-2xl font-black text-white tracking-tighter">{selectedDoctor.name}</h2>
                    <p className="text-sm text-brand-blue font-bold">{selectedDoctor.specialty}</p>
                  </div>
                </div>
              </div>

              <div className="p-8 pt-20 space-y-8">
                <div className="grid grid-cols-3 gap-4">
                   <div className="p-4 bg-white/5 rounded-3xl text-center">
                      <p className="text-xl font-black text-white">{selectedDoctor.experience}</p>
                      <p className="text-[10px] text-text-muted font-bold uppercase tracking-widest">Experience</p>
                   </div>
                   <div className="p-4 bg-white/5 rounded-3xl text-center border border-brand-blue/20">
                      <p className="text-xl font-black text-brand-blue">{selectedDoctor.rating}</p>
                      <p className="text-[10px] text-text-muted font-bold uppercase tracking-widest">Rating</p>
                   </div>
                   <div className="p-4 bg-white/5 rounded-3xl text-center">
                      <p className="text-xl font-black text-white">{selectedDoctor.reviews}</p>
                      <p className="text-[10px] text-text-muted font-bold uppercase tracking-widest">Reviews</p>
                   </div>
                </div>

                <div className="space-y-3">
                   <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <CheckCircle2 size={16} className="text-brand-blue" />
                      About Specialist
                   </h4>
                   <p className="text-xs text-text-secondary leading-relaxed font-medium">
                      {selectedDoctor.bio}
                   </p>
                </div>

                <div className="flex gap-4 pt-4">
                   <button 
                    onClick={() => {
                      setSelectedDoctor(null);
                      setIsCalling(true);
                    }}
                    className="flex-1 py-5 bg-brand-blue text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-brand-blue/20 hover:scale-[1.02] transition flex items-center justify-center gap-3"
                   >
                      <Video size={18} /> Start Video Call
                   </button>
                   <button className="w-20 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition">
                      <MessageSquare size={20} />
                   </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── VIDEO CALL INTERFACE (MOCK) ── */}
      <AnimatePresence>
        {isCalling && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center p-6"
          >
            {/* Remote Video (Mock) */}
            <div className="w-full h-full max-w-[1200px] rounded-[48px] bg-white/5 overflow-hidden relative shadow-3xl">
               <img src="https://images.unsplash.com/photo-1559839734-2b71f1536783?q=80&w=1200&h=800&auto=format&fit=crop" alt="" className="w-full h-full object-cover" />
               <div className="absolute inset-0 bg-black/20" />
               
               {/* Local Video Overlay */}
               <div className="absolute top-8 right-8 w-48 h-64 rounded-3xl border-4 border-white/10 shadow-2xl overflow-hidden bg-primary">
                  <div className="w-full h-full flex items-center justify-center bg-zinc-800 text-white/20">
                     <User size={64} />
                  </div>
                  <div className="absolute bottom-4 left-4 flex items-center gap-2">
                     <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                     <span className="text-[10px] font-bold text-white uppercase">You (Live)</span>
                  </div>
               </div>

               {/* Controls */}
               <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-6 px-10 py-6 bg-black/60 backdrop-blur-3xl rounded-[40px] border border-white/10 shadow-3xl">
                  <button className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition">
                     <Mic size={24} />
                  </button>
                  <button className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition">
                     <VideoOff size={24} />
                  </button>
                  <button 
                    onClick={() => setIsCalling(false)}
                    className="w-20 h-14 rounded-full bg-rose-500 flex items-center justify-center text-white hover:bg-rose-600 transition shadow-xl shadow-rose-500/20"
                  >
                     <Phone size={24} className="rotate-[135deg]" />
                  </button>
                  <button className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition">
                     <MessageSquare size={24} />
                  </button>
                  <button className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition">
                     <MoreHorizontal size={24} />
                  </button>
               </div>

               {/* Doctor Label */}
               <div className="absolute top-12 left-12 flex items-center gap-4 px-6 py-4 bg-black/40 backdrop-blur-2xl rounded-3xl border border-white/10">
                  <div className="w-10 h-10 rounded-full border-2 border-emerald-500 overflow-hidden">
                     <img src="https://images.unsplash.com/photo-1559839734-2b71f1536783?q=80&w=50&h=50&auto=format&fit=crop" alt="" />
                  </div>
                  <div>
                     <p className="text-sm font-black text-white tracking-tight">Dr. Sarah Mitchell</p>
                     <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest">Encypted Connection</p>
                  </div>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
