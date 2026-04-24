import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  Wind, 
  TrendingDown, 
  Zap, 
  Target, 
  ArrowRight,
  ArrowUpRight,
  ShieldAlert,
  Waves,
  Heart,
  Brain,
  MessageSquare,
  ChevronRight,
  LineChart,
  Activity,
  CloudSun
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function AIInsights() {
  const navigate = useNavigate();
  const [hoveredZone, setHoveredZone] = useState(null);

  // Efficiency HUD Stats
  const HUD_STATS = [
    { label: 'Today Risk', value: 'Low', icon: ShieldAlert, color: 'text-emerald-400' },
    { label: 'AQI Index', value: 'Moderate', icon: CloudSun, color: 'text-amber-400' },
    { label: 'Next Task', value: 'Breathing', icon: Activity, color: 'text-indigo-400' }
  ];

  const INSIGHTS = [
    { 
      id: 1, 
      label: 'Momentum', 
      title: '94% Consistency', 
      desc: 'Positive upward breathing trend.',
      icon: TrendingDown,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10'
    },
    { 
      id: 2, 
      label: 'Alert', 
      title: 'PM2.5 Warning', 
      desc: 'Limit outdoor activity today.',
      icon: ShieldAlert,
      color: 'text-amber-400',
      bg: 'bg-amber-500/10'
    },
    { 
      id: 3, 
      label: 'Observation', 
      title: 'Pattern Shift', 
      desc: 'Detected minor congestion markers.',
      icon: Brain,
      color: 'text-indigo-400',
      bg: 'bg-indigo-500/10'
    }
  ];

  return (
    <div className="max-w-[750px] mx-auto pb-10 px-4 animate-fade-in relative">
      
      {/* ── EFFICIENCY HUD (TOP BAR) ── */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {HUD_STATS.map((stat, i) => (
          <div key={i} className="bg-card border border-border-subtle p-3 rounded-2xl flex items-center gap-3 backdrop-blur-md shadow-lg group hover:border-white/10 transition-all">
             <div className={`w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center ${stat.color} group-hover:scale-110 transition-transform`}>
                <stat.icon size={14} />
             </div>
             <div>
                <p className="text-[8px] font-black text-text-muted uppercase tracking-widest">{stat.label}</p>
                <p className="text-[11px] font-bold text-white leading-none mt-0.5">{stat.value}</p>
             </div>
          </div>
        ))}
      </div>

      {/* ── HEADER ── */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <Sparkles size={20} className="text-white animate-pulse" />
          </div>
          <div>
            <h1 className="text-lg font-black text-white tracking-tight uppercase">AI Insights</h1>
            <p className="text-[9px] text-text-muted font-bold tracking-[0.2em] mt-1 uppercase leading-none italic">Predictive Synthesis v4.2</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
           {[1,2,3].map(i => <div key={i} className="w-1 h-1 rounded-full bg-emerald-500/20" />)}
        </div>
      </div>

      <div className="space-y-4">
        
        {/* HERO INSIGHT */}
        <div className="bg-card border border-border-subtle rounded-[40px] p-8 relative overflow-hidden shadow-2xl group/hero">
           <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 blur-[80px] pointer-events-none group-hover/hero:scale-150 transition-transform duration-1000" />
           
           <div className="flex flex-col sm:flex-row gap-10 items-center">
              <div className="relative w-44 h-60 shrink-0 bg-white/[0.03] rounded-[60px] border border-white/5 flex items-center justify-center overflow-hidden transition-all duration-700 group-hover/hero:border-emerald-500/20 shadow-inner">
                 <div className="relative flex items-center justify-center scale-75">
                    <Waves size={80} className="text-emerald-500/30 animate-slow-y" />
                    <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.5, 0.2] }} transition={{ duration: 4, repeat: Infinity }} className="absolute inset-0 bg-emerald-500 blur-[30px] rounded-full" />
                    <Wind size={40} className="text-white relative z-10" />
                 </div>
                 
                 {/* Efficiency Labels */}
                 <div className="absolute top-6 left-6 right-6 flex justify-between">
                    <div className="w-1 h-3 bg-emerald-500/20 rounded-full" />
                    <div className="w-1 h-3 bg-emerald-500/20 rounded-full" />
                 </div>

                 {/* Mini Hotspots */}
                 <div onMouseEnter={() => setHoveredZone('Pulmonary Function')} onMouseLeave={() => setHoveredZone(null)} className="absolute top-1/2 left-8 w-3 h-3 rounded-full bg-emerald-400 shadow-xl cursor-help animate-pulse group-hover/hero:scale-125 transition-transform" />
                 <div onMouseEnter={() => setHoveredZone('Upper Sector')} onMouseLeave={() => setHoveredZone(null)} className="absolute top-1/4 right-10 w-3 h-3 rounded-full bg-emerald-400 shadow-xl cursor-help group-hover/hero:scale-125 transition-transform" />
              </div>

              <div className="flex-1 space-y-6">
                 <div>
                    <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-[9px] font-black uppercase rounded-full tracking-widest mb-4 inline-block">Active Correlation</span>
                    <h2 className="text-3xl font-black text-white leading-tight tracking-tighter">
                       Efficiency is <span className="text-emerald-400 italic">Surging.</span>
                    </h2>
                 </div>
                 <p className="text-sm text-text-secondary leading-relaxed font-semibold opacity-90">
                    Your patterns indicate a <span className="text-white font-bold underline decoration-emerald-500/50 underline-offset-4">12% baseline improvement</span>. Deep breathing compliance is at an all-time high.
                 </p>
                 <div className="flex gap-3 pt-4">
                    <button onClick={() => navigate('/breathing')} className="flex-1 py-4 bg-white text-gray-900 rounded-[28px] font-black text-[10px] uppercase tracking-[0.2em] shadow-2xl shadow-emerald-500/20 hover:bg-emerald-50 transition transform active:scale-95 flex items-center justify-center gap-3">
                       Enhance <ChevronRight size={16} />
                    </button>
                    <button onClick={() => navigate('/chat')} className="flex-1 py-4 bg-white/5 border border-white/10 text-white rounded-[28px] font-black text-[10px] uppercase tracking-[0.2em] hover:bg-white/10 transition flex items-center justify-center gap-3">
                       Doc Consult
                    </button>
                 </div>
              </div>
           </div>

           {/* Hovered Zone Context */}
           <AnimatePresence>
             {hoveredZone && (
               <motion.div initial={{ opacity:0, y:10, scale:0.95 }} animate={{ opacity:1, y:0, scale:1 }} exit={{ opacity:0, scale:0.95 }} className="absolute bottom-6 left-8 right-8 bg-black/60 border border-emerald-500/30 backdrop-blur-3xl p-4 rounded-3xl flex items-center gap-4 shadow-3xl">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                     <Target size={20} />
                  </div>
                  <div>
                     <p className="text-[9px] font-black text-emerald-400 uppercase tracking-widest leading-none mb-1">Vector Insight</p>
                     <p className="text-xs font-bold text-white tracking-tight">{hoveredZone}: Optimal gas exchange detected.</p>
                  </div>
               </motion.div>
             )}
           </AnimatePresence>
        </div>

        {/* COMPACT EFFICIENCY GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
           {INSIGHTS.map((insight, index) => (
             <motion.div 
               initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ delay: index * 0.1 }}
               key={insight.id} 
               className="bg-card border border-border-subtle rounded-[32px] p-6 hover:border-emerald-500/20 transition-all cursor-pointer group shadow-xl flex flex-col items-center text-center relative overflow-hidden"
             >
                <div className="absolute top-0 right-0 w-12 h-12 bg-white/5 rounded-bl-full pointer-events-none" />
                <div className={`w-12 h-12 rounded-2xl ${insight.bg} ${insight.color} mb-4 flex items-center justify-center shadow-inner`}>
                   <insight.icon size={22} className="group-hover:rotate-6 transition-transform" />
                </div>
                <p className="text-[9px] font-black uppercase tracking-[0.2em] opacity-50 text-white mb-2">{insight.label}</p>
                <h4 className="text-sm font-bold text-white tracking-tight mb-3 truncate w-full">{insight.title}</h4>
                <p className="text-xs text-text-secondary leading-tight font-medium opacity-80 group-hover:opacity-100 transition-opacity">{insight.desc}</p>
             </motion.div>
           ))}
        </div>

        {/* PROJECTION HUD: High Efficiency Edition */}
        <div className="bg-card border border-border-subtle rounded-[40px] p-8 space-y-8 shadow-2xl relative overflow-hidden group/proj">
           <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 blur-[100px] pointer-events-none group-hover/proj:bg-indigo-500/10 transition-colors" />
           
           <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
              <div className="flex items-center gap-4">
                 <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20 shadow-inner">
                    <LineChart size={24} className="text-indigo-400" />
                 </div>
                 <div>
                    <h3 className="text-sm font-black text-white uppercase tracking-wider leading-none mb-1.5">Precision Prognosis</h3>
                    <div className="flex items-center gap-2">
                       <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest bg-emerald-500/10 px-2 py-0.5 rounded-md">Trajectory: Optimal</span>
                       <span className="text-[9px] text-text-muted font-bold tracking-widest uppercase">Target Focus: Aug 2026</span>
                    </div>
                 </div>
              </div>

              <div className="flex items-center gap-4 bg-white/5 py-3 px-6 rounded-3xl border border-white/5 shadow-xl">
                 <div className="text-right">
                    <p className="text-[9px] font-black text-text-muted uppercase tracking-widest mb-1">Efficiency Delta</p>
                    <p className="text-xl font-black text-white">+24.8% <span className="text-[10px] text-emerald-400">Benefit</span></p>
                 </div>
                 <div className="w-[1px] h-8 bg-white/10 mx-2" />
                 <TrendingDown size={28} className="text-emerald-500" />
              </div>
           </div>
           
           <div className="relative space-y-8">
              <div className="h-28 flex items-end gap-2 px-1 relative">
                 {/* Projection Bars */}
                 {[
                   { m: 'FEB', v: 45, current: true, label: 'Stable' },
                   { m: 'MAR', v: 40, label: 'Focus' },
                   { m: 'APR', v: 55, label: 'Gain' },
                   { m: 'MAY', v: 65, milestone: '3-Mo Mark', label: 'Strong' },
                   { m: 'JUN', v: 78, label: 'Near peak' },
                   { m: 'JUL', v: 85, label: 'Clinical' },
                   { m: 'AUG', v: 98, goal: true, label: 'Optimal' }
                 ].map((d, i) => (
                   <div key={i} className="flex-1 flex flex-col items-center gap-4 group/bar relative">
                      {/* Bar */}
                      <div className="w-full bg-white/[0.03] rounded-full h-24 relative overflow-hidden flex flex-col justify-end">
                         <motion.div 
                           initial={{ height: 0 }}
                           animate={{ height: `${d.v}%` }}
                           transition={{ delay: i*0.08 + 0.5, type: 'spring', stiffness: 50 }}
                           className={`w-full rounded-full shadow-2xl transition-colors duration-500 ${d.goal ? 'bg-emerald-500' : d.current ? 'bg-indigo-500' : 'bg-indigo-400/40 group-hover/bar:bg-indigo-400'}`} 
                         />
                      </div>
                      
                      {/* X-Axis Labels */}
                      <span className={`text-[9px] font-black tracking-widest ${d.current ? 'text-indigo-400' : d.goal ? 'text-emerald-400' : 'text-text-muted opacity-50'}`}>
                         {d.m}
                      </span>

                      {/* Floating Marker Labels (Conditional) */}
                      {d.current && <span className="absolute -top-6 text-[8px] font-black text-indigo-400 uppercase tracking-widest">Start</span>}
                      {d.goal && <span className="absolute -top-6 text-[8px] font-black text-emerald-400 uppercase tracking-widest">Goal</span>}
                      {d.milestone && <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 bg-white border border-indigo-500/20 text-gray-900 rounded-xl text-[8px] font-black uppercase whitespace-nowrap shadow-2xl z-20">Milestone</div>}

                      {/* Dynamic Detail Tooltip on Hover */}
                      <div className="absolute inset-0 z-10 opacity-0 group-hover/bar:opacity-100 transition-opacity flex flex-col items-center justify-center bg-card/60 rounded-full backdrop-blur-md border border-white/5">
                         <p className="text-[10px] font-black text-white leading-none mb-1">{d.v}%</p>
                         <p className="text-[7px] font-black text-text-muted uppercase tracking-widest">{d.label}</p>
                      </div>
                   </div>
                 ))}
                 
                 {/* Connective Trend Line (Visual) */}
                 <div className="absolute bottom-4 left-0 w-full h-[1px] bg-gradient-to-r from-indigo-500 via-white/10 to-emerald-500 opacity-20 pointer-events-none" />
              </div>
           </div>

           <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/5 opacity-80">
              <div className="flex items-center gap-3">
                 <div className="w-2 h-2 rounded-full bg-indigo-500" />
                 <p className="text-[9px] font-black text-text-muted uppercase tracking-widest">Baseline Pattern: Regular</p>
                 <div className="w-2 h-2 rounded-full bg-emerald-500 ml-4" />
                 <p className="text-[9px] font-black text-text-muted uppercase tracking-widest">Target Benefit: Max Stability</p>
              </div>
              <p className="text-[10px] font-black text-white leading-none">Vulnerability Reduction: <span className="text-emerald-400">2.4x Multiplier</span></p>
           </div>
        </div>

        {/* QUICK SYNC ACTION */}
        <div className="bg-gradient-to-br from-indigo-600 to-indigo-900 p-8 rounded-[48px] flex items-center justify-between shadow-3xl relative overflow-hidden group">
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_white_0%,transparent_60%)] opacity-10" />
           <div className="relative z-10 flex-1 pr-8 border-r border-white/10 mr-8">
              <div className="flex items-center gap-3 mb-2">
                 <Brain size={24} className="text-white animate-pulse" />
                 <h4 className="text-xl font-black text-white italic tracking-tighter uppercase leading-none">Intelligence Protocol</h4>
              </div>
              <p className="text-xs text-indigo-100 font-medium leading-relaxed">Local AI core requires a fresh health-log to refine your Q3 projections.</p>
           </div>
           <button className="h-16 w-16 rounded-3xl bg-white text-indigo-900 flex items-center justify-center hover:bg-indigo-50 transition-all duration-500 active:scale-90 shadow-2xl group-hover:rotate-12">
              <ArrowRight size={28} />
           </button>
        </div>

      </div>

      <div className="mt-12 text-center opacity-40">
         <p className="text-[9px] text-text-muted font-bold uppercase tracking-[0.4em] mb-2 leading-relaxed">
           Proprietary AI Synthesis Core v4.2.0 • HIPAA Encrypted Local Ledger
         </p>
         <div className="flex justify-center gap-1">
            {[1,2,3,4,5].map(i => <div key={i} className="w-1 h-0.5 bg-white/20 rounded-full" />)}
         </div>
      </div>

    </div>
  );
}
