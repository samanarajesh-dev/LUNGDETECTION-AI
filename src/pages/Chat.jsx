import React, { useState, useRef, useEffect } from 'react';
import ChatInput from '../components/chat/ChatInput';
import MessageBubble from '../components/chat/MessageBubble';
import SuggestionChips from '../components/chat/SuggestionChips';
import { Loader2, ChevronLeft, Plus, Minus, ArrowRight, Clock, Wind, Thermometer, User, Heart, Droplets, Info, AlertTriangle, Scale, Activity, ShieldCheck, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [phase, setPhase] = useState('wizard'); // wizard | chat
  const [wizardStep, setWizardStep] = useState(0);
  const [showReport, setShowReport] = useState(false);
  const [assessmentData, setAssessmentData] = useState({
    coughDays: 0,
    fever: 'No',
    shortnessOfBreath: 'None',
    smoker: 'Never',
    sputum: 'None',
    chestPain: 'No',
    weightLoss: 'No',
    fatigue: 'Mild'
  });
  
  const scrollRef = useRef(null);
  const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

  // --- Clinical Wizard Steps ---
  const WIZARD_STEPS = [
    {
      id: 'cough',
      question: "How many days have you been coughing?",
      description: "Duration helps distinguish between acute infections and chronic conditions.",
      type: 'counter',
      field: 'coughDays',
      icon: <Clock className="text-cyan-400" size={20} />
    },
    {
      id: 'sputum',
      question: "Are you coughing up any mucus (sputum)?",
      description: "The presence and color of mucus provide vital clues about lung inflammation.",
      type: 'select',
      options: ['None', 'Clear/White', 'Yellow/Green', 'Bloody'],
      field: 'sputum',
      icon: <Droplets className="text-blue-400" size={20} />
    },
    {
      id: 'breath',
      question: "Are you experiencing shortness of breath?",
      description: "Dyspnea is a primary indicator of reduced lung function.",
      type: 'select',
      options: ['None', 'On Exertion', 'At Rest', 'During Sleep'],
      field: 'shortnessOfBreath',
      icon: <Wind className="text-indigo-400" size={20} />
    },
    {
      id: 'chest_pain',
      question: "Do you feel any pain or tightness in your chest?",
      description: "Pleuritic pain often accompanies lung infections.",
      type: 'select',
      options: ['No', 'Dull Ache', 'Sharp/Stabbing', 'Tightness'],
      field: 'chestPain',
      icon: <Heart className="text-rose-400" size={20} />
    },
    {
      id: 'fever',
      question: "Do you have a fever or body chills?",
      description: "Fever suggests your body is fighting an active infection.",
      type: 'select',
      options: ['No', 'Low Grade', 'High Fever'],
      field: 'fever',
      icon: <Thermometer className="text-amber-400" size={20} />
    },
    {
      id: 'weight',
      question: "Have you noticed any unexplained weight loss?",
      description: "Sudden weight loss can be a red flag for serious conditions.",
      type: 'select',
      options: ['No', '1-5 kg', 'Over 5 kg'],
      field: 'weightLoss',
      icon: <Scale className="text-emerald-400" size={20} />
    },
    {
      id: 'fatigue',
      question: "How would you describe your energy levels?",
      description: "Fatigue is common when the lungs are working harder.",
      type: 'select',
      options: ['Normal', 'Mild Fatigue', 'Constant Exhaustion'],
      field: 'fatigue',
      icon: <Activity className="text-purple-400" size={20} />
    },
    {
      id: 'smoker',
      question: "What is your history with smoking or pollutants?",
      description: "Environmental factors significantly increase risks.",
      type: 'select',
      options: ['Never', 'Ex-Smoker', 'Current Smoker', 'High Pollution Exp.'],
      field: 'smoker',
      icon: <User className="text-gray-400" size={20} />
    }
  ];

  const handleNextStep = () => {
    if (wizardStep < WIZARD_STEPS.length - 1) {
      setWizardStep(prev => prev + 1);
    } else {
      startChatWithContext();
    }
  };

  const startChatWithContext = () => {
    setIsLoading(true);
    setTimeout(() => {
      setPhase('chat');
      const contextText = `I have completed my health assessment.
      Summary:
      - Cough: ${assessmentData.coughDays} days (${assessmentData.sputum} sputum)
      - Breath: ${assessmentData.shortnessOfBreath}
      - Chest Pain: ${assessmentData.chestPain}
      - Fever: ${assessmentData.fever}
      - Energy: ${assessmentData.fatigue}
      - Weight Change: ${assessmentData.weightLoss}
      - Environment/History: ${assessmentData.smoker}`;
      
      handleSend(contextText, true);
    }, 2000);
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading, phase]);

  const handleSend = async (text, isInitialContext = false) => {
    if (!text.trim()) return;
    if (!isInitialContext) {
      setMessages(prev => [...prev, { id: Date.now(), text, isUser: true }]);
    }
    setIsLoading(true);

    try {
      if (GEMINI_API_KEY && !GEMINI_API_KEY.includes("Replace")) {
        const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`;
        const prompt = isInitialContext 
          ? `You are a Professional Pulmonology Specialist. Provide a SUSPECTED DIAGNOSIS:
             ${text}
             Structure:
             # 🩺 Suspected Clinical Condition: [Condition]
             ### 🔍 Diagnostic Rationale
             [Reasoning]
             ### ⚠️ Risk & Severity Level
             [Level]
             ### 🛑 Emergency Red Flags
             [Cautions]
             ### 📋 Next Clinical Steps
             [Actions]
             Disclaimer: AI-generated screening.`
          : `Patient: "${text}". Context: ${JSON.stringify(assessmentData)}. Pulmonology response required.`;

        const response = await fetch(geminiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
        });
        const data = await response.json();
        if (data.candidates?.[0]?.content?.parts?.[0]?.text) {
          setMessages(prev => [...prev, { id: Date.now() + 1, text: data.candidates[0].content.parts[0].text, isUser: false }]);
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full animate-fade-in relative min-h-[calc(100vh-64px)] bg-primary overflow-hidden">
      
      {/* ── HEADER ── */}
      <div className="px-6 py-6 bg-card border-b border-border-subtle flex items-center justify-between backdrop-blur-xl">
        <div className="flex items-center gap-5">
          <button onClick={() => window.history.back()} className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all">
            <ChevronLeft size={20} className="text-white" />
          </button>
          <div>
            <h1 className="text-xl font-black text-white tracking-tight">AI Doctor</h1>
            <p className="text-[10px] text-text-muted font-bold uppercase tracking-[0.2em]">Diagnostic Engine Active</p>
          </div>
        </div>
        
        {phase === 'chat' ? (
          <button onClick={() => setShowReport(true)} className="px-5 py-2.5 bg-white text-gray-900 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl hover:scale-105 transition flex items-center gap-2">
            <Activity size={14} /> View Report
          </button>
        ) : (
          <div className="flex gap-1.5 px-4 py-2 bg-white/5 rounded-2xl border border-white/5">
            {WIZARD_STEPS.map((_, i) => (
              <div key={i} className={`h-1.5 rounded-full transition-all duration-500 ${i === wizardStep ? 'w-6 bg-cyan-500' : 'w-1.5 bg-white/10'}`} />
            ))}
          </div>
        )}
      </div>

      {/* ── CONTENT AREA ── */}
      <div className="flex-1 overflow-y-auto pb-40 flex flex-col pt-8 scrollbar-none">
        {phase === 'wizard' ? (
          <div className="flex-1 flex flex-col max-w-[600px] mx-auto w-full px-6">
            <AnimatePresence mode="wait">
              <motion.div key={wizardStep} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 shadow-lg">{WIZARD_STEPS[wizardStep].icon}</div>
                  <div>
                    <h2 className="text-base font-bold text-white tracking-tight">{WIZARD_STEPS[wizardStep].question}</h2>
                    <p className="text-[10px] text-text-muted mt-0.5 font-medium">{WIZARD_STEPS[wizardStep].description}</p>
                  </div>
                </div>

                <div className="py-4">
                  {WIZARD_STEPS[wizardStep].type === 'counter' ? (
                    <div className="bg-card border border-border-subtle p-6 rounded-[28px] flex flex-col items-center shadow-xl">
                      <div className="flex items-center gap-10">
                        <button onClick={() => setAssessmentData(p => ({...p, coughDays: Math.max(0, p.coughDays - 1)}))} className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all active:scale-95"><Minus size={20} className="text-white" /></button>
                        <div className="flex flex-col items-center">
                          <span className="text-5xl font-black text-white tabular-nums tracking-tighter">{assessmentData.coughDays}</span>
                          <span className="text-[9px] text-cyan-400 uppercase tracking-[0.3em] mt-2 font-black">Days</span>
                        </div>
                        <button onClick={() => setAssessmentData(p => ({...p, coughDays: p.coughDays + 1}))} className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all active:scale-95"><Plus size={20} className="text-white" /></button>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-2">
                      {WIZARD_STEPS[wizardStep].options.map(opt => (
                        <button key={opt} onClick={() => setAssessmentData(p => ({...p, [WIZARD_STEPS[wizardStep].field]: opt}))} className={`group relative p-4 rounded-[20px] border text-left transition-all duration-300 overflow-hidden ${assessmentData[WIZARD_STEPS[wizardStep].field] === opt ? 'bg-white border-white shadow-xl' : 'bg-white/5 border-white/10 hover:bg-white/[0.06]'}`}>
                          <span className={`relative z-10 text-[13px] font-bold ${assessmentData[WIZARD_STEPS[wizardStep].field] === opt ? 'text-gray-900' : 'text-white/70'}`}>{opt}</span>
                          {assessmentData[WIZARD_STEPS[wizardStep].field] === opt && <motion.div layoutId="activeBG" className="absolute inset-0 bg-white" />}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-4 flex flex-col items-center gap-6">
                  <button onClick={handleNextStep} className="w-full max-w-[280px] py-4 rounded-[22px] bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black text-[11px] uppercase tracking-[0.2em] shadow-xl shadow-blue-500/20 flex items-center justify-center gap-3 hover:scale-[1.03] transition-all">
                    {wizardStep === WIZARD_STEPS.length - 1 ? 'Finish Assessment' : 'Continue'} <ArrowRight size={16} />
                  </button>
                  <button onClick={() => setWizardStep(p => Math.max(0, p - 1))} disabled={wizardStep === 0} className={`text-[10px] font-bold uppercase tracking-widest text-text-muted hover:text-white transition-all ${wizardStep === 0 ? 'opacity-0' : 'opacity-60'}`}>Return</button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        ) : (
          <div ref={scrollRef} className="flex-1 overflow-y-auto max-w-[800px] mx-auto w-full px-4 pt-4 scrollbar-none">
            {messages.map((msg) => <MessageBubble key={msg.id} message={msg.text} isUser={msg.isUser} />)}
            {isLoading && (
              <div className="flex items-center gap-3 p-6 text-cyan-400 bg-cyan-500/5 rounded-[32px] border border-cyan-500/10 mx-4 animate-pulse">
                <Loader2 className="animate-spin" size={20} />
                <span className="text-[10px] font-black uppercase tracking-widest">Clinical Analysis in Progress...</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── REPORT MODAL ── */}
      <AnimatePresence>
        {showReport && (
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/90 backdrop-blur-lg">
            <motion.div initial={{ scale:0.95, y:20 }} animate={{ scale:1, y:0 }} exit={{ scale:0.95, y:20 }} className="bg-[#0a0c10] border border-white/10 w-full max-w-[550px] rounded-[40px] overflow-hidden shadow-3xl flex flex-col max-h-[90vh]">
              <div className="p-8 bg-gradient-to-r from-blue-600/20 to-emerald-500/20 border-b border-white/5 flex justify-between items-center">
                <div>
                  <p className="text-[9px] text-cyan-400 font-black uppercase tracking-[0.3em] mb-1">LungDetect AI Report</p>
                  <h2 className="text-2xl font-black text-white tracking-tighter">Clinical Summary</h2>
                </div>
                <button onClick={() => setShowReport(false)} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition"><ChevronLeft size={20} className="text-white" /></button>
              </div>
              <div className="p-8 overflow-y-auto space-y-6 scrollbar-none">
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { l: 'Cough Duration', v: `${assessmentData.coughDays} Days` },
                    { l: 'Mucus Presence', v: assessmentData.sputum },
                    { l: 'Breath Quality', v: assessmentData.shortnessOfBreath },
                    { l: 'Chest State', v: assessmentData.chestPain },
                    { l: 'Temperature', v: assessmentData.fever },
                    { l: 'Risk Profile', v: assessmentData.smoker }
                  ].map((item, i) => (
                    <div key={i} className="p-4 bg-white/[0.03] border border-white/5 rounded-2xl">
                       <p className="text-[8px] text-text-muted font-bold uppercase tracking-widest mb-1">{item.l}</p>
                       <p className="text-xs font-bold text-white">{item.v}</p>
                    </div>
                  ))}
                </div>
                <div className="p-6 bg-white/5 border border-white/5 rounded-[32px] space-y-3">
                  <div className="flex items-center gap-2 text-emerald-500 font-black text-[10px] uppercase tracking-widest"><ShieldCheck size={16}/> Analysis Result</div>
                  <p className="text-xs text-text-secondary leading-relaxed font-medium">A suspected clinical condition has been identified based on your symptom profile. Please refer to the chat transcript for detailed rationale and recommended next steps.</p>
                </div>
                <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex gap-3 italic text-[9px] text-amber-500/70"><AlertTriangle size={16} className="shrink-0"/> Screening report only. Consult a Pulmonologist for definitive diagnosis.</div>
              </div>
              <div className="p-8 border-t border-white/5"><button onClick={() => window.print()} className="w-full py-4 bg-white text-gray-900 rounded-2xl font-black text-xs uppercase tracking-[0.3em] flex items-center justify-center gap-3"><Download size={16}/> Save as Medical Document</button></div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {phase === 'chat' && (
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-primary via-primary to-transparent pt-12 pb-6 px-4">
          <div className="max-w-[800px] mx-auto">
            <ChatInput onSend={handleSend} disabled={isLoading} />
          </div>
        </div>
      )}
    </div>
  );
}
