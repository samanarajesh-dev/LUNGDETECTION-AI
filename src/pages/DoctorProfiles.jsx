import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  UserCircle, Star, Award, BookOpen, MapPin, 
  Phone, Mail, ChevronLeft, Search, Filter,
  MessageSquare, Video, ShieldCheck, Stethoscope,
  Briefcase, GraduationCap, Globe, Clock, Heart,
  Zap, CheckCircle2, Navigation
} from 'lucide-react';

export default function DoctorProfiles() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const CATEGORIES = ["All", "Pulmonologists", "Thoracic Surgeons", "Radiologists", "General Medicine"];

  const DOCTORS = [
    {
      id: 1,
      name: "Dr. Sarah Mitchell",
      role: "Senior Pulmonologist",
      experience: "15+ Years",
      education: "MD, Harvard Medical School",
      specialties: ["Lung Cancer", "Asthma", "COPD"],
      rating: 4.9,
      reviews: 128,
      distance: "0.8 km away",
      clinic: "Apex Pulmonary Center",
      status: "Available",
      avatar: "SM"
    },
    {
      id: 2,
      name: "Dr. James Wilson",
      role: "Thoracic Surgeon",
      experience: "12 Years",
      education: "MS, Johns Hopkins University",
      specialties: ["Chest Surgery", "Pleural Effusion"],
      rating: 4.8,
      reviews: 94,
      distance: "2.4 km away",
      clinic: "Global Hospital",
      status: "In Surgery",
      avatar: "JW"
    },
    {
      id: 3,
      name: "Dr. Rajesh Samana",
      role: "Chief Pulmonologist",
      experience: "20+ Years",
      education: "MD, AIIMS New Delhi",
      specialties: ["Pneumonia", "Tuberculosis", "AI Diagnostics"],
      rating: 5.0,
      reviews: 450,
      distance: "Your Clinic",
      clinic: "LungDetect Master Hub",
      status: "Online Now",
      avatar: "RS"
    },
    {
      id: 4,
      name: "Dr. Elena Rodriguez",
      role: "Radiologist",
      experience: "10 Years",
      education: "MD, Stanford University",
      specialties: ["X-Ray Analysis", "CT Scanning"],
      rating: 4.7,
      reviews: 76,
      distance: "4.1 km away",
      clinic: "City Diagnostic Lab",
      status: "Available",
      avatar: "ER"
    }
  ];

  const NEARBY_CLINICS = [
    { name: "Apex Pulmonary Center", address: "12th Cross, Indiranagar", distance: "0.8 km", contact: "+91 80 4123 4567" },
    { name: "Global Hospital", address: "Bannerghatta Road", distance: "2.4 km", contact: "+91 80 2345 6789" },
    { name: "LungDetect Master Hub", address: "Tech Park, Whitefield", distance: "0 km", contact: "Internal Line 001" }
  ];

  const filteredDoctors = DOCTORS.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         doc.role.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || doc.role.includes(activeCategory.slice(0, -1));
    return matchesSearch && matchesCategory;
  });

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
                 <ShieldCheck size={14} className="text-blue-400" />
                 <span className="text-[10px] text-blue-400 font-black uppercase tracking-widest">Specialist Network</span>
              </div>
              <h1 className="text-2xl font-black text-white tracking-tighter">Doctor Profiles</h1>
           </div>
        </div>

        <div className="flex gap-3">
           <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={16} />
              <input 
                type="text" 
                placeholder="Search specialists..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-xs text-white outline-none focus:border-blue-500 transition-all w-[250px]"
              />
           </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 pt-10 grid grid-cols-1 md:grid-cols-12 gap-10">
        
        {/* ── LEFT: DIRECTORY ── */}
        <div className="md:col-span-8 space-y-10">
           
           {/* Categories */}
           <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-none">
              {CATEGORIES.map(cat => (
                <button 
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest border transition-all whitespace-nowrap ${activeCategory === cat ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-600/20' : 'bg-white/5 border-white/5 text-white/40 hover:text-white'}`}
                >
                   {cat}
                </button>
              ))}
           </div>

           {/* Specialist Cards */}
           <div className="grid grid-cols-1 gap-6">
              {filteredDoctors.map((doc, idx) => (
                <motion.div 
                  key={doc.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-8 bg-card border border-border-subtle rounded-[48px] hover:border-blue-500/30 transition-all group relative overflow-hidden"
                >
                   <div className="absolute top-0 right-0 w-[40%] h-full bg-gradient-to-l from-blue-600/5 to-transparent pointer-events-none" />

                   <div className="flex flex-col md:flex-row gap-8 relative z-10">
                      <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white font-black text-2xl shadow-2xl group-hover:scale-105 transition-transform">
                         {doc.avatar}
                      </div>

                      <div className="flex-1 space-y-4">
                         <div className="flex justify-between items-start">
                            <div>
                               <div className="flex items-center gap-3 mb-1">
                                  <h3 className="text-xl font-black text-white tracking-tight">{doc.name}</h3>
                                  <div className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest border ${doc.status === 'Available' || doc.status === 'Online Now' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-rose-500/10 text-rose-500 border-rose-500/20'}`}>
                                     {doc.status}
                                  </div>
                               </div>
                               <p className="text-xs text-blue-400 font-bold uppercase tracking-widest">{doc.role}</p>
                            </div>
                            <div className="text-right">
                               <div className="flex items-center gap-1 text-amber-400 justify-end">
                                  <Star size={14} fill="currentColor" />
                                  <span className="text-sm font-black">{doc.rating}</span>
                               </div>
                               <p className="text-[9px] text-text-muted font-bold uppercase tracking-widest">{doc.reviews} Clinical Reviews</p>
                            </div>
                         </div>

                         <div className="grid grid-cols-3 gap-4">
                            <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                               <div className="flex items-center gap-2 mb-1 text-text-muted">
                                  <Briefcase size={12} />
                                  <span className="text-[8px] font-black uppercase tracking-widest">Experience</span>
                               </div>
                               <p className="text-[11px] font-black text-white">{doc.experience}</p>
                            </div>
                            <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                               <div className="flex items-center gap-2 mb-1 text-text-muted">
                                  <GraduationCap size={12} />
                                  <span className="text-[8px] font-black uppercase tracking-widest">Education</span>
                               </div>
                               <p className="text-[11px] font-black text-white truncate">{doc.education.split(',')[0]}</p>
                            </div>
                            <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                               <div className="flex items-center gap-2 mb-1 text-text-muted">
                                  <MapPin size={12} />
                                  <span className="text-[8px] font-black uppercase tracking-widest">Distance</span>
                               </div>
                               <p className="text-[11px] font-black text-emerald-400">{doc.distance}</p>
                            </div>
                         </div>

                         <div className="flex flex-wrap gap-2 pt-2">
                            {doc.specialties.map(s => (
                              <span key={s} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[9px] font-bold text-white/60">
                                 {s}
                              </span>
                            ))}
                         </div>

                         <div className="flex gap-3 pt-4">
                            <button className="flex-1 py-4 bg-blue-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-blue-600/20 hover:scale-[1.02] transition active:scale-95 flex items-center justify-center gap-2">
                               <Video size={16} /> Virtual Consultation
                            </button>
                            <button className="px-6 py-4 bg-white/5 border border-white/10 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-white/10 transition">
                               View Profile
                            </button>
                         </div>
                      </div>
                   </div>
                </motion.div>
              ))}
           </div>
        </div>

        {/* ── RIGHT: NEARBY CLINICS ── */}
        <div className="md:col-span-4 space-y-8">
           <div className="p-8 bg-card border border-border-subtle rounded-[48px] shadow-3xl">
              <div className="flex items-center gap-3 mb-8">
                 <Navigation size={20} className="text-blue-400" />
                 <h3 className="text-sm font-black text-white uppercase tracking-[0.2em]">Nearby Clinical Sites</h3>
              </div>
              <div className="space-y-6">
                 {NEARBY_CLINICS.map((clinic, i) => (
                   <div key={i} className="group cursor-pointer">
                      <div className="flex justify-between items-start mb-2">
                         <h4 className="text-sm font-black text-white group-hover:text-blue-400 transition-colors">{clinic.name}</h4>
                         <span className="text-[10px] font-black text-emerald-500 uppercase">{clinic.distance}</span>
                      </div>
                      <p className="text-[11px] text-text-muted font-medium mb-3">{clinic.address}</p>
                      <div className="flex gap-3">
                         <button className="flex-1 py-2.5 bg-white/5 border border-white/10 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-white/10 transition">Call</button>
                         <button className="flex-1 py-2.5 bg-blue-600 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-lg shadow-blue-600/20">Directions</button>
                      </div>
                      {i < NEARBY_CLINICS.length - 1 && <div className="h-px w-full bg-white/5 mt-6" />}
                   </div>
                 ))}
              </div>
           </div>

           <div className="p-8 bg-gradient-to-br from-blue-600/10 to-transparent border border-blue-500/20 rounded-[48px] relative overflow-hidden">
              <Zap size={24} className="text-blue-400 mb-6" />
              <h4 className="text-sm font-black text-white uppercase tracking-wider mb-2">Clinical Verification</h4>
              <p className="text-xs text-white/50 leading-relaxed font-medium mb-8">
                 All specialists in the LungDetect network are verified by the Medical Council and undergo rigorous credentialing.
              </p>
              <div className="flex items-center gap-3">
                 <CheckCircle2 size={16} className="text-emerald-500" />
                 <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Board Certified Experts</span>
              </div>
           </div>
        </div>

      </div>

      {/* Security Footer */}
      <div className="mt-20 flex items-center justify-center gap-6 opacity-30">
         <div className="flex items-center gap-2">
            <ShieldCheck size={14} className="text-blue-500" />
            <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Clinical Network Protected</span>
         </div>
      </div>
    </div>
  );
}
