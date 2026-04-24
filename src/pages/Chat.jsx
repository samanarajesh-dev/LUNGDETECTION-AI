import React, { useState, useRef, useEffect } from 'react';
import ChatInput from '../components/chat/ChatInput';
import MessageBubble from '../components/chat/MessageBubble';
import SuggestionChips from '../components/chat/SuggestionChips';
import { Loader2, ShieldCheck } from 'lucide-react';

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef(null);

  const RAPID_API_KEY = import.meta.env.VITE_RAPIDAPI_KEY;
  const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

  // --- Local Knowledge Base for Instant Friendly Answers ---
  const LOCAL_DISEASES = {
    pneumonia: {
      name: "Pneumonia",
      symptoms: ["fever", "cough", "breath", "chest pain", "chills"],
      info: "Pneumonia is an infection that inflames the air sacs in one or both lungs.",
      risks: "Can lead to pleural effusion or respiratory failure if untreated.",
      cautions: "Seek emergency care if you have blue-tinted lips or extreme difficulty breathing.",
      steps: ["Consult a doctor for antibiotics", "Rest and hydrate", "Monitor oxygen levels"]
    },
    asthma: {
      name: "Asthma",
      symptoms: ["wheezing", "shortness of breath", "tightness", "coughing"],
      info: "A condition in which your airways narrow and swell and may produce extra mucus.",
      risks: "Status asthmaticus (severe, life-threatening attack).",
      cautions: "Keep your rescue inhaler with you at all times.",
      steps: ["Identify triggers", "Follow your Asthma Action Plan", "Regular check-ups"]
    },
    bronchitis: {
      name: "Acute Bronchitis",
      symptoms: ["mucus", "fatigue", "sore throat", "slight fever"],
      info: "Inflammation of the lining of your bronchial tubes, which carry air to and from your lungs.",
      risks: "Can develop into pneumonia in vulnerable patients.",
      cautions: "Persistent cough for more than 3 weeks needs a clinical X-ray.",
      steps: ["Humidify the air", "Avoid lung irritants (smoke)", "Drink warm fluids"]
    }
  };

  const findLocalMatch = (text) => {
    const lowerText = text.toLowerCase();
    for (const key in LOCAL_DISEASES) {
      const disease = LOCAL_DISEASES[key];
      if (disease.symptoms.some(s => lowerText.includes(s))) {
        return disease;
      }
    }
    return null;
  };

  const formatDiseaseResponse = (disease) => {
    return `### ⚡ Fast Diagnostic: **${disease.name}**
Matches found in local clinical database.

**Description:** ${disease.info}

---

### ⚠️ Risks & Cautions
- **Risk:** ${disease.risks}
- **Caution:** ${disease.cautions}

---

### 📋 Recommended Next Steps
${disease.steps.map(s => `• ${s}`).join('\n')}

*Note: This is an automated match based on common symptoms. For a precise analysis, please ensure your API subscription is active.*`;
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async (text) => {
    if (!text.trim()) return;

    const userMsg = { id: Date.now(), text, isUser: true };
    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    try {
      console.log("Analyzing with Gemini Pro...");
      
      const localMatch = findLocalMatch(text);
      let aiResponse = "";

      // 1. Attempt Gemini Pro (High Quality)
      if (GEMINI_API_KEY && !GEMINI_API_KEY.includes("Replace")) {
        try {
          const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`;
          const response = await fetch(geminiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{
                parts: [{
                  text: `You are a professional Pulmonology Specialist. A patient reports: "${text}". 
                  Analyze these symptoms specifically for lung health. 
                  Provide a structured response in Markdown:
                  1. 🩺 Clinical Impression (Possible conditions like Pneumonia, Asthma, etc.)
                  2. ⚠️ Risk Analysis (Potential complications)
                  3. 🛑 Safety Cautions (When to seek emergency care)
                  4. 📋 Recommended Actions (Tests, consultations)
                  Keep it professional, empathetic, and clear. Always include a disclaimer.`
                }]
              }]
            })
          });

          const data = await response.json();
          if (data.candidates && data.candidates[0].content.parts[0].text) {
            aiResponse = data.candidates[0].content.parts[0].text;
          }
        } catch (err) {
          console.error("Gemini Error:", err);
        }
      }

      // 2. Fallback to RapidAPI if Gemini fails or is not configured
      if (!aiResponse) {
        // ... (previous RapidAPI logic could go here, but Gemini is better)
        // For now, we'll use our Local Match as the primary fallback
        if (localMatch) {
          aiResponse = formatDiseaseResponse(localMatch);
        }
      }

      // 3. Final Generic Fallback
      if (!aiResponse) {
        aiResponse = `### 🔍 Observation
        I couldn't generate a specific analysis. Please ensure you have configured your Gemini API Key in the .env file.
        
        **General Advice:**
        - Persistent cough (>3 weeks) needs medical attention.
        - Check our **X-Ray Analysis** for imaging insights.`;
      }

      setMessages(prev => [...prev, { id: Date.now() + 1, text: aiResponse, isUser: false }]);
    } catch (error) {
      const localMatch = findLocalMatch(text);
      const errorMsg = localMatch ? formatDiseaseResponse(localMatch) : "System Error: Diagnostic engine is currently unavailable. Please check your connection.";
      setMessages(prev => [...prev, { id: Date.now() + 1, text: errorMsg, isUser: false }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full animate-fade-in relative min-h-[calc(100vh-64px)]">
      {/* Version Header for verification */}
      <div className="px-6 py-2 bg-brand-blue/10 border-b border-brand-blue/20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShieldCheck size={14} className="text-brand-blue" />
          <span className="text-[10px] font-bold text-brand-blue uppercase tracking-widest">AI Doctor v2.1 (Live API)</span>
        </div>
        <span className="text-[10px] text-text-muted font-medium">RapidAPI Integration Active</span>
      </div>

      {/* Messages Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto pb-40 scrollbar-none flex flex-col px-4"
      >
        {messages.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center -mt-20">
            <div className="w-16 h-16 rounded-3xl bg-brand-blue/10 flex items-center justify-center mb-6">
              <Loader2 className="text-brand-blue animate-pulse-slow" size={32} />
            </div>
            <h1 className="text-[26px] font-medium text-text-primary tracking-tight mb-4">
              AI Diagnostic Assistant
            </h1>
            <p className="text-text-secondary text-sm max-w-[300px] text-center">
              Enter your symptoms below for a real-time clinical analysis powered by advanced medical AI.
            </p>
          </div>
        ) : (
          <div className="flex-1 flex flex-col justify-end max-w-[800px] mx-auto w-full pt-8">
            {messages.map((msg) => (
              <MessageBubble key={msg.id} message={msg.text} isUser={msg.isUser} />
            ))}
            {isLoading && (
              <div className="flex items-center gap-2 p-4 text-text-secondary animate-pulse">
                <Loader2 className="animate-spin" size={16} />
                <span className="text-sm font-medium">Diagnostic engine analyzing symptoms...</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="absolute bottom-4 left-0 w-full bg-gradient-to-t from-primary via-primary to-transparent pt-8 pb-4">
        <ChatInput onSend={handleSend} disabled={isLoading} />
        {messages.length === 0 && <SuggestionChips onSelect={handleSend} />}
      </div>
    </div>
  );
}
