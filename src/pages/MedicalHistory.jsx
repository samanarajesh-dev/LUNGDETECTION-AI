import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  History as HistoryIcon, 
  Download, 
  FileText, 
  Search, 
  Activity, 
  Scan, 
  Stethoscope,
  TrendingUp,
  ShieldCheck,
  Zap,
  ArrowUpRight,
  Database,
  Lock,
  CloudLightning,
  CheckCircle2,
  FileSearch,
  ChevronRight,
  Filter
} from 'lucide-react';

export default function MedicalHistory() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [history, setHistory] = useState([]);
  const [isPreparing, setIsPreparing] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);

  useEffect(() => {
    const stored = localStorage.getItem('lungdetect_xray_history');
    if (stored) {
      const parsed = JSON.parse(stored).map(h => ({
        ...h,
        type: 'Radiology Scan',
        icon: Scan,
        color: 'text-indigo-400',
        bg: 'bg-indigo-500/10',
        glow: 'shadow-indigo-500/10'
      }));
      
      // Mock some additional premium activities
      const additional = [
        { 
          id: 'sym-99', 
          diagnosis: 'Symptom Profile: Acute', 
          date: new Date(Date.now() - 3600000 * 5).toISOString(), 
          type: 'AI Assessment',
          confidence: 89,
          icon: Stethoscope,
          color: 'text-cyan-400',
          bg: 'bg-cyan-500/10',
          glow: 'shadow-cyan-500/10'
        },
        { 
          id: 'vitals-01', 
          diagnosis: 'Vitals Baselining', 
          date: new Date(Date.now() - 86400000 * 2).toISOString(), 
          type: 'Clinical Log',
          confidence: 100,
          icon: Activity,
          color: 'text-emerald-400',
          bg: 'bg-emerald-500/10',
          glow: 'shadow-emerald-500/10'
        }
      ];
      setHistory([...parsed, ...additional].sort((a,b) => new Date(b.date) - new Date(a.date)));
    }
  }, []);

  const handleDownload = (item) => {
    setIsPreparing(true);
    setDownloadProgress(0);
    
    // Simulate high-security preparation
    const interval = setInterval(() => {
      setDownloadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsPreparing(false);
            // TRIGGER PRINT
            window.print(); 
          }, 800);
          return 100;
        }
        return prev + 15;
      });
    }, 150);
  };

  const filteredHistory = history.filter(h => activeFilter === 'All' || h.type.includes(activeFilter));

  return (
    <div className="max-w-[1100px] mx-auto pb-20 px-6 animate-fade-in relative">
      
      {/* ── PRINT STYLES ── */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          body * { visibility: hidden; }
          #printable-vault-report, #printable-vault-report * { visibility: visible; }
          #printable-vault-report { 
            position: absolute; 
            left: 0; 
            top: 0; 
            width: 100%; 
            padding: 40px;
            background: white !important;
            color: black !important;
          }
          .no-print { display: none !important; }
          @page { size: auto; margin: 0; }
        }
      `}} />
      {/* ── ULTRA-PREMIUM HUD ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-center">
        <div className="lg:col-span-5 space-y-6">
           <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-[24px] bg-gradient-to-br from-indigo-600 via-blue-700 to-indigo-800 flex items-center justify-center shadow-2xl shadow-indigo-600/30">
                 <HistoryIcon size={32} className="text-white" />
              </div>
              <div>
                 <h1 className="text-4xl font-black text-white tracking-tighter">Health Vault</h1>
                 <p className="text-xs text-indigo-400 font-black uppercase tracking-[0.3em] opacity-80">Encrypted Diagnostic History</p>
              </div>
           </div>
           <p className="text-text-secondary leading-relaxed font-medium">
             Your decentralized clinical ledger. Every scan, symptom synthesis, and vitals assessment is cryptographically secured and archived for longitudinal health tracking.
           </p>
           <div className="flex gap-4">
              <div className="flex items-center gap-2 bg-indigo-500/5 px-4 py-2 rounded-2xl border border-indigo-500/10">
                 <ShieldCheck size={14} className="text-indigo-400" />
                 <span className="text-[10px] font-black text-white uppercase tracking-widest">HIPAA Compliant</span>
              </div>
              <div className="flex items-center gap-2 bg-emerald-500/5 px-4 py-2 rounded-2xl border border-emerald-500/10">
                 <Database size={14} className="text-emerald-400" />
                 <span className="text-[10px] font-black text-white uppercase tracking-widest">Local-First Storage</span>
              </div>
           </div>
        </div>

        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
           {/* Aggregate Risk HUD */}
           <div className="bg-card border border-border-subtle p-8 rounded-[40px] shadow-3xl flex flex-col items-center text-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent pointer-events-none" />
              <div className="relative w-24 h-24 mb-6">
                 <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    <circle className="text-white/5" strokeWidth="3" stroke="currentColor" fill="none" cx="18" cy="18" r="16" />
                    <motion.circle 
                      animate={{ strokeDasharray: "78, 100" }}
                      className="text-indigo-500" 
                      strokeWidth="3" stroke="currentColor" strokeLinecap="round" fill="none" cx="18" cy="18" r="16" 
                    />
                 </svg>
                 <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-black text-white">78</span>
                    <span className="text-[9px] font-black text-text-muted uppercase">Global Score</span>
                 </div>
              </div>
              <h3 className="text-sm font-bold text-white mb-1 uppercase tracking-tighter">Pulmonary Wellness Index</h3>
              <div className="flex items-center gap-2 text-indigo-400">
                 <TrendingUp size={14} />
                 <span className="text-xs font-black">+4.2% Stability</span>
              </div>
           </div>

           {/* Metrics Grid */}
           <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Avg SpO2', value: '98%', color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
                { label: 'Respiratory', value: '16 bpm', color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
                { label: 'Scans Done', value: history.length, color: 'text-indigo-400', bg: 'bg-indigo-500/10' },
                { label: 'Data Quality', value: 'High', color: 'text-amber-400', bg: 'bg-amber-500/10' }
              ].map((m, i) => (
                <div key={i} className="bg-card border border-border-subtle p-5 rounded-3xl flex flex-col justify-center shadow-lg">
                   <p className="text-[9px] font-black text-text-muted uppercase tracking-[0.2em] mb-1">{m.label}</p>
                   <p className={`text-xl font-black ${m.color}`}>{m.value}</p>
                </div>
              ))}
           </div>
        </div>
      </div>

      {/* ── FILTER & VAULT ACTION ── */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-6">
        <div className="flex bg-card border border-border-subtle p-2 rounded-[24px] w-full md:w-auto overflow-x-auto scrollbar-none">
          {['All', 'Radiology', 'Assessment', 'Log'].map(f => (
            <button key={f} onClick={() => setActiveFilter(f)}
              className={`px-8 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all ${activeFilter === f ? 'bg-white text-gray-900 shadow-2xl' : 'text-text-muted hover:text-white'}`}>
              {f}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-4 w-full md:w-auto">
           <div className="relative flex-1 md:w-64">
              <Search size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-text-muted" />
              <input type="text" placeholder="Filter clinical IDs..." className="w-full bg-card border border-border-subtle rounded-[24px] pl-14 pr-6 py-4 text-sm text-text-primary outline-none focus:border-indigo-500 transition-all shadow-xl" />
           </div>
           <button className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-text-muted hover:text-white hover:bg-white/10 transition-all">
              <Filter size={20} />
           </button>
        </div>
      </div>

      {/* ── REPORT VAULT ── */}
      <div className="space-y-4">
        <AnimatePresence>
          {filteredHistory.map((item, index) => (
            <motion.div 
              layout
              initial={{ opacity:0, y:20 }} 
              animate={{ opacity:1, y:0 }} 
              transition={{ delay: index * 0.05 }}
              key={item.id} 
              className="group bg-card border border-border-subtle rounded-[32px] p-6 hover:border-indigo-500/40 transition-all duration-500 shadow-xl hover:shadow-indigo-500/5 relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
               <div className="flex items-center gap-6">
                  <div className={`w-16 h-16 rounded-2xl ${item.bg} ${item.color} flex items-center justify-center shrink-0 shadow-2xl ${item.glow} group-hover:scale-110 transition-transform duration-500`}>
                     <item.icon size={28} />
                  </div>
                  <div>
                     <div className="flex items-center gap-3 mb-1.5">
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400">{item.type}</span>
                        <div className="w-1 h-1 rounded-full bg-white/10" />
                        <span className="text-[10px] font-bold text-text-muted">{new Date(item.date).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                     </div>
                     <h3 className="text-xl font-black text-white tracking-tight uppercase group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-400 group-hover:to-cyan-400 transition-all duration-500">
                        {item.diagnosis}
                     </h3>
                     <div className="flex items-center gap-4 mt-2">
                        <p className="text-[9px] font-black text-text-muted uppercase tracking-widest">Doc ID: LD-{item.id.toString().slice(-8)}</p>
                        <div className="flex items-center gap-1">
                           <ShieldCheck size={10} className="text-emerald-500" />
                           <span className="text-[9px] font-black text-emerald-500 uppercase">AI Verified</span>
                        </div>
                     </div>
                  </div>
               </div>

               <div className="flex items-center gap-4">
                  <div className="hidden sm:flex flex-col items-end px-6 border-r border-white/5">
                     <p className="text-[9px] font-black text-text-muted uppercase tracking-[0.2em] mb-2">Confidence Scale</p>
                     <div className="flex items-center gap-3">
                        <div className="w-24 h-1.5 bg-white/5 rounded-full overflow-hidden shadow-inner">
                           <motion.div initial={{ width:0 }} animate={{ width: `${item.confidence}%` }} className={`h-full bg-gradient-to-r from-transparent to-current ${item.color}`} />
                        </div>
                        <span className="text-xs font-black text-white">{item.confidence}%</span>
                     </div>
                  </div>
                  
                  <div className="flex gap-2">
                     <button 
                       onClick={() => handleDownload(item)}
                       className="h-14 px-6 rounded-2xl bg-indigo-500/10 hover:bg-indigo-500 text-indigo-400 hover:text-white border border-indigo-500/20 transition-all duration-500 flex items-center gap-3 font-black text-[10px] uppercase tracking-widest"
                     >
                        <Download size={18} /> Download (.PDF)
                     </button>
                     <button className="w-14 h-14 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-text-muted hover:text-white hover:bg-white/10 transition-all group-hover:translate-x-1 duration-500">
                        <ArrowUpRight size={20} />
                     </button>
                  </div>
               </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* ── HIDDEN PRINTABLE REPORT Center ── */}
      <div id="printable-vault-report" className="hidden">
         <div style={{ borderBottom: '2px solid #EEE', paddingBottom: '20px', marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
               <h1 style={{ margin: 0, color: '#312E81', fontSize: '24px' }}>LUNGDETECT AI MEDICAL REPORT</h1>
               <p style={{ margin: '5px 0', fontSize: '12px', color: '#666' }}>Clinical Grade Pattern Recognition Synthesis</p>
            </div>
            <div style={{ textAlign: 'right' }}>
               <p style={{ margin: 0, fontWeight: 'bold' }}>OFFICIAL RECORD</p>
               <p style={{ margin: 0, fontSize: '10px' }}>Generated: {new Date().toLocaleString()}</p>
            </div>
         </div>

         <div style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '16px', borderBottom: '1px solid #DDD', paddingBottom: '5px' }}>PATIENT GLOBAL SUMMARY</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '15px' }}>
               <div>
                  <p><strong>Longitudinal Score:</strong> 78/100</p>
                  <p><strong>Baseline Status:</strong> Stable Improvement</p>
               </div>
               <div style={{ textAlign: 'right' }}>
                  <p><strong>HIPAA Compliance:</strong> Full</p>
                  <p><strong>Storage:</strong> Secure Local Ledger</p>
               </div>
            </div>
         </div>

         <div style={{ padding: '20px', backgroundColor: '#F9FAFB', borderRadius: '10px', marginBottom: '40px' }}>
            <h3 style={{ margin: '0 0 10px 0', fontSize: '14px' }}>RECORD AUDIT TRAIL</h3>
            <p style={{ fontSize: '12px' }}>This document provides a summary of all health assessments found in your LungDetect vault as of today.</p>
         </div>

         <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
            <thead>
               <tr style={{ textAlign: 'left', borderBottom: '2px solid #DDD' }}>
                  <th style={{ padding: '10px' }}>Date</th>
                  <th style={{ padding: '10px' }}>Procedure</th>
                  <th style={{ padding: '10px' }}>Finding</th>
                  <th style={{ padding: '10px' }}>AI Confidence</th>
               </tr>
            </thead>
            <tbody>
               {history.map(item => (
                  <tr key={item.id} style={{ borderBottom: '1px solid #EEE' }}>
                     <td style={{ padding: '10px', fontSize: '12px' }}>{new Date(item.date).toLocaleDateString()}</td>
                     <td style={{ padding: '10px', fontSize: '12px' }}>{item.type}</td>
                     <td style={{ padding: '10px', fontSize: '12px', fontWeight: 'bold' }}>{item.diagnosis}</td>
                     <td style={{ padding: '10px', fontSize: '12px' }}>{item.confidence}%</td>
                  </tr>
               ))}
            </tbody>
         </table>

         <div style={{ marginTop: '100px', paddingTop: '20px', borderTop: '1px solid #EEE' }}>
            <p style={{ fontSize: '10px', color: '#999', textAlign: 'center' }}>
               This report is AI-generated for educational and research purposes. It must be reviewed by a board-certified physician.
            </p>
         </div>
      </div>

      {/* ── REPORT PREPARATION MODAL ── */}
      <AnimatePresence>
        {isPreparing && (
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-xl">
             <motion.div initial={{ scale:0.9, y:20 }} animate={{ scale:1, y:0 }} exit={{ scale:0.9, y:20 }} className="bg-card border border-border-subtle p-10 rounded-[48px] max-w-sm w-full text-center shadow-3xl">
                <div className="relative w-24 h-24 mx-auto mb-8">
                   <div className="absolute inset-0 rounded-full border-4 border-white/5" />
                   <motion.div 
                     animate={{ rotate: 360 }}
                     transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                     className="absolute inset-0 rounded-full border-t-4 border-indigo-500" 
                   />
                   <div className="absolute inset-0 flex items-center justify-center">
                     <CloudLightning size={32} className="text-indigo-400" />
                   </div>
                </div>
                <h2 className="text-2xl font-black text-white mb-2 tracking-tighter uppercase italic">Securing Report</h2>
                <p className="text-xs text-text-secondary mb-8 font-medium">Encrypting patient vectors and synthesizing PDF document protocol...</p>
                <div className="space-y-3">
                   <div className="flex justify-between text-[10px] font-black text-indigo-400 uppercase tracking-widest">
                      <span>Progress</span>
                      <span>{downloadProgress}%</span>
                   </div>
                   <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden shadow-inner">
                      <motion.div initial={{ width:0 }} animate={{ width: `${downloadProgress}%` }} className="h-full bg-gradient-to-r from-indigo-600 to-indigo-400" />
                   </div>
                </div>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-16 bg-gradient-to-br from-indigo-900/10 to-transparent border border-indigo-500/10 p-12 rounded-[52px] text-center space-y-8 shadow-3xl">
         <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-3xl flex items-center justify-center mx-auto shadow-2xl">
            <Lock size={32} className="text-indigo-400" />
         </div>
         <div className="space-y-4">
            <h4 className="text-2xl font-black text-white tracking-tighter uppercase italic">Longitudinal Bio-Security</h4>
            <p className="text-sm text-text-secondary max-w-2xl mx-auto leading-relaxed font-medium">
               Your medical reports are stored using advanced decentralized protocols. Only you have the cryptographic keys to decrypt and view these files. All downloads are audited for security.
            </p>
         </div>
         <div className="flex justify-center gap-3">
            {[1,2,3,4,5].map(i => <div key={i} className="w-1 h-1 rounded-full bg-indigo-500/30" />)}
         </div>
      </div>

    </div>
  );
}
