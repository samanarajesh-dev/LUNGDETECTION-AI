import React, { useState, useRef, useEffect } from 'react';
import ChatInput from '../components/chat/ChatInput';
import MessageBubble from '../components/chat/MessageBubble';
import SuggestionChips from '../components/chat/SuggestionChips';
import { Loader2, ShieldCheck } from 'lucide-react';

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef(null);

  // Hardcoded key for debugging since env might not be reloading
  const RAPID_API_KEY = '29d5f5b5d3msh98bf5456fed56b1p1b97d1jsn081ee3cee23c';

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
      console.log("Calling Medical API with symptoms:", text);
      const response = await fetch('https://ai-medical-diagnosis-api-symptoms-to-results.p.rapidapi.com/analyzeSymptomsAndDiagnose?noqueue=1', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-rapidapi-host': 'ai-medical-diagnosis-api-symptoms-to-results.p.rapidapi.com',
          'x-rapidapi-key': RAPID_API_KEY
        },
        body: JSON.stringify({
          symptoms: [text],
          patientInfo: {
            age: 35,
            gender: "female",
            height: 165,
            weight: 65,
            medicalHistory: ["hypertension", "seasonal allergies"],
            currentMedications: ["lisinopril 10mg", "cetirizine 10mg"],
            allergies: ["penicillin"],
            lifestyle: {
              smoking: false,
              alcohol: "occasional",
              exercise: "moderate",
              diet: "balanced"
            }
          },
          lang: "en"
        })
      });

      const result = await response.json();
      console.log("API Response:", result);
      
      let aiResponse = "";
      if (result.diagnosis && result.diagnosis.length > 0) {
        const top = result.diagnosis[0];
        aiResponse = `Analysis Complete. \n\n**Primary Diagnosis:** ${top.name}\n**Probability:** ${Math.round(top.probability * 100)}%\n\n**Details:** ${top.description || 'No additional details.'}\n\n**Recommended Actions:** ${result.recommendations?.join(', ') || 'Consult a physician.'}`;
      } else {
        aiResponse = "I've analyzed your input but couldn't find a specific clinical match. Could you describe your symptoms in more detail?";
      }

      setMessages(prev => [...prev, { 
        id: Date.now() + 1, 
        text: aiResponse, 
        isUser: false 
      }]);
    } catch (error) {
      console.error("Chat API Error:", error);
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
