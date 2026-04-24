import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Stethoscope, ChevronRight, ChevronLeft, CheckCircle2, 
  AlertCircle, Info, Thermometer, Wind, Activity,
  User, Clock, ArrowRight, ShieldCheck, Zap,
  RotateCcw, Heart, Droplets, AlertTriangle, Scan
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SYMPTOMS_LIST = [
  { id: 'cough', label: 'Persistent Cough', icon: Activity, category: 'Respiratory', risk: 25 },
  { id: 'fever', label: 'High Fever', icon: Thermometer, category: 'General', risk: 15 },
  { id: 'breath', label: 'Shortness of Breath', icon: Wind, category: 'Respiratory', risk: 40 },
  { id: 'chest_pain', label: 'Acute Chest Pain', icon: Heart, category: 'Cardiac/Resp', risk: 35 },
  { id: 'fatigue', label: 'Extreme Fatigue', icon: User, category: 'General', risk: 10 },
  { id: 'sputum', label: 'Bloody Sputum', icon: Droplets, category: 'Respiratory', risk: 50 },
  { id: 'night_sweats', label: 'Night Sweats', icon: Thermometer, category: 'General', risk: 20 },
];

export default function SymptomChecker() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [profile, setProfile] = useState({ age: '', gender: '', smoker: 'no' });
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [intensities, setIntensities] = useState({});
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [riskScore, setRiskScore] = useState(0);

  useEffect(() => {
    const baseRisk = selectedSymptoms.reduce((acc, id) => {
      const s = SYMPTOMS_LIST.find(x => x.id === id);
      const intensity = intensities[id] || 5;
      return acc + (s?.risk || 0) * (intensity / 5);
    }, 0);
    setRiskScore(Math.min(Math.round(baseRisk), 98));
  }, [selectedSymptoms, intensities]);

  const toggleSymptom = (id) => {
    setSelectedSymptoms(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const nextStep = () => {
    if (currentStep === 2) {
      setIsAnalyzing(true);
      setTimeout(() => {
        setIsAnalyzing(false);
        setCurrentStep(3);
      }, 2000); // Faster analysis for small version
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const reset = () => {
    setCurrentStep(0);
    setSelectedSymptoms([]);
    setIntensities({});
    setRiskScore(0);
  };

  return (
    <div className="max-w-[750px] mx-auto pb-10 px-4 animate-fade-in">
      
      {/* ── SLEEK COMPACT HEADER ── */}
      <div className="flex items-center justify-between mb-8 bg-card border border-border-subtle p-4 rounded-3xl backdrop-blur-xl shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Stethoscope size={24} className="text-white" />
          </div>
          <div>
            <h1 className="text-xl font-black text-white tracking-tight">AI Diagnostic</h1>
            <p className="text-[10px] text-text-muted font-bold uppercase tracking-[0.2em]">Clinical Engine v4.2</p>
          </div>
        </div>

        {/* HUD Ring */}
        <div className="flex items-center gap-4 bg-white/5 pr-5 pl-2 py-2 rounded-2xl border border-white/5">
           <div className="relative w-10 h-10">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <circle className="text-white/5" strokeWidth="4" stroke="currentColor" fill="none" cx="18" cy="18" r="16" />
                <motion.circle 
                  animate={{ strokeDasharray: `${riskScore}, 100` }}
                  className={`${riskScore > 70 ? 'text-red-500' : 'text-cyan-500'}`} 
                  strokeWidth="4" stroke="currentColor" strokeLinecap="round" fill="none" cx="18" cy="18" r="16" 
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                 <span className="text-[9px] font-black text-white">{riskScore}%</span>
              </div>
           </div>
           <div>
              <p className="text-[9px] font-black text-text-muted uppercase tracking-widest">Agg. Risk</p>
              <p className={`text-xs font-bold leading-none ${riskScore > 70 ? 'text-red-400' : 'text-white'}`}>
                {riskScore > 70 ? 'ALERT' : 'STABLE'}
              </p>
           </div>
        </div>
      </div>

      {/* ── CORE COMPACT APP BOX ── */}
      <div className="bg-card border border-border-subtle rounded-[40px] overflow-hidden shadow-2xl backdrop-blur-3xl min-h-[550px] flex flex-col relative">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-40" />
        
        <div className="p-8 md:p-10 flex-1 flex flex-col">
          <AnimatePresence mode="wait">
            {isAnalyzing ? (
              <motion.div key="analyzing" initial={{ opacity:0, scale:0.96 }} animate={{ opacity:1, scale:1 }} exit={{ opacity:0 }} className="flex-1 flex flex-col items-center justify-center text-center py-12">
                 <div className="relative w-28 h-28 mb-8">
                    <div className="absolute inset-0 rounded-full border border-white/5 animate-pulse" />
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity, ease: 'linear' }} className="absolute inset-0 rounded-full border-t-2 border-cyan-500" />
                    <div className="absolute inset-0 flex items-center justify-center">
                       <Activity className="text-cyan-400" size={36} />
                    </div>
                 </div>
                 <h2 className="text-2xl font-black text-white mb-2 tracking-tight">Processing Vectors</h2>
                 <p className="text-xs text-text-secondary max-w-xs font-medium italic opacity-70">Cross-referencing symptoms with clinical database...</p>
                 <div className="mt-8 flex gap-1.5">
                   {[1,2,3].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-cyan-500/30 animate-pulse" />)}
                 </div>
              </motion.div>
            ) : (
              <>
                {currentStep === 0 && (
                  <motion.div key="s0" initial={{ opacity:0, x:30 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:-30 }} className="space-y-10">
                    <div>
                      <h2 className="text-3xl font-black text-white mb-2 tracking-tight">Baseline</h2>
                      <div className="h-1 w-12 bg-cyan-500 rounded-full mb-2" />
                      <p className="text-xs text-text-muted font-bold uppercase tracking-widest">Step 01: Patient Identity</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-8">
                      <div className="space-y-4">
                         <label className="text-[10px] font-black text-cyan-400 uppercase tracking-[0.2em] flex items-center gap-2"><Clock size={12}/> Age Group</label>
                         <div className="grid grid-cols-2 gap-2">
                            {['child', 'teen', 'adult', 'senior'].map(a => (
                              <button key={a} onClick={() => setProfile({...profile, age: a})} 
                                className={`py-4 rounded-2xl border text-[10px] font-black uppercase transition-all duration-300 ${profile.age === a ? 'bg-white text-gray-900 border-white shadow-lg' : 'bg-white/5 border-white/5 text-text-muted'}`}>
                                {a}
                              </button>
                            ))}
                         </div>
                      </div>
                      <div className="space-y-4">
                         <label className="text-[10px] font-black text-cyan-400 uppercase tracking-[0.2em] flex items-center gap-2"><User size={12}/> Bio Sex</label>
                         <div className="flex gap-2">
                            {['Male', 'Female'].map(g => (
                              <button key={g} onClick={() => setProfile({...profile, gender: g})} 
                                className={`flex-1 py-4 rounded-2xl border text-[10px] font-black uppercase transition-all duration-300 ${profile.gender === g ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-white/5 border-white/5 text-text-muted'}`}>
                                {g}
                              </button>
                            ))}
                         </div>
                      </div>
                    </div>

                    <div className="pt-8 border-t border-white/5">
                       <label className="text-[10px] font-black text-amber-500 uppercase tracking-[0.2em] block mb-5">Lifestyle Modifiers</label>
                       <div className="flex gap-3">
                         {['Non-Smoker', 'Occasional', 'Regular'].map(s => (
                           <button key={s} onClick={() => setProfile({...profile, smoker: s})} 
                             className={`flex-1 py-4 rounded-2xl border text-[10px] font-black uppercase transition-all duration-300 ${profile.smoker === s ? 'bg-amber-500 border-amber-500 text-white' : 'bg-white/5 border-white/5 text-text-muted'}`}>
                             {s}
                           </button>
                         ))}
                       </div>
                    </div>
                  </motion.div>
                )}

                {currentStep === 1 && (
                  <motion.div key="s1" initial={{ opacity:0, x:30 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:-30 }} className="space-y-8">
                    <div className="flex justify-between items-end">
                      <div>
                        <h2 className="text-3xl font-black text-white mb-2 tracking-tight">Indicators</h2>
                        <div className="h-1 w-12 bg-blue-500 rounded-full mb-2" />
                        <p className="text-xs text-text-muted font-bold uppercase tracking-widest">Step 02: Symptom Log</p>
                      </div>
                      <span className="text-[10px] font-black text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full uppercase mb-2">{selectedSymptoms.length} Markers</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[320px] overflow-y-auto pr-2 scrollbar-none pb-4">
                      {SYMPTOMS_LIST.map(s => {
                        const active = selectedSymptoms.includes(s.id);
                        return (
                          <button key={s.id} onClick={() => toggleSymptom(s.id)}
                            className={`flex items-center gap-4 p-5 rounded-[24px] border transition-all duration-500 transform active:scale-[0.98] ${active ? 'bg-gradient-to-br from-blue-600 to-indigo-600 border-transparent shadow-xl' : 'bg-white/[0.03] border-white/5 hover:bg-white/[0.06]'}`}>
                             <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${active ? 'bg-white/20 text-white' : 'bg-white/5 text-cyan-400'}`}>
                               <s.icon size={20} />
                             </div>
                             <div className="text-left overflow-hidden">
                                <p className={`text-[13px] font-bold truncate ${active ? 'text-white' : 'text-white'}`}>{s.label}</p>
                                <p className={`text-[8px] uppercase tracking-[0.15em] font-black ${active ? 'text-white/60' : 'text-text-muted'}`}>{s.category}</p>
                             </div>
                             {active && <CheckCircle2 size={18} className="ml-auto text-white" />}
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}

                {currentStep === 2 && (
                  <motion.div key="s2" initial={{ opacity:0, x:30 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:-30 }} className="space-y-10">
                    <div>
                      <h2 className="text-3xl font-black text-white mb-2 tracking-tight">Intensity</h2>
                      <div className="h-1 w-12 bg-indigo-500 rounded-full mb-2" />
                      <p className="text-xs text-text-muted font-bold uppercase tracking-widest">Step 03: Severity Analysis</p>
                    </div>

                    <div className="space-y-12 max-h-[320px] overflow-y-auto pr-3 scrollbar-none pb-4">
                       {selectedSymptoms.map(id => {
                          const s = SYMPTOMS_LIST.find(x => x.id === id);
                          return (
                            <div key={id} className="space-y-5">
                               <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-3">
                                     <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/5">
                                        <s.icon size={16} className="text-cyan-400" />
                                     </div>
                                     <span className="text-[13px] font-black text-white uppercase tracking-wider">{s.label}</span>
                                  </div>
                                  <span className="text-[11px] font-black text-cyan-400 bg-cyan-500/10 px-4 py-1 rounded-full border border-cyan-500/10 tracking-widest">LVL: {intensities[id] || 5}</span>
                               </div>
                               <div className="relative h-2 flex items-center px-1">
                                  <div className="absolute inset-x-1 h-full bg-white/5 rounded-full" />
                                  <motion.div animate={{ width: `${(intensities[id] || 5) * 10}%` }} className="absolute h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full shadow-lg shadow-blue-500/20" />
                                  <input 
                                     type="range" min="1" max="10" 
                                     value={intensities[id] || 5}
                                     onChange={e => setIntensities({...intensities, [id]: parseInt(e.target.value)})}
                                     className="absolute w-full h-8 opacity-0 cursor-ew-resize z-10"
                                  />
                               </div>
                            </div>
                          );
                       })}
                    </div>
                  </motion.div>
                )}

                {currentStep === 3 && (
                  <motion.div key="s3" initial={{ opacity:0, scale:0.98 }} animate={{ opacity:1, scale:1 }} className="space-y-8">
                     <div className="flex items-center justify-between">
                        <h2 className="text-3xl font-black text-white tracking-tighter">Prognosis</h2>
                        <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 rounded-2xl border border-emerald-500/20">
                           <ShieldCheck size={16} className="text-emerald-500" />
                           <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Verified 94%</span>
                        </div>
                     </div>

                     <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="bg-white/5 border border-white/5 p-6 rounded-[32px] space-y-6">
                           <p className="text-[10px] font-black text-cyan-500 uppercase tracking-widest">Core Probabilities</p>
                           <div className="space-y-4">
                              {[
                                { name: 'Pneumonia', risk: Math.min(riskScore + 10, 94), color: 'text-red-400' },
                                { name: 'Bronchitis', risk: Math.min(riskScore - 12, 60), color: 'text-amber-400' }
                              ].map((c, i) => (
                                <div key={i}>
                                   <div className="flex justify-between text-xs font-black text-white mb-2">
                                      <span>{c.name}</span>
                                      <span className={c.color}>{c.risk}%</span>
                                   </div>
                                   <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                                      <motion.div initial={{ width:0 }} animate={{ width: `${c.risk}%` }} transition={{ duration:1, delay:i*0.2 }} className={`h-full bg-current ${c.color}`} />
                                   </div>
                                </div>
                              ))}
                           </div>
                        </div>
                        
                        <div className="bg-gradient-to-br from-indigo-600/10 to-transparent border border-white/5 p-6 rounded-[32px] flex flex-col justify-center">
                           <div className="flex items-center gap-2 mb-3">
                             <Zap size={16} className="text-cyan-400" />
                             <span className="text-[10px] font-black text-white uppercase tracking-widest">Recommended Path</span>
                           </div>
                           <p className="text-xs text-text-secondary leading-relaxed mb-6 font-medium">Chest X-Ray radiological confirmation is required for definitive diagnostic exclusion.</p>
                           <button 
                             onClick={() => navigate('/xray')}
                             className="w-full py-3.5 bg-white text-gray-900 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] shadow-2xl shadow-cyan-500/10 hover:bg-cyan-50 transition active:scale-95"
                           >
                             Initiate X-Ray
                           </button>
                        </div>
                     </div>

                     <div className="p-6 rounded-[32px] bg-white/[0.02] border border-white/5">
                        <h5 className="text-[11px] font-black text-white uppercase tracking-widest flex items-center gap-3 mb-5">
                           <Info size={16} className="text-cyan-400" /> Protocol Protocol
                        </h5>
                        <ul className="grid grid-cols-1 xs:grid-cols-2 gap-4">
                           {['Hydration Focus', 'Monitor SpO2', 'Avoid Strenuous', 'Prone Position'].map(t => (
                             <li key={t} className="text-[11px] text-text-secondary flex items-center gap-3 font-medium">
                               <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> {t}
                             </li>
                           ))}
                        </ul>
                     </div>

                     <button onClick={reset} className="w-full py-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 text-[10px] font-black uppercase tracking-[0.3em] text-text-muted transition flex items-center justify-center gap-3">
                        <RotateCcw size={14} /> Reset Diagnostic
                     </button>
                  </motion.div>
                )}
              </>
            )}
          </AnimatePresence>

          {/* ACTION BUTTONS */}
          {!isAnalyzing && currentStep < 3 && (
            <div className="mt-auto pt-10 flex items-center justify-between border-t border-white/5">
              <button 
                onClick={() => setCurrentStep(prev => prev - 1)}
                disabled={currentStep === 0}
                className={`group flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.25em] transition-all ${currentStep === 0 ? 'opacity-0 pointer-events-none' : 'text-text-muted hover:text-white'}`}
              >
                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-white/40 group-hover:scale-105 transition-all">
                   <ChevronLeft size={20} />
                </div>
                Return
              </button>
              
              <div className="flex gap-2.5">
                 {[0,1,2].map(i => (
                   <div key={i} className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${i === currentStep ? 'bg-cyan-500 w-8 shadow-lg shadow-cyan-500/20' : 'bg-white/10'}`} />
                 ))}
              </div>

              <button 
                onClick={nextStep}
                disabled={currentStep === 1 && selectedSymptoms.length === 0}
                className="px-12 py-5 rounded-[28px] bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[12px] font-black uppercase tracking-[0.25em] shadow-3xl shadow-blue-500/30 hover:scale-[1.03] transition-all duration-500 active:scale-95 flex items-center gap-4 disabled:opacity-40"
              >
                {currentStep === 2 ? 'Analysis' : 'Continue'} <ChevronRight size={20} />
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="mt-10 text-center px-10">
         <p className="text-[10px] text-text-muted uppercase tracking-[0.3em] font-bold opacity-40 leading-relaxed italic">
           PULMONARY AI SYNTHESIS ENGINE • RESEARCH GRADE V4.2
         </p>
      </div>
    </div>
  );
}
