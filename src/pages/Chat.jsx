import React, { useState, useRef, useEffect } from 'react';
import ChatInput from '../components/chat/ChatInput';
import MessageBubble from '../components/chat/MessageBubble';
import SuggestionChips from '../components/chat/SuggestionChips';
import { Loader2, ChevronLeft, Plus, Minus, ArrowRight, Clock, Wind, Thermometer, User, Heart, Droplets, Info, AlertTriangle, Scale, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [phase, setPhase] = useState('wizard'); // wizard | chat
  const [wizardStep, setWizardStep] = useState(0);
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

  // --- Expanded Clinical Wizard Steps ---
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
      description: "Dyspnea is a primary indicator of reduced lung function or oxygenation.",
      type: 'select',
      options: ['None', 'On Exertion', 'At Rest', 'During Sleep'],
      field: 'shortnessOfBreath',
      icon: <Wind className="text-indigo-400" size={20} />
    },
    {
      id: 'chest_pain',
      question: "Do you feel any pain or tightness in your chest?",
      description: "Pleuritic pain often accompanies lung infections or inflammation.",
      type: 'select',
      options: ['No', 'Dull Ache', 'Sharp/Stabbing', 'Tightness'],
      field: 'chestPain',
      icon: <Heart className="text-rose-400" size={20} />
    },
    {
      id: 'fever',
      question: "Do you have a fever or body chills?",
      description: "Fever suggests your body is fighting an active infection or inflammation.",
      type: 'select',
      options: ['No', 'Low Grade', 'High Fever'],
      field: 'fever',
      icon: <Thermometer className="text-amber-400" size={20} />
    },
    {
      id: 'weight',
      question: "Have you noticed any unexplained weight loss?",
      description: "Sudden weight loss can be a red flag for more serious underlying conditions.",
      type: 'select',
      options: ['No', '1-5 kg', 'Over 5 kg'],
      field: 'weightLoss',
      icon: <Scale className="text-emerald-400" size={20} />
    },
    {
      id: 'fatigue',
      question: "How would you describe your energy levels?",
      description: "Fatigue is common when the lungs are working harder to provide oxygen.",
      type: 'select',
      options: ['Normal', 'Mild Fatigue', 'Constant Exhaustion'],
      field: 'fatigue',
      icon: <Activity className="text-purple-400" size={20} />
    },
    {
      id: 'smoker',
      question: "What is your history with smoking or pollutants?",
      description: "Environmental factors significantly increase the risk of pulmonary diseases.",
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
    setIsLoading(true); // Show loader during transition
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
    }, 2000); // 2 second simulation for "Wow" factor
  };

  // --- Chat Logic ---
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
          ? `You are a Professional Pulmonology Specialist. 
             URGENT: The patient has finished an assessment. You MUST provide a clear SUSPECTED DIAGNOSIS based on these details:
             ${text}
             
             Structure your response exactly like this:
             # 🩺 Suspected Clinical Condition: [Name of Most Likely Condition]
             
             ### 🔍 Diagnostic Rationale
             [Explain why you suspect this based on their symptoms]
             
             ### ⚠️ Risk & Severity Level
             [Low/Moderate/High] - [Brief explanation]
             
             ### 🛑 Emergency Red Flags
             [What they must watch for immediately]
             
             ### 📋 Next Clinical Steps
             [Specific tests or actions]
             
             Disclaimer: This is an AI-generated screening and not a definitive medical diagnosis.`
          : `Patient message: "${text}". 
             Patient Context: ${JSON.stringify(assessmentData)}.
             As a Pulmonology Specialist, respond professionally.`;

        const response = await fetch(geminiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }]
          })
        });

        const data = await response.json();
        if (data.candidates?.[0]?.content?.parts?.[0]?.text) {
          setMessages(prev => [...prev, { 
            id: Date.now() + 1, 
            text: data.candidates[0].content.parts[0].text, 
            isUser: false 
          }]);
        }
      } else {
        setMessages(prev => [...prev, { 
          id: Date.now() + 1, 
          text: "### ⚠️ Gemini Engine Not Configured\nPlease ensure your `VITE_GEMINI_API_KEY` is set in the environment to activate advanced diagnostics.", 
          isUser: false 
        }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, { 
        id: Date.now() + 1, 
        text: "System Connectivity Error: Unable to reach the AI diagnostic core. Please check your internet connection.", 
        isUser: false 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full animate-fade-in relative min-h-[calc(100vh-64px)] bg-primary overflow-hidden">
      
      {/* ── UNIFIED GLOBAL HEADER ── */}
      <div className="px-6 py-6 bg-card border-b border-border-subtle flex items-center justify-between backdrop-blur-xl">
        <div className="flex items-center gap-5">
          <button onClick={() => window.history.back()} className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all">
            <ChevronLeft size={20} className="text-white" />
          </button>
          <div>
            <h1 className="text-xl font-black text-white tracking-tight">AI Doctor</h1>
            <div className="flex items-center gap-2">
               <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
               <p className="text-[10px] text-text-muted font-bold uppercase tracking-[0.2em]">Diagnostic Engine Active</p>
            </div>
          </div>
        </div>
        
        {/* Progress Bar (Matches Global Style) */}
        <div className="flex gap-1.5 px-4 py-2 bg-white/5 rounded-2xl border border-white/5">
          {WIZARD_STEPS.map((_, i) => (
            <div key={i} className={`h-1.5 rounded-full transition-all duration-500 ${i === wizardStep ? 'w-6 bg-cyan-500' : 'w-1.5 bg-white/10'}`} />
          ))}
        </div>
      </div>

      {/* ── CONTENT AREA ── */}
      <div className="flex-1 overflow-y-auto pb-40 flex flex-col pt-8 scrollbar-none">
        
        {phase === 'wizard' ? (
          <div className="flex-1 flex flex-col max-w-[600px] mx-auto w-full px-6">
            <AnimatePresence mode="wait">
              <motion.div 
                key={wizardStep}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="space-y-8"
              >
                {/* Intro bubble on first step */}
                {wizardStep === 0 && (
                  <motion.div initial={{ opacity:0, scale:0.9 }} animate={{ opacity:1, scale:1 }} className="p-5 bg-white/5 rounded-[28px] border border-white/10 border-l-cyan-500 border-l-4">
                    <p className="text-sm text-white/90 leading-relaxed font-medium">
                      Welcome back! 👋 I'm your **Lung Health Specialist AI**. Before we chat, let's complete a quick clinical screening to provide you with the most accurate analysis.
                    </p>
                  </motion.div>
                )}

                {/* Question Section */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0 border border-white/10 shadow-lg">
                      {WIZARD_STEPS[wizardStep].icon}
                    </div>
                    <div>
                      <h2 className="text-base font-bold text-white tracking-tight leading-tight">{WIZARD_STEPS[wizardStep].question}</h2>
                      <p className="text-[10px] text-text-muted mt-0.5 font-medium">{WIZARD_STEPS[wizardStep].description}</p>
                    </div>
                  </div>

                  {/* Interactive UI */}
                  <div className="py-4">
                    {WIZARD_STEPS[wizardStep].type === 'counter' && (
                      <div className="bg-card border border-border-subtle p-6 rounded-[28px] flex flex-col items-center shadow-xl">
                        <div className="flex items-center gap-10">
                          <button 
                            onClick={() => setAssessmentData(p => ({...p, coughDays: Math.max(0, p.coughDays - 1)}))}
                            className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all active:scale-95"
                          >
                            <Minus size={20} className="text-white" />
                          </button>
                          <div className="flex flex-col items-center">
                            <span className="text-5xl font-black text-white tabular-nums tracking-tighter">{assessmentData.coughDays}</span>
                            <span className="text-[9px] text-cyan-400 uppercase tracking-[0.3em] mt-2 font-black">Days</span>
                          </div>
                          <button 
                            onClick={() => setAssessmentData(p => ({...p, coughDays: p.coughDays + 1}))}
                            className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all active:scale-95"
                          >
                            <Plus size={20} className="text-white" />
                          </button>
                        </div>
                      </div>
                    )}

                    {WIZARD_STEPS[wizardStep].type === 'select' && (
                      <div className="grid grid-cols-1 gap-2">
                        {WIZARD_STEPS[wizardStep].options.map(opt => (
                          <button
                            key={opt}
                            onClick={() => setAssessmentData(p => ({...p, [WIZARD_STEPS[wizardStep].field]: opt}))}
                            className={`group relative p-4 rounded-[20px] border text-left transition-all duration-300 overflow-hidden ${assessmentData[WIZARD_STEPS[wizardStep].field] === opt ? 'bg-white border-white shadow-xl scale-[1.01]' : 'bg-white/5 border-white/10 hover:bg-white/[0.06]'}`}
                          >
                            <div className="relative z-10 flex justify-between items-center">
                              <span className={`text-[13px] font-bold ${assessmentData[WIZARD_STEPS[wizardStep].field] === opt ? 'text-gray-900' : 'text-white/70'}`}>{opt}</span>
                              {assessmentData[WIZARD_STEPS[wizardStep].field] === opt && <ArrowRight size={16} className="text-gray-900" />}
                            </div>
                            {assessmentData[WIZARD_STEPS[wizardStep].field] === opt && (
                              <motion.div layoutId="activeBG" className="absolute inset-0 bg-white" />
                            )}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Centered Action Button */}
                <div className="pt-4 flex flex-col items-center gap-6">
                  <button 
                    onClick={handleNextStep}
                    className="w-full max-w-[280px] py-4 rounded-[22px] bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black text-[11px] uppercase tracking-[0.2em] shadow-xl shadow-blue-500/20 flex items-center justify-center gap-3 hover:scale-[1.03] transition-all active:scale-[0.98]"
                  >
                    {wizardStep === WIZARD_STEPS.length - 1 ? 'Finish Assessment' : 'Continue'}
                    <ArrowRight size={16} />
                  </button>

                  <button 
                    onClick={() => setWizardStep(prev => Math.max(0, prev - 1))}
                    disabled={wizardStep === 0}
                    className={`text-[10px] font-bold uppercase tracking-widest text-text-muted hover:text-white transition-all ${wizardStep === 0 ? 'opacity-0 pointer-events-none' : 'opacity-60'}`}
                  >
                    Return to previous step
                  </button>
                </div>

                <div className="flex items-center gap-2 justify-center py-2 px-4 bg-white/5 rounded-xl border border-white/5 max-w-fit mx-auto">
                   <Info size={12} className="text-cyan-500/50" />
                   <p className="text-[9px] text-text-muted font-bold uppercase tracking-wider">Encrypted Data</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        ) : (
          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto max-w-[800px] mx-auto w-full px-4 pt-4 scrollbar-none"
          >
            {messages.map((msg) => (
              <MessageBubble key={msg.id} message={msg.text} isUser={msg.isUser} />
            ))}
            {isLoading && (
              <div className="flex items-center gap-3 p-6 text-cyan-400 bg-cyan-500/5 rounded-[32px] border border-cyan-500/10 mx-4 animate-pulse">
                <Loader2 className="animate-spin" size={20} />
                <span className="text-[10px] font-black uppercase tracking-widest">Clinical Core Processing...</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── INPUT AREA (Only in chat phase) ── */}
      {phase === 'chat' && (
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-primary via-primary to-transparent pt-12 pb-6 px-4 backdrop-blur-sm">
          <div className="max-w-[800px] mx-auto">
            <ChatInput onSend={handleSend} disabled={isLoading} />
            {messages.length < 3 && (
              <div className="mt-4 flex flex-wrap gap-2 justify-center">
                 {['Show Lung Exercises', 'Risks of Chronic Cough', 'When to see a doctor?'].map(chip => (
                   <button key={chip} onClick={() => handleSend(chip)} className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-white/60 hover:bg-white/10 hover:text-white transition-all">
                      {chip}
                   </button>
                 ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
