import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Pill, 
  Plus, 
  Clock, 
  AlertCircle, 
  CheckCircle2, 
  ChevronRight, 
  Info, 
  Bell, 
  Calendar,
  Zap,
  ShieldCheck,
  Stethoscope,
  Trash2,
  CalendarDays
} from 'lucide-react';

const INITIAL_MEDS = [
  { id: 1, name: 'Albuterol Inhaler', dosage: '2 puffs', frequency: 'Every 4-6 hours', type: 'Bronchodilator', stock: 12, total: 60, next: '14:30', taken: false },
  { id: 2, name: 'Prednisone', dosage: '10mg', frequency: 'Once daily with food', type: 'Corticosteroid', stock: 5, total: 30, next: '09:00', taken: true },
  { id: 3, name: 'Acetylcysteine', dosage: '600mg', frequency: 'Twice daily', type: 'Mucolytic', stock: 24, total: 40, next: '18:00', taken: false }
];

export default function Medications() {
  const [meds, setMeds] = useState(INITIAL_MEDS);
  const [activeView, setActiveView] = useState('Today');

  const toggleTaken = (id) => {
    setMeds(meds.map(m => m.id === id ? { ...m, taken: !m.taken } : m));
  };

  return (
    <div className="max-w-[800px] mx-auto pb-20 px-4 animate-fade-in relative">
      
      {/* ── MEDICATIONS HEADER ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div className="flex items-center gap-5">
           <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-indigo-600 flex items-center justify-center shadow-2xl shadow-cyan-500/20">
              <Pill size={28} className="text-white rotate-45" />
           </div>
           <div>
              <h1 className="text-3xl font-black text-white tracking-tighter">Medication Cabinet</h1>
              <p className="text-[10px] text-cyan-400 font-black uppercase tracking-[0.3em] opacity-80">Prescription Sync v4.2</p>
           </div>
        </div>

        <div className="flex bg-card border border-border-subtle p-1.5 rounded-2xl">
           {['Today', 'Schedule', 'Cabinet'].map(v => (
             <button key={v} onClick={() => setActiveView(v)}
               className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeView === v ? 'bg-white text-gray-900 shadow-xl' : 'text-text-muted hover:text-white'}`}>
               {v}
             </button>
           ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* LEFT: ACTIVE SHIFT TRACKER */}
        <div className="lg:col-span-7 space-y-6">
           
           {/* REFILL ALERT POD */}
           <AnimatePresence>
             {meds.some(m => m.stock < 10) && (
               <motion.div initial={{ opacity:0, y:-20 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }} className="bg-amber-500/10 border border-amber-500/20 p-5 rounded-[32px] flex items-center gap-4 shadow-xl">
                  <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center text-white shrink-0 shadow-lg shadow-amber-500/20 animate-pulse">
                     <AlertCircle size={20} />
                  </div>
                  <div>
                     <p className="text-[10px] font-black text-amber-500 uppercase tracking-widest leading-none mb-1">Low Inventory Alert</p>
                     <p className="text-xs font-bold text-white tracking-tight">Prednisone is low (5 doses left). Refill recommended within 48h.</p>
                  </div>
               </motion.div>
             )}
           </AnimatePresence>

           <div className="space-y-4">
              <div className="flex items-center justify-between px-2">
                 <h2 className="text-[11px] font-black text-white uppercase tracking-[0.4em]">Upcoming Doses</h2>
                 <div className="flex items-center gap-2 text-cyan-400">
                    <Clock size={14} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Next: 14:30</span>
                 </div>
              </div>

              {meds.map((med, index) => (
                <motion.div 
                  initial={{ opacity:0, x:-20 }} animate={{ opacity:1, x:0 }} transition={{ delay: index * 0.1 }}
                  key={med.id} 
                  className={`bg-card border border-border-subtle rounded-[32px] p-6 flex items-center justify-between group hover:border-cyan-500/40 transition-all duration-500 shadow-xl ${med.taken ? 'opacity-60' : ''}`}
                >
                   <div className="flex items-center gap-5">
                      <div className={`w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center ${med.taken ? 'text-emerald-500' : 'text-cyan-400'} group-hover:scale-110 transition-transform`}>
                         {med.taken ? <CheckCircle2 size={28} /> : <Pill size={28} className="rotate-45" />}
                      </div>
                      <div>
                         <div className="flex items-center gap-3 mb-1">
                            <span className="text-[9px] font-black uppercase tracking-widest text-cyan-400">{med.type}</span>
                            <span className="text-[10px] font-bold text-text-muted">• {med.dosage}</span>
                         </div>
                         <h3 className="text-lg font-black text-white tracking-tight uppercase group-hover:text-cyan-400 transition-colors">{med.name}</h3>
                         <div className="flex items-center gap-3 mt-1.5">
                            <Clock size={12} className="text-text-muted" />
                            <span className="text-[10px] font-bold text-text-muted">{med.frequency}</span>
                         </div>
                      </div>
                   </div>

                   <button onClick={() => toggleTaken(med.id)}
                     className={`h-12 px-6 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${med.taken ? 'bg-emerald-500 text-white shadow-xl' : 'bg-white/5 text-cyan-400 border border-white/5 hover:bg-cyan-500 hover:text-white'}`}>
                      {med.taken ? 'Taken' : 'Take Now'}
                   </button>
                </motion.div>
              ))}

              <button className="w-full py-5 border-2 border-dashed border-white/5 rounded-[32px] text-text-muted flex items-center justify-center gap-3 hover:border-cyan-500/40 hover:text-white transition-all group">
                 <Plus size={20} className="group-hover:rotate-90 transition-transform duration-500" />
                 <span className="text-xs font-black uppercase tracking-widest">Add New Prescription</span>
              </button>
           </div>
        </div>

        {/* RIGHT: SMART AI OVERLAY */}
        <div className="lg:col-span-5 space-y-6">
           
           {/* CLINICAL INTELLIGENCE CARD */}
           <div className="bg-gradient-to-br from-indigo-900/40 to-transparent border border-white/5 rounded-[40px] p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-[60px]" />
              <div className="flex items-center gap-4 mb-6">
                 <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-indigo-400">
                    <Stethoscope size={20} />
                 </div>
                 <h3 className="text-sm font-black text-white uppercase tracking-wider">AI Protocol Sync</h3>
              </div>
              <p className="text-xs text-text-secondary leading-relaxed font-medium mb-8">
                Based on your <span className="text-white font-bold italic">Latest X-Ray (Apr 08)</span> showing moderate density markers, the AI has synthesized the following adherence goal:
              </p>
              
              <div className="space-y-4">
                 {[
                   { label: 'Hydration Sync', value: 'High Importance', detail: 'Mucolytic efficiency is 24% higher when hydration is >2.5L.' },
                   { label: 'Morning Timing', value: 'Critical', detail: 'Take Prednisone before 09:00 for optimal hormone alignment.' }
                 ].map((tip, i) => (
                   <div key={i} className="bg-white/5 p-4 rounded-2xl border border-white/5">
                      <div className="flex items-center justify-between mb-2">
                         <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">{tip.label}</p>
                         <span className="text-[8px] font-black bg-white/10 px-2 py-0.5 rounded text-white">{tip.value}</span>
                      </div>
                      <p className="text-[10px] text-text-muted leading-relaxed font-semibold italic">"{tip.detail}"</p>
                   </div>
                 ))}
              </div>
           </div>

           {/* STOCK DASHBOARD */}
           <div className="bg-card border border-border-subtle rounded-[40px] p-8 shadow-2xl space-y-6">
              <div className="flex items-center justify-between">
                 <h3 className="text-[11px] font-black text-white uppercase tracking-[0.3em]">Supply Analytics</h3>
                 <Bell size={18} className="text-text-muted" />
              </div>
              
              <div className="space-y-5">
                 {meds.map(m => (
                   <div key={m.id} className="space-y-2">
                      <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                         <span className="text-white">{m.name}</span>
                         <span className={m.stock < 10 ? 'text-amber-500' : 'text-text-muted'}>{m.stock}/{m.total} doses</span>
                      </div>
                      <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                         <motion.div 
                           initial={{ width: 0 }}
                           animate={{ width: `${(m.stock / m.total) * 100}%` }}
                           transition={{ duration: 1, delay: 0.5 }}
                           className={`h-full ${m.stock < 10 ? 'bg-amber-500' : 'bg-cyan-500'}`} 
                         />
                      </div>
                   </div>
                 ))}
              </div>
              
              <button className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-indigo-500 transition shadow-xl shadow-indigo-600/20 active:scale-95">
                 Order All Refills
              </button>
           </div>
        </div>
      </div>

      <div className="mt-16 text-center opacity-40 max-w-2xl mx-auto">
         <p className="text-[9px] text-text-muted font-bold tracking-[0.4em] uppercase leading-relaxed italic mb-4">
           Clinical Medication Ledger v4.2.0 • Data encrypted locally. This module provides tracking and reminders. 
         </p>
         <div className="p-4 bg-white/5 rounded-2xl border border-white/5 text-[10px] text-text-secondary leading-relaxed font-semibold italic">
           <AlertCircle size={12} className="inline mr-2 text-amber-500 mb-1" />
           MEDICAL DISCLAIMER: All medication information is for tracking purposes only. Always consult your personal physician before starting, stopping, or changing medications.
         </div>
      </div>

    </div>
  );
}
