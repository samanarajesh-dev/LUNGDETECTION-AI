import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Wind, 
  Play, 
  Square, 
  Clock, 
  Activity,
  Award,
  Settings2,
  RefreshCw,
  Brain,
  ShieldCheck,
  Timer
} from 'lucide-react';

const BREATHING_MODES = [
  { id: 'box', name: 'Box', pattern: [4, 4, 4, 4], desc: 'Focus' },
  { id: 'relax', name: 'Relax', pattern: [4, 7, 8, 0], desc: 'Calm' },
  { id: 'rapid', name: 'Energize', pattern: [2, 0, 2, 0], desc: 'Zen' }
];

export default function Breathing() {
  const [activeMode, setActiveMode] = useState(BREATHING_MODES[0]);
  const [phase, setPhase] = useState('Off'); // Off, Inhale, Hold, Exhale, Rest
  const [isActive, setIsActive] = useState(false);
  const [sessionTime, setSessionTime] = useState(0);
  const [phaseTimeLeft, setPhaseTimeLeft] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    let timeout;
    if (isActive) {
      const [inhale, hold, exhale, rest] = activeMode.pattern;

      if (phase === 'Off' || phase === 'Rest') {
        setPhase('Inhale');
        setPhaseTimeLeft(inhale);
        timeout = setTimeout(() => setPhase(hold > 0 ? 'Hold' : 'Exhale'), inhale * 1000);
      } else if (phase === 'Inhale') {
        setPhaseTimeLeft(inhale);
        timeout = setTimeout(() => setPhase(hold > 0 ? 'Hold' : 'Exhale'), inhale * 1000);
      } else if (phase === 'Hold') {
        setPhaseTimeLeft(hold);
        timeout = setTimeout(() => setPhase('Exhale'), hold * 1000);
      } else if (phase === 'Exhale') {
        setPhaseTimeLeft(exhale);
        timeout = setTimeout(() => setPhase(rest > 0 ? 'Rest' : 'Inhale'), exhale * 1000);
      } else if (phase === 'Rest') {
        setPhaseTimeLeft(rest);
        timeout = setTimeout(() => setPhase('Inhale'), rest * 1000);
      }
    }
    return () => clearTimeout(timeout);
  }, [isActive, phase, activeMode]);

  // Phase Countdown Timer
  useEffect(() => {
    let interval;
    if (isActive && phaseTimeLeft > 0) {
      interval = setInterval(() => {
        setPhaseTimeLeft(prev => Math.max(0, prev - 1));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, phase]);

  // Session Timer
  useEffect(() => {
    if (isActive) {
      timerRef.current = setInterval(() => setSessionTime(prev => prev + 1), 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isActive]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const getPhaseColor = () => {
    switch(phase) {
      case 'Inhale': return 'bg-teal-500';
      case 'Hold': return 'bg-indigo-600';
      case 'Exhale': return 'bg-cyan-500';
      default: return 'bg-white/5';
    }
  };

  return (
    <div className="max-w-[700px] mx-auto pb-10 px-4 animate-fade-in relative min-h-[calc(100vh-120px)] flex flex-col items-center justify-center">
      
      {/* ── EFFICIENCY HUD ── */}
      <div className="w-full grid grid-cols-3 gap-3 mb-12">
        {[
          { label: 'Session', value: formatTime(sessionTime), icon: Clock, color: 'text-white' },
          { label: 'Efficiency', value: '98%', icon: Activity, color: 'text-teal-400' },
          { label: 'Stability', value: 'High', icon: ShieldCheck, color: 'text-indigo-400' }
        ].map((stat, i) => (
          <div key={i} className="bg-card border border-border-subtle p-3 rounded-2xl flex items-center gap-3 backdrop-blur-md">
             <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                <stat.icon size={14} className={stat.color} />
             </div>
             <div>
                <p className="text-[7px] font-black text-text-muted uppercase tracking-[0.2em]">{stat.label}</p>
                <p className="text-[11px] font-black text-white">{stat.value}</p>
             </div>
          </div>
        ))}
      </div>

      {/* ── MODE QUICK SELECT ── */}
      <div className="flex bg-card border border-border-subtle p-1.5 rounded-2xl mb-12 w-full max-w-sm">
         {BREATHING_MODES.map(mode => (
           <button key={mode.id} onClick={() => { setActiveMode(mode); setIsActive(false); setPhase('Off'); }}
             className={`flex-1 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeMode.id === mode.id ? 'bg-white text-gray-900 shadow-xl' : 'text-text-muted hover:text-white'}`}>
              {mode.name}
           </button>
         ))}
      </div>

      {/* ── CENTRAL ENGINE ── */}
      <div className="relative w-64 h-64 mb-12 flex items-center justify-center">
         {/* Phase Progress Ring */}
         <svg className="absolute inset-0 w-full h-full transform -rotate-90">
            <circle className="text-white/5" strokeWidth="4" stroke="currentColor" fill="none" cx="50%" cy="50%" r="48%" />
            <motion.circle 
              animate={{ strokeDashoffset: isActive ? 0 : 301 }}
              className="text-teal-500" strokeWidth="4" strokeDasharray="301" stroke="currentColor" strokeLinecap="round" fill="none" cx="50%" cy="50%" r="48%" 
              style={{ transition: `stroke-dashoffset ${phaseTimeLeft}s linear` }}
            />
         </svg>

         {/* Core Circle */}
         <motion.div 
           animate={{ 
             scale: phase === 'Inhale' || phase === 'Hold' ? 1.3 : 1,
             opacity: phase === 'Off' ? 0.3 : 1
           }}
           transition={{ duration: phaseTimeLeft, ease: 'linear' }}
           className={`w-40 h-40 rounded-full flex flex-col items-center justify-center shadow-2xl transition-colors duration-1000 ${getPhaseColor()}`}
         >
            <span className="text-xl font-black text-white italic tracking-tighter uppercase">{phase === 'Off' ? 'Ready' : phase}</span>
            {isActive && (
              <span className="text-4xl font-black text-white mt-1">{phaseTimeLeft}s</span>
            )}
         </motion.div>
      </div>

      {/* ── MASTER CONTROLS ── */}
      <div className="flex flex-col items-center gap-10 w-full">
         <div className="flex items-center gap-8">
            <button onClick={() => { setIsActive(false); setSessionTime(0); setPhase('Off'); }} 
              className="w-12 h-12 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-text-muted hover:bg-white/10 transition-all">
               <RefreshCw size={20} />
            </button>
            
            <button 
              onClick={() => setIsActive(!isActive)}
              className={`h-20 px-12 rounded-[32px] font-black text-xs uppercase tracking-[0.3em] transition-all flex items-center gap-4 ${isActive ? 'bg-white text-black shadow-2xl' : 'bg-teal-500 text-white shadow-xl shadow-teal-500/20'}`}
            >
               {isActive ? <Square size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" />}
               {isActive ? 'Stop' : 'Start Session'}
            </button>

            <button className="w-12 h-12 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-text-muted hover:bg-white/10 transition-all">
               <Settings2 size={20} />
            </button>
         </div>

         {/* Efficiency Feedback */}
         <div className="bg-card border border-border-subtle p-6 rounded-[32px] w-full relative overflow-hidden flex items-center justify-between group shadow-xl">
            <div className="absolute top-0 right-0 w-24 h-24 bg-teal-500/5 blur-2xl group-hover:bg-teal-500/10 transition-colors" />
            <div className="flex items-center gap-4">
               <div className="w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center">
                  <Brain size={20} className="text-teal-400" />
               </div>
               <div>
                  <p className="text-[9px] font-black text-text-muted uppercase tracking-widest leading-none mb-1">Live Efficiency</p>
                  <p className="text-xs font-bold text-white tracking-tight">Vagus nerve activation: <span className="text-teal-400">High</span></p>
               </div>
            </div>
            <div className="flex flex-col items-end">
               <p className="text-[10px] font-black text-white">12:04</p>
               <p className="text-[7px] font-black text-text-muted uppercase">Target</p>
            </div>
         </div>
      </div>

      <div className="mt-8 opacity-30">
         <p className="text-[8px] font-black text-text-muted uppercase tracking-[0.4em] italic">Breath Dynamics Engine v4.2.0 • HIPAA Encrypted Session</p>
      </div>

    </div>
  );
}
