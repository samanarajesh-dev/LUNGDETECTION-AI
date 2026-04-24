import React, { useState, useRef, useEffect } from 'react';
import ChatInput from '../components/chat/ChatInput';
import MessageBubble from '../components/chat/MessageBubble';
import SuggestionChips from '../components/chat/SuggestionChips';
import { Loader2, ChevronLeft, Plus, Minus, ArrowRight, Clock, Wind, Thermometer, User } from 'lucide-react';
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
    smoker: 'No'
  });
  
  const scrollRef = useRef(null);
  const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

  // --- Wizard Logic ---
  const WIZARD_STEPS = [
    {
      id: 'cough',
      question: "How many days have you been coughing?",
      type: 'counter',
      field: 'coughDays',
      icon: <Clock className="text-cyan-400" size={18} />
    },
    {
      id: 'fever',
      question: "Do you have a fever or chills?",
      type: 'select',
      options: ['No', 'Mild', 'High'],
      field: 'fever',
      icon: <Thermometer className="text-amber-400" size={18} />
    },
    {
      id: 'breath',
      question: "Any shortness of breath?",
      type: 'select',
      options: ['None', 'On Exertion', 'At Rest'],
      field: 'shortnessOfBreath',
      icon: <Wind className="text-blue-400" size={18} />
    },
    {
      id: 'smoker',
      question: "What is your smoking history?",
      type: 'select',
      options: ['Never', 'Ex-Smoker', 'Current'],
      field: 'smoker',
      icon: <User className="text-gray-400" size={18} />
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
    setPhase('chat');
    const contextText = `I have completed my assessment.
    Cough duration: ${assessmentData.coughDays} days
    Fever: ${assessmentData.fever}
    Shortness of breath: ${assessmentData.shortnessOfBreath}
    Smoking history: ${assessmentData.smoker}`;
    
    handleSend(contextText, true);
  };

  // --- Chat Logic ---
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

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
          ? `You are a Professional Pulmonology Specialist. The patient just completed a health assessment:
             - Cough duration: ${assessmentData.coughDays} days
             - Fever: ${assessmentData.fever}
             - Shortness of breath: ${assessmentData.shortnessOfBreath}
             - Smoking history: ${assessmentData.smoker}
             
             Analyze this initial data and provide a friendly greeting + clinical impression. 
             Follow this structured Markdown format:
             1. 🩺 Clinical Impression
             2. ⚠️ Risk Analysis
             3. 🛑 Safety Cautions
             4. 📋 Recommended Actions`
          : `Patient message: "${text}". 
             Context: ${JSON.stringify(assessmentData)}.
             As a Pulmonology Specialist, respond professionally and accurately.`;

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
          text: "### ⚠️ Gemini API Configuration\nPlease ensure your VITE_GEMINI_API_KEY is correctly set in your .env file to activate AI diagnostics.", 
          isUser: false 
        }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, { 
        id: Date.now() + 1, 
        text: "System Error: Unable to reach diagnostic engine. Please verify your connection.", 
        isUser: false 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full animate-fade-in relative min-h-[calc(100vh-64px)] bg-[#0a0c10] overflow-hidden">
      
      {/* ── HEADER (Screenshot Match) ── */}
      <div className="px-6 py-6 bg-gradient-to-r from-[#1e3a8a] to-[#10b981] border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => window.history.back()} className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition">
            <ChevronLeft size={20} className="text-white" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight">Health Assessment</h1>
            <p className="text-xs text-white/70">AI-powered symptom analysis</p>
          </div>
        </div>
        <div className="flex gap-1.5">
          {[0,1,2,3,4,5,6].map(i => (
            <div key={i} className={`w-2 h-2 rounded-full transition-all ${i === wizardStep ? 'bg-white' : 'bg-white/20'}`} />
          ))}
        </div>
      </div>

      {/* ── CONTENT AREA ── */}
      <div className="flex-1 overflow-y-auto pb-40 flex flex-col pt-8">
        
        {phase === 'wizard' ? (
          <div className="flex-1 flex flex-col max-w-[500px] mx-auto w-full px-6">
            <AnimatePresence mode="wait">
              <motion.div 
                key={wizardStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                {/* Intro bubble on first step */}
                {wizardStep === 0 && (
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/10 max-w-[95%]">
                    <p className="text-sm text-white/90 leading-relaxed">
                      Hi Samana Rajesh! 👋 I'm your **Lung Health AI** assistant. Let's do a quick respiratory health check — it only takes a minute.
                    </p>
                  </div>
                )}

                {/* Question bubble */}
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0 border border-white/10 shadow-inner">
                    {WIZARD_STEPS[wizardStep].icon}
                  </div>
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/10 max-w-[90%]">
                    <p className="text-[15px] font-medium text-white">{WIZARD_STEPS[wizardStep].question}</p>
                  </div>
                </div>

                {/* Interactive Input */}
                <div className="py-12 flex flex-col items-center">
                  {WIZARD_STEPS[wizardStep].type === 'counter' && (
                    <div className="flex items-center gap-10">
                      <button 
                        onClick={() => setAssessmentData(p => ({...p, coughDays: Math.max(0, p.coughDays - 1)}))}
                        className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition shadow-lg"
                      >
                        <Minus size={24} className="text-white" />
                      </button>
                      <div className="flex flex-col items-center">
                        <span className="text-6xl font-bold text-white tabular-nums tracking-tighter">{assessmentData.coughDays}</span>
                        <span className="text-[10px] text-white/40 uppercase tracking-[0.3em] mt-3 font-black">Days</span>
                      </div>
                      <button 
                        onClick={() => setAssessmentData(p => ({...p, coughDays: p.coughDays + 1}))}
                        className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition shadow-lg"
                      >
                        <Plus size={24} className="text-white" />
                      </button>
                    </div>
                  )}

                  {WIZARD_STEPS[wizardStep].type === 'select' && (
                    <div className="grid grid-cols-1 gap-3 w-full">
                      {WIZARD_STEPS[wizardStep].options.map(opt => (
                        <button
                          key={opt}
                          onClick={() => setAssessmentData(p => ({...p, [WIZARD_STEPS[wizardStep].field]: opt}))}
                          className={`p-5 rounded-2xl border text-sm font-bold transition-all duration-300 ${assessmentData[WIZARD_STEPS[wizardStep].field] === opt ? 'bg-white text-gray-900 border-white shadow-2xl scale-[1.02]' : 'bg-white/5 border-white/10 text-white/60 hover:border-white/30'}`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-4 text-center">
                   <p className="text-[10px] text-white/20 uppercase tracking-[0.2em] font-bold">Tap + / - or drag to adjust</p>
                </div>

                {/* Confirm Button */}
                <button 
                  onClick={handleNextStep}
                  className="w-full py-5 rounded-3xl bg-[#00d1ff] text-white font-black text-xs uppercase tracking-[0.25em] shadow-2xl shadow-cyan-500/20 flex items-center justify-center gap-3 hover:scale-[1.03] transition active:scale-[0.98]"
                >
                  {wizardStep === WIZARD_STEPS.length - 1 ? 'Finish Assessment' : 'Confirm'}
                  <ArrowRight size={18} />
                </button>
              </motion.div>
            </AnimatePresence>
          </div>
        ) : (
          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto max-w-[800px] mx-auto w-full px-4 pt-4"
          >
            {messages.map((msg) => (
              <MessageBubble key={msg.id} message={msg.text} isUser={msg.isUser} />
            ))}
            {isLoading && (
              <div className="flex items-center gap-3 p-6 text-cyan-400 animate-pulse bg-cyan-500/5 rounded-3xl border border-cyan-500/10 mx-4">
                <Loader2 className="animate-spin" size={20} />
                <span className="text-xs font-black uppercase tracking-widest">Gemini Pro is analyzing...</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── INPUT AREA (Only in chat phase) ── */}
      {phase === 'chat' && (
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-[#0a0c10] via-[#0a0c10] to-transparent pt-12 pb-6 px-4">
          <div className="max-w-[800px] mx-auto">
            <ChatInput onSend={handleSend} disabled={isLoading} />
            {messages.length < 2 && <SuggestionChips onSelect={handleSend} />}
          </div>
        </div>
      )}
    </div>
  );
}
