import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HeartPulse, 
  CheckCircle2, 
  Circle, 
  ChevronRight, 
  Calendar, 
  Wind, 
  Zap, 
  Droplets, 
  Clock, 
  Activity,
  Award,
  ShieldCheck,
  Stethoscope,
  Info,
  ArrowRight,
  Target,
  Moon
} from 'lucide-react';

const RECOVERY_PHASES = [
  {
    id: 1,
    title: 'Inflammation Control',
    status: 'completed',
    tasks: ['Hydration Protocol (3L/day)', 'Stable Pulse Oximetric', 'Anti-inflammatory diet'],
  },
  {
    id: 2,
    title: 'Pulmonary Strengthening',
    status: 'active',
    tasks: ['Breathing Exercises (2x/day)', 'Daily 15m light walking', 'Chest expansion stretches'],
  },
  {
    id: 3,
    title: 'Capacity Restoration',
    status: 'locked',
    tasks: ['Short aerobic sessions', 'Stair climbing test', 'Deep tissue oxygenation'],
  }
];

export default function RecoveryPlan() {
  const [completedTasks, setCompletedTasks] = useState(['Hydration Protocol (3L/day)']);

  const toggleTask = (task) => {
    setCompletedTasks(prev => 
      prev.includes(task) ? prev.filter(t => t !== task) : [...prev, task]
    );
  };

  const currentPhase = RECOVERY_PHASES.find(p => p.status === 'active');

  return (
    <div className="max-w-[750px] mx-auto pb-10 px-4 animate-fade-in relative">
      
      {/* ── CLEAN CLINICAL RECOVERY HUB ── */}
      <div className="bg-card border border-border-subtle rounded-[48px] p-8 mb-10 shadow-3xl relative overflow-hidden group/hub">
         <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 via-transparent to-indigo-500/5 pointer-events-none" />
         
         <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center relative z-10">
            {/* Left: Main Readiness Gauge */}
            <div className="md:col-span-12 lg:col-span-5 flex flex-col items-center">
               <div className="relative w-44 h-44 mb-6">
                  {/* Outer Orbiting Glow */}
                  <div className="absolute inset-0 rounded-full border border-teal-500/10 animate-pulse" />
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                    className="absolute -inset-2 rounded-full border-t border-teal-500/20" 
                  />
                  
                  {/* Main Progress Arc */}
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    <circle className="text-white/5" strokeWidth="2.5" stroke="currentColor" fill="none" cx="18" cy="18" r="16" />
                    <motion.circle 
                      initial={{ strokeDasharray: "0, 100" }}
                      animate={{ strokeDasharray: "78, 100" }}
                      className="text-teal-400" 
                      strokeWidth="2.5" stroke="currentColor" strokeLinecap="round" fill="none" cx="18" cy="18" r="16" 
                    />
                  </svg>
                  
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                     <span className="text-3xl font-black text-white tracking-tighter">78%</span>
                     <span className="text-[9px] font-black text-teal-400 uppercase tracking-[0.3em]">Readiness</span>
                  </div>
               </div>
               <div className="text-center">
                  <h2 className="text-xl font-black text-white uppercase tracking-tighter italic">Optimal Recovery Window</h2>
                  <p className="text-[10px] text-text-secondary font-medium tracking-widest mt-1">Biometrics Synced • Next Log in 2h</p>
               </div>
            </div>

            {/* Right: Detailed Biometric Nodes & Quick Pods */}
            <div className="md:col-span-12 lg:col-span-7 flex flex-col gap-8">
               <div className="grid grid-cols-3 gap-4">
                  {[
                    { label: 'SpO2', value: '98%', v: 98, color: 'text-emerald-400', ring: 'text-emerald-500' },
                    { label: 'Hydration', value: '75%', v: 75, color: 'text-cyan-400', ring: 'text-cyan-500' },
                    { label: 'Sleep', value: '82%', v: 82, color: 'text-indigo-400', ring: 'text-indigo-500' }
                  ].map((bio, i) => (
                    <div key={i} className="bg-white/5 border border-white/5 p-4 rounded-3xl flex flex-col items-center gap-3 shadow-inner group-hover:border-teal-500/10 transition-colors">
                       <div className="relative w-12 h-12">
                          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                             <circle className="text-white/5" strokeWidth="3" stroke="currentColor" fill="none" cx="18" cy="18" r="16" />
                             <motion.circle 
                               animate={{ strokeDasharray: `${bio.v}, 100` }}
                               className={bio.ring} strokeWidth="3" stroke="currentColor" strokeLinecap="round" fill="none" cx="18" cy="18" r="16" 
                             />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                             <span className="text-[9px] font-black text-white">{bio.value}</span>
                          </div>
                       </div>
                       <span className="text-[10px] font-black text-text-muted uppercase tracking-widest">{bio.label}</span>
                    </div>
                  ))}
               </div>

               <div className="space-y-4">
                  <p className="text-[10px] font-black text-white uppercase tracking-[0.4em] opacity-40 mb-2">Instant Log Pods</p>
                  <div className="flex gap-4">
                     {[
                       { icon: Droplets, label: 'Water', bg: 'hover:bg-cyan-500' },
                       { icon: Wind, label: 'Deep Breath', bg: 'hover:bg-teal-500' },
                       { icon: CheckCircle2, label: 'Med Log', bg: 'hover:bg-indigo-500' }
                     ].map((pod, i) => (
                       <button key={i} className={`flex-1 flex flex-col items-center justify-center p-3 rounded-2xl bg-white/5 border border-white/5 transition-all duration-500 group ${pod.bg} hover:shadow-2xl`}>
                          <pod.icon size={20} className="text-white opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all" />
                          <span className="text-[8px] font-black text-text-muted group-hover:text-white uppercase tracking-widest mt-2">{pod.label}</span>
                       </button>
                     ))}
                  </div>
               </div>
            </div>
         </div>

         {/* Bottom Status Tip */}
         <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-3">
               <Zap size={14} className="text-cyan-400" />
               <span className="text-[10px] font-black text-text-muted uppercase tracking-widest">Efficiency Multiplier: 1.4x Active</span>
            </div>
            <div className="flex items-center gap-2">
               <span className="text-[10px] font-black text-teal-400 uppercase tracking-widest">Next Milestone:</span>
               <span className="text-[10px] font-black text-white uppercase tracking-widest">Full Capacity Aug 15</span>
            </div>
         </div>
      </div>

      <div className="space-y-4">
        
        {/* ── TODAY'S MISSION ── CLEAN TEAL ── */}
        <div className="bg-card border border-border-subtle rounded-[32px] p-6 shadow-2xl relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/10 blur-[60px] pointer-events-none" />
           
           <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                 <Target size={18} className="text-teal-400" />
                 <h2 className="text-lg font-black text-white tracking-tight">Today's Protocol</h2>
              </div>
              <button className="text-[9px] font-black text-teal-400 uppercase tracking-widest hover:underline decoration-2 underline-offset-4">
                 Complete All
              </button>
           </div>

           <div className="space-y-2.5">
              {currentPhase.tasks.map((task, i) => {
                const isDone = completedTasks.includes(task);
                return (
                  <button key={i} onClick={() => toggleTask(task)}
                    className={`w-full flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300 transform active:scale-[0.98] ${isDone ? 'bg-teal-500/10 border-teal-500/20' : 'bg-white/5 border-white/5 hover:bg-white/10'}`}>
                     <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${isDone ? 'bg-teal-500 text-white shadow-lg' : 'bg-white/5 text-text-muted'}`}>
                        {isDone ? <CheckCircle2 size={16} /> : <Circle size={16} />}
                     </div>
                     <span className={`text-xs font-bold tracking-tight text-left ${isDone ? 'text-white' : 'text-text-primary transition-colors'}`}>{task}</span>
                     {isDone && <Zap size={10} className="ml-auto text-teal-400" />}
                  </button>
                );
              })}
           </div>
        </div>

        {/* RECOVERY TIMELINE: Clean Cyan Prognosis */}
        <div className="bg-card border border-border-subtle rounded-[40px] p-8 shadow-2xl space-y-10 relative overflow-hidden group/tl">
           <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/5 blur-[100px] pointer-events-none group-hover/tl:bg-teal-500/10 transition-colors duration-1000" />
           
           <div className="flex items-center justify-between relative z-10">
              <div className="space-y-1">
                 <h3 className="text-[11px] font-black text-teal-400 uppercase tracking-[0.4em]">Recovery Prognosis</h3>
                 <p className="text-[9px] text-text-muted font-bold tracking-[0.2em] uppercase">Phase-to-Phase Capacity Analysis</p>
              </div>
              <div className="flex items-center gap-2 bg-teal-500/10 px-4 py-2 rounded-2xl border border-teal-500/20">
                 <Target size={14} className="text-teal-500" />
                 <span className="text-[10px] font-black text-white uppercase tracking-widest">Active Focus: Phase 02</span>
              </div>
           </div>

           <div className="relative pt-12 pb-6 px-4">
              {/* Central Clinical Line */}
              <div className="absolute top-[60px] left-8 right-8 h-[2px] bg-white/5 z-0" />
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '50%' }}
                className="absolute top-[60px] left-8 h-[2px] bg-gradient-to-r from-teal-500 to-white z-0"
              />

              <div className="flex justify-between items-start relative z-10">
                 {[
                   { id: 1, title: 'Control', status: 'completed', date: 'FEB 12', stability: 98, color: 'teal' },
                   { id: 2, title: 'Strengthen', status: 'active', focus: true, date: 'MAR 28', stability: 65, color: 'white' },
                   { id: 3, title: 'Restore', status: 'locked', date: 'APR 15', stability: 0, mult: '1.5x', color: 'dim' }
                 ].map((p, idx) => (
                   <div key={p.id} className="flex flex-col items-center gap-4 group/node">
                      {/* Clinical Node */}
                      <div className="relative">
                         {p.focus && (
                           <motion.div 
                             animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.6, 0.3] }}
                             transition={{ duration: 3, repeat: Infinity }}
                             className="absolute inset-0 bg-teal-500 blur-[15px] rounded-full"
                           />
                         )}
                         <div className={`w-10 h-10 rounded-full border-[3px] border-card flex items-center justify-center transition-all duration-500 ${p.status === 'completed' ? 'bg-teal-500' : p.status === 'active' ? 'bg-white' : 'bg-white/10'}`}>
                            {p.status === 'completed' && <CheckCircle2 size={16} className="text-white" />}
                            {p.status === 'active' && <div className="w-2 h-2 rounded-full bg-teal-500" />}
                         </div>
                         
                         {/* Stability Tooltip */}
                         <div className="absolute -top-12 left-1/2 -translate-x-1/2 opacity-0 group-hover/node:opacity-100 transition-all duration-300 pointer-events-none">
                            <div className="bg-white text-gray-900 px-3 py-1.5 rounded-xl text-[9px] font-black uppercase whitespace-nowrap shadow-3xl flex items-center gap-2">
                               <Zap size={10} className="text-teal-500" /> stability: {p.stability}%
                            </div>
                         </div>
                      </div>

                      {/* Info Group */}
                      <div className="text-center space-y-1">
                         <p className={`text-[10px] font-black tracking-[0.2em] uppercase ${p.status === 'locked' ? 'text-text-muted opacity-30' : 'text-white'}`}>{p.date}</p>
                         <h4 className={`text-xs font-bold uppercase tracking-tight ${p.status === 'active' ? 'text-teal-400' : 'text-text-muted opacity-60'}`}>{p.title}</h4>
                      </div>

                      {/* Benefit Badge */}
                      {p.mult && (
                        <div className="mt-2 px-2 py-0.5 bg-indigo-500/10 border border-indigo-500/20 rounded-md">
                           <span className="text-[8px] font-black text-indigo-400">BENEFIT {p.mult}</span>
                        </div>
                      )}
                   </div>
                 ))}
              </div>
           </div>

           <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 opacity-70">
              <div className="flex gap-4">
                 <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-teal-500 shadow-lg shadow-teal-500/40" />
                    <span className="text-[9px] font-black text-text-muted uppercase tracking-widest">Clinical Baseline</span>
                 </div>
                 <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-white shadow-lg" />
                    <span className="text-[9px] font-black text-text-muted uppercase tracking-widest">Active Synthesis</span>
                 </div>
              </div>
              <p className="text-[10px] font-black text-white italic tracking-widest leading-none">
                 Global Healing Velocity: <span className="text-teal-400">+12% / Week</span>
              </p>
           </div>
        </div>

        {/* ── EFFICIENT AI TIP ── */}
        <div className="bg-gradient-to-br from-indigo-900/60 to-transparent border border-white/5 rounded-[32px] p-6 relative overflow-hidden flex items-center gap-6 shadow-xl group">
           <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center shrink-0 shadow-inner group-hover:scale-110 transition-transform">
              <Stethoscope size={20} className="text-indigo-400" />
           </div>
           <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                 <p className="text-[9px] font-black text-indigo-400 uppercase tracking-widest">Efficiency Hint</p>
                 <div className="w-4 h-[1px] bg-white/10" />
              </div>
              <p className="text-xs text-text-secondary leading-relaxed font-medium italic">
                Perform Phase 2 breathing between <span className="text-indigo-300 font-bold underline decoration-indigo-500/30 underline-offset-2">6 PM - 9 PM</span> for 1.4x deep tissue gain.
              </p>
           </div>
           <button className="h-10 w-10 rounded-full bg-white/5 hover:bg-white/10 text-white flex items-center justify-center transition active:scale-90">
              <ChevronRight size={18} />
           </button>
        </div>

      </div>

      <div className="mt-8 text-center px-8 opacity-40">
         <p className="text-[9px] text-text-muted font-bold tracking-[0.3em] uppercase leading-relaxed italic">
            Recovery HUD v4.2.0 • Data verified across clinical nodes • Always consult an MD.
         </p>
      </div>

    </div>
  );
}
